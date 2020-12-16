qx.Class.define("validator.test.unit.constraints.RangeNumberTest",
{
    extend :qx.dev.unit.TestCase,

    members :
    {
        testLength : function(){
            var constraint = new validator.constraints.RangeNumber.validate("",3,7);
            constraint(5);
        },
        
        testUpLength : function(){
            var constraint = new validator.constraints.RangeNumber.validate("mal",3,7);
            this.assertException(function(){
                constraint(13);
            },Error,"Validation Error: mal");
        },
        
        testDownLength : function(){
            var constraint = new validator.constraints.RangeNumber.validate("mal",13, 15);
            this.assertException(function(){
                constraint(9);
            },Error,"Validation Error: mal");
        }
            
    }
});