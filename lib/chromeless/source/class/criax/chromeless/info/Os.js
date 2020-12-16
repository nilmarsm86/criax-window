/**
 *  Operating System info
 *  AGREGAR LA OPCION DE CONVERTIR ESAS RUTAS A URL CON FILE:///
 *
 * @class Os
 * @extends criax.chromeless.Modules
 * @author Nilmar Sanchez Muguercia
 * @namespace criax.chromeless.info
 * @copyrigth
 * @license
 * @version 2.0.0
 *
 */
qx.Class.define("criax.chromeless.info.Os",
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
        this.require("resource://gre/modules/osfile.jsm", "OS");
    },

    /**
      * @method
      */
    members :
    {
        /**
         *  Returns the type of OS
         *
         * @method getType
         * @public
         * @return {String}
         *
         */
        getType : function()
        {
            var module = criax.chromeless.Component.require("resource://gre/modules/Services.jsm", "Services");
            return module.appinfo.OS;
        },

        /**
         *  Return a promise that get the current directory path
         *  PASAR PAR LA CLASE PATH
         *
         * @method getCurrentDirectory
         * @public
         * @return {Promise}
         *


        getCurrentDirectory : function(){
            return this._module.File.getCurrentDirectory();
        },*/

        /**
         *  Return the desktop path
         *
         * @method getDesktopPath
         * @public
         * @return {String}
         *
         */

        getDesktopPath : function(){
            return this._module.Constants.Path.desktopDir;
        },

        /**
         *  Return the directory containing the user's profile.
         *
         * @method getUserProfilePath
         * @public
         * @return {String}
         *
         */

        getUserProfilePath : function(){
            return this._module.Constants.Path.profileDir;
        },

        /**
         *  Return the system's temp directory
         *
         * @method getTemporalPath
         * @public
         * @return {String}
         *
         */

        getTemporalPath : function(){
            return this._module.Constants.Path.tmpDir;
        },

        /**
         *  Return the user's home directory.
         *
         * @method getUserHomePath
         * @public
         * @return {String}
         *
         */

        getUserHomePath : function(){
            return this._module.Constants.Path.homeDir;
        }




    }
});
