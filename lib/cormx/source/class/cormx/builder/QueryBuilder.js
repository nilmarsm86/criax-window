 /**  
  * Clase para la generacion de consultas sql
  * 
  * @class QueryBuilder
  * @public
  * @extends qx.core.Object
  * @author Nilmar Sanchez Muguercia
  * @namespace cormx.builder  
  * @copyrigth 
  * @license
  * @version 0.0.1
  * 
  */
  
qx.Class.define("cormx.builder.QueryBuilder",
{
    extend : qx.core.Object,
    implement : [cormx.builder.IQueryBuilder],
    include : [cormx.builder.MQuery],
    
    /**
     * @property
     */  
    properties : 
    {        
        /**
         * objeto cormx.builder.JoinBuilder
         * 
         * @name __join
         * @private
         * @type {cormx.builder.JoinBuilder}
         * 
         */
        __join : {},
        
        /**
         * objeto SelectBuider
         * 
         * @name __select
         * @private
         * @type {cormx.builder.SelectBuilder}
         * 
         */
        __select : {},
        
        /**
         * objeto cormx.builder.WhereBuilder
         * 
         * @name __where
         * @private
         * @type {cormx.builder.WhereBuilder}
         * 
         */
        __where : {},
        
        /**
         * objeto cormx.builder.OrBuilder
         * 
         * @name __or
         * @private
         * @type {cormx.builder.OrBuilder}
         * 
         */
        __or : {},
        
        /**
         * objeto cormx.builder.AndBuilder
         * 
         * @name __and
         * @private
         * @type {cormx.builder.AndBuilder}
         * 
         */
        __and : {},
        
        /**
         * objeto cormx.builder.UpdateBuilder
         * 
         * @name __update
         * @private
         * @type {cormx.builder.UpdateBuilder}
         * 
         */
        __update : {},
        
        /**
         * objeto cormx.builder.InsertBuilder
         * 
         * @name __insert
         * @private
         * @type {cormx.builder.InsertBuilder}
         * 
         */
        __insert : {},
        
        /**
         * objeto cormx.builder.DeleteBuilder
         * 
         * @name __delete
         * @private
         * @type {cormx.builder.DeleteBuilder}
         * 
         */
        __delete : {},
        
        /**
         * arreglo con el nombre de las columnas o nombre de la columna
         * *: en caso de que no se pase ninguna y se llame a select
         * column: nombre de la columna
         * [column1,colum2,colum3]: arreglo con el nombre de las columnas
         * [{column:column1,alias:c1},{column:column2,alias:c2},{column:column3,alias:c3}]:
         * arreglo de objetos con el nombre y el alias de las columnas
         * 
         * @name __columns
         * @private
         * @type {Array|String}
         * @default {[]}
         * 
         */
        __columns : {},
        
        /**
         * arreglo con el nombre de las tablas
         * table: nombre de la tabla
         * [table1,table2,table3]: arreglo con el nombre de las tablas
         * [{column:table1,alias:t1},{column:table2,alias:t2},{column:table3,alias:t3}]:
         * arreglo de objetos con el nombre y el alias de las tablas
         * 
         * @name __tables
         * @private
         * @type {Array|String}
         * @default {[]}
         * 
         */
        __tables : {},
        
        /**
         * arreglo de trozos de consulta sql
         * 
         * @name _sql
         * @protected
         * @type {Array}
         * @default {[]}
         * 
         */
        _sql : {},
        
        /**
         * orden de las columnas a ejecutar select
         * 
         * @name __order
         * @private
         * @type {Array}
         * 
         */
        __order : {},
        
        /**
         * agruapar el resultado del select
         * 
         * @name __group
         * @private
         * @type {Array}
         * 
         */
        __group : {},
        
        /**
         * limitar el resultado
         * 
         * @name __limit
         * @private
         * @type {String}
         * 
         */
        __limit : {}
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
        this.__columns = [];
        this.__columns.push("*");
        this._sql = [];
        this.__tables = [];
        this.__clear();
    },
          
   /**
     * @method
     */
    members :
    {
        /**
         *  convertir las columnas a codigo sql
         *
         * @method columns2Sql
         * @public
         * @return {String} codigo sql
         *  
         */
                      
        columns2Sql : function(){
            if(this.__columns[0] === "*"){
                return "*";        
            }
            if((typeof this.__columns) === "string"){
                return this.__columns;
            }else if((typeof this.__columns) === "object"){                
                return this.__transformObjectColumns();
            }   
        },
        
        /**
         *  informacion de las columnas a convertir es un  objeto
         *
         * @method __transformObjectColumns
         * @private         
         * @return {String} informacion procesada de las columnas
         * 
         */ 
                      
        __transformObjectColumns : function(){            
            var tempColumns = [];
            for(var i=0;i<this.__columns.length;i++){
                if((typeof this.__columns[i]) === "string"){
                    tempColumns.push(this.__columns[i]);
                }else if((typeof this.__columns[i]) === "object"){                    
                    tempColumns.push(this.__columnObject(this.__columns[i]));
                }
            }
            return tempColumns.join(", ");
        },
        
        /**
         *  metodo para procesar la informacion de la columna, si es un objeto
         *
         * @method __columnObject
         * @private         
         * @param column {Object} informacion de la columna
         * @return {String} informacion procesada
         * 
         */ 
                      
        __columnObject : function(column){            
            if(column.alias == null){
                column.alias = column.column;
            }
            return column.column+" AS "+column.alias;
        },
        
        /**
         *  metodo para devolver las columnas de la consulta
         *
         * @method getColumns
         * @public
         * @return {Array} 
         * 
         */ 
                      
        getColumns : function(){
            return this.__columns;
        },
        
        /**
         * convertir las tablas a codigo sql
         *
         * @method tables2Sql
         * @public
         * @return {String} codigo sql
         *  
         */ 
                      
        tables2Sql : function(){            
            if((typeof this.__tables) === "string"){
                return this.__tables;
            }else if((typeof this.__tables) === "object"){               
                return this.__transformObjectTables();
            }
        },
        
        /**
         *  informacion de las tablas a convertir es un  objeto
         *
         * @method __transformObjectTables
         * @private
         * @return {String} informacion procesada de las tablas
         * 
         */ 
                      
        __transformObjectTables : function(){            
            var tempTables = [];
            for(var i=0;i<this.__tables.length;i++){
                if((typeof this.__tables[i]) === "string"){
                    tempTables.push(this.__tables[i]);
                }else if((typeof this.__tables[i]) === "object"){                    
                    tempTables.push(this.__tableObject(this.__tables[i]));
                }
            }
            return tempTables.join(", ");
        },
        
        /**
         *  metodo para procesar la informacion de la tabla, si es un objeto
         *
         * @method __tableObject
         * @private         
         * @param table {Object} informacion de la tabla
         * @return {String} informacion procesada
         * 
         */ 
                      
        __tableObject : function(table){
            if(table.alias == null){
                table.alias = table.table;
            }
            return table.table+" AS "+table.alias;
        },
        
        /**
         *  resetear los temporales
         *
         * @method __clear
         * @private
         *  
         */ 
                      
        __clear : function(){
            this.__select = null;
            this.__join = null;
            this.__where = null;
            this.__or = null;
            this.__and = null;
            this.__insert = null;
            this.__update = null;
            this.__delete = null;
            this.__order = null;
            this.__group = null;
            this.__limit = null;
        },
        
        /**
         *  convertir el select a sql
         *
         * @method __select2Sql
         * @private
         * 
         */ 
                      
        __select2Sql : function(){
            if(this.__select != null){
                this._sql.push(this.__select.generate());
            }            
        },
        
        /**
         *  poner select automatico si no se definio
         *
         * @method __validSelect
         * @private
         * 
         */ 
                      
        __validSelect : function(){
            if(this.__select == null){
                this.select();
                this.__select2Sql();
            }
        },        
        
        /**
         *  convertir join a sql
         *
         * @method __join2Sql
         * @private
         * 
         */ 
                      
        __join2Sql : function(){
            if(this.__join != null){
                if(this.__where != null){
                    this._sql.push("AND");
                }else{
                    this.__validSelect();
                    this._sql.push("WHERE");
                }
                this._sql.push(this.__join.generate());
            }
        },
        
        /**
         *  convertir el where a sql
         *
         * @method __where2Sql
         * @private
         * 
         */ 
                      
        __where2Sql : function(){
            if(this.__where != null){
                if(this.__select == null && this.__update == null && this.__delete == null){
                    this.__validSelect();
                }
                this._sql.push(this.__where.generate());
            }            
        },
        
        /**
         *  convertir el or a sql
         *
         * @method __or2Sql
         * @private
         * 
         */ 
                      
        __or2Sql : function(){
            if(this.__or != null){
                this.__validSelect();
                if(this.__where != null){
                    this.__or.removeWhere();
                    this._sql.push("OR");
                }
                this._sql.push(this.__or.generate());
            }
        },
        
        /**
         *  convertir el and a sql
         *
         * @method __and2Sql
         * @private
         * 
         */ 
                      
        __and2Sql : function(){
            if(this.__and != null){
                this.__validSelect();
                if(this.__where != null){
                    this.__and.removeWhere();
                    this._sql.push("AND");
                }
                this._sql.push(this.__and.generate());
            }
        },
        
        /**
         *  operaciones matematicas con las columnas
         *
         * @method __mat
         * @private         
         * @param type {String}: tipo de operacion
         * @param column {String}: nombre de la columna
         * @return {cormx.builder.QueryBuilder}
         * 
         */ 
                      
        __mat : function(type,column){
            this.__column = type+"("+column+")";
            this.select();
            return this;
        },
        
        /**
         * retornar el arreglo de trozos sql  
         *
         * @method getSqlArray
         * @public
         * @return {Array} arreglo de pedazos de consulta 
         * 
         */ 
                      
        getSqlArray : function(){
            return this._sql;
        },
        
        /**
         *  establecer las columnas con las que se va a trabajar
         *  *: en caso de que no se pase ninguna y se llame a select
         * column: nombre de la columna
         * [column1,colum2,colum3]: arreglo con el nombre de las columnas
         * [{column:column1,alias:c1},{column:column2,alias:c2},{column:column3,alias:c3}]:
         * arreglo de objetos con el nombre y el alias de las columnas
         *
         * @method setColumns
         * @public         
         * @param columns {Array|String?*}: arreglo con el nombre de las 
         * columnas o nombre de la columna
         * codigo sql
         * 
         * @return {QueryBuilder}
         * 
         */ 
                      
        setColumns : function(columns){ 
            this.__columns = columns;
            return this;
        },
        
        /**
         *  establecer las tablas con las que se va a trabajar
         *  table: nombre de la tabla
         * [table1,table2,table3]: arreglo con el nombre de las tablas
         * [{column:table1,alias:t1},{column:table2,alias:t2},{column:table3,alias:t3}]:
         * arreglo de objetos con el nombre y el alias de las tablas
         *
         * @method setTables
         * @public         
         * @param tables {Array|String}: arreglo con el nombre de las tablas o 
         * nombre de la tabla
         * 
         * @return {QueryBuilder} 
         * 
         */ 
                      
        setTables : function(tables){
            this.__tables = tables;
            return this;
        },
        
        /**
         *  saber si se hace la consulta a una sola tabla
         *
         * @method severalTables
         * @public
         * @return {Boolean} si se hace a una sola tabla o a varias 
         * 
         */ 
                      
        severalTables : function(){			
            if(this.__tables.length > 1){
                return true;
            }
            return false;
        },
        
        /**
         *  establecer el metodo select
         *
         * @method select
         * @public         
         * @param howMany {Integer?null}: cuantos registros se va a seleccionar         
         * @param from {Integer?null}: a partir de que registro se va a seleccionar
         * @return {QueryBuilder} 
         * 
         */ 
                      
        select : function(howMany,from){
            this.__select = new cormx.builder.SelectBuilder(this.__columns);
            this.__select.from(this.__tables);
            if(howMany != null){
                var from = from || 0;
                this.__limit = "LIMIT "+from+", "+howMany;
            }            
            return this;
        },
        
        /**
         *  agregar condicion de igualdad de columnas
         *  en caso de que no se utilice "select", se genera un select
         *  general: SELECT * FROM tabla1, tabla2
         *
         * @method addJoin
         * @public         
         * @param base {String}: nombre de la columna (table.column)
         * @param union {String}: nombre de la columna con la que se compara
         * @return {QueryBuilder}
         * 
         */ 
                      
        addJoin : function(base,union){
            var data = {
                base:base,
                union:union
            };
            if(this.__join == null){
                this.__join = new cormx.builder.JoinBuilder(data);
            }else{
                this.__join.addUnion(data);
            }
            return this;
        },
        
        /**
         *  agregar condiciones where
         *  en caso de que no se utilice "select", se genera un select
         *  general: SELECT * FROM tabla
         *
         * @method addWhere
         * @public         
         * @param columnName {String}: nombre de la columna (table.column)
         * @param columnValue {String}: valor de la columna
         * @param conditionType {String?=}: condicion de comparacion
         * @param split {String?AND}: separador de las condiciones (AND, OR)
         * @return {QueryBuilder}
         * 
         */ 
                      
        addWhere : function(columnName,columnValue,conditionType,split){
            var conditionType = conditionType || "=";
            var split = split || "AND";
            var data = {
                column:columnName,
                value:columnValue,
                condition:conditionType,
                split:split
            };
            if(this.__where == null){
                this.__where = new cormx.builder.WhereBuilder(data);
            }else{
                this.__where.addData(data);
            }
            return this;
        },
        
        /**
         *  agregar condiciones or
         *  en caso de que no se utilice "select", se genera un select
         *  general: SELECT * FROM tabla
         *
         * @method addOr
         * @public         
         * @param columnName {String}: nombre de la columna (table.column)
         * @param columnValue {String}: valor de la columna
         * @param conditionType {String?=}: condicion de comparacion
         * @return {QueryBuilder}
         * 
         */ 
                      
        addOr : function(columnName,columnValue,conditionType){
            var conditionType = conditionType || "=";            
            var data = {
                column:columnName,
                value:columnValue,
                condition:conditionType
            };
            if(this.__or == null){
                this.__or = new cormx.builder.OrBuilder(data);
            }else{
                this.__or.addData(data);
            }
            return this;
        },
        
        /**
         *  agregar condiciones and
         *  en caso de que no se utilice "select", se genera un select
         *  general: SELECT * FROM tabla
         *
         * @method addAnd
         * @public         
         * @param columnName {String}: nombre de la columna (table.column)
         * @param columnValue {String}: valor de la columna
         * @param conditionType {String?=}: condicion de comparacion
         * @return {QueryBuilder}
         * 
         */ 
                      
        addAnd : function(columnName,columnValue,conditionType){
            var conditionType = conditionType || "=";            
            var data = {
                column:columnName,
                value:columnValue,
                condition:conditionType
            };
            if(this.__and == null){
                this.__and = new cormx.builder.AndBuilder(data);
            }else{
                this.__and.addData(data);
            }
            return this;
        },
        
        /**
         *  consulta de insertar
         *
         * @method insert
         * @public         
         * @param values {Array}: valores de las columnas
         * @return {QueryBuilder} 
         * 
         */ 
                      
        insert : function(values){
            if(this.__insert == null){
                this.__insert = new cormx.builder.InsertBuilder(this.__tables);
            }
            this.__insert.setColumns(this.__columns);
            this.__insert.setValues(values);
            return this;
        },
        
        /**
         *  consulta de actualizar
         *
         * @method update
         * @public         
         * @param values {Array}: valores de las columnas
         * @return {QueryBuilder} 
         * 
         */ 
                      
        update : function(values){
            if(this.__update == null){
                this.__update = new cormx.builder.UpdateBuilder(this.__tables);
            }
            this.__update.setColumns(this.__columns);
            this.__update.setValues(values);
            return this;
        },
        
        /**
         *  consulta de eliminar
         *  en caso de que no se pasen los datos de la condicion se vacia 
         *  la tabla completa
         *
         * @method remove
         * @public         
         * @param column {String}: nombre de la columna de la condicion
         * @param value {}: valor de la columna par la condicion 
         * @param condition {String?=}: condicion para la eliminacion (=,<,>,<=,>=,like)
         * @param split {String?AND}: separador de condiciones
         * @return {QueryBuilder} 
         * 
         */ 
                      
        remove : function(column,value,condition,split){
            if(this.__delete == null){
                this.__delete = new cormx.builder.DeleteBuilder(this.__tables);
            }
            if(column != null && value != null){
                if(condition == null){                    
                    this.addWhere(column,value);
                }else if(split == null){
                    this.addWhere(column,value,condition);
                }else{
                    this.addWhere(column,value,condition,split);
                }                
            }
            return this;
        },
        
        /**
         *  consulta del minimo valor
         *
         * @method min
         * @public         
         * @param column {String}: nombre de la columna a hayar el minimo
         * @return {QueryBuilder} 
         * 
         */ 
                      
        min : function(column){
            return this.__mat("MIN",column);
        },
        
        /**
         *  consulta del maximo valor
         *
         * @method max
         * @public         
         * @param column {String}: nombre de la columna a hallar el maximo
         * @return {QueryBuilder} 
         * 
         */ 
                      
        max : function(column){
            return this.__mat("MAX",column);
        },
        
        /**
         *  consulta de suma
         *
         * @method sum
         * @public         
         * @param column {String}: nombre de la columna a sumar valores
         * @return {QueryBuilder} 
         * 
         */ 
                      
        sum : function(column){
            return this.__mat("SUM",column);
        },
        
        /**
         *  consulta de promedio
         *
         * @method avg
         * @public         
         * @param column {String}: nombre de la columna a hallar promedio
         * @return {QueryBuilder} 
         * 
         */ 
                      
        avg : function(column){
            return this.__mat("AVG",column);
        },
                        
        /**
         *  generar la consulta sql completa
         *
         * @method generate
         * @public
         * @throws {Error} From wich table!
         * @return {Strign} consulta sql 
         * 
         */ 
                      
        generate : function(){
            if(this.__tables == null){
                throw new Error("From wich table!");
            }
            this.__select2Sql();
            if(this.__insert != null){
                this._sql.push(this.__insert.generate());
            }
            if(this.__update != null){
                this._sql.push(this.__update.generate());
            }
            if(this.__delete != null){
                this._sql.push(this.__delete.generate());
            }
            this.__where2Sql();
            this.__and2Sql();
            this.__or2Sql();
            this.__join2Sql();
            if(this.__group != null){
                this._sql.push(this.__group.join(" "));
            }
            if(this.__order != null){
                this._sql.push(this.__order.join(" "));
            }
            if(this.__limit != null){
                this._sql.push(this.__limit);
            }
            this.__clear();
            return this._sql.join(" ");
        }
    }
});