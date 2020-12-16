 /**  
  *  Clase para transformar de String a float
  * 
  * @class StringToFloat
  * @extends qx.core.Object
  * @author Nilmar Sanchez Muguercia
  * @namespace cormx.opm.mapper.transformer
  * @copyrigth 
  * @license
  * @version 1.0.1
  * 
  */
  
qx.Class.define("cormx.opm.mapper.transformers.StringToFloat",
{
    extend : qx.core.Object,
    implement : [cormx.opm.mapper.transformers.ITransformer],
    
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
     * metodo de inicializacion de la clase
     *
     * @constructor
     * @public
     * @param associations {Association} asociacion de la entidad
     * 
     */
    
    construct : function(associations) 
    { 
        this.__associations = associations;                
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
         * 
         */ 
                      
        transform : function(data){
            //convertir a integer y despues a float
        },
        
        /**
         *  metodo para transformar de integer a string
         *
         * @method reverseTransform
         * @public         
         * @param data {Integer} dato a transformar
         * 
         */ 
                      
        reverseTransform : function(data){
            //convertir a integer y despues a string
        }
    }
});