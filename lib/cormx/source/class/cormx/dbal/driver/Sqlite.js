 /**  
  * Clase para trabajar con el modulo sqlite
  * 
  * @class Sqlite
  * @public
  * @extends criax.chromeless.Modules
  * @author Nilmar Sanchez M
  * @namespace cormx.dbal.driver  
  * @copyrigth 
  * @license
  * @version 0.0.1
  * 
  */

qx.Class.define("cormx.dbal.driver.Sqlite",
{  
  extend : criax.chromeless.Modules,
  implement : [cormx.dbal.driver.IDriver],
  
    /**
     * @property
     */  
    properties : 
    {      
        /**
         * objeto de la base de datos
         * 
         * @name __db
         * @private
         * @type {Object}
         * 
         */
        __db : {},
        
        /**
         * propiedad para establecer los datos
         * 
         * @name __data
         * @private
         * @type {Object}
         * 
         */
        __data : {}
    },
    
    /**
     * metodo de inicializacion de la clase
     * 
     * @constructor
     * @public
     * @param connection {Object}: objeto de coneccion
     * en el caso de Sqlite solo se necesita el nombre y la ruta de la bd
     * en caso de que la ruta este vacia, la bd se crea en el directorio 
     * de los recursos
     * {name:'dbname',path:'path/to/db'}
     * @throws {Error} The path ... for db is fail!
     *
     */
    
    construct : function(connection) 
    {   
        if(!criax.chromeless.lib.FileSystem.exists(connection.path) || connection.path == null){
            throw new Error("The path '"+connection.path+"' for db fail!");
        }else{
            this.loadChromeless("sqlite");
            var dbName = connection.name+".sqlite";
            this.__db = this._module.Sqlite();
            this.__db.connect(dbName,connection.path);
            this.__db.setEnviroment(qx.core.Environment.get("criax.production"));
        }
    },
  
    /**
     * @method
     */
    members : 
    {
        /**
         *  metodo para establecer los datos
         *
         * @method __datas
         * @private         
         * @param name {String}: nombre del parametro de nameTable
         * @param value {String}: nombre de la tabla
         * 
         */ 
                      
        __datas : function(name,value){
            this.__data = new Object();
            this.__data[name] = value;
        },
        
        /**
         * devolver el objeto de la base de datos
         *
         * @method getDb
         * @public
         * @return {Object} objeto de la base de datos 
         * 
         */ 
                      
        getDb : function(){
            return this.__db;
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
            this.__db.simple(sql);
        },
        
        /**
         *  metodo para ejecutar una consulta
         *
         * @method execute
         * @public         
         * @param sql {String}: sql a ejecutar
         * @param params {Object?null}: parametros de la consulta {column:value}
         * @return {Array} si es un select, arreglo de resultados,
         *                  si es un insert el nuevo id (Integer)
         * 
         */ 
                      
        execute : function(sql,params){            
            var sql = sql;			
            this.__db.extend({temp:sql});            
            return this.__db.temp(params);
        },
        
        /**
         *  metodo para agregar registros a la tabla
         *  <strong>REFACTORIZAR (ver ciclo, se repite en otros metodos)</strong>
         *
         * @method insert
         * @public         
         * @param table {String}: nombre de la tabla donde se insertara
         * @param data {Object}: objeto con los datos a insertar {column:value}
         * @return {Integer} id del dato insertado
         * 
         */ 
                      
        insert : function(table,data){
            var columns = []; 
            var values = []; 
            this.__datas("tableName",table); 
            var sql = "INSERT INTO {tableName} ({columnsName}) VALUES('{valuesName}')";
            for(var c in data){
                //columnas
                columns.push(c);
                //nombre de valores 
                values.push("{"+c+"}");  
                //valor de las columnas
                this.__data[c] = data[c];  
            }
            this.__data['columnsName'] = columns.join(",");
            //sql = sql.replace("{valuesName}",values.join(","));//sin comillas
            sql = sql.replace("{valuesName}",values.join("','"));//con comillas
            this.__db.extend({insert:sql});
            return this.__db.insert(this.__data);
        },
        
        /**
         *  metodo para seleccionar todo de la tabla
         *
         * @method all
         * @public
         * @param table {String}: nombre de la tabla
         * @return {Array} datos optenidos
         * 
         */ 
                      
        all : function(table){
            var sql = "SELECT * FROM {tableName}";
            this.__datas("tableName",table);
            this.__db.extend({all:sql});
            return this.__db.all(this.__data);
        },
        
        /**
         *  metodo para consulta con condicion simple
         *  <strong>REFACTORIZAR (ver ciclo, se repite en otros metodos)</strong>
         *
         * @method where
         * @public         
         * @param table {String}: nombre de la tabla
         * @param data {Object}: objeto de los datos {column:value}
         * @return {Array} datos optenidos
         * 
         */ 
                      
        where : function(table,data){
            var columns = []; 
            var values = [];  
            this.__datas("tableName",table);
            var sql = "SELECT * FROM {tableName} where {column} = '{value}'";
            for(var c in data){
                columns.push(c);
                values.push("{"+c+"}");  
                this.__data[c] = data[c];
            }
            this.__data["column"] = columns[0];
            sql = sql.replace("{value}",values[0]);  
            this.__db.extend({where:sql});
            return this.__db.where(this.__data);
        },
        
        /**
         *  metodo para eliminar un registro
         *  <strong>REFACTORIZAR (ver ciclo, se repite en otros metodos)</strong>
         *
         * @method deleteRow
         * @public         
         * @param table {String}: nombre de la tabla
         * @param data {Object}: objeto con los datos {id#}
         * 
         */ 
                      
        deleteRow : function(table,data){
            var columns = []; 
            var values = []; 
            this.__datas("tableName",table);
            var sql = "DELETE FROM {tableName} where {column} = '{value}'";
            for(var c in data){
                columns.push(c);
                values.push("{"+c+"}");  
                this.__data[c] = data[c];
            }
            this.__data["column"] = columns[0];
            sql = sql.replace("{value}",values[0]);  
            this.__db.extend({deleteRow:sql});
            this.__db.deleteRow(this.__data);
        },
        
        /**
         *  metodo para modificar los datos
         *  <strong>REFACTORIZAR (ver ciclo, se repite en otros metodos)</strong>
         *
         * @method update
         * @public         
         * @param table {String}: nombre de la tabla
         * @param data {Object}: objeto de los datos {column:value}
         * @param condition {Object}: condicion simple para la condicion {column:value}
         * 
         */ 
                      
        update : function(table,data,condition){
            var columns = []; 
            var values = []; 
            var format = []; 
            this.__datas("tableName",table);
            var sql = "UPDATE {tableName} SET {valuesName}";
            for(var c in data){
                columns.push(c);
                values.push("{"+c+"}");  
                this.__data[c] = data[c]; 
                //formato de la asiganacion de valores   
                format.push(c+" = '{"+c+"}'");  
            }
            sql = sql.replace("{valuesName}",format.join(",")); 

            //trabajar con la condicion
            var column = []; 
            var value = [];  
            sql += " where {column} = '{cond}'";
            for(var cond in condition){
                column.push(cond);
                value.push("{"+cond+"}");  
                this.__data['cond'] = condition[cond];
            }
            this.__data["column"] = column[0];
            this.__db.extend({update:sql});
            this.__db.update(this.__data);
        },
        
        /**
         *  contar los registros de una tabla
         *  <strong>Ejecutar la consulta de conteo y procesar</strong>
         *
         * @method count
         * @public         
         * @param table {String}: nombre de la tabla
         * @return {Integer} cantidad de registros de una tabla
         * 
         */ 
                      
        count : function(table){
            //var sql = "SELECT COUNT(*) FROM "+table; 
            //return this.execute(sql);
            var reg = this.all(table);
            return reg.length;
        },
        
        /**
         *  ejecutar una transaccion (no hace falta el begin o commit)
         *
         * @method transaction
         * @public         
         * @param sql {Array}: arreglo de consultas a ejecutar (no se aceptan select)
         * 
         */ 
                      
        transaction : function(sql){
            var sqlCount = sql.length;
            var query = new Array();
            query.push("BEGIN TRANSACTION");
            for(var i=0;i<sqlCount;i++){
                query.push(sql[i].replace(";",""));
            }
            query.push("COMMIT");
            var transaction = query.join(";");
            this.simple(transaction);
            //poner la transaccion en la consola en modo de desarrollo
            if(qx.core.Environment.get("criax.development")){
                console.log(transaction); 
            } 
        }
    },

    destruct : function()
    {   
        this._disposeObjects("__data");
    }
});