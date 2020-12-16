qx.Class.define("validator.test.unit.constraints.MinLengthTest",
{
    extend :qx.dev.unit.TestCase,

    members :
    {
        testLength : function(){
            var constraint = new validator.constraints.MinLength.validate("",7);
            constraint("nilmar1986");
        },
        
        testUpLength : function(){
            var constraint = new validator.constraints.MinLength.validate("mal",3);
            constraint("user@subdomain");
        },
        
        testDownLength : function(){
            var constraint = new validator.constraints.MinLength.validate("mal",13);
            this.assertException(function(){
                constraint("user");
            },Error,"Validation Error: mal");
                        
        }//,
        
        /*testLengthString : function(){
            var constraint = new validator.constraints.MinLength.validate("","s");
            this.assertException(function(){
                constraint("user");
            },Error,"Validation Error: La longitud debe contener solo n"+'\u00fa'+"meros enteros!");
        }*/
        
            
    }
});