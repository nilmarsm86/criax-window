 /**  
  * Clase para las validacion a partir de un patron pasado
  * 
  * @class Pattern
  * @extends validator.constraints.Constraint
  * @author Nilmar Sanchez M
  * @namespace validator.constraints  
  * @copyrigth 
  * @license
  * @version 2.0
  *
  */  

qx.Class.define("validator.constraints.Pattern",
{   
    extend : validator.constraints.Constraint,
    
    /**
     * @property
     */
    properties :
    {
        
    },
    
    /**
     * @method
     */ 
    statics :
    {   
        /**         
         * metodo para validar que el dato pasado sea un numero o una letra
         * 
         * @method validate
         * @public        
         * @param errorMessage {String}: mensaje de error
         * @param pattern {RegExp} patron contra el cual validar
         * @return {Function} funcion de validacion, toma como unico parametro
         * el valor a validar
         *
         */
        
        validate : function(errorMessage, pattern) {            
            return function(value){
                var constraint = new validator.constraints.Pattern(value);                
                constraint.setMessage(errorMessage);
                constraint.setPattern(pattern);
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
    },
    
    /**
     * @method
     */
    members :
    {
        
    }
});