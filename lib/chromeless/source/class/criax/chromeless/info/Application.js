/**
 *  You can get application-specific information for your application
 *  DEVOLVER LA RUTA DE LA APLICACION EN FORMA DE CHROME Y EN FORMA NORMAL
 *  GUIARME POR LA CLASE APPPATH DE LA VERSION VIEJA    
 *
 * @class Application
 * @extends criax.chromeless.Modules
 * @author Nilmar Sanchez Muguercia
 * @namespace criax.chromeless.info
 * @copyrigth
 * @license
 * @version 2.0.0
 *
 */
qx.Class.define("criax.chromeless.info.Application",
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
         *  Returns the value of the BuildID key. For example, 20140320080054.
         *
         * @method getAppBuildID
         * @public
         * @return {String}
         *
         */
        getBuildID : function()
        {
            return this._module.appBuildID;
        },

        /**
         *  Returns the value of the ID key. For example: www.cdsinc.com.
         *
         * @method getId
         * @public
         * @return {String}
         *
         */
        getId : function()
        {
            return this._module.ID;
        },

        /**
         *  Returns the value of the Name key
         *
         * @method getName
         * @public
         * @return {String}
         *
         */
        getName : function()
        {
            return this._module.name;
        },

        /**
         *  Returns the value of the Vendor key. For example: CDS, Inc.
         *
         * @method getVendor
         * @public
         * @return {String}
         *
         */
        getVendor : function()
        {
            return this._module.vendor;
        },

        /**
         *  Returns the value of the Version key. For example: 2.0.0
         *
         * @method getVersion
         * @public
         * @return {String}
         *
         */
        getVersion : function()
        {
            return this._module.version;
        }
    }
});
