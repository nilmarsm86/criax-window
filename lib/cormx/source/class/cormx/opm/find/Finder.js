 /**  
  * Finder General para todas las entidades
  * 
  * @class Finder
  * @public
  * @extends qx.core.Object
  * @author Nilmar Sanchez Muguercia
  * @namespace cormx.opm.find  
  * @copyrigth 
  * @license
  * @version 0.0.1
  * 
  */
  
qx.Class.define("cormx.opm.find.Finder",
{
    extend : qx.core.Object,
    
    /**
     * @property
     */  
    properties : 
    {        
        /**
         * objeto del Mapper
         * 
         * @name __mapper
         * @private
         * @type {cormx.opm.map.Mapper}
         * 
         */
        __mapper : {},
        
        /**
         * objeto del cormx.builder.QueryBuilder
         * 
         * @name __qb
         * @protected
         * @type {cormx.builder.cormx.builder.QueryBuilder}
         * 
         */
        _qb : {},
        
        /**
         * objeto de tipo DriverManager
         * 
         * @name _dbal
         * @protected
         * @type {cormx.dbal.DriverManager}
         * 
         */
        _dbal : {},
        
        /**
         * nombre de la tabla de la entidad
         * 
         * @name _tableName
         * @protected
         * @type {String}
         * 
         */
        _tableName : {},
        
        /**
         * nombre de las columnas separadas por coma
         * 
         * @name _columnsName
         * @protected
         * @type {String}
         * 
         */
        _columnsName : {}
    },
    
    /**
     * metodo de inicializacion de la clase
     *
     * @constructor
     * @public
     * @param mapper {Mapper}: objeto de tipo Mapper
     * 
     */
    
    construct : function(mapper) 
    {   
        this.__mapper = mapper || null;        
        var serviceLocator = criax.dic.DiContainer.getInstance();
        this._dbal = serviceLocator.get("dbal");//se debe descomentariar el servicio
        this._tableName = this.__mapper.getClassMapper().getTable(); 
        var columns = this.__mapper.getClassMapper().getColumns(); 
        this._columnsName = columns.split(",");
        this.__clear();
    },
      
   /**
     * @method
     */
    members :
    {
        /**
         *  inicializar los paramatros
         *
         * @method __clear
         * @private
         *  
         */ 
                      
        __clear : function(){
            this._qb = new cormx.builder.QueryBuilder();
        },
        
        /**
         *  procesar las condiciones de la busqueda, va despues del select
         *
         * @method findByConditions
         * @public         
         * @param conditions {Array}: arreglo de condiciones (objetos) para la consulta
         * {column:valor,value:valor,condition:=,split:and}
         * @return {Array} arreglo de objetos de tipo entity
         * 
         */ 
                      
        findByConditions : function(conditions){
            var conditionLength = conditions.length;         
            for(var i=0;i<conditionLength;i++){
                this._qb.addWhere(conditions[i].column,
                                  '{'+conditions[i].column+'}',//conditions[i].value
                                  conditions[i].condition,
                                  conditions[i].split);
                this._dbal.bindValue(conditions[i].column,conditions[i].value);                  
            }        
            this._dbal.prepare(this._qb);
            this.__clear();
            return this.__mapper.execute();            
        },
        
        /**
         *  buscar un registro por su id
         *
         * @method findById
         * @public         
         * @param id {Integer}: id del registro a buscar
         * @return {Objeto} un objeto de tipo entity
         * 
         */ 
                      
        findById : function(id){
            var entity = this.__mapper.getChangeIdentityMap().searchInIdentityMap(id);
            if(entity != null && (typeof entity) == "object"){
                return entity;
            }else{                
                this.__select();
                this._qb.addWhere(this.__mapper.getColumnId(),'{id}');
                this._dbal.prepare(this._qb)
                          .bindValue('id',id);                           
                return this.__processResult(this.__mapper.execute());
            }
        },
        
        /**
         *  buscar todos los registros de la tabla
         *
         * @method findAll
         * @public
         * @return {Array} arreglo de objetos de tipo entity 
         * 
         */ 
                      
        findAll : function(){            
            return this.findBy([]);
        },
        
        /**
         *  buscar registro de acuerdo a condiciones
         *
         * @method findBy
         * @public         
         * @param conditions {Array}: arreglo de condiciones para la consulta
         * las condiciones son objetos de la forma:[{},{},{}]
         * {column:valor,value:valor,condition:=,split:AND}
         * @return {Array} arreglo de objetos de tipo entity 
         * 
         */ 
                      
        findBy : function(conditions){
            this.__select();
            return this.findByConditions(conditions); 
        },
        
        /**
         *  devolver 1 solo registro de acuerdo a condiciones
         *
         * @method findOneBy
         * @public         
         * @param conditions {Array}: arreglo de condiciones para la consulta
         * las condiciones son objetos de la forma:[{},{},{}]
         * {column:valor,value:valor,condition:=,split:AND}
         * @return {Objeto} un objeto de tipo entity
         * 
         */ 
                      
        findOneBy : function(conditions){            
            return this.__processResult(this.findByLimit(1,conditions));
        },
                        
        /**
         *  metodo para devolver una cantidad de registros especifico
         *
         * @method findByLimit
         * @public         
         * @param limit {Integer} cantidad de registros a devolver
         * @param conditions {Array}: arreglo de condiciones para la consulta
         * las condiciones son objetos de la forma:[{},{},{}]
         * {column:valor,value:valor,condition:=,split:AND}
         * @return {Array} arreglo de objetos de tipo entity 
         * 
         */ 
                      
        findByLimit : function(limit,conditions){
            this.__select(limit);
            return this.findByConditions(conditions);
        },
        
        /**
         *  devolver los resultados de la consulta ejecutada por el usuario
         *  para ello puede ejecutarse mediante el qb o a codigo
         *
         * @method getResult
         * @public
         * @return {Array} arreglo de objetos de tipo entity
         * 
         */ 
                      
        getResult : function(){
        	var columns = this._qb.getColumns();
            this.__clear();
            return this.__mapper.execute(columns);
        },
        
        /**
         *  ejecucion de un metodo que no sea select
         *
         * @method execute
         * @public
         * 
         */ 
                      
        execute : function(){
            this._dbal.execute();
            this.__clear();
        },
        
        /**
         *  metodo para seleccionar en el query builder
         *
         * @method __select
         * @private
         * @param limit {Integer} cantidad de registros a devolver
         * 
         */ 
                      
        __select : function(limit){
            var limit = limit || null;
            this._qb.setColumns(this._columnsName);
            this._qb.setTables(this._tableName);
            if(limit == null){
                this._qb.select();
            }else{
                this._qb.select(limit);
            }
        },
        
        /**
         *  metodo para procesar el resultado de un solo registro
         *
         * @method __processResult
         * @private         
         * @param result {Array} arreglo de resultados
         * @return {Object} objeto de la entidad
         * 
         */ 
                      
        __processResult : function(result){
            if(result.length > 0){                
                return result[0];
            }else{
                var classMapper = this.__mapper.getClassMapper();                    
                var entityNamespace = qx.Class.getByName(classMapper.getClass());
                return new entityNamespace();//porque no podemos devolver NULL                    
            }  
        },
        
        /**
         *  metodo para devolver resultados condicionados ordenados
         *
         * @method findByOrderBy
         * @public         
         * @param column {String}: nombre de la columna por la cual se va a ordenar
         * @param orderDesc {Boolean?false}: si el orden sera asc o desc [asc=false], [desc=true] 
         * @param conditions {Array?[]}: arreglo de condiciones para la consulta
         * las condiciones son objetos de la forma:[{},{},{}]
         * {column:valor,value:valor,condition:=,split:AND}
         * @return {Array} arreglo de objetos de tipo entity 
         * 
         */ 
                      
        findByOrderBy : function(column,orderDesc,conditions){  
            var conditions = conditions || [];
            var order = orderDesc || false;
            this._qb.setColumns(this._columnsName)
                    .setTables(this._tableName)
                    .select()
                    .orderBy(column,order);
            return this.findByConditions(conditions);
        },
        
        /**
         *  metodo para devolver el resultado condicionado ordenado
         *
         * @method findOneByOrderBy
         * @public         
         * @param column {String}: nombre de la columna por la cual se va a ordenar
         * @param orderDesc {Boolean?false}: si el orden sera asc o desc [asc=false], [desc=true] 
         * @param conditions {Array?[]}: arreglo de condiciones para la consulta
         * las condiciones son objetos de la forma:[{},{},{}]
         * {column:valor,value:valor,condition:=,split:AND}
         * @return {Array} arreglo de objetos de tipo entity 
         * 
         */ 
                      
        findOneByOrderBy : function(column,orderDesc,conditions){  
            var conditions = conditions || [];
            var order = orderDesc || false;
            this._qb.setColumns(this._columnsName)
                    .setTables(this._tableName)
                    .select(1)
                    .orderBy(column,order);
            var result = this.findByConditions(conditions);
            return result[0];
        },
        
        /**
         *  metodo para extender el finder
         *  los metodos deben comenzar con findBy o findOneBy
         *  seguido del nombre del atributo
         *
         * @method extend
         * @public         
         * @param magicMethod {String}: nombre del metodo magico         
         * @return {cormx.opm.find.Finder} objeto finder
         * 
         */ 
        extend: function(magicMethod) {            
            if(magicMethod.substring(0,6) == "findBy"){
                this[magicMethod] = this.__createMethod(qx.lang.String.firstLow(magicMethod.substring(6)),true);
                return this;
            }
            
            if(magicMethod.substring(0,9) == "findOneBy"){
                this[magicMethod] = this.__createMethod(qx.lang.String.firstLow(magicMethod.substring(9)),false);
                return this;     
            }                        
        },
        
        /**
         *  metodo para crear el metodo de extension
         *
         * @method __createMethod
         * @private         
         * @param attribute {String}: nombre del atributo
         * @param several {Boolean?false}: se se van a obtener varios resultados o uno solo [false]
         * @return {Function} funccion de extension 
         * 
         */ 
        __createMethod: function(attribute,several) {            
            var several = several || false;
            var attrObj = this.__mapper.getClassMapper().getAttribute(attribute);
            if(attrObj == null){
                throw new Error("Attribute "+attribute+" not found in entity "+this.__mapper.getClassMapper().getClass());
            }
            var column = attrObj.getColumn();//esto debe cambiar cuando solo se utilicen objetos
            return function(param) {                
                var condition = {column:column, value:param};
                if(several){
                    return this.findBy([condition]);
                }else{
                    return this.findOneBy([condition]);
                }
            }
        }
        
    }
});