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
  
qx.Class.define("cormx.opm.mapper.map.MobileClassMap",
{
    extend : cormx.opm.mapper.map.ClassMap,
    
    /**
     * @property
     */  
    properties : 
    {        
        
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
            var map = cormx.opm.mapper.map.LoadMap.load().getEntities();            
            for(var i=0;i<map.length;i++){                
                if(map.getItem(i).getTable() === table){
                    return new cormx.opm.mapper.map.MobileClassMap(map.getItem(i).getClazz(),map);
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
        this._map = map || cormx.opm.mapper.map.LoadMap.load().getEntities();
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
            for(var i=0;i<this._map.length;i++){                
                if(this._map.getItem(i).getClazz() === classNamespace){
                    this._class = this._map.getItem(i).getClazz();                    
                    this._table = this._map.getItem(i).getTable();
                    this._setAttributes(this._map.getItem(i));
                    this._setEvents(this._map.getItem(i));
                    this._setAssociations(this._map.getItem(i));
                    break;//return
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
            var attributes = mapEntity.getFields();
            for(var attr in attributes){
                var attrObj = {};
                var f = attr.substring(0,3);
                if(f == "get"){                        
                    if((attr != "getUserData") && (attr != "getBindings") && (attr != "get")){
                        var formatAttr = qx.lang.String.firstLow(attr.substring(3));                        
                        var columnMetaData = attributes[attr]();
                        for(var i in columnMetaData){
                            var fun = i.substring(0,3);
                            if(fun == "get"){
                                if((i != "getUserData") && (i != "getBindings") && (i != "get")){
                                    var formatMetaData = qx.lang.String.firstLow(i.substring(3));
                                    attrObj[formatMetaData] = columnMetaData[i](); 
                                }
                            }
                        }
                        this._addAttribute(formatAttr,attrObj);
                    }
                }
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
            var events = mapEntity.getEvents();
            for(var event in events){
                var eventObj = {};
                var f = event.substring(0,3);
                if(f == "get"){                        
                    if((event != "getUserData") && (event != "getBindings") && (event != "get")){
                        var eventMetaData = events[event]();
                        for(var i in eventMetaData){
                            var fun = i.substring(0,3);
                            if(fun == "get"){
                                if((i != "getUserData") && (i != "getBindings") && (i != "get")){
                                    var formatMetaData = qx.lang.String.firstLow(i.substring(3));                                    
                                    if(formatMetaData == "data"){
                                        var argData = eventMetaData[i]();
                                        var data = [];
                                        for(var j=0;j<argData.length;j++){
                                            data.push(argData.getItem(j));
                                        }
                                        eventObj[formatMetaData] = data;
                                    }else{
                                        eventObj[formatMetaData] = eventMetaData[i]();
                                    }
                                }
                            }
                        }
                        this._addEvent(event,eventObj);
                    }
                }
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
            var associations = mapEntity.getAssociations();
            for(var association in associations){
                var f = association.substring(0,3);
                if(f == "get"){                        
                    if((association != "getUserData") && (association != "getBindings") && (association != "get")){
                        var formatAssoc = qx.lang.String.firstLow(association.substring(3));
                        var assocMetaData = associations[association]();
                        this._addAssociation(formatAssoc,assocMetaData);                        
                    }
                }
            }
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
            
            for(var i=0;i<associationObject.getLength();i++){
                var assoc = associationObject.getItem(i);
                var assocObj = {};
                for(var j in assoc){
                    var fun = j.substring(0,3);
                    if(fun == "get"){
                        if((j != "getUserData") && (j != "getBindings") && (j != "get")){
                            var formatMetaData = qx.lang.String.firstLow(j.substring(3));
                            assocObj[formatMetaData] = assoc[j]();
                        }
                    }
                }
                relation.addAssociation(new cormx.opm.mapper.map.association.Association(assocObj));
            }
            this._associations.push(relation);
        }   
        
    }
});