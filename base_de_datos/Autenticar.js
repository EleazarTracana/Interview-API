const responses     = require('../Modulos/constantes');
const jwt           = require('jsonwebtoken');
const config        = require('../config');
const client = require('../base_de_datos/Cliente');

module.exports = {
    createtoken: function create(){
        var secure = this.Random(0,999999);
        var token  = jwt.sign({Seguridad:secure},config.secret)
        return token;
    },
    validate: async function validate(_username,password){ 
        var users_db = await client.users(),
            user     = await users_db.findOne({username: _username}),
            result;
        if(user == null){
              result = responses.userNotFound
        }else{
           if(user.password == password){
             user.token = this.createtoken();
             result = user;
           }else{
             result = responses.incorrect;
           }
        }
        return result;
    },
    token:  async (req) => {
      try{
      var token = req.headers['authorization'];
      if (token.startsWith('Bearer ')) {
        token = token.slice(7, token.length);
      }
      if (token) {
       resultado = await jwt.verify(token, config.secret)
       return resultado;
      }
    }catch (e){
      throw e;
    }
    },
    Random: function random(low, high) {
        return Math.random() * (high - low) + low
      }
}