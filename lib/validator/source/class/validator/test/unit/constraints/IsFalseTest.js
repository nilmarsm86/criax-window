qx.Class.define("validator.test.unit.constraints.IsFalseTest",
{
    extend :qx.dev.unit.TestCase,

    members :
    {
        testIsFalse : function(){
            var validation = validator.constraints.IsFalse.validate();
            validation(false);            
        },
        
        testIsTrue : function(){
            var validation = validator.constraints.IsFalse.validate();
            this.assertException(function(){
                validation(true);
            },Error,"Validation Error: Debe ser falso!");
        },
        
        testConvertToFalseUndefined : function(){
            var validation = validator.constraints.IsFalse.validate("Debe ser falso!");
            this.assertException(function(){
                validation(undefined);
            },Error,"Validation Error: Debe ser falso!");
        },
        
        testConvertToFalseEmptyString : function(){
            var validation = validator.constraints.IsFalse.validate("Debe ser falso!");
            this.assertException(function(){
                validation("");
            },Error,"Validation Error: Debe ser falso!");  
        },
        
        testConvertToFalseCero : function(){
            var validation = validator.constraints.IsFalse.validate("Debe ser falso!");
            this.assertException(function(){
                validation(0);
            },Error,"Validation Error: Debe ser falso!");          
        },
        
        testConvertToFalseNull : function(){
            var validation = validator.constraints.IsFalse.validate("Debe ser falso!");
            this.assertException(function(){
                validation(null);
            },Error,"Validation Error: Debe ser falso!");          
        }
    }
});