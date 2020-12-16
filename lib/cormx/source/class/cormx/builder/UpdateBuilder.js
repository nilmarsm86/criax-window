 /**  
  * Clase para el builder de actualizar
  * 
  * @class UpdateBuilder
  * @public
  * @extends cormx.builder.ChangeBuilder
  * @author Nilmar Sanchez Muguercia
  * @namespace cormx.builder  
  * @copyrigth 
  * @license
  * @version 0.0.1
  * 
  */
  
qx.Class.define("cormx.builder.UpdateBuilder",
{
    extend : cormx.builder.ChangeBuilder,
    implement : [cormx.builder.IQueryBuilder],
    
    /**
     * @property
     */  
    properties : 
    {        
        /**
         * Arreglo de partes de la consulta
         * 
         * @name _sql
         * @protected
         * @type {Array}
         * 
         */
        _sql : {}         
    },
    
    /**
     * metodo de inicializacion de la clase
     *
     * @constructor
     * @public
     * @param table {String}: nombre de la tabla
     * 
     */
    
    construct : function(table) 
    { 
        this._table = table;  
        this.base(arguments);
        this._sql.push("UPDATE");
    },
      
   /**
     * @method
     */
    members :
    {
        /**
         *  generar el codigo sql de la consulta
         *
         * @method generate
         * @public
         * @return {String} codigo de la consulta 
         * 
         */ 
                      
        generate : function(){
            this._columnsValuesLength(); 
            this._sql.push(this._table);
            this._sql.push("SET");
            var columnsLength = this._columns.length;
            var temp = [];
            for(var i=0;i<columnsLength;i++){
                temp.push(this._columns[i]+" = '"+this._values[i]+"'");
            }
            this._sql.push(temp.join(", "));
            if(this._whereBuilder != null){
                this._sql.push(this._whereBuilder.generate());
            }            
            return this._sql.join(" ");
        }
    }
});