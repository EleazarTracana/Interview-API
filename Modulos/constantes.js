
const ResponseMessage    = require('./models.js');

module.exports = {

    invalid:          new ResponseMessage(true, 403, 'invalid token'),
    genericError:     new ResponseMessage(true, 500, 'an error has ocurred'),
    candidateNoFound: new ResponseMessage(true, 404, 'candidate not found'),
    candidateExist:   new ResponseMessage(true, 403, 'candidate cannot by added. Already Exist'),
    paramNotFound:    new ResponseMessage(true, 404, 'Param not found'),
    candidateAdded:   new ResponseMessage(false, 200, 'your candidate has been added successfully'),
    userNotFound:     new ResponseMessage(true, 404, 'user not found'),
    incorrect:        new ResponseMessage(true, 403, 'user/password incorrect'),
    validated(token){
        return new ResponseMessage(false,200,token)
    }
}