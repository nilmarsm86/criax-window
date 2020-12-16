 /**  
  * Clase para la validacion de tiempo
  * 
  * @class Time
  * @extends validator.constraints.Constraint
  * @author Nilmar Sanchez M
  * @namespace validator.constraints  
  * @copyrigth 
  * @license
  * @version 2.0
  *
  */  

qx.Class.define("validator.constraints.Time",
{   
    extend : validator.constraints.Constraint,
    
    /**
     * @property
     */
    properties :
    {
        
    },
    
    /**
     * @method
     */ 
    statics :
    {   
        /**         
         * metodo para validar que el dato pasado sea un numero o una letra
         * 
         * @method validate
         * @public        
         * @param errorMessage {String}: mensaje de error, posee uno por defecto
         * @return {Function} funcion de validacion, toma como unico parametro
         * el valor a validar
         *
         */
        
        validate : function(errorMessage) {            
            return function(value){
                var constraint = new validator.constraints.Time(value);                
                constraint.setMessage(errorMessage);
                constraint.validate();
            };
        }
    },
    
    /**
     * metodo de inicializacion de la clase
     *
     * @constructor
     * @public
     * @param value {var} valor a validar
     */
    
    construct : function(value)
    {
        this._message = "Hora incorrecta!";
        this._pattern = /^([0-9]{2}):([0-9]{2}):[0-9]{2}$/;        
        this._value = value;
    },
    
    /**
     * @method
     */
    members :
    {
        /**
         *  metodo para validar basado en el patron
         *
         * @method validate
         * @public 
         * @throws {qx.core.ValidationError}
         * 
         */
        
        validate : function(){
            this.base(arguments);
            this.__splitTime(this._value.substring(0,2), 24, this._message || "La hora debe ser menor que 24!");
            this.__splitTime(this._value.substring(3,5), 60, this._message || "Los minutos deben ser menor que 60!");
            this.__splitTime(this._value.substring(6,8), 60, this._message || "Los segundos deben ser menor que 60!");
        },
        
        /**
         *  metodo para verificar la hora, los minutos y segundos
         *
         * @method __splitTime
         * @private
         * @param part {String} dato del tiempo (hora, min, seg)
         * @param limit {Number} maximo del elemento de tiempo
         * @param message {String} mensje de error
         * @throws {qx.core.ValidationError}
         * 
         */
        
        __splitTime : function(part, limit, message){
            if(part >= limit){                
                throw new qx.core.ValidationError("Validation Error", message);                
            }
        }
    }
});