//Librerias 
const auth               = require('../base_de_datos/Autenticar');
const param              = require('../controllers/MANAGE.js');
const constantes         = require('../Modulos/APIconstantes.js')
 
module.exports = function(app){
    
  app.post('/Login', async (req,res)=>{
       var resultado = await auth.validate(req.body.name,req.body.password);
       res.send(resultado);
  });
  app.get('/param',async (req,res) => {
     try{ 
       await auth.token(req);
       console.log(req.query.name);
       var params = param.GetParamsByName(req.query.name);
       res.send(params);
      }catch(e){
        console.log(e);
        res.send(constantes.invalid());
      }
    })
  };
