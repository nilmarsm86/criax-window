qx.Class.define("validator.test.unit.constraints.NotIdenticalToTest",
{
    extend :qx.dev.unit.TestCase,

    members :
    {
        testEqualString : function(){
            var constraint = new validator.constraints.NotIdenticalTo.validate("","name");
            constraint("name1");
        },
        
        testEqualNumber : function(){
            var constraint = new validator.constraints.NotIdenticalTo.validate("",7);
            constraint(75);
        },
        
        testEqualStringNumber : function(){
            var constraint = new validator.constraints.NotIdenticalTo.validate("mal",7);
            constraint("7");            
        },
        
        testEqualNumberString : function(){
            var constraint = new validator.constraints.NotIdenticalTo.validate("mal","7");            
            constraint(7);            
        },
        
        testIdentical : function(){
            var constraint = new validator.constraints.NotIdenticalTo.validate("mal","name");
            this.assertException(function(){
                constraint("name");
            },Error,"Validation Error: mal");
        }
        
            
    }
});