qx.Class.define("validator.test.unit.constraints.DateTest",
{
    extend :qx.dev.unit.TestCase,

    members :
    {
        testDate : function(){
            var validation = validator.constraints.Date.validate();
            validation(new Date());
        },
        
        testDateConstructor : function(){            
            var validation = validator.constraints.Date.validate("es un string");            
            this.assertException(function(){
                validation(Date());
            },Error,"Validation Error: es un string");
        }
    }
});