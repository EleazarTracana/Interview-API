//Librerias 
const auth               = require('../base_de_datos/Autenticar');
const controller              = require('../controllers/MANAGE.js');
const constantes         = require('../Modulos/constantes.js')
 
module.exports = function(app){
    
  app.post('/Login', async (req,res)=>{
       var resultado = await auth.validate(req.body.name,req.body.password);
       res.send(resultado);
  });
  app.post('/email/test', async(req,res) => {
    try{
        await auth.token(req);
        let sender = await controller.sendEmail(req.body.email);
        res.send(sender)
      }catch(error){
        res.send("error")
      }
  });
  app.get('/param',async (req,res) => {
     try{ 
       await auth.token(req);
       var params = await controller.GetAll();
       res.status(200).send(params);
      }catch(e){
        res.send(constantes.invalid);
      }
    });
   app.post('/validate',async (req,res) => {
      try{ 
        await auth.token(req);
        var newtoken = await auth.verifyTokenUser(req.body.user,req.body.token);
        res.send(newtoken);
       }catch(e){
         res.send(constantes.invalid);
       }
     }),
     app.post('/createtoken',async (req,res) => {
      try{ 
        await auth.token(req);
        var mytoken = await auth.createTokenUser(req.body);
        var json = { 

          token:mytoken.toString(),
          user:req.body,
          expired:false
        }
        res.json(json);
       }catch(e){
         res.send(constantes.invalid);
       }
     });
    }

