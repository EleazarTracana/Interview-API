module.exports = class ResponseMessage{
    constructor(error,codigo,mensaje) {
        this.error  = error;
        this.codigo = codigo;
        this.mensaje = mensaje; 
      }
}