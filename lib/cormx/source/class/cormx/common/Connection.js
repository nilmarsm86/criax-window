 /**  
  * Clase para la carga de los parametros de coneccion
  * 
  * @class Connection
  * @public
  * @extends qx.core.Object
  * @author Nilmar Sanchez Muguercia
  * @namespace cormx.common
  * @copyrigth 
  * @license
  * @version 0.0.1
  * 
  * @asset(cormx/js/sqlite.min.js)
  * @asset(cormx/js/localforage.js)
  */
  
qx.Class.define("cormx.common.Connection",
{
    extend : qx.core.Object,
    type : "singleton",
    
    /**
     * @property
     */  
    properties : 
    {        
        /**
         * nombre del driver de coneccion
         * 
         * @name __driver
         * @private
         * @type {String}
         * 
         */
        __driver : {},
        
        /**
         * nombre de la base de datos
         * 
         * @name __name
         * @private
         * @type {String}
         * 
         */
        __name : {},        
        
        /**
         * direccion de la base de datos si es en sqlite
         * 
         * @name __path
         * @private
         * @type {String}
         * 
         */
        __path : {},
        
        /**
         * nombre del mapa por defecto de la base de datos
         * 
         * @name __map
         * @private
         * @type {String}
         * 
         */
        __map : {},
        
        /**
         * ruta del mapa de la base de datos
         * 
         * @name __mapPath
         * @private
         * @type {String}
         * 
         */
        __mapPath : {}
    },
      
   /**
     * @method
     */
    members :
    {
        /**
         *  cargar la informacion de la configuracion
         *
         * @method load
         * @public
         * 
         */ 
                      
        load : function(connData){
            var connData = connData || null;
            if(connData == null){
                var parameter = qx.core.Environment;
                this.__driver = parameter.get("criax.persistence.db.driver");                
                this.__name = parameter.get("criax.persistence.db.name") || null;                
                this.__path = parameter.get("criax.persistence.db.path") || null;
                this.__map = parameter.get("criax.persistence.map.name") || null;
                this.__mapPath = parameter.get("criax.persistence.map.dir") || null;
            }else{
                this.__driver = connData.driver;
                this.__name = connData.name;                
                this.__path = connData.path;
                this.__map = connData.mapName;
                this.__mapPath = connData.mapDir;
            }
        },
        
        /**
         *  devolver el driver
         *
         * @method getDriver
         * @public
         * @return {String} nombre del driver 
         * 
         */ 
                      
        getDriver : function(){
            return this.__driver;
        },
        
        /**
         *  devolver el nombre de la base de datos
         *
         * @method getName
         * @public
         * @return {String} nombre de la bd 
         * 
         */ 
                      
        getName : function(){
            return this.__name;
        },
        
        /**
         *  devolver la ruta de la base de datos si es sqlite
		 *  directorio por defecto en source = "persistence"
         *
         * @method getPath
         * @public
         * @return {String} ruta de la base de datos 
         * 
         */ 
                      
        getPath : function(){
            if((this.__path == null) && qx.core.Environment.get("criax.app.type") != "mobile"){                
                var persistenceResourceDir = "persistence";//directorio por defecto
                var path = new criax.chromeless.lib.Path(criax.chromeless.lib.AppPath.getResourceDir());
                this.__path = path.join([persistenceResourceDir]).getPath();
            }
            return this.__path;
        },
        
        /**
         *  devolver el nombre del archivo del mapa para la persitencia
         *
         * @method getMap
         * @public
         * @return {String} nombre del archivo
         * 
         */ 
                      
        getMap : function(){
            return this.__map;
        },
        
        /**
         *  devolver la ruta del mapa de persitencia
         *
         * @method getMapPath
         * @public
         * @return {String} ruta del archivo 
         * 
         */ 
                      
        getMapPath : function(){
            return this.__mapPath;
        }
    }
});