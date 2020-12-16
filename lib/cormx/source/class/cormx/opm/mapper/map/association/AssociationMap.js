 /**  
  * Clase para mapear los tipos de relaciones de la entidad
  * solo se maneja:
  * 1:1
  * 1:M
  * 
  * @class AssociationMap
  * @public
  * @extends qx.core.Object
  * @author Nilmar Sanchez Muguercia
  * @namespace cormx.opm.mapper.map.association
  * @copyrigth 
  * @license
  * @version 0.0.1
  * 
  */
  
qx.Class.define("cormx.opm.mapper.map.association.AssociationMap",
{
    extend : qx.core.Object,
    type : "abstract",
    
    /**
     * @property
     */  
    properties : 
    {        
        /**
         * nombre de la asociacion
         * 
         * @name _name
         * @protected
         * @type {String}
         * 
         */
        _name : {},
        
        /**
         * arreglo de objetos de asociaciones
         * 
         * @name _associations
         * @protected
         * @type {Array}
         * @default {[]}
         * 
         */
        _associations : {}
    },
    
    /**
     * metodo de inicializacion de la clase
     *
     * @constructor
     * @public
     * @param association {String}: nombre de la asociacion
     * 
     */
    
    construct : function(association) 
    { 
        this._name = association;
        this._associations = [];
    },
      
   /**
     * @method
     */
    members :
    {
        /**
         *  devolver el nombre de la asociacion
         *
         * @method getName
         * @public
         * @return {String} nombre de la asociacion 
         * 
         */ 
                      
        getName : function(){
            return this._name;
        },
        
        /**
         *  agregar asociaciones al mapa
         *
         * @method addAssociation
         * @public
         * @param association {Association}: objeto de tipo Association
         * @throws {Error} paramenter has to be cormx.opm.mapper.map.association.Association
         * @return {AssociationMap}
         * 
         */ 
                      
        addAssociation : function(association){
            criax.oop.TypeHinting.tHClass(cormx.opm.mapper.map.association.Association,association);
            this._associations.push(association);
            return this;
        },
        
        /**
         *  devolver el arreglo de asociaciones de este tipo de relacion
         *
         * @method getAssociation
         * @public
         * @return {Array} arreglo de asociaciones de este tipo de relacion
         * 
         */ 
                      
        getAssociation : function(){
            return this._associations;
        }
    }
});