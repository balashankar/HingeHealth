// Importing express framework. Express will provide simplified way of creating server side scripting.
const express = require('express');
const app = express();

// Need to run 'npm i path' to install path package. This will create instance for file paths.
const path = require('path');

/* Assigning the defined port in the assignment. 
While moving to higher environment/stage, alternative is provided. */
const PORT = 3001 || process.env.port;

// Route handlers to be defined below
const{getTree, postTree} = require("./api/tree");

//creating get api call
app.get('^/$|/home(.html)?',(req, res)=>{
  res.sendFile(path.join(__dirname,'views','home.html'));
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
