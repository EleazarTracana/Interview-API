
const factory    = require('./models.js');

module.exports = {

    invalid:          new factory.Message(true, "403", 'Invalid token'),
    genericError:     new factory.Message(true, "500", 'An error has ocurred'),
    candidateNoFound: new factory.Message(true, "404", 'Candidate not found'),
    candidateExist:   new factory.Message(true, "403", 'Candidate cannot by added. Already Exist'),
    paramNotFound:    new factory.Message(true, "404", 'Param not found'),
    candidateAdded:   new factory.Message(false,"200", 'Your candidate has been added successfully'),
    userNotFound:     new factory.Message(true, "404", 'User not found'),
    incorrect:        new factory.Message(true, "403", 'User/password incorrect'),
    validated(token){
        return new factory.Message(false,"200",token)
    }
}