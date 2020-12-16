/**
 *  Dummper appender
 *
 * @class ErrorConsole
 * @static
 * @author Nilmar Sanchez Muguercia
 * @namespace criax.chromeless.log.appender
 * @copyrigth
 * @license
 * @version 2.0.0
 *
 */
qx.Class.define("criax.chromeless.log.appender.Dummper",
{
    type : "static",

    /**
      * @static
      */
    statics :
    {
        __log : null,
        __component : null,

        /**
         * Initializes the console
         */
        init : function()
        {
            var applicationInfo = new criax.chromeless.info.Application();
            this.__component = criax.chromeless.Component.require("resource://gre/modules/Log.jsm");
            this.__log = this.__component.Log.repository.getLogger(' ' + applicationInfo.getName());
            this.__log.addAppender(new this.__component.Log.DumpAppender(new this.__component.Log.BasicFormatter()));
            qx.log.Logger.register(this);
        },

        /**
         * Logs a debug message
         *
         * @param logMessage {String} Message to be logged
         */
        debug : function(logMessage)
        {
            this.__log.level = this.__component.Log.Level.Debug;
            dump(logMessage + '\n');
        },

        /**
         * Logs an info message
         *
         * @param logMessage {String} Message to be logged
         */
        info : function(logMessage)
        {
            this.__log.level = this.__component.Log.Level.Information;
            dump(logMessage + '\n');
        },

        /**
         * Logs a warning message
         *
         * @param logMessage {String} Message to be logged
         */
        warn : function(logMessage)
        {
            this.__log.level = this.__component.Log.Level.Warning;
            dump(logMessage + '\n');
        },

        /**
         * Logs an error message
         *
         * @param logMessage {String} Message to be logged
         */
        error : function(logMessage)
        {
            this.__log.level = this.__component.Log.Level.Error;
            dump(logMessage + '\n');
        },

        /**
         * Process a log entry object from qooxdoo's logging system.
         *
         * @param entry {Map} Log entry object
         */
        process : function(entry)
        {
            var level = entry.level || "info";
            for (var prop in entry)
            {
                if (prop == "items")
                {
                    var items = entry[prop];
                    for (var p = 0, l = items.length; p < l; p++)
                    {
                        var item = items[p];
                        this[level](item.text);
                    }
                }
            }
        }
    },

    /**
     *  defer method
     */
    defer : function(statics)
    {
        statics.init();
    }
});
