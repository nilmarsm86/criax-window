/**
 * Estable el tamanno de la ventana
 *
 */

const windowUtils = require('window-utils');

function supplyDefault(window) {
  return (window === undefined) ? windowUtils.activeWindow : window;
}


/**
 * Size the main application window to consume the full screen.
 * @param [window] {WindowObject} the window to modify, default is
 * current active window.
 */
exports.sizeTo = function(width,height,window) {
    window = supplyDefault(window);
    
    //width
    width = width || window.screen.width;
    window.outerWidth = width;
    window.innerWidth = width;
            
     //height
    height = height || window.screen.height;
    window.outerHeight = height;    
    window.innerHeight = height;
};

/**
 * Size the main application window to consume the maximun screen.
 * @param [window] {WindowObject} the window to modify, default is
 * current active window.
 */
exports.maximize = function(window) {
    window = supplyDefault(window);
	window.maximize();
};

/**
 * Size the main application window to minimize.
 * @param [window] {WindowObject} the window to modify, default is
 * current active window.
 */
exports.minimize = function(window) {
    window = supplyDefault(window);
	window.minimize();
};

/**
 * Restaurar la ventana
 * @param [window] {WindowObject} the window to modify, default is
 * current active window.
 */
exports.restore = function(window) {
    window = supplyDefault(window);
	window.restore();
};

/**
 * Posicion de la ventana
 * @param [window] {WindowObject} the window to modify, default is
 * current active window.
 */
exports.screenPosition = function(posX,posY,window) {
    window = supplyDefault(window);
	window.screenY = posY;
	window.screenX = posX;
};

/**
 * Estado de la ventana
 * @param [window] {WindowObject} the window to modify, default is
 * current active window.
 */
exports.state = function(window) {
    window = supplyDefault(window);
    switch(window.windowState){
        case 1:
            return "maximized";
        break;
        
        case 2:
            return "minimized";
        break;
        
        case 3:
            return "normal";
        break;
        
        case 4:
            return "fullscreen";
        break;
    }  
};