 /**  
  * Clase para la relacion de 1:m
  * 
  * @class OneMany
  * @public
  * @extends cormx.mapper.map.association.AssociationMap
  * @author Nilmar Sanchez Muguercia
  * @namespace cormx.opm.mapper.map.association  
  * @copyrigth 
  * @license
  * @version 0.0.1
  * 
  */
  
qx.Class.define("cormx.opm.mapper.map.association.OneMany",
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
        this.base(arguments,"one_many");                
    },
      
   /**
     * @method
     */
    members :
    {
        
    }
});