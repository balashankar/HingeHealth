const express = require("express");
const { getTree, postTree } = require("./api/tree");

//Need to run 'npm i path' to install path package. This will create instance for file paths.
const path = require('path');

//create an express server and set the port to run
const app = express();
const port = 3001;

// Parse JSON request bodies
app.use(express.json());

// Route handlers to be defined below
app.get("/api/tree", getTree);
app.post("/api/tree", postTree);

app.get('^/$|/index(.html)?',(req, res)=>{
  res.sendFile(path.join(__dirname,'views','index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
