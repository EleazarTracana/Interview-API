var client = require('../base_de_datos/Cliente')
module.exports = {
    searchOne: async function search(username){
        var users = await client.users();
        var usuario    = await users.findOne({"username": username});
        return  usuario;
    },
    searchAll : async function search(){
        var users = await client.users();
        var usuarios   = await users.find({}).toArray();
        return usuarios;
    },
    addUser: async function add(user){
        var users = await client.users();
        var resultado  = await users.insertOne(user);
        return resultado;
    },
    deleteUser: async function Delete(user) {
        var users = await client.users();
        var resultado  = await users.deleteOne({_id: user.id});
        return resultado;
    },
    updateCandidate: async function Update(user){
        var users = await client.user();
        var resultado           = await users.update(
            { _id: user.id },
            { $set: user },
        )
        return resultado;
    }
}