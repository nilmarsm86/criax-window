 /**  
  * Clase IdentityMap
  * Esta clase es para que el objeto Mapper de la entidad intercambien 
  * informacion con el IdentityMap de la entidad
  * 
  * @class IdentityMap
  * @public
  * @extends qx.core.Object
  * @author Nilmar Sanchez Mugeurcia
  * @namespace cormx.opm.mapper  
  * @copyrigth 
  * @license
  * @version 0.0.1
  * 
  */
  
qx.Class.define("cormx.opm.mapper.IdentityMap",
{
    extend : qx.core.Object,    
    include : [cormx.opm.MPersistence],
    
    /**
     * @property
     */  
    properties : 
    {        
        /**
         * entidad del mapper
         * 
         * @name __entity
         * @private
         * @type {Object}
         * 
         */
        __entity : {},
        
        /**
         * objeto de tipo IdentityMap
         * 
         * @name __im
         * @private
         * @type {cormx.opm.im.IdentityMap}
         * 
         */
        __im : {}
    },
    
    /**
     * metodo de inicializacion de la clase
     *
     * @constructor
     * @public
     * @param entity {Object} entidad
     * 
     */
    
    construct : function(entity) 
    { 
        this.__entity = entity;   
        this.__im = this.transformName(entity,"identity").getInstance();
    },
      
   /**
     * @method
     */
    members :
    {   
        /**
         *  agregar un registro en el identity map
         *
         * @method addIdentityMap
         * @public         
         * @param entity {Object}: entidad
         * 
         */ 
                      
        addIdentityMap : function(entity){
            var changeIdentityMap = new cormx.opm.mapper.IdentityMap(entity);            
            changeIdentityMap.__set();
        },
        
        /**
         *  metodo para adicionar la entidad al identity map
         *
         * @method __set
         * @private
         * 
         */ 
                      
        __set : function(){
            var classMapper = this.__classMapper();
            this.__im.set(this.__entity,classMapper.getAttributeId().getAccessor());
        },
        
        /**
         *  buscar un registro en el identity map
         *
         * @method searchInIdentityMap
         * @public         
         * @param id {Integer}: id del registro a buscar
         * @return {Object} un objeto de tipo entity
         * 
         */ 
                      
        searchInIdentityMap : function(id){
            return this.__im.get(id);
        },
        
        /**
         *  obtener los datos del schema de la entidad
         *
         * @method __classMapper
         * @private
         * @return {cormx.opm.mapper.map.cormx.opm.mapper.map.ClassMap}
         * 
         */ 
                      
        __classMapper : function(){
            if(qx.core.Environment.get("criax.app.type") == "mobile"){
                return new cormx.opm.mapper.map.MobileClassMap(this.__entity.classname);
            }else{
                return new cormx.opm.mapper.map.ClassMap(this.__entity.classname);
            }    
        },
        
        /**
         *  obtener el id de la entidad
         *
         * @method __entityId
         * @private
         * @return {Integer} id de la entidad
         * 
         */ 
                      
        __entityId : function(){
            return this.__classMapper().getAttributeId();
        },
        
        /**
         *  eliminar del identity-map
         *
         * @method removeIM
         * @public         
         * @param entity {Object}: objeto de la entidad
         * 
         */ 
                      
        removeIM : function(entity){
            var changeIdentityMap = new cormx.opm.mapper.IdentityMap(entity);
            changeIdentityMap.__remove();
        },
        
        /**
         *  metodo para eliminar del identity map
         *
         * @method __remove
         * @private
         * 
         */ 
                      
        __remove : function(){
            var id = this.__entityId();
            var idValue = this.__entity[id.getAccessor()]();            
            this.__im.blank(idValue);
        },
        
        /**
         * actualizar en el identity-map 
         *
         * @method changeIM
         * @public         
         * @param entity {Object}: objeto de la entidad
         * 
         */ 
                      
        changeIM : function(entity){
            this.addIdentityMap(entity);
        }
    }
});