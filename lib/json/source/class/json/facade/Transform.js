 /**
  *  Clase padre de parse y stringify
  * 
  * @class Transform
  * @abstract
  * @extends qx.core.Object
  * @author Nilmar Sanchez Muguercia
  * @namespace json.facade
  * @copyrigth 
  * @license
  * @version 2.0.0
  * 
  */

qx.Class.define("json.facade.Transform",
{
    extend : qx.core.Object,
    type : "abstract",

    /**
     * @property
     */  
    properties :
    {
        /**
         * propiedad para el valor puede ser el js en string, la ruta de un
         * archivo o un modelo Qx
         * 
         * @name _value
         * @protected
         * @type {Object}
         * 
         */
        _value : {},
        
        /**
         * propiedad para saber si sera un archivo
         * 
         * @name _file
         * @protected
         * @type {Boolean?false}
         * 
         */
        _file : {},
        
        /**
         * propiedad para el builder en caso de que no se pueda construir automaticamente
         * 
         * @name _builder
         * @protected
         * @type {Builder} ya sea del parse o de stringify
         * 
         */
        _builder : {}
    },

   /**
     * @method
     */
    members :
    {
        /**
         *  metodo para establecer el valor
         *
         * @method setValue
         * @public
         * @param value {Object} valor a transformar
         * @return {json.facade.Transform}
         * 
         */
        
        setValue : function(value){
            this._value = value;
            return this;
        },
        
        /**
         *  metodo para establecer si sera un archivo o no
         *
         * @method setFile
         * @public
         * @param file {Boolean}
         * @return {json.facade.Transform}
         * 
         */
        
        setFile : function(file){
            this._file = file;
            return this;
        },
        
        /**
         *  metodo para establecer el builder
         *
         * @method setBuilder
         * @public
         * @param builder {Builder} ya sea del parse o de stringify
         * @return {json.facade.Transform}
         * 
         */
        
        setBuilder : function(builder){            
            this._builder = builder;
            return this;
        },
        
        /**
         *  metodo para realizar la transformacion
         *
         * @method _transform
         * @protected
         * @param director {Director} director del builder
         * @return {Object}
         * 
         */
        
        _transform : function(director){
            if(this._builder === null){
                this._builder = this._getComponentBuilder();
            }
            //vamos a confiar en que siempre habra un builder                        
            director.setBuilder(this._builder);
            director.buildComponent();
            
            var component = this._builder.getComponent();            
            return component.getData();
        },
        
        /**
         *  metodo para fabricar el builder
         *
         * @method _getComponentBuilder
         * @protected
         * @throws {Error}
         * @return {Builder}
         * 
         */
        
        _getComponentBuilder : function(){}
    }
});