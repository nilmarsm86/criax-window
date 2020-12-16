qx.Class.define("validator.test.unit.constraints.MoneyTest",
{
    extend :qx.dev.unit.TestCase,

    members :
    {
        testMoney : function(){
            var constraint = new validator.constraints.Money.validate("");
            constraint(125.98);
        },
        
        testNotMoney : function(){
            var constraint = new validator.constraints.Money.validate("mal");
            this.assertException(function(){
                constraint(125.321);
            },Error,"Validation Error: mal");
        },
        
        testCeroMoney : function(){
            var constraint = new validator.constraints.Money.validate("");
            constraint(0.98);
        },
        
        testRealCeroMoney : function(){
            var constraint = new validator.constraints.Money.validate("");
            constraint(0.00);
        },
        
        testValue : function(){
            var constraint = new validator.constraints.Money.validate("");
            constraint(0);
        }
    }
});