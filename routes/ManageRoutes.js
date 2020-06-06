//Librerias 
const auth               = require('../base_de_datos/Autenticar');
const controller         = require('../controllers/MANAGE.js');
const constantes         = require('../Modulos/constantes.js')
 
module.exports = function(app){
    
  app.post('/login', async (req,res)=>{
       var resultado = await auth.validate(req.body.username,req.body.password);
       res.send(resultado);
  });
  app.post('/email/credentials', async(req,res) => {
    try{
        await auth.token(req);
        let sender = await controller.sendEmail_credentials(req.body.email,req.body.username,req.body.password);
        res.send(sender)
      }catch(error){
        res.send(error)
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
    }

