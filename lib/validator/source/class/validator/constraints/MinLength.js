 /**  
  * Clase para las validacion de longitud minima de testo
  * 
  * @class MinLength
  * @extends validator.constraints.Constraint
  * @author Nilmar Sanchez M
  * @namespace validator.constraints  
  * @copyrigth 
  * @license
  * @version 2.0
  *
  */  

qx.Class.define("validator.constraints.MinLength",
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
         * @name __minLength
         * @private
         * @type {Number}
         * 
         */
        __minLength : {}
    },
    
    /**
     * @method
     */ 
    statics :
    {   
        /**         
         * metodo para validar que el dato pasado sea de la longitud minima deseada
         * 
         * @method validate
         * @public        
         * @param errorMessage {String}: mensaje de error, posee uno por defecto
         * @param minLength {Number} longitud minima
         * @return {Function} funcion de validacion, toma como unico parametro
         * el valor a validar
         *
         */
        
        validate : function(errorMessage, minLength) {            
            return function(value){
                var constraint = new validator.constraints.MinLength(value);                
                constraint.setMessage(errorMessage);
                constraint.setMinLength(minLength);
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
        this._message = "Debe tener m"+'\u00e1'+"s de %s caracteres!";        
        this._value = value;
        this.__minLength = 0;
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
            if(this._value.length < this.__minLength){
                throw new qx.core.ValidationError("Validation Error", this._message.replace(/\%d/g,this.__minLength));
            }
        },
        
        /**
         *  metodo para establecer la longitud del contenido
         *
         * @method setMinLength
         * @public
         * @param length {Number}
         * 
         */
        
        setMinLength : function(length){
            this.__minLength = length;
        }
        
    }
});