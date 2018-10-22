import json
import torch
from igraph import Graph
#from graph_tool.topology import is_DAG, topological_sort 

class SyllogPyroModel(object):
    """
    A Syllog-generated model for Pyro
    
    """
    def __init__(self, nodes, edges, target=None):
        """
        Arguments:

        nodes: a sequence of dictionary-like objects { name, type }
        edges: a sequence of length 2 sequences (source_name, target_name)
        target: a string identifying a node to target calculation of
        """
        
        # TODO: check if names are unique
        
        vertex_attrs = {
            'name': [node['name'] for node in nodes],
            'type': [node['type'] for node in nodes]
        }
        
        if len(set(vertex_attrs['name'])) is not len(vertex_attrs['name']):
            raise Exception("Graph is invalid: multiple nodes with the same name.")
        
        graph = Graph(
            n=len(nodes),
            vertex_attrs=vertex_attrs,
            directed=True
        )
        
        graph.add_edges(edges)

        # TODO: check if the graph is a DAG
        if not graph.is_dag():
            raise Exception("Only DAGs currently supported")

        self.sort = graph.topological_sorting()
        self.graph = graph
        self.names = graph.vs['name']
        self.types = graph.vs['type']
        
        if target is not None and target not in self.names:
            raise Exception('Invalid target')

        self.target = target or self.graph.vs['name'][-1]
        
    @classmethod 
    def from_json(cls, graph_json):
        """
        Arguments:

        graph_json: a json string of the format: 
        {
            nodes: [{ name: 'string', type: 'string'  }, ...], 
            edges: [['source_name', 'target_name'], ...],
            target: 'target_name',
        }

        Returns:
        An instance of SyllogPyroModel

        """
        graph = json.loads(graph_json)
        nodes = graph.get('nodes', None)
        edges = graph.get('edges', None)
        target = graph.get('target', None)
        if not (edges and isinstance(edges, list) and nodes and isinstance(nodes, list)):
            raise Exception()
        return cls(nodes, edges, target)

    def get_factor_descriptions(self):
        """
        Returns:

        factor_descriptions: a dict-like object that specifies the dependencies of each node.
        Note that parents may be an empty list: in this case, the node has no dependencies in the graph.

        """
        factor_descriptions = {
            self.names[idx]: [
                parent['name']
                for parent 
                in self.graph.vs[idx].predecessors()
            ]
            for idx in self.sort
        }
        return factor_descriptions

    def __call__(self, factors):
        """
        Arguments:
        
        factors: a dict-like object of sampling functions for each node
        each of which receives the values of the node's parents
        as kwargs keyed on the parents' names
        """

        node_values = {}

        for idx in self.sort:
            name = self.names[idx]
            vertex = self.graph.vs[idx]
            factor_args = {
                parent['name']: node_values[parent['name']]
                for parent in vertex.predecessors()
            }

            node_values[name] = factors[name](*factor_args.values())

            # exit early if the rest of the graph is irrelevant
            if name is self.target:
                return node_values[name]

        return node_values[self.target]
    

def get_gaussian_factors(factor_descriptions):
    """
    Gets univariate gaussian factor functions 
    with mean (default 0) and variance(default 1) factors
    """
    factors = {
        node: (lambda *params: 
               torch.distributions.Normal(
                0 if len(params) < 1 else params[0], 
                1 if len(params) < 2 else params[1], 
               ).sample()
              )
        for (node, parents)
        in factor_descriptions.items()
    }
    return factors

def get_diagonal_gaussian_factors(factor_descriptions):
    """
    Gets diagonal gaussian factor functions with unit variance
    """
    factors = {
        node: (lambda *params: 
               torch.distributions.Normal(
                   torch.cat(params) if len(params) > 0 else torch.zeros(len(parents)), 
                   torch.eye(len(parents)), 
               ).sample()
              )
        for (node, parents)
        in factor_descriptions.items()
    }
    return factors
