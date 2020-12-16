qx.Class.define("validator.test.unit.constraints.IsNotUndefinedTest",
{
    extend :qx.dev.unit.TestCase,

    members :
    {
        testIsUndefined : function(){
            var validation = validator.constraints.IsNotUndefined.validate();
            this.assertException(function(){
                validation(undefined);
            },Error,"Validation Error: No debe ser indefinido!");            
        },
        
        testIsNotUndefined : function(){
            var validation = validator.constraints.IsNotUndefined.validate();
            validation("undefined");
        },
        
        testIsNull : function(){
            var validation = validator.constraints.IsNotUndefined.validate();
            validation(null);
        },
        
        testIsCero : function(){
            var validation = validator.constraints.IsNotUndefined.validate();
            validation(0);
        },
        
        testIsEmpty : function(){
            var validation = validator.constraints.IsNotUndefined.validate();
            validation("");
        },
        
        testUndefinedVar : function(){
            var name;
            var validation = validator.constraints.IsNotUndefined.validate();
            this.assertException(function(){
                validation(name);
            },Error,"Validation Error: No debe ser indefinido!");
        },
        
        testUndefinedObject : function(){
            var persona = {};
            var validation = validator.constraints.IsNotUndefined.validate();
            this.assertException(function(){
                validation(persona.name);
            },Error,"Validation Error: No debe ser indefinido!");
        },
        
        testUndefinedFunctionEmpty : function(){
            var f = function(){};
            var validation = validator.constraints.IsNotUndefined.validate();
            this.assertException(function(){
                validation(f());
            },Error,"Validation Error: No debe ser indefinido!");
        },
        
        testUndefinedFunction : function(){
            var f = function(){
                return "un valor";
            };
            var validation = validator.constraints.IsNotUndefined.validate();
            validation(f());
        }
    }
});