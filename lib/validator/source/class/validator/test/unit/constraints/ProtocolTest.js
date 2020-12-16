qx.Class.define("validator.test.unit.constraints.ProtocolTest",
{
    extend :qx.dev.unit.TestCase,

    members :
    {
        testFtp : function(){
            var constraint = new validator.constraints.Protocol.validate("","ftp");
            constraint("ftp://user.subdomain.domain.cu");
        },
        
        testMysqlPort : function(){
            var constraint = new validator.constraints.Protocol.validate("","mysql");
            constraint("mysql://10.54.17.3:9000");
        },
        
        testNotProtocol : function(){
            var constraint = new validator.constraints.Protocol.validate("mal","http");
            this.assertException(function(){
                constraint("www.google.com.cu");
            },Error,"Validation Error: mal");
        }
        
            
    }
});