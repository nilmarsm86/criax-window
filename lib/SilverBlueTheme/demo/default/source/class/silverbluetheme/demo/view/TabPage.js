/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2010 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php

   Authors:
     * Tristan Koch (tristankoch)

************************************************************************ */

/**
 *
 * @asset(silverbluetheme.demo/loader.gif)
 * @use(silverbluetheme.demo.pages.Tree)
 * @use(silverbluetheme.demo.pages.List)
 * @use(silverbluetheme.demo.pages.Form)
 * @use(silverbluetheme.demo.pages.ToolBar)
 * @use(silverbluetheme.demo.pages.Window)
 * @use(silverbluetheme.demo.pages.Tab)
 * @use(silverbluetheme.demo.pages.Embed)
 * @use(silverbluetheme.demo.pages.EmbedFrame)
 * @use(silverbluetheme.demo.pages.Misc)
 */

qx.Class.define("silverbluetheme.demo.view.TabPage",
{
  extend: qx.ui.tabview.Page,

  include: silverbluetheme.demo.MControls,

  construct: function(label, classname, controls)
  {
    this.base(arguments);

    this.setLabel(label);
    this.setLayout(new qx.ui.layout.VBox(10));

    // Load content of tab on "appear"
    this.addListenerOnce("appear", function() {

      // Require part
      var part = classname.split(".").pop().toLowerCase();

      qx.io.PartLoader.require([part], function() {
        
        // Finally, instantiate class
        var clazz = qx.Class.getByName(classname);
        var pageContent = new clazz();

        // Hotfix for browser bug [#BUG #4666]
        if (qx.core.Environment.get("browser.name") == "opera" &&
            qx.core.Environment.get("browser.version") == "11.0") {
          var scroll = qx.core.Init.getApplication().getScroll().getChildControl("pane").getContentElement().getDomElement();
          pageContent.addListenerOnce("appear", function() {
            if (scroll) {
              scroll.scrollTop = 0;
            }
          });
        }
        
        // Init controls for widgets of page
        this.initControls(pageContent.getWidgets(), controls);
        
        var pageContentScroller = new qx.ui.container.Scroll();
        pageContentScroller.add(pageContent);
        
        // Add to page
        this.add(pageContentScroller, {flex: 1});

        // Exclude loading indicator
        loading.setVisibility("excluded");

      }, this);
    }, this);

    // Show centered loading indicator
    var loading = new qx.ui.container.Composite(new qx.ui.layout.VBox(8).set({
      alignX: "center",
      alignY: "middle"
    }));

    var inner = new silverbluetheme.demo.Separator(80);

    loading.add(new qx.ui.core.Spacer(), {flex: 1});
    loading.add(new qx.ui.basic.Label("Loading page..."));
    loading.add(inner);
    loading.add(new qx.ui.core.Spacer(), {flex: 1});

    this.add(loading, {flex: 1});
  }

});
