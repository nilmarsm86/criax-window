qx.Class.define("validator.test.unit.constraints.PatternTest",
{
    extend :qx.dev.unit.TestCase,

    members :
    {
        testPattern : function(){
            var constraint = new validator.constraints.Pattern.validate("mal", /^([a-b]{1,})$/);
            constraint("abb");
        },
        
        testBadPattern : function(){
            var constraint = new validator.constraints.Pattern.validate("mal", /^([0-9]{1,})$/);
            this.assertException(function(){
                constraint("abc");
            },Error,"Validation Error: mal");
        }
            
    }
});