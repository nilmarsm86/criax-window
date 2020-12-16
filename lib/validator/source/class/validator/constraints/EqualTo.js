 /**  
  * Clase para las validacion de igualdad
  * 
  * @class EqualTo
  * @extends validator.constraints.Constraint
  * @author Nilmar Sanchez M
  * @namespace validator.constraints  
  * @copyrigth 
  * @license
  * @version 2.0
  *
  */  

qx.Class.define("validator.constraints.EqualTo",
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
         * @protected
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
         * metodo para validar que el dato pasado sea igual que la comparacion
         * no estricta
         * 
         * @method validate
         * @public        
         * @param errorMessage {String}: mensaje de error, posee uno por defecto
         * @param comparison {var} comparacion
         * @return {Function} funcion de validacion, toma como unico parametro
         * el valor a validar
         *
         */
        
        validate : function(errorMessage, comparison) {            
            return function(value){
                var constraint = new validator.constraints.EqualTo(value);                
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
     * @param value {var} valor a validar
     */
    
    construct : function(value)
    {
        this._message = "Debe ser igual a %s!";        
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
         * @throws {qx.core.ValidationError}
         */
        
        validate : function(){
            if(this._value != this._comparison){
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