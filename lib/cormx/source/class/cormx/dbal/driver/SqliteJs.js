 /**  
  * Clase para trabajar con la libreria SqliteJs y persistir en indexedDb
  * 
  * @class SqliteJs
  * @public
  * @extends qx.core.Object
  * @author Nilmar Sanchez M
  * @namespace cormx.dbal.driver  
  * @copyrigth 
  * @license
  * @version 0.0.1
  *
  * @ignore(localforage)
  * @ignore(export)
  * @ignore(window.SQL.Database)
  * @ignore(localforage.config)
  * @ignore(localforage.setDriver)
  * @ignore(localforage.INDEXEDDB)
  * @ignore(localforage.getItem)
  * @ignore(localforage.setItem)  
  * 
  */
  
qx.Class.define("cormx.dbal.driver.SqliteJs",
{
    extend : qx.core.Object,
    implement : [cormx.dbal.driver.IDriver],
    type : "singleton",
    
    /**
     * @property
     */  
    properties : 
    {        
        /**
         * propiedad para la base de datos
         * 
         * @name __db
         * @private
         * @type {SQL}
         * 
         */
        __db : {},
        
        /**
         * propiedad para las columnas
         * 
         * @name __columnsData
         * @private
         * @type {Object}
         * 
         */
        __columnsData : {},
        
        /**
         * propiedad para el nombre de la bd
         * 
         * @name __nameDb
         * @private
         * @type {String}
         * 
         */
        __nameDb : {}
    },
      
   /**
     * @method
     */
    members :
    {
        /**
         *  metodo para crear la db se debe llamar una sola vez
         *
         * @method initilize
         * @public      
         * @param connection {Object}: objeto de coneccion
         * en el caso de Sqlite solo se necesita el nombre y la ruta de la bd
         * en caso de que la ruta este vacia, la bd se crea en el directorio 
         * de los recursos
         * {name:'dbname',path:'path/to/db'}   
         * en el caso de indexeddb solo se necesita el nombre
         * {name:'dbname'}
         * 
         */ 
                      
        initialize : function(connection){
            this.__nameDb = connection.name;            
            localforage.config({
                name: connection.name,
                description: 'db '+connection.name+' de la app '
            });        
            localforage.setDriver(localforage.INDEXEDDB);            
            this.__db = new window.SQL.Database();            
        },
        
        /**
         *  metodo para cargar los datos del indexeddb
         *
         * @method loadData
         * @pubic         
         * @param existDataInStorage {Function?null} callback a ejecutar si existen datos previos
         * tiene un solo parametro los datos existentes
         * <code>
         * function(){
         *     //hacer si existen datos 
         * }
         * </code>
         * @param emptyStorage {Function?null} callback a ejecutar si no existen datos
         * <code>
         * function(){
         *     //hacer si no existen datos 
         * }
         * </code>
         * @param context {Object} contesto de los callbacks
         */ 
                      
        loadData : function(existDataInStorage,emptyStorage,context){
            var self = this;
            var context = context || window;
            var existDataInStorage = existDataInStorage || function(){};
            var emptyStorage = emptyStorage || function(){};
            localforage.getItem(this.__nameDb,function(responseValue){//al tener que devolver dato se hace lento
                if(responseValue != undefined || responseValue != null){
                    self.__db = new window.SQL.Database(responseValue);                    
                    //existDataInStorage();
                    existDataInStorage.call(context);
                }else{                 
                    localforage.setItem(self.__nameDb,self.__db["export"](),function(newValue){                                                
                        self.__db = new window.SQL.Database(newValue);  
                        //emptyStorage();
                        emptyStorage.call(context);
                    });
                }                
            });            
        },
        
        /**
         *  metodo para ejecutar una consulta que no devuelve datos
         *
         * @method simple
         * @public         
         * @param sql {String}: consulta a ejecutar
         * 
         */ 
                      
        simple : function(sql){
            if(qx.core.Environment.get("criax.production") == false){
                console.log(sql);
            }
            this.__db.run(sql);            
        },
        
        /**
         *  metodo para ejecutar una consulta
         *
         * @method execute
         * @public         
         * @param sql {String}: consulta a ejecutar
         * @param bind {Object} parametros de la consultas
         * {':par1':value1,':par2':value2}
         * @return {Array} resultados de la consulta
         * 
         */ 
                      
        execute : function(sql,bind){
            var sql = sql.replace(/'{/gi,":")
                         .replace(/}'/gi,"");            
            var bindValue = {}; 
            for (var i in bind) {
                bindValue[":"+i] = bind[i];                
            }
            if(!qx.core.Environment.get("criax.production")){
                console.log(sql);
            }
            var result = [];
            var bind = bind || null;
            var stmt = this.__db.prepare(sql);
            if(bind != null){                
                stmt.bind(bindValue);
            }
            while (stmt.step()){                
                result.push(stmt.getAsObject());
            }
            stmt.free();
            return result;            
        },
        
        /**
         *  ejecutar una transaccion (no hace falta el begin o commit)
         *
         * @method transaction
         * @public         
         * @param sql {Array}: arreglo de consultas a ejecutar (no se aceptan select)
         * 
         */ 
                      
        transaction : function(sql){},
        
        /**
         *  metodo para salvar los datos en el indexedDb
         *
         * @method setItem
         * @public         
         * @param callback {Function?null} callback a ejecutar una vez que se
         * haga flush
         * @param context {Object} contesto del callback
         * 
         */ 
                      
        setItem : function(callback,context){            
            var context = context || window;
            var callback = callback || function(data){};
            localforage.setItem(this.__nameDb,this.__db["export"](),function(data){
                callback.call(context,data);  
            });
        },
        
        /**
         *  metodo para exportar la bd como un blob
         *
         * @method exportDb
         * @public         
         * @param name {String} nombre de la bd
         * @return {Blob}
         */ 
                      
        exportDb : function(){            
            var db = this.__db["export"]();
            return new Blob([db], { type : "application/sqlite" });            
        }
        
    }
});