class Node {
    constructor(label, value) {
      this.label = label;
      this.value = value;
      this.children = [];
    }
  }
  
  function createNodes(nodes) {
    const allNodes = {};
    for (let node of nodes) {
      allNodes[node.value] = new Node(node.label, node.value);
    }
    return allNodes;
  }
  
  function createTree() {
    const allNodesCreated = createNodes([
      { value: "1", label: "root" },
      { value: "2", label: "ant" },
      { value: "3", label: "bear" },
      { value: "4", label: "cat" },
      { value: "5", label: "dog" },
      { value: "6", label: "elephant" },
      { value: "7", label: "frog" },
    ]);
  
allNodesCreated["5"]?.children.push(allNodesCreated["6"]);
allNodesCreated["3"]?.children.push(allNodesCreated["5"]);
allNodesCreated["3"]?.children.push(allNodesCreated["4"]);
allNodesCreated["1"]?.children.push(allNodesCreated["7"]);
allNodesCreated["1"]?.children.push(allNodesCreated["3"]);
allNodesCreated["1"]?.children.push(allNodesCreated["2"]);
return allNodesCreated;
}

const allNodesCreated = createTree();

function getTree(req, res) {
const tree = createGetResponse(allNodesCreated["1"]);
res.json(tree);
}
