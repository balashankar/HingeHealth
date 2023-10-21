# Express.js Tree API Documentation

This documentation provides information on two API routes implemented in an Express.js application for managing a hierarchical tree structure.

## 
## GET - /api/tree

This route returns the current state of the hierarchical tree. The tree structure is represented as JSON data.

**HTTP Request:** `GET /api/tree`

### Sample Response
```json
{
    "id": 1,
    "label": "root",
    "children": [
        {
            "id": 2,
            "label": "ant",
            "children": []
        },
        {
            "id": 3,
            "label": "bear",
            "children": [
                {
                    "id": 4,
                    "label": "cat",
                    "children": []
                },
                {
                    "id": 5,
                    "label": "dog",
                    "children": [
                        {
                            "id": 6,
                            "label": "elephant",
                            "children": []
                        }
                    ]
                }
            ]
        },
        {
            "id": 7,
            "label": "frog",
            "children": []
        }
    ]
}
```
 
## POST - /api/tree

This route allows us to add a new node to the tree. We must provide a JSON payload specifying the parent node's ID and the label for the new node.

**HTTP Request:** `POST /api/tree`

### Request Payload
```json
{
    "parent": "<id>",
    "label": "<label>"
}
```

### Sample Response
If successful, the route will return the details of the newly added node.
```json
{
    "id": 8,
    "label": "newNode",
    "children": []
}
```

### Error Response
If the specified parent node is not found, the route will return a 404 error.
```json
{
    "error": "Parent node not found"
}
```

## Implementation Notes
- The sample code provided uses an simple JSON file (treeData) to represent the tree structure. In a real-world scenario, we should replace this with actual database interactions.
- We may need to implement a mechanism for generating unique node IDs. The sample code uses a simple random number generation approach. In a production environment, consider using a more robust ID generation method.
- Additional error handling and validation should be implemented based on our specific requirements.
