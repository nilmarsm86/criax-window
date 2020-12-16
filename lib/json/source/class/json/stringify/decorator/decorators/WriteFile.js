 /**
  *  Clase para copiar en un archivo el contenido transformado 
  *  VERIFICAR QUE EL COMPONENTE PAASADO NO SEA ModelData
  *  DEBE SER UN STRING
  * 
  * @class WriteFile
  * @extends json.stringify.decorator.decorators.Decorator
  * @author Nilmar Sanchez Muguercia
  * @namespace json.stringify.decorator.decorators
  * @copyrigth 
  * @license
  * @version 2.0.0
  * 
  */

qx.Class.define("json.stringify.decorator.decorators.WriteFile",
{
    extend : json.stringify.decorator.decorators.Decorator,

    /**
     * @property
     */  
    properties :
    {
        /**
         * propiedad para la ruta del archivo en el que se salvara el contenido
         * 
         * @name __path
         * @private
         * @type {String}
         * 
         */
        __path : {},
        
        /**
         * propiedad para la instancia del archivo a crear
         * 
         * @name __file
         * @private
         * @type {criax.chromeless.lib.File}
         * 
         */
        __file : {}
    },
    
    /**
     * metodo de inicializacion de la clase
     *
     * @constructor
     * @public
     * @param path {String} ruta del archivo donde se salvara la configuracion
     * 
     */

    construct : function(path)
    { 
        this.__path = path;
        this.__file = new criax.chromeless.lib.File(this.__path);
        this._data = null;
    },

   /**
     * @method
     */
    members :
    {
        /**
         *  metodo para transformar el dato de modelo qx a json
         *
         * @method _transform
         * @protected
         * @return {String}
         * 
         */
        
        _transform : function(){
            var result = this._component.getData();            
            var parse = JSON.parse(result);            
            var replacer = this._component.getReplacer();
            var space = this._component.getSpace();            
            var stringify = JSON.stringify(parse, replacer, space);            
            var file = this.__write(stringify);
            this._data = file.read();
            return this._data;
        },
        
        /**
         *  metodo para escribir en el archivo de configuracion, sino existe lo
         *  crea, si existe lo sobreescribe
         *
         * @method __write
         * @private
         * @param data {String} dato de contenido del archivo
         * @return {criax.chromeless.lib.File}
         * 
         */
        
        __write : function(data){
            if(this.__file.exists()){
                this.__file.remove();
            }
            return this.__file.write(data);
        }
    }
});