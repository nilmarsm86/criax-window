 /**
  *  Clase para el dato a transformar desde un archivo
  * 
  * @class FileData
  * @extends json.parse.decorator.Component
  * @author Nilmar Sanchez Muguercia
  * @namespace json.parse.decorator.components
  * @copyrigth 
  * @license
  * @version 2.0.0
  * 
  */

qx.Class.define("json.parse.decorator.components.FileData",
{
    extend : json.parse.decorator.Component,

    /**
     * @property
     */  
    properties :
    {
        /**
         * propiedad para la ruta del archivo con el contenido
         * 
         * @name __path
         * @private
         * @type {String}
         * 
         */
        __path : {},
        
        /**
         * propiedad para la instancia del archivo a leer
         * 
         * @name __file
         * @private
         * @type {criax.chromeless.lib.File}
         * 
         */
        __file : {},
        
        /**
         * propiedad para el contenido del archivo
         * 
         * @name __data
         * @private
         * @type {String}
         * 
         */
        __data : {}
    },
    
    /**
     * metodo de inicializacion de la clase
     *
     * @constructor
     * @public
     * @param path {String} ruta del archivo con el contenido
     */

    construct : function(path)
    { 
        this.__path = path;
        this._reviver = null;
        this.__file = new criax.chromeless.lib.File(this.__path);
        this.__data = null;        
        this.__reviewFile();
    },

   /**
     * @method
     */
    members :
    {
        /**
         *  metodo para devolver el valor del dato
         *
         * @method getData
         * @public
         * @throws {Error} si el archivo no existe
         * @return {Stirng} contenido del archivo
         * 
         */
        
        getData : function(){
            if(this.__data === null){
                this.__data = this.__file.read();
            }
            return this.__data;
        },
        
        /**
         *  metodo para verificar que el archivo se puede leer
         *
         * @method __reviewFile
         * @private
         * @throws {Error} si el archivo no se puede leer
         * 
         */
        
        __reviewFile : function(){
            if(!this.__file.isReadable()){
                throw new Error("Can not read the file "+this.__path);
            }
            
        }
    }
});