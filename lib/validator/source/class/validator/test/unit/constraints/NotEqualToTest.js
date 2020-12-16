qx.Class.define("validator.test.unit.constraints.NotEqualToTest",
{
    extend :qx.dev.unit.TestCase,

    members :
    {
        testEqualString : function(){
            var constraint = new validator.constraints.NotEqualTo.validate("","name");
            constraint("name1");
        },
        
        testEqualNumber : function(){
            var constraint = new validator.constraints.NotEqualTo.validate("",7);
            constraint(71);
        },
        
        testEqualStringNumber : function(){
            var constraint = new validator.constraints.NotEqualTo.validate("",7);
            constraint("71");
        },
        
        testEqualNumberString : function(){
            var constraint = new validator.constraints.NotEqualTo.validate("","7");
            constraint(17);
        }
        
            
    }
});