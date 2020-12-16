qx.Class.define("validator.test.unit.constraints.IdenticalToTest",
{
    extend :qx.dev.unit.TestCase,

    members :
    {
        testEqualString : function(){
            var constraint = new validator.constraints.IdenticalTo.validate("","name");
            constraint("name");
        },
        
        testEqualNumber : function(){
            var constraint = new validator.constraints.IdenticalTo.validate("",7);
            constraint(7);
        },
        
        testEqualStringNumber : function(){
            var constraint = new validator.constraints.IdenticalTo.validate("mal",7);
            this.assertException(function(){
                constraint("7");
            },Error,"Validation Error: mal");
        },
        
        testEqualNumberString : function(){
            var constraint = new validator.constraints.IdenticalTo.validate("mal","7");
            this.assertException(function(){
                constraint(7);
            },Error,"Validation Error: mal");
        }
        
            
    }
});