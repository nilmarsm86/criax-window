/*
 * @asset(parse_new.json)
 */

qx.Class.define("json.test.integration.facade.StringifyTest",
{
    extend :qx.dev.unit.TestCase,
    
    properties :
    {
        __replacer : {},
        __space : {},
        __data : {}
    },

    members :
    {
        setUp : function(){
            this.__replacer = function(key, value) {
                if (typeof value === 'number') {
                    value = 2 * value;
                }
                return value;
            };
            this.__space = 0;
            this.__data = qx.data.marshal.Json.createModel({a:5,b:[2,8],c:true,d:"string"});
        },
        
        testModelToJs : function(){            
            var data = {a:10,b:[4,16],c:true,d:"string"};
            
            var stringify = new json.facade.Stringify();
            stringify.setValue(this.__data);
            stringify.setReplacer(this.__replacer);            
            stringify.setSpace(this.__space);
            stringify.setJsObject(true);
            
            var result = stringify.stringify();
            this.assertEquals(JSON.stringify(data), JSON.stringify(result));            
        },
        
        testModelToStringify : function(){
            var data = {a:10,b:[4,16],c:true,d:"string"};
            
            var stringify = new json.facade.Stringify();
            stringify.setValue(this.__data);
            stringify.setReplacer(this.__replacer);            
            stringify.setSpace(this.__space);            
            
            var result = stringify.stringify();
            this.assertEquals(JSON.stringify(data), result);    
        },
        
        testModelToFile : function(){
            var path = new criax.chromeless.lib.Path(criax.chromeless.lib.AppPath.getResourceDir());
            var filePath = path.join(['parse_new.json']);
            
            var data = '{"a":10,"b":[4,16],"c":true,"d":"string"}';
            
            var stringify = new json.facade.Stringify();
            stringify.setValue(this.__data);
            stringify.setReplacer(this.__replacer);            
            stringify.setSpace(this.__space);
            stringify.setFile(true);
            stringify.setPath(filePath.getPath());
            
            var result = stringify.stringify();
            this.assertEquals(data, result);
        }
    }
});