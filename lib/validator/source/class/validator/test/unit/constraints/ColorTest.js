qx.Class.define("validator.test.unit.constraints.ColorTest",
{
    extend :qx.dev.unit.TestCase,

    members :
    {
        testColor : function(){
            var constraint = new validator.constraints.Color.validate("");
            constraint("#000000");
        },
        
        testNotColor : function(){
            var constraint = new validator.constraints.Color.validate("mal");
            this.assertException(function(){
                constraint("#zzzzzz");
            },Error,"Validation Error: mal");
        }
        
            
    }
});