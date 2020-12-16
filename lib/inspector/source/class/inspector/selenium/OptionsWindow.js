/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2010 1&1 Internet AG, Germany, http://www.1and1.org

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Daniel Wagner (d_wagner)

************************************************************************ */

/**
 * Window used to define settings for SeleniumWindow
 *
 * @asset(qx/icon/Tango/16/actions/dialog-apply.png)
 * @asset(qx/icon/Tango/16/actions/dialog-close.png)
 */
qx.Class.define("inspector.selenium.OptionsWindow",
{
  extend : qx.ui.window.Window,

  /**
   * @param caption {String} Window title
   * @param icon {String} Window icon
   * @param mainWindow {inspector.selenium.View} Reference to the main View
   */
  construct : function(caption, icon, mainWindow)
  {
    this.base(arguments, caption, icon);
    var self = this;
    this.set(
    {
      layout : new qx.ui.layout.VBox(),
      modal : true,
      width : 300,
      height : 70
    });
    var containerTop = new qx.ui.container.Composite(new qx.ui.layout.Grow());
    this.add(containerTop, {
      flex : 1
    });
    var form = new qx.ui.form.Form();
    this.__coreScripts = new qx.ui.form.TextField();
    this.__coreScripts.setToolTipText("URI of a directory containing the contents of a Selenium Core Zip file (seleniumhq.org/download)");
    this.__coreScripts.setRequired(true);
    this.__coreScripts.setPlaceholder("file:///");
    form.add(this.__coreScripts, "Path to Selenium Core:");
    var okButton = new qx.ui.form.Button("OK", "qx/icon/Tango/16/actions/dialog-apply.png");
    okButton.addListener("execute", function() {
      if (form.validate())
      {
        this.setSeleniumScripts(self.__coreScripts.getValue());
        this._optionsWindow.close();
      }
    }, mainWindow);
    form.addButton(okButton);
    var cancelButton = new qx.ui.form.Button("Cancel", "qx/icon/Tango/16/actions/dialog-close.png");
    cancelButton.addListener("execute", function()
    {
      if (this.getSeleniumScripts()) {
        self.__coreScripts.setValue(this.getSeleniumScripts());
      }
      this._optionsWindow.close();
    }, mainWindow);
    form.addButton(cancelButton);
    var renderer = new qx.ui.form.renderer.SinglePlaceholder(form);
    containerTop.add(renderer);

    // bind the seleniumScripts property to the form field
    mainWindow.bind("seleniumScripts", this.__coreScripts, "value");
  },
  members : {
    open : function()
    {
      this.base(arguments);
      var path = window.document.getElementsByTagName('base')[0].href + "selenium-server";
      this.__coreScripts.setValue(path)
      //ESTO ES PARA TODA LA APLICACION
      var root = this.getApplicationRoot();
      root.setBlockerOpacity(0.7);
      root.setBlockerColor("#000");
      var width = qx.bom.Viewport.getWidth() - 325;
      var height = parseInt(qx.bom.Viewport.getHeight() / 3);
      var posHeight = height;
      this.moveTo((width - this.getWidth()) / 2, posHeight + ((height - this.getHeight()) / 2));
    },

    __coreScripts : null
  }
});
