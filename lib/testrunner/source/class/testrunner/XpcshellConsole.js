/* ************************************************************************

   

   Authors:
     * Nilmar Sanchez Muguercia (nilmarsm86)

************************************************************************ */

/**
 * Log appender for criax cli applications running in xulrunner/xpcshell. Writes log
 * messages to dump.
 *
 * @ignore(java.*)
 */
qx.Class.define("testrunner.XpcshellConsole", {

  statics:
  {
    /**
     * Writes a message to the shell. Errors will be sent to dump.
     *
     * @param logMessage {String} Message to be logged
     * @param level {String} Log level. One of "debug", "info", "warn", "error"
     */
    log : function(logMessage, level)
    {
      if(level === "info"){
        if(logMessage === "Test suite finished."){
          print("-----------------------------------------------------");
        }
      }

      print(level+": "+logMessage);

      if(level === "debug"){
        if(logMessage.slice(0,17) === "Finalize runtime:"){
          print("-----------------------------------------------------");
        }
      }
    },

    /**
     * Logs a debug message
     *
     * @param logMessage {String} Message to be logged
     */
    debug : function(logMessage)
    {
      this.log(logMessage, "debug");
    },

    /**
     * Logs an info message
     *
     * @param logMessage {String} Message to be logged
     */
    info : function(logMessage)
    {
      this.log(logMessage, "info");
    },

    /**
     * Logs a warning message
     *
     * @param logMessage {String} Message to be logged
     */
    warn : function(logMessage)
    {
      this.log(logMessage, "warn");
    },

    /**
     * Logs an error message
     *
     * @param logMessage {String} Message to be logged
     */
    error : function(logMessage)
    {
      this.log(logMessage, "error");
    },

    /**
     * Process a log entry object from qooxdoo's logging system.
     *
     * @param entry {Map} Log entry object
     */
    process : function(entry)
    {
      var level = entry.level || "info";
      for (var prop in entry) {
        if (prop == "items") {
          var items = entry[prop];
          for (var p=0, l=items.length; p<l; p++) {
            var item = items[p];
            this[level](item.text);
          }
        }
      }
    }
  }
});