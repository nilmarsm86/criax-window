qx.Class.define("validator.test.unit.constraints.MaxLengthTest",
{
    extend :qx.dev.unit.TestCase,

    members :
    {
        testLength : function(){
            var constraint = new validator.constraints.MaxLength.validate("",7);
            constraint("nilmar1");
        },
        
        testUpLength : function(){
            var constraint = new validator.constraints.MaxLength.validate("mal",3);
            this.assertException(function(){
                constraint("user@subdomain");
            },Error,"Validation Error: mal");
        },
        
        testDownLength : function(){
            var constraint = new validator.constraints.MaxLength.validate("",13);
            constraint("user");            
        }//,
        
        /*testLengthString : function(){
            var constraint = new validator.constraints.MaxLength.validate("","s");
            this.assertException(function(){
                constraint("user");
            },Error,"Validation Error: La longitud debe contener solo n"+'\u00fa'+"meros enteros!");
        }*/
        
            
    }
});