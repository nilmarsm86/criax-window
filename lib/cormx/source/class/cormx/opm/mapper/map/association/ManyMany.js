 /**  
  * Clase para la relacion de m:m
  * en esta clase deben faltar cosas
  * 
  * @class ManyMany
  * @public
  * @extends cormx.mapper.map.association.AssociationMap
  * @author Nilmar Sanchez Muguercia
  * @namespace cormx.opm.mapper.map.association  
  * @copyrigth 
  * @license
  * @version 0.0.1
  * 
  */
  
qx.Class.define("cormx.opm.mapper.map.association.ManyMany",
{
    extend : cormx.opm.mapper.map.association.AssociationMap,
    
    /**
     * @property
     */  
    properties : 
    {        
                 
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
        this.base(arguments,"many_many");                
    },
      
   /**
     * @method
     */
    members :
    {
        
    }
});