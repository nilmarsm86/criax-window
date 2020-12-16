/**
 * @asset(parse.json) 
 */

qx.Class.define("json.test.unit.parse.decorator.components.FileDataTest",
{
    extend :qx.dev.unit.TestCase,
    
    properties :
    {
        __path : {}
    },
    
    members :
    {
        setUp : function(){
            var path = new criax.chromeless.lib.Path(criax.chromeless.lib.AppPath.getResourceDir());
            var filePath = path.join(['parse.json']);
            this.__path = filePath.getPath();
        },
        
        testFile : function(){            
            var fileData = new json.parse.decorator.components.FileData(this.__path);
            this.assertEquals('{"a":5,"b":[2,8],"c":true,"d":"string"}',fileData.getData());
        },
        
        testInitialReviver : function(){            
            var fileData = new json.parse.decorator.components.FileData(this.__path);
            this.assertNull(fileData.getReviver());
        },
        
        testReviverFunction : function(){
            var fileData = new json.parse.decorator.components.FileData(this.__path);
            fileData.setReviver(function(value){});
            this.assertFunction(fileData.getReviver());
        },
        
        testReviverArray : function(){
            var fileData = new json.parse.decorator.components.FileData(this.__path);
            fileData.setReviver([1,2,3]);
            this.assertArray(fileData.getReviver());
        }
        
        
    }
});