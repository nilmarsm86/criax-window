qx.Class.define("criax.chromeless.test.info.ApplicationTest",
{
    extend : qx.dev.unit.TestCase,
    properties :
    {
        __application :
        {

        }
    },
    members :
    {
        setUp : function()
        {
            this.__application = new criax.chromeless.info.Application();
        },
        testGetBuildID : function()
        {
            this.assertEquals("20170824172000", this.__application.getBuildID());
        },
        testGetId : function()
        {
            this.assertEquals("nilmar@isla.paradiso.net", this.__application.getId());
        },
        testGetName : function()
        {
            this.assertEquals("chromeless", this.__application.getName());
        },
        testGetVendor : function()
        {
            this.assertEquals("criax", this.__application.getVendor());
        },
        testGetVersion : function()
        {
            this.assertEquals("2.0.0", this.__application.getVersion());
        }
    }
});
