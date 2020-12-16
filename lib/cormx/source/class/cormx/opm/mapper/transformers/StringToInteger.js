 /**  
  *  Clase para transformar de String a integer
  * 
  * @class StringToInteger
  * @extends qx.core.Object
  * @author Nilmar Sanchez Muguercia
  * @namespace cormx.opm.mapper.transformer
  * @copyrigth 
  * @license
  * @version 1.0.1
  * 
  */
  
qx.Class.define("cormx.opm.mapper.transformers.StringToInteger",
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
         * @return {Integer} dato transformado
         * 
         */ 
                      
        transform : function(data){
            if((typeof data) == "string"){
                var data = parseInt(data);
                if(data == "NaN"){
                    throw new Error("Error transformin string to integer");
                }
                return data;
            }else{
                return this.transform(data.toString());
            }
        },
        
        /**
         *  metodo para transformar de integer a string
         *
         * @method reverseTransform
         * @public         
         * @param data {Integer} dato a transformar
         * @return {String} dato transformado
         * 
         */ 
                      
        reverseTransform : function(data){
            if((typeof data) == "number"){
                var data = data.toString(data);
                if(data != "string"){
                    throw new Error("Error transformin integer to string");
                }
                return data;
            }else{
                return this.reverseTransform(parseInt(data));
            }
        }
    }
});