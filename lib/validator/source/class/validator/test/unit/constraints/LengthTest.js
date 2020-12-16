qx.Class.define("validator.test.unit.constraints.LengthTest",
{
    extend :qx.dev.unit.TestCase,

    members :
    {
        testLength : function(){
            var constraint = new validator.constraints.Length.validate("",7);
            constraint("nilmar1");
        },
        
        testUpLength : function(){
            var constraint = new validator.constraints.Length.validate("",3);
            this.assertException(function(){
                constraint("user@subdomain");
            },Error,"Validation Error: Debe tener exactamente 3 caracteres!");
        },
        
        testDownLength : function(){
            var constraint = new validator.constraints.Length.validate("mal",13);
            this.assertException(function(){
                constraint("user");
            },Error,"Validation Error: mal");
        }//,
        
        /*testLengthString : function(){
            var constraint = new validator.constraints.Length.validate("","s");
            this.assertException(function(){
                constraint("user");
            },Error,"Validation Error: La longitud debe contener solo n"+'\u00fa'+"meros enteros!");
        }*/
        
            
    }
});