 /**  
  * Clase para las validacion de longitud este entre un minimo y un maximo
  * 
  * @class RangeLength
  * @extends validator.constraints.Constraint
  * @author Nilmar Sanchez M
  * @namespace validator.constraints  
  * @copyrigth 
  * @license
  * @version 2.0
  *
  */  

qx.Class.define("validator.constraints.RangeLength",
{   
    extend : validator.constraints.Constraint,
    
    /**
     * @property
     */
    properties :
    {
        /**
         * objeto de la longitud minima
         * 
         * @name __minLength
         * @private
         * @type {validator.constraints.MinLength}
         * 
         */
        __minLength : {},
        
        /**
         * objeto de la longitud maxima
         * 
         * @name __maxLength
         * @private
         * @type {validator.constraints.MaxLength}
         * 
         */
        __maxLength : {}
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
         * @param minLength {Number} longitud minima
         * @param maxLength {Number} longitud maxima
         * @return {Function} funcion de validacion, toma como unico parametro
         * el valor a validar
         *
         */
        
        validate : function(errorMessage, minLength, maxLength) {            
            return function(value){
                var constraint = new validator.constraints.RangeLength(value);                
                constraint.setMessage(errorMessage);
                constraint.setMinLength(minLength);
                constraint.setMaxLength(maxLength);
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
        this.__minLength = new validator.constraints.MinLength(this._value);
        this.__maxLength = new validator.constraints.MaxLength(this._value);
        
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
            this.__minLength.validate();
            this.__maxLength.validate();
        },
        
        /**
         *  metodo para establecer la longitud del contenido
         *
         * @method setMinLength
         * @public
         * @param minLength {Number} longitud minima
         * 
         */
        
        setMinLength : function(minLength){
            this.__minLength.setMinLength(minLength);
        },
        
        /**
         *  metodo para establecer la longitud maxima
         *
         * @method setMaxLength
         * @public
         * @param maxLength {Number} longitud maxima
         * 
         */
        
        setMaxLength : function(maxLength){
            this.__maxLength.setMaxLength(maxLength);
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
            this.__minLength.setMessage(message);
            this.__maxLength.setMessage(message);
            
        }
        
    }
});