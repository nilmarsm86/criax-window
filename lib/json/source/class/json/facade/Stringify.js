 /**
  *  Clase Fachada stringify para el subsistema
  * 
  * @class Stringify
  * @extends json.facade.Transform
  * @author Nilmar Sanchez Muguercia
  * @namespace json.facade
  * @copyrigth 
  * @license
  * @version 2.0.0
  * 
  */

qx.Class.define("json.facade.Stringify",
{
    extend : json.facade.Transform,

    /**
     * @property
     */  
    properties :
    {
        /**
         * propiedad para el replacer
         * 
         * @name __replacer
         * @private
         * @type {Function}
         * 
         */
        __replacer : {},
        
        /**
         * propiedad para el space
         * 
         * @name __space
         * @private
         * @type {Number}
         * 
         */
        __space : {},
        
        /**
         * propiedad para la ruta del archivo en caso de que haya
         * 
         * @name __path
         * @private
         * @type {String}
         * 
         */
        __path : {},
        
        /**
         * propiedad para saber si sera hasta objeto o hasta string
         * 
         * @name __object
         * @private
         * @type {Boolean}
         * 
         */
        __jsObject : {}
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
        this.__value = {};
        this.__replacer = null;
        this.__space = 0;
        this.__path = "";
        this.__jsObject = false;
        this._file = false;        
        this._builder = null;
    },

   /**
     * @method
     */
    members :
    {
        /**
         *  metodo para fabricar el builder
         *
         * @method _getComponentBuilder
         * @protected
         * @throws {Error}
         * @return {json.stringify.builder.builders.Builder}
         * 
         */
        
        _getComponentBuilder : function(){ 
            if(this._file && (this.__path.length > 0)){
                var builder = new json.stringify.builder.builders.ModelToFile(this._value, this.__replacer, this.__space);
                builder.setPath(this.__path);
                return builder;
            }
            
            if(!this._file && this.__jsObject){
                return new json.stringify.builder.builders.ModelToJs(this._value, this.__replacer, this.__space);
            }
            
            if(!this._file && !this.__jsObject){
                return new json.stringify.builder.builders.ModelToStringify(this._value, this.__replacer, this.__space);
            }
            throw new Error('There is not a builder defined');
        },
        
        /**
         *  metodo para realizar el stringify
         *
         * @method stringify
         * @public
         * @return {Object} puede ser un objeto js o un string
         * 
         */
        
        stringify : function(){            
            return this._transform(new json.stringify.builder.directors.Director());
        },
        
        /**
         *  metodo para establecer el replacer
         *
         * @method setReplacer
         * @public
         * @param replacer {Function} el replacer
         * @return {json.facade.Stringify}
         * 
         */
        
        setReplacer : function(replacer){
            this.__replacer = replacer;
            return this;
        },
        
        /**
         *  metodo para establecer el space
         *
         * @method setSpace
         * @public
         * @param space {Number} el space
         * @return {json.facade.Stringify}
         * 
         */
        
        setSpace : function(space){
            this.__space = space;
            return this;
        },
        
        /**
         *  metodo para establecer la ruta del archivo donde se salvara el modelo
         *
         * @method setPath
         * @public
         * @param path {String} ruta del archivo donde se salvara el modelo
         * @return {json.facade.Stringify}
         * 
         */
        
        setPath : function(path){
            this.__path = path;
            return this;
        },
        
        /**
         *  metodo para establecer si el resultado se salvara como objeto js
         *
         * @method setJsObject
         * @public
         * @param jsObject {Boolean} si se salvara como objeto JS
         * @return {json.facade.Stringify}
         * 
         */
        
        setJsObject : function(jsObject){
            this.__jsObject = jsObject;
            return this;
        }
    }
});