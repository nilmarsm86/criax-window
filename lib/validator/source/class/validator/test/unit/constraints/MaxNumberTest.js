qx.Class.define("validator.test.unit.constraints.MaxNumberTest",
{
    extend :qx.dev.unit.TestCase,

    members :
    {
        testNumber : function(){
            var constraint = new validator.constraints.MaxNumber.validate("",7);
            constraint(7);
        },
        
        testNumberDecimalNotAcepted : function(){
            var constraint = new validator.constraints.MaxNumber.validate("mal",8,false);
            this.assertException(function(){
                constraint(7.5);
            },Error,"Validation Error: mal");
        },
        
        testNotNumber : function(){
            var constraint = new validator.constraints.MaxNumber.validate("mal",9);
            this.assertException(function(){
                constraint("7");
            },Error,"Validation Error: mal");
        },
        
        testDecimalNumberAcepted : function(){
            var constraint = new validator.constraints.MaxNumber.validate("",8,true);
            constraint(7.5);
        },
        
        testNotDecimalNumber : function(){
            var constraint = new validator.constraints.MaxNumber.validate("mal",8,true);
            this.assertException(function(){
                constraint("7.5");
            },Error,"Validation Error: mal");
        },
        
        testMaxNumber : function(){
            var constraint = new validator.constraints.MaxNumber.validate("",5);
            this.assertException(function(){
                constraint(7);
            },Error,"Validation Error: El n"+'\u00fa'+"mero debe ser menor o igual que 5");
        },
        
        testMaxDecimalNumber : function(){
            var constraint = new validator.constraints.MaxNumber.validate("",5.3,true);
            this.assertException(function(){
                constraint(5.4);
            },Error,"Validation Error: El n"+'\u00fa'+"mero debe ser menor o igual que 5.3");
        }
        
    }
});