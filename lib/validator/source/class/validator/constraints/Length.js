 /**  
  * Clase para las validacion de longitud de testo
  * 
  * @class Length
  * @extends validator.constraints.Constraint
  * @author Nilmar Sanchez M
  * @namespace validator.constraints  
  * @copyrigth 
  * @license
  * @version 2.0
  *
  */  

qx.Class.define("validator.constraints.Length",
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
         * @name __length
         * @private
         * @type {Number}
         * 
         */
        __length : {}
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
         * @param errorMessage {String}: mensaje de error, posee uno por defecto
         * @param length {Number} longitud
         * @return {Function} funcion de validacion, toma como unico parametro
         * el valor a validar
         *
         */
        
        validate : function(errorMessage, length) {            
            return function(value){
                var constraint = new validator.constraints.Length(value);                
                constraint.setMessage(errorMessage);
                constraint.setLength(length);
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
        this._message = "Debe tener exactamente %d caracteres!";        
        this._value = value;
        this.__length = 0;
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
            if(this._value.length !== this.__length){
                throw new qx.core.ValidationError("Validation Error", this._message.replace(/\%d/g,this.__length));
            }
        },
        
        /**
         *  metodo para establecer la longitud del contenido
         *
         * @method length
         * @public
         * @param length {Number}
         * 
         */
        
        setLength : function(length){
            this.__length = length;
        }
        
    }
});