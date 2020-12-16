 /**  
  * Clase para el builder de and
  * split por defecto AND
  * 
  * @class AndBuilder
  * @public
  * @extends cormx.builder.WhereBuilder
  * @author Nilmar Sanchez Muguercia
  * @namespace cormx.builder  
  * @copyrigth 
  * @license
  * @version 0.0.1
  * 
  */
  
qx.Class.define("cormx.builder.AndBuilder",
{
    extend : cormx.builder.WhereBuilder,
    
    /**
     * metodo de inicializacion de la clase
     *
     * @constructor
     * @public
     * @param data {Object}: datos
     * 
     */
    
    construct : function(data) 
    { 
        this.base(arguments,data);
        this._split = "AND";
    },
      
   /**
     * @method
     */
    members :
    {   
        
    }
});