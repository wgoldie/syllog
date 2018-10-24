## Syllog

![](icecream.png)

An interface and library for visual probabilistic programming.
Currently being converted from an early prototype to beta architecture.

### Modes

#### Factor mode
In factor mode, a graph can be composed from variables and factors.

Each input must be the child node of one and only one variable.
Each output may be the parent node of zero or more variables.
Each variable must be the child node of one and only one output.

Each factor has zero or more outputs and zero or more inputs. In practice, a factor with no outputs is never computed. 
Factors with no inputs, on the other hand, are often computed: they are the initial sampling functions for the compute graph.

### Requirements:
- Python: PyTorch, igraph
- Javascript: webpack, babel, cytoscape, various cytoscape plugins (see `src/package.json`)

## Progress

Todo (Editor):
- [x] Import/export JSON
- [ ] Save/load JSON flat file
- [ ] Validate before export
- [x] Enforce unique variable names
- [x] Scope variable names to factors (e.g. to allow for many factors with theta, sigma, etc as inputs)
- [x] Generate variable names
- [x] Variable namer
- [ ] Swap between factor/DGM view
- [ ] Factor layout rules
- [x] Radial marking menus
- [ ] Nested marking menus
- [ ] D-separation preview

Todo (Pyro):
- [x] Import JSON
- [ ] Evidence/latent/target handling

Todo (Overall):
- [ ] Allow orphaned nodes 
- [ ] Example models
- [x] Predefined factors (distributions, arithmetic, etc)
- [ ] Library of predefined factors
- [ ] Plates
- [ ] Factor definition JSON spec
- [ ] UGM models?
- [x] Pyro support
