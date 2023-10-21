class Show {
    constructor() {
        app.get('/showTree(.html)?',(req, res)=>{
            res.sendFile(path.join(__dirname,'views','showTree.html'));
          })
          
    }
  }