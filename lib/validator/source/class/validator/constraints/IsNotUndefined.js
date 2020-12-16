 /**  
  * Clase para las validacion de no undefined
  * 
  * @class IsNotUndefined
  * @extends validator.constraints.NotIdenticalTo 
  * @author Nilmar Sanchez M
  * @namespace validator.constraints  
  * @copyrigth 
  * @license
  * @version 2.0
  *
  */  

qx.Class.define("validator.constraints.IsNotUndefined",
{   
    extend : validator.constraints.NotIdenticalTo,
    
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
         * metodo para validar que el dato pasado no sea indefinido
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
                var constraint = new validator.constraints.IsNotUndefined(value);                
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
        this._message = "No debe ser indefinido!";                
        this._value = value;
        this._comparison = undefined;
    },
    
    /**
     * @method
     */
    members :
    {
        
    }
});