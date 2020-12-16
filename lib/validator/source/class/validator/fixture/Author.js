 /**
  *  Clase para probar la validacion de una entidad
  * 
  * @class ...
  * @extends ...
  * @author ...
  * @namespace ...
  * @copyrigth 
  * @license
  * @version 1.0.0
  * 
  */

qx.Class.define("validator.fixture.Author",
{
    extend : qx.core.Object,

    /**
     * @property
     */  
    properties :
    {
        /**
         * propiedad para el nombre del autor, la que se validara
         * 
         * @name name
         * @public
         * @type {String}
         * 
         */
        name : {}
    },
    
    /**
     * metodo de inicializacion de la clase
     *
     * @constructor
     * @public
     * 
     */

    construct : function()
    { 
        
    },

   /**
     * @method
     */
    members :
    {
        /**
         *  metodo para devolver el correo
         *
         * @method getEmail
         * @public
         * @return {Number} 
         * 
         */
        
        getEmail : function(){
            return 42;
        }
    }
});