 /**  
  * Clase para las validacion de no igualdad
  * 
  * @class NotEqualTo
  * @static  
  * @author Nilmar Sanchez M
  * @namespace validator.constraints  
  * @copyrigth 
  * @license
  * @version 2.0
  *
  */  

qx.Class.define("validator.constraints.NotEqualTo",
{   
    extend : validator.constraints.Constraint,
    
    /**
     * @property
     */
    properties :
    {
        /**
         * el valor con el que comparar
         * 
         * @name __comparison
         * @private
         * @type {var}
         * 
         */
        __comparison : {}
    },
    
    /**
     * @method
     */ 
    statics :
    {   
        /**         
         * metodo para validar que el dato pasado no sea igual que la comparacion
         * 
         * @method validate
         * @public        
         * @param errorMessage {String}: mensaje de error
         * @param comparison {var} valor contra el cual se va a comparar
         * @return {Boolean} si es valido el campo
         *
         */
        
        validate : function(errorMessage, comparison) {            
            return function(value){
                var constraint = new validator.constraints.NotEqualTo(value);                
                constraint.setMessage(errorMessage);
                constraint.setComparison(comparison);
                constraint.validate();
            };
        }
    },
    
    /**
     * metodo de inicializacion de la clase
     *
     * @constructor
     * @public
     * @param value {var} valor original a comparar
     */
    
    construct : function(value)
    {
        this._message = "No debe ser igual a %s!";        
        this._value = value;        
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
         * 
         */
        
        validate : function(){
            if(this._value == this.__comparison){
                throw new qx.core.ValidationError("Validation Error", this._message.replace(/\%s/g,this.__comparison));
            }
        },
        
        /**
         *  metodo para establecer el valor contra el cual comparar
         *
         * @method setComparison
         * @public
         * @param comparison {vars} valor contral el cual comparar
         * 
         */
        
        setComparison : function(comparison){
            this.__comparison = comparison;
        }
        
    }
});