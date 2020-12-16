 /**  
  * Clase para el builder de select
  * 
  * @class SelectBuilder
  * @public
  * @extends qx.core.Object
  * @author Nilmar Sanchez Muguercia
  * @namespace cormx.builder  
  * @copyrigth 
  * @license
  * @version 0.0.1
  * 
  */
  
qx.Class.define("cormx.builder.SelectBuilder",
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
         * arreglo de partes de la consulta
         * 
         * @name _sql
         * @protected
         * @type {Array}
         * 
         */
        _sql : {},
        
        /**
         * arreglo de columnas a seleccionar
         * en caso de que no se seleccione ninguna *
         * [column1,colum2,colum3]
         * [{column:column1,alias:c1},{column:column2,alias:c2},{column:column3,alias:c3}]
         * 
         * @name __columns
         * @private
         * @type {Array}
         * 
         */
        __columns : {},
        
        /**
         * codigo temporal de from
         * 
         * @name __temp
         * @private
         * @type {Array}
         * 
         */
        __from : {},
        
        /**
         * codigo temporal de limit
         * 
         * @name __limit
         * @private
         * @type {Array}
         * 
         */
        __limit : {},
        
        /**
         * objeto where builder
         * 
         * @name __whereList
         * @private
         * @type {cormx.builder.WhereBuilder}
         * 
         */
        __whereList : {},
        
        /**
         * objeto or builder
         * 
         * @name __orList
         * @private
         * @type {cormx.builder.OrBuilder}
         * 
         */
        __orList : {},
        
        /**
         * objeto and builder
         * 
         * @name __andList
         * @private
         * @type {cormx.builder.AndBuilder}
         * 
         */
        __andList : {},
        
        /**
         * objeto join builder
         * 
         * @name __joinList
         * @private
         * @type {cormx.builder.JoinBuilder}
         * 
         */
        __joinList : {},
        
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
         * columna a agrupar
         * 
         * @name __group
         * @private
         * @type {Array}
         * 
         */
        __group : {}
    },
    
    /**
     * metodo de inicializacion de la clase
     *
     * @constructor
     * @public
     * @param columns {Array?*}: arreglo de columnas a seleccionar, puede ser
     * el nombre de las columnas o un arreglo de objetos con column y alias
     * [column1,colum2,colum3]
     * [{column:column1,alias:c1},{column:column2,alias:c2},{column:column3,alias:c3}]
     * 
     */
    
    construct : function(columns) 
    { 
        this.__columns = columns || "*";       
        this._sql = [];
        this._sql.push("SELECT");
        this.__clear();
    },
      
   /**
     * @method
     */
    members :
    {
        /**
         *  resetear los temporales
         *
         * @method __clear
         * @private
         *  
         */ 
                      
        __clear : function(){
            this.__from = null;
            this.__limit = null;
            this.__whereList = null;
            this.__orList = null;
            this.__andList = null;
            this.__joinList = null;
            this.__order = null;
            this.__group = null;
        },
        
        /**
         *  generar el codigo de select
         *
         * @method _select
         * @protected 
         * @return {String} parte del codigo del select
         * 
         */ 
                      
        _select : function(){
            if((typeof this.__columns) === "string"){
                return this.__columns;
            }else if((typeof this.__columns) === "object" || (typeof this.__columns) === "array"){
                return this.__objectColumns();
            }  
        },
        
        /**
         *  metodo para cuando la informacion sobre las columnas esta en un objeto
         *
         * @method __ObjectColumns
         * @private
         * @return {String} las columnas separadas por coma
         * 
         */ 
                      
        __objectColumns : function(){            
            var temp = [];
            for(var i=0;i<this.__columns.length;i++){
                if((typeof this.__columns[i]) === "string"){
                    temp.push(this.__columns[i]);
                }else if((typeof this.__columns[i]) === "object"){                    
                    temp.push(this.__objectColumn(this.__columns[i]));
                }
            }        
            return temp.join(", ");
        },
        
        /**
         *  metodo para la informacion de una columna en especifico
         *
         * @method __ObjectColumn
         * @private         
         * @param column {Object} datos de la columna
         * @return {String} el nombre de la columna + si tiene algun alias
         * 
         */ 
                      
        __objectColumn : function(column){
            var objectColumn = column;
            if(objectColumn.alias == null){
                objectColumn.alias = objectColumn.column;
            }
            return objectColumn.column+" AS "+objectColumn.alias;
        },
        
        /**
         *  establecer las tablas de donde se va a seleccionar
         * [table1,table2,table3]
         * [{table:table1,alias:t1},{table:table2,alias:t2},{table:table3,alias:t3}]
         * 
         * @method from
         * @public         
         * @param table {Array|String|Object}: nombre de la tabla o tablas de donde se 
         * seleccion, puede ser un nombre, un arreglo de nombres o un arreglo de
         * objetos
         * 
         * @return {SelectBuilder}
         * 
         */ 
                      
        from : function(table){
            this.__from = [];
            if((typeof table) === "string"){
                this.__from.push(table);
            }else if((typeof table) === "object"){                
                this.__objectTables(table);
            }
            return this;
        },
        
        /**
         *  metodo para procesar la informacion de las tablas en forma de objecto
         *
         * @method __objectTables
         * @private         
         * @param table {Object|String}         
         * 
         */ 
                      
        __objectTables : function(table){            
            this.__from = [];
            for(var i=0;i<table.length;i++){
                if((typeof table[i]) === "string"){
                    this.__from.push(table[i]);
                }else if((typeof table[i]) === "object"){                    
                    this.__from.push(this.__objectTable(table[i]));                    
                }
            }
        },
        
        /**
         *  procesar la informacion de una tabla
         *
         * @method __objectTable
         * @private         
         * @param table {Object} informacion de la tabla
         * @return {String} el nombre de la tabla + si tiene algun alias        
         * 
         */ 
                      
        __objectTable : function(table){            
            if(table.alias == null){
                table.alias = table.table;
            }
            return table.table+" AS "+table.alias;
        },
        
        /**
         *  establecer la seleccion por limite
         *
         * @method limit
         * @public
         * @param howMany {Integer}: cuantos registros se va a seleccionar         
         * @param from {Integer}: a partir de que registro se va a seleccionar
         * @return {SelectBuilder} this
         * 
         */ 
                      
        limit : function(howMany,from){
            var from = from || 0;
            this.__limit = "LIMIT "+from+", "+howMany;
            return this;
        },
        
        /**
         *  agregar condiciones where
         *
         * @method addWhere
         * @public         
         * @param columnName {String}: nombre de la columna (table.column)
         * @param columnValue {String}: valor de la columna
         * @param conditionType {String?=}: condicion de comparacion
         * @param split {String?AND}: separador de las condiciones (AND, OR)
         * @return {SelectBuilder}
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
            if(this.__whereList == null){
                this.__whereList = new cormx.builder.WhereBuilder(data);
            }else{
                this.__whereList.addData(data);
            }
            return this;
        },
        
        /**
         *  agregar condiciones or
         *
         * @method addOr
         * @public         
         * @param columnName {String}: nombre de la columna (table.column)
         * @param columnValue {String}: valor de la columna
         * @param conditionType {String?=}: condicion de comparacion
         * @return {SelectBuilder} 
         * 
         */ 
                      
        addOr : function(columnName,columnValue,conditionType){
            var conditionType = conditionType || "=";
            var data = {
                column:columnName,
                value:columnValue,
                condition:conditionType
            };
            if(this.__orList == null){
                this.__orList = new cormx.builder.OrBuilder(data);
                if(this.__whereList != null){
                    this.__orList.removeWhere();
                }
            }else{
                this.__orList.addData(data);
            }
            return this;
        },
        
        /**
         *  agregar condiciones and
         *
         * @method addAnd
         * @public         
         * @param columnName {String}: nombre de la columna (table.column)
         * @param columnValue {String}: valor de la columna
         * @param conditionType {String?=}: condicion de comparacion
         * @return {SelectBuilder} 
         * 
         */ 
                      
        addAnd : function(columnName,columnValue,conditionType){
            var conditionType = conditionType || "=";
            var data = {
                column:columnName,
                value:columnValue,
                condition:conditionType
            };
            if(this.__andList == null){
                this.__andList = new cormx.builder.AndBuilder(data);
                if(this.__whereList != null){
                    this.__andList.removeWhere();
                }
            }else{
                this.__andList.addData(data);
            }
            return this;
        },
        
        /**
         *  agregar condiciones and
         *
         * @method addAnd
         * @public         
         * @param base {String}: nombre de la columna (table.column)
         * @param union {String}: nombre de la columna con la que se compara
         * (table.column)
         * @return {SelectBuilder} 
         * 
         */ 
                      
        addJoin : function(base,union){
            var data = {
                base:base,
                union:union
            };
            if(this.__joinList == null){
                this.__joinList = new cormx.builder.JoinBuilder(data);
            }else{
                this.__joinList.addUnion(data);
            }
            return this;
        },
        
        /**
         *  generar codigo de consulta
         *  sin importar en el orden en que se pongan primero se generan todos
         *  los AND y despues todos los OR, esto por el peso de la logica que
         *  tienen
         *
         * @method generate
         * @public
         * @return {String} consulta sql 
         * 
         */ 
                      
        generate : function(){
            this._sql.push(this._select());
            this.__generateFrom();
            this.__generateWhere();
            this.__generateAnd();
            this.__generateOr();
            this.__generateJoin();
            this.__generateGroupBy();
            this.__generateOrderBy();
            this.__generateLimit();
            this.__clear();
            return this._sql.join(" ");
        },
        
        /**
         *  metodo para la generacion de los from
         *
         * @method __generateFrom
         * @private         
         * 
         */ 
                      
        __generateFrom : function(){
            if(this.__from != null){
                this._sql.push("FROM "+this.__from.join(", "));
            }
        },
        
        /**
         *  metodo para la generacion de los where
         *
         * @method __generateWhere
         * @private         
         * 
         */ 
                      
        __generateWhere : function(){
            if(this.__whereList != null){
                this._sql.push(this.__whereList.generate());
            }
        },
        
        /**
         *  metodo para la generacion de los and
         *
         * @method __generateAnd
         * @private         
         * 
         */ 
                      
        __generateAnd : function(){
            if(this.__andList != null){
                if(this.__whereList != null){
                    this._sql.push("AND");
                }
                this._sql.push(this.__andList.generate());
            }
        },
        
        /**
         *  metodo para la generacion de los or
         *
         * @method __generateOr
         * @private         
         * 
         */ 
                      
        __generateOr : function(){
            if(this.__orList != null){
                if(this.__whereList != null){
                    this._sql.push("OR");
                }
                this._sql.push(this.__orList.generate());
            }
        },
        
        /**
         *  metodo para la generacion de los join
         *
         * @method __generateJoin
         * @private         
         * 
         */ 
                      
        __generateJoin : function(){
            if(this.__joinList != null){
                if(this.__whereList != null){
                    this._sql.push("AND");
                }else{
                    this._sql.push("WHERE");
                }
                this._sql.push(this.__joinList.generate());
            }
        },
        
        /**
         *  metodo para la generacion de los group by
         *
         * @method __generateGroupBy
         * @private         
         * 
         */ 
                      
        __generateGroupBy : function(){
            if(this.__group != null){
                this._sql.push(this.__group.join(" "));
            }
        },
        
        /**
         *  metodo para la generacion de los order by
         *
         * @method __generateOrderBy
         * @private         
         * 
         */ 
                      
        __generateOrderBy : function(){
            if(this.__order != null){
                this._sql.push(this.__order.join(" "));
            }
        },
        
        /**
         *  metodo para la generacion de los limit
         *
         * @method __generateLimit
         * @private         
         * 
         */ 
                      
        __generateLimit : function(){
            if(this.__limit != null){
                this._sql.push(this.__limit);
            }
        }
    }
});