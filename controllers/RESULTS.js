var client = require('../base_de_datos/Cliente')
var candidate_functions = require('../controllers/CANDIDATES');

async function get_next_question(dni_user,question,pool_id){
  
    var candidate_db = await client.candidates(),
        pool_db   = await client.tecnologies(),
        candidate = await candidate_db.findOne({dni:dni_user}),
        pool      = await pool_db.findOne({_id:pool_id}),
        candidate_questions = candidate.results,
        pool_questions = pool.questions,
        current_sum_candidate = 0,
        current_length_candidate = candidate_questions.length;

        candidate_questions.forEach(question => {current_sum_candidate += question.score})
        let next_difficulty = Math.round(current_sum_candidate/current_length_candidate); 
        
        for(var question in pool_question)


}