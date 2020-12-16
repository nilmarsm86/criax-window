 /**
  *  Constructor externo para las pruebas
  */

qx.Class.define("json.test.integration.facade.ExternalBuilder",
{
    extend : json.parse.builder.builders.Builder,

    properties :
    {
        __value : {}
    },
    
    construct : function(value)
    { 
        this.__value = value;        
    },

    members :
    {
        buildDecorator : function(){
            this._to = new json.test.integration.facade.ExternalDecorator();
            this._to.setComponent(new json.parse.decorator.components.StringData(this.__value));
        }
    }
});