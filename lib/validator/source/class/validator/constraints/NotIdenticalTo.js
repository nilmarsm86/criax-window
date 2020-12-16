 /**  
  * Clase para las validacion de no identico
  * 
  * @class NotIdenticalTo
  * @static  
  * @author Nilmar Sanchez M
  * @namespace validator.constraints  
  * @copyrigth 
  * @license
  * @version 2.0
  *
  */  

qx.Class.define("validator.constraints.NotIdenticalTo",
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
         * @name _comparison
         * @private
         * @type {var}
         * 
         */
        _comparison : {}
    },
    
    /**
     * @method
     */ 
    statics :
    {   
        /**         
         * metodo para validar que el dato pasado sea identico que la comparacion
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
                var constraint = new validator.constraints.NotIdenticalTo(value);                
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
     * @param value {vars} valor original a comparar
     */
    
    construct : function(value)
    {
        this._message = "No debe ser id"+'\u00e9'+"ntico a %s!";        
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
            if(this._value === this._comparison){
                throw new qx.core.ValidationError("Validation Error", this._message.replace(/\%s/g,this._comparison));
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
            this._comparison = comparison;
        }
        
    }
});