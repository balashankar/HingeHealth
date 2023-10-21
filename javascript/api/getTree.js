let data = require('./tree.js');

class Node{
  constructor(label, value){
    this.label = label;
    this.value = value;
    this.children =[];
  }
}

function createNodes(nodes){
  const allNodes={};
  for(let node of nodes){
    allNodes[node.value] = new Node(node.label, node.value);
  }
  return allNodes;
}

function createTree(){
  const allNodesCreated = createNodes([
    {label:"1", value: "root"},
    {label:"2", value: "ant"},
    {label:"3", value: "bear"},
    {label:"4", value: "cat"},
    {label:"5", value: "dog"},
    {label:"6", value: "elephant"},
    {label:"7", value: "frog"},
  ]);
  allNodesCreated["dog"]?.children.push(allNodescreated["elephant"]);
  allNodesCreated["bear"]?.children.push(allNodescreated["dog"]);
  allNodesCreated["bear"]?.children.push(allNodescreated["cat"]);
  allNodesCreated["root"]?.children.push(allNodescreated["frog"]);
  allNodesCreated["root"]?.children.push(allNodescreated["bear"]);
  allNodesCreated["root"]?.children.push(allNodescreated["ant"]);
  return allNodesCreated;
}

function getTree(req, res) {
  const allNodesCreated = createTree();
  const tree = createGetResponse(allNodesCreated["root"]);
  res.json(tree);
}

function createGetResponse(node){
  const response ={};
  if(node){
    response[node.label] = {
      label: node.value,
      children: node.children.map((child) => createGetResponse(child)),
    }
  }
  return response;
}
module.exports = {
  getTree,
};
