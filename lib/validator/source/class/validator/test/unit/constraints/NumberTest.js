qx.Class.define("validator.test.unit.constraints.NumberTest",
{
    extend :qx.dev.unit.TestCase,

    members :
    {
        testNumber : function(){
            var constraint = new validator.constraints.Number.validate("");
            constraint(7);
        },
        
        testNumberDecimalNotAcepted : function(){
            var constraint = new validator.constraints.Number.validate();
            this.assertException(function(){
                constraint(7.5);
            },Error,"Validation Error: Debe contener solo n"+'\u00fa'+"meros enteros!");
        },
        
        testNotNumber : function(){
            var constraint = new validator.constraints.Number.validate("mal");
            this.assertException(function(){
                constraint("7");
            },Error,"Validation Error: mal");
        },
        
        testDecimalNumberAcepted : function(){
            var constraint = new validator.constraints.Number.validate("",true);
            constraint(7.5);
        },
        
        testNotDecimalNumber : function(){
            var constraint = new validator.constraints.Number.validate("mal",true);
            this.assertException(function(){
                constraint("7.5");
            },Error,"Validation Error: mal");
        }        
        
    }
});