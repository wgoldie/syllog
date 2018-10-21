export const evidenceNodeCommand = {
  content: 'Observed Node',
  select: function(ele, ev) {
    const nodeName = getVariableName() 
    //prepareLabel(nodeName)
    cy.add({ data: { 'name': nodeName, 'inc': 0, 'nodeType': 'evidence' }, position: ev.position })
  }
}

const queryNodeCommand = {
  content: 'Query Node',
  select: function(ele, ev) {
    const nodeName = getVariableName() 
    //prepareLabel(nodeName)
    cy.add({ data: { 'name': nodeName,  'inc': 0, 'nodeType': 'query' }, position: ev.position })
  }
}

export const latentNodeCommand = {
  content: 'Latent Node',
  select: function(ele, ev) {
    const nodeName = getVariableName() 
    //prepareLabel(nodeName)
    cy.add({ data: { 'name': nodeName,  'inc': 0, 'nodeType': 'latent' }, position: ev.position })
  }
}

export export const layoutCommand = {
  content: 'Layout',
  select: function() {
    cy.layout({ name: isDirected ? 'dagre' : 'grid' , cols: 5, sort: function(a,b) { return a.data('inc') - b.data('inc') } }).run()
  }
}

export const tikzCommand = {
  content: 'Tikz',
  select: function() {
    nodes = cy.filter('node[nodeType]')
    edges = nodes.connectedEdges()
    lines = ""
    xpos = nodes.map(function(node,i) { return [node.position('x'), node] })
    xsorted = xpos.sort(function(a,b) { return a[0]-b[0]}).map(function(pos) { return pos[0] }) 
    xmin = xsorted[0]
    xmax = xsorted[xsorted.length-1]
    ypos = nodes.map(function(node,i) { return [node.position('y'), node] })
    ysorted = ypos.sort(function(a,b) { return a[0]-b[0]}).map(function(pos) { return pos[0] })
    ymin = ysorted[0]
    ymax = ysorted[ysorted.length-1]
    var last = null
    //lines += '\\begin{tikzpicture}[scale=' + (10/Math.max(xsorted[xsorted.length-1],xsorted[xsorted.length-1])).toFixed(2) + ']\n'  
    //lines += '\\begin{tikzpicture}[scale=10]\n'  
    lines += '%%tikz -l bayesnet\n'  
    nodes.forEach(function(node) {
      type = node.data('nodeType') == 'evidence' ? 'obs' : 'latent'
      id = node.id().replace('-','')
      xidx = xsorted.indexOf(node.position('x'))
      right = xidx > 0 ? xsorted[xidx-1] : null 
      yidx = ysorted.indexOf(node.position('y'))
      below = yidx > 0 ? xsorted[yidx-1] : null 
      x = xsorted[xidx] - xmin
      y = ysorted[yidx] - ymin
      //lines += 'node['+type+(below? ', below=of '+below:'')+(right? ', right=of '+right:'')+'] ('+id+') {$'+(node.data('name')||'')+'_'+(node.data('inc')||'0')+'$} ;\n'
      lines += '\\node['+type+'] ('+id+') at ('+(5*x/xmax).toFixed(2)+', '+ (-5*y/ymax).toFixed(2) +') {$'+(node.data('name')||'')+'_'+(node.data('inc')||'0')+'$} ;\n'
      last = id
    })
    edges.forEach(function(edge) {
      director = isDirected ? '' : '[-]'
      sourceid = edge.data('source').replace('-','')
      targetid = edge.data('target').replace('-','')
      lines += '\\edge'+director+' {'+sourceid+'} {'+targetid+'} ;\n'
    })
    //#lines += '\\end{tikzpicture}'
    console.log(lines)
    
  }
}

var namer = document.getElementById("namer")
const nameCommand = {
  content: 'Name',
  select: function(ele) {
    ele.data('name', namer.value)
    namer.value = '' 
  }
}

const reverseEdgeCommand =  {
  content: 'Reverse',
  select: function(ele) {
    var source = ele.data('source')
    var target = ele.data('target')
    var id = ele.data('id')
    ele.remove()
    cy.add({ 'data' : {'source': target, 'target': source}})
  }
}

const debugCommand = {
  content: 'Debug',
  select: function(e) {
    console.log(e.data())
  }
}

const duplicateCommand = {
  content: 'Duplicate',
  select: function(ele) {
    data = (ele.clone().data())
    delete data['id']
    data['inc'] += 1
    cy.batch(function(){
      dupe = cy.add({'group': 'nodes', 'data': data})
      dupeid = dupe.id()
      var connected = ele.connectedEdges()
      var children = connected.targets().difference(ele)
      var parents = connected.sources().difference(ele)
      children.forEach(function(child) {
        cy.add({'group': 'edges', 'data': { source: dupeid, target: child.id() }})
      })
      parents.forEach(function(parent) {
        cy.add({'group': 'edges', 'data': { target: dupeid, source: parent.id() }})
      })
    })
  }
}

