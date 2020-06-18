var client = require('../base_de_datos/Cliente'),
    lambda = require('lodash');
const linkedinUriBase = "https://www.linkedin.com/in/"
const githubUriBase = "https://github.com/";


module.exports = {
    searchOne: async function search(id){
        var candidates = await client.candidates();
        var usuario    = await candidates.findOne({"_id":parseInt(id)});
        this.InsertLinks(usuario);
        return  usuario;
    },
    searchAll : async function search(){
        var candidates_db = await client.candidates(),
            results_db    = await client.results(),
            candidates    = await candidates_db.find({}).toArray(),
            results       = await results_db.find({}).toArray();
        
        if(candidates != null)
            candidates.forEach(value => this.InsertLinks(value));

        for(var cand in candidates){
            result_cand = results.find( x => x.candidate_id == cand._id);
            if(result_cand.finished){
                cand.finished = true;
                cand.pending  = false;
            }else if(result_cand.results > 0 && !result_cand.finished){
                cand.finished = false;
                cand.pending  = true;
            }else if(result_cand.results == 0 && !result_cand.finished){
                cand.finished = false;
                cand.pending  = false;
            }
        }
        return candidates;
    },
    addCandidate: async function add(candidate){
        var candidates = await client.candidates();
        var resultado  = await candidates.insertOne(candidate);
        return resultado;
    },
    deleteCandidate: async function Delete(id) {
        var candidates = await client.candidates();
        var resultado  = await candidates.deleteOne({_id: id});
        return resultado;
    },
    updateCandidate: async function Update(candidate){
        var candidates = await client.candidates();
        var resultado           = await candidates.updateOne(
            { _id: candidate.id },
            { $set: candidate }
        );
        return resultado;
    },
    InsertLinks: function insert(usuario){
        if(usuario != null){
            if(usuario.github != "")
                usuario.github = githubUriBase + usuario.github;
            if(usuario.linkedin != "")
                usuario.linkedin = linkedinUriBase + usuario.linkedin;   
        }
        return usuario;
    }
}
