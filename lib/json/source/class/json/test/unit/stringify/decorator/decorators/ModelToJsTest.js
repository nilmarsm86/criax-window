qx.Class.define("json.test.unit.stringify.decorator.decorators.ModelToJsTest",
{
    extend :qx.dev.unit.TestCase,
    
    properties :
    {
        __modelQx : {},
        __modelData : {},
        __component : {}
    },

    members :
    {
        __getResult : function(){
            this.__component.setComponent(this.__modelData);
            return this.__component.getData();
        },
        
        setUp : function(){
            this.__modelQx = qx.data.marshal.Json.createModel({a:5,b:[2,8],c:true,d:"string"});
            this.__modelData = new json.stringify.decorator.components.ModelData(this.__modelQx);
            this.__component = new json.stringify.decorator.decorators.ModelToJs();
        },
        
        testModel : function(){            
            var result = this.__getResult();            
            this.assertEquals(5, result.a);
        },
        
        testModelReplacer : function(){            
            var replacer = function (key, value) {
                if (typeof value === 'number') {
                    value = 2 * value;
                }
                return value;
            };
            
            this.__modelData.setReplacer(replacer);
            
            var result = this.__getResult();            
            this.assertEquals(10, result.a);
        }
    }
});