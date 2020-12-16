 /**  
  * Clase para las validacion de numeros maximo
  * 
  * @class MaxNumber
  * @extends validator.constraints.Number
  * @author Nilmar Sanchez M
  * @namespace validator.constraints  
  * @copyrigth 
  * @license
  * @version 2.0
  *
  */  

qx.Class.define("validator.constraints.MaxNumber",
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
         * @name __maxNumber
         * @private
         * @type {Number}
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
         * metodo para validar que el dato pasado sea menor que numero
         * 
         * @method validate
         * @public        
         * @param errorMessage {String}: mensaje de error
         * @param maxNumber {Number} numero maximo
         * @param decimals {Boolean} si se aceptan numero decimales
         * @return {Function} funcion de validacion, toma como unico parametro
         * el valor a validar
         *
         */
        
        validate : function(errorMessage, maxNumber, decimals) {            
            return function(value){
                var constraint = new validator.constraints.MaxNumber(value);                
                constraint.setMessage(errorMessage);
                constraint.setMaxNumber(maxNumber);
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
        this.__maxNumber = 0;
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
            var message = this._message || "El n"+'\u00fa'+"mero debe ser menor o igual que %d";
            if(this._value > this.__maxNumber){
                throw new qx.core.ValidationError("Validation Error", message.replace(/\%d/g,this.__maxNumber));
            }
        },
        
        
        /**
         *  metodo para establecer el numero maximo
         *
         * @method setMaxNumber
         * @public
         * @param maxNumber {Number} numero maximo
         * 
         */
        
        setMaxNumber : function(maxNumber){
            this.__maxNumber = maxNumber;
        }        
        
    }
});