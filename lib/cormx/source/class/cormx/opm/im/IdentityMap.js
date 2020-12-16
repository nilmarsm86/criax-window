 /**  
  * Clase padre de los identity maps
  * 
  * @class IdentityMap
  * @public
  * @extends qx.core.Object
  * @author Nilmar Sanchez Muguercia
  * @namespace cormx.opm.im
  * @copyrigth 
  * @license
  * @version 0.0.1
  * 
  */
  
qx.Class.define("cormx.opm.im.IdentityMap",
{
    extend : qx.core.Object,
    type : "abstract",
    
    /**
     * @property
     */  
    properties : 
    {        
        /**
         * mapa de las entidades
         * 
         * @name _map
         * @private
         * @type {Object}
         * 
         */
        _map : {}             
    },
      
   /**
     * @method
     */
    members :
    {
        /**
         *  verificar en caso de que el mapa sea nulo
         *
         * @method __validateMap
         * @private
         * 
         */ 
                      
        __validateMap : function(){
            if(this._map == null){
                this._map = {};
            }
        },
        
        /**
         *  metodo para adicionar una entidad
         *
         * @method set
         * @public         
         * @param entity {Objecto}: objeto de la entidad
         * @param accessor {String}: nombre del metodo accessor de la entidad
         * @return {IdentityMap}
         * 
         */ 
                      
        set : function(entity,accessor){
            this.__validateMap();
            var id = entity[accessor]();
            if(id != undefined){
                this._map[id] = entity;//identificador id, contenido objeto
            }
            return this;
            
            
        },
        
        /**
         *  devolver el objeto de una entidad
         *
         * @method get
         * @public         
         * @param id {Integer}: id del objeto de la entidad
         * @return {Object|null} el objeto
         * 
         */ 
                      
        get : function(id){
            this.__validateMap();
            if(this._map[id] != null){
                return this._map[id];
            }
            return null;
        },
        
        /**
         *  eliminar una entidad, cuando se elimina
         *
         * @method blank
         * @public         
         * @param id {Integer}: id de la entidad a eliminar
         * @return {IdentityMap}
         * 
         */ 
                      
        blank : function(id){
            this.__validateMap();
            this._map[id] = null;
            return this;
        },
        
        /**
         *  limpiar todas las referencias de entidades
         *
         * @method clean
         * @public
         * 
         */ 
                      
        clean : function(){
            this.map = null;
        }
    }
});