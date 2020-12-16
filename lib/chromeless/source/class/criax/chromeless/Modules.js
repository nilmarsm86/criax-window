/**
 *  Abstract class of modules
 *
 * @class Modules
 * @abstract
 * @extends qx.core.Object
 * @author Nilmar Sanchez Muguercia
 * @namespace criax.chromeless
 * @copyrigth
 * @license
 * @version 2.0.0
 *
 */
qx.Class.define("criax.chromeless.Modules",
{
    extend : qx.core.Object,
    type : "abstract",

    /**
     * @property
     */
    properties :
    {
        /**
         * module object
         *
         * @name _module
         * @protected
         *
         */
        _module :
        {

        }
    },

    /**
     * @method
     */
    members :
    {
        /**
         * Set module value
         *
         * @method require
         * @public
         * @param module {String}: module name
         *
         */
        require : function(module, service)
        {
            service = service || null;
            this._module = criax.chromeless.Component.require(module, service);
        }
    },

    /**
     *  destructor de la clase
     *
     * @method destruct
     * @public
     * @return {String} separador
     *
     */
    destruct : function()
    {
        this._disposeObjects("_modules");
    }
});
