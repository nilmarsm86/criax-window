 /**  
  * Interfaz para los transformer
  * 
  * @interface ITransformer
  * @public
  * @author ...
  * @namespace ...
  * @copyrigth 
  * @license
  * @version 1.0.1
  * 
  */
  
qx.Interface.define("cormx.opm.mapper.transformers.ITransformer",
{    
    /**
     * @property
     */  
    properties : 
    {        
        /**
         * propiedad para las asociaciones
         * 
         * @name __associations
         * @private
         * @type {}
         * 
         */
        __associations : {}         
    },
      
   /**
     * @method
     */
    members :
    {
        /**
         *  metodo para transformar de string a integer
         *
         * @method transform
         * @public         
         * @param data {String} dato
         * @return {Integer} dato transformado
         * 
         */ 
                      
        transform : function(data){},
        
        /**
         *  metodo para transformar de integer a string
         *
         * @method reverseTransform
         * @public         
         * @param data {Integer} dato a transformar
         * @return {String} dato transformado
         * 
         */ 
                      
        reverseTransform : function(data){}
    }
});