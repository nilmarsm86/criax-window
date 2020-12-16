/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/**
 * This is the main application class of your custom application "template30"
 *
 * @asset(criax/chromeless/*)
 */
qx.Class.define("criax.chromeless.Application",
{
    extend : qx.application.Standalone,

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */
    members :
    {
        /**
         * This method contains the initial application code and gets called
         * during startup of the application
         *
         * @lint ignoreDeprecated(alert)
         */
        main : function()
        {
            // Call super class
            this.base(arguments);

            // Enable logging in debug variant
            if (qx.core.Environment.get("qx.debug"))
            {
                // support native logging capabilities, e.g. Firebug for Firefox

                //qx.log.appender.Native;

                // support additional cross-browser console. Press F7 to toggle visibility
                qx.log.appender.Console;

                //error console appender
                criax.chromeless.log.appender.ErrorConsole;

                //console appender
                criax.chromeless.log.appender.Dummper
            }

            /*
            -------------------------------------------------------------------------
              Below is your actual application code...
            -------------------------------------------------------------------------
            */

            var that = this;

            var os = criax.chromeless.Component.require("resource://gre/modules/osfile.jsm", "OS");
            /*var promise = os.File.getCurrentDirectory();
            promise.then(function onFulfilled(msg){
                that.debug(msg);
            }).catch(function onRejected(error){
                that.debug(error);
            });*/
            this.debug(window.location.href);




        }




    }
});
