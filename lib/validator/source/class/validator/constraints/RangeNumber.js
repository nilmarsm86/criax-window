 /**  
  * Clase para las validacion de numero maximo y minimo
  * 
  * @class RangeNumber
  * @extends validator.constraints.Constraint
  * @author Nilmar Sanchez M
  * @namespace validator.constraints  
  * @copyrigth 
  * @license
  * @version 2.0
  *
  */  

qx.Class.define("validator.constraints.RangeNumber",
{   
    extend : validator.constraints.Constraint,
    
    /**
     * @property
     */
    properties :
    {
        /**
         * objeto del numero minimo
         * 
         * @name __minNumber
         * @private
         * @type {validator.constraints.MinNumber}
         * 
         */
        __minNumber : {},
        
        /**
         * objeto del numero maximo
         * 
         * @name __maxNumber
         * @private
         * @type {validator.constraints.MaxNumber}
         * 
         */
        __maxNumber : {}
    },
    
    /**
     * @method
     */ 
    statics :
    {   
        /**         
         * metodo para validar que el dato pasado sea de la longitud deseada
         * 
         * @method validate
         * @public        
         * @param errorMessage {String}: mensaje de error
         * @param minNumber {Number} numero minima
         * @param maxNumber {Number} numero maxima
         * @return {Function} funcion de validacion, toma como unico parametro
         * el valor a validar
         *
         */
        
        validate : function(errorMessage, minNumber, maxNumber) {            
            return function(value){
                var constraint = new validator.constraints.RangeNumber(value);                
                constraint.setMessage(errorMessage);
                constraint.setMinNumber(minNumber);
                constraint.setMaxNumber(maxNumber);
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
        this._value = value;        
        this.__minNumber = new validator.constraints.MinNumber(this._value);
        this.__maxNumber = new validator.constraints.MaxNumber(this._value);
        
    },
    
    /**
     * @method
     */
    members :
    {
        /**
         *  metodo para validar
         *
         * @method validate
         * @public 
         * @throws {qx.core.ValidationError}
         */
        
        validate : function(){
            this.__minNumber.validate();
            this.__maxNumber.validate();
        },
        
        /**
         *  metodo para establecer el numero minimo
         *
         * @method setMinNumber
         * @public
         * @param minNumber {Number} numero minimo
         * 
         */
        
        setMinNumber : function(minNumber){
            this.__minNumber.setMinNumber(minNumber);
        },
        
        /**
         *  metodo para establecer el numero maximo
         *
         * @method setMaxNumber
         * @public
         * @param maxNumber {Number} numero maxima
         * 
         */
        
        setMaxNumber : function(maxNumber){
            this.__maxNumber.setMaxNumber(maxNumber);
        },
        
        /**
         *  metodo para establecer el mensaje de error
         *
         * @method setMessage
         * @public
         * @param message {String} mensaje de error
         * 
         */
        
        setMessage : function(message){
            //this._message = message;
            this.__minNumber.setMessage(message);
            this.__maxNumber.setMessage(message);
            
        }
        
    }
});