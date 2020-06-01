
const ResponseMessage    = require('./models.js');

module.exports = {

    invalid:          new ResponseMessage(true, "403", 'Invalid token'),
    genericError:     new ResponseMessage(true, "500", 'An error has ocurred'),
    candidateNoFound: new ResponseMessage(true, "404", 'Candidate not found'),
    candidateExist:   new ResponseMessage(true, "403", 'Candidate cannot by added. Already Exist'),
    paramNotFound:    new ResponseMessage(true, "404", 'Param not found'),
    candidateAdded:   new ResponseMessage(false,"200", 'Your candidate has been added successfully'),
    userNotFound:     new ResponseMessage(true, "404", 'User not found'),
    incorrect:        new ResponseMessage(true, "403", 'User/password incorrect'),
    validated(token){
        return new ResponseMessage(false,"200",token)
    }
}