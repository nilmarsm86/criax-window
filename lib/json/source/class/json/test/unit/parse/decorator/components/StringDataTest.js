qx.Class.define("json.test.unit.parse.decorator.components.StringDataTest",
{
    extend :qx.dev.unit.TestCase,

    members :
    {
        testValue : function(){
            var stringData = new json.parse.decorator.components.StringData('value');
            this.assertEquals('value',stringData.getData());
        },
        
        testInitialReviver : function(){
            var stringData = new json.parse.decorator.components.StringData('value');
            this.assertNull(stringData.getReviver());
        },
        
        testReviverFunction : function(){
            var stringData = new json.parse.decorator.components.StringData('value');
            stringData.setReviver(function(value){});
            this.assertFunction(stringData.getReviver());
        },
        
        testReviverArray : function(){
            var stringData = new json.parse.decorator.components.StringData('value');
            stringData.setReviver([1,2,3]);
            this.assertArray(stringData.getReviver());
        }
    }
});