qx.Class.define("validator.test.unit.constraints.Ipv4Test",
{
    extend :qx.dev.unit.TestCase,

    members :
    {
        testIp : function(){
            var constraint = new validator.constraints.Ipv4.validate("");
            constraint("10.54.17.31");
        },
        
        testLimitIp : function(){
            var constraint = new validator.constraints.Ipv4.validate("");
            constraint("255.255.255.254");
        },
        
        testMinimunIp : function(){
            var constraint = new validator.constraints.Ipv4.validate("mal");
            constraint("0.0.0.0");
        },
        
        testNotIp1 : function(){
            var constraint = new validator.constraints.Ipv4.validate("mal");
            this.assertException(function(){
                constraint("256.0.0.0");
            },Error,"Validation Error: mal");
        },
        
        testNotIp2 : function(){
            var constraint = new validator.constraints.Ipv4.validate("mal");
            this.assertException(function(){
                constraint("0.256.0.0");
            },Error,"Validation Error: mal");
        },
        
        testNotIp3 : function(){
            var constraint = new validator.constraints.Ipv4.validate("mal");
            this.assertException(function(){
                constraint("0.0.256.0");
            },Error,"Validation Error: mal");
        },
        
        testNotIp4 : function(){
            var constraint = new validator.constraints.Ipv4.validate("mal");
            this.assertException(function(){
                constraint("0.0.0.255");
            },Error,"Validation Error: mal");
        },
        
        testIncompliteIpv4 : function(){
            var constraint = new validator.constraints.Ipv4.validate("mal");
            this.assertException(function(){
                constraint("0.0.4");
            },Error,"Validation Error: mal");
        }
        
            
    }
});