function subgraph(ele) {
  graph = cy.filter('node, edge').components().filter(function(c) { return c.contains(ele) } )[0]
  return graph
}
function color(ele, color) {
  ele.data('color', color)
}

function isQuery(ele) {
  return ele.data('nodeType') == 'query'
}
function isLatent(ele) {
  return ele.data('nodeType') == 'latent'
}
function isEvidence(ele) {
  return ele.data('nodeType') == 'evidence'
}
function isColor(ele, color) {
  return ele.data('color') == color
}
function visit(ele) {
  ele.data('visited', true)
}
function visited(ele) {
  return ele.data('visited') == true 
}
function sleepFor( sleepDuration ){
    var now = new Date().getTime();
    while(new Date().getTime() < now + sleepDuration){ /* do nothing */ } 
}

function dindep(xf, graph) {
  color(graph, 'black')
  graph.data('visited', false)
  function bayesPath(currNode, kind, prevNode) {
    if(visited(currNode)) return
    if(prevNode) {
      visit(prevNode)
      if(kind == 'parent' && isColor(prevNode, 'yellow')) return false 
      if(kind == 'child' && isColor(prevNode, 'blue')) return false
      if(kind == 'parent' && isLatent(currNode)) color(currNode, 'yellow')
      if(kind == 'child' && isEvidence(currNode)) color(currNode, 'blue')  
      if(kind == 'parent' && isEvidence(currNode)) color(currNode, 'blue')
      if(kind == 'child' && isLatent(currNode)) color(currNode, 'yellow') 
    }
    var connected = currNode.connectedEdges()
    var children = connected.targets().difference(currNode)
    var parents = connected.sources().difference(currNode)
    children.forEach(function(child) {
      bayesPath(child, 'child', currNode)
    })
    parents.forEach(function(parent) {
      bayesPath(parent, 'parent', currNode)
    })
  }
  xf.forEach(function(query) {
    bayesPath(xf, 'base', null)
  })
}

var splitCommand = {
  content: 'Bayes Balls',
  select: function(ele) {
    color(cy.filter(), 'black')
    graph = subgraph(ele)
    graph.data('color', 'red')
    xe = graph.filter('node[nodeType="evidence"]')
    xf = graph.filter('node[nodeType="query"]')
    xr = graph.difference(xe).difference(xf)
    /*color(xe,'grey')
    color(xf,'blue')
    color(xr,'white')*/
    dindep(ele, graph)
    condep = graph.filter('node[color="blue"],node[color="yellow"]').filter('node[nodeType!="evidence"]')
    color(graph, 'black')
    color(condep, 'orange')
  }
}

var markovBlanketCommand = {
  content: 'Markov Blanket',
  select: function(ele) {
    graph = subgraph(ele)
    color(graph, 'black')
    clique = ele.connectedEdges().connectedNodes()
    mb = clique.difference(ele)
    color(mb, 'red')
    color(ele, 'green')
  }
}

var modeSwitchCommand = function(mode) {
  return {
    content: mode + ' Mode',
    select: function() {
      contextMenus(mode)
    }
  }
}

var isDirected = false;

var directedSwitchCommand = function(isDirected) {
  return {
    content: isDirected ? 'Undirected' : 'Directed',
    select: function() {
      setStyle(!isDirected)
      contextMenus(null, !isDirected)
    }
  }
}

var nodeBaseCommands = [debugCommand]

const exportData = function () {
  exportGraph = cy.json()
  limitedExport = { 'elements': exportGraph['elements'], 'layout': exportGraph['layout'], 'zoom': exportGraph['zoom'], 'pan': exportGraph['pan'] }
  return JSON.stringify(limitedExport)
}

const downloadGraph = function() {
  exportString = exportData()
  filename = (!!namer.value.trim()) ? namer.value + '.json' : 'graph.json'
  download(filename, exportString)
  //uriContent = 'data:application/octet-stream,'+encodeURIComponent(exportString)
  //newWindow = window.open(uriContent, 'graphExport.json')
}

document.getElementById("export").onclick = downloadGraph 

var importInput = document.getElementById("import")
importInput.onchange = function() {
  if (!importInput.files || !importInput.files[0]) { return; }
  const file = importInput.files[0]
  const reader = new FileReader()
  reader.onload = function(e) {
    var contents = e.target.result;
    importGraph = JSON.parse(contents)
    console.log(importGraph)
    cy.json(importGraph)
  }
  reader.readAsText(file)
}

window.addEventListener('beforeunload', function(e) {
  localStorage.setItem('graphCache', exportData())
})

cachedGraph = localStorage.getItem('graphCache')
if(cachedGraph){
  console.log("Loaded cached graph")
  console.log(JSON.parse(cachedGraph))
  cy.json(JSON.parse(cachedGraph))
}

setStyle(isDirected)
