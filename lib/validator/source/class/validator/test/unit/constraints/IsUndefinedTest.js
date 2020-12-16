qx.Class.define("validator.test.unit.constraints.IsUndefinedTest",
{
    extend :qx.dev.unit.TestCase,

    members :
    {
        testIsUndefined : function(){
            var validation = validator.constraints.IsUndefined.validate();
            validation(undefined);            
        },
        
        testIsNotUndefined : function(){
            var validation = validator.constraints.IsUndefined.validate();
            this.assertException(function(){
                validation("undefined");
            },Error,"Validation Error: Debe ser indefinido!");
        },
        
        testIsNull : function(){
            var validation = validator.constraints.IsUndefined.validate();
            this.assertException(function(){
                validation(null);
            },Error,"Validation Error: Debe ser indefinido!");
        },
        
        testIsCero : function(){
            var validation = validator.constraints.IsUndefined.validate();
            this.assertException(function(){
                validation(0);
            },Error,"Validation Error: Debe ser indefinido!");
        },
        
        testIsEmpty : function(){
            var validation = validator.constraints.IsUndefined.validate();
            this.assertException(function(){
                validation("");
            },Error,"Validation Error: Debe ser indefinido!");
        },
        
        testUndefinedVar : function(){
            var name;
            var validation = validator.constraints.IsUndefined.validate();
            validation(name);
        },
        
        testUndefinedObject : function(){
            var persona = {};
            var validation = validator.constraints.IsUndefined.validate();
            validation(persona.name);
        },
        
        testUndefinedFunctionEmpty : function(){
            var f = function(){};
            var validation = validator.constraints.IsUndefined.validate();
            validation(f());
        },
        
        testUndefinedFunction : function(){
            var f = function(){
                return "un valor";
            };
            var validation = validator.constraints.IsUndefined.validate();
            this.assertException(function(){
                validation(f());
            },Error,"Validation Error: Debe ser indefinido!");
        }
    }
});