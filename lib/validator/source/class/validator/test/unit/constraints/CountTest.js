qx.Class.define("validator.test.unit.constraints.CountTest",
{
    extend :qx.dev.unit.TestCase,

    members :
    {
        testLength : function(){
            var constraint = new validator.constraints.Count.validate("",3,7);
            constraint([1,2,3,4]);
        },
        
        testUpLength : function(){
            var constraint = new validator.constraints.Count.validate("mal",3,7);
            this.assertException(function(){
                constraint([1,2,3,4,5,6,7,8,9,10,11,12,13]);
            },Error,"Validation Error: mal");
        },
        
        testDownLength : function(){
            var constraint = new validator.constraints.Count.validate("",13, 15);
            this.assertException(function(){
                constraint([1,2,3,4,5,6,7,8,9]);
            },Error,"Validation Error: Debe especificar al menos 13 elemento");
        }
            
    }
});