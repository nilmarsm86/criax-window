 /**  
  * Clase padre para insertar, actualizar y eliminar
  * 
  * @class ChangeBuilder
  * @public
  * @extends criax.mvc.Model
  * @author Nilmar Sanchez Muguercia
  * @namespace cormx.builder
  * @copyrigth 
  * @license
  * @version 0.0.1
  * 
  */
  
qx.Class.define("cormx.builder.ChangeBuilder",
{
    extend : qx.core.Object,
    type : "abstract",
    include : [cormx.common.MEscape],
    
    /**
     * @property
     */  
    properties : 
    {        
        /**
         * nombre de la tabla donde se va a insertar
         * 
         * @name _table
         * @protected
         * @type {String}
         * 
         */
        _table : {},
        
        /**
         * arreglo con el nombre de las columnas de la tabla
         * 
         * @name _columns
         * @protected
         * @type {Array}
         * @default {[]}
         * 
         */
        _columns : {},
        
        /**
         * arreglo de valores a pasar a la consulta
         * 
         * @name _values
         * @protected
         * @type {Array}
         * @default {[]}
         * 
         */
        _values : {},
        
        /**
         * objeto cormx.builder.WhereBuilder para update y delete
         * 
         * @name _whereBuilder
         * @protected
         * @type {cormx.builder.WhereBuilder}
         * 
         */
        _whereBuilder : {}
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
        this._sql = [];
        this._columns = [];
        this._values = [];
    },
      
   /**
     * @method
     */
    members :
    {
        /**
         *  establecer las columnas de la tabla
         *
         * @method setColumns
         * @public         
         * @param columns {Array}: nombres de las columnas
         * @return {ChangeBuilder} this
         * 
         */ 
                      
        setColumns : function(columns){
            this._columns = columns;
            return this;
        },
        
        /**
         *  establecer los valores de las columnas
         *
         * @method setValues
         * @public         
         * @param values {Array}: arreglo con los valores
         * @return {ChangeBuilder} this 
         * 
         */ 
                      
        setValues : function(values){
            for(var i=0;i<values.length;i++){
                this._values.push(this.escape(values[i]));
            }
            return this;
        },
        
        /**
         *  agregar condiciones where
         *
         * @method addConditions
         * @public         
         * @param columnName {String}: nombre de la columna (table.column)
         * @param columnValue {String}: valor de la columna
         * @param conditionType {String?=}: condicion de comparacion
         * @param split {String?AND}: separador de las condiciones (AND, OR)
         * @return {ChangeBuilder}
         * 
         */ 
                      
        addConditions : function(columnName,columnValue,conditionType,split){
            var conditionType = conditionType || "=";
            var split = split || "AND";
            var data = {
                column:columnName,
                value:columnValue,
                condition:conditionType,
                split:split
            };
            if(this._whereBuilder == null){
                this._whereBuilder = new cormx.builder.WhereBuilder(data);
            }else{
                this._whereBuilder.addData(data);
            }
            return this;
        },
        
        /**
         *  comprobar que la longitud del arreglo de columnas y valores sea
         *  la misma
         *
         * @method _columnsValuesLength
         * @protected         
         * @throws {Error} Columns and Values have to be the same length!
         * 
         */ 
                      
        _columnsValuesLength : function(){
            if(this._columns.length !== this._values.length){
                throw new Error("Columns and Values have to be the same length!");
            }
        }
    }
});