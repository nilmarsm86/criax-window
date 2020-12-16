qx.Class.define("criax.chromeless.test.ComponentTest",
{
    extend : qx.dev.unit.TestCase,
    members :
    {
        testRequireModule : function()
        {
            //00000000000000 yearmonthdayhourminuteseconds
            var component = criax.chromeless.Component.require("resource://gre/modules/Services.jsm", "Services");
            this.assertEquals(14, String(component.appinfo.appBuildID).length);
        }
    }
});
