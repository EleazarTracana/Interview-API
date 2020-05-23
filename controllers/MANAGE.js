var client = require('../base_de_datos/Cliente.js')

module.exports = {
    GetParamsByName: async function search(name) {
        var allparams  = await client.params();
        var param = allparams.findOne({"parameter_name": name});
        return param;
     }
}