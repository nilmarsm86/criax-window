qx.Class.define("validator.test.unit.constraints.IsNotNullTest",
{
    extend :qx.dev.unit.TestCase,

    members :
    {
        testIsNull : function(){
            var isNotNullValidator = validator.constraints.IsNotNull.validate();
            this.assertException(function(){
                isNotNullValidator(null);
            },Error,"Validation Error: No debe ser nulo!");
        },
        
        testIsNotNull : function(){
            var isNotNullValidator = validator.constraints.IsNotNull.validate();
            isNotNullValidator("null");
        },
        
        testUndefined : function(){
            var isNotNullValidator = validator.constraints.IsNotNull.validate();
            isNotNullValidator(undefined);
        }
    }
});