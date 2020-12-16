 /**  
  * Clase para las validacion de true
  * 
  * @class IsTrue
  * @extends validator.constraints.IdenticalTo
  * @author Nilmar Sanchez M
  * @namespace validator.constraints  
  * @copyrigth 
  * @license
  * @version 2.0
  *
  */  

qx.Class.define("validator.constraints.IsTrue",
{   
    extend : validator.constraints.IdenticalTo,
    
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
         * metodo para validar que el dato pasado sea true
         * 
         * @method validate
         * @public        
         * @param errorMessage {String}: mensaje de error, posee uno por defecto
         * @return {Function} funcion de validacion, toma como unico parametro
         * el valor a validar
         *
         */
        
        validate : function(errorMessage) {            
            return function(value){
                var constraint = new validator.constraints.IsTrue(value);                
                constraint.setMessage(errorMessage);
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
        this._message = "Debe ser verdadero!";                
        this._value = value;
        this._comparison = true;
    },
    
    /**
     * @method
     */
    members :
    {
                
    }
});