qx.Class.define("validator.test.unit.constraints.EmailTest",
{
    extend :qx.dev.unit.TestCase,

    members :
    {
        testEmail : function(){
            var constraint = new validator.constraints.Email.validate("");
            constraint("user@subdomain.domain");
        },
        
        testNotEmail : function(){
            var constraint = new validator.constraints.Email.validate("mal");
            this.assertException(function(){
                constraint("user@subdomain");
            },Error,"Validation Error: mal");
        }
        
            
    }
});