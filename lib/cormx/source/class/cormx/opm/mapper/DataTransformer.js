 /**  
  * Modelo para la clase de transformacion
  * 
  * @class DataTransformer
  * @public
  * @extends criax.domain.DomainModel
  * @author Nilmar Sanchez Muguercia
  * @namespace cormx.opm.mapper  
  * @copyrigth 
  * @license
  * @version 1.0.1
  * 
  * @use(cormx.opm.mapper.transformers.StringToInteger)
  */
  
qx.Class.define("cormx.opm.mapper.DataTransformer",
{
    extend : qx.core.Object,
    
    /**
     * @property
     */  
    properties : 
    {        
        /**
         * propiedad para el objeto de transformer
         * 
         * @name __transformer
         * @private
         * @type {ITransformer}
         * 
         */
        __transformer : {}         
    },
    
    /**
     * metodo de inicializacion de la clase
     *
     * @constructor
     * @public
     * @param from {String}: Tipo de transformador
     * @param to {String}: Tipo de transformador
     * 
     */
    
    construct : function(from,to) 
    { 
        var transformName = "cormx.opm.mapper.transformers."+qx.lang.String.capitalize(from)+"To"+qx.lang.String.capitalize(to);
        var transformer = qx.Class.getByName(transformName);
        this.__transformer = new transformer();
    },
      
   /**
     * @method
     */
    members :
    {
        /**
         *  metodo para haer la transformacion
         *
         * @method transform
         * @public         
         * @param data {var} dato a transformar
         * @return {var} dato transformado
         * 
         */ 
                      
        transform : function(data){
            return this.__transformer.transform(data);
        },
        
        /**
         *  metodo para la transformacion en reversa
         *
         * @method reverseTransform
         * @public         
         * @param data {var} dato a transformar
         * @return {var} dato transformado
         * 
         */ 
                      
        reverseTransform : function(data){
            return this.__transformer.reverseTransform(data);
        }
    }
});