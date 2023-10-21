# Tree API Documentation

This document outlines the API routes for managing a tree structure using a NoSQL database, such as MongoDB, with JavaScript and Node.js. The routes include:

1. **GET - `/api/tree`**: Retrieve the updated tree structure.
2. **POST - `/api/tree`**: Add a new node to the tree.

## GET - `/api/tree`

This route retrieves the current tree structure.

### Sample Code

```javascript
const express = require('express');
const router = express.Router();
const TreeModel = require('../models/treeModel'); // Replace with your model.

// GET route to retrieve the tree structure.
router.get('/api/tree', async (req, res) => {
  try {
    // Query the database to retrieve the tree structure.
    const tree = await TreeModel.find(); // Assuming you have a TreeModel.

    res.json(tree);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
```


# Tree API - POST `/api/tree`

This document provides detailed information about the POST route that allows you to add a new node to the tree structure in your NoSQL database using JavaScript and Node.js. This route is designed to work with a NoSQL database such as MongoDB.

## Route Description

The POST route `/api/tree` enables you to add a new node to the existing tree structure. To add a new node, you must provide the `parent` node ID and the `label` for the new node.

### Request

- **Method**: POST
- **Endpoint**: `/api/tree`

#### Request Body

```json
{
    "parent": "<id>",
    "label": "<label>"
}
```

- parent (string): The ID of the parent node to which you want to attach the new node.
- label (string): The label or name for the new node.

Response
If the request is successful, the server will respond with a JSON object representing the newly added node. If there is an error, the response will include an error message.

```json
{
    "_id": "unique-node-id",
    "name": "<label>"
}
```

- _id (string): A unique identifier for the newly added node.
- name (string): The label of the newly added node.

Error Response
```json
{
    "message": "Error message"
}
```

- message (string): An error message describing the issue with the request, such as missing parameters or a non-existent parent node.


## Sample Code
Here's a sample code implementation of the POST route /api/tree:

```javascript
const express = require('express');
const router = express.Router();
const TreeModel = require('../models/treeModel'); // Replace with your model.

// POST route to add a new node to the tree.
router.post('/api/tree', async (req, res) => {
  try {
    // Extract parent and label from the request body.
    const { parent, label } = req.body;

    if (!parent || !label) {
      return res.status(400).json({ message: 'Both parent and label are required.' });
    }

    // Create a new node document in the MongoDB collection.
    const newNode = new TreeModel({ name: label });
    await newNode.save();

    // Find the parent node and add the new node to its children.
    const parentNode = await TreeModel.findById(parent);
    if (!parentNode) {
      return res.status(404).json({ message: 'Parent node not found.' });
    }
    parentNode.children.push(newNode);
    await parentNode.save();

    res.json(newNode);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
```
