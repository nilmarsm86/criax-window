qx.Class.define("validator.test.unit.constraints.EqualToTest",
{
    extend :qx.dev.unit.TestCase,

    members :
    {
        testEqualString : function(){
            var constraint = new validator.constraints.EqualTo.validate("","name");
            constraint("name");
        },
        
        testEqualNumber : function(){
            var constraint = new validator.constraints.EqualTo.validate("",7);
            constraint(7);
        },
        
        testEqualStringNumber : function(){
            var constraint = new validator.constraints.EqualTo.validate("",7);
            constraint("7");
        },
        
        testEqualNumberString : function(){
            var constraint = new validator.constraints.EqualTo.validate("","7");
            constraint(7);
        }
        
            
    }
});