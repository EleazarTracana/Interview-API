//Librerias 
const controller_users    = require('../controllers/USERS');
const responses           = require('../Modulos/constantes');
const auth                = require('../base_de_datos/Autenticar');
 
module.exports = function(app){
    
  app.get('/user/all',async (req,res) => {
      try{
          await auth.token(req);
          var users = await controller_users.searchAll()
          res.send(users);
      }catch (e){
        res.send(responses.invalid);
      }
    });
   app.get('/admins/check', async(req,res)=>{
      try{
         await auth.token(req);
         var users = await controller_users.searchAll();
         var counter = 0;
         for(var _user in users){
            if(_user.rol == "Administrador"){
               counter++;
            }
         }
      }catch(e){
         res.send(responses.invalid);
      }
   })
   app.get('/user/search', async (req,res) =>{
      try{
         await auth.token(req)
         var user = await controller_users.searchOne(req.query.username)
         if(user === 'undefined' || user == null){
            res.send(responses.candidateNoFound)
           }else{
            res.send(user);
           }
      }catch (e){
        res.send(JSON.stringify(responses.invalid.toString()));
       }
   });
   app.post('/user/add', async (req,res) =>{
    try{
       await auth.token(req)
       var result;
       var user = await controller_users.searchOne(req.body.username);
       if(user == null || user === 'undefined'){
          var added = await controller_users.addUser(req.body)
          if(added){
            result = responses.candidateAdded;
          }else{
            result = responses.genericError;
          }
       }else{
          result = responses.candidateExist;  
       }
       res.send(result);
    }catch  (e){
       console.log(e);
      res.send(e);
     }
   });
   app.delete('/user/delete',async(req,res)=>{
    try{
      await auth.token(req)
      var result;
      var user = await controller_users.searchOne(req.body.username)
      if(user){
         result = await controller_users.deleteUser(req.body.id);
      }else{
         result = responses.candidateNoFound;  
      }
      res.send(result);
   }catch{
     res.send(responses.invalid);
    }
   });
}