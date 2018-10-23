import json
import torch
from igraph import Graph
#from graph_tool.topology import is_DAG, topological_sort 

FACTOR = 'FACTOR'
VARIABLE = 'VARIABLE'
FACTOR_INPUT = 'FACTOR_INPUT'
FACTOR_OUTPUT = 'FACTOR_OUTPUT'
FACTOR_INPUT_CONTAINER = 'FACTOR_INPUT_CONTAINER'
FACTOR_OUTPUT_CONTAINER = 'FACTOR_OUTPUT_CONTAINER'

class SyllogPyroModel(object):
    """
    A Syllog-generated model for Pyro
    
    """
    def __init__(self, nodes, target=None):
        """
        Arguments:

        nodes: an ordered dictionary-like object { name: { type, ?variableType } }
        target: a string identifying a node to target calculation of
        """

        variable_names = ([key for (key, value) in nodes.items() if value['type'] == 'variable'])
        if target is not None and target not in variable_names:
            raise Exception('Invalid target')
        self.target = target or variable_names[-1]
        factors = {name:node for name, node in nodes.items() if node['type'] == 'factor'}
        factor_outputs = [output for node in factors.values() for output in node['outputs']]
     
        # validate input
        if len(factor_outputs) != len(set(factor_outputs)):
            raise Exception("Factors may not share outputs; Nodes may only result from one factor")
        for name, node in nodes.items():
            if node.get('type', None) not in ['factor', 'variable']:
                raise Exception("All nodes must have type of factor or variable.")
            if node['type'] == 'factor':
                outputs = node.get('outputs', None)
                if outputs is None or not set(outputs).issubset(set(variable_names)):
                    raise Exception("All factor nodes must have an output set of variables")
            if node['type'] == 'variable':
                if node.get('variableType', None).lower() not in ['latent', 'evidence', 'query']:
                    raise Exception("All variable nodes must have type of latent, evidence, or query.")
                if name not in factor_outputs:
                    raise Exception("All variable nodes must result from a factor execution.")
        vertex_attrs = {
            'name': list(nodes.keys()),
        }

        if len(set(vertex_attrs['name'])) != len(vertex_attrs['name']):
            raise Exception("Graph is invalid: multiple nodes with the same name.")

        # use igraph to get a topological sorting of the graph
        graph = Graph(
            n=len(nodes),
            vertex_attrs=vertex_attrs,
            directed=True
        )

        for factor_name, node in factors.items():
            graph.add_edges(
                [(variable_name, factor_name) for variable_name in node['inputs']])
            graph.add_edges(
                [(factor_name, variable_name) for variable_name in node['outputs']])

        if not graph.is_dag():
            raise Exception("Only DAGs currently supported")

        sort_idx = graph.topological_sorting()
        self.sort = graph.vs[sort_idx]['name']
        self.nodes = nodes
        self.factors = factors
        
    @classmethod 
    def from_cyjson(cls, graph_cyjson):
        """
        Arguments:
        graph_cyjson

        Returns:
        An instance of SyllogPyroModel

        """
        graph = json.loads(graph_cyjson)
        variable_nodes = [node for node in graph['nodes'] if node['type'] == VARIABLE]

        return cls(graph, None)

    def get_factor_descriptions(self):
        """
        Returns:

        factor_descriptions: a dict-like object that specifies the dependencies of each node.
        """
        factor_descriptions = {
            name: { 'inputs': node['inputs'], 'outputs': node['outputs'] } 
            for (name, node) in self.factors.items()
        }

        return factor_descriptions

    def __call__(self, factor_fns):
        """
        Arguments:
        
        factors: a dict-like object of sampling functions for each factor
        each of which receives the values of the factor's parent variables (if any exist)
        as kwargs keyed on the parents' names
        """

        node_values = {}

        for name in self.sort:
            node = self.nodes[name]
            if node['type'] == 'factor':
                factor_args = {
                    input_name: node_values[input_name]
                    for input_name in node['inputs'] 
                }

                factor_value = factor_fns[name](*factor_args.values())

                for output_name in node['outputs']:
                    node_values[output_name] = factor_value

                if self.target in node['outputs']:
                    # exit early if the rest of the graph is irrelevant
                    return node_values[self.target]

        return node_values[self.target]
