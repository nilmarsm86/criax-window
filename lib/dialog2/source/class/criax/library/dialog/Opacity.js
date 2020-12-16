/* ************************************************************************

   CRIAX-SDK - Develop desktop applications with web technology

   https://developer.firefoxmania.uci.cu/category/criax-sdk/

   Copyright:
     2012-2017 CRIAX-SDK

   License:
     MPL: https://www.mozilla.org/en-US/MPL/2.0/
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Nilmar Sanchez Muguercia (@nilmarsm86)

************************************************************************ */

/**
 * Opacity layer for application
 */
qx.Class.define("criax.library.dialog.Opacity",
{
    extend : dialog.Dialog,

    construct : function()
    {
        this.message = "";
        this.base(arguments);
    },

    members :
    {
        /**
         * Create the main content of the widget
         */
        _createWidgetContent : function()
        {
        },

        /**
         * Show the layer
         *
         * @param color {String} color of background layer
         */
        show : function(color)
        {
            var color = color || this.getBlockerColor();
            if (this.isUseBlocker()){
                var root = this.getApplicationRoot();
                root.setBlockerOpacity(this.getBlockerOpacity());
                root.setBlockerColor(color);
                root.blockContent(this.getZIndex() - 1);
            }
            this.setVisibility("visible");
            qx.ui.core.FocusHandler.getInstance().getActiveWidget();
            this.focus();
        }
    }
});