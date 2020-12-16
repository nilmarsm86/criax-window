/**
 * @asset(parse.json) 
 */

qx.Class.define("json.test.unit.parse.decorator.decorators.ModelTest",
{
    extend :qx.dev.unit.TestCase,
    
    properties :
    {
        __path : {},
        __data : {},
        __model : {},
        __parse : {},
        __reviver : {}
    },

    members :
    {
        __getResult : function(component){
            this.__parse.setComponent(component);
            this.__model.setComponent(this.__parse);
            return this.__model.getData();
        },
        
        setUp : function(){
            
            this.__data = '{"a":5,"b":[2,8],"c":true,"d":"string"}';
            this.__parse = new json.parse.decorator.decorators.Parse();
            this.__model = new json.parse.decorator.decorators.Model();
            this.__reviver = function(key, value) {
                if (typeof value === 'number') {
                    value = 2 * value;
                }
                return value;
            };            
        },
        
        testModel : function(){            
            var component = new json.parse.decorator.components.StringData(this.__data);            
            var result = this.__getResult(component);
            this.assertEquals(5, result.getA());
        },
        
        testModelReviver : function(){
            var component = new json.parse.decorator.components.StringData(this.__data);
            component.setReviver(this.__reviver);
            var result = this.__getResult(component);            
            this.assertEquals(16, result.getB().getItem(1));
        },
        
        testModelString : function(){
            var path = new criax.chromeless.lib.Path(criax.chromeless.lib.AppPath.getResourceDir());
            var filePath = path.join(['parse.json']);
            
            var fileData = new json.parse.decorator.components.FileData(filePath.getPath());
            fileData.setReviver(this.__reviver);
            
            this.__model.setComponent(fileData);
            var result = this.__model.getData();
            
            this.assertEquals(10, result.getA());
        }
    }
});