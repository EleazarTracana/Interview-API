const controller_pools   = require('../controllers/POOLS');
const responses          = require('../Modulos/constantes');
const auth               = require('../base_de_datos/Autenticar');
 
module.exports = function(app){
    
  app.get('/technologies/dropdown',async (req,res) => {
    try{
        await auth.token(req)
        var tecnologies = await controller_pools.technologies_dropdown_list()
        res.send(tecnologies);
    }catch{
      res.send(responses.invalid);
    }
  });
  app.get('/pools/question/add',async (req,res) => {
    try{
        await auth.token(req);
        let question = JSON.parse(req.body.question);
        let pool_id  = req.body.poolId;
        var pools = await controller_pools.poolAddQuestion(pool_id,question);
        res.send(pools);
    }catch (e){
      res.send(responses.invalid);
    }
  });
  app.get('/pools', async (req,res) =>{
    try{

      await auth.token(req)
      var tech = req.query.technology,
      name = req.query.name,
      pools,
      array = [];

      if(tech != null && name != null){
        pools = await controller_pools.poolTwoParams(name,tech);
      }else if(tech != null && name == null){
        pools = await controller_pools.poolsBytechnology(tech);
      }else if(tech == null && name !=null){
        pools = await controller_pools.poolByName(name);
      }else{
        pools = await controller_pools.poolsAll();
      }
      if(pools instanceof Array){
        res.status(200).send(pools)
      }else{
        array.push(pools)
        res.send(array);
      }
    }catch{
      res.status(403).send(responses.invalid);
    }
  });
}