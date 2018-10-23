An interface and library for visual probabilistic programming.
Currently being converted from an early prototype to beta architecture.

Requirements:
- Python: Pytorch, igraph
- Javascript: webpack, babel, cytoscape, various cytoscape plugins (see `src/package.json`)

Todo (Editor):
- [x] Import/export JSON
- [] Validate before export
- [] Enforce unique variable names w/in scopes
- [] Generate variable names
- [] Variable namer
- [] Swap between factor/DGM view
- [] Factor layout rules
- [] Radial marking menus
- [] D-separation preview

Todo (Pyro):
- [] Evidence/latent/target handling

Todo (Overall):
- [] Example models
- [] Predefined factors (distributions, arithmetic, etc)
- [] Plates
- [] Factor definition JSON spec
- [] UGM models 
- [x] Pyro support
- [] Edwin support
- [] Stan support
