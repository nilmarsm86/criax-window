qx.Class.define("validator.test.unit.constraints.FtpTest",
{
    extend :qx.dev.unit.TestCase,

    members :
    {
        testFtp : function(){
            var constraint = new validator.constraints.Ftp.validate("");
            constraint("ftp://user.subdomain.domain.cu");
        },
        
        testFtps : function(){
            var constraint = new validator.constraints.Ftp.validate("");
            constraint("ftps://user.subdomain.domain.cu");
        },
        
        testNotFtp : function(){
            var constraint = new validator.constraints.Ftp.validate("mal");
            this.assertException(function(){
                constraint("http://user.com");
            },Error,"Validation Error: mal");
        }
        
            
    }
});