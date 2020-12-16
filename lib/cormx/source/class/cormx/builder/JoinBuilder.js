 /**  
  * Clase para generar el codigo de los join
  * 
  * @class JoinBuilder
  * @public
  * @extends qx.core.Object
  * @author Nilmar Sanchez Muguercia
  * @namespace cormx.builder
  * @copyrigth 
  * @license
  * @version 0.0.1
  * 
  */
  
qx.Class.define("cormx.builder.JoinBuilder",
{
    extend : qx.core.Object,
    implement : [cormx.builder.IQueryBuilder],
    
    /**
     * @property
     */  
    properties : 
    {        
        /**
         * arreglo de elementos para formar la consulta
         * 
         * @name _sql
         * @protected
         * @type {Array}
         * 
         */
        _sql : {},
        
        /**
         * objeto de uniones
         * {base:tabla.column,union:table.column}
         * 
         * @name __union
         * @private
         * @type {Object}
         * 
         */
        __union : {}
    },
    
    /**
     * metodo de inicializacion de la clase
     *
     * @constructor
     * @public
     * @param data {Object}: uniones
     * 
     */
    
    construct : function(data) 
    { 
        this._sql = [];     
        this.__union = [];
        this.__union.push(data);
    },
      
   /**
     * @method
     */
    members :
    {
        /**
         *  agregar union
         *
         * @method addUnion
         * @public         
         * @param data {Object}: datos {union:table.colum,base:table.column}
         * @return {JoinBuilder} 
         * 
         */ 
                      
        addUnion : function(data){
            this.__union.push(data);
            return this;
        },
        
        /**
         *  procesar las condiciones
         *
         * @method _processConditions
         * @protected 
         * 
         */
                      
        _processCondition : function(){
            var unionLength = this.__union.length;
            for(var i=0;i<unionLength;i++){
                var obj = this.__union[i];
                if((unionLength-1) === i){
                    this._sql.push(obj.base+" = "+obj.union);
                }else{
                    this._sql.push(obj.base+" = "+obj.union+" AND");
                }
            }
        },
        
        /**
         *  devuelve el codigo sql de la consulta
         *
         * @method generate
         * @public
         * @return {String} consulta sql 
         * 
         */ 
                      
        generate : function(){
            this._processCondition();
            return this._sql.join(" ");
        }
    }
});