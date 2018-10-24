import json
import torch
from igraph import Graph
from igraph import plot as igraph_plot
#from graph_tool.topology import is_DAG, topological_sort 

LATENT = 'LATENT'
EVIDENCE = 'EVIDENCE'
QUERY = 'QUERY'
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
    def __init__(self, graph):
        """
        Arguments:
            graph - an igraph model with the following vertex attributes:
                name: unique ID (generally UUID)
                node_name: string identifying each node for human readability
                node_type: string in informal enum [FACTOR, VARIABLE, FACTOR_INPUT, FACTOR_OUTPUT]
                variable_type: string in informal enum [LATENT, EVIDENCE, QUERY], 
                 should be null if node_type is not VARIABLE
            The graph must also have the following properties:
                - All variables and factors must have unique names (inputs and outputs may share names)
                - Each variable node have exactly one parent, which is a factor output
                - Each factor input node must have exactly one parent, which is a variable node; 
                and exactly one child, which is a factor node
                - Each factor output node must have exactly one parent, which is a factor node; 
                and may have zero or more children, each of which are a variable nodes
        """
        
        # TODO enforce rules
        
        sort_idx = graph.topological_sorting()
        self.graph = graph
        self.variable_name_to_id = { node['node_name']: node['name'] for node in graph.vs if node['node_type'] == VARIABLE}
        self.sort = graph.vs[sort_idx]['name']
        
    parsed_node_types = [FACTOR, VARIABLE, FACTOR_INPUT, FACTOR_OUTPUT]
    @classmethod 
    def from_cyjson(cls, cyjson_str):
        """
        Arguments:
            cyjson_str - a JSON string output by Cytoscape.JS.
            The described graph must follow the requirements of __init__.

        Returns:
            An instance of SyllogPyroModel

        """
        cyjson = json.loads(cyjson_str)
        nodes = [
            node['data'] 
            for node in cyjson['nodes']
            if node['data']['type'] in SyllogPyroModel.parsed_node_types
        ]
        node_names_by_id = {node['id']: node['name'] for node in nodes}
        """
        factors = [node['name'] 
                   for node in nodes 
                   if node['type'] == FACTOR]
        """
        factor_input_edges = [(node['id'], node['factor']) 
                              for node in nodes 
                              if node['type'] == FACTOR_INPUT]
        factor_output_edges = [(node['factor'], node['id']) 
                               for node in nodes 
                               if node['type'] == FACTOR_OUTPUT]
        graph = Graph(0, directed=True)
        
        for node in nodes:
            if node['type'] in SyllogPyroModel.parsed_node_types:
                graph.add_vertex(
                    name=node['id'], 
                    node_name=node['name'],
                    node_type=node['type'], 
                    variable_type=node.get('variableType', None),
                    factor_fn=node.get('factorFunction', None)
                )
                
        graph.add_edges([(edge['data']['source'], edge['data']['target']) 
                         for edge in cyjson['edges']])
        graph.add_edges(factor_input_edges)
        graph.add_edges(factor_output_edges)
        return cls(graph)
    
    shape_dict = {
        FACTOR: 'rectangle',
        VARIABLE: 'circle',
        FACTOR_INPUT: 'triangle',
        FACTOR_OUTPUT: 'triangle'
    }

    color_dict = {
        LATENT: 'blue',
        EVIDENCE: 'black',
        QUERY: 'green'
    }
    
    def plot_graph(self, filename):
        """
        Plots the compute graph to a file.
        Arguments: 
            - Filename: a .png filename valid for writing
        """
        ## todo check writable and .png, use dagre layout algorithm?
        self.graph.vs['label'] = self.graph.vs['node_name']
        self.graph.vs['shape'] = [SyllogPyroModel.shape_dict[node_type] 
                                  for node_type in self.graph.vs['node_type']]
        self.graph.vs['color'] = [SyllogPyroModel.color_dict.get(variable_type, 'white') 
                                  for variable_type in self.graph.vs['variable_type']]
        layout = self.graph.layout("kk")
        igraph_plot(self.graph, filename, layout=layout)
    
    def get_factor_descriptions(self):
        """
        Returns:
            factor_descriptions: a dict-like object that specifies 
            the inputs and outputs of each factor node.
        """
        
        factor_vertices = {v['name']: v for v in self.graph.vs if v['node_type'] == FACTOR}
        factor_inputs = {
            fn: [p['node_name'] for p in fv.predecessors()]
            for (fn, fv) in factor_vertices.items()
        }
        factor_outputs = {
            fn: [s['node_name'] for s in fv.successors()]
            for (fn, fv) in factor_vertices.items()
        }
        
        factor_descriptions = {
            factor_vertex['node_name']: {
                'fn': factor_vertex['factor_fn'],
                'inputs': factor_inputs.get(factor_name, []),
                'outputs': factor_outputs.get(factor_name, [])
            }
            for (factor_name, factor_vertex) in factor_vertices.items()
        }

        return factor_descriptions

    def get_evidence_nodes(self):
        evidence_nodes = [v['node_name'] for v in self.graph.vs if v['node_type'] == VARIABLE and len(v.predecessors()) < 1]
        return evidence_nodes
    
    def __call__(self, evidence, factor_fns):
        """
        Arguments:
        
        evidence: a dict-like object of observations for evidence nodes
        
        factors: a dict-like object of sampling functions for each factor
        each of which receives the values of the factor's parent variables (if any exist)
        as kwargs keyed on the parents' names
        
        Returns: A dict-like object of all node values
        """

        node_values = {self.variable_name_to_id[variable_name]: variable_value for (variable_name, variable_value) in evidence.items()}
        factor_descriptions = self.get_factor_descriptions()

        # iterate through the topological sorting of the graph
        for name in self.sort:
            node = self.graph.vs.select(name_eq=name)[0]
            if node['node_type'] == FACTOR:
                # if we are at a factor, execute it on the inputs
                factor_args = {
                    node['node_name']: node_values[node['name']]
                    for node in node.predecessors()
                }

                factor_outputs = factor_fns[node['factor_fn']](**factor_args)

                for output in node.successors():
                    node_values[output['name']] = factor_outputs[output['node_name']]
            else:
                # if we are not at a factor, we must have a parent value already computed
                # by the topological sort and the required graph properties
                # TODO: define value reduction behavior (by stacking, etc)
                # if multiple parent nodes exist w/o intermediary factor
                pred = node.predecessors()
                
                if name in node_values.keys():
                    continue
                if len(pred) > 0:
                    node_values[name] = node_values[node.predecessors()[0]['name']]
                    continue
                raise Exception("Node has no parents and is not evidence, or graph sort is broken.")

        return {
            variable_name: node_values[variable_id] 
            for (variable_name, variable_id) 
            in self.variable_name_to_id.items()
            if not variable_name in evidence.keys()
        }
