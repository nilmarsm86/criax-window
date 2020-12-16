/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2008 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Martin Wittemann (martinwittemann)

************************************************************************ */

/**
 * @asset(qx/icon/Tango/16/places/user-trash.png)
 * @asset(source/Modern/radio-checked.png)
 * @asset(source/Modern/radio.png)
 */
qx.Class.define("inspector.console.View",
{
  extend : inspector.components.AbstractView,

  /**
   * Creates a new instance of a view.
   */
  construct : function(inspectorModel)
  {
    this.base(arguments);
    this._model = inspectorModel;

    // toolbar buttons
    this._clearButton = new qx.ui.toolbar.Button(null, "qx/icon/Tango/16/places/user-trash.png");
    this._clearButton.setMarginLeft(5);
    this._toolbar.add(this._clearButton);
    this._clearButton.addListener("execute", function()
    {
      this._findField.setValue("");
      this._stack.getSelection()[0].clear();
    }, this);

    // separator
    this._toolbar.add(new qx.ui.toolbar.Separator());
    this._consoleButton = new qx.ui.toolbar.RadioButton("Console", "source/Modern/radio-checked.png");
    this._consoleButton.setAppearance(null);
    this._consoleButton.addListener("changeValue", function(event) {
      this._consoleButton.setIcon("source/Modern/" + ((event.getData()) ? "radio-checked" : "radio") + ".png");
    }, this);
    this._toolbar.add(this._consoleButton);
    this._domButton = new qx.ui.toolbar.RadioButton("DOM", "source/Modern/radio.png");
    this._domButton.setAppearance(null);
    this._domButton.addListener("changeValue", function(event) {
      this._domButton.setIcon("source/Modern/" + ((event.getData()) ? "radio-checked" : "radio") + ".png");
    }, this);
    this._toolbar.add(this._domButton);
    this._toolbar.addSeparator();

    // search text field
    this._findField = new qx.ui.form.TextField();
    this._findField.setPlaceholder("Filter...");
    this._findField.setLiveUpdate(true);
    this._findField.setMarginRight(5);
    this._toolbar.add(this._findField, {
      flex : 1
    });
    this._findField.addListener("changeValue", function(e)
    {
      //PARA LAS VARIABLES QUE COMIENZAN CON SIMBOLO $
      var searchTerm = e.getData();
      if (searchTerm == "$") {
        searchTerm = "\\$";
      }
      searchTerm = searchTerm.replace('$$', '\\$\\$');
      this._stack.getSelection()[0].filter(searchTerm);
    }, this);

    // the stack
    this._stack = new qx.ui.container.Stack();
    this.add(this._stack, {
      flex : 1
    });

    // console view
    this._consoleView = new inspector.console.ConsoleView(this);
    this._stack.add(this._consoleView);

    // dom view
    this._domView = new inspector.console.DomView(this);
    this._stack.add(this._domView);

    // radio group for switching views
    var radioGround = new qx.ui.form.RadioGroup(this._consoleButton, this._domButton);
    radioGround.addListener("changeSelection", function(e)
    {
      // reset the filter field
      this._findField.setValue("");
      if (radioGround.getSelection()[0] == this._consoleButton) {
        this._stack.setSelection([this._consoleView]);
      } else if (radioGround.getSelection()[0] == this._domButton) {
        this._stack.setSelection([this._domView]);
      } else {
        this._consoleButton.setValue(true);
      }

    }, this);

    // init appender
    this.__listenerId = this._model.addListener("changeApplication", function(e)
    {
      var iFrameWindow = this._model.getWindow();
      if (iFrameWindow == null) {
        return;
      }
      inspector.console.Appender.consoleView = this._consoleView;
      iFrameWindow.qx.log.Logger.unregister(inspector.console.Appender);
      iFrameWindow.qx.log.Logger.register(inspector.console.Appender);
    }, this);

    // sync inspected object to the dom tap
    this._model.addListener("changeInspected", function(e)
    {
      var o = e.getData();
      var hash = o && o.toHashCode ? o.toHashCode() : "???";
      this._domView.setObject(o, "Selection [" + hash + "]");
    }, this);
  },
  members :
  {
    _model : null,
    __listenerId : null,
    escapeHtml : function(value)
    {
      function replaceChars(ch)
      {
        switch (ch)
        {
          case "<":
            return "&lt;";
          case ">":
            return "&gt;";
          case "&":
            return "&amp;";
          case "'":
            return "&#39;";
          case '"':
            return "&quot;";
        }
        return "?";
      }
      return String(value).replace(/[<>&"']/g, replaceChars);
    },
    inspectObjectByInternalId : function(id)
    {
      // get the object and the name
      var o = this._consoleView.getObjectById(id);

      // inspect the object
      this.inspectObject(o);
    },
    inspectObjectByDomSelecet : function(index, key)
    {
      // update the object in the domview
      this._domView.setObjectByIndex(index, key);

      // reset the search field
      this._findField.setValue("");
    },
    inspectObject : function(inputObject)
    {
      // give the object to the dom view
      this._domView.setObject(inputObject.object, inputObject.name);

      // show the dom view
      this._domButton.setValue(true);
    },
    goToDefaultView : function()
    {
      // go to console view
      this._consoleButton.setValue(true);

      // clear the dom view
      this._domView.clear();
    }
  },
  destruct : function()
  {
    this._model.removeListenerById(this.__listenerId);
    this._model = null;
    this._disposeObjects("_clearButton", "_consoleButton", "_domButton", "_findField", "_stack", "_consoleView", "_domView");
  }
});
