 /**  
  * Clase para el manejo de drivers
  * 1-Crear un metodo para llevar a cabo transacciones primer parametro la consulta
  *   segundo parametro el objeto para escapar los valores de esa consulta prepareTransaction(sql,bind)
  * 2-Un arreglo sera el que contendra ya las consultas escapadas
  * 3-Se crea un metodo executeTransaction() el cual mandara a ejecutar la transaccion del driver,
  *   pasandole el arreglo de consultas ya formateadas
  * 
  * @class DriverManager
  * @public
  * @extends qx.core.Object
  * @author Nilmar Sanchez Muguercia
  * @namespace cormx.dbal  
  * @copyrigth 
  * @license
  * @version 0.0.1
  * 
  * @use(cormx.common.Connection)
  * 
  */
   
qx.Class.define("cormx.dbal.DriverManager",
{
    extend : qx.core.Object,
    include : cormx.common.MEscape,
    
    /**
     * @property
     */  
    properties : 
    {        
        /**
         * objeto del driver asignado
         * 
         * @name __driver
         * @private
         * @type {IDriver}
         * 
         */
        __driver : {},
        
        /**
         * objeto con los datos de la conecccion
         * 
         * @name __connection
         * @private
         * @type {Object}
         * 
         */
        __connection : {},
        
        /**
         * consulta a ejecutar
         * 
         * @name __sql
         * @private
         * @type {String}
         * 
         */
        __sql : {},
        
        /**
         * objeto de parametros
         * 
         * @name __params
         * @private
         * @type {Object}
         * 
         * 
         */
        __params : {},
        
        /**
         * arreglo con el nombre de las tablas
         * 
         * @name __tables
         * @private
         * @type {Array}
         * 
         */
        __tables : {}
    },
    
    /**
     * metodo de inicializacion de la clase
     *
     * @constructor
     * @public
     * @param connection {Object?null}: objeto con los parametros de coneccion
     * 
     */
    
    construct : function(connection) 
    { 
        if(connection != null){
            this.__connection = connection;
        }else{
            var service = criax.dic.DiContainer.getInstance();
            var configConnection = service.get("connection");
            this.__connection = new Object();            
            this.__connection.driver = configConnection.getDriver();
            this.__connection.host = /*configConnection.getHost();*/null;
            this.__connection.user = /*configConnection.getUser();*/null;
            this.__connection.password = /*configConnection.getPassword();*/null;
            this.__connection.name = configConnection.getName();
            this.__connection.port = /*configConnection.getPort();*/null;
            this.__connection.path = configConnection.getPath();                        
        }
        this.__driver = null;
        this.__clear();
    },
      
   /**
     * @method
     */
    members :
    {
        /**
         *  inicializar los parametros y las tablas
         *
         * @method __clear
         * @private
         *  
         */ 
                      
        __clear : function(){
            this.__params = new Object();
            this.__tables = [];
            this.__sql = "";
        },
        
        /**
         *  connectar con el driver
         *
         * @method __connectDriver
         * @private
         * @return {cormx.dbal.driver.IDriver} driver de la conexion
         * 
         */ 
                      
        __connectDriver : function(){
            switch(this.__connection.driver){
                case "sqlite":                    
                    this.__driver = new cormx.dbal.driver.Sqlite(this.__connection);
                break;
                
                case "indexeddb":
                    this.__driver = cormx.dbal.driver.SqliteJs.getInstance();
                    this.__driver.initialize(this.__connection);
                break;
            }
            return this.__driver;
        },
        
        /**
         *  devolver el objeto del driver de la conneccion
         *
         * @method getConnection
         * @public         
         * @param driver {Function?null}: en caso de que el driver no se encuetre entre
         * se pasa la funcion del driver agregado por el usuario
         * app.vendors.Driver
         * @return {IDriver} objeto del driver
         * 
         */ 
                      
        getConnection : function(driver){
            if(driver == null){
                return this.__connectDriver();
            }else{
                this.__driver = new driver(this.__connection);
                return this.__driver;
            }            
        },
        
        /**
         *  pasar la consulta a ejecutar
         *
         * @method prepare
         * @public         
         * @param sql {QueryBuilder}: consulta sql a ejecutar
         * se le puede pasar el string de la consulta a ejecutar o bien pasarle 
         * el objeto del QueryBuilder
         * @return {cormx.dbal.DriverManager}
         * 
         */ 
                      
        prepare : function(sql){
            if((typeof sql) == "object" && (sql instanceof cormx.builder.QueryBuilder)){
                if(sql.severalTables()){
                    this.__tables = sql.tables2Sql().split(", ");					
                }
                var sql = sql.generate();                
            }            
            this.__sql = sql;
            return this;
        },
        
        /**
         *  agregar los valores de los labels de la consulta
         *
         * @method bindValue
         * @public         
         * @param label {String}: nombre del label en la consulta
         * @param value {}: valor del label de la consulta
         * @return {DriverManager}
         * 
         */ 
                      
        bindValue : function(label,value){            
            this.__params[label] = this.escape(value);
            return this;
        },
        
        /**
         *  ejecutar la consulta
         *
         * @method execute
         * @public
         * @return {Array} en el caso de ke sea select 
         * 
         */ 
                      
        execute : function(){
            if(this.__driver == null){
                this.__connectDriver();
            }
            var result = this.__driver.execute(this.__sql,this.__params);			
            this.__clear();
            return result;
        },
        
        /**
         *  devolver las tablas de las que se selecciona
         *
         * @method joinTables
         * @public
         * @param tables {Array}: arreglo de tablas a seleccionar
         * @return {Array} arreglo de tablas de la consulta 
         * 
         */ 
                      
        joinTables : function(tables){
            if(tables != null){
                this.__tables = tables;
            }
            return this.__tables;
        },
        
        /**
         *  metodo para salvar en indexeddb
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
            if(this.__driver == null){
                this.__connectDriver();
            }
            this.__driver.setItem(callback,context);    
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
         * 
         */ 
                      
        loadData : function(existDataInStorage,emptyStorage,context){
            if(qx.core.Environment.get("criax.app.type") == "mobile"){
                var context = context || window;
                var existDataInStorage = existDataInStorage || function(){};
                var emptyStorage = emptyStorage || function(){};
                if(this.__driver == null){
                    this.__connectDriver();
                }
                this.__driver.loadData(existDataInStorage,emptyStorage,context);                
            }
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
            if(this.__driver == null){
                this.__connectDriver();
            }
            this.__driver.simple(sql);
        },
        
        /**
         *  metodo para devolver el driver
         *
         * @method getDriver
         * @public         
         * @return {IDriver}
         * 
         */
         
        getDriver : function(){
            if(this.__driver == null){
                this.__connectDriver();
            }
            return this.__driver; 
        }
    }
});