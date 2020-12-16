/**
 * Import XPCOM component
 *
 * <pre class='javascript'>
 * var component = criax.chromeless.Component.require("module_name", "service_name");
 * </pre>
 *
 * @class Component
 * @static
 * @author Nilmar Sanchez Muguercia
 * @namespace criax.chromeless
 * @copyrigth
 * @license
 * @version 2.0.0
 *
 * @ignore(Components)
 *
 */
qx.Class.define("criax.chromeless.Component",
{
    type : "static",

    /**
     * @method
     */
    statics :
    {
        /**
         * Import a module, if service then only import de modules service
         *
         * @method require
         * @static
         * @param module {String}: modules name
         * @param service {String}: services name
         * @return {Object} Service
         *
         */
        require : function(module, service)
        {
            var component =
            {

            };
            service = service || null;
            Components.utils.import(module, component);
            return (service === null) ? component : component[service];
        }
    }
});
