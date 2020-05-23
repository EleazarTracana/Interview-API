//Librerias 
const controllerUsers    = require('../controllers/CANDIDATES');
const responses          = require('../Modulos/APIconstantes');
const auth               = require('../base_de_datos/Autenticar');
 
module.exports = function(app){
    
  app.get('/allCandidates',async (req,res) => {
      try{
          await auth.token(req)
          var users = await controllerUsers.searchAll()
          res.send(users);
      }catch (e){
        res.send(responses.invalid());
      }
    });
   app.get('/searchCandidate', async (req,res) =>{
      try{
         await auth.token(req)
         var user = await controllerUsers.searchOne(req.query.id)
         if(!user){
          res.send(responses.candidateNoFound())
         }else{
          res.send(user);
         }
      }catch{
        res.send(responses.invalid());
       }
   });
   app.post('/addCandidate', async (req,res) =>{
    try{
       await auth.token(req)
       var result;
       var user = await controllerUsers.searchOne(req.body.id)
       if(!user){
          var added = await controllerUsers.addCandidate(req.body)
          if(added){
            result = responses.candidateAdded();
          }else{
            result = responses.genericError();
          }
       }else{
          result = responses.candidateExist();  
       }
       res.send(result);
    }catch{
      res.send(responses.invalid());
     }
   });
   app.delete('/deleteCandidate',async(req,res)=>{
    try{
      await auth.token(req)
      var result;
      var user = await controllerUsers.searchOne(req.body.id)
      if(user){
         result = await controllerUsers.deleteCandidate(req.body.id);
      }else{
         result = responses.candidateNoFound();  
      }
      res.send(result);
   }catch{
     res.send(responses.invalid());
    }
   });
   app.post('/updateCandidate',async(req, res) =>{
    try{
      await auth.token(req)
      var result;
      var user = await controllerUsers.searchOne(req.body.id)
      if(user){
         result = await controllerUsers.updateCandidate(req.body);
      }else{
         result = responses.candidateNoFound();  
      }
      res.send(result);
    }catch{
     res.send(responses.invalid());
    }
   });
}