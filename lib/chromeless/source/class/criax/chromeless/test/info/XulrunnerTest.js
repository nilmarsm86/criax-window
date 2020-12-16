qx.Class.define("criax.chromeless.test.info.XulrunnerTest",
{
    extend : qx.dev.unit.TestCase,
    properties :
    {
        __xulrunner :
        {

        }
    },
    members :
    {
        setUp : function()
        {
            this.__xulrunner = new criax.chromeless.info.Xulrunner();
        },
        testGetBuildID : function()
        {
            this.assertEquals("20151014143721", this.__xulrunner.getBuildID());
        },
        testGetVersion : function()
        {
            this.assertEquals("41.0.2", this.__xulrunner.getVersion());
        },

        testgetLibrariesPath : function(){

            this.assertEquals("string",typeof this.__xulrunner.getLibrariesPath());
        }
    }
});
