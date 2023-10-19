class Node {
  constructor(label, value) {
    this.label = label;
    this.value = value;
    this.children = [];
  }
}

/**
 * @description create all nodes based on array of nodes
 * @param {*} nodes
 * @returns all nodes
 */
function createNodes(nodes) {
  const allNodes = {};
  for (let node of nodes) {
    allNodes[node.value] = new Node(node.label, node.value);
  }
  return allNodes;
}

/**
 * @description Creates entire tree with all nodes and it's children nodes
 * @returns all nodesincluding root node
 */
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

/**
 * @description handle get api/tree requests
 * @param {*} req
 * @param {*} res
 */
function getTree(req, res) {
  const tree = createGetResponse(allNodesCreated["1"]);
  res.json(tree);
}

/**
 * @description Build Get response
 * @param {*} node
 * @returns Get response
 */
function createGetResponse(node) {
  const response = {};
  if (node) {
    response[node.value] = {
      label: node.label,
      children: node.children.map((child) => createGetResponse(child)),
    };
  }
  return response;
}

/**
 * @description handle post requests
 * @param {*} req
 * @param {*} res
 */
function postTree(req, res) {
  const rootNode = allNodesCreated["1"];
  const totalNodes = countNodes(rootNode);
  const newNode = new Node(req.body.label, totalNodes + 1);
  const node = getNodeByValue(rootNode, req.body.parent);
  if (node) {
    node.children.push(newNode);
    res.status(201).json({ status: "success", createdId: totalNodes + 1 });
  } else {
    res.status(500).json({ status: "failed" });
  }
}

/**
 * @description Get node by value
 * @param {*} node
 * @param {*} value
 * @returns node if found else returns null
 */
function getNodeByValue(node, value) {
  if (node.value === value) {
    return node;
  }
  for (let child of node.children) {
    const foundNode = getNodeByValue(child, value);
    if (foundNode) {
      return foundNode;
    }
  }
  return null;
}

/**
 * @description count total number of nodes
 * @param {*} node
 * @returns
 */
function countNodes(node) {
  let count = 1;
  for (let child of node.children) {
    count += countNodes(child);
  }
  return count;
}

module.exports = {
  getTree,
  postTree,
};
