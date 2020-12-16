 /**  
  * Clase para el builder de ro
  * split por defecto Or
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
  
qx.Class.define("cormx.builder.OrBuilder",
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
        this._split = "OR";
    },
      
   /**
     * @method
     */
    members :
    {   
        
    }
});