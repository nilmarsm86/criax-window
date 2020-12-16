 /**  
  * Clase para procesar las asociaciones
  * el valor debe ser un objeto de la entidad relacionada
  * 
  * @class AssociationProcess
  * @public
  * @extends qx.core.Object
  * @author Nilmar Sanchez Muguercia
  * @namespace cormx.opm.mapper
  * @copyrigth 
  * @license
  * @version 0.0.1
  * 
  */
  
qx.Class.define("cormx.opm.mapper.AssociationProcess",
{
    extend : qx.core.Object,
    include : [cormx.opm.MPersistence],
    
    /**
     * @property
     */  
    properties : 
    {        
        /**
         * relaciones de un tipos especifico
         * 
         * @name __value
         * @private
         * @type {String}
         * 
         */
        __value : {}         
    },
    
    /**
     * metodo de inicializacion de la clase
     *
     * @constructor
     * @public
     * @param associations {Array}: arreglo de objetos de asociacion
     * @param attribute {AttributeMap}: mapeo del atributo
     * @param value {}: valor del atributo de la entidad
     * 
     */
    
    construct : function(associations,attribute,value) 
    { 
        for(var a in associations){
            //relations es un objeto de tipo OneOne, OneMany, ManyMany
            var relations = associations[a].getAssociation(); 
            var relationsLength = relations.length;            
            for(var i=0;i<relationsLength;i++){
                //relations[i], objeto de tipo Associations
                if(this.__relation(attribute,relations[i],value)){
                    break;
                }
            }
        }               
    },
      
   /**
     * @method
     */
    members :
    {
        /**
         *  procesar la relacion
         *  obtener el valor real del campo de la tabla relacionada
         *  <strong>REFACTORIZAR METODO MUY LARGO</strong>
         *
         * @method __relation
         * @private         
         * @param attribute {AttributeMap}: mapeo del atributo
         * @param relation {Association}: objeto de tipo Association
         * @param value {Object}: objeto de la entidad 
         * @throws {Error} The value of attribute ... can not be null!
         * @return {Boolean} si se encontro o no el valor del atributo 
         * 
         */ 
                      
        __relation : function(attribute,relation,value){
            if(attribute.getName() === relation.getAttribute()){                
                //obtengo el function de la entidad con la que me relaciono
                var clazz = relation.getClass();
                if(qx.core.Environment.get("criax.app.type") == "mobile"){                    
                    var classMap = new cormx.opm.mapper.map.MobileClassMap(clazz);
                }else{
                    var classMap = new cormx.opm.mapper.map.ClassMap(clazz);
                }
                //optengo el valor del field
                var attributeRelationEntity = classMap.getAttribute(relation.getField());                
                //optener el function de la entidad relacionada
                var relationFunction = qx.Class.getByName(clazz);
                //si es para insertar o actualizar
                if((typeof value) === "object"){
                    if(value instanceof relationFunction){
                        //obtengo el accessor del field de la relacion
                        var accessorRelationEntity = attributeRelationEntity.getAccessor();
                        this.__value = value[accessorRelationEntity]();
                        if(this.__value == null){//por lo general el id
                            throw new Error("The value of attribute "+attribute.getName()+" can not be null!");
                        } 
                        return true;
                    } 
                    return false; 
                }else{
                    /*//si es para seleccionar(valor sera un objeto)                    
                    //crear una instancia de la clase relacionada
                    var relationEntity = new relationFunction();
                    //obtener el mapper de la entidad de la clase relacionada
                    var mapperFunction = this.transformName(relationEntity,"mapper");
                    var mapper = mapperFunction.getInstance();
                    mapper.init(relationEntity);
                    //obtener el finder de la entidad de la clase relacionada
                    var finderFunction = this.transformName(relationEntity,"finder");
                    var finder = new finderFunction(mapper);                    
                    //es mejor un findOneBy
                    var conditions = {
                        column:attributeRelationEntity.getColumn(),
                        value:value
                    };
                    this.__value = finder.findOneBy([conditions]);*/
                    var em = criax.dic.DiContainer.getInstance().get('entityManager');
                    this.__value = function(){return em.find(relationFunction,value);};
                    return true;
                }
            }
            return false;
        },
        
        /**
         *  valor optenido del proceso de la relacion
         *
         * @method relationValue
         * @public
         * @return {} valor del proceso de la relacion 
         * 
         */ 
                      
        relationValue : function(){
            return this.__value;
        }
    }
});