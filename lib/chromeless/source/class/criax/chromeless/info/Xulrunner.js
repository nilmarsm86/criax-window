/**
 *  You can get application-specific information for XULRunner
 *
 * @class Xulrunner
 * @extends criax.chromeless.Modules
 * @author Nilmar Sanchez Muguercia
 * @namespace criax.chromeless.info
 * @copyrigth
 * @license
 * @version 2.0.0
 *
 */
qx.Class.define("criax.chromeless.info.Xulrunner",
{
    extend : criax.chromeless.Modules,

    /**
     * @property
     */
    properties :
    {

    },

    /**
     * metodo de inicializacion de la clase
     *
     * @constructor
     * @public
     *
     */
    construct : function()
    {
        this.require("resource://gre/modules/Services.jsm", "Services");
        this._module = this._module.appinfo;
    },

    /**
      * @method
      */
    members :
    {
        /**
         *  Returns the build number of XULRunner. For example, 20140512001013.
         *
         * @method getBuildID
         * @public
         * @return {String}
         *
         */
        getBuildID : function()
        {
            return this._module.platformBuildID;
        },

        /**
         *  Returns the version of XULRunner. For example, 27.0.1.
         *
         * @method getVersion
         * @public
         * @return {String}
         *
         */
        getVersion : function()
        {
            return this._module.platformVersion;
        },

        /**
         *  Returns the directory containing the XULRunner libraries
         *
         * @method getLibrariesPath
         * @public
         * @return {String}
         *
         */

        getLibrariesPath : function(){
            var module = criax.chromeless.Component.require("resource://gre/modules/osfile.jsm", "OS");
            return module.Constants.Path.libDir;
        }
    }
});
