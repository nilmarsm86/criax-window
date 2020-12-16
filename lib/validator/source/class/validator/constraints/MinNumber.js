 /**  
  * Clase para las validacion de numero minimo
  * 
  * @class MinNumber
  * @extends validator.constraints.Number
  * @author Nilmar Sanchez M
  * @namespace validator.constraints  
  * @copyrigth 
  * @license
  * @version 2.0
  *
  */  

qx.Class.define("validator.constraints.MinNumber",
{   
    extend : validator.constraints.Number,
    
    /**
     * @property
     */
    properties :
    {
        /**
         * propiedad para el numero maximo
         * 
         * @name __minNumber
         * @private
         * @type {Number}
         * 
         */
        __minNumber : {}
    },
    
    /**
     * @method
     */ 
    statics :
    {   
        /**         
         * metodo para validar que el dato pasado sea mayor que numero
         * 
         * @method validate
         * @public        
         * @param errorMessage {String}: mensaje de error
         * @param minNumber {Number} numero minimo
         * @param decimals {Boolean} si se aceptan numero decimales
         * @return {Function} funcion de validacion, toma como unico parametro
         * el valor a validar
         *
         */
        
        validate : function(errorMessage, minNumber, decimals) {            
            return function(value){
                var constraint = new validator.constraints.MinNumber(value);                
                constraint.setMessage(errorMessage);
                constraint.setMinNumber(minNumber);
                constraint.setDecimals(decimals);
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
        this._decimals = false;
        this.__minNumber = 0;
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
            this.base(arguments); 
            var message = this._message || "El n"+'\u00fa'+"mero debe ser mayor o igual que %d";
            if(this._value < this.__minNumber){
                throw new qx.core.ValidationError("Validation Error", message.replace(/\%d/g,this.__minNumber));
            }
        },
        
        
        /**
         *  metodo para establecer el numero maximo
         *
         * @method setMinNumber
         * @public
         * @param minNumber {Number} numero minimo
         * 
         */
        
        setMinNumber : function(minNumber){
            this.__minNumber = minNumber;
        }        
        
    }
});