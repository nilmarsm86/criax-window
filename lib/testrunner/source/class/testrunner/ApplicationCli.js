/* ************************************************************************

   

   Authors:
     * Nilmar Sanchez Muguercia (nilmarsm86)

************************************************************************ */

/**
 * Basic TestRunner main application class.
 *
 * @ignore(criaxTest)
 */
qx.Class.define("testrunner.ApplicationCli", {

  extend : qx.application.Basic,

  members :
  {
    runner : null,

    main : function()
    {
      qx.log.Logger.register(testrunner.XpcshellConsole);
      
      this.runner = new testrunner.runner.TestRunnerBasic();

      var first = true;

      this.runner.addListener("changeTestSuiteState", this.onChangeTestSuiteState, this);
      this.runner.addListener("changeTestCount", function(e){
        if(first == false){
          print("-----------------------------------------------------");
        }else{
          first = false;
        }
      }, this);
      
      // sync test suite loading
      if (this.runner.getTestSuiteState() === "ready") {
        this.runner.view.run();
      }
      
      if (this.runner.getTestSuiteState() === "finished") {
        criaxTest = false; 
      }
    },
    
    onChangeTestSuiteState : function(ev) 
    {
      var state = ev.getData();

      switch(state) {
        // async test suite loading
        case "ready":          
          this.runner.view.run();          
          break;
        case "init":
          print("-------------------------INIT----------------------------");
          break;
        case "loading":
          print("-------------------------LOADING----------------------------");
          break;
        case "error":
          print("-------------------------ERROR----------------------------");
          break;
        // case "running":
        //   print("-------------------------RUNNING----------------------------");
        //   break;
        case "aborted":
          print("-------------------------ABORTED----------------------------");
          break;
        case "finished":          
          criaxTest = false;          
          break;                          
      }
    }
  },

  /*
  *****************************************************************************
     DESTRUCTOR
  *****************************************************************************
  */

  destruct : function()
  {
    this._disposeObjects("runner");
  }
});