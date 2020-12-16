 /**  
  * Interfaz para el query builder
  * 
  * @interface IQueryBuilder
  * @public
  * @author Nilmar Sanchez Muguercia
  * @namespace cormx.builder
  * @copyrigth 
  * @license
  * @version 0.0.1
  * 
  */
  
qx.Interface.define("cormx.builder.IQueryBuilder",
{   
    /**
     * @property
     */  
    properties : 
    {        
        /**
         * arreglo de elementos para formar la consulta
         * 
         * @name _sql
         * @private
         * @type {Array}
         * 
         */
        _sql : {}         
    },
      
   /**
     * @method
     */
    members :
    {
        /**
         *  devuelve el codigo sql de la consulta
         *
         * @method generate
         * @public
         * @return {String} consulta sql 
         * 
         */ 
                      
        generate : function(){}
    }
});