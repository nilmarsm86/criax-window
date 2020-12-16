qx.Class.define("validator.test.unit.constraints.IsNullTest",
{
    extend :qx.dev.unit.TestCase,

    members :
    {
        testIsNull : function(){
            var validation = validator.constraints.IsNull.validate();
            validation(null);            
        },
        
        testIsNotNull : function(){
            var validation = validator.constraints.IsNull.validate();
            this.assertException(function(){
                validation("null");
            },Error,"Validation Error: Debe ser nulo!");
        },
        
        testIsUndefined : function(){
            var validation = validator.constraints.IsNull.validate();
            this.assertException(function(){
                validation(undefined);
            },Error,"Validation Error: Debe ser nulo!");
        },
        
        testUndefinedVar : function(){
            var name;
            var validation = validator.constraints.IsNull.validate();
            this.assertException(function(){
                validation(name);
            },Error,"Validation Error: Debe ser nulo!");
        },
        
        testUndefinedObject : function(){
            var persona = {};
            var validation = validator.constraints.IsNull.validate();
            this.assertException(function(){
                validation(persona.name);
            },Error,"Validation Error: Debe ser nulo!");
        },
        
        testUndefinedFunctionEmpty : function(){
            var f = function(){};
            var validation = validator.constraints.IsNull.validate();
            this.assertException(function(){
                validation(f());
            },Error,"Validation Error: Debe ser nulo!");
        },
        
        testUndefinedFunction : function(){
            var f = function(){
                return "un valor";
            };
            var validation = validator.constraints.IsNull.validate();
            this.assertException(function(){
                validation(f());
            },Error,"Validation Error: Debe ser nulo!");
        }
    }
});