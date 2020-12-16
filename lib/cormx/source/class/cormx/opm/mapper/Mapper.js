 /**  
  * Clase Mapper padre
  * 
  * @class Mapper
  * @public
  * @extends qx.core.Object
  * @author Nilmar Sanchez Mugeurcia
  * @namespace cormx.opm.mapper.Mapper  
  * @copyrigth 
  * @license
  * @version 0.0.1
  * 
  */
  
qx.Class.define("cormx.opm.mapper.Mapper",
{
    extend : qx.core.Object,
    include : [cormx.opm.MPersistence],
    type : "abstract",
    
    /**
     * @static
     */
    statics : 
    {
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
            var serviceLocator = criax.dic.DiContainer.getInstance();
            var dbal = serviceLocator.get("dbal");
            dbal.setItem(callback,context);
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
                var serviceLocator = criax.dic.DiContainer.getInstance();
                var dbal = serviceLocator.get("dbal");
                dbal.loadData(existDataInStorage,emptyStorage,context);                
            }
        }
    },
    
    /**
     * @property
     */  
    properties : 
    {        
        /**
         * objeto del mapa
         * 
         * @name _map
         * @protected
         * @type {Object}
         * 
         */
        _map : {},
        
        /**
         * objeto de tipo DriverManager
         * 
         * @name _dbal
         * @protected
         * @type {DriverManager}
         * 
         */
        _dbal : {init:null},
        
        /**
         * entidad del mapper
         * 
         * @name _entity
         * @protected
         * @type {Object}
         * 
         */
        _entity : {},
        
        /**
         * objeto de classMapper
         * 
         * @name _classMapper
         * @protected
         * @type {ClassMapper}
         * 
         */
        _classMapper : {},
        
        /**
         * objeto de tipo IdentityMap
         * 
         * @name __im
         * @private
         * @type {cormx.opm.im.IdentityMap}
         * 
         */
        __im : {},
        
        /**
         * propiedad para intercambiar informacion con el identityMap
         * 
         * @name __changeIdentityMap
         * @private
         * @type {cormx.opm.mapper.IdentityMap}
         * 
         */
        __changeIdentityMap : {}
    },
      
   /**
     * @method
     */
    members :
    {   
        /**
         *  metodo de inicio
         *
         * @method init
         * @public 
         * @param entity {Object}: objeto de la entidad
         * 
         */ 
                      
        init : function(entity){
            this._entity = entity;			
            var serviceLocator = criax.dic.DiContainer.getInstance();			
            this._dbal = serviceLocator.get("dbal");//se debe descomentariar el servicio            
            if(qx.core.Environment.get("criax.app.type") == "mobile"){
                this._classMapper = new cormx.opm.mapper.map.MobileClassMap(this._entity['classname']);
            }else{
                this._classMapper = new cormx.opm.mapper.map.ClassMap(this._entity['classname']);
            }            
            this.__changeIdentityMap = new cormx.opm.mapper.IdentityMap(entity);
        },
        
        
        /**
         *  devolver el objeto del classMapper
         *
         * @method getClassMapper
         * @public
         * @return {ClassMapper} 
         * 
         */ 
                      
        getClassMapper : function(){
            return this._classMapper;
        },
        
        /**
         *  validar el valor que se pasa a la consulta
         *
         * @method __validData
         * @private         
         * @param entity {Object}: objeto de la entidad
         * @param attribute {AttributeMap}: objeto de tipo AttributeMap
         * @param associations {Array}: arreglo de objetos de asociacion
         * 
         */ 
                      
        __validData : function(entity,attribute,associations){
            var valid = new cormx.opm.mapper.ValidData(entity,attribute,associations);
            var value = valid.proccess();            
            this._dbal.bindValue(attribute.getColumn(),value);
        },
        
        /**
         *  insertar un nuevo registro
         *  <strong>REFACTORIZAR METODO MUY LARGO</strong>
         *  //para usar transaccion
         *  1-con un arreglo optener todos las entidades a insertar 
         *  2-crear el codigo sql con cada entidad y agregarlo al arreglo de consultas
         *  3-ejecutar el metodo transaction de dbal  
         *
         * @method insert
         * @public         
         * @param entity {Objeto}: objeto de la entidad
         * 
         */ 
                      
        insert : function(entity){
            this.__executeEvent("preInsert",entity);           
            if(qx.core.Environment.get("criax.app.type") == "mobile"){
                var classMap = new cormx.opm.mapper.map.MobileClassMap(this._entity['classname']);
            }else{
                var classMap = new cormx.opm.mapper.map.ClassMap(this._entity['classname']);
            } 
            var id = classMap.getAttributeId();
            var columns = [];
            var values = this.__attributesSetValues(entity,classMap,columns);            
			var classMapTable = classMap.getTable();
            var qb = new cormx.builder.QueryBuilder();
            qb.setTables(classMapTable)
              .setColumns(columns)
              .insert(values);
            this._dbal.prepare(qb);  
            this._dbal.execute();
            this.__addLastEntity(id,columns,classMapTable,entity);
            this.__executeEvent("postInsert",entity);
        },
        
        /**
         *  metodo para agregar la entidad insertada al identity-map
         *
         * @method __addLastEntity
         * @private 
         * @param id {} atributo del id
         * @param columns {Array} arreglo con el nombre de las columnas
         * @param classMapTable {String} nombre de la tabla
         * @param entity {Object} entidad
         * 
         */ 
                      
        __addLastEntity : function(id,columns,classMapTable,entity){            
            var idColumn = id.getColumn();            
            columns.unshift(idColumn);            
            var result = this.getFinder().findByOrderBy(idColumn,true);            
            entity[id.getMutator()](result[0][id.getAccessor()]());
            this.__changeIdentityMap.addIdentityMap(entity); 
        },
        
        /**
         * actualizar un registro  
         * <strong>REFACTORIZAR METODO MUY LARGO</strong>
         *
         * @method update
         * @public         
         * @param entity {Objeto}: objeto de la entidad
         * 
         */ 
                      
        update : function(entity){            
            this.__executeEvent("preUpdate",entity);
            if(qx.core.Environment.get("criax.app.type") == "mobile"){
                var classMap = new cormx.opm.mapper.map.MobileClassMap(this._entity['classname']);
            }else{
                var classMap = new cormx.opm.mapper.map.ClassMap(this._entity['classname']);
            } 
            var id = classMap.getAttributeId();
            var columns = [];
            var values = this.__attributesSetValues(entity,classMap,columns);            
            var qb = new cormx.builder.QueryBuilder();
            qb.setTables(classMap.getTable())
              .setColumns(columns)
              .update(values)
              .addWhere(id.getColumn(),entity[id.getAccessor()]());
            this._dbal.prepare(qb);  
            this._dbal.execute();            
            this.__executeEvent("postUpdate",entity);
        },
        
        /**
         *  metodo para establecer el valor de los atributos
         *
         * @method __attributesSetValues
         * @private         
         * @param entity {Objeto}: objeto de la entidad
         * @param classMap {cormx.opm.mapper.map.ClassMap}
         * @param columns {Array} arreglo de columnas de  la tabla
         * @return {Array} valores de las columnas
         * 
         */ 
                      
        __attributesSetValues : function(entity,classMap,columns){            
            var attributes = classMap.getAttributes();
            var values = [];            
            var associations = classMap.getAssociations();
            for(var i=0;i<attributes.length;i++){
                if(!attributes[i].getAutoIncrement() && !attributes[i].getPrimaryKey()){                    
                    //verificar que la columna no es nula
                    if(attributes[i].getColumn() !== null){
                        columns.push(attributes[i].getColumn());                     
                        values.push("{"+attributes[i].getColumn()+"}");
                        this.__validData(entity,attributes[i],associations);
                    }
                }
            }
            return values;
        },
        
        /**
         *  eliminar un registro
         *
         * @method delete
         * @public         
         * @param entity {Objeto}: objeto de la entidad
         * 
         */ 
                      
        remove : function(entity){            
            this.__executeEvent("preDelete",entity);           
            if(qx.core.Environment.get("criax.app.type") == "mobile"){
                var classMap = new cormx.opm.mapper.map.MobileClassMap(this._entity['classname']);
            }else{
                var classMap = new cormx.opm.mapper.map.ClassMap(this._entity['classname']);
            } 
            var id = classMap.getAttributeId();            
            var qb = new cormx.builder.QueryBuilder();
            qb.setTables(classMap.getTable())
              .remove(id.getColumn(),entity[id.getAccessor()]());
            this._dbal.prepare(qb);  
            this._dbal.execute();            
            this.__executeEvent("postDelete",entity);
        },
        
        /**
         *  ejecutar el evento de la accion
         *  <strong>REFACTORIZAR METODO MUY LARGO</strong>
         *
         * @method __executeEvent
         * @private         
         * @param name {String}: nombre del evento
         * @param entity {Object}: objeto de la entidad
         * 
         */ 
                      
        __executeEvent : function(name,entity){
            var event = this._classMapper.getEvent(name);
            if(event != null){
                var list = [];
                var attributes = event.getValues();
                for(var a in attributes){
                    var attribute = this._classMapper.getAttribute(attributes[a]);
                    var accessor = attribute.getAccessor();
                    list.push(entity[accessor]());
                }
                var result = entity[event.getMethodName()](list);
                if(!result){                    
                    throw new Error("Error in event "+name+" in entity "+entity.classname);
                }
            }
        },
        
        /**
         *  devolver el finder de la entidad
         *
         * @method getFinder
         * @public
         * @return {Finder} finder de la entidad 
         * 
         */ 
                      
        getFinder : function(){
            var clazz = this.transformName(this._entity,"finder");
            return new clazz(this);
        },
        
        /**
         *  devovler el objeto que interactua con el identity map
         *
         * @method getChangeIdentityMap
         * @public
         * @return {cormx.opm.mapper.IdentityMap}
         * 
         */ 
                      
        getChangeIdentityMap : function(){            
            return this.__changeIdentityMap;
        },
        
        /**
         *  metodo para pasar el resultado como valor
         *
         * @method __resultValue
         * @private
         * @param newEntity {Object} entidad
         * @param attribute {Attribute} atributo de la entidad
         * @param mutator {String} mutador del atributo
         * @param value {var} valor del atributo
         * @param associations {Association} asociaciones de la entidad
         * @return {Object} la entidad
         * 
         */ 
                      
        __resultValue : function(newEntity,attribute,mutator,value,associations){            
            if(value != undefined){
                var entity = this.__processResult(newEntity,attribute,mutator,value,associations);
            }else{                            
                var entity = this.__setValueAttribute(newEntity,attribute,mutator,null);                                
            } 
            return entity;
        },
        
        /**
         *  metodo para procesar los valores de los atributos
         *
         * @method __processAttributes
         * @private
         * @param classname {String} namespace de la clase entidad
         * @param classMapper {Mapper} mapper de la entidad
         * @param result {Array} resultado de la consulta
         * @param columns {Array?null} columnas de la consulta
         * @return {Object} entidad coformada
         * 
         */ 
                      
        __processAttributes : function(classname,classMapper,result,columns){
            var entityNamespace = qx.Class.getByName(classname);
            var newEntity = new entityNamespace();
            //establesco las propiedades del entity
            var attributes = classMapper.getAttributes();                    
            var associations = classMapper.getAssociations();                            
            for(var j=0;j<attributes.length;j++){
                var mutator = attributes[j].getMutator();
                var column = attributes[j].getColumn();
                if(columns != undefined){
                    for(var k=0;k<columns.length;k++){                        
                        if((typeof columns[k]) === "string"){
                            if(column == columns[k]){                                
                                newEntity = this.__resultValue(newEntity,attributes[j],mutator,result[column],associations);
                            }
                        }else if((typeof columns[k]) === "object"){                    
                            var sqlColumn = columns[k].column;                            
                            if(sqlColumn.indexOf(".") != -1){
                                var splitColumn = sqlColumn.split(".");
                                sqlColumn = splitColumn[1];                                
                                if(column == sqlColumn){
                                    newEntity = this.__resultValue(newEntity,attributes[j],mutator,result[columns[k].alias],associations);
                                }
                            }                            
                        }
                    }
                }else{                    
                    newEntity = this.__resultValue(newEntity,attributes[j],mutator,result[column],associations);
                }                    
            }   
            return newEntity;
        },
        
        /**
         *  procesar select de varias tablas         
         *  result[i].Entidad.getAtributo()
         *
         * @method __joinTables
         * @private         
         * @param result {Array}: arreglo de los resultados
         * @param tables {Array}: arreglo de tablas de la union
         * @param columns {Array?null} columnas de la consulta
         * @return {Array} arreglo de objetos del resultado
         * 
         */ 
                      
        __joinTables : function(result,tables,columns){
            var resultEntity = [];            
            for(var i=0;i<result.length;i++){
                var join = {};
                for(var t=0;t<tables.length;t++){                    
                    if(qx.core.Environment.get("criax.app.type") == "mobile"){                        
                        var entityMap = cormx.opm.mapper.map.MobileClassMap.getEntityFromTable(tables[t]);
                    }else{
                        var entityMap = cormx.opm.mapper.map.ClassMap.getEntityFromTable(tables[t]);
                    }
                    var entityNamespace = qx.Class.getByName(entityMap.getClass());                    
                    var entity = entityNamespace['basename'];
                    join[entity] = new entityNamespace();
                    join[entity] = this.__processAttributes(entityMap.getClass(),entityMap,result[i],columns);
                }
                resultEntity.push(join);
            }
            return resultEntity;
        },
        
        /**
         *  procesar la seleccion de una sola tabla         
         *
         * @method __oneTable
         * @private         
         * @param result {Array}: arreglo de los resultados
         * @return {Array} arreglo de objetos del resultado
         * 
         */ 
                      
        __oneTable : function(result){            
            var resultEntity = [];            
            var idColumn = this.getColumnId();
            for(var i=0;i<result.length;i++){
                //busco el id en el identitymap
                var entity = this.__changeIdentityMap.searchInIdentityMap(result[i][idColumn]);
                if(entity == null){
                    var newEntity = this.__processAttributes(this._entity.classname,this._classMapper,result[i]);                    
                    //lo agrego a el identitymap                    
                    this.__changeIdentityMap.addIdentityMap(newEntity);                    
                    resultEntity.push(newEntity);                    
                }else{
                    resultEntity.push(entity);
                }
            }
            return resultEntity;
        },
        
        /**
         *  metodo para procesar los resultados y convertirlos en entidades
         *
         * @method __processResult
         * @private
         * @param newEntity {Object} entidad
         * @param attribute {Attribute} atributo de la entidad
         * @param mutator {String} mutador del atributo
         * @param value {var} valor del atributo
         * @param associations {Association} asociaciones de la entidad
         * @return {Object} la entidad
         * 
         */ 
                      
        __processResult : function(newEntity,attribute,mutator,value,associations){            
            newEntity = this.__setValueAttribute(newEntity,attribute,mutator,value);
            if(attribute.getType() === "date"){                
                //var value = value.substring(0,13)+":"+value.substring(13,15)+":"+value.substring(15,24);                
                value = new Date(value);                
                newEntity = this.__setValueAttribute(newEntity,attribute,mutator,value);
            }
            //para que la busqueda del objeto de la relacion sea automatica
            if(attribute.getType() === "object"){
                var attrName = attribute.getName();
                newEntity["__"+attrName] = value;                
                var valid = new cormx.opm.mapper.ValidData(newEntity,attribute,associations);
                var proccessValue = valid.proccess();                            
                newEntity = this.__setValueAttribute(newEntity,attribute,mutator,proccessValue);                                            
            }
            return newEntity;
        },
        
        /**
         *  metodo para establecer el valor del atributo
         *
         * @method __setValueAttribute
         * @private
         * @param newEntity {Object} entidad
         * @param attribute {Attribute} atributo
         * @param mutator {String} mutador del atributo
         * @param value {var} valor del atributo
         * @return {Object} entidad
         * 
         */ 
                      
        __setValueAttribute : function(newEntity,attribute,mutator,value){            
            if(value !== null){
                if((typeof newEntity[mutator]) != "function"){
                    var attrName = attribute.getName();
                    newEntity["__"+attrName] = value;    
                }else{
                    newEntity[mutator](value);                    
                }
            } 
            return newEntity;
        },
        
        /**
         *  ejecutar la consulta finalmente
         *
         * @method execute
         * @public
         * @param columns {Array?null} columnas de la consulta 
         * @return {Array} arreglo de los resultados obtenidos
         * 
         */ 
                      
        execute : function(columns){
            var tables = this._dbal.joinTables();
            var result = this._dbal.execute();
            var resultLength = result.length;            
            if(resultLength == undefined || resultLength == null){
                return [];
            }
            if(tables.length >= 2){                
                return this.__joinTables(result,tables,columns);
            }else{
	            return this.__oneTable(result);
            }
        },
        
        /**
         *  devolver el nombre de la columna id
         *
         * @method geColumnId
         * @public
         * @return {String} nombre de la columna id 
         * 
         */ 
                      
        getColumnId : function(){
            return this._classMapper.getAttributeId().getColumn();
        }
    }
});