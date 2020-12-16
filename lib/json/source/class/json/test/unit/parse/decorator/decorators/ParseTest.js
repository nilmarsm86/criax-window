/**
 * @asset(parse.json) 
 */

qx.Class.define("json.test.unit.parse.decorator.decorators.ParseTest",
{
    extend :qx.dev.unit.TestCase,
    
    properties :
    {
        __data : {},
        __parse : {}
    },

    members :
    {
        __getResult : function(component){
            this.__parse.setComponent(component);
            return this.__parse.getData();
        },
        
        setUp : function(){            
            this.__data = '{"a":5,"b":[2,8],"c":true,"d":"string"}';
            this.__parse = new json.parse.decorator.decorators.Parse();
        },
        
        testParse : function(){            
            var component = new json.parse.decorator.components.StringData(this.__data);                        
            var result = this.__getResult(component);            
            this.assertEquals(String(JSON.parse(this.__data)), String(result));
        },
        
        testParseReviver : function(){
            function dateReviver(key, value) {
                if (typeof value === 'string') {
                    var x = Date.parse(value);
                    if (!isNaN(x)) { // valid date string?
                        return new Date(x);
                    }
                }
                return value;
            }
            var data = '{ "name": "John", "birth": "2011-07-28T22:00:00.000Z" }';
            var component = new json.parse.decorator.components.StringData(data);
            component.setReviver(dateReviver);
                        
            var result = this.__getResult(component);            
            this.assertEquals(String(JSON.parse(data,dateReviver)), String(result));
        },
        
        testParseFile : function(){
            var path = new criax.chromeless.lib.Path(criax.chromeless.lib.AppPath.getResourceDir());
            var filePath = path.join(['parse.json']);
            
            var fileData = new json.parse.decorator.components.FileData(filePath.getPath());
            
            var result = this.__getResult(fileData);            
            this.assertEquals(String(JSON.parse(this.__data)), String(result));
        },
        
        testParseFileReviver : function(){
            var reviver = function(key, value) {
                if (typeof value === 'number') {
                    value = 2 * value;
                }
                return value;
            };
            
            var path = new criax.chromeless.lib.Path(criax.chromeless.lib.AppPath.getResourceDir());
            var filePath = path.join(['parse.json']);
            
            var fileData = new json.parse.decorator.components.FileData(filePath.getPath());
            fileData.setReviver(reviver);
                        
            var result = this.__getResult(fileData);         
            this.assertEquals(String(JSON.parse(this.__data,reviver)), String(result));
        }
    }
});