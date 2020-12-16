qx.Class.define("validator.test.unit.constraints.DurationTest",
{
    extend :qx.dev.unit.TestCase,

    members :
    {
        testDuration : function(){
            var constraint = new validator.constraints.Duration.validate("");
            constraint("199:99:99");
        },
        
        testNotDuration : function(){
            var constraint = new validator.constraints.Duration.validate("mal");
            this.assertException(function(){
                constraint("asd:78:45");
            },Error,"Validation Error: mal");
        }
        
            
    }
});