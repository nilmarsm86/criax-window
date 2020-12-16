qx.Class.define("validator.test.unit.constraints.HttpTest",
{
    extend :qx.dev.unit.TestCase,

    members :
    {
        testHttp : function(){
            var constraint = new validator.constraints.Http.validate("");
            constraint("http://www.user.subdomain.domain.cu");
        },
        
        testHttps : function(){
            var constraint = new validator.constraints.Http.validate("");
            constraint("https://www.user.subdomain.domain.cu");
        },
        
        testNotHttp : function(){
            var constraint = new validator.constraints.Http.validate("mal");
            this.assertException(function(){
                constraint("fttp://user.com");
            },Error,"Validation Error: mal");
        }
        
            
    }
});