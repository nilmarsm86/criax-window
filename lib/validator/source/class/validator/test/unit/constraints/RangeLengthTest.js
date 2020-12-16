qx.Class.define("validator.test.unit.constraints.RangeLengthTest",
{
    extend :qx.dev.unit.TestCase,

    members :
    {
        testLength : function(){
            var constraint = new validator.constraints.RangeLength.validate("",3,7);
            constraint("nilmar1");
        },
        
        testUpLength : function(){
            var constraint = new validator.constraints.RangeLength.validate("mal",3,7);
            this.assertException(function(){
                constraint("user@subdomain");
            },Error,"Validation Error: mal");
        },
        
        testDownLength : function(){
            var constraint = new validator.constraints.RangeLength.validate("mal",13, 15);
            this.assertException(function(){
                constraint("user");
            },Error,"Validation Error: mal");
        }
            
    }
});