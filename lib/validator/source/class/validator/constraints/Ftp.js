 /**  
  * Clase para las validacion de direccion ftp
  * 
  * @class Ftp
  * @extends validator.constraints.Constraint
  * @author Nilmar Sanchez M
  * @namespace validator.constraints  
  * @copyrigth 
  * @license
  * @version 2.0
  *
  */  

qx.Class.define("validator.constraints.Ftp",
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
         * metodo para validar que el dato pasado sea una direccion ftp(s)
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
                var constraint = new validator.constraints.Ftp(value);                
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
        this._message = "Direcci"+'\u00f3'+"n ftp incorrecta!";
        this._pattern = /^(ftp|ftps):\/\/[a-zA-Z0-9_ \/-\/.\/:]+\.(com|org|net|mil|edu|cu|es|ar|de|bl|rs|ch|ci|ca|de|uk)$/;        
        this._value = value;
    },
    
    /**
     * @method
     */
    members :
    {
        
    }
});