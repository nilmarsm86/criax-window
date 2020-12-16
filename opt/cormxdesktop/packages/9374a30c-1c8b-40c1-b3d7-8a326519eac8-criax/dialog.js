/**
 * Ventana de dialogo
 *
 */

 const { Cc, Ci, Cr } = require("chrome");
 
 function dialogPrompts(){
	return Cc["@mozilla.org/embedcomp/prompt-service;1"]
           .getService(Ci.nsIPromptService);
 }
 
/**
 * Muestra una ventana de alerta
 * @param [title] {String} titulo de la ventana
 * @param [msg] {String} mensaje de la ventana
 */
exports.alert = function(title,msg) {
    var prompts = dialogPrompts();
    prompts.alert(null, title, msg);
};

/**
 * muestra una ventana de confirmacion
 * @param [title] {String} titulo de la ventana
 * @param [msg] {String} mensaje de la ventana
 */
 
exports.confirm = function(title,msg) {
    var prompts = dialogPrompts();
    return prompts.confirm(null, title, msg);
};
