qx.Class.define("json.test.unit.stringify.decorator.components.ModelDataTest",
{
    extend :qx.dev.unit.TestCase,
    
    properties :
    {
        __model : {},
        __modelData : {}
    },

    members :
    {
        setUp : function(){
            this.__model = qx.data.marshal.Json.createModel({a:5,b:[2,8],c:true,d:"string"});  
            this.__modelData = new json.stringify.decorator.components.ModelData(this.__model);
        },
        
        testValue : function(){            
            var result = this.__modelData.getData();
            this.assertEquals(this.__model.getA(),result.getA());
        },
        
        testInitialReplacer : function(){            
            this.assertNull(this.__modelData.getReplacer());
        },
        
        testReplacerFunction : function(){
            var replacer = function(key, value) {
                if (typeof value === 'number') {
                    value = 2 * value;
                }
                return value;
            };
            
            this.__modelData.setReplacer(replacer);
            this.assertFunction(this.__modelData.getReplacer());
        }
    }
});