qx.Class.define("validator.test.unit.constraints.ChoiceTest",
{
    extend :qx.dev.unit.TestCase,

    members :
    {
        testInChoice : function(){
            var constraint = new validator.constraints.Choice.validate("",['female','male']);
            constraint("male");
        },
        
        testNotInChoice : function(){
            var constraint = new validator.constraints.Choice.validate("mal",['female','male']);            
            this.assertException(function(){
                constraint('pepe');
            },Error,"Validation Error: mal");
        }        
            
    }
});