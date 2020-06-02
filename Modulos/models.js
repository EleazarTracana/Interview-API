module.exports = {
    Message : ResponseMessage,
    Results : Results
}
class ResponseMessage{
  constructor(error,codigo,mensaje) {
      this.error  = error;
      this.codigo = codigo;
      this.mensaje = mensaje; 
    }
  }
class Results{
  constructor(dni,technology,results,pk){
    this.technology = technology,
    this.candidate_id = dni,
    this.results = results
    this._id = pk
  }
}