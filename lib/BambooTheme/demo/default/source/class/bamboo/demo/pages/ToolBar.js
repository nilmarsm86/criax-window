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
 * Demonstrates qx.ui.(...):
 *
 * menu.Button
 * menu.CheckBox
 * menu.Menu
 * menu.MenuSlideBar
 * menu.RadioButton
 * menu.Separator
 * menubar.Button
 * menubar.MenuBar
 * toolbar.Button
 * toolbar.CheckBox
 * toolbar.MenuButton
 * toolbar.Part
 * toolbar.PartContainer
 * toolbar.RadioButton
 * toolbar.Separator
 * toolbar.SplitButton
 * toolbar.ToolBar
 *
 */

qx.Class.define("bamboo.demo.pages.ToolBar",
{
  extend: bamboo.demo.pages.AbstractPage,

  construct: function()
  {
    this.base(arguments);

    this.initWidgets();
  },

  members:
  {
    initWidgets: function()
    {
      var label;

      // Toolbar
      label = new qx.ui.basic.Label("ToolBar & Menu");
      this.add(label, {left: 0, top: 0});
      this.add(this.getToolBar(), {left: 0, top: 20});

      // Menu (with slidebar)
      this.add(this.getMenuWithSlideBar(), {left: 0, top: 70});

      // MenuBar
      label = new qx.ui.basic.Label("MenuBar & Menu");
      this.add(label, {left: 0, top: 210});
      this.add(this.getMenuBar(), {left: 0, top: 230});

      // Toolbar for exclude
      label = new qx.ui.basic.Label("ToolBar Part (Button, CheckBox, RadioButton, MenuButton)");
      this.add(label, {left: 0, top: 280});
      this.add(this.getToolBarExclude(), {left: 0, top: 300});

      // Context menu
      label = new qx.ui.basic.Label("Context Menu (Right click the widget)");
      this.add(label, {left: 0, top: 370});
      this.add(this.getContextMenuWidget(), {left: 0, top: 390});

    },
    

    getToolBar : function()
    {
      var frame = new qx.ui.container.Composite(new qx.ui.layout.Grow);

      // ToolBar
      var toolbar = new qx.ui.toolbar.ToolBar;
      toolbar.setWidth(200);
      frame.add(toolbar);

      // Part
      var firstPart = new qx.ui.toolbar.Part;
      var secondPart = new qx.ui.toolbar.Part;

      toolbar.add(firstPart);
      toolbar.add(secondPart);

      // SplitButton
      var splitButton = new bamboo.demo.toolbar.SplitButton("Toolbar SplitButton", "bamboo/demo/icon/16/arrow-left.png", this.getSplitButtonMenu(), null, "bamboo/demo/icon/16/arrow-left-focused.png");
      splitButton.setToolTip(new qx.ui.tooltip.ToolTip("Toolbar SplitButton"));
      this._widgets.push(splitButton);

      // Button
      var button = this.button = new bamboo.demo.toolbar.Button("Toolbar Button", "bamboo/demo/icon/16/text.png", "bamboo/demo/icon/16/text-focused.png");
      button.setToolTip(new qx.ui.tooltip.ToolTip("Toolbar Button"));
      this._widgets.push(button);

      // CheckBox
      var checkBox = this.checkBox = new bamboo.demo.toolbar.CheckBox("Toggle", "bamboo/demo/icon/16/underline.png", "bamboo/demo/icon/16/underline-focused.png");
      checkBox.setToolTip(new qx.ui.tooltip.ToolTip("Toolbar CheckBox"));
      this._widgets.push(checkBox);

      // RadioButton
      var radioButton1 = this.radioButton1 = new bamboo.demo.toolbar.RadioButton("Left", "bamboo/demo/icon/16/align-left.png", "bamboo/demo/icon/16/align-left-focused.png");
      radioButton1.setToolTip(new qx.ui.tooltip.ToolTip("Toolbar RadioButton"));
      this._widgets.push(radioButton1);

      var radioButton2 = this.radioButton2 = new bamboo.demo.toolbar.RadioButton("Center", "bamboo/demo/icon/16/align-center.png", "bamboo/demo/icon/16/align-center-focused.png");
      radioButton2.setToolTip(new qx.ui.tooltip.ToolTip("Toolbar RadioButton"));
      this._widgets.push(radioButton2);

      var radioGroup = new qx.ui.form.RadioGroup(radioButton1, radioButton2);
      radioGroup.setAllowEmptySelection(true);

      firstPart.add(splitButton);
      firstPart.addSeparator();
      firstPart.add(button);
      firstPart.add(checkBox);
      firstPart.add(radioButton1);
      firstPart.add(radioButton2);
      firstPart.setShow("icon");

      // MenuButton
      var menuButton = new qx.ui.toolbar.MenuButton("Toolbar MenuButton");
      this._widgets.push(menuButton);
      menuButton.setMenu(this.getButtonMenu());
      secondPart.add(menuButton);

      return toolbar;
    },
    

    getSplitButtonMenu : function()
    {
      var menu = new qx.ui.menu.Menu;

      //
      // Menu
      //

      // MenuButton
      var button1 = new qx.ui.menu.Button("Menu MenuButton");
      this._widgets.push(button1);

      menu.add(button1);

      return menu;
    },
    

    getButtonMenu : function()
    {
      var menu = new qx.ui.menu.Menu;

      //
      // Menu
      //

      // MenuButton
      var button = new qx.ui.menu.Button("Menu MenuButton", "bamboo/demo/icon/16/text.png");
      this._widgets.push(button);

      // CheckBox
      var checkBox = new qx.ui.menu.CheckBox("Menu MenuCheckBox");
      this._widgets.push(checkBox);

      // CheckBox (checked)
      var checkBoxChecked = new qx.ui.menu.CheckBox("Menu MenuCheckBox").set({value: true});
      this._widgets.push(checkBoxChecked);

      // RadioButton
      var radioButton = new qx.ui.menu.RadioButton("Menu RadioButton");
      this._widgets.push(radioButton);

      // RadioButton (active)
      var radioButtonActive = new qx.ui.menu.RadioButton("Menu RadioButton").set({value: true});
      this._widgets.push(radioButtonActive);

      menu.add(button);
      menu.add(checkBox);
      menu.add(checkBoxChecked);
      menu.add(radioButton);
      menu.add(radioButtonActive);

      return menu;
    },
    

    getMenuBar : function()
    {
      var menubar = new qx.ui.menubar.MenuBar;

      var button;

      for (var i=0; i<3; i++) {
        button = new qx.ui.menubar.Button("Menubar Button", null, this.getButtonMenu());
        this._widgets.push(button);
        menubar.add(button);
      }

      return menubar;
    },


    getToolBarExclude : function()
    {
      var toolbar = new qx.ui.toolbar.ToolBar;

      var classes = [
        qx.ui.toolbar.Button,
        qx.ui.toolbar.CheckBox,
        qx.ui.toolbar.RadioButton,
        qx.ui.toolbar.MenuButton
      ];
      for (var j=0; j < classes.length; j++) {
        var part = new qx.ui.toolbar.Part();
        for (var i=0; i < 5; i++) {
          var button = new classes[j](i + "");
          this._widgets.push(button);
          button.canHide = i % 2 == 0;
          part.add(button);
        };
        toolbar.add(part);
      };

      var radioGroup = new qx.ui.form.RadioGroup();
      radioGroup.setAllowEmptySelection(true);

      var radioButtons = toolbar.getChildren()[2].getChildren();
      for (var i=0; i < radioButtons.length; i++) {
        radioGroup.add(radioButtons[i]);
      };

      return toolbar;
    },


    // Menu (with slidebar)
    //
    // (Evil hacks below)
    getMenuWithSlideBar : function() {
      var label = new qx.ui.basic.Label("Menu (with slidebar)");

      var subContainer = new qx.ui.container.Composite(new qx.ui.layout.Canvas());
      subContainer.setHeight(120);
      var buttonMenu = this.getButtonMenu();
      this._widgets.push(buttonMenu);
      subContainer.add(label, {left: 0, top: 0});
      subContainer.add(buttonMenu, {left: 0, top: 0});

      label.addListener("appear", function() {
          buttonMenu.openAtPoint({left: 0, top: 20});
      });

      // Brute force. Do not hide menu on click.
      buttonMenu.hide = buttonMenu.exclude = function() {};

      return subContainer;
    },


    /**
     * @lint ignoreDeprecated(alert)
     */
    getContextMenuWidget : function() {
      var w = new qx.ui.core.Widget();
      w.setAppearance("textfield");
      w.setMinHeight(100);
      w.setWidth(200);
      this._widgets.push(w);

      var menu = new qx.ui.menu.Menu();
      w.setContextMenu(menu);

      var helpButton = new qx.ui.menu.Button("Help");
      helpButton.addListener("execute", function() {
        alert("Help!");
      });
      menu.add(helpButton);

      return w;
    }
    
  }
});
