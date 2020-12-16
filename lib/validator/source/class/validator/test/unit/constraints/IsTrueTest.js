qx.Class.define("validator.test.unit.constraints.IsTrueTest",
{
    extend :qx.dev.unit.TestCase,

    members :
    {
        testIsTrue : function(){
            var validation = validator.constraints.IsTrue.validate();
            validation(true);            
        },
        
        testIsFalse : function(){
            var validation = validator.constraints.IsTrue.validate();
            this.assertException(function(){
                validation(false);
            },Error,"Validation Error: Debe ser verdadero!");
        },
        
        testConvertToFalseUndefined : function(){
            var validation = validator.constraints.IsTrue.validate("Debe ser verdadero!");
            this.assertException(function(){
                validation(undefined);
            },Error,"Validation Error: Debe ser verdadero!");
        },
        
        testConvertToFalseEmptyString : function(){
            var validation = validator.constraints.IsTrue.validate("Debe ser verdadero!");
            this.assertException(function(){
                validation("");
            },Error,"Validation Error: Debe ser verdadero!");
        },
        
        testConvertToFalseCero : function(){
            var validation = validator.constraints.IsTrue.validate("Debe ser verdadero!");
            this.assertException(function(){
                validation(0);
            },Error,"Validation Error: Debe ser verdadero!");
        },
        
        testConvertToFalseNull : function(){
            var validation = validator.constraints.IsTrue.validate("Debe ser verdadero!");
            this.assertException(function(){
                validation(null);
            },Error,"Validation Error: Debe ser verdadero!");
        }
    }
});