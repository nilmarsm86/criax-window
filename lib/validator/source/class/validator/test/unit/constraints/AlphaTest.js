qx.Class.define("validator.test.unit.constraints.AlphaTest",
{
    extend :qx.dev.unit.TestCase,

    members :
    {
        testString : function(){
            var constraint = new validator.constraints.Alpha.validate("");
            constraint("valor del string");
        },
        
        testStringNumber : function(){
            var constraint = new validator.constraints.Alpha.validate();
            constraint("7");
        },
        
        testStringAndNumber : function(){
            var constraint = new validator.constraints.Alpha.validate("");
            constraint("val78932or del string");
        },
        
        testNumberFloat : function(){
            var constraint = new validator.constraints.Alpha.validate("mal");
            constraint(7.5);
            
        },
        
        testStringNumberFloat : function(){
            var constraint = new validator.constraints.Alpha.validate();
            constraint("7.5");
        },
        
        testNumber : function(){
            var constraint = new validator.constraints.Number.validate("");
            constraint(7);
        }
        
            
    }
});