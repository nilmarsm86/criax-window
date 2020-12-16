 /**  
  * Clase para la carga de la informacion para la clase
  * 
  * @class ClassMapper
  * @public
  * @extends qx.core.Object
  * @author Nilmar Sanchez Muguercia
  * @namespace cormx.opm.mapper.map
  * @copyrigth 
  * @license
  * @version 0.0.1
  * 
  */
  
qx.Class.define("cormx.opm.mapper.map.ClassMap",
{
    extend : qx.core.Object,
    
    /**
     * @property
     */  
    properties : 
    {        
        /**
         * nombre de la entidad
         * 
         * @name _class
         * @private
         * @type {String}
         * 
         */
        _class : {},
        
        /**
         * nombre de la tabla
         * 
         * @name _table
         * @private
         * @type {String}
         * 
         */
        _table : {},
        
        /**
         * namespace de la clase
         * 
         * @name _namespace
         * @private
         * @type {String}
         * 
         */
        _namespace : {},
        
        /**
         * mapa
         * 
         * @name _map
         * @private
         * @type {Object}
         * 
         */
        _map : {},
        
        /**
         * arreglo de atributos de la clase
         * 
         * @name _attributes
         * @private
         * @type {Array}
         * 
         */
        _attributes : {},
        
        /**
         * arreglo de eventos de la clase
         * 
         * @name _events
         * @private
         * @type {Array}
         * 
         */
        _events : {},
        
        /**
         * arreglo de asociaciones
         * 
         * @name _associations
         * @private
         * @type {Array}
         * 
         */
        _associations : {}
    },
    
     /**
     * @static
     */
    statics : 
    {
        /**
         *  devolver la entidad a partir de la tabla
         *
         * @method getEntityFromTable
         * @public         
         * @param table {String}: nombre de la tabla
         * @return {Object} la entidad de la tabla
         * 
         */ 
                      
        getEntityFromTable : function(table){
            var map = cormx.opm.mapper.map.LoadMap.load().entities;
            for(var i in map){
	            if(map[i].table === table){
	                return new cormx.opm.mapper.map.ClassMap(map[i].clazz,map);
	            }
	        }   
        }
    },
    
    /**
     * metodo de inicializacion de la clase
     * <strong>REFACTORIZAR MUY LARGO</strong>
     *
     * @constructor
     * @public
     * @param classNamespace {String}: namespace de la entidad
     * @param map {Object}: mapa personalizado
     * 
     */
    
    construct : function(classNamespace,map) 
    {   
        this._map = map || cormx.opm.mapper.map.LoadMap.load().entities;
		this._attributes = [];
        this._events = [];
        this._associations = [];        
        this._forEachEntity(classNamespace);
    },
      
   /**
     * @method
     */
    members :
    {
        /**
         *  metodo para establecer los valores de cada entidad
         *
         * @method _forEachEntity
         * @private         
         * @param classNamespace {String}: namespace de la entidad
         * 
         */ 
                      
        _forEachEntity : function(classNamespace){
            for(var i in this._map){
	            if(this._map[i].clazz === classNamespace){
	                this._class = this._map[i].clazz;             
	                this._table = this._map[i].table;	                
                    this._setAttributes(this._map[i]);
                    this._setEvents(this._map[i]);
                    this._setAssociations(this._map[i]);
	                break;
	            }
            }    
        },
        
        /**
         *  metodo para establecer los atributos
         *
         * @method _setAttributes
         * @private
         * @param mapEntity {Object} objeto del mapa de la entidad
         * 
         */ 
                      
        _setAttributes : function(mapEntity){
            var attributes = mapEntity.fields;
            for(var attribute in attributes){
                this._addAttribute(attribute,attributes[attribute]);
            }
        },
        
        /**
         *  metodo para establecer los eventos
         *
         * @method _setEvents
         * @private
         * @param mapEntity {Object} objeto del mapa de la entidad
         * 
         */ 
                      
        _setEvents : function(mapEntity){
            var events = mapEntity.events;
            for(var event in events){
                this._addEvent(event,events[event]);
            }
        },
        
        /**
         *  metodo para establecer las asciaciones o relaciones
         *
         * @method _setAssociations
         * @private
         * @param mapEntity {Object} objeto del mapa de la entidad
         * 
         */ 
                      
        _setAssociations : function(mapEntity){
            var associations = mapEntity.associations;
            for(var association in associations){
                this._addAssociation(association,associations[association]);
            }
        },
        
        /**
         *  agregar los atributos de la clase
         *
         * @method _addAttribute
         * @private         
         * @param name {String}: nombre del atributo
         * @param attributeObject {Object}: objeto del atributo
         * 
         */ 
                      
        _addAttribute : function(name,attributeObject){            
            this._attributes.push(new cormx.opm.mapper.map.AttributeMap(name,attributeObject));
        },
        
        /**
         *  agregar los eventos de la entidad
         *
         * @method _addEvent
         * @private         
         * @param name {String}: nombre del evento
         * @param atributeObject {Object}: objeto del atributo
         * 
         */ 
                      
        _addEvent : function(name,atributeObject){
            this._events.push(new cormx.opm.mapper.map.EventMap(name,atributeObject));
        },
        
        /**
         *  agregar los tipos de asociaciones de la entidad
         *
         * @method _addAssociation
         * @private  
         * @param type {String}: tipo de asociacion       
         * @param associationObject {Object}: objeto de la asociacion
         * 
         */ 
                      
        _addAssociation : function(type,associationObject){
            var relation = {};
            switch(type){
                case "one_one":
                    relation = new cormx.opm.mapper.map.association.OneOne();
                break;
                
                case "one_many":
                    relation = new cormx.opm.mapper.map.association.OneMany();
                break;
                
                case "many_many":
                    relation = new cormx.opm.mapper.map.association.ManyMany();
                break;
            }
            for(var r in associationObject){
                relation.addAssociation(new cormx.opm.mapper.map.association.Association(associationObject[r]));
            }
            this._associations.push(relation);
        },
        
        /**
         *  devolver el nombre de la clase
         *
         * @method getClass
         * @public
         * @return {String} nombre de la clase 
         * 
         */ 
                      
        getClass : function(){
            return this._class;
        },
        
        /**
         *  devolver el nombre de la tabla
         *
         * @method getTable
         * @public
         * @return {String} nombre de la tabla 
         * 
         */ 
                      
        getTable : function(){
            return this._table;
        },
        
        /**
         *  devolver en un string el nombre de las columnas separadas
         *  por coma y comilla simple
         *
         * @method getColumns
         * @public
         * @return {String} columnas 
         * 
         */ 
                      
        getColumns : function(){
            var columns = new Array();
            for(var col in this._attributes){
                //verificar que la columna no es nula
                if(this._attributes[col].getColumn() !== null){
                    columns.push(this._attributes[col].getColumn());
                }
            }
            return columns.join(",");
        },
        
        /**
         *  devolver el nombre de la columna a partir del atributo
         *
         * @method getColumn
         * @public         
         * @param attributeName {String}: nombre del atributo
         * @return {String|Null} nombre de la columna o null
         * 
         */ 
                      
        getColumn : function(attributeName){
            for(var attr in this._attributes){            
                if(this._attributes[attr].getName() === attributeName){
                    return this._attributes[attr].getColumn();
                }
            }
            return null;
        },
        
        /**
         *  devovler el arreglo de objeto de atributos
         *
         * @method getAttributes
         * @public
         * @return {Array} objetos de atributos 
         * 
         */ 
                      
        getAttributes : function(){
            return this._attributes;
        },
        
        /**
         *  devovler el arreglo de objeto de eventos
         *
         * @method getEvents
         * @public
         * @return {Array} objetos de eventos 
         * 
         */ 
                      
        getEvents : function(){
            return this._events;
        },
        
        /**
         *  devolver el objeto de un evento especifico
         *
         * @method getEvent
         * @public         
         * @param name {String}: nombre del evento
         * @return {cormx.opm.mapper.map.EventMap|Null} objeto de tipo cormx.opm.mapper.map.EventMap
         * 
         */ 
                      
        getEvent : function(name){
            for(var ev in this._events){            
                if(this._events[ev].getName() === name){
                    return this._events[ev];
                }
            }    
            return null;
        },
        
        /**
         *  devolver el objeto del atributo a partir de su nombre
         *
         * @method getAttribute
         * @public         
         * @param attributeName {String}: nombre del atributo
         * @return {AttributeMapper|Null} objeto
         * 
         */ 
                      
        getAttribute : function(attributeName){            
            for(var attr in this._attributes){
                if(this._attributes[attr].getName() === attributeName){                    
                    return this._attributes[attr];
                }
            }
            return null;
        },
        
        /**
         *  devolver el objeto del atributo de id
         *
         * @method getAttributeId
         * @public
         * @return {AtributeMapper} objeto del atributo
         * 
         */ 
                      
        getAttributeId : function(){
            return this.getAttribute("id");//por defecto id
        },
        
        /**
         *  devolver el arreglo de asociaciones
         *
         * @method getAssociations
         * @public
         * @return {Array} Arreglo de objetos de tipo AssociationMap
         * 
         */ 
                      
        getAssociations : function(){
            return this._associations;
        }
    }
});