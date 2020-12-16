qx.Class.define("validator.test.unit.constraints.TimeTest",
{
    extend :qx.dev.unit.TestCase,

    members :
    {
        testDuration : function(){
            var constraint = new validator.constraints.Time.validate("");
            constraint("23:59:59");
        },
        
        testNotDuration : function(){
            var constraint = new validator.constraints.Time.validate("mal");
            this.assertException(function(){
                constraint("24:60:60");
            },Error,"Validation Error: mal");
        }
        
            
    }
});