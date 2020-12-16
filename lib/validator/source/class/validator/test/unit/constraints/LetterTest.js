qx.Class.define("validator.test.unit.constraints.LetterTest",
{
    extend :qx.dev.unit.TestCase,

    members :
    {
        testString : function(){
            var constraint = new validator.constraints.Letter.validate("");
            constraint("valor del string");
        },
        
        testNotString : function(){
            var constraint = new validator.constraints.Letter.validate("mal");
            this.assertException(function(){
                constraint(7);
            },Error,"Validation Error: mal");
        },
        
        testStringNumber : function(){
            var constraint = new validator.constraints.Letter.validate();
            this.assertException(function(){
                constraint("7");
            },Error,"Validation Error: Debe contener solo letras!");
        },
        
        testUndefined : function(){
            var constraint = new validator.constraints.Letter.validate();
            this.assertException(function(){
                constraint(undefined);
            },Error,"Validation Error: Debe contener solo letras!");
        },
        
        testStringUndefined : function(){
            var constraint = new validator.constraints.Letter.validate();
            constraint("undefined");
        },
        
        testStringNull : function(){
            var constraint = new validator.constraints.Letter.validate();
            constraint("null");
        }
    }
});