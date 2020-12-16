 /**  
  * Clase para las validacion de direccion http
  * 
  * @class Http
  * @extends validator.constraints.Constraint 
  * @author Nilmar Sanchez M
  * @namespace validator.constraints  
  * @copyrigth 
  * @license
  * @version 2.0
  *
  */  

qx.Class.define("validator.constraints.Http",
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
         * metodo para validar que el dato pasado sea una direccion http(s)
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
                var constraint = new validator.constraints.Http(value);                
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
        this._message = "Direcci"+'\u00f3'+"n http incorrecta!";
        this._pattern = /^(http|https):\/\/[a-zA-Z0-9_ \/-\/.\/:]+\.(com|org|net|mil|edu|cu|es|ar|de|bl|rs|ch|ci|ca|de|uk)$/;        
        this._value = value;
    },
    
    /**
     * @method
     */
    members :
    {
        
    }
});