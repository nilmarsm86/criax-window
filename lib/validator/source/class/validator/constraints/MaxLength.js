 /**  
  * Clase para las validacion de cantidad maxima de caracteres
  * 
  * @class MaxLength
  * @extends validator.constraints.Constraint
  * @author Nilmar Sanchez M
  * @namespace validator.constraints  
  * @copyrigth 
  * @license
  * @version 2.0
  *
  */  

qx.Class.define("validator.constraints.MaxLength",
{   
    extend : validator.constraints.Constraint,
    
    /**
     * @property
     */
    properties :
    {
        /**
         * propiedad para la longitud
         * 
         * @name __maxLength
         * @private
         * @type {Number}
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
         * metodo para validar que el dato pasado sea de la longitud maxima deseada
         * 
         * @method validate
         * @public        
         * @param errorMessage {String}: mensaje de error, posee uno por defecto
         * @param maxLength {Number} longitud maxima
         * @return {Function} funcion de validacion, toma como unico parametro
         * el valor a validar
         *
         */
        
        validate : function(errorMessage, maxLength) {            
            return function(value){
                var constraint = new validator.constraints.MaxLength(value);                
                constraint.setMessage(errorMessage);
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
        this._message = "Debe tener menos de %s caracteres!";        
        this._value = value;
        this.__maxLength = 0;
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
            if(this._value.length > this.__maxLength){
                throw new qx.core.ValidationError("Validation Error", this._message.replace(/\%d/g,this.__maxLength));
            }
        },
        
        /**
         *  metodo para establecer la longitud maxima
         *
         * @method length
         * @public
         * @param maxLength {Number} longitud maxima
         * 
         */
        
        setMaxLength : function(maxLength){
            this.__maxLength = maxLength;
        }
        
    }
});