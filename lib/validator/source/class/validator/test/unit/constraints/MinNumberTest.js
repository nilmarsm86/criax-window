qx.Class.define("validator.test.unit.constraints.MinNumberTest",
{
    extend :qx.dev.unit.TestCase,

    members :
    {
        testNumber : function(){
            var constraint = new validator.constraints.MinNumber.validate("",7);
            constraint(7);
        },
        
        testNumberDecimalNotAcepted : function(){
            var constraint = new validator.constraints.MinNumber.validate("mal",8,false);
            this.assertException(function(){
                constraint(7.5);
            },Error,"Validation Error: mal");
        },
        
        testNotNumber : function(){
            var constraint = new validator.constraints.MinNumber.validate("mal",9);
            this.assertException(function(){
                constraint("7");
            },Error,"Validation Error: mal");
        },
        
        testDecimalNumberAcepted : function(){
            var constraint = new validator.constraints.MinNumber.validate("",3,true);
            constraint(7.5);
        },
        
        testNotDecimalNumber : function(){
            var constraint = new validator.constraints.MinNumber.validate("mal",8,true);
            this.assertException(function(){
                constraint("7.5");
            },Error,"Validation Error: mal");
        },
        
        testMinNumber : function(){
            var constraint = new validator.constraints.MinNumber.validate("",5);
            this.assertException(function(){
                constraint(3);
            },Error,"Validation Error: El n"+'\u00fa'+"mero debe ser mayor o igual que 5");
        },
        
        testMaxDecimalNumber : function(){
            var constraint = new validator.constraints.MinNumber.validate("",5.3,true);
            this.assertException(function(){
                constraint(5.2);
            },Error,"Validation Error: El n"+'\u00fa'+"mero debe ser mayor o igual que 5.3");
        }
        
    }
});