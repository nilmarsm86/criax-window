qx.Class.define("json.test.unit.stringify.decorator.decorators.StringifyTest",
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
            var stringify = new json.stringify.decorator.decorators.Stringify();
            stringify.setComponent(this.__component);
            return stringify.getData();
        },
        
        setUp : function(){
            this.__modelQx = qx.data.marshal.Json.createModel({a:5,b:[2,8],c:true,d:"string"});
            this.__modelData = new json.stringify.decorator.components.ModelData(this.__modelQx);
            this.__component = new json.stringify.decorator.decorators.ModelToJs();
        },        
        
        testModel : function(){            
            this.__component.setComponent(this.__modelData);
            var result = this.__getResult();
                        
            this.assertEquals('{"a":5,"b":[2,8],"c":true,"d":"string"}', result);
        },
        
        testReplacer : function(){
            var replacer = function replacer(key, value) {
                if (typeof value === 'number') {
                    value = 2 * value;
                }
                return value;
            };
                        
            this.__component.setComponent(this.__modelData);
            this.__component.setReplacer(replacer);
            
            var result = this.__getResult();            
            this.assertEquals('{"a":10,"b":[4,16],"c":true,"d":"string"}', result);
        },
        
        testSpace : function(){
            this.__modelQx = qx.data.marshal.Json.createModel({a:0});
            this.__modelData = new json.stringify.decorator.components.ModelData(this.__modelQx);
            
            this.__component = new json.stringify.decorator.decorators.ModelToJs();
            this.__component.setComponent(this.__modelData);
            this.__component.setSpace(2);
            
            var result = this.__getResult();            
            this.assertEquals('{\n  "a": 0\n}', result);
        }
    }
});