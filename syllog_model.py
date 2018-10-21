import json
from graph_tool import Graph
from graph_tool.topology import is_DAG, topological_sort 
class SyllogPyroModel(object):
    """
    A Syllog-generated model for Pyro
    
    """
    def __init__(self, nodes, edges, target=None):
        """

        nodes: a sequence of dictionary-like objects { name, type }
        edges: a sequence of length 2 sequences (source_name, target_name)
        target: a string identifying a node to target calculation of
        """
        graph = Graph()

        self.names = graph.new_vertex_property('string')
        self.types = graph.new_vertex_property('string')
        self.vertices = graph.add_vertex(len(nodes))
        
        for node, vertex in zip(nodes, self.vertices):
            self.names[vertex] = node['name']
            self.types[vertex] = node['type']

        for edge in edges:
            graph.add_edge(*edge)

        if not is_DAG(graph):
            raise Exception('Only DAGs supported currently.')

        self.sort = topological_sort(graph)
        if target is not None and target not in self.names:
            raise Exception('Invalid target')

        self.target = target or self.names[self.sort[-1]]
        
    @classmethod 
    def from_json(cls, graph_json):
        """
        
        graph_json: a json string of the format: 
        {
            nodes: [{ name: 'string', type: 'string'  }, ...], 
            edges: [['source_name', 'target_name'], ...],
            target: 'target_name',
        }

        """
        graph = json.loads(graph_json)
        nodes = graph.get('nodes', None)
        edges = graph.get('edges', None)
        target = graph.get('target', None)
        if not (edges and isinstance(edges, list) and nodes and isinstance(nodes, list)):
            raise Exception()
        return cls(nodes, edges, target)

    def __call__(self, factors):
        """
        factors: a dict-like object of sampling functions for each node
        each of which receives the values of the node's parents
        as kwargs keyed on the parents' names
        """

        node_values = []

        for idx in self.sort:
            name = self.names[idx]
            vertex = self.vertices[idx]
            factor_args = {
                self.names[parent]: node_values[parent]
                for parent in vertex.in_neighbors()
            }

            node_values[name] = factors['name'](**factor_args)

            # exit early if the rest of the graph is irrelevant
            if name is self.target:
                return node_values[name]

        return node_values[self.target]
    
