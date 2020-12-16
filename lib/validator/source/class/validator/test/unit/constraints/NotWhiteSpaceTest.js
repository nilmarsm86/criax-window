qx.Class.define("validator.test.unit.constraints.NotWhiteSpaceTest",
{
    extend :qx.dev.unit.TestCase,

    members :
    {
        testWhithoutSpace : function(){
            var constraint = new validator.constraints.NotWhiteSpace.validate("");
            constraint("valor-del_string");
        },
        
        testWhithSpace : function(){
            var constraint = new validator.constraints.NotWhiteSpace.validate("mal");
            this.assertException(function(){
                constraint("valor del string");
            },Error,"Validation Error: mal");            
        },
        
        testWhithSpaceHtmlCode : function(){
            var constraint = new validator.constraints.NotWhiteSpace.validate("mal");
            this.assertException(function(){
                constraint("valor&nbsp;delstring");
            },Error,"Validation Error: mal");            
        }
        
        
        
            
    }
});