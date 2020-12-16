 /**
  *  Decorador externo para el test  
  */

qx.Class.define("json.test.integration.facade.ExternalDecorator",
{
    extend : json.parse.decorator.decorators.Decorator,

    properties :
    {
        
    },
    
    construct : function()
    { 
        this._data = null;
    },

    members :
    {
        _transform : function(){
            this._data = this._component.getData();            
            return JSON.parse(this._data, function(key, value){
                if (typeof value === 'number') {
                    value = 0;
                }
                
                if(typeof value === 'string'){
                    value = value.toUpperCase();
                }
                return value;
            });
        }
    }
});