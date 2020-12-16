/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/**
 * This is the main application class of your custom application "${Name}".
 *
 * If you have added resources to your app, remove the first '@' in the
 * following line to make use of them.
 * @@asset(${Namespace}/*)
 *
 * @ignore(environment)
 * @ignore(process)
 * @ignore(__RESPONSE__)
 * @ignore(__RESPONSE__.write)
 */
qx.Class.define("${Namespace}.Application",
{
  extend : qx.application.Basic,



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
     */
    main : function()
    {
      /*if (qx.core.Environment.get("runtime.name") == "rhino") {
        qx.log.Logger.register(qx.log.appender.RhinoConsole);
      } else if (qx.core.Environment.get("runtime.name") == "node.js") {
        qx.log.Logger.register(qx.log.appender.NodeConsole);
      }*/
      
      //this.info("Hello ${Namespace}!");
      //print("Hello ${Namespace}!");
      dump("Hello ${Namespace}!\n");
      __RESPONSE__.write("Hello ${Namespace}!");
    }
  }
});