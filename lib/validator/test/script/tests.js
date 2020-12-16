(function(){

if (!window.qx) window.qx = {};

qx.$$start = new Date();

if (!qx.$$environment) qx.$$environment = {};
var envinfo = {"qx.allowUrlSettings":true,"qx.application":"testrunner.TestLoader","qx.debug":false,"qx.globalErrorHandling":true,"qx.optimization.basecalls":true,"qx.optimization.privates":true,"qx.optimization.strings":true,"qx.optimization.variables":true,"qx.optimization.variants":true,"qx.optimization.whitespace":true,"qx.revision":"","qx.standaloneAutorun":false,"qx.testNameSpace":"validator.test","qx.theme":"","qx.version":"1.4","testrunner.testParts":false};
for (var k in envinfo) qx.$$environment[k] = envinfo[k];

if (!qx.$$libraries) qx.$$libraries = {};
var libinfo = {"__out__":{"sourceUri":"../script"},"qx":{"resourceUri":"../resource","sourceUri":"../script","sourceViewUri":"https://github.com/qooxdoo/qooxdoo/blob/%{qxGitBranch}/framework/source/class/%{classFilePath}#L%{lineNumber}"},"testrunner":{"resourceUri":"../resource","sourceUri":"../script"},"validator":{"resourceUri":"../resource","sourceUri":"../script"}};
for (var k in libinfo) qx.$$libraries[k] = libinfo[k];

qx.$$resources = {};
qx.$$translations = {"C":null,"en":null,"es":null};
qx.$$locales = {"C":null,"en":null,"es":null};
qx.$$packageData = {};
qx.$$g = {}

qx.$$loader = {
  parts : {"boot":[0]},
  packages : {"0":{"uris":["__out__:tests.83cabc9b2667.js"]}},
  urisBefore : [],
  cssBefore : [],
  boot : "boot",
  closureParts : {},
  bootIsInline : true,
  addNoCacheParam : true,

  decodeUris : function(compressedUris)
  {
    var libs = qx.$$libraries;
    var uris = [];
    for (var i=0; i<compressedUris.length; i++)
    {
      var uri = compressedUris[i].split(":");
      var euri;
      if (uri.length==2 && uri[0] in libs) {
        var prefix = libs[uri[0]].sourceUri;
        euri = prefix + "/" + uri[1];
      } else {
        euri = compressedUris[i];
      }
      if (qx.$$loader.addNoCacheParam) {
        euri += "?nocache=" + Math.random();
      }
      
      uris.push(euri);
    }
    return uris;
  }
};

var readyStateValue = {"complete" : true};
if (document.documentMode && document.documentMode < 10 ||
    (typeof window.ActiveXObject !== "undefined" && !document.documentMode)) {
  readyStateValue["loaded"] = true;
}

function loadScript(uri, callback) {
  var elem = document.createElement("script");
  elem.charset = "utf-8";
  elem.src = uri;
  elem.onreadystatechange = elem.onload = function() {
    if (!this.readyState || readyStateValue[this.readyState]) {
      elem.onreadystatechange = elem.onload = null;
      if (typeof callback === "function") {
        callback();
      }
    }
  };

  if (isLoadParallel) {
    elem.async = null;
  }

  var head = document.getElementsByTagName("head")[0];
  head.appendChild(elem);
}

function loadCss(uri) {
  var elem = document.createElement("link");
  elem.rel = "stylesheet";
  elem.type= "text/css";
  elem.href= uri;
  var head = document.getElementsByTagName("head")[0];
  head.appendChild(elem);
}

var isWebkit = /AppleWebKit\/([^ ]+)/.test(navigator.userAgent);
var isLoadParallel = 'async' in document.createElement('script');

function loadScriptList(list, callback) {
  if (list.length == 0) {
    callback();
    return;
  }

  var item;

  if (isLoadParallel) {
    while (list.length) {
      item = list.shift();
      if (list.length) {
        loadScript(item);
      } else {
        loadScript(item, callback);
      }
    }
  } else {
    item = list.shift();
    loadScript(item,  function() {
      if (isWebkit) {
        // force async, else Safari fails with a "maximum recursion depth exceeded"
        window.setTimeout(function() {
          loadScriptList(list, callback);
        }, 0);
      } else {
        loadScriptList(list, callback);
      }
    });
  }
}

var fireContentLoadedEvent = function() {
  qx.$$domReady = true;
  document.removeEventListener('DOMContentLoaded', fireContentLoadedEvent, false);
};
if (document.addEventListener) {
  document.addEventListener('DOMContentLoaded', fireContentLoadedEvent, false);
}

qx.$$loader.importPackageData = function (dataMap, callback) {
  if (dataMap["resources"]){
    var resMap = dataMap["resources"];
    for (var k in resMap) qx.$$resources[k] = resMap[k];
  }
  if (dataMap["locales"]){
    var locMap = dataMap["locales"];
    var qxlocs = qx.$$locales;
    for (var lang in locMap){
      if (!qxlocs[lang]) qxlocs[lang] = locMap[lang];
      else
        for (var k in locMap[lang]) qxlocs[lang][k] = locMap[lang][k];
    }
  }
  if (dataMap["translations"]){
    var trMap   = dataMap["translations"];
    var qxtrans = qx.$$translations;
    for (var lang in trMap){
      if (!qxtrans[lang]) qxtrans[lang] = trMap[lang];
      else
        for (var k in trMap[lang]) qxtrans[lang][k] = trMap[lang][k];
    }
  }
  if (callback){
    callback(dataMap);
  }
}

qx.$$loader.signalStartup = function ()
{
  qx.$$loader.scriptLoaded = true;
  if (window.qx && qx.event && qx.event.handler && qx.event.handler.Application) {
    qx.event.handler.Application.onScriptLoaded();
    qx.$$loader.applicationHandlerReady = true;
  } else {
    qx.$$loader.applicationHandlerReady = false;
  }
}

// Load all stuff
qx.$$loader.init = function(){
  var l=qx.$$loader;
  if (l.cssBefore.length>0) {
    for (var i=0, m=l.cssBefore.length; i<m; i++) {
      loadCss(l.cssBefore[i]);
    }
  }
  if (l.urisBefore.length>0){
    loadScriptList(l.urisBefore, function(){
      l.initUris();
    });
  } else {
    l.initUris();
  }
}

// Load qooxdoo boot stuff
qx.$$loader.initUris = function(){
  var l=qx.$$loader;
  var bootPackageHash=l.parts[l.boot][0];
  if (l.bootIsInline){
    l.importPackageData(qx.$$packageData[bootPackageHash]);
    l.signalStartup();
  } else {
    loadScriptList(l.decodeUris(l.packages[l.parts[l.boot][0]].uris), function(){
      // Opera needs this extra time to parse the scripts
      window.setTimeout(function(){
        l.importPackageData(qx.$$packageData[bootPackageHash] || {});
        l.signalStartup();
      }, 0);
    });
  }
}
})();

qx.$$packageData['0']={"locales":{"C":{"alternateQuotationEnd":"’","alternateQuotationStart":"‘","cldr_am":"AM","cldr_date_format_full":"EEEE, MMMM d, y","cldr_date_format_long":"MMMM d, y","cldr_date_format_medium":"MMM d, y","cldr_date_format_short":"M/d/yy","cldr_date_time_format_EHm":"E HH:mm","cldr_date_time_format_EHms":"E HH:mm:ss","cldr_date_time_format_Ed":"d E","cldr_date_time_format_Ehm":"E h:mm a","cldr_date_time_format_Ehms":"E h:mm:ss a","cldr_date_time_format_Gy":"y G","cldr_date_time_format_GyMMM":"MMM y G","cldr_date_time_format_GyMMMEd":"E, MMM d, y G","cldr_date_time_format_GyMMMd":"MMM d, y G","cldr_date_time_format_H":"HH","cldr_date_time_format_Hm":"HH:mm","cldr_date_time_format_Hms":"HH:mm:ss","cldr_date_time_format_M":"L","cldr_date_time_format_MEd":"E, M/d","cldr_date_time_format_MMM":"LLL","cldr_date_time_format_MMMEd":"E, MMM d","cldr_date_time_format_MMMd":"MMM d","cldr_date_time_format_Md":"M/d","cldr_date_time_format_d":"d","cldr_date_time_format_h":"h a","cldr_date_time_format_hm":"h:mm a","cldr_date_time_format_hms":"h:mm:ss a","cldr_date_time_format_ms":"mm:ss","cldr_date_time_format_y":"y","cldr_date_time_format_yM":"M/y","cldr_date_time_format_yMEd":"E, M/d/y","cldr_date_time_format_yMMM":"MMM y","cldr_date_time_format_yMMMEd":"E, MMM d, y","cldr_date_time_format_yMMMd":"MMM d, y","cldr_date_time_format_yMd":"M/d/y","cldr_date_time_format_yQQQ":"QQQ y","cldr_date_time_format_yQQQQ":"QQQQ y","cldr_day_format_abbreviated_fri":"Fri","cldr_day_format_abbreviated_mon":"Mon","cldr_day_format_abbreviated_sat":"Sat","cldr_day_format_abbreviated_sun":"Sun","cldr_day_format_abbreviated_thu":"Thu","cldr_day_format_abbreviated_tue":"Tue","cldr_day_format_abbreviated_wed":"Wed","cldr_day_format_short_fri":"Fr","cldr_day_format_short_mon":"Mo","cldr_day_format_short_sat":"Sa","cldr_day_format_short_sun":"Su","cldr_day_format_short_thu":"Th","cldr_day_format_short_tue":"Tu","cldr_day_format_short_wed":"We","cldr_day_format_wide_fri":"Friday","cldr_day_format_wide_mon":"Monday","cldr_day_format_wide_sat":"Saturday","cldr_day_format_wide_sun":"Sunday","cldr_day_format_wide_thu":"Thursday","cldr_day_format_wide_tue":"Tuesday","cldr_day_format_wide_wed":"Wednesday","cldr_day_stand-alone_narrow_fri":"F","cldr_day_stand-alone_narrow_mon":"M","cldr_day_stand-alone_narrow_sat":"S","cldr_day_stand-alone_narrow_sun":"S","cldr_day_stand-alone_narrow_thu":"T","cldr_day_stand-alone_narrow_tue":"T","cldr_day_stand-alone_narrow_wed":"W","cldr_month_format_abbreviated_1":"Jan","cldr_month_format_abbreviated_10":"Oct","cldr_month_format_abbreviated_11":"Nov","cldr_month_format_abbreviated_12":"Dec","cldr_month_format_abbreviated_2":"Feb","cldr_month_format_abbreviated_3":"Mar","cldr_month_format_abbreviated_4":"Apr","cldr_month_format_abbreviated_5":"May","cldr_month_format_abbreviated_6":"Jun","cldr_month_format_abbreviated_7":"Jul","cldr_month_format_abbreviated_8":"Aug","cldr_month_format_abbreviated_9":"Sep","cldr_month_format_wide_1":"January","cldr_month_format_wide_10":"October","cldr_month_format_wide_11":"November","cldr_month_format_wide_12":"December","cldr_month_format_wide_2":"February","cldr_month_format_wide_3":"March","cldr_month_format_wide_4":"April","cldr_month_format_wide_5":"May","cldr_month_format_wide_6":"June","cldr_month_format_wide_7":"July","cldr_month_format_wide_8":"August","cldr_month_format_wide_9":"September","cldr_month_stand-alone_narrow_1":"J","cldr_month_stand-alone_narrow_10":"O","cldr_month_stand-alone_narrow_11":"N","cldr_month_stand-alone_narrow_12":"D","cldr_month_stand-alone_narrow_2":"F","cldr_month_stand-alone_narrow_3":"M","cldr_month_stand-alone_narrow_4":"A","cldr_month_stand-alone_narrow_5":"M","cldr_month_stand-alone_narrow_6":"J","cldr_month_stand-alone_narrow_7":"J","cldr_month_stand-alone_narrow_8":"A","cldr_month_stand-alone_narrow_9":"S","cldr_number_decimal_separator":".","cldr_number_group_separator":",","cldr_number_percent_format":"#,##0%","cldr_pm":"PM","cldr_time_format_full":"h:mm:ss a zzzz","cldr_time_format_long":"h:mm:ss a z","cldr_time_format_medium":"h:mm:ss a","cldr_time_format_short":"h:mm a","quotationEnd":"”","quotationStart":"“"},"en":{"alternateQuotationEnd":"’","alternateQuotationStart":"‘","cldr_am":"AM","cldr_date_format_full":"EEEE, MMMM d, y","cldr_date_format_long":"MMMM d, y","cldr_date_format_medium":"MMM d, y","cldr_date_format_short":"M/d/yy","cldr_date_time_format_EHm":"E HH:mm","cldr_date_time_format_EHms":"E HH:mm:ss","cldr_date_time_format_Ed":"d E","cldr_date_time_format_Ehm":"E h:mm a","cldr_date_time_format_Ehms":"E h:mm:ss a","cldr_date_time_format_Gy":"y G","cldr_date_time_format_GyMMM":"MMM y G","cldr_date_time_format_GyMMMEd":"E, MMM d, y G","cldr_date_time_format_GyMMMd":"MMM d, y G","cldr_date_time_format_H":"HH","cldr_date_time_format_Hm":"HH:mm","cldr_date_time_format_Hms":"HH:mm:ss","cldr_date_time_format_M":"L","cldr_date_time_format_MEd":"E, M/d","cldr_date_time_format_MMM":"LLL","cldr_date_time_format_MMMEd":"E, MMM d","cldr_date_time_format_MMMd":"MMM d","cldr_date_time_format_Md":"M/d","cldr_date_time_format_d":"d","cldr_date_time_format_h":"h a","cldr_date_time_format_hm":"h:mm a","cldr_date_time_format_hms":"h:mm:ss a","cldr_date_time_format_ms":"mm:ss","cldr_date_time_format_y":"y","cldr_date_time_format_yM":"M/y","cldr_date_time_format_yMEd":"E, M/d/y","cldr_date_time_format_yMMM":"MMM y","cldr_date_time_format_yMMMEd":"E, MMM d, y","cldr_date_time_format_yMMMd":"MMM d, y","cldr_date_time_format_yMd":"M/d/y","cldr_date_time_format_yQQQ":"QQQ y","cldr_date_time_format_yQQQQ":"QQQQ y","cldr_day_format_abbreviated_fri":"Fri","cldr_day_format_abbreviated_mon":"Mon","cldr_day_format_abbreviated_sat":"Sat","cldr_day_format_abbreviated_sun":"Sun","cldr_day_format_abbreviated_thu":"Thu","cldr_day_format_abbreviated_tue":"Tue","cldr_day_format_abbreviated_wed":"Wed","cldr_day_format_short_fri":"Fr","cldr_day_format_short_mon":"Mo","cldr_day_format_short_sat":"Sa","cldr_day_format_short_sun":"Su","cldr_day_format_short_thu":"Th","cldr_day_format_short_tue":"Tu","cldr_day_format_short_wed":"We","cldr_day_format_wide_fri":"Friday","cldr_day_format_wide_mon":"Monday","cldr_day_format_wide_sat":"Saturday","cldr_day_format_wide_sun":"Sunday","cldr_day_format_wide_thu":"Thursday","cldr_day_format_wide_tue":"Tuesday","cldr_day_format_wide_wed":"Wednesday","cldr_day_stand-alone_narrow_fri":"F","cldr_day_stand-alone_narrow_mon":"M","cldr_day_stand-alone_narrow_sat":"S","cldr_day_stand-alone_narrow_sun":"S","cldr_day_stand-alone_narrow_thu":"T","cldr_day_stand-alone_narrow_tue":"T","cldr_day_stand-alone_narrow_wed":"W","cldr_month_format_abbreviated_1":"Jan","cldr_month_format_abbreviated_10":"Oct","cldr_month_format_abbreviated_11":"Nov","cldr_month_format_abbreviated_12":"Dec","cldr_month_format_abbreviated_2":"Feb","cldr_month_format_abbreviated_3":"Mar","cldr_month_format_abbreviated_4":"Apr","cldr_month_format_abbreviated_5":"May","cldr_month_format_abbreviated_6":"Jun","cldr_month_format_abbreviated_7":"Jul","cldr_month_format_abbreviated_8":"Aug","cldr_month_format_abbreviated_9":"Sep","cldr_month_format_wide_1":"January","cldr_month_format_wide_10":"October","cldr_month_format_wide_11":"November","cldr_month_format_wide_12":"December","cldr_month_format_wide_2":"February","cldr_month_format_wide_3":"March","cldr_month_format_wide_4":"April","cldr_month_format_wide_5":"May","cldr_month_format_wide_6":"June","cldr_month_format_wide_7":"July","cldr_month_format_wide_8":"August","cldr_month_format_wide_9":"September","cldr_month_stand-alone_narrow_1":"J","cldr_month_stand-alone_narrow_10":"O","cldr_month_stand-alone_narrow_11":"N","cldr_month_stand-alone_narrow_12":"D","cldr_month_stand-alone_narrow_2":"F","cldr_month_stand-alone_narrow_3":"M","cldr_month_stand-alone_narrow_4":"A","cldr_month_stand-alone_narrow_5":"M","cldr_month_stand-alone_narrow_6":"J","cldr_month_stand-alone_narrow_7":"J","cldr_month_stand-alone_narrow_8":"A","cldr_month_stand-alone_narrow_9":"S","cldr_number_decimal_separator":".","cldr_number_group_separator":",","cldr_number_percent_format":"#,##0%","cldr_pm":"PM","cldr_time_format_full":"h:mm:ss a zzzz","cldr_time_format_long":"h:mm:ss a z","cldr_time_format_medium":"h:mm:ss a","cldr_time_format_short":"h:mm a","quotationEnd":"”","quotationStart":"“"},"es":{"alternateQuotationEnd":"”","alternateQuotationStart":"“","cldr_am":"a. m.","cldr_date_format_full":"EEEE, d 'de' MMMM 'de' y","cldr_date_format_long":"d 'de' MMMM 'de' y","cldr_date_format_medium":"d/M/y","cldr_date_format_short":"d/M/yy","cldr_date_time_format_EHm":"E, H:mm","cldr_date_time_format_EHms":"E, H:mm:ss","cldr_date_time_format_Ed":"E d","cldr_date_time_format_Ehm":"E, h:mm a","cldr_date_time_format_Ehms":"E, h:mm:ss a","cldr_date_time_format_Gy":"y G","cldr_date_time_format_GyMMM":"MMM 'de' y G","cldr_date_time_format_GyMMMEd":"E, d 'de' MMMM 'de' y G","cldr_date_time_format_GyMMMd":"d MMM 'de' y G","cldr_date_time_format_H":"H","cldr_date_time_format_Hm":"H:mm","cldr_date_time_format_Hms":"H:mm:ss","cldr_date_time_format_M":"L","cldr_date_time_format_MEd":"E, d/M","cldr_date_time_format_MMM":"LLL","cldr_date_time_format_MMMEd":"E d 'de' MMM","cldr_date_time_format_MMMMd":"d 'de' MMMM","cldr_date_time_format_MMMd":"d 'de' MMM","cldr_date_time_format_MMMdd":"dd-MMM","cldr_date_time_format_MMd":"d/M","cldr_date_time_format_MMdd":"d/M","cldr_date_time_format_Md":"d/M","cldr_date_time_format_d":"d","cldr_date_time_format_h":"h a","cldr_date_time_format_hm":"h:mm a","cldr_date_time_format_hms":"h:mm:ss a","cldr_date_time_format_ms":"mm:ss","cldr_date_time_format_y":"y","cldr_date_time_format_yM":"M/y","cldr_date_time_format_yMEd":"EEE, d/M/y","cldr_date_time_format_yMM":"M/y","cldr_date_time_format_yMMM":"MMM 'de' y","cldr_date_time_format_yMMMEd":"EEE, d 'de' MMMM 'de' y","cldr_date_time_format_yMMMM":"MMMM 'de' y","cldr_date_time_format_yMMMd":"d 'de' MMM 'de' y","cldr_date_time_format_yMd":"d/M/y","cldr_date_time_format_yQQQ":"QQQ y","cldr_date_time_format_yQQQQ":"QQQQ 'de' y","cldr_day_format_abbreviated_fri":"vie.","cldr_day_format_abbreviated_mon":"lun.","cldr_day_format_abbreviated_sat":"sáb.","cldr_day_format_abbreviated_sun":"dom.","cldr_day_format_abbreviated_thu":"jue.","cldr_day_format_abbreviated_tue":"mar.","cldr_day_format_abbreviated_wed":"mié.","cldr_day_format_narrow_fri":"V","cldr_day_format_narrow_mon":"L","cldr_day_format_narrow_sat":"S","cldr_day_format_narrow_sun":"D","cldr_day_format_narrow_thu":"J","cldr_day_format_narrow_tue":"M","cldr_day_format_narrow_wed":"X","cldr_day_format_short_fri":"VI","cldr_day_format_short_mon":"LU","cldr_day_format_short_sat":"SA","cldr_day_format_short_sun":"DO","cldr_day_format_short_thu":"JU","cldr_day_format_short_tue":"MA","cldr_day_format_short_wed":"MI","cldr_day_format_wide_fri":"viernes","cldr_day_format_wide_mon":"lunes","cldr_day_format_wide_sat":"sábado","cldr_day_format_wide_sun":"domingo","cldr_day_format_wide_thu":"jueves","cldr_day_format_wide_tue":"martes","cldr_day_format_wide_wed":"miércoles","cldr_day_stand-alone_abbreviated_fri":"Vie.","cldr_day_stand-alone_abbreviated_mon":"Lun.","cldr_day_stand-alone_abbreviated_sat":"Sáb.","cldr_day_stand-alone_abbreviated_sun":"Dom.","cldr_day_stand-alone_abbreviated_thu":"Jue.","cldr_day_stand-alone_abbreviated_tue":"Mar.","cldr_day_stand-alone_abbreviated_wed":"Mié.","cldr_day_stand-alone_narrow_fri":"V","cldr_day_stand-alone_narrow_mon":"L","cldr_day_stand-alone_narrow_sat":"S","cldr_day_stand-alone_narrow_sun":"D","cldr_day_stand-alone_narrow_thu":"J","cldr_day_stand-alone_narrow_tue":"M","cldr_day_stand-alone_narrow_wed":"X","cldr_day_stand-alone_short_fri":"VI","cldr_day_stand-alone_short_mon":"LU","cldr_day_stand-alone_short_sat":"SA","cldr_day_stand-alone_short_sun":"DO","cldr_day_stand-alone_short_thu":"JU","cldr_day_stand-alone_short_tue":"MA","cldr_day_stand-alone_short_wed":"MI","cldr_day_stand-alone_wide_fri":"Viernes","cldr_day_stand-alone_wide_mon":"Lunes","cldr_day_stand-alone_wide_sat":"Sábado","cldr_day_stand-alone_wide_sun":"Domingo","cldr_day_stand-alone_wide_thu":"Jueves","cldr_day_stand-alone_wide_tue":"Martes","cldr_day_stand-alone_wide_wed":"Miércoles","cldr_month_format_abbreviated_1":"ene.","cldr_month_format_abbreviated_10":"oct.","cldr_month_format_abbreviated_11":"nov.","cldr_month_format_abbreviated_12":"dic.","cldr_month_format_abbreviated_2":"feb.","cldr_month_format_abbreviated_3":"mar.","cldr_month_format_abbreviated_4":"abr.","cldr_month_format_abbreviated_5":"may.","cldr_month_format_abbreviated_6":"jun.","cldr_month_format_abbreviated_7":"jul.","cldr_month_format_abbreviated_8":"ago.","cldr_month_format_abbreviated_9":"sept.","cldr_month_format_narrow_1":"E","cldr_month_format_narrow_10":"O","cldr_month_format_narrow_11":"N","cldr_month_format_narrow_12":"D","cldr_month_format_narrow_2":"F","cldr_month_format_narrow_3":"M","cldr_month_format_narrow_4":"A","cldr_month_format_narrow_5":"M","cldr_month_format_narrow_6":"J","cldr_month_format_narrow_7":"J","cldr_month_format_narrow_8":"A","cldr_month_format_narrow_9":"S","cldr_month_format_wide_1":"enero","cldr_month_format_wide_10":"octubre","cldr_month_format_wide_11":"noviembre","cldr_month_format_wide_12":"diciembre","cldr_month_format_wide_2":"febrero","cldr_month_format_wide_3":"marzo","cldr_month_format_wide_4":"abril","cldr_month_format_wide_5":"mayo","cldr_month_format_wide_6":"junio","cldr_month_format_wide_7":"julio","cldr_month_format_wide_8":"agosto","cldr_month_format_wide_9":"septiembre","cldr_month_stand-alone_abbreviated_1":"Ene.","cldr_month_stand-alone_abbreviated_10":"Oct.","cldr_month_stand-alone_abbreviated_11":"Nov.","cldr_month_stand-alone_abbreviated_12":"Dic.","cldr_month_stand-alone_abbreviated_2":"Feb.","cldr_month_stand-alone_abbreviated_3":"Mar.","cldr_month_stand-alone_abbreviated_4":"Abr.","cldr_month_stand-alone_abbreviated_5":"May.","cldr_month_stand-alone_abbreviated_6":"Jun.","cldr_month_stand-alone_abbreviated_7":"Jul.","cldr_month_stand-alone_abbreviated_8":"Ago.","cldr_month_stand-alone_abbreviated_9":"Sept.","cldr_month_stand-alone_narrow_1":"E","cldr_month_stand-alone_narrow_10":"O","cldr_month_stand-alone_narrow_11":"N","cldr_month_stand-alone_narrow_12":"D","cldr_month_stand-alone_narrow_2":"F","cldr_month_stand-alone_narrow_3":"M","cldr_month_stand-alone_narrow_4":"A","cldr_month_stand-alone_narrow_5":"M","cldr_month_stand-alone_narrow_6":"J","cldr_month_stand-alone_narrow_7":"J","cldr_month_stand-alone_narrow_8":"A","cldr_month_stand-alone_narrow_9":"S","cldr_month_stand-alone_wide_1":"Enero","cldr_month_stand-alone_wide_10":"Octubre","cldr_month_stand-alone_wide_11":"Noviembre","cldr_month_stand-alone_wide_12":"Diciembre","cldr_month_stand-alone_wide_2":"Febrero","cldr_month_stand-alone_wide_3":"Marzo","cldr_month_stand-alone_wide_4":"Abril","cldr_month_stand-alone_wide_5":"Mayo","cldr_month_stand-alone_wide_6":"Junio","cldr_month_stand-alone_wide_7":"Julio","cldr_month_stand-alone_wide_8":"Agosto","cldr_month_stand-alone_wide_9":"Septiembre","cldr_number_decimal_separator":",","cldr_number_group_separator":".","cldr_number_percent_format":"#,##0%","cldr_pm":"p. m.","cldr_time_format_full":"H:mm:ss (zzzz)","cldr_time_format_long":"H:mm:ss z","cldr_time_format_medium":"H:mm:ss","cldr_time_format_short":"H:mm","quotationEnd":"»","quotationStart":"«"}},"resources":{"qx/static/blank.gif":[1,1,"gif","qx"]},"translations":{"C":{},"en":{},"es":{}}};
(function(){var b=".prototype",c="function",d="Boolean",e="Error",f="Object.keys requires an object as argument.",g="constructor",h="warn",j="default",k="Null",m="hasOwnProperty",n="Undefined",o="string",p="Object",q="toLocaleString",r="error",s="toString",t="qx.debug",u="()",v="RegExp",w="String",x="info",y="BROKEN_IE",z="isPrototypeOf",A="Date",B="",C="qx.Bootstrap",D="Function",E="]",F="Cannot call super class. Method is not derived: ",G="Array",H="[Class ",I="valueOf",J="Number",K="Class",L="debug",M="ES5",N=".",O="propertyIsEnumerable",P="object";if(!window.qx){window.qx={};}
;qx.Bootstrap={genericToString:function(){return H+this.classname+E;}
,createNamespace:function(name,Q){var T=name.split(N);var S=T[0];var parent=qx.$$namespaceRoot&&qx.$$namespaceRoot[S]?qx.$$namespaceRoot:window;for(var i=0,R=T.length-1;i<R;i++ ,S=T[i]){if(!parent[S]){parent=parent[S]={};}
else {parent=parent[S];}
;}
;parent[S]=Q;return S;}
,setDisplayName:function(V,U,name){V.displayName=U+N+name+u;}
,setDisplayNames:function(X,W){for(var name in X){var Y=X[name];if(Y instanceof Function){Y.displayName=W+N+name+u;}
;}
;}
,base:function(ba,bb){if(qx.Bootstrap.DEBUG){if(!qx.Bootstrap.isFunction(ba.callee.base)){throw new Error(F+ba.callee.displayName);}
;}
;if(arguments.length===1){return ba.callee.base.call(this);}
else {return ba.callee.base.apply(this,Array.prototype.slice.call(arguments,1));}
;}
,define:function(name,bm){if(!bm){bm={statics:{}};}
;var bi;var be=null;qx.Bootstrap.setDisplayNames(bm.statics,name);if(bm.members||bm.extend){qx.Bootstrap.setDisplayNames(bm.members,name+b);bi=bm.construct||new Function;if(bm.extend){this.extendClass(bi,bi,bm.extend,name,bg);}
;var bd=bm.statics||{};for(var i=0,bf=qx.Bootstrap.keys(bd),l=bf.length;i<l;i++ ){var bc=bf[i];bi[bc]=bd[bc];}
;be=bi.prototype;be.base=qx.Bootstrap.base;be.name=be.classname=name;var bk=bm.members||{};var bc,bj;for(var i=0,bf=qx.Bootstrap.keys(bk),l=bf.length;i<l;i++ ){bc=bf[i];bj=bk[bc];if(bj instanceof Function&&be[bc]){bj.base=be[bc];}
;be[bc]=bj;}
;}
else {bi=bm.statics||{};if(qx.Bootstrap.$$registry&&qx.Bootstrap.$$registry[name]){var bl=qx.Bootstrap.$$registry[name];if(this.keys(bi).length!==0){if(bm.defer){bm.defer(bi,be);}
;for(var bh in bi){bl[bh]=bi[bh];}
;return bl;}
;}
;}
;bi.$$type=K;if(!bi.hasOwnProperty(s)){bi.toString=this.genericToString;}
;var bg=name?this.createNamespace(name,bi):B;bi.name=bi.classname=name;bi.basename=bg;bi.$$events=bm.events;if(bm.defer){bm.defer(bi,be);}
;if(name!=null){qx.Bootstrap.$$registry[name]=bi;}
;return bi;}
};qx.Bootstrap.define(C,{statics:{LOADSTART:qx.$$start||new Date(),DEBUG:(function(){var bn=true;if(qx.$$environment&&qx.$$environment[t]===false){bn=false;}
;return bn;}
)(),getEnvironmentSetting:function(bo){if(qx.$$environment){return qx.$$environment[bo];}
;}
,setEnvironmentSetting:function(bp,bq){if(!qx.$$environment){qx.$$environment={};}
;if(qx.$$environment[bp]===undefined){qx.$$environment[bp]=bq;}
;}
,createNamespace:qx.Bootstrap.createNamespace,setRoot:function(br){qx.$$namespaceRoot=br;}
,base:qx.Bootstrap.base,define:qx.Bootstrap.define,setDisplayName:qx.Bootstrap.setDisplayName,setDisplayNames:qx.Bootstrap.setDisplayNames,genericToString:qx.Bootstrap.genericToString,extendClass:function(clazz,construct,superClass,name,basename){var superproto=superClass.prototype;var helper=new Function();helper.prototype=superproto;var proto=new helper();clazz.prototype=proto;proto.name=proto.classname=name;proto.basename=basename;construct.base=superClass;clazz.superclass=superClass;construct.self=clazz.constructor=proto.constructor=clazz;}
,getByName:function(name){return qx.Bootstrap.$$registry[name];}
,$$registry:{},objectGetLength:function(bs){return qx.Bootstrap.keys(bs).length;}
,objectMergeWith:function(bu,bt,bw){if(bw===undefined){bw=true;}
;for(var bv in bt){if(bw||bu[bv]===undefined){bu[bv]=bt[bv];}
;}
;return bu;}
,__a:[z,m,q,s,I,O,g],keys:({"ES5":Object.keys,"BROKEN_IE":function(bx){if(bx===null||(typeof bx!=P&&typeof bx!=c)){throw new TypeError(f);}
;var by=[];var bA=Object.prototype.hasOwnProperty;for(var bB in bx){if(bA.call(bx,bB)){by.push(bB);}
;}
;var bz=qx.Bootstrap.__a;for(var i=0,a=bz,l=a.length;i<l;i++ ){if(bA.call(bx,a[i])){by.push(a[i]);}
;}
;return by;}
,"default":function(bC){if(bC===null||(typeof bC!=P&&typeof bC!=c)){throw new TypeError(f);}
;var bD=[];var bE=Object.prototype.hasOwnProperty;for(var bF in bC){if(bE.call(bC,bF)){bD.push(bF);}
;}
;return bD;}
})[typeof (Object.keys)==c?M:(function(){for(var bG in {toString:1}){return bG;}
;}
)()!==s?y:j],__b:{"[object String]":w,"[object Array]":G,"[object Object]":p,"[object RegExp]":v,"[object Number]":J,"[object Boolean]":d,"[object Date]":A,"[object Function]":D,"[object Error]":e},bind:function(bI,self,bJ){var bH=Array.prototype.slice.call(arguments,2,arguments.length);return function(){var bK=Array.prototype.slice.call(arguments,0,arguments.length);return bI.apply(self,bH.concat(bK));}
;}
,firstUp:function(bL){return bL.charAt(0).toUpperCase()+bL.substr(1);}
,firstLow:function(bM){return bM.charAt(0).toLowerCase()+bM.substr(1);}
,getClass:function(bO){if(bO===undefined){return n;}
else if(bO===null){return k;}
;var bN=Object.prototype.toString.call(bO);return (qx.Bootstrap.__b[bN]||bN.slice(8,-1));}
,isString:function(bP){return (bP!==null&&(typeof bP===o||qx.Bootstrap.getClass(bP)==w||bP instanceof String||(!!bP&&!!bP.$$isString)));}
,isArray:function(bQ){return (bQ!==null&&(bQ instanceof Array||(bQ&&qx.data&&qx.data.IListData&&qx.util.OOUtil.hasInterface(bQ.constructor,qx.data.IListData))||qx.Bootstrap.getClass(bQ)==G||(!!bQ&&!!bQ.$$isArray)));}
,isObject:function(bR){return (bR!==undefined&&bR!==null&&qx.Bootstrap.getClass(bR)==p);}
,isFunction:function(bS){return qx.Bootstrap.getClass(bS)==D;}
,$$logs:[],debug:function(bU,bT){qx.Bootstrap.$$logs.push([L,arguments]);}
,info:function(bW,bV){qx.Bootstrap.$$logs.push([x,arguments]);}
,warn:function(bY,bX){qx.Bootstrap.$$logs.push([h,arguments]);}
,error:function(cb,ca){qx.Bootstrap.$$logs.push([r,arguments]);}
,trace:function(cc){}
}});}
)();
(function(){var a="qx.util.OOUtil";qx.Bootstrap.define(a,{statics:{classIsDefined:function(name){return qx.Bootstrap.getByName(name)!==undefined;}
,getPropertyDefinition:function(b,name){while(b){if(b.$$properties&&b.$$properties[name]){return b.$$properties[name];}
;b=b.superclass;}
;return null;}
,hasProperty:function(c,name){return !!qx.util.OOUtil.getPropertyDefinition(c,name);}
,getEventType:function(d,name){var d=d.constructor;while(d.superclass){if(d.$$events&&d.$$events[name]!==undefined){return d.$$events[name];}
;d=d.superclass;}
;return null;}
,supportsEvent:function(e,name){return !!qx.util.OOUtil.getEventType(e,name);}
,getByInterface:function(h,f){var g,i,l;while(h){if(h.$$implements){g=h.$$flatImplements;for(i=0,l=g.length;i<l;i++ ){if(g[i]===f){return h;}
;}
;}
;h=h.superclass;}
;return null;}
,hasInterface:function(k,j){return !!qx.util.OOUtil.getByInterface(k,j);}
,getMixins:function(n){var m=[];while(n){if(n.$$includes){m.push.apply(m,n.$$flatIncludes);}
;n=n.superclass;}
;return m;}
}});}
)();
(function(){var a="qx.core.Environment",b="default",c=' type)',d="&",e="qx/static/blank.html",f="true",g="|",h="qx.core.Environment for a list of predefined keys.",j="false",k='] found, and no default ("default") given',l=":",m='" (',n=' in variants [',o=".",p="qx.allowUrlSettings",q='No match for variant "',r=" is not a valid key. Please see the API-doc of ",s="qxenv";qx.Bootstrap.define(a,{statics:{_checks:{},_asyncChecks:{},__c:{},_checksMap:{},_defaults:{"true":true,"qx.allowUrlSettings":false,"qx.allowUrlVariants":false,"qx.debug.property.level":0,"qx.debug":true,"qx.debug.ui.queue":true,"qx.aspects":false,"qx.dynlocale":true,"qx.dyntheme":true,"qx.blankpage":e,"qx.debug.databinding":false,"qx.debug.dispose":false,"qx.optimization.basecalls":false,"qx.optimization.comments":false,"qx.optimization.privates":false,"qx.optimization.strings":false,"qx.optimization.variables":false,"qx.optimization.variants":false,"module.databinding":true,"module.logger":true,"module.property":true,"module.events":true,"qx.nativeScrollBars":false},get:function(w){if(this.__c[w]!=undefined){return this.__c[w];}
;var y=this._checks[w];if(y){var u=y();this.__c[w]=u;return u;}
;var t=this._getClassNameFromEnvKey(w);if(t[0]!=undefined){var x=t[0];var v=t[1];var u=x[v]();this.__c[w]=u;return u;}
;if(qx.Bootstrap.DEBUG){qx.Bootstrap.warn(w+r+h);qx.Bootstrap.trace(this);}
;}
,_getClassNameFromEnvKey:function(D){var F=this._checksMap;if(F[D]!=undefined){var A=F[D];var E=A.lastIndexOf(o);if(E>-1){var C=A.slice(0,E);var z=A.slice(E+1);var B=qx.Bootstrap.getByName(C);if(B!=undefined){return [B,z];}
;}
;}
;return [undefined,undefined];}
,getAsync:function(H,K,self){var L=this;if(this.__c[H]!=undefined){window.setTimeout(function(){K.call(self,L.__c[H]);}
,0);return;}
;var I=this._asyncChecks[H];if(I){I(function(N){L.__c[H]=N;K.call(self,N);}
);return;}
;var G=this._getClassNameFromEnvKey(H);if(G[0]!=undefined){var J=G[0];var M=G[1];J[M](function(O){L.__c[H]=O;K.call(self,O);}
);return;}
;if(qx.Bootstrap.DEBUG){qx.Bootstrap.warn(H+r+h);qx.Bootstrap.trace(this);}
;}
,select:function(Q,P){return this.__d(this.get(Q),P);}
,selectAsync:function(S,R,self){this.getAsync(S,function(T){var U=this.__d(S,R);U.call(self,T);}
,this);}
,__d:function(Y,X){var W=X[Y];if(X.hasOwnProperty(Y)){return W;}
;for(var ba in X){if(ba.indexOf(g)!=-1){var V=ba.split(g);for(var i=0;i<V.length;i++ ){if(V[i]==Y){return X[ba];}
;}
;}
;}
;if(X[b]!==undefined){return X[b];}
;if(qx.Bootstrap.DEBUG){throw new Error(q+Y+m+(typeof Y)+c+n+qx.Bootstrap.keys(X)+k);}
;}
,filter:function(bb){var bd=[];for(var bc in bb){if(this.get(bc)){bd.push(bb[bc]);}
;}
;return bd;}
,invalidateCacheKey:function(be){delete this.__c[be];}
,add:function(bg,bf){if(this._checks[bg]==undefined){if(bf instanceof Function){if(!this._checksMap[bg]&&bf.displayName){this._checksMap[bg]=bf.displayName.substr(0,bf.displayName.length-2);}
;this._checks[bg]=bf;}
else {this._checks[bg]=this.__g(bf);}
;}
;}
,addAsync:function(bi,bh){if(this._checks[bi]==undefined){this._asyncChecks[bi]=bh;}
;}
,getChecks:function(){return this._checks;}
,getAsyncChecks:function(){return this._asyncChecks;}
,_initDefaultQxValues:function(){var bj=function(bl){return function(){return bl;}
;}
;for(var bk in this._defaults){this.add(bk,bj(this._defaults[bk]));}
;}
,__e:function(){if(qx&&qx.$$environment){for(var bm in qx.$$environment){var bn=qx.$$environment[bm];this._checks[bm]=this.__g(bn);}
;}
;}
,__f:function(){if(window.document&&window.document.location){var bo=window.document.location.search.slice(1).split(d);for(var i=0;i<bo.length;i++ ){var br=bo[i].split(l);if(br.length!=3||br[0]!=s){continue;}
;var bp=br[1];var bq=decodeURIComponent(br[2]);if(bq==f){bq=true;}
else if(bq==j){bq=false;}
else if(/^(\d|\.)+$/.test(bq)){bq=parseFloat(bq);}
;this._checks[bp]=this.__g(bq);}
;}
;}
,__g:function(bs){return qx.Bootstrap.bind(function(bt){return bt;}
,null,bs);}
},defer:function(bu){bu._initDefaultQxValues();bu.__e();if(bu.get(p)===true){bu.__f();}
;}
});}
)();
(function(){var a="ecmascript.array.lastindexof",b="function",c="stack",d="ecmascript.array.map",f="ecmascript.date.now",g="ecmascript.array.reduce",h="e",i="qx.bom.client.EcmaScript",j="ecmascript.object.keys",k="ecmascript.error.stacktrace",l="ecmascript.string.trim",m="ecmascript.array.indexof",n="stacktrace",o="ecmascript.error.toString",p="[object Error]",q="ecmascript.array.foreach",r="ecmascript.function.bind",s="ecmascript.array.reduceright",t="ecmascript.array.some",u="ecmascript.array.filter",v="ecmascript.array.every";qx.Bootstrap.define(i,{statics:{getStackTrace:function(){var w;var e=new Error(h);w=e.stack?c:e.stacktrace?n:null;if(!w){try{throw e;}
catch(x){e=x;}
;}
;return e.stacktrace?n:e.stack?c:null;}
,getArrayIndexOf:function(){return !!Array.prototype.indexOf;}
,getArrayLastIndexOf:function(){return !!Array.prototype.lastIndexOf;}
,getArrayForEach:function(){return !!Array.prototype.forEach;}
,getArrayFilter:function(){return !!Array.prototype.filter;}
,getArrayMap:function(){return !!Array.prototype.map;}
,getArraySome:function(){return !!Array.prototype.some;}
,getArrayEvery:function(){return !!Array.prototype.every;}
,getArrayReduce:function(){return !!Array.prototype.reduce;}
,getArrayReduceRight:function(){return !!Array.prototype.reduceRight;}
,getErrorToString:function(){return typeof Error.prototype.toString==b&&Error.prototype.toString()!==p;}
,getFunctionBind:function(){return typeof Function.prototype.bind===b;}
,getObjectKeys:function(){return !!Object.keys;}
,getDateNow:function(){return !!Date.now;}
,getStringTrim:function(){return typeof String.prototype.trim===b;}
},defer:function(y){qx.core.Environment.add(m,y.getArrayIndexOf);qx.core.Environment.add(a,y.getArrayLastIndexOf);qx.core.Environment.add(q,y.getArrayForEach);qx.core.Environment.add(u,y.getArrayFilter);qx.core.Environment.add(d,y.getArrayMap);qx.core.Environment.add(t,y.getArraySome);qx.core.Environment.add(v,y.getArrayEvery);qx.core.Environment.add(g,y.getArrayReduce);qx.core.Environment.add(s,y.getArrayReduceRight);qx.core.Environment.add(f,y.getDateNow);qx.core.Environment.add(o,y.getErrorToString);qx.core.Environment.add(k,y.getStackTrace);qx.core.Environment.add(r,y.getFunctionBind);qx.core.Environment.add(j,y.getObjectKeys);qx.core.Environment.add(l,y.getStringTrim);}
});}
)();
(function(){var a="qx.lang.normalize.Function",b="ecmascript.function.bind",c="function",d="Function.prototype.bind called on incompatible ";qx.Bootstrap.define(a,{statics:{bind:function(i){var e=Array.prototype.slice;var h=this;if(typeof h!=c){throw new TypeError(d+h);}
;var f=e.call(arguments,1);var g=function(){if(this instanceof g){var F=function(){}
;F.prototype=h.prototype;var self=new F;var j=h.apply(self,f.concat(e.call(arguments)));if(Object(j)===j){return j;}
;return self;}
else {return h.apply(i,f.concat(e.call(arguments)));}
;}
;return g;}
},defer:function(k){if(!qx.core.Environment.get(b)){Function.prototype.bind=k.bind;}
;}
});}
)();
(function(){var a="function",b="ecmascript.array.lastindexof",c="ecmascript.array.map",d="ecmascript.array.filter",e="Length is 0 and no second argument given",f="qx.lang.normalize.Array",g="ecmascript.array.indexof",h="First argument is not callable",j="ecmascript.array.reduce",k="ecmascript.array.foreach",m="ecmascript.array.reduceright",n="ecmascript.array.some",o="ecmascript.array.every";qx.Bootstrap.define(f,{statics:{indexOf:function(p,q){if(q==null){q=0;}
else if(q<0){q=Math.max(0,this.length+q);}
;for(var i=q;i<this.length;i++ ){if(this[i]===p){return i;}
;}
;return -1;}
,lastIndexOf:function(r,s){if(s==null){s=this.length-1;}
else if(s<0){s=Math.max(0,this.length+s);}
;for(var i=s;i>=0;i-- ){if(this[i]===r){return i;}
;}
;return -1;}
,forEach:function(t,u){var l=this.length;for(var i=0;i<l;i++ ){var v=this[i];if(v!==undefined){t.call(u||window,v,i,this);}
;}
;}
,filter:function(z,w){var x=[];var l=this.length;for(var i=0;i<l;i++ ){var y=this[i];if(y!==undefined){if(z.call(w||window,y,i,this)){x.push(this[i]);}
;}
;}
;return x;}
,map:function(D,A){var B=[];var l=this.length;for(var i=0;i<l;i++ ){var C=this[i];if(C!==undefined){B[i]=D.call(A||window,C,i,this);}
;}
;return B;}
,some:function(E,F){var l=this.length;for(var i=0;i<l;i++ ){var G=this[i];if(G!==undefined){if(E.call(F||window,G,i,this)){return true;}
;}
;}
;return false;}
,every:function(H,I){var l=this.length;for(var i=0;i<l;i++ ){var J=this[i];if(J!==undefined){if(!H.call(I||window,J,i,this)){return false;}
;}
;}
;return true;}
,reduce:function(K,L){if(typeof K!==a){throw new TypeError(h);}
;if(L===undefined&&this.length===0){throw new TypeError(e);}
;var M=L===undefined?this[0]:L;for(var i=L===undefined?1:0;i<this.length;i++ ){if(i in this){M=K.call(undefined,M,this[i],i,this);}
;}
;return M;}
,reduceRight:function(N,O){if(typeof N!==a){throw new TypeError(h);}
;if(O===undefined&&this.length===0){throw new TypeError(e);}
;var P=O===undefined?this[this.length-1]:O;for(var i=O===undefined?this.length-2:this.length-1;i>=0;i-- ){if(i in this){P=N.call(undefined,P,this[i],i,this);}
;}
;return P;}
},defer:function(Q){if(!qx.core.Environment.get(g)){Array.prototype.indexOf=Q.indexOf;}
;if(!qx.core.Environment.get(b)){Array.prototype.lastIndexOf=Q.lastIndexOf;}
;if(!qx.core.Environment.get(k)){Array.prototype.forEach=Q.forEach;}
;if(!qx.core.Environment.get(d)){Array.prototype.filter=Q.filter;}
;if(!qx.core.Environment.get(c)){Array.prototype.map=Q.map;}
;if(!qx.core.Environment.get(n)){Array.prototype.some=Q.some;}
;if(!qx.core.Environment.get(o)){Array.prototype.every=Q.every;}
;if(!qx.core.Environment.get(j)){Array.prototype.reduce=Q.reduce;}
;if(!qx.core.Environment.get(m)){Array.prototype.reduceRight=Q.reduceRight;}
;}
});}
)();
(function(){var a="qx.Mixin",b=".prototype",c="]",d='Conflict between mixin "',e="constructor",f="Array",g='"!',h='" and "',j="destruct",k='" in property "',m="Mixin",n='" in member "',o="[Mixin ";qx.Bootstrap.define(a,{statics:{define:function(name,q){if(q){if(q.include&&!(qx.Bootstrap.getClass(q.include)===f)){q.include=[q.include];}
;{}
;var r=q.statics?q.statics:{};qx.Bootstrap.setDisplayNames(r,name);for(var p in r){if(r[p] instanceof Function){r[p].$$mixin=r;}
;}
;if(q.construct){r.$$constructor=q.construct;qx.Bootstrap.setDisplayName(q.construct,name,e);}
;if(q.include){r.$$includes=q.include;}
;if(q.properties){r.$$properties=q.properties;}
;if(q.members){r.$$members=q.members;qx.Bootstrap.setDisplayNames(q.members,name+b);}
;for(var p in r.$$members){if(r.$$members[p] instanceof Function){r.$$members[p].$$mixin=r;}
;}
;if(q.events){r.$$events=q.events;}
;if(q.destruct){r.$$destructor=q.destruct;qx.Bootstrap.setDisplayName(q.destruct,name,j);}
;}
else {var r={};}
;r.$$type=m;r.name=name;r.toString=this.genericToString;r.basename=qx.Bootstrap.createNamespace(name,r);this.$$registry[name]=r;return r;}
,checkCompatibility:function(t){var u=this.flatten(t);var v=u.length;if(v<2){return true;}
;var w={};var x={};var z={};var y;for(var i=0;i<v;i++ ){y=u[i];for(var s in y.events){if(z[s]){throw new Error(d+y.name+h+z[s]+n+s+g);}
;z[s]=y.name;}
;for(var s in y.properties){if(w[s]){throw new Error(d+y.name+h+w[s]+k+s+g);}
;w[s]=y.name;}
;for(var s in y.members){if(x[s]){throw new Error(d+y.name+h+x[s]+n+s+g);}
;x[s]=y.name;}
;}
;return true;}
,isCompatible:function(B,C){var A=qx.util.OOUtil.getMixins(C);A.push(B);return qx.Mixin.checkCompatibility(A);}
,getByName:function(name){return this.$$registry[name];}
,isDefined:function(name){return this.getByName(name)!==undefined;}
,getTotalNumber:function(){return qx.Bootstrap.objectGetLength(this.$$registry);}
,flatten:function(D){if(!D){return [];}
;var E=D.concat();for(var i=0,l=D.length;i<l;i++ ){if(D[i].$$includes){E.push.apply(E,this.flatten(D[i].$$includes));}
;}
;return E;}
,genericToString:function(){return o+this.name+c;}
,$$registry:{},__h:null,__i:function(name,F){}
}});}
)();
(function(){var a="qx.core.Aspect",b="before",c="*",d="static";qx.Bootstrap.define(a,{statics:{__j:[],wrap:function(h,l,j){var m=[];var e=[];var k=this.__j;var g;for(var i=0;i<k.length;i++ ){g=k[i];if((g.type==null||j==g.type||g.type==c)&&(g.name==null||h.match(g.name))){g.pos==-1?m.push(g.fcn):e.push(g.fcn);}
;}
;if(m.length===0&&e.length===0){return l;}
;var f=function(){for(var i=0;i<m.length;i++ ){m[i].call(this,h,l,j,arguments);}
;var n=l.apply(this,arguments);for(var i=0;i<e.length;i++ ){e[i].call(this,h,l,j,arguments,n);}
;return n;}
;if(j!==d){f.self=l.self;f.base=l.base;}
;l.wrapper=f;f.original=l;return f;}
,addAdvice:function(q,o,p,name){this.__j.push({fcn:q,pos:o===b?-1:1,type:p,name:name});}
}});}
)();
(function(){var a='',b="ecmascript.string.trim",c="qx.lang.normalize.String";qx.Bootstrap.define(c,{statics:{trim:function(){return this.replace(/^\s+|\s+$/g,a);}
},defer:function(d){if(!qx.core.Environment.get(b)){String.prototype.trim=d.trim;}
;}
});}
)();
(function(){var a="ecmascript.object.keys",b="qx.lang.normalize.Object";qx.Bootstrap.define(b,{statics:{keys:qx.Bootstrap.keys},defer:function(c){if(!qx.core.Environment.get(a)){Object.keys=c.keys;}
;}
});}
)();
(function(){var a='Implementation of method "',b='"',c="function",d='" is not supported by Class "',e="Boolean",f="qx.Interface",g='The event "',h='" required by interface "',j='" is missing in class "',k='"!',m='The property "',n="Interface",o="toggle",p="]",q="[Interface ",r="is",s="Array",t='Implementation of member "';qx.Bootstrap.define(f,{statics:{define:function(name,v){if(v){if(v.extend&&!(qx.Bootstrap.getClass(v.extend)===s)){v.extend=[v.extend];}
;{}
;var u=v.statics?v.statics:{};if(v.extend){u.$$extends=v.extend;}
;if(v.properties){u.$$properties=v.properties;}
;if(v.members){u.$$members=v.members;}
;if(v.events){u.$$events=v.events;}
;}
else {var u={};}
;u.$$type=n;u.name=name;u.toString=this.genericToString;u.basename=qx.Bootstrap.createNamespace(name,u);qx.Interface.$$registry[name]=u;return u;}
,getByName:function(name){return this.$$registry[name];}
,isDefined:function(name){return this.getByName(name)!==undefined;}
,getTotalNumber:function(){return qx.Bootstrap.objectGetLength(this.$$registry);}
,flatten:function(x){if(!x){return [];}
;var w=x.concat();for(var i=0,l=x.length;i<l;i++ ){if(x[i].$$extends){w.push.apply(w,this.flatten(x[i].$$extends));}
;}
;return w;}
,__k:function(B,C,y,F,D){var z=y.$$members;if(z){for(var E in z){if(qx.Bootstrap.isFunction(z[E])){var H=this.__l(C,E);var A=H||qx.Bootstrap.isFunction(B[E]);if(!A){if(D){throw new Error(a+E+j+C.classname+h+y.name+b);}
else {return false;}
;}
;var G=F===true&&!H&&!qx.util.OOUtil.hasInterface(C,y);if(G){B[E]=this.__o(y,B[E],E,z[E]);}
;}
else {if(typeof B[E]===undefined){if(typeof B[E]!==c){if(D){throw new Error(t+E+j+C.classname+h+y.name+b);}
else {return false;}
;}
;}
;}
;}
;}
;if(!D){return true;}
;}
,__l:function(L,I){var N=I.match(/^(is|toggle|get|set|reset)(.*)$/);if(!N){return false;}
;var K=qx.Bootstrap.firstLow(N[2]);var M=qx.util.OOUtil.getPropertyDefinition(L,K);if(!M){return false;}
;var J=N[0]==r||N[0]==o;if(J){return qx.util.OOUtil.getPropertyDefinition(L,K).check==e;}
;return true;}
,__m:function(R,O,P){if(O.$$properties){for(var Q in O.$$properties){if(!qx.util.OOUtil.getPropertyDefinition(R,Q)){if(P){throw new Error(m+Q+d+R.classname+k);}
else {return false;}
;}
;}
;}
;if(!P){return true;}
;}
,__n:function(V,S,T){if(S.$$events){for(var U in S.$$events){if(!qx.util.OOUtil.supportsEvent(V,U)){if(T){throw new Error(g+U+d+V.classname+k);}
else {return false;}
;}
;}
;}
;if(!T){return true;}
;}
,assertObject:function(Y,W){var ba=Y.constructor;this.__k(Y,ba,W,false,true);this.__m(ba,W,true);this.__n(ba,W,true);var X=W.$$extends;if(X){for(var i=0,l=X.length;i<l;i++ ){this.assertObject(Y,X[i]);}
;}
;}
,assert:function(bd,bb,be){this.__k(bd.prototype,bd,bb,be,true);this.__m(bd,bb,true);this.__n(bd,bb,true);var bc=bb.$$extends;if(bc){for(var i=0,l=bc.length;i<l;i++ ){this.assert(bd,bc[i],be);}
;}
;}
,objectImplements:function(bh,bf){var bi=bh.constructor;if(!this.__k(bh,bi,bf)||!this.__m(bi,bf)||!this.__n(bi,bf)){return false;}
;var bg=bf.$$extends;if(bg){for(var i=0,l=bg.length;i<l;i++ ){if(!this.objectImplements(bh,bg[i])){return false;}
;}
;}
;return true;}
,classImplements:function(bl,bj){if(!this.__k(bl.prototype,bl,bj)||!this.__m(bl,bj)||!this.__n(bl,bj)){return false;}
;var bk=bj.$$extends;if(bk){for(var i=0,l=bk.length;i<l;i++ ){if(!this.has(bl,bk[i])){return false;}
;}
;}
;return true;}
,genericToString:function(){return q+this.name+p;}
,$$registry:{},__o:function(bo,bn,bp,bm){}
,__h:null,__i:function(name,bq){}
}});}
)();
(function(){var a="ecmascript.error.toString",b="qx.lang.normalize.Error",c=": ",d="Error",e="";qx.Bootstrap.define(b,{statics:{toString:function(){var name=this.name||d;var f=this.message||e;if(name===e&&f===e){return d;}
;if(name===e){return f;}
;if(f===e){return name;}
;return name+c+f;}
},defer:function(g){if(!qx.core.Environment.get(a)){Error.prototype.toString=g.toString;}
;}
});}
)();
(function(){var a="qx.lang.normalize.Date",b="ecmascript.date.now";qx.Bootstrap.define(a,{statics:{now:function(){return +new Date();}
},defer:function(c){if(!qx.core.Environment.get(b)){Date.now=c.now;}
;}
});}
)();
(function(){var b='!==inherit){',c='qx.lang.Type.isString(value) && qx.util.ColorUtil.isValidPropertyValue(value)',d='value !== null && qx.theme.manager.Font.getInstance().isDynamic(value)',e="set",f=';',g="resetThemed",h='value !== null && value.nodeType === 9 && value.documentElement',j='===value)return value;',k='value !== null && value.$$type === "Mixin"',m='return init;',n='var init=this.',o='value !== null && value.nodeType === 1 && value.attributes',p="var parent = this.getLayoutParent();",q="Error in property ",r='var a=this._getChildren();if(a)for(var i=0,l=a.length;i<l;i++){',s="property",t="();",u='.validate.call(this, value);',v='qx.core.Assert.assertInstance(value, Date, msg) || true',w='else{',x="if (!parent) return;",y=" in method ",z='qx.core.Assert.assertInstance(value, Error, msg) || true',A='=computed;',B='Undefined value is not allowed!',C='(backup);',D='else ',E='=true;',F='if(old===undefined)old=this.',G='if(computed===inherit){',H='old=computed=this.',I="inherit",J='if(this.',K='return this.',L='else if(this.',M='Is invalid!',N='if(value===undefined)prop.error(this,2,"',O='", "',P='var computed, old=this.',Q='else if(computed===undefined)',R='delete this.',S="resetRuntime",T="': ",U=" of class ",V='value !== null && value.nodeType !== undefined',W='===undefined)return;',X='value !== null && qx.theme.manager.Decoration.getInstance().isValidPropertyValue(value)',Y="reset",ba="string",bb="')){",bc="module.events",bd="return this.",be='qx.core.Assert.assertPositiveInteger(value, msg) || true',bf='else this.',bg='value=this.',bh='","',bi='if(init==qx.core.Property.$$inherit)init=null;',bj="get",bk='value !== null && value.$$type === "Interface"',bl='var inherit=prop.$$inherit;',bm="', qx.event.type.Data, [computed, old]",bn="var value = parent.",bo="$$useinit_",bp='computed=undefined;delete this.',bq="(value);",br='this.',bs="setThemed",bt='",value);',bu='computed=value;',bv='}else{',bw="$$runtime_",bx='Requires exactly one argument!',by=';}',bz='(value);',bA="$$user_",bB='!==undefined)',bC='){',bD='qx.core.Assert.assertArray(value, msg) || true',bE='if(computed===undefined||computed===inherit){',bF=";",bG='qx.core.Assert.assertPositiveNumber(value, msg) || true',bH=".prototype",bI="Boolean",bJ=")}",bK="(a[",bL='(computed, old, "',bM="setRuntime",bN='return value;',bO="this.",bP='if(init==qx.core.Property.$$inherit)throw new Error("Inheritable property ',bQ="if(reg.hasListener(this, '",bR='Does not allow any arguments!',bS=')a[i].',bT="()",bU="var a=arguments[0] instanceof Array?arguments[0]:arguments;",bV='.$$properties.',bW='value !== null && value.$$type === "Theme"',bX='old=this.',bY="var reg=qx.event.Registration;",ca="())",cb='=value;',cc='return null;',cd='qx.core.Assert.assertObject(value, msg) || true',ce='");',cf='if(old===computed)return value;',cg='qx.core.Assert.assertString(value, msg) || true',ch='if(old===undefined)old=null;',ci='var pa=this.getLayoutParent();if(pa)computed=pa.',cj="if (value===undefined) value = parent.",ck='value !== null && value.$$type === "Class"',cl='qx.core.Assert.assertFunction(value, msg) || true',cm='!==undefined&&',cn='var computed, old;',co='var backup=computed;',cp=".",cq='}',cr="object",cs="$$init_",ct="$$theme_",cu='!==undefined){',cv='if(computed===undefined)computed=null;',cw="Unknown reason: ",cx="init",cy='qx.core.Assert.assertMap(value, msg) || true',cz="qx.aspects",cA='qx.core.Assert.assertNumber(value, msg) || true',cB='if((computed===undefined||computed===inherit)&&',cC="reg.fireEvent(this, '",cD='Null value is not allowed!',cE='qx.core.Assert.assertInteger(value, msg) || true',cF="value",cG="shorthand",cH='computed=this.',cI='qx.core.Assert.assertInstance(value, RegExp, msg) || true',cJ='value !== null && value.type !== undefined',cK='value !== null && value.document',cL="",cM='throw new Error("Property ',cN="(!this.",cO='qx.core.Assert.assertBoolean(value, msg) || true',cP='if(a[i].',cQ=' of an instance of ',cR="toggle",cS="refresh",cT="$$inherit_",cU='var prop=qx.core.Property;',cV="boolean",cW=" with incoming value '",cX="a=qx.lang.Array.fromShortHand(qx.lang.Array.fromArguments(a));",cY='if(computed===undefined||computed==inherit)computed=null;',da="qx.core.Property",db="is",dc=' is not (yet) ready!");',dd="]);",de='Could not change or apply init value after constructing phase!';qx.Bootstrap.define(da,{statics:{__p:function(){if(qx.core.Environment.get(bc)){qx.event.type.Data;qx.event.dispatch.Direct;}
;}
,__q:{"Boolean":cO,"String":cg,"Number":cA,"Integer":cE,"PositiveNumber":bG,"PositiveInteger":be,"Error":z,"RegExp":cI,"Object":cd,"Array":bD,"Map":cy,"Function":cl,"Date":v,"Node":V,"Element":o,"Document":h,"Window":cK,"Event":cJ,"Class":ck,"Mixin":k,"Interface":bk,"Theme":bW,"Color":c,"Decorator":X,"Font":d},__r:{"Node":true,"Element":true,"Document":true,"Window":true,"Event":true},$$inherit:I,$$store:{runtime:{},user:{},theme:{},inherit:{},init:{},useinit:{}},$$method:{get:{},set:{},reset:{},init:{},refresh:{},setRuntime:{},resetRuntime:{},setThemed:{},resetThemed:{}},$$allowedKeys:{name:ba,dereference:cV,inheritable:cV,nullable:cV,themeable:cV,refine:cV,init:null,apply:ba,event:ba,check:null,transform:ba,deferredInit:cV,validate:null},$$allowedGroupKeys:{name:ba,group:cr,mode:ba,themeable:cV},$$inheritable:{},__s:function(dh){var df=this.__t(dh);if(!df.length){var dg=function(){}
;}
else {dg=this.__u(df);}
;dh.prototype.$$refreshInheritables=dg;}
,__t:function(di){var dj=[];while(di){var dk=di.$$properties;if(dk){for(var name in this.$$inheritable){if(dk[name]&&dk[name].inheritable){dj.push(name);}
;}
;}
;di=di.superclass;}
;return dj;}
,__u:function(inheritables){var inherit=this.$$store.inherit;var init=this.$$store.init;var refresh=this.$$method.refresh;var code=[p,x];for(var i=0,l=inheritables.length;i<l;i++ ){var name=inheritables[i];code.push(bn,inherit[name],bF,cj,init[name],bF,bO,refresh[name],bq);}
;return new Function(code.join(cL));}
,attachRefreshInheritables:function(dl){dl.prototype.$$refreshInheritables=function(){qx.core.Property.__s(dl);return this.$$refreshInheritables();}
;}
,attachMethods:function(dn,name,dm){dm.group?this.__v(dn,dm,name):this.__w(dn,dm,name);}
,__v:function(clazz,config,name){var upname=qx.Bootstrap.firstUp(name);var members=clazz.prototype;var themeable=config.themeable===true;{}
;var setter=[];var resetter=[];if(themeable){var styler=[];var unstyler=[];}
;var argHandler=bU;setter.push(argHandler);if(themeable){styler.push(argHandler);}
;if(config.mode==cG){var shorthand=cX;setter.push(shorthand);if(themeable){styler.push(shorthand);}
;}
;for(var i=0,a=config.group,l=a.length;i<l;i++ ){{}
;setter.push(bO,this.$$method.set[a[i]],bK,i,dd);resetter.push(bO,this.$$method.reset[a[i]],t);if(themeable){{}
;styler.push(bO,this.$$method.setThemed[a[i]],bK,i,dd);unstyler.push(bO,this.$$method.resetThemed[a[i]],t);}
;}
;this.$$method.set[name]=e+upname;members[this.$$method.set[name]]=new Function(setter.join(cL));this.$$method.reset[name]=Y+upname;members[this.$$method.reset[name]]=new Function(resetter.join(cL));if(themeable){this.$$method.setThemed[name]=bs+upname;members[this.$$method.setThemed[name]]=new Function(styler.join(cL));this.$$method.resetThemed[name]=g+upname;members[this.$$method.resetThemed[name]]=new Function(unstyler.join(cL));}
;}
,__w:function(clazz,config,name){var upname=qx.Bootstrap.firstUp(name);var members=clazz.prototype;{}
;if(config.dereference===undefined&&typeof config.check===ba){config.dereference=this.__x(config.check);}
;var method=this.$$method;var store=this.$$store;store.runtime[name]=bw+name;store.user[name]=bA+name;store.theme[name]=ct+name;store.init[name]=cs+name;store.inherit[name]=cT+name;store.useinit[name]=bo+name;method.get[name]=bj+upname;members[method.get[name]]=function(){return qx.core.Property.executeOptimizedGetter(this,clazz,name,bj);}
;method.set[name]=e+upname;members[method.set[name]]=function(dp){return qx.core.Property.executeOptimizedSetter(this,clazz,name,e,arguments);}
;method.reset[name]=Y+upname;members[method.reset[name]]=function(){return qx.core.Property.executeOptimizedSetter(this,clazz,name,Y);}
;if(config.inheritable||config.apply||config.event||config.deferredInit){method.init[name]=cx+upname;members[method.init[name]]=function(dq){return qx.core.Property.executeOptimizedSetter(this,clazz,name,cx,arguments);}
;{}
;}
;if(config.inheritable){method.refresh[name]=cS+upname;members[method.refresh[name]]=function(dr){return qx.core.Property.executeOptimizedSetter(this,clazz,name,cS,arguments);}
;{}
;}
;method.setRuntime[name]=bM+upname;members[method.setRuntime[name]]=function(ds){return qx.core.Property.executeOptimizedSetter(this,clazz,name,bM,arguments);}
;method.resetRuntime[name]=S+upname;members[method.resetRuntime[name]]=function(){return qx.core.Property.executeOptimizedSetter(this,clazz,name,S);}
;if(config.themeable){method.setThemed[name]=bs+upname;members[method.setThemed[name]]=function(dt){return qx.core.Property.executeOptimizedSetter(this,clazz,name,bs,arguments);}
;method.resetThemed[name]=g+upname;members[method.resetThemed[name]]=function(){return qx.core.Property.executeOptimizedSetter(this,clazz,name,g);}
;{}
;}
;if(config.check===bI){members[cR+upname]=new Function(bd+method.set[name]+cN+method.get[name]+ca);members[db+upname]=new Function(bd+method.get[name]+bT);{}
;}
;{}
;}
,__x:function(du){return !!this.__r[du];}
,__y:{'0':de,'1':bx,'2':B,'3':bR,'4':cD,'5':M},error:function(dv,dB,dA,dw,dx){var dy=dv.constructor.classname;var dz=q+dA+U+dy+y+this.$$method[dw][dA]+cW+dx+T;throw new Error(dz+(this.__y[dB]||cw+dB));}
,__z:function(instance,members,name,variant,code,args){var store=this.$$method[variant][name];{members[store]=new Function(cF,code.join(cL));}
;if(qx.core.Environment.get(cz)){members[store]=qx.core.Aspect.wrap(instance.classname+cp+store,members[store],s);}
;qx.Bootstrap.setDisplayName(members[store],instance.classname+bH,store);if(args===undefined){return instance[store]();}
else {return instance[store](args[0]);}
;}
,executeOptimizedGetter:function(dF,dE,name,dD){var dH=dE.$$properties[name];var dG=dE.prototype;var dC=[];var dI=this.$$store;dC.push(J,dI.runtime[name],bB);dC.push(K,dI.runtime[name],f);if(dH.inheritable){dC.push(L,dI.inherit[name],bB);dC.push(K,dI.inherit[name],f);dC.push(D);}
;dC.push(J,dI.user[name],bB);dC.push(K,dI.user[name],f);if(dH.themeable){dC.push(L,dI.theme[name],bB);dC.push(K,dI.theme[name],f);}
;if(dH.deferredInit&&dH.init===undefined){dC.push(L,dI.init[name],bB);dC.push(K,dI.init[name],f);}
;dC.push(D);if(dH.init!==undefined){if(dH.inheritable){dC.push(n,dI.init[name],f);if(dH.nullable){dC.push(bi);}
else if(dH.init!==undefined){dC.push(K,dI.init[name],f);}
else {dC.push(bP,name,cQ,dE.classname,dc);}
;dC.push(m);}
else {dC.push(K,dI.init[name],f);}
;}
else if(dH.inheritable||dH.nullable){dC.push(cc);}
else {dC.push(cM,name,cQ,dE.classname,dc);}
;return this.__z(dF,dG,name,dD,dC);}
,executeOptimizedSetter:function(dP,dO,name,dN,dM){var dR=dO.$$properties[name];var dQ=dO.prototype;var dK=[];var dJ=dN===e||dN===bs||dN===bM||(dN===cx&&dR.init===undefined);var dL=dR.apply||dR.event||dR.inheritable;var dS=this.__A(dN,name);this.__B(dK,dR,name,dN,dJ);if(dJ){this.__C(dK,dO,dR,name);}
;if(dL){this.__D(dK,dJ,dS,dN);}
;if(dR.inheritable){dK.push(bl);}
;{}
;if(!dL){this.__F(dK,name,dN,dJ);}
else {this.__G(dK,dR,name,dN,dJ);}
;if(dR.inheritable){this.__H(dK,dR,name,dN);}
else if(dL){this.__I(dK,dR,name,dN);}
;if(dL){this.__J(dK,dR,name,dN);if(dR.inheritable&&dQ._getChildren){this.__K(dK,name);}
;}
;if(dJ){dK.push(bN);}
;return this.__z(dP,dQ,name,dN,dK,dM);}
,__A:function(dT,name){if(dT===bM||dT===S){var dU=this.$$store.runtime[name];}
else if(dT===bs||dT===g){dU=this.$$store.theme[name];}
else if(dT===cx){dU=this.$$store.init[name];}
else {dU=this.$$store.user[name];}
;return dU;}
,__B:function(dX,dV,name,dY,dW){{if(!dV.nullable||dV.check||dV.inheritable){dX.push(cU);}
;if(dY===e){dX.push(N,name,bh,dY,bt);}
;}
;}
,__C:function(ea,ec,eb,name){if(eb.transform){ea.push(bg,eb.transform,bz);}
;if(eb.validate){if(typeof eb.validate===ba){ea.push(br,eb.validate,bz);}
else if(eb.validate instanceof Function){ea.push(ec.classname,bV,name);ea.push(u);}
;}
;}
,__D:function(ee,ed,eg,ef){var eh=(ef===Y||ef===g||ef===S);if(ed){ee.push(J,eg,j);}
else if(eh){ee.push(J,eg,W);}
;}
,__E:undefined,__F:function(ej,name,ek,ei){if(ek===bM){ej.push(br,this.$$store.runtime[name],cb);}
else if(ek===S){ej.push(J,this.$$store.runtime[name],bB);ej.push(R,this.$$store.runtime[name],f);}
else if(ek===e){ej.push(br,this.$$store.user[name],cb);}
else if(ek===Y){ej.push(J,this.$$store.user[name],bB);ej.push(R,this.$$store.user[name],f);}
else if(ek===bs){ej.push(br,this.$$store.theme[name],cb);}
else if(ek===g){ej.push(J,this.$$store.theme[name],bB);ej.push(R,this.$$store.theme[name],f);}
else if(ek===cx&&ei){ej.push(br,this.$$store.init[name],cb);}
;}
,__G:function(en,el,name,eo,em){if(el.inheritable){en.push(P,this.$$store.inherit[name],f);}
else {en.push(cn);}
;en.push(J,this.$$store.runtime[name],cu);if(eo===bM){en.push(cH,this.$$store.runtime[name],cb);}
else if(eo===S){en.push(R,this.$$store.runtime[name],f);en.push(J,this.$$store.user[name],bB);en.push(cH,this.$$store.user[name],f);en.push(L,this.$$store.theme[name],bB);en.push(cH,this.$$store.theme[name],f);en.push(L,this.$$store.init[name],cu);en.push(cH,this.$$store.init[name],f);en.push(br,this.$$store.useinit[name],E);en.push(cq);}
else {en.push(H,this.$$store.runtime[name],f);if(eo===e){en.push(br,this.$$store.user[name],cb);}
else if(eo===Y){en.push(R,this.$$store.user[name],f);}
else if(eo===bs){en.push(br,this.$$store.theme[name],cb);}
else if(eo===g){en.push(R,this.$$store.theme[name],f);}
else if(eo===cx&&em){en.push(br,this.$$store.init[name],cb);}
;}
;en.push(cq);en.push(L,this.$$store.user[name],cu);if(eo===e){if(!el.inheritable){en.push(bX,this.$$store.user[name],f);}
;en.push(cH,this.$$store.user[name],cb);}
else if(eo===Y){if(!el.inheritable){en.push(bX,this.$$store.user[name],f);}
;en.push(R,this.$$store.user[name],f);en.push(J,this.$$store.runtime[name],bB);en.push(cH,this.$$store.runtime[name],f);en.push(J,this.$$store.theme[name],bB);en.push(cH,this.$$store.theme[name],f);en.push(L,this.$$store.init[name],cu);en.push(cH,this.$$store.init[name],f);en.push(br,this.$$store.useinit[name],E);en.push(cq);}
else {if(eo===bM){en.push(cH,this.$$store.runtime[name],cb);}
else if(el.inheritable){en.push(cH,this.$$store.user[name],f);}
else {en.push(H,this.$$store.user[name],f);}
;if(eo===bs){en.push(br,this.$$store.theme[name],cb);}
else if(eo===g){en.push(R,this.$$store.theme[name],f);}
else if(eo===cx&&em){en.push(br,this.$$store.init[name],cb);}
;}
;en.push(cq);if(el.themeable){en.push(L,this.$$store.theme[name],cu);if(!el.inheritable){en.push(bX,this.$$store.theme[name],f);}
;if(eo===bM){en.push(cH,this.$$store.runtime[name],cb);}
else if(eo===e){en.push(cH,this.$$store.user[name],cb);}
else if(eo===bs){en.push(cH,this.$$store.theme[name],cb);}
else if(eo===g){en.push(R,this.$$store.theme[name],f);en.push(J,this.$$store.init[name],cu);en.push(cH,this.$$store.init[name],f);en.push(br,this.$$store.useinit[name],E);en.push(cq);}
else if(eo===cx){if(em){en.push(br,this.$$store.init[name],cb);}
;en.push(cH,this.$$store.theme[name],f);}
else if(eo===cS){en.push(cH,this.$$store.theme[name],f);}
;en.push(cq);}
;en.push(L,this.$$store.useinit[name],bC);if(!el.inheritable){en.push(bX,this.$$store.init[name],f);}
;if(eo===cx){if(em){en.push(cH,this.$$store.init[name],cb);}
else {en.push(cH,this.$$store.init[name],f);}
;}
else if(eo===e||eo===bM||eo===bs||eo===cS){en.push(R,this.$$store.useinit[name],f);if(eo===bM){en.push(cH,this.$$store.runtime[name],cb);}
else if(eo===e){en.push(cH,this.$$store.user[name],cb);}
else if(eo===bs){en.push(cH,this.$$store.theme[name],cb);}
else if(eo===cS){en.push(cH,this.$$store.init[name],f);}
;}
;en.push(cq);if(eo===e||eo===bM||eo===bs||eo===cx){en.push(w);if(eo===bM){en.push(cH,this.$$store.runtime[name],cb);}
else if(eo===e){en.push(cH,this.$$store.user[name],cb);}
else if(eo===bs){en.push(cH,this.$$store.theme[name],cb);}
else if(eo===cx){if(em){en.push(cH,this.$$store.init[name],cb);}
else {en.push(cH,this.$$store.init[name],f);}
;en.push(br,this.$$store.useinit[name],E);}
;en.push(cq);}
;}
,__H:function(eq,ep,name,er){eq.push(bE);if(er===cS){eq.push(bu);}
else {eq.push(ci,this.$$store.inherit[name],f);}
;eq.push(cB);eq.push(br,this.$$store.init[name],cm);eq.push(br,this.$$store.init[name],b);eq.push(cH,this.$$store.init[name],f);eq.push(br,this.$$store.useinit[name],E);eq.push(bv);eq.push(R,this.$$store.useinit[name],by);eq.push(cq);eq.push(cf);eq.push(G);eq.push(bp,this.$$store.inherit[name],f);eq.push(cq);eq.push(Q);eq.push(R,this.$$store.inherit[name],f);eq.push(bf,this.$$store.inherit[name],A);eq.push(co);if(ep.init!==undefined&&er!==cx){eq.push(F,this.$$store.init[name],bF);}
else {eq.push(ch);}
;eq.push(cY);}
,__I:function(et,es,name,eu){if(eu!==e&&eu!==bM&&eu!==bs){et.push(cv);}
;et.push(cf);if(es.init!==undefined&&eu!==cx){et.push(F,this.$$store.init[name],bF);}
else {et.push(ch);}
;}
,__J:function(ew,ev,name,ex){if(ev.apply){ew.push(br,ev.apply,bL,name,O,ex,ce);}
;if(ev.event){ew.push(bY,bQ,ev.event,bb,cC,ev.event,bm,bJ);}
;}
,__K:function(ey,name){ey.push(r);ey.push(cP,this.$$method.refresh[name],bS,this.$$method.refresh[name],C);ey.push(cq);}
}});}
)();
(function(){var b=".prototype",c="$$init_",d="constructor",e="Property module disabled.",f="extend",g="module.property",h="singleton",j="qx.event.type.Data",k="module.events",m="qx.aspects",n="toString",o='extend',p="Array",q="static",r="",s="Events module not enabled.",t="]",u="Class",v="qx.Class",w='"extend" parameter is null or undefined',x="[Class ",y="destructor",z="destruct",A=".",B="member";qx.Bootstrap.define(v,{statics:{__L:qx.core.Environment.get(g)?qx.core.Property:null,define:function(name,F){if(!F){F={};}
;if(F.include&&!(qx.Bootstrap.getClass(F.include)===p)){F.include=[F.include];}
;if(F.implement&&!(qx.Bootstrap.getClass(F.implement)===p)){F.implement=[F.implement];}
;var C=false;if(!F.hasOwnProperty(f)&&!F.type){F.type=q;C=true;}
;{}
;var D=this.__O(name,F.type,F.extend,F.statics,F.construct,F.destruct,F.include);if(F.extend){if(F.properties){this.__Q(D,F.properties,true);}
;if(F.members){this.__S(D,F.members,true,true,false);}
;if(F.events){this.__P(D,F.events,true);}
;if(F.include){for(var i=0,l=F.include.length;i<l;i++ ){this.__W(D,F.include[i],false);}
;}
;}
else if(F.hasOwnProperty(o)&&false){throw new Error(w);}
;if(F.environment){for(var E in F.environment){qx.core.Environment.add(E,F.environment[E]);}
;}
;if(F.implement){for(var i=0,l=F.implement.length;i<l;i++ ){this.__U(D,F.implement[i]);}
;}
;{}
;if(F.defer){F.defer.self=D;F.defer(D,D.prototype,{add:function(name,G){var H={};H[name]=G;qx.Class.__Q(D,H,true);}
});}
;return D;}
,undefine:function(name){delete this.$$registry[name];var K=name.split(A);var J=[window];for(var i=0;i<K.length;i++ ){J.push(J[i][K[i]]);}
;for(var i=J.length-1;i>=1;i-- ){var I=J[i];var parent=J[i-1];if(qx.Bootstrap.isFunction(I)||qx.Bootstrap.objectGetLength(I)===0){delete parent[K[i-1]];}
else {break;}
;}
;}
,isDefined:qx.util.OOUtil.classIsDefined,getTotalNumber:function(){return qx.Bootstrap.objectGetLength(this.$$registry);}
,getByName:qx.Bootstrap.getByName,include:function(M,L){{}
;qx.Class.__W(M,L,false);}
,patch:function(O,N){{}
;qx.Class.__W(O,N,true);}
,isSubClassOf:function(Q,P){if(!Q){return false;}
;if(Q==P){return true;}
;if(Q.prototype instanceof P){return true;}
;return false;}
,getPropertyDefinition:qx.util.OOUtil.getPropertyDefinition,getProperties:function(S){var R=[];while(S){if(S.$$properties){R.push.apply(R,Object.keys(S.$$properties));}
;S=S.superclass;}
;return R;}
,getByProperty:function(T,name){while(T){if(T.$$properties&&T.$$properties[name]){return T;}
;T=T.superclass;}
;return null;}
,hasProperty:qx.util.OOUtil.hasProperty,getEventType:qx.util.OOUtil.getEventType,supportsEvent:qx.util.OOUtil.supportsEvent,hasOwnMixin:function(V,U){return V.$$includes&&V.$$includes.indexOf(U)!==-1;}
,getByMixin:function(Y,X){var W,i,l;while(Y){if(Y.$$includes){W=Y.$$flatIncludes;for(i=0,l=W.length;i<l;i++ ){if(W[i]===X){return Y;}
;}
;}
;Y=Y.superclass;}
;return null;}
,getMixins:qx.util.OOUtil.getMixins,hasMixin:function(bb,ba){return !!this.getByMixin(bb,ba);}
,hasOwnInterface:function(bd,bc){return bd.$$implements&&bd.$$implements.indexOf(bc)!==-1;}
,getByInterface:qx.util.OOUtil.getByInterface,getInterfaces:function(bf){var be=[];while(bf){if(bf.$$implements){be.push.apply(be,bf.$$flatImplements);}
;bf=bf.superclass;}
;return be;}
,hasInterface:qx.util.OOUtil.hasInterface,implementsInterface:function(bh,bg){var bi=bh.constructor;if(this.hasInterface(bi,bg)){return true;}
;if(qx.Interface.objectImplements(bh,bg)){return true;}
;if(qx.Interface.classImplements(bi,bg)){return true;}
;return false;}
,getInstance:function(){if(!this.$$instance){this.$$allowconstruct=true;this.$$instance=new this();delete this.$$allowconstruct;}
;return this.$$instance;}
,genericToString:function(){return x+this.classname+t;}
,$$registry:qx.Bootstrap.$$registry,__h:null,__M:null,__i:function(name,bj){}
,__N:function(bk){}
,__O:function(name,bu,bt,bl,br,bp,bo){var bq;if(!bt&&qx.core.Environment.get(m)==false){bq=bl||{};qx.Bootstrap.setDisplayNames(bq,name);}
else {bq={};if(bt){if(!br){br=this.__X();}
;if(this.__Y(bt,bo)){bq=this.__ba(br,name,bu);}
else {bq=br;}
;if(bu===h){bq.getInstance=this.getInstance;}
;qx.Bootstrap.setDisplayName(br,name,d);}
;if(bl){qx.Bootstrap.setDisplayNames(bl,name);var bs;for(var i=0,a=Object.keys(bl),l=a.length;i<l;i++ ){bs=a[i];var bm=bl[bs];if(qx.core.Environment.get(m)){if(bm instanceof Function){bm=qx.core.Aspect.wrap(name+A+bs,bm,q);}
;bq[bs]=bm;}
else {bq[bs]=bm;}
;}
;}
;}
;var bn=name?qx.Bootstrap.createNamespace(name,bq):r;bq.name=bq.classname=name;bq.basename=bn;bq.$$type=u;if(bu){bq.$$classtype=bu;}
;if(!bq.hasOwnProperty(n)){bq.toString=this.genericToString;}
;if(bt){qx.Bootstrap.extendClass(bq,br,bt,name,bn);if(bp){if(qx.core.Environment.get(m)){bp=qx.core.Aspect.wrap(name,bp,y);}
;bq.$$destructor=bp;qx.Bootstrap.setDisplayName(bp,name,z);}
;}
;this.$$registry[name]=bq;return bq;}
,__P:function(bv,bw,by){{var bx,bx;}
;if(bv.$$events){for(var bx in bw){bv.$$events[bx]=bw[bx];}
;}
else {bv.$$events=bw;}
;}
,__Q:function(bA,bD,bB){if(!qx.core.Environment.get(g)){throw new Error(e);}
;var bC;if(bB===undefined){bB=false;}
;var bz=bA.prototype;for(var name in bD){bC=bD[name];{}
;bC.name=name;if(!bC.refine){if(bA.$$properties===undefined){bA.$$properties={};}
;bA.$$properties[name]=bC;}
;if(bC.init!==undefined){bA.prototype[c+name]=bC.init;}
;if(bC.event!==undefined){if(!qx.core.Environment.get(k)){throw new Error(s);}
;var event={};event[bC.event]=j;this.__P(bA,event,bB);}
;if(bC.inheritable){this.__L.$$inheritable[name]=true;if(!bz.$$refreshInheritables){this.__L.attachRefreshInheritables(bA);}
;}
;if(!bC.refine){this.__L.attachMethods(bA,name,bC);}
;}
;}
,__R:null,__S:function(bL,bE,bG,bI,bK){var bF=bL.prototype;var bJ,bH;qx.Bootstrap.setDisplayNames(bE,bL.classname+b);for(var i=0,a=Object.keys(bE),l=a.length;i<l;i++ ){bJ=a[i];bH=bE[bJ];{}
;if(bI!==false&&bH instanceof Function&&bH.$$type==null){if(bK==true){bH=this.__T(bH,bF[bJ]);}
else {if(bF[bJ]){bH.base=bF[bJ];}
;bH.self=bL;}
;if(qx.core.Environment.get(m)){bH=qx.core.Aspect.wrap(bL.classname+A+bJ,bH,B);}
;}
;bF[bJ]=bH;}
;}
,__T:function(bM,bN){if(bN){return function(){var bP=bM.base;bM.base=bN;var bO=bM.apply(this,arguments);bM.base=bP;return bO;}
;}
else {return bM;}
;}
,__U:function(bS,bQ){{}
;var bR=qx.Interface.flatten([bQ]);if(bS.$$implements){bS.$$implements.push(bQ);bS.$$flatImplements.push.apply(bS.$$flatImplements,bR);}
else {bS.$$implements=[bQ];bS.$$flatImplements=bR;}
;}
,__V:function(bU){var name=bU.classname;var bT=this.__ba(bU,name,bU.$$classtype);for(var i=0,a=Object.keys(bU),l=a.length;i<l;i++ ){bV=a[i];bT[bV]=bU[bV];}
;bT.prototype=bU.prototype;var bX=bU.prototype;for(var i=0,a=Object.keys(bX),l=a.length;i<l;i++ ){bV=a[i];var bY=bX[bV];if(bY&&bY.self==bU){bY.self=bT;}
;}
;for(var bV in this.$$registry){var bW=this.$$registry[bV];if(!bW){continue;}
;if(bW.base==bU){bW.base=bT;}
;if(bW.superclass==bU){bW.superclass=bT;}
;if(bW.$$original){if(bW.$$original.base==bU){bW.$$original.base=bT;}
;if(bW.$$original.superclass==bU){bW.$$original.superclass=bT;}
;}
;}
;qx.Bootstrap.createNamespace(name,bT);this.$$registry[name]=bT;return bT;}
,__W:function(cf,cd,cc){{}
;if(this.hasMixin(cf,cd)){return;}
;var ca=cf.$$original;if(cd.$$constructor&&!ca){cf=this.__V(cf);}
;var cb=qx.Mixin.flatten([cd]);var ce;for(var i=0,l=cb.length;i<l;i++ ){ce=cb[i];if(ce.$$events){this.__P(cf,ce.$$events,cc);}
;if(ce.$$properties){this.__Q(cf,ce.$$properties,cc);}
;if(ce.$$members){this.__S(cf,ce.$$members,cc,cc,cc);}
;}
;if(cf.$$includes){cf.$$includes.push(cd);cf.$$flatIncludes.push.apply(cf.$$flatIncludes,cb);}
else {cf.$$includes=[cd];cf.$$flatIncludes=cb;}
;}
,__X:function(){function cg(){cg.base.apply(this,arguments);}
;return cg;}
,__Y:function(ci,ch){{}
;if(ci&&ci.$$includes){var cj=ci.$$flatIncludes;for(var i=0,l=cj.length;i<l;i++ ){if(cj[i].$$constructor){return true;}
;}
;}
;if(ch){var ck=qx.Mixin.flatten(ch);for(var i=0,l=ck.length;i<l;i++ ){if(ck[i].$$constructor){return true;}
;}
;}
;return false;}
,__ba:function(cm,name,cl){var co=function(){var cr=co;{}
;var cp=cr.$$original.apply(this,arguments);if(cr.$$includes){var cq=cr.$$flatIncludes;for(var i=0,l=cq.length;i<l;i++ ){if(cq[i].$$constructor){cq[i].$$constructor.apply(this,arguments);}
;}
;}
;{}
;return cp;}
;if(qx.core.Environment.get(m)){var cn=qx.core.Aspect.wrap(name,co,d);co.$$original=cm;co.constructor=cn;co=cn;}
;co.$$original=cm;cm.wrapper=co;return co;}
},defer:function(){if(qx.core.Environment.get(m)){for(var cs in qx.Bootstrap.$$registry){var ct=qx.Bootstrap.$$registry[cs];for(var cu in ct){if(ct[cu] instanceof Function){ct[cu]=qx.core.Aspect.wrap(cs+A+cu,ct[cu],q);}
;}
;}
;}
;}
});}
)();
(function(){var a="qx.data.MBinding";qx.Mixin.define(a,{construct:function(){this.__bb=this.toHashCode();}
,members:{__bb:null,bind:function(b,e,c,d){return qx.data.SingleValueBinding.bind(this,b,e,c,d);}
,removeBinding:function(f){qx.data.SingleValueBinding.removeBindingFromObject(this,f);}
,removeRelatedBindings:function(g){qx.data.SingleValueBinding.removeRelatedBindings(this,g);}
,removeAllBindings:function(){qx.data.SingleValueBinding.removeAllBindingsForObject(this);}
,getBindings:function(){return qx.data.SingleValueBinding.getAllBindingsForObject(this);}
},destruct:function(){this.$$hash=this.__bb;this.removeAllBindings();delete this.$$hash;}
});}
)();
(function(){var a="qx.debug.databinding",b=". Error message: ",c="Boolean",d="Data after conversion: ",f="set",g="deepBinding",h=")",k=") to the object '",l="item",m="Please use only one array at a time: ",n="Binding executed from ",p="Integer",q="reset",r=" of object ",s="qx.data.SingleValueBinding",t="Binding property ",u="Failed so set value ",v=").",w="change",x="Binding could not be found!",y="get",z="^",A=" does not work.",B="String",C=" to ",D="Binding from '",E="",F=" (",G="PositiveNumber",H="Data before conversion: ",I="]",J="[",K=".",L="PositiveInteger",M='No number or \'last\' value hast been given in an array binding: ',N="' (",O=" on ",P="Binding does not exist!",Q="Number",R=".[",S=" by ",T="Date",U=" not possible: No event available. ",V="last";qx.Class.define(s,{statics:{__bc:{},__bd:{},bind:function(bj,bd,bo,bl,br){{}
;var bn=this.__bf(bj,bd,bo,bl,br);var Y=bd.split(K);var X=this.__bn(Y);var bb=[];var bp=[];var ba=[];var bc=[];var bh=bj;try{for(var i=0;i<Y.length;i++ ){if(X[i]!==E){bc.push(w);}
else {var bg=this.__bg(bh,Y[i]);if(!bg){if(i==0){throw new qx.core.AssertionError(t+Y[i]+r+bh+U);}
;this.__bm(undefined,bo,bl,br,bj);break;}
;bc.push(bg);}
;bb[i]=bh;if(i==Y.length-1){if(X[i]!==E){var bi=X[i]===V?bh.length-1:X[i];var W=bh.getItem(bi);this.__bm(W,bo,bl,br,bj);ba[i]=this.__bo(bh,bc[i],bo,bl,br,X[i]);}
else {if(Y[i]!=null&&bh[y+qx.lang.String.firstUp(Y[i])]!=null){var W=bh[y+qx.lang.String.firstUp(Y[i])]();this.__bm(W,bo,bl,br,bj);}
;ba[i]=this.__bo(bh,bc[i],bo,bl,br);}
;}
else {var bq={index:i,propertyNames:Y,sources:bb,listenerIds:ba,arrayIndexValues:X,targetObject:bo,targetPropertyChain:bl,options:br,listeners:bp};var bm=qx.lang.Function.bind(this.__be,this,bq);bp.push(bm);ba[i]=bh.addListener(bc[i],bm);}
;if(bh[y+qx.lang.String.firstUp(Y[i])]==null){bh=undefined;}
else if(X[i]!==E){var bi=X[i]===V?bh.length-1:X[i];bh=bh[y+qx.lang.String.firstUp(Y[i])](bi);}
else {bh=bh[y+qx.lang.String.firstUp(Y[i])]();if(bh===null&&(Y.length-1)!=i){bh=undefined;}
;}
;if(!bh){this.__bm(bh,bo,bl,br,bj);break;}
;}
;}
catch(bs){for(var i=0;i<bb.length;i++ ){if(bb[i]&&ba[i]){bb[i].removeListenerById(ba[i]);}
;}
;var be=bn.targets;var bk=bn.listenerIds;for(var i=0;i<be.length;i++ ){if(be[i]&&bk[i]){be[i].removeListenerById(bk[i]);}
;}
;throw bs;}
;var bf={type:g,listenerIds:ba,sources:bb,targetListenerIds:bn.listenerIds,targets:bn.targets};this.__bp(bf,bj,bd,bo,bl);return bf;}
,__be:function(bz){if(bz.options&&bz.options.onUpdate){bz.options.onUpdate(bz.sources[bz.index],bz.targetObject);}
;for(var j=bz.index+1;j<bz.propertyNames.length;j++ ){var bx=bz.sources[j];bz.sources[j]=null;if(!bx){continue;}
;bx.removeListenerById(bz.listenerIds[j]);}
;var bx=bz.sources[bz.index];for(var j=bz.index+1;j<bz.propertyNames.length;j++ ){if(bz.arrayIndexValues[j-1]!==E){bx=bx[y+qx.lang.String.firstUp(bz.propertyNames[j-1])](bz.arrayIndexValues[j-1]);}
else {bx=bx[y+qx.lang.String.firstUp(bz.propertyNames[j-1])]();}
;bz.sources[j]=bx;if(!bx){if(bz.options&&bz.options.converter){var bt=false;if(bz.options.ignoreConverter){var bA=bz.propertyNames.slice(0,j).join(K);var by=bA.match(new RegExp(z+bz.options.ignoreConverter));bt=by?by.length>0:false;}
;if(!bt){this.__bi(bz.targetObject,bz.targetPropertyChain,bz.options.converter());}
else {this.__bh(bz.targetObject,bz.targetPropertyChain);}
;}
else {this.__bh(bz.targetObject,bz.targetPropertyChain);}
;break;}
;if(j==bz.propertyNames.length-1){if(qx.Class.implementsInterface(bx,qx.data.IListData)){var bB=bz.arrayIndexValues[j]===V?bx.length-1:bz.arrayIndexValues[j];var bu=bx.getItem(bB);this.__bm(bu,bz.targetObject,bz.targetPropertyChain,bz.options,bz.sources[bz.index]);bz.listenerIds[j]=this.__bo(bx,w,bz.targetObject,bz.targetPropertyChain,bz.options,bz.arrayIndexValues[j]);}
else {if(bz.propertyNames[j]!=null&&bx[y+qx.lang.String.firstUp(bz.propertyNames[j])]!=null){var bu=bx[y+qx.lang.String.firstUp(bz.propertyNames[j])]();this.__bm(bu,bz.targetObject,bz.targetPropertyChain,bz.options,bz.sources[bz.index]);}
;var bv=this.__bg(bx,bz.propertyNames[j]);if(!bv){this.__bh(bz.targetObject,bz.targetPropertyChain);break;}
;bz.listenerIds[j]=this.__bo(bx,bv,bz.targetObject,bz.targetPropertyChain,bz.options);}
;}
else {if(bz.listeners[j]==null){var bw=qx.lang.Function.bind(this.__be,this,bz);bz.listeners.push(bw);}
;if(qx.Class.implementsInterface(bx,qx.data.IListData)){var bv=w;}
else {var bv=this.__bg(bx,bz.propertyNames[j]);}
;if(!bv){this.__bh(bz.targetObject,bz.targetPropertyChain);return;}
;bz.listenerIds[j]=bx.addListener(bv,bz.listeners[j]);}
;}
;}
,__bf:function(bE,bM,bQ,bI,bK){var bH=bI.split(K);var bF=this.__bn(bH);var bP=[];var bO=[];var bJ=[];var bN=[];var bG=bQ;for(var i=0;i<bH.length-1;i++ ){if(bF[i]!==E){bN.push(w);}
else {var bD=this.__bg(bG,bH[i]);if(!bD){break;}
;bN.push(bD);}
;bP[i]=bG;var bL=function(){for(var j=i+1;j<bH.length-1;j++ ){var bT=bP[j];bP[j]=null;if(!bT){continue;}
;bT.removeListenerById(bJ[j]);}
;var bT=bP[i];for(var j=i+1;j<bH.length-1;j++ ){var bR=qx.lang.String.firstUp(bH[j-1]);if(bF[j-1]!==E){var bU=bF[j-1]===V?bT.getLength()-1:bF[j-1];bT=bT[y+bR](bU);}
else {bT=bT[y+bR]();}
;bP[j]=bT;if(bO[j]==null){bO.push(bL);}
;if(qx.Class.implementsInterface(bT,qx.data.IListData)){var bS=w;}
else {var bS=qx.data.SingleValueBinding.__bg(bT,bH[j]);if(!bS){break;}
;}
;bJ[j]=bT.addListener(bS,bO[j]);}
;qx.data.SingleValueBinding.updateTarget(bE,bM,bQ,bI,bK);}
;bO.push(bL);bJ[i]=bG.addListener(bN[i],bL);var bC=qx.lang.String.firstUp(bH[i]);if(bG[y+bC]==null){bG=null;}
else if(bF[i]!==E){bG=bG[y+bC](bF[i]);}
else {bG=bG[y+bC]();}
;if(!bG){break;}
;}
;return {listenerIds:bJ,targets:bP};}
,updateTarget:function(bV,bY,cb,bW,ca){var bX=this.resolvePropertyChain(bV,bY);bX=qx.data.SingleValueBinding.__bq(bX,cb,bW,ca,bV);this.__bi(cb,bW,bX);}
,resolvePropertyChain:function(o,cc){var cd=this.__bk(cc);return this.__bl(o,cd,cd.length);}
,__bg:function(cf,cg){var ce=this.__br(cf,cg);if(ce==null){if(qx.Class.supportsEvent(cf.constructor,cg)){ce=cg;}
else if(qx.Class.supportsEvent(cf.constructor,w+qx.lang.String.firstUp(cg))){ce=w+qx.lang.String.firstUp(cg);}
else {return null;}
;}
;return ce;}
,__bh:function(cl,cj){var ck=this.__bk(cj);var ci=this.__bl(cl,ck);if(ci!=null){var cm=ck[ck.length-1];var ch=this.__bj(cm);if(ch){this.__bi(cl,cj,null);return;}
;if(ci[q+qx.lang.String.firstUp(cm)]!=undefined){ci[q+qx.lang.String.firstUp(cm)]();}
else {ci[f+qx.lang.String.firstUp(cm)](null);}
;}
;}
,__bi:function(cs,cp,cq){var cr=this.__bk(cp);var co=this.__bl(cs,cr);if(co){var ct=cr[cr.length-1];var cn=this.__bj(ct);if(cn){if(cn===V){cn=co.length-1;}
;co.setItem(cn,cq);}
else {co[f+qx.lang.String.firstUp(ct)](cq);}
;}
;}
,__bj:function(cw){var cu=/^\[(\d+|last)\]$/;var cv=cw.match(cu);if(cv){return cv[1];}
;return null;}
,__bk:function(cx){return cx.replace(/\[/g,R).split(K).filter(function(cy){return cy!==E;}
);}
,__bl:function(cE,cz,cA){cA=cA||cz.length-1;var cC=cE;for(var i=0;i<cA;i++ ){try{var cB=cz[i];var cD=this.__bj(cB);if(cD){if(cD===V){cD=cC.length-1;}
;cC=cC.getItem(cD);}
else {cC=cC[y+qx.lang.String.firstUp(cB)]();}
;}
catch(cF){return null;}
;}
;return cC;}
,__bm:function(cK,cG,cI,cJ,cH){cK=this.__bq(cK,cG,cI,cJ,cH);if(cK===undefined){this.__bh(cG,cI);}
;if(cK!==undefined){try{this.__bi(cG,cI,cK);if(cJ&&cJ.onUpdate){cJ.onUpdate(cH,cG,cK);}
;}
catch(e){if(!(e instanceof qx.core.ValidationError)){throw e;}
;if(cJ&&cJ.onSetFail){cJ.onSetFail(e);}
else {qx.log.Logger.warn(u+cK+O+cG+b+e);}
;}
;}
;}
,__bn:function(cL){var cM=[];for(var i=0;i<cL.length;i++ ){var name=cL[i];if(qx.lang.String.endsWith(name,I)){var cN=name.substring(name.indexOf(J)+1,name.indexOf(I));if(name.indexOf(I)!=name.length-1){throw new Error(m+name+A);}
;if(cN!==V){if(cN==E||isNaN(parseInt(cN,10))){throw new Error(M+name+A);}
;}
;if(name.indexOf(J)!=0){cL[i]=name.substring(0,name.indexOf(J));cM[i]=E;cM[i+1]=cN;cL.splice(i+1,0,l);i++ ;}
else {cM[i]=cN;cL.splice(i,1,l);}
;}
else {cM[i]=E;}
;}
;return cM;}
,__bo:function(cO,cR,cW,cU,cS,cQ){{var cP;}
;var cT=function(da,e){if(da!==E){if(da===V){da=cO.length-1;}
;var db=cO.getItem(da);if(db===undefined){qx.data.SingleValueBinding.__bh(cW,cU);}
;var cY=e.getData().start;var cX=e.getData().end;if(da<cY||da>cX){return;}
;}
else {var db=e.getData();}
;if(qx.core.Environment.get(a)){qx.log.Logger.debug(n+cO+S+cR+C+cW+F+cU+h);qx.log.Logger.debug(H+db);}
;db=qx.data.SingleValueBinding.__bq(db,cW,cU,cS,cO);if(qx.core.Environment.get(a)){qx.log.Logger.debug(d+db);}
;try{if(db!==undefined){qx.data.SingleValueBinding.__bi(cW,cU,db);}
else {qx.data.SingleValueBinding.__bh(cW,cU);}
;if(cS&&cS.onUpdate){cS.onUpdate(cO,cW,db);}
;}
catch(dc){if(!(dc instanceof qx.core.ValidationError)){throw dc;}
;if(cS&&cS.onSetFail){cS.onSetFail(dc);}
else {qx.log.Logger.warn(u+db+O+cW+b+dc);}
;}
;}
;if(!cQ){cQ=E;}
;cT=qx.lang.Function.bind(cT,cO,cQ);var cV=cO.addListener(cR,cT);return cV;}
,__bp:function(di,dd,dg,dj,dh){var de;de=dd.toHashCode();if(this.__bc[de]===undefined){this.__bc[de]=[];}
;var df=[di,dd,dg,dj,dh];this.__bc[de].push(df);de=dj.toHashCode();if(this.__bd[de]===undefined){this.__bd[de]=[];}
;this.__bd[de].push(df);}
,__bq:function(dn,du,dm,dq,dk){if(dq&&dq.converter){var dr;if(du.getModel){dr=du.getModel();}
;return dq.converter(dn,dr,dk,du);}
else {var dp=this.__bk(dm);var dl=this.__bl(du,dp);var dv=dm.substring(dm.lastIndexOf(K)+1,dm.length);if(dl==null){return dn;}
;var ds=qx.Class.getPropertyDefinition(dl.constructor,dv);var dt=ds==null?E:ds.check;return this.__bs(dn,dt);}
;}
,__br:function(dw,dy){var dx=qx.Class.getPropertyDefinition(dw.constructor,dy);if(dx==null){return null;}
;return dx.event;}
,__bs:function(dB,dA){var dz=qx.lang.Type.getClass(dB);if((dz==Q||dz==B)&&(dA==p||dA==L)){dB=parseInt(dB,10);}
;if((dz==c||dz==Q||dz==T)&&dA==B){dB=dB+E;}
;if((dz==Q||dz==B)&&(dA==Q||dA==G)){dB=parseFloat(dB);}
;return dB;}
,removeBindingFromObject:function(dC,dG){if(dG.type==g){for(var i=0;i<dG.sources.length;i++ ){if(dG.sources[i]){dG.sources[i].removeListenerById(dG.listenerIds[i]);}
;}
;for(var i=0;i<dG.targets.length;i++ ){if(dG.targets[i]){dG.targets[i].removeListenerById(dG.targetListenerIds[i]);}
;}
;}
else {dC.removeListenerById(dG);}
;var dF=this.getAllBindingsForObject(dC);if(dF!=undefined){for(var i=0;i<dF.length;i++ ){if(dF[i][0]==dG){var dD=dF[i][3];if(this.__bd[dD.toHashCode()]){qx.lang.Array.remove(this.__bd[dD.toHashCode()],dF[i]);}
;var dE=dF[i][1];if(this.__bc[dE.toHashCode()]){qx.lang.Array.remove(this.__bc[dE.toHashCode()],dF[i]);}
;return;}
;}
;}
;throw new Error(x);}
,removeAllBindingsForObject:function(dI){{}
;var dH=this.getAllBindingsForObject(dI);if(dH!=undefined){for(var i=dH.length-1;i>=0;i-- ){this.removeBindingFromObject(dI,dH[i][0]);}
;}
;}
,removeRelatedBindings:function(dK,dL){{}
;var dN=this.getAllBindingsForObject(dK);if(dN!=undefined){for(var i=dN.length-1;i>=0;i-- ){var dM=dN[i][1];var dJ=dN[i][3];if(dM===dL||dJ===dL){this.removeBindingFromObject(dK,dN[i][0]);}
;}
;}
;}
,getAllBindingsForObject:function(dP){var dQ=dP.toHashCode();if(this.__bc[dQ]===undefined){this.__bc[dQ]=[];}
;var dR=this.__bc[dQ];var dO=this.__bd[dQ]?this.__bd[dQ]:[];return qx.lang.Array.unique(dR.concat(dO));}
,removeAllBindings:function(){for(var dT in this.__bc){var dS=qx.core.ObjectRegistry.fromHashCode(dT);if(dS==null){delete this.__bc[dT];continue;}
;this.removeAllBindingsForObject(dS);}
;this.__bc={};}
,getAllBindings:function(){return this.__bc;}
,showBindingInLog:function(dV,dX){var dW;for(var i=0;i<this.__bc[dV.toHashCode()].length;i++ ){if(this.__bc[dV.toHashCode()][i][0]==dX){dW=this.__bc[dV.toHashCode()][i];break;}
;}
;if(dW===undefined){var dU=P;}
else {var dU=D+dW[1]+N+dW[2]+k+dW[3]+N+dW[4]+v;}
;qx.log.Logger.debug(dU);}
,showAllBindingsInLog:function(){for(var ea in this.__bc){var dY=qx.core.ObjectRegistry.fromHashCode(ea);for(var i=0;i<this.__bc[ea].length;i++ ){this.showBindingInLog(dY,this.__bc[ea][i][0]);}
;}
;}
}});}
)();
(function(){var a=": ",b="qx.type.BaseError",c="",d="error";qx.Bootstrap.define(b,{extend:Error,construct:function(e,f){var g=Error.call(this,f);if(g.stack){this.stack=g.stack;}
;if(g.stacktrace){this.stacktrace=g.stacktrace;}
;this.__bx=e||c;this.message=f||qx.type.BaseError.DEFAULTMESSAGE;}
,statics:{DEFAULTMESSAGE:d},members:{__by:null,__bx:null,message:null,getComment:function(){return this.__bx;}
,toString:function(){return this.__bx+(this.message?a+this.message:c);}
}});}
)();
(function(){var a="qx.core.AssertionError";qx.Bootstrap.define(a,{extend:qx.type.BaseError,construct:function(b,c){qx.type.BaseError.call(this,b,c);this.__bz=qx.dev.StackTrace.getStackTrace();}
,members:{__bz:null,getStackTrace:function(){return this.__bz;}
}});}
)();
(function(){var a="anonymous",b="...",c="qx.dev.StackTrace",d="",e="\n",f="?",g="/source/class/",h="Error created at",j="ecmascript.error.stacktrace",k="Backtrace:",l="stack",m=":",n=".",o="function",p="prototype",q="stacktrace";qx.Bootstrap.define(c,{statics:{FILENAME_TO_CLASSNAME:null,FORMAT_STACKTRACE:null,getStackTrace:function(){var t=[];try{throw new Error();}
catch(G){if(qx.dev.StackTrace.hasEnvironmentCheck&&qx.core.Environment.get(j)){var y=qx.dev.StackTrace.getStackTraceFromError(G);var B=qx.dev.StackTrace.getStackTraceFromCaller(arguments);qx.lang.Array.removeAt(y,0);t=B.length>y.length?B:y;for(var i=0;i<Math.min(B.length,y.length);i++ ){var w=B[i];if(w.indexOf(a)>=0){continue;}
;var s=null;var C=w.split(n);var v=/(.*?)\(/.exec(C[C.length-1]);if(v&&v.length==2){s=v[1];C.pop();}
;if(C[C.length-1]==p){C.pop();}
;var E=C.join(n);var u=y[i];var F=u.split(m);var A=F[0];var z=F[1];var r;if(F[2]){r=F[2];}
;var x=null;if(qx.Class&&qx.Class.getByName(A)){x=A;}
else {x=E;}
;var D=x;if(s){D+=n+s;}
;D+=m+z;if(r){D+=m+r;}
;t[i]=D;}
;}
else {t=this.getStackTraceFromCaller(arguments);}
;}
;return t;}
,getStackTraceFromCaller:function(K){var J=[];var M=qx.lang.Function.getCaller(K);var H={};while(M){var L=qx.lang.Function.getName(M);J.push(L);try{M=M.caller;}
catch(N){break;}
;if(!M){break;}
;var I=qx.core.ObjectRegistry.toHashCode(M);if(H[I]){J.push(b);break;}
;H[I]=M;}
;return J;}
,getStackTraceFromError:function(bd){var T=[];var R,S,ba,Q,P,bf,bb;var bc=qx.dev.StackTrace.hasEnvironmentCheck?qx.core.Environment.get(j):null;if(bc===l){if(!bd.stack){return T;}
;R=/@(.+):(\d+)$/gm;while((S=R.exec(bd.stack))!=null){bb=S[1];Q=S[2];ba=this.__bA(bb);T.push(ba+m+Q);}
;if(T.length>0){return this.__bC(T);}
;R=/at (.*)/gm;var be=/\((.*?)(:[^\/].*)\)/;var Y=/(.*?)(:[^\/].*)/;while((S=R.exec(bd.stack))!=null){var X=be.exec(S[1]);if(!X){X=Y.exec(S[1]);}
;if(X){ba=this.__bA(X[1]);T.push(ba+X[2]);}
else {T.push(S[1]);}
;}
;}
else if(bc===q){var U=bd.stacktrace;if(!U){return T;}
;if(U.indexOf(h)>=0){U=U.split(h)[0];}
;R=/line\ (\d+?),\ column\ (\d+?)\ in\ (?:.*?)\ in\ (.*?):[^\/]/gm;while((S=R.exec(U))!=null){Q=S[1];P=S[2];bb=S[3];ba=this.__bA(bb);T.push(ba+m+Q+m+P);}
;if(T.length>0){return this.__bC(T);}
;R=/Line\ (\d+?)\ of\ linked\ script\ (.*?)$/gm;while((S=R.exec(U))!=null){Q=S[1];bb=S[2];ba=this.__bA(bb);T.push(ba+m+Q);}
;}
else if(bd.message&&bd.message.indexOf(k)>=0){var W=bd.message.split(k)[1].trim();var V=W.split(e);for(var i=0;i<V.length;i++ ){var O=V[i].match(/\s*Line ([0-9]+) of.* (\S.*)/);if(O&&O.length>=2){Q=O[1];bf=this.__bA(O[2]);T.push(bf+m+Q);}
;}
;}
else if(bd.sourceURL&&bd.line){T.push(this.__bA(bd.sourceURL)+m+bd.line);}
;return this.__bC(T);}
,__bA:function(bh){if(typeof qx.dev.StackTrace.FILENAME_TO_CLASSNAME==o){var bg=qx.dev.StackTrace.FILENAME_TO_CLASSNAME(bh);{}
;return bg;}
;return qx.dev.StackTrace.__bB(bh);}
,__bB:function(bk){var bl=g;var bi=bk.indexOf(bl);var bm=bk.indexOf(f);if(bm>=0){bk=bk.substring(0,bm);}
;var bj=(bi==-1)?bk:bk.substring(bi+bl.length).replace(/\//g,n).replace(/\.js$/,d);return bj;}
,__bC:function(bn){if(typeof qx.dev.StackTrace.FORMAT_STACKTRACE==o){bn=qx.dev.StackTrace.FORMAT_STACKTRACE(bn);{}
;}
;return bn;}
},defer:function(bo){bo.hasEnvironmentCheck=qx.bom&&qx.bom.client&&qx.bom.client.EcmaScript&&qx.bom.client.EcmaScript.getStackTrace;}
});}
)();
(function(){var a="mshtml",b="engine.name",c="[object Array]",d="qx.lang.Array",e="Cannot clean-up map entry doneObjects[",f="]",g="qx",h="number",j="][",k="string";qx.Bootstrap.define(d,{statics:{cast:function(m,o,p){if(m.constructor===o){return m;}
;if(qx.data&&qx.data.IListData){if(qx.Class&&qx.Class.hasInterface(m,qx.data.IListData)){var m=m.toArray();}
;}
;var n=new o;if((qx.core.Environment.get(b)==a)){if(m.item){for(var i=p||0,l=m.length;i<l;i++ ){n.push(m[i]);}
;return n;}
;}
;if(Object.prototype.toString.call(m)===c&&p==null){n.push.apply(n,m);}
else {n.push.apply(n,Array.prototype.slice.call(m,p||0));}
;return n;}
,fromArguments:function(q,r){return Array.prototype.slice.call(q,r||0);}
,fromCollection:function(t){if((qx.core.Environment.get(b)==a)){if(t.item){var s=[];for(var i=0,l=t.length;i<l;i++ ){s[i]=t[i];}
;return s;}
;}
;return Array.prototype.slice.call(t,0);}
,fromShortHand:function(u){var w=u.length;var v=qx.lang.Array.clone(u);switch(w){case 1:v[1]=v[2]=v[3]=v[0];break;case 2:v[2]=v[0];case 3:v[3]=v[1];};return v;}
,clone:function(x){return x.concat();}
,insertAt:function(y,z,i){y.splice(i,0,z);return y;}
,insertBefore:function(A,C,B){var i=A.indexOf(B);if(i==-1){A.push(C);}
else {A.splice(i,0,C);}
;return A;}
,insertAfter:function(D,F,E){var i=D.indexOf(E);if(i==-1||i==(D.length-1)){D.push(F);}
else {D.splice(i+1,0,F);}
;return D;}
,removeAt:function(G,i){return G.splice(i,1)[0];}
,removeAll:function(H){H.length=0;return this;}
,append:function(J,I){{}
;Array.prototype.push.apply(J,I);return J;}
,exclude:function(M,L){{}
;for(var i=0,N=L.length,K;i<N;i++ ){K=M.indexOf(L[i]);if(K!=-1){M.splice(K,1);}
;}
;return M;}
,remove:function(O,P){var i=O.indexOf(P);if(i!=-1){O.splice(i,1);return P;}
;}
,contains:function(Q,R){return Q.indexOf(R)!==-1;}
,equals:function(T,S){var length=T.length;if(length!==S.length){return false;}
;for(var i=0;i<length;i++ ){if(T[i]!==S[i]){return false;}
;}
;return true;}
,sum:function(U){var V=0;for(var i=0,l=U.length;i<l;i++ ){if(U[i]!=undefined){V+=U[i];}
;}
;return V;}
,max:function(W){{}
;var i,Y=W.length,X=W[0];for(i=1;i<Y;i++ ){if(W[i]>X){X=W[i];}
;}
;return X===undefined?null:X;}
,min:function(ba){{}
;var i,bc=ba.length,bb=ba[0];for(i=1;i<bc;i++ ){if(ba[i]<bb){bb=ba[i];}
;}
;return bb===undefined?null:bb;}
,unique:function(bf){var bp=[],be={},bi={},bk={};var bj,bd=0;var bn=g+Date.now();var bg=false,bl=false,bo=false;for(var i=0,bm=bf.length;i<bm;i++ ){bj=bf[i];if(bj===null){if(!bg){bg=true;bp.push(bj);}
;}
else if(bj===undefined){}
else if(bj===false){if(!bl){bl=true;bp.push(bj);}
;}
else if(bj===true){if(!bo){bo=true;bp.push(bj);}
;}
else if(typeof bj===k){if(!be[bj]){be[bj]=1;bp.push(bj);}
;}
else if(typeof bj===h){if(!bi[bj]){bi[bj]=1;bp.push(bj);}
;}
else {var bh=bj[bn];if(bh==null){bh=bj[bn]=bd++ ;}
;if(!bk[bh]){bk[bh]=bj;bp.push(bj);}
;}
;}
;for(var bh in bk){try{delete bk[bh][bn];}
catch(bq){try{bk[bh][bn]=null;}
catch(br){throw new Error(e+bh+j+bn+f);}
;}
;}
;return bp;}
,range:function(bu,stop,bv){if(arguments.length<=1){stop=bu||0;bu=0;}
;bv=arguments[2]||1;var length=Math.max(Math.ceil((stop-bu)/bv),0);var bs=0;var bt=Array(length);while(bs<length){bt[bs++ ]=bu;bu+=bv;}
;return bt;}
}});}
)();
(function(){var a="[object Opera]",b="function",c="[^\\.0-9]",d="4.0",e="gecko",f="1.9.0.0",g="Version/",h="9.0",i="8.0",j="engine.version",k="Maple",l="AppleWebKit/",m="Unsupported client: ",n="",o="opera",p="Windows Phone",q="! Assumed gecko version 1.9.0.0 (Firefox 3.0).",r="mshtml",s="engine.name",t="webkit",u="5.0",v=".",w="qx.bom.client.Engine";qx.Bootstrap.define(w,{statics:{getVersion:function(){var z=window.navigator.userAgent;var A=n;if(qx.bom.client.Engine.__bH()){var y=/Trident\/([^\);]+)(\)|;)/.test(z);if(/MSIE\s+([^\);]+)(\)|;)/.test(z)){A=RegExp.$1;if(A<8&&y){if(RegExp.$1==d){A=i;}
else if(RegExp.$1==u){A=h;}
;}
;}
else if(y){var C=/\brv\:(\d+?\.\d+?)\b/.exec(z);if(C){A=C[1];}
;}
;}
else if(qx.bom.client.Engine.__bD()){if(/Opera[\s\/]([0-9]+)\.([0-9])([0-9]*)/.test(z)){if(z.indexOf(g)!=-1){var C=z.match(/Version\/(\d+)\.(\d+)/);A=C[1]+v+C[2].charAt(0)+v+C[2].substring(1,C[2].length);}
else {A=RegExp.$1+v+RegExp.$2;if(RegExp.$3!=n){A+=v+RegExp.$3;}
;}
;}
;}
else if(qx.bom.client.Engine.__bE()){if(/AppleWebKit\/([^ ]+)/.test(z)){A=RegExp.$1;var B=RegExp(c).exec(A);if(B){A=A.slice(0,B.index);}
;}
;}
else if(qx.bom.client.Engine.__bG()||qx.bom.client.Engine.__bF()){if(/rv\:([^\);]+)(\)|;)/.test(z)){A=RegExp.$1;}
;}
else {var x=window.qxFail;if(x&&typeof x===b){A=x().FULLVERSION;}
else {A=f;qx.Bootstrap.warn(m+z+q);}
;}
;return A;}
,getName:function(){var name;if(qx.bom.client.Engine.__bH()){name=r;}
else if(qx.bom.client.Engine.__bD()){name=o;}
else if(qx.bom.client.Engine.__bE()){name=t;}
else if(qx.bom.client.Engine.__bG()||qx.bom.client.Engine.__bF()){name=e;}
else {var D=window.qxFail;if(D&&typeof D===b){name=D().NAME;}
else {name=e;qx.Bootstrap.warn(m+window.navigator.userAgent+q);}
;}
;return name;}
,__bD:function(){return window.opera&&Object.prototype.toString.call(window.opera)==a;}
,__bE:function(){return window.navigator.userAgent.indexOf(l)!=-1;}
,__bF:function(){return window.navigator.userAgent.indexOf(k)!=-1;}
,__bG:function(){return true;}
,__bH:function(){if(window.navigator.cpuClass&&(/MSIE\s+([^\);]+)(\)|;)/.test(window.navigator.userAgent)||/Trident\/\d+?\.\d+?/.test(window.navigator.userAgent))){return true;}
;if(qx.bom.client.Engine.__bI()){return true;}
;return false;}
,__bI:function(){return window.navigator.userAgent.indexOf(p)>-1;}
},defer:function(E){qx.core.Environment.add(j,E.getVersion);qx.core.Environment.add(s,E.getName);}
});}
)();
(function(){var a='anonymous()',b="()",c="qx.lang.Function",d=".",e=".prototype.",f=".constructor()";qx.Bootstrap.define(c,{statics:{getCaller:function(g){return g.caller?g.caller.callee:g.callee.caller;}
,getName:function(h){if(h.displayName){return h.displayName;}
;if(h.$$original||h.wrapper||h.classname){return h.classname+f;}
;if(h.$$mixin){for(var i in h.$$mixin.$$members){if(h.$$mixin.$$members[i]==h){return h.$$mixin.name+e+i+b;}
;}
;for(var i in h.$$mixin){if(h.$$mixin[i]==h){return h.$$mixin.name+d+i+b;}
;}
;}
;if(h.self){var k=h.self.constructor;if(k){for(var i in k.prototype){if(k.prototype[i]==h){return k.classname+e+i+b;}
;}
;for(var i in k){if(k[i]==h){return k.classname+d+i+b;}
;}
;}
;}
;var j=h.toString().match(/function\s*(\w*)\s*\(.*/);if(j&&j.length>=1&&j[1]){return j[1]+b;}
;return a;}
,globalEval:function(data){if(window.execScript){return window.execScript(data);}
else {return eval.call(window,data);}
;}
,create:function(m,l){{}
;if(!l){return m;}
;if(!(l.self||l.args||l.delay!=null||l.periodical!=null||l.attempt)){return m;}
;return function(event){{}
;var o=qx.lang.Array.fromArguments(arguments);if(l.args){o=l.args.concat(o);}
;if(l.delay||l.periodical){var n=function(){return m.apply(l.self||this,o);}
;{n=qx.event.GlobalError.observeMethod(n);}
;if(l.delay){return window.setTimeout(n,l.delay);}
;if(l.periodical){return window.setInterval(n,l.periodical);}
;}
else if(l.attempt){var p=false;try{p=m.apply(l.self||this,o);}
catch(q){}
;return p;}
else {return m.apply(l.self||this,o);}
;}
;}
,bind:function(r,self,s){return this.create(r,{self:self,args:arguments.length>2?qx.lang.Array.fromArguments(arguments,2):null});}
,curry:function(t,u){return this.create(t,{args:arguments.length>1?qx.lang.Array.fromArguments(arguments,1):null});}
,listener:function(w,self,x){if(arguments.length<3){return function(event){return w.call(self||this,event||window.event);}
;}
else {var v=qx.lang.Array.fromArguments(arguments,2);return function(event){var y=[event||window.event];y.push.apply(y,v);w.apply(self||this,y);}
;}
;}
,attempt:function(z,self,A){return this.create(z,{self:self,attempt:true,args:arguments.length>2?qx.lang.Array.fromArguments(arguments,2):null})();}
,delay:function(C,B,self,D){return this.create(C,{delay:B,self:self,args:arguments.length>3?qx.lang.Array.fromArguments(arguments,3):null})();}
,periodical:function(F,E,self,G){return this.create(F,{periodical:E,self:self,args:arguments.length>3?qx.lang.Array.fromArguments(arguments,3):null})();}
}});}
)();
(function(){var a="qx.globalErrorHandling",b="qx.event.GlobalError";qx.Bootstrap.define(b,{statics:{__bJ:null,__bK:null,__bL:null,__bM:function(){if(qx.core&&qx.core.Environment){return true;}
else {return !!qx.Bootstrap.getEnvironmentSetting(a);}
;}
,setErrorHandler:function(c,d){this.__bJ=c||null;this.__bL=d||window;if(this.__bM()){if(c&&window.onerror){var e=qx.Bootstrap.bind(this.__bN,this);if(this.__bK==null){this.__bK=window.onerror;}
;var self=this;window.onerror=function(f,g,h){self.__bK(f,g,h);e(f,g,h);}
;}
;if(c&&!window.onerror){window.onerror=qx.Bootstrap.bind(this.__bN,this);}
;if(this.__bJ==null){if(this.__bK!=null){window.onerror=this.__bK;this.__bK=null;}
else {window.onerror=null;}
;}
;}
;}
,__bN:function(i,j,k){if(this.__bJ){this.handleError(new qx.core.WindowError(i,j,k));}
;}
,observeMethod:function(l){if(this.__bM()){var self=this;return function(){if(!self.__bJ){return l.apply(this,arguments);}
;try{return l.apply(this,arguments);}
catch(m){self.handleError(new qx.core.GlobalError(m,arguments));}
;}
;}
else {return l;}
;}
,handleError:function(n){if(this.__bJ){this.__bJ.call(this.__bL,n);}
;}
},defer:function(o){if(qx.core&&qx.core.Environment){qx.core.Environment.add(a,true);}
else {qx.Bootstrap.setEnvironmentSetting(a,true);}
;o.setErrorHandler(null,null);}
});}
)();
(function(){var a="",b="qx.core.WindowError";qx.Bootstrap.define(b,{extend:Error,construct:function(c,e,f){var d=Error.call(this,c);if(d.stack){this.stack=d.stack;}
;if(d.stacktrace){this.stacktrace=d.stacktrace;}
;this.__bO=c;this.__bP=e||a;this.__bQ=f===undefined?-1:f;}
,members:{__bO:null,__bP:null,__bQ:null,toString:function(){return this.__bO;}
,getUri:function(){return this.__bP;}
,getLineNumber:function(){return this.__bQ;}
}});}
)();
(function(){var a="GlobalError: ",b="qx.core.GlobalError";qx.Bootstrap.define(b,{extend:Error,construct:function(e,c){if(qx.Bootstrap.DEBUG){qx.core.Assert.assertNotUndefined(e);}
;this.__bO=a+(e&&e.message?e.message:e);var d=Error.call(this,this.__bO);if(d.stack){this.stack=d.stack;}
;if(d.stacktrace){this.stacktrace=d.stacktrace;}
;this.__bR=c;this.__bS=e;}
,members:{__bS:null,__bR:null,__bO:null,toString:function(){return this.__bO;}
,getArguments:function(){return this.__bR;}
,getSourceException:function(){return this.__bS;}
},destruct:function(){this.__bS=null;this.__bR=null;this.__bO=null;}
});}
)();
(function(){var a="qx.lang.Type",b="Error",c="RegExp",d="Date",e="Number",f="Boolean";qx.Bootstrap.define(a,{statics:{getClass:qx.Bootstrap.getClass,isString:qx.Bootstrap.isString,isArray:qx.Bootstrap.isArray,isObject:qx.Bootstrap.isObject,isFunction:qx.Bootstrap.isFunction,isRegExp:function(g){return this.getClass(g)==c;}
,isNumber:function(h){return (h!==null&&(this.getClass(h)==e||h instanceof Number));}
,isBoolean:function(i){return (i!==null&&(this.getClass(i)==f||i instanceof Boolean));}
,isDate:function(j){return (j!==null&&(this.getClass(j)==d||j instanceof Date));}
,isError:function(k){return (k!==null&&(this.getClass(k)==b||k instanceof Error));}
}});}
)();
(function(){var a=" != ",b="qx.core.Object",c="Expected value to be an array but found ",d="' (rgb(",f=") was fired.",g="Expected value to be an integer >= 0 but found ",h="' to be not equal with '",j="' to '",k="Expected object '",m="Called assertTrue with '",n="Expected value to be a map but found ",o="The function did not raise an exception!",p="Expected value to be undefined but found ",q="Expected value to be a DOM element but found  '",r="Expected value to be a regular expression but found ",s="' to implement the interface '",t="Expected value to be null but found ",u="Invalid argument 'type'",v="Called assert with 'false'",w="Assertion error! ",x="'",y="null",z="' but found '",A="'undefined'",B=",",C="' must must be a key of the map '",D="Expected '",E="The String '",F="Expected value to be a string but found ",G="Event (",H="Expected value to be the CSS color '",I="!",J="Expected value not to be undefined but found undefined!",K="qx.util.ColorUtil",L=": ",M="The raised exception does not have the expected type! ",N=") not fired.",O="'!",P="qx.core.Assert",Q="",R="Expected value to be typeof object but found ",S="' but found ",T="' (identical) but found '",U="' must have any of the values defined in the array '",V="Expected value to be a number but found ",W="Called assertFalse with '",X="qx.ui.core.Widget",Y="]",bJ="Expected value to be a qooxdoo object but found ",bK="' arguments.",bL="Expected value '%1' to be in the range '%2'..'%3'!",bF="Array[",bG="' does not match the regular expression '",bH="' to be not identical with '",bI="Expected [",bP="' arguments but found '",bQ="', which cannot be converted to a CSS color!",bR=", ",cg="qx.core.AssertionError",bM="Expected value to be a boolean but found ",bN="Expected value not to be null but found null!",bO="))!",bD="Expected value to be a qooxdoo widget but found ",bU="The value '",bE="Expected value to be typeof '",bV="\n Stack trace: \n",bW="Expected value to be typeof function but found ",cb="Expected value to be an integer but found ",bS="Called fail().",cf="The parameter 're' must be a string or a regular expression.",bT=")), but found value '",bX="qx.util.ColorUtil not available! Your code must have a dependency on 'qx.util.ColorUtil'",bY="Expected value to be a number >= 0 but found ",ca="Expected value to be instanceof '",cc="], but found [",cd="Wrong number of arguments given. Expected '",ce="object";qx.Bootstrap.define(P,{statics:{__bt:true,__bu:function(ch,ci){var cm=Q;for(var i=1,l=arguments.length;i<l;i++ ){cm=cm+this.__bv(arguments[i]===undefined?A:arguments[i]);}
;var cl=Q;if(cm){cl=ch+L+cm;}
else {cl=ch;}
;var ck=w+cl;if(qx.Class&&qx.Class.isDefined(cg)){var cj=new qx.core.AssertionError(ch,cm);if(this.__bt){qx.Bootstrap.error(ck+bV+cj.getStackTrace());}
;throw cj;}
else {if(this.__bt){qx.Bootstrap.error(ck);}
;throw new Error(ck);}
;}
,__bv:function(co){var cn;if(co===null){cn=y;}
else if(qx.lang.Type.isArray(co)&&co.length>10){cn=bF+co.length+Y;}
else if((co instanceof Object)&&(co.toString==null)){cn=qx.lang.Json.stringify(co,null,2);}
else {try{cn=co.toString();}
catch(e){cn=Q;}
;}
;return cn;}
,assert:function(cq,cp){cq==true||this.__bu(cp||Q,v);}
,fail:function(cr,cs){var ct=cs?Q:bS;this.__bu(cr||Q,ct);}
,assertTrue:function(cv,cu){(cv===true)||this.__bu(cu||Q,m,cv,x);}
,assertFalse:function(cx,cw){(cx===false)||this.__bu(cw||Q,W,cx,x);}
,assertEquals:function(cy,cz,cA){cy==cz||this.__bu(cA||Q,D,cy,z,cz,O);}
,assertNotEquals:function(cB,cC,cD){cB!=cC||this.__bu(cD||Q,D,cB,h,cC,O);}
,assertIdentical:function(cE,cF,cG){cE===cF||this.__bu(cG||Q,D,cE,T,cF,O);}
,assertNotIdentical:function(cH,cI,cJ){cH!==cI||this.__bu(cJ||Q,D,cH,bH,cI,O);}
,assertNotUndefined:function(cL,cK){cL!==undefined||this.__bu(cK||Q,J);}
,assertUndefined:function(cN,cM){cN===undefined||this.__bu(cM||Q,p,cN,I);}
,assertNotNull:function(cP,cO){cP!==null||this.__bu(cO||Q,bN);}
,assertNull:function(cR,cQ){cR===null||this.__bu(cQ||Q,t,cR,I);}
,assertJsonEquals:function(cS,cT,cU){this.assertEquals(qx.lang.Json.stringify(cS),qx.lang.Json.stringify(cT),cU);}
,assertMatch:function(cX,cW,cV){this.assertString(cX);this.assert(qx.lang.Type.isRegExp(cW)||qx.lang.Type.isString(cW),cf);cX.search(cW)>=0||this.__bu(cV||Q,E,cX,bG,cW.toString(),O);}
,assertArgumentsCount:function(db,dc,dd,cY){var da=db.length;(da>=dc&&da<=dd)||this.__bu(cY||Q,cd,dc,j,dd,bP,da,bK);}
,assertEventFired:function(de,event,dh,di,dj){var df=false;var dg=function(e){if(di){di.call(de,e);}
;df=true;}
;var dk;try{dk=de.addListener(event,dg,de);dh.call(de);}
catch(dl){throw dl;}
finally{try{de.removeListenerById(dk);}
catch(dm){}
;}
;df===true||this.__bu(dj||Q,G,event,N);}
,assertEventNotFired:function(dn,event,dr,ds){var dp=false;var dq=function(e){dp=true;}
;var dt=dn.addListener(event,dq,dn);dr.call();dp===false||this.__bu(ds||Q,G,event,f);dn.removeListenerById(dt);}
,assertException:function(dx,dw,dv,du){var dw=dw||Error;var dy;try{this.__bt=false;dx();}
catch(dz){dy=dz;}
finally{this.__bt=true;}
;if(dy==null){this.__bu(du||Q,o);}
;dy instanceof dw||this.__bu(du||Q,M,dw,a,dy);if(dv){this.assertMatch(dy.toString(),dv,du);}
;}
,assertInArray:function(dC,dB,dA){dB.indexOf(dC)!==-1||this.__bu(dA||Q,bU,dC,U,dB,x);}
,assertArrayEquals:function(dD,dE,dF){this.assertArray(dD,dF);this.assertArray(dE,dF);dF=dF||bI+dD.join(bR)+cc+dE.join(bR)+Y;if(dD.length!==dE.length){this.fail(dF,true);}
;for(var i=0;i<dD.length;i++ ){if(dD[i]!==dE[i]){this.fail(dF,true);}
;}
;}
,assertKeyInMap:function(dI,dH,dG){dH[dI]!==undefined||this.__bu(dG||Q,bU,dI,C,dH,x);}
,assertFunction:function(dK,dJ){qx.lang.Type.isFunction(dK)||this.__bu(dJ||Q,bW,dK,I);}
,assertString:function(dM,dL){qx.lang.Type.isString(dM)||this.__bu(dL||Q,F,dM,I);}
,assertBoolean:function(dO,dN){qx.lang.Type.isBoolean(dO)||this.__bu(dN||Q,bM,dO,I);}
,assertNumber:function(dQ,dP){(qx.lang.Type.isNumber(dQ)&&isFinite(dQ))||this.__bu(dP||Q,V,dQ,I);}
,assertPositiveNumber:function(dS,dR){(qx.lang.Type.isNumber(dS)&&isFinite(dS)&&dS>=0)||this.__bu(dR||Q,bY,dS,I);}
,assertInteger:function(dU,dT){(qx.lang.Type.isNumber(dU)&&isFinite(dU)&&dU%1===0)||this.__bu(dT||Q,cb,dU,I);}
,assertPositiveInteger:function(dX,dV){var dW=(qx.lang.Type.isNumber(dX)&&isFinite(dX)&&dX%1===0&&dX>=0);dW||this.__bu(dV||Q,g,dX,I);}
,assertInRange:function(eb,ec,ea,dY){(eb>=ec&&eb<=ea)||this.__bu(dY||Q,qx.lang.String.format(bL,[eb,ec,ea]));}
,assertObject:function(ee,ed){var ef=ee!==null&&(qx.lang.Type.isObject(ee)||typeof ee===ce);ef||this.__bu(ed||Q,R,(ee),I);}
,assertArray:function(eh,eg){qx.lang.Type.isArray(eh)||this.__bu(eg||Q,c,eh,I);}
,assertMap:function(ej,ei){qx.lang.Type.isObject(ej)||this.__bu(ei||Q,n,ej,I);}
,assertRegExp:function(el,ek){qx.lang.Type.isRegExp(el)||this.__bu(ek||Q,r,el,I);}
,assertType:function(eo,en,em){this.assertString(en,u);typeof (eo)===en||this.__bu(em||Q,bE,en,S,eo,I);}
,assertInstance:function(er,es,ep){var eq=es.classname||es+Q;er instanceof es||this.__bu(ep||Q,ca,eq,S,er,I);}
,assertInterface:function(ev,eu,et){qx.Class&&qx.Class.implementsInterface(ev,eu)||this.__bu(et||Q,k,ev,s,eu,O);}
,assertCssColor:function(eC,ez,eB){var ew=qx.Class?qx.Class.getByName(K):null;if(!ew){throw new Error(bX);}
;var ey=ew.stringToRgb(eC);try{var eA=ew.stringToRgb(ez);}
catch(eE){this.__bu(eB||Q,H,eC,d,ey.join(B),bT,ez,bQ);}
;var eD=ey[0]==eA[0]&&ey[1]==eA[1]&&ey[2]==eA[2];eD||this.__bu(eB||Q,H,ey,d,ey.join(B),bT,ez,d,eA.join(B),bO);}
,assertElement:function(eG,eF){!!(eG&&eG.nodeType===1)||this.__bu(eF||Q,q,eG,O);}
,assertQxObject:function(eI,eH){this.__bw(eI,b)||this.__bu(eH||Q,bJ,eI,I);}
,assertQxWidget:function(eK,eJ){this.__bw(eK,X)||this.__bu(eJ||Q,bD,eK,I);}
,__bw:function(eM,eL){if(!eM){return false;}
;var eN=eM.constructor;while(eN){if(eN.classname===eL){return true;}
;eN=eN.superclass;}
;return false;}
}});}
)();
(function(){var a="\x00\b\n\f\r\t",b="-",c="function",d="[null,null,null]",e="T",f="+",g=",\n",h="constructor",i="{\n",j='"+275760-09-13T00:00:00.000Z"',k="true",l="\\n",m="false",n='"-271821-04-20T00:00:00.000Z"',o="json",p='object',q='""',r="qx.lang.Json",s="{}",t="hasOwnProperty",u="@",v="prototype",w='hasOwnProperty',x='"',y="toLocaleString",z="0",A='function',B="",C='\\"',D="\t",E="string",F="}",G="\r",H="toJSON",I=":",J="[\n 1,\n 2\n]",K="\\f",L='"1969-12-31T23:59:59.999Z"',M="/",N="\\b",O="Z",P="\\t",Q="\b",R="[object Number]",S="isPrototypeOf",T="{",U="toString",V="0x",W="[1]",X="\\r",Y="]",bO=",",bP="null",bQ="\\u00",bK="\n",bL="json-stringify",bM="[]",bN="1",bU="000000",bV="[object Boolean]",bW="valueOf",cm="\\\\",bR="[object String]",bS="json-parse",bT="bug-string-char-index",bG="[object Array]",ca="$",bJ="[\n",cb='"-000001-01-01T00:00:00.000Z"',cc="[",bI="[null]",bX="\\",cl="[object Date]",bY='{"a":[1,true,false,null,"\\u0000\\b\\n\\f\\r\\t"]}',cd="a",ce=" ",cf=".",ci="[object Function]",cj="01",ck='"\t"',bH="propertyIsEnumerable",cg="\f",ch="object";qx.Bootstrap.define(r,{statics:{stringify:null,parse:null}});(function(){var co;var cn;var cp;(function(window){var cr={}.toString,cG,cQ,cC;var cy=typeof cp===c&&cp.amd,cx=typeof cn==ch&&cn;if(cx||cy){if(typeof JSON==ch&&JSON){if(cx){cx.stringify=JSON.stringify;cx.parse=JSON.parse;}
else {cx=JSON;}
;}
else if(cy){cx=window.JSON={};}
;}
else {cx=window.JSON||(window.JSON={});}
;var cU=new Date(-3509827334573292);try{cU=cU.getUTCFullYear()==-109252&&cU.getUTCMonth()===0&&cU.getUTCDate()===1&&cU.getUTCHours()==10&&cU.getUTCMinutes()==37&&cU.getUTCSeconds()==6&&cU.getUTCMilliseconds()==708;}
catch(da){}
;function cJ(name){if(name==bT){return cd[0]!=cd;}
;var de,dd=bY,dh=name==o;if(dh||name==bL||name==bS){if(name==bL||dh){var db=cx.stringify,dg=typeof db==c&&cU;if(dg){(de=function(){return 1;}
).toJSON=de;try{dg=db(0)===z&&db(new Number())===z&&db(new String())==q&&db(cr)===cC&&db(cC)===cC&&db()===cC&&db(de)===bN&&db([de])==W&&db([cC])==bI&&db(null)==bP&&db([cC,cr,null])==d&&db({"a":[de,true,false,null,a]})==dd&&db(null,de)===bN&&db([1,2],null,1)==J&&db(new Date(-8.64e15))==n&&db(new Date(8.64e15))==j&&db(new Date(-621987552e5))==cb&&db(new Date(-1))==L;}
catch(di){dg=false;}
;}
;if(!dh){return dg;}
;}
;if(name==bS||dh){var df=cx.parse;if(typeof df==c){try{if(df(z)===0&&!df(false)){de=df(dd);var dc=de[cd].length==5&&de[cd][0]===1;if(dc){try{dc=!df(ck);}
catch(dj){}
;if(dc){try{dc=df(cj)!==1;}
catch(dk){}
;}
;}
;}
;}
catch(dl){dc=false;}
;}
;if(!dh){return dc;}
;}
;return dg&&dc;}
;}
;if(!cJ(o)){var cV=ci;var cN=cl;var cv=R;var cY=bR;var cR=bG;var cF=bV;var cE=cJ(bT);if(!cU){var cD=Math.floor;var cM=[0,31,59,90,120,151,181,212,243,273,304,334];var cX=function(dm,dn){return cM[dn]+365*(dm-1970)+cD((dm-1969+(dn=+(dn>1)))/4)-cD((dm-1901+dn)/100)+cD((dm-1601+dn)/400);}
;}
;if(!(cG={}.hasOwnProperty)){cG=function(dp){var dq={},dr;if((dq.__bX=null,dq.__bX={"toString":1},dq).toString!=cr){cG=function(ds){var dt=this.__bX,du=ds in (this.__bX=null,this);this.__bX=dt;return du;}
;}
else {dr=dq.constructor;cG=function(dv){var parent=(this.constructor||dr).prototype;return dv in this&&!(dv in parent&&this[dv]===parent[dv]);}
;}
;dq=null;return cG.call(this,dp);}
;}
;var cH={'boolean':1,'number':1,'string':1,'undefined':1};var cP=function(dy,dw){var dx=typeof dy[dw];return dx==p?!!dy[dw]:!cH[dx];}
;cQ=function(dz,dA){var dF=0,dE,dC,dD,dB;(dE=function(){this.valueOf=0;}
).prototype.valueOf=0;dC=new dE();for(dD in dC){if(cG.call(dC,dD)){dF++ ;}
;}
;dE=dC=null;if(!dF){dC=[bW,U,y,bH,S,t,h];dB=function(dH,dI){var dJ=cr.call(dH)==cV,dK,length;var dG=!dJ&&typeof dH.constructor!=A&&cP(dH,w)?dH.hasOwnProperty:cG;for(dK in dH){if(!(dJ&&dK==v)&&dG.call(dH,dK)){dI(dK);}
;}
;for(length=dC.length;dK=dC[ --length];dG.call(dH,dK)&&dI(dK));}
;}
else if(dF==2){dB=function(dP,dL){var dO={},dM=cr.call(dP)==cV,dN;for(dN in dP){if(!(dM&&dN==v)&&!cG.call(dO,dN)&&(dO[dN]=1)&&cG.call(dP,dN)){dL(dN);}
;}
;}
;}
else {dB=function(dT,dQ){var dR=cr.call(dT)==cV,dS,dU;for(dS in dT){if(!(dR&&dS==v)&&cG.call(dT,dS)&&!(dU=dS===h)){dQ(dS);}
;}
;if(dU||cG.call(dT,(dS=h))){dQ(dS);}
;}
;}
;return dB(dz,dA);}
;if(!cJ(bL)){var cT={'92':cm,'34':C,'8':N,'12':K,'10':l,'13':X,'9':P};var cI=bU;var cW=function(dV,dW){return (cI+(dW||0)).slice(-dV);}
;var cB=bQ;var cL=function(dY){var eb=x,dX=0,length=dY.length,ec=length>10&&cE,ea;if(ec){ea=dY.split(B);}
;for(;dX<length;dX++ ){var ed=dY.charCodeAt(dX);switch(ed){case 8:case 9:case 10:case 12:case 13:case 34:case 92:eb+=cT[ed];break;default:if(ed<32){eb+=cB+cW(2,ed.toString(16));break;}
;eb+=ec?ea[dX]:cE?dY.charAt(dX):dY[dX];};}
;return eb+x;}
;var cs=function(ez,eo,ew,el,ek,ex,es){var et=eo[ez],ev,ei,ef,er,ey,ep,eA,en,em,ee,eu,ej,length,eg,eq,eh;try{et=eo[ez];}
catch(eB){}
;if(typeof et==ch&&et){ev=cr.call(et);if(ev==cN&&!cG.call(et,H)){if(et>-1/0&&et<1/0){if(cX){er=cD(et/864e5);for(ei=cD(er/365.2425)+1970-1;cX(ei+1,0)<=er;ei++ );for(ef=cD((er-cX(ei,0))/30.42);cX(ei,ef+1)<=er;ef++ );er=1+er-cX(ei,ef);ey=(et%864e5+864e5)%864e5;ep=cD(ey/36e5)%24;eA=cD(ey/6e4)%60;en=cD(ey/1e3)%60;em=ey%1e3;}
else {ei=et.getUTCFullYear();ef=et.getUTCMonth();er=et.getUTCDate();ep=et.getUTCHours();eA=et.getUTCMinutes();en=et.getUTCSeconds();em=et.getUTCMilliseconds();}
;et=(ei<=0||ei>=1e4?(ei<0?b:f)+cW(6,ei<0?-ei:ei):cW(4,ei))+b+cW(2,ef+1)+b+cW(2,er)+e+cW(2,ep)+I+cW(2,eA)+I+cW(2,en)+cf+cW(3,em)+O;}
else {et=null;}
;}
else if(typeof et.toJSON==c&&((ev!=cv&&ev!=cY&&ev!=cR)||cG.call(et,H))){et=et.toJSON(ez);}
;}
;if(ew){et=ew.call(eo,ez,et);}
;if(et===null){return bP;}
;ev=cr.call(et);if(ev==cF){return B+et;}
else if(ev==cv){return et>-1/0&&et<1/0?B+et:bP;}
else if(ev==cY){return cL(B+et);}
;if(typeof et==ch){for(length=es.length;length-- ;){if(es[length]===et){throw TypeError();}
;}
;es.push(et);ee=[];eg=ex;ex+=ek;if(ev==cR){for(ej=0,length=et.length;ej<length;eq||(eq=true),ej++ ){eu=cs(ej,et,ew,el,ek,ex,es);ee.push(eu===cC?bP:eu);}
;eh=eq?(ek?bJ+ex+ee.join(g+ex)+bK+eg+Y:(cc+ee.join(bO)+Y)):bM;}
else {cQ(el||et,function(eC){var eD=cs(eC,et,ew,el,ek,ex,es);if(eD!==cC){ee.push(cL(eC)+I+(ek?ce:B)+eD);}
;eq||(eq=true);}
);eh=eq?(ek?i+ex+ee.join(g+ex)+bK+eg+F:(T+ee.join(bO)+F)):s;}
;es.pop();return eh;}
;}
;cx.stringify=function(eK,eJ,eL){var eF,eG,eI;if(typeof eJ==c||typeof eJ==ch&&eJ){if(cr.call(eJ)==cV){eG=eJ;}
else if(cr.call(eJ)==cR){eI={};for(var eE=0,length=eJ.length,eH;eE<length;eH=eJ[eE++ ],((cr.call(eH)==cY||cr.call(eH)==cv)&&(eI[eH]=1)));}
;}
;if(eL){if(cr.call(eL)==cv){if((eL-=eL%1)>0){for(eF=B,eL>10&&(eL=10);eF.length<eL;eF+=ce);}
;}
else if(cr.call(eL)==cY){eF=eL.length<=10?eL:eL.slice(0,10);}
;}
;return cs(B,(eH={},eH[B]=eK,eH),eG,eI,eF,B,[]);}
;}
;if(!cJ(bS)){var cA=String.fromCharCode;var cz={'92':bX,'34':x,'47':M,'98':Q,'116':D,'110':bK,'102':cg,'114':G};var cq,cu;var cw=function(){cq=cu=null;throw SyntaxError();}
;var cS=function(){var eO=cu,length=eO.length,eN,eM,eQ,eP,eR;while(cq<length){eR=eO.charCodeAt(cq);switch(eR){case 9:case 10:case 13:case 32:cq++ ;break;case 123:case 125:case 91:case 93:case 58:case 44:eN=cE?eO.charAt(cq):eO[cq];cq++ ;return eN;case 34:for(eN=u,cq++ ;cq<length;){eR=eO.charCodeAt(cq);if(eR<32){cw();}
else if(eR==92){eR=eO.charCodeAt( ++cq);switch(eR){case 92:case 34:case 47:case 98:case 116:case 110:case 102:case 114:eN+=cz[eR];cq++ ;break;case 117:eM= ++cq;for(eQ=cq+4;cq<eQ;cq++ ){eR=eO.charCodeAt(cq);if(!(eR>=48&&eR<=57||eR>=97&&eR<=102||eR>=65&&eR<=70)){cw();}
;}
;eN+=cA(V+eO.slice(eM,cq));break;default:cw();};}
else {if(eR==34){break;}
;eR=eO.charCodeAt(cq);eM=cq;while(eR>=32&&eR!=92&&eR!=34){eR=eO.charCodeAt( ++cq);}
;eN+=eO.slice(eM,cq);}
;}
;if(eO.charCodeAt(cq)==34){cq++ ;return eN;}
;cw();default:eM=cq;if(eR==45){eP=true;eR=eO.charCodeAt( ++cq);}
;if(eR>=48&&eR<=57){if(eR==48&&((eR=eO.charCodeAt(cq+1)),eR>=48&&eR<=57)){cw();}
;eP=false;for(;cq<length&&((eR=eO.charCodeAt(cq)),eR>=48&&eR<=57);cq++ );if(eO.charCodeAt(cq)==46){eQ= ++cq;for(;eQ<length&&((eR=eO.charCodeAt(eQ)),eR>=48&&eR<=57);eQ++ );if(eQ==cq){cw();}
;cq=eQ;}
;eR=eO.charCodeAt(cq);if(eR==101||eR==69){eR=eO.charCodeAt( ++cq);if(eR==43||eR==45){cq++ ;}
;for(eQ=cq;eQ<length&&((eR=eO.charCodeAt(eQ)),eR>=48&&eR<=57);eQ++ );if(eQ==cq){cw();}
;cq=eQ;}
;return +eO.slice(eM,cq);}
;if(eP){cw();}
;if(eO.slice(cq,cq+4)==k){cq+=4;return true;}
else if(eO.slice(cq,cq+5)==m){cq+=5;return false;}
else if(eO.slice(cq,cq+4)==bP){cq+=4;return null;}
;cw();};}
;return ca;}
;var cK=function(eU){var eT,eS;if(eU==ca){cw();}
;if(typeof eU==E){if((cE?eU.charAt(0):eU[0])==u){return eU.slice(1);}
;if(eU==cc){eT=[];for(;;eS||(eS=true)){eU=cS();if(eU==Y){break;}
;if(eS){if(eU==bO){eU=cS();if(eU==Y){cw();}
;}
else {cw();}
;}
;if(eU==bO){cw();}
;eT.push(cK(eU));}
;return eT;}
else if(eU==T){eT={};for(;;eS||(eS=true)){eU=cS();if(eU==F){break;}
;if(eS){if(eU==bO){eU=cS();if(eU==F){cw();}
;}
else {cw();}
;}
;if(eU==bO||typeof eU!=E||(cE?eU.charAt(0):eU[0])!=u||cS()!=I){cw();}
;eT[eU.slice(1)]=cK(cS());}
;return eT;}
;cw();}
;return eU;}
;var cO=function(eV,eW,eX){var eY=ct(eV,eW,eX);if(eY===cC){delete eV[eW];}
else {eV[eW]=eY;}
;}
;var ct=function(fa,fb,fd){var fc=fa[fb],length;if(typeof fc==ch&&fc){if(cr.call(fc)==cR){for(length=fc.length;length-- ;){cO(fc,length,fd);}
;}
else {cQ(fc,function(fe){cO(fc,fe,fd);}
);}
;}
;return fd.call(fa,fb,fc);}
;cx.parse=function(ff,fi){var fg,fh;cq=0;cu=B+ff;fg=cK(cS());if(cS()!=ca){cw();}
;cq=cu=null;return fi&&cr.call(fi)==cV?ct((fh={},fh[B]=fg,fh),B,fi):fg;}
;}
;}
;if(cy){cp(function(){return cx;}
);}
;}
(this));}
());qx.lang.Json.stringify=window.JSON.stringify;qx.lang.Json.parse=window.JSON.parse;}
)();
(function(){var a="-",b="]",c='\\u',d="undefined",e="",f='\\$1',g="0041-005A0061-007A00AA00B500BA00C0-00D600D8-00F600F8-02C102C6-02D102E0-02E402EC02EE0370-037403760377037A-037D03860388-038A038C038E-03A103A3-03F503F7-0481048A-05250531-055605590561-058705D0-05EA05F0-05F20621-064A066E066F0671-06D306D506E506E606EE06EF06FA-06FC06FF07100712-072F074D-07A507B107CA-07EA07F407F507FA0800-0815081A082408280904-0939093D09500958-0961097109720979-097F0985-098C098F09900993-09A809AA-09B009B209B6-09B909BD09CE09DC09DD09DF-09E109F009F10A05-0A0A0A0F0A100A13-0A280A2A-0A300A320A330A350A360A380A390A59-0A5C0A5E0A72-0A740A85-0A8D0A8F-0A910A93-0AA80AAA-0AB00AB20AB30AB5-0AB90ABD0AD00AE00AE10B05-0B0C0B0F0B100B13-0B280B2A-0B300B320B330B35-0B390B3D0B5C0B5D0B5F-0B610B710B830B85-0B8A0B8E-0B900B92-0B950B990B9A0B9C0B9E0B9F0BA30BA40BA8-0BAA0BAE-0BB90BD00C05-0C0C0C0E-0C100C12-0C280C2A-0C330C35-0C390C3D0C580C590C600C610C85-0C8C0C8E-0C900C92-0CA80CAA-0CB30CB5-0CB90CBD0CDE0CE00CE10D05-0D0C0D0E-0D100D12-0D280D2A-0D390D3D0D600D610D7A-0D7F0D85-0D960D9A-0DB10DB3-0DBB0DBD0DC0-0DC60E01-0E300E320E330E40-0E460E810E820E840E870E880E8A0E8D0E94-0E970E99-0E9F0EA1-0EA30EA50EA70EAA0EAB0EAD-0EB00EB20EB30EBD0EC0-0EC40EC60EDC0EDD0F000F40-0F470F49-0F6C0F88-0F8B1000-102A103F1050-1055105A-105D106110651066106E-10701075-1081108E10A0-10C510D0-10FA10FC1100-1248124A-124D1250-12561258125A-125D1260-1288128A-128D1290-12B012B2-12B512B8-12BE12C012C2-12C512C8-12D612D8-13101312-13151318-135A1380-138F13A0-13F41401-166C166F-167F1681-169A16A0-16EA1700-170C170E-17111720-17311740-17511760-176C176E-17701780-17B317D717DC1820-18771880-18A818AA18B0-18F51900-191C1950-196D1970-19741980-19AB19C1-19C71A00-1A161A20-1A541AA71B05-1B331B45-1B4B1B83-1BA01BAE1BAF1C00-1C231C4D-1C4F1C5A-1C7D1CE9-1CEC1CEE-1CF11D00-1DBF1E00-1F151F18-1F1D1F20-1F451F48-1F4D1F50-1F571F591F5B1F5D1F5F-1F7D1F80-1FB41FB6-1FBC1FBE1FC2-1FC41FC6-1FCC1FD0-1FD31FD6-1FDB1FE0-1FEC1FF2-1FF41FF6-1FFC2071207F2090-209421022107210A-211321152119-211D212421262128212A-212D212F-2139213C-213F2145-2149214E218321842C00-2C2E2C30-2C5E2C60-2CE42CEB-2CEE2D00-2D252D30-2D652D6F2D80-2D962DA0-2DA62DA8-2DAE2DB0-2DB62DB8-2DBE2DC0-2DC62DC8-2DCE2DD0-2DD62DD8-2DDE2E2F300530063031-3035303B303C3041-3096309D-309F30A1-30FA30FC-30FF3105-312D3131-318E31A0-31B731F0-31FF3400-4DB54E00-9FCBA000-A48CA4D0-A4FDA500-A60CA610-A61FA62AA62BA640-A65FA662-A66EA67F-A697A6A0-A6E5A717-A71FA722-A788A78BA78CA7FB-A801A803-A805A807-A80AA80C-A822A840-A873A882-A8B3A8F2-A8F7A8FBA90A-A925A930-A946A960-A97CA984-A9B2A9CFAA00-AA28AA40-AA42AA44-AA4BAA60-AA76AA7AAA80-AAAFAAB1AAB5AAB6AAB9-AABDAAC0AAC2AADB-AADDABC0-ABE2AC00-D7A3D7B0-D7C6D7CB-D7FBF900-FA2DFA30-FA6DFA70-FAD9FB00-FB06FB13-FB17FB1DFB1F-FB28FB2A-FB36FB38-FB3CFB3EFB40FB41FB43FB44FB46-FBB1FBD3-FD3DFD50-FD8FFD92-FDC7FDF0-FDFBFE70-FE74FE76-FEFCFF21-FF3AFF41-FF5AFF66-FFBEFFC2-FFC7FFCA-FFCFFFD2-FFD7FFDA-FFDC",h="\\\\",j='-',k="g",l="\\\"",m="qx.lang.String",n="(^|[^",o="0",p="%",q='"',r=' ',s='\n',t="])[";qx.Bootstrap.define(m,{statics:{__bY:g,__ca:null,__cb:{},camelCase:function(v){var u=this.__cb[v];if(!u){u=v.replace(/\-([a-z])/g,function(x,w){return w.toUpperCase();}
);if(v.indexOf(a)>=0){this.__cb[v]=u;}
;}
;return u;}
,hyphenate:function(z){var y=this.__cb[z];if(!y){y=z.replace(/[A-Z]/g,function(A){return (j+A.charAt(0).toLowerCase());}
);if(z.indexOf(a)==-1){this.__cb[z]=y;}
;}
;return y;}
,capitalize:function(C){if(this.__ca===null){var B=c;this.__ca=new RegExp(n+this.__bY.replace(/[0-9A-F]{4}/g,function(D){return B+D;}
)+t+this.__bY.replace(/[0-9A-F]{4}/g,function(E){return B+E;}
)+b,k);}
;return C.replace(this.__ca,function(F){return F.toUpperCase();}
);}
,clean:function(G){return G.replace(/\s+/g,r).trim();}
,trimLeft:function(H){return H.replace(/^\s+/,e);}
,trimRight:function(I){return I.replace(/\s+$/,e);}
,startsWith:function(K,J){return K.indexOf(J)===0;}
,endsWith:function(M,L){return M.substring(M.length-L.length,M.length)===L;}
,repeat:function(N,O){return N.length>0?new Array(O+1).join(N):e;}
,pad:function(Q,length,P){var R=length-Q.length;if(R>0){if(typeof P===d){P=o;}
;return this.repeat(P,R)+Q;}
else {return Q;}
;}
,firstUp:qx.Bootstrap.firstUp,firstLow:qx.Bootstrap.firstLow,contains:function(T,S){return T.indexOf(S)!=-1;}
,format:function(U,V){var W=U;var i=V.length;while(i-- ){W=W.replace(new RegExp(p+(i+1),k),function(){return V[i]+e;}
);}
;return W;}
,escapeRegexpChars:function(X){return X.replace(/([.*+?^${}()|[\]\/\\])/g,f);}
,toArray:function(Y){return Y.split(/\B|\b/g);}
,stripTags:function(ba){return ba.replace(/<\/?[^>]+>/gi,e);}
,stripScripts:function(bd,bc){var be=e;var bb=bd.replace(/<script[^>]*>([\s\S]*?)<\/script>/gi,function(){be+=arguments[1]+s;return e;}
);if(bc===true){qx.lang.Function.globalEval(be);}
;return bb;}
,quote:function(bf){return q+bf.replace(/\\/g,h).replace(/\"/g,l)+q;}
}});}
)();
(function(){var c="-",d="qx.debug.dispose",e="",f="qx.core.ObjectRegistry",g="Disposed ",h="$$hash",j="-0",k=" objects",m="Could not dispose object ",n=": ";qx.Bootstrap.define(f,{statics:{inShutDown:false,__j:{},__bT:0,__bU:[],__bV:e,__bW:{},register:function(o){var r=this.__j;if(!r){return;}
;var q=o.$$hash;if(q==null){var p=this.__bU;if(p.length>0&&!qx.core.Environment.get(d)){q=p.pop();}
else {q=(this.__bT++ )+this.__bV;}
;o.$$hash=q;if(qx.core.Environment.get(d)){if(qx.dev&&qx.dev.Debug&&qx.dev.Debug.disposeProfilingActive){this.__bW[q]=qx.dev.StackTrace.getStackTrace();}
;}
;}
;{}
;r[q]=o;}
,unregister:function(s){var t=s.$$hash;if(t==null){return;}
;var u=this.__j;if(u&&u[t]){delete u[t];this.__bU.push(t);}
;try{delete s.$$hash;}
catch(v){if(s.removeAttribute){s.removeAttribute(h);}
;}
;}
,toHashCode:function(w){{}
;var y=w.$$hash;if(y!=null){return y;}
;var x=this.__bU;if(x.length>0){y=x.pop();}
else {y=(this.__bT++ )+this.__bV;}
;return w.$$hash=y;}
,clearHashCode:function(z){{}
;var A=z.$$hash;if(A!=null){this.__bU.push(A);try{delete z.$$hash;}
catch(B){if(z.removeAttribute){z.removeAttribute(h);}
;}
;}
;}
,fromHashCode:function(C){return this.__j[C]||null;}
,shutdown:function(){this.inShutDown=true;var E=this.__j;var G=[];for(var D in E){G.push(D);}
;G.sort(function(a,b){return parseInt(b,10)-parseInt(a,10);}
);var F,i=0,l=G.length;while(true){try{for(;i<l;i++ ){D=G[i];F=E[D];if(F&&F.dispose){F.dispose();}
;}
;}
catch(H){qx.Bootstrap.error(this,m+F.toString()+n+H,H);if(i!==l){i++ ;continue;}
;}
;break;}
;qx.Bootstrap.debug(this,g+l+k);delete this.__j;}
,getRegistry:function(){return this.__j;}
,getNextHash:function(){return this.__bT;}
,getPostId:function(){return this.__bV;}
,getStackTraces:function(){return this.__bW;}
},defer:function(I){if(window&&window.top){var frames=window.top.frames;for(var i=0;i<frames.length;i++ ){if(frames[i]===window){I.__bV=c+(i+1);return;}
;}
;}
;I.__bV=j;}
});}
)();
(function(){var a="qx.event.type.Data",b="qx.event.type.Event",c="qx.data.IListData";qx.Interface.define(c,{events:{"change":a,"changeLength":b},members:{getItem:function(d){}
,setItem:function(e,f){}
,splice:function(g,h,i){}
,contains:function(j){}
,getLength:function(){}
,toArray:function(){}
}});}
)();
(function(){var a="qx.core.ValidationError";qx.Class.define(a,{extend:qx.type.BaseError});}
)();
(function(){var a="qx.util.RingBuffer";qx.Bootstrap.define(a,{extend:Object,construct:function(b){this.setMaxEntries(b||50);}
,members:{__cc:0,__cd:0,__ce:false,__cf:0,__cg:null,__ch:null,setMaxEntries:function(c){this.__ch=c;this.clear();}
,getMaxEntries:function(){return this.__ch;}
,addEntry:function(d){this.__cg[this.__cc]=d;this.__cc=this.__ci(this.__cc,1);var e=this.getMaxEntries();if(this.__cd<e){this.__cd++ ;}
;if(this.__ce&&(this.__cf<e)){this.__cf++ ;}
;}
,mark:function(){this.__ce=true;this.__cf=0;}
,clearMark:function(){this.__ce=false;}
,getAllEntries:function(){return this.getEntries(this.getMaxEntries(),false);}
,getEntries:function(f,j){if(f>this.__cd){f=this.__cd;}
;if(j&&this.__ce&&(f>this.__cf)){f=this.__cf;}
;if(f>0){var h=this.__ci(this.__cc,-1);var g=this.__ci(h,-f+1);var i;if(g<=h){i=this.__cg.slice(g,h+1);}
else {i=this.__cg.slice(g,this.__cd).concat(this.__cg.slice(0,h+1));}
;}
else {i=[];}
;return i;}
,clear:function(){this.__cg=new Array(this.getMaxEntries());this.__cd=0;this.__cf=0;this.__cc=0;}
,__ci:function(n,l){var k=this.getMaxEntries();var m=(n+l)%k;if(m<0){m+=k;}
;return m;}
}});}
)();
(function(){var a="qx.log.appender.RingBuffer";qx.Bootstrap.define(a,{extend:qx.util.RingBuffer,construct:function(b){this.setMaxMessages(b||50);}
,members:{setMaxMessages:function(c){this.setMaxEntries(c);}
,getMaxMessages:function(){return this.getMaxEntries();}
,process:function(d){this.addEntry(d);}
,getAllLogEvents:function(){return this.getAllEntries();}
,retrieveLogEvents:function(e,f){return this.getEntries(e,f);}
,clearHistory:function(){this.clear();}
}});}
)();
(function(){var a="qx.log.Logger",b="[",c="...(+",d="array",e=")",f="info",g="node",h="instance",j="string",k="null",m="error",n="#",o="class",p=": ",q="warn",r="document",s="{...(",t="",u="number",v="stringify",w="]",x="date",y="unknown",z="function",A="text[",B="[...(",C="boolean",D="\n",E=")}",F="debug",G=")]",H="map",I="undefined",J="object";qx.Bootstrap.define(a,{statics:{__cj:F,setLevel:function(K){this.__cj=K;}
,getLevel:function(){return this.__cj;}
,setTreshold:function(L){this.__cm.setMaxMessages(L);}
,getTreshold:function(){return this.__cm.getMaxMessages();}
,__ck:{},__cl:0,register:function(P){if(P.$$id){return;}
;var M=this.__cl++ ;this.__ck[M]=P;P.$$id=M;var N=this.__cn;var O=this.__cm.getAllLogEvents();for(var i=0,l=O.length;i<l;i++ ){if(N[O[i].level]>=N[this.__cj]){P.process(O[i]);}
;}
;}
,unregister:function(Q){var R=Q.$$id;if(R==null){return;}
;delete this.__ck[R];delete Q.$$id;}
,debug:function(T,S){qx.log.Logger.__co(F,arguments);}
,info:function(V,U){qx.log.Logger.__co(f,arguments);}
,warn:function(X,W){qx.log.Logger.__co(q,arguments);}
,error:function(ba,Y){qx.log.Logger.__co(m,arguments);}
,trace:function(bb){var bc=qx.dev.StackTrace.getStackTrace();qx.log.Logger.__co(f,[(typeof bb!==I?[bb].concat(bc):bc).join(D)]);}
,deprecatedMethodWarning:function(bf,bd){{var be;}
;}
,deprecatedClassWarning:function(bi,bg){{var bh;}
;}
,deprecatedEventWarning:function(bl,event,bj){{var bk;}
;}
,deprecatedMixinWarning:function(bn,bm){{var bo;}
;}
,deprecatedConstantWarning:function(bs,bq,bp){{var self,br;}
;}
,deprecateMethodOverriding:function(bv,bu,bw,bt){{var bx;}
;}
,clear:function(){this.__cm.clearHistory();}
,__cm:new qx.log.appender.RingBuffer(50),__cn:{debug:0,info:1,warn:2,error:3},__co:function(bz,bB){var bE=this.__cn;if(bE[bz]<bE[this.__cj]){return;}
;var by=bB.length<2?null:bB[0];var bD=by?1:0;var bA=[];for(var i=bD,l=bB.length;i<l;i++ ){bA.push(this.__cq(bB[i],true));}
;var bF=new Date;var bG={time:bF,offset:bF-qx.Bootstrap.LOADSTART,level:bz,items:bA,win:window};if(by){if(by.$$hash!==undefined){bG.object=by.$$hash;}
else if(by.$$type){bG.clazz=by;}
else if(by.constructor){bG.clazz=by.constructor;}
;}
;this.__cm.process(bG);var bC=this.__ck;for(var bH in bC){bC[bH].process(bG);}
;}
,__cp:function(bJ){if(bJ===undefined){return I;}
else if(bJ===null){return k;}
;if(bJ.$$type){return o;}
;var bI=typeof bJ;if(bI===z||bI==j||bI===u||bI===C){return bI;}
else if(bI===J){if(bJ.nodeType){return g;}
else if(bJ instanceof Error||(bJ.name&&bJ.message)){return m;}
else if(bJ.classname){return h;}
else if(bJ instanceof Array){return d;}
else if(bJ instanceof Date){return x;}
else {return H;}
;}
;if(bJ.toString){return v;}
;return y;}
,__cq:function(bP,bO){var bS=this.__cp(bP);var bM=y;var bL=[];switch(bS){case k:case I:bM=bS;break;case j:case u:case C:case x:bM=bP;break;case g:if(bP.nodeType===9){bM=r;}
else if(bP.nodeType===3){bM=A+bP.nodeValue+w;}
else if(bP.nodeType===1){bM=bP.nodeName.toLowerCase();if(bP.id){bM+=n+bP.id;}
;}
else {bM=g;}
;break;case z:bM=qx.lang.Function.getName(bP)||bS;break;case h:bM=bP.basename+b+bP.$$hash+w;break;case o:case v:bM=bP.toString();break;case m:bL=qx.dev.StackTrace.getStackTraceFromError(bP);bM=(bP.basename?bP.basename+p:t)+bP.toString();break;case d:if(bO){bM=[];for(var i=0,l=bP.length;i<l;i++ ){if(bM.length>20){bM.push(c+(l-i)+e);break;}
;bM.push(this.__cq(bP[i],false));}
;}
else {bM=B+bP.length+G;}
;break;case H:if(bO){var bK;var bR=[];for(var bQ in bP){bR.push(bQ);}
;bR.sort();bM=[];for(var i=0,l=bR.length;i<l;i++ ){if(bM.length>20){bM.push(c+(l-i)+e);break;}
;bQ=bR[i];bK=this.__cq(bP[bQ],false);bK.key=bQ;bM.push(bK);}
;}
else {var bN=0;for(var bQ in bP){bN++ ;}
;bM=s+bN+E;}
;break;};return {type:bS,text:bM,trace:bL};}
},defer:function(bT){var bU=qx.Bootstrap.$$logs;for(var i=0;i<bU.length;i++ ){bT.__co(bU[i][0],bU[i][1]);}
;qx.Bootstrap.debug=bT.debug;qx.Bootstrap.info=bT.info;qx.Bootstrap.warn=bT.warn;qx.Bootstrap.error=bT.error;qx.Bootstrap.trace=bT.trace;}
});}
)();
(function(){var a="qx.core.MProperty",b="get",c="reset",d="No such property: ",e="set";qx.Mixin.define(a,{members:{set:function(g,h){var f=qx.core.Property.$$method.set;if(qx.Bootstrap.isString(g)){if(!this[f[g]]){if(this[e+qx.Bootstrap.firstUp(g)]!=undefined){this[e+qx.Bootstrap.firstUp(g)](h);return this;}
;throw new Error(d+g);}
;return this[f[g]](h);}
else {for(var i in g){if(!this[f[i]]){if(this[e+qx.Bootstrap.firstUp(i)]!=undefined){this[e+qx.Bootstrap.firstUp(i)](g[i]);continue;}
;throw new Error(d+i);}
;this[f[i]](g[i]);}
;return this;}
;}
,get:function(k){var j=qx.core.Property.$$method.get;if(!this[j[k]]){if(this[b+qx.Bootstrap.firstUp(k)]!=undefined){return this[b+qx.Bootstrap.firstUp(k)]();}
;throw new Error(d+k);}
;return this[j[k]]();}
,reset:function(m){var l=qx.core.Property.$$method.reset;if(!this[l[m]]){if(this[c+qx.Bootstrap.firstUp(m)]!=undefined){this[c+qx.Bootstrap.firstUp(m)]();return;}
;throw new Error(d+m);}
;this[l[m]]();}
}});}
)();
(function(){var a="info",b="debug",c="warn",d="qx.core.MLogging",e="error";qx.Mixin.define(d,{members:{__cr:qx.log.Logger,debug:function(f){this.__cs(b,arguments);}
,info:function(g){this.__cs(a,arguments);}
,warn:function(h){this.__cs(c,arguments);}
,error:function(i){this.__cs(e,arguments);}
,trace:function(){this.__cr.trace(this);}
,__cs:function(j,l){var k=qx.lang.Array.fromArguments(l);k.unshift(this);this.__cr[j].apply(this.__cr,k);}
}});}
)();
(function(){var b="qx.dom.Node",c="";qx.Bootstrap.define(b,{statics:{ELEMENT:1,ATTRIBUTE:2,TEXT:3,CDATA_SECTION:4,ENTITY_REFERENCE:5,ENTITY:6,PROCESSING_INSTRUCTION:7,COMMENT:8,DOCUMENT:9,DOCUMENT_TYPE:10,DOCUMENT_FRAGMENT:11,NOTATION:12,getDocument:function(d){return d.nodeType===this.DOCUMENT?d:d.ownerDocument||d.document;}
,getWindow:function(e){if(e.nodeType==null){return e;}
;if(e.nodeType!==this.DOCUMENT){e=e.ownerDocument;}
;return e.defaultView||e.parentWindow;}
,getDocumentElement:function(f){return this.getDocument(f).documentElement;}
,getBodyElement:function(g){return this.getDocument(g).body;}
,isNode:function(h){return !!(h&&h.nodeType!=null);}
,isElement:function(j){return !!(j&&j.nodeType===this.ELEMENT);}
,isDocument:function(k){return !!(k&&k.nodeType===this.DOCUMENT);}
,isDocumentFragment:function(l){return !!(l&&l.nodeType===this.DOCUMENT_FRAGMENT);}
,isText:function(m){return !!(m&&m.nodeType===this.TEXT);}
,isWindow:function(n){return !!(n&&n.history&&n.location&&n.document);}
,isNodeName:function(o,p){if(!p||!o||!o.nodeName){return false;}
;return p.toLowerCase()==qx.dom.Node.getName(o);}
,getName:function(q){if(!q||!q.nodeName){return null;}
;return q.nodeName.toLowerCase();}
,getText:function(r){if(!r||!r.nodeType){return null;}
;switch(r.nodeType){case 1:var i,a=[],s=r.childNodes,length=s.length;for(i=0;i<length;i++ ){a[i]=this.getText(s[i]);}
;return a.join(c);case 2:case 3:case 4:return r.nodeValue;};return null;}
,isBlockNode:function(t){if(!qx.dom.Node.isElement(t)){return false;}
;t=qx.dom.Node.getName(t);return /^(body|form|textarea|fieldset|ul|ol|dl|dt|dd|li|div|hr|p|h[1-6]|quote|pre|table|thead|tbody|tfoot|tr|td|th|iframe|address|blockquote)$/.test(t);}
}});}
)();
(function(){var a="function",b='loadeddata',c="pointerover",d='pause',f="transitionend",g="gecko",h="browser.name",j='timeupdate',k='canplay',m="HTMLEvents",n='loadedmetadata',o="css.transition",p="mobile safari",q="return;",r="browser.documentmode",s="safari",t='play',u='ended',v="",w="qx.bom.Event",x='playing',y="mouseover",z="end-event",A="mshtml",B="engine.name",C='progress',D="webkit",E='volumechange',F='seeked',G="on",H="undefined";qx.Bootstrap.define(w,{statics:{addNativeListener:function(L,K,I,J){if(L.addEventListener){L.addEventListener(K,I,!!J);}
else if(L.attachEvent){L.attachEvent(G+K,I);}
else if(typeof L[G+K]!=H){L[G+K]=I;}
else {{}
;}
;}
,removeNativeListener:function(P,O,M,N){if(P.removeEventListener){P.removeEventListener(O,M,!!N);}
else if(P.detachEvent){try{P.detachEvent(G+O,M);}
catch(e){if(e.number!==-2146828218){throw e;}
;}
;}
else if(typeof P[G+O]!=H){P[G+O]=null;}
else {{}
;}
;}
,getTarget:function(e){return e.target||e.srcElement;}
,getRelatedTarget:function(e){if(e.relatedTarget!==undefined){if((qx.core.Environment.get(B)==g)){try{e.relatedTarget&&e.relatedTarget.nodeType;}
catch(Q){return null;}
;}
;return e.relatedTarget;}
else if(e.fromElement!==undefined&&(e.type===y||e.type===c)){return e.fromElement;}
else if(e.toElement!==undefined){return e.toElement;}
else {return null;}
;}
,preventDefault:function(e){if(e.preventDefault){e.preventDefault();}
else {try{e.keyCode=0;}
catch(R){}
;e.returnValue=false;}
;}
,stopPropagation:function(e){if(e.stopPropagation){e.stopPropagation();}
else {e.cancelBubble=true;}
;}
,fire:function(U,S){if(document.createEvent){var T=document.createEvent(m);T.initEvent(S,true,true);return !U.dispatchEvent(T);}
else {var T=document.createEventObject();return U.fireEvent(G+S,T);}
;}
,supportsEvent:function(V,be){var ba=qx.core.Environment.get(h);var bb=qx.core.Environment.get(B);if(be.toLowerCase().indexOf(f)!=-1&&bb===A&&qx.core.Environment.get(r)>9){return true;}
;var bc=[p,s];if(bb===D&&bc.indexOf(ba)>-1){var W=[b,C,j,F,k,t,x,d,n,u,E];if(W.indexOf(be.toLowerCase())>-1){return true;}
;}
;if(V!=window&&be.toLowerCase().indexOf(f)!=-1){var bd=qx.core.Environment.get(o);return (bd&&bd[z]==be);}
;var X=G+be.toLowerCase();var Y=(X in V);if(!Y){Y=typeof V[X]==a;if(!Y&&V.setAttribute){V.setAttribute(X,q);Y=typeof V[X]==a;V.removeAttribute(X);}
;}
;return Y;}
,getEventName:function(bf,bi){var bg=[v].concat(qx.bom.Style.VENDOR_PREFIXES);for(var i=0,l=bg.length;i<l;i++ ){var bh=bg[i].toLowerCase();if(qx.bom.Event.supportsEvent(bf,bh+bi)){return bh?bh+qx.lang.String.firstUp(bi):bi;}
;}
;return null;}
}});}
)();
(function(){var a="-",b="qx.bom.Style",c="",d='-',e="Webkit",f="ms",g=":",h=";",j="Moz",k="O",m="string",n="Khtml";qx.Bootstrap.define(b,{statics:{VENDOR_PREFIXES:[e,j,k,f,n],__ct:{},__cu:null,getPropertyName:function(q){var o=document.documentElement.style;if(o[q]!==undefined){return q;}
;for(var i=0,l=this.VENDOR_PREFIXES.length;i<l;i++ ){var p=this.VENDOR_PREFIXES[i]+qx.lang.String.firstUp(q);if(o[p]!==undefined){return p;}
;}
;return null;}
,getCssName:function(r){var s=this.__ct[r];if(!s){s=r.replace(/[A-Z]/g,function(t){return (d+t.charAt(0).toLowerCase());}
);if((/^ms/.test(s))){s=a+s;}
;this.__ct[r]=s;}
;return s;}
,getAppliedStyle:function(A,x,z,v){var C=qx.bom.Style.getCssName(x);var w=qx.dom.Node.getWindow(A);var u=(v!==false)?[null].concat(this.VENDOR_PREFIXES):[null];for(var i=0,l=u.length;i<l;i++ ){var y=false;var B=u[i]?a+u[i].toLowerCase()+a+z:z;if(qx.bom.Style.__cu){y=qx.bom.Style.__cu.call(w,C,B);}
else {A.style.cssText+=C+g+B+h;y=(typeof A.style[x]==m&&A.style[x]!==c);}
;if(y){return B;}
;}
;return null;}
},defer:function(D){if(window.CSS&&window.CSS.supports){qx.bom.Style.__cu=window.CSS.supports.bind(window.CSS);}
else if(window.supportsCSS){qx.bom.Style.__cu=window.supportsCSS.bind(window);}
;}
});}
)();
(function(){var a="rim_tabletos",b="10.1",c="Darwin",d="10.3",e="iPad",f="os.version",g="10.7",h="2003",i="4",j=")",k="iPhone",l="android",m="unix",n="ce",o="7",p="SymbianOS",q="criax.app.type",r="os.name",s="10.9",t="MacPPC",u="95",v="iPod",w="10.8",x="\.",y="Win64",z="linux",A="me",B="10.2",C="Macintosh",D="Android",E="Windows",F="98",G="ios",H="10",I="vista",J="8",K="BlackBerry",L="2000",M="8.1",N="(",O="",P="win",Q="Linux",R="10.6",S="BSD",T="10.0",U="10.4",V="10.5",W="Mac OS X",X="Windows Phone",Y="X11",bv="xp",bw="symbian",bx="qx.bom.client.OperatingSystem",br="g",bs="MacIntel",bt="Win32",bu="10.10",bB="osx",bC="|",bD="RIM Tablet OS",bF="blackberry",by="desktop",bz="nt4",bA=".",bq="webOS",bE="webos";qx.Bootstrap.define(bx,{statics:{getName:function(){if(qx.core.Environment.get(q)==by){if(!navigator){return O;}
;var bG=navigator.platform||O;var bH=navigator.userAgent||O;if(bG.indexOf(E)!=-1||bG.indexOf(bt)!=-1||bG.indexOf(y)!=-1||bH.indexOf(X)!=-1){return P;}
else if(bG.indexOf(C)!=-1||bG.indexOf(t)!=-1||bG.indexOf(bs)!=-1||bG.indexOf(W)!=-1){return bB;}
else if(bH.indexOf(bD)!=-1){return a;}
else if(bH.indexOf(bq)!=-1){return bE;}
else if(bG.indexOf(v)!=-1||bG.indexOf(k)!=-1||bG.indexOf(e)!=-1){return G;}
else if(bH.indexOf(D)!=-1){return l;}
else if(bG.indexOf(Q)!=-1){return z;}
else if(bG.indexOf(Y)!=-1||bG.indexOf(S)!=-1||bG.indexOf(c)!=-1){return m;}
else if(bG.indexOf(p)!=-1){return bw;}
else if(bG.indexOf(K)!=-1){return bF;}
;return O;}
else {return l;}
;}
,__cv:{"Windows NT 10.0":H,"Windows NT 6.3":M,"Windows NT 6.2":J,"Windows NT 6.1":o,"Windows NT 6.0":I,"Windows NT 5.2":h,"Windows NT 5.1":bv,"Windows NT 5.0":L,"Windows 2000":L,"Windows NT 4.0":bz,"Win 9x 4.90":A,"Windows CE":n,"Windows 98":F,"Win98":F,"Windows 95":u,"Win95":u,"Mac OS X 10_10":bu,"Mac OS X 10.10":bu,"Mac OS X 10_9":s,"Mac OS X 10.9":s,"Mac OS X 10_8":w,"Mac OS X 10.8":w,"Mac OS X 10_7":g,"Mac OS X 10.7":g,"Mac OS X 10_6":R,"Mac OS X 10.6":R,"Mac OS X 10_5":V,"Mac OS X 10.5":V,"Mac OS X 10_4":U,"Mac OS X 10.4":U,"Mac OS X 10_3":d,"Mac OS X 10.3":d,"Mac OS X 10_2":B,"Mac OS X 10.2":B,"Mac OS X 10_1":b,"Mac OS X 10.1":b,"Mac OS X 10_0":T,"Mac OS X 10.0":T},getVersion:function(){if(qx.core.Environment.get(q)==by){var bI=qx.bom.client.OperatingSystem.__cw(navigator.userAgent);if(bI==null){bI=qx.bom.client.OperatingSystem.__cx(navigator.userAgent);}
;if(bI!=null){return bI;}
else {return O;}
;}
else {return i;}
;}
,__cw:function(bJ){var bM=[];for(var bL in qx.bom.client.OperatingSystem.__cv){bM.push(bL);}
;var bN=new RegExp(N+bM.join(bC).replace(/\./g,x)+j,br);var bK=bN.exec(bJ);if(bK&&bK[1]){return qx.bom.client.OperatingSystem.__cv[bK[1]];}
;return null;}
,__cx:function(bT){var bO=bT.indexOf(X)!=-1;var bU=bT.indexOf(D)!=-1;var bP=bT.match(/(iPad|iPhone|iPod)/i)?true:false;if(bO){var bW=new RegExp(/Windows Phone (\d+(?:\.\d+)+)/i);var bR=bW.exec(bT);if(bR&&bR[1]){return bR[1];}
;}
else if(bU){var bS=new RegExp(/ Android (\d+(?:\.\d+)+)/i);var bV=bS.exec(bT);if(bV&&bV[1]){return bV[1];}
;}
else if(bP){var bX=new RegExp(/(CPU|iPhone|iPod) OS (\d+)_(\d+)(?:_(\d+))*\s+/);var bQ=bX.exec(bT);if(bQ&&bQ[2]&&bQ[3]){if(bQ[4]){return bQ[2]+bA+bQ[3]+bA+bQ[4];}
else {return bQ[2]+bA+bQ[3];}
;}
;}
;return null;}
},defer:function(bY){qx.core.Environment.add(r,bY.getName);qx.core.Environment.add(f,bY.getVersion);}
});}
)();
(function(){var a="CSS1Compat",b="IEMobile",c=" OPR/",d="msie",e="android",f="operamini",g="gecko",h="maple",i="AdobeAIR|Titanium|Fluid|Chrome|Android|Epiphany|Konqueror|iCab|iPad|iPhone|OmniWeb|Maxthon|Pre|PhantomJS|Mobile Safari|Safari",j="browser.quirksmode",k="browser.name",l="trident",m="mobile chrome",n=")(/| )([0-9]+\.[0-9])",o="iemobile",p="prism|Fennec|Camino|Kmeleon|Galeon|Netscape|SeaMonkey|Namoroka|Firefox",q="IEMobile|Maxthon|MSIE|Trident",r="opera mobi",s="Mobile Safari",t="Maple",u="operamobile",v="ie",w="mobile safari",x="qx.bom.client.Browser",y="(Maple )([0-9]+\.[0-9]+\.[0-9]*)",z="",A="opera mini",B="(",C="browser.version",D="opera",E="ce",F=")(/|)?([0-9]+\.[0-9])?",G="mshtml",H="Opera Mini|Opera Mobi|Opera",I="edge",J="webkit",K="browser.documentmode",L="5.0",M="Mobile/";qx.Bootstrap.define(x,{statics:{getName:function(){var P=navigator.userAgent;var Q=new RegExp(B+qx.bom.client.Browser.__cy+F);var O=P.match(Q);if(!O){return z;}
;var name=O[1].toLowerCase();var N=qx.bom.client.Engine.getName();if(N===J){if(P.match(/Edge\/\d+\.\d+/)){name=I;}
else if(name===e){name=m;}
else if(P.indexOf(s)!==-1||P.indexOf(M)!==-1){name=w;}
else if(P.indexOf(c)!=-1){name=D;}
;}
else if(N===G){if(name===d||name===l){name=v;if(qx.bom.client.OperatingSystem.getVersion()===E){name=o;}
;var Q=new RegExp(b);if(P.match(Q)){name=o;}
;}
;}
else if(N===D){if(name===r){name=u;}
else if(name===A){name=f;}
;}
else if(N===g){if(P.indexOf(t)!==-1){name=h;}
;}
;return name;}
,getVersion:function(){var T=navigator.userAgent;var U=new RegExp(B+qx.bom.client.Browser.__cy+n);var R=T.match(U);if(!R){return z;}
;var name=R[1].toLowerCase();var S=R[3];if(T.match(/Version(\/| )([0-9]+\.[0-9])/)){S=RegExp.$2;}
;if(qx.bom.client.Engine.getName()==G){S=qx.bom.client.Engine.getVersion();if(name===d&&qx.bom.client.OperatingSystem.getVersion()==E){S=L;}
;}
;if(qx.bom.client.Browser.getName()==h){U=new RegExp(y);R=T.match(U);if(!R){return z;}
;S=R[2];}
;if(qx.bom.client.Engine.getName()==J||qx.bom.client.Browser.getName()==D){if(T.match(/OPR(\/| )([0-9]+\.[0-9])/)){S=RegExp.$2;}
;if(T.match(/Edge\/([\d+\.*]+)/)){S=RegExp.$1;}
;}
;return S;}
,getDocumentMode:function(){if(document.documentMode){return document.documentMode;}
;return 0;}
,getQuirksMode:function(){if(qx.bom.client.Engine.getName()==G&&parseFloat(qx.bom.client.Engine.getVersion())>=8){return qx.bom.client.Engine.DOCUMENT_MODE===5;}
else {return document.compatMode!==a;}
;}
,__cy:{"webkit":i,"gecko":p,"mshtml":q,"opera":H}[qx.bom.client.Engine.getName()]},defer:function(V){qx.core.Environment.add(k,V.getName);qx.core.Environment.add(C,V.getVersion);qx.core.Environment.add(K,V.getDocumentMode);qx.core.Environment.add(j,V.getQuirksMode);}
});}
)();
(function(){var a="qx.bom.client.CssTransition",b="E",c="transitionEnd",d="e",e="nd",f="transition",g="css.transition",h="Trans";qx.Bootstrap.define(a,{statics:{getTransitionName:function(){return qx.bom.Style.getPropertyName(f);}
,getSupport:function(){var name=qx.bom.client.CssTransition.getTransitionName();if(!name){return null;}
;var i=qx.bom.Event.getEventName(window,c);i=i==c?i.toLowerCase():i;if(!i){i=name+(name.indexOf(h)>0?b:d)+e;}
;return {name:name,"end-event":i};}
},defer:function(j){qx.core.Environment.add(g,j.getSupport);}
});}
)();
(function(){var a="__cD",b="UNKNOWN_",c="|bubble",d="",e="_",f="__cE",g="c",h="|",j="unload",k="|capture",m="DOM_",n="WIN_",o="QX_",p="qx.event.Manager",q="capture",r="DOCUMENT_";qx.Class.define(p,{extend:Object,construct:function(s,u){this.__cz=s;this.__cA=qx.core.ObjectRegistry.toHashCode(s);this.__cB=u;if(s.qx!==qx){var self=this;var t=function(){qx.bom.Event.removeNativeListener(s,j,arguments.callee);self.dispose();}
;{qx.bom.Event.addNativeListener(s,j,qx.event.GlobalError.observeMethod(t));}
;}
;this.__cC={};this.__cD={};this.__cE={};this.__cF={};}
,statics:{__cG:0,getNextUniqueId:function(){return (this.__cG++ )+d;}
},members:{__cB:null,__cC:null,__cE:null,__cH:null,__cD:null,__cF:null,__cz:null,__cA:null,getWindow:function(){return this.__cz;}
,getWindowId:function(){return this.__cA;}
,getHandler:function(w){var v=this.__cD[w.classname];if(v){return v;}
;return this.__cD[w.classname]=new w(this);}
,getDispatcher:function(y){var x=this.__cE[y.classname];if(x){return x;}
;return this.__cE[y.classname]=new y(this,this.__cB);}
,getListeners:function(A,E,z){var C=A.$$hash||qx.core.ObjectRegistry.toHashCode(A);var F=this.__cC[C];if(!F){return null;}
;var D=E+(z?k:c);var B=F[D];return B?B.concat():null;}
,getAllListeners:function(){return this.__cC;}
,serializeListeners:function(H){var L=H.$$hash||qx.core.ObjectRegistry.toHashCode(H);var P=this.__cC[L];var K=[];if(P){var I,O,G,J,M;for(var N in P){I=N.indexOf(h);O=N.substring(0,I);G=N.charAt(I+1)==g;J=P[N];for(var i=0,l=J.length;i<l;i++ ){M=J[i];K.push({self:M.context,handler:M.handler,type:O,capture:G});}
;}
;}
;return K;}
,toggleAttachedEvents:function(S,R){var V=S.$$hash||qx.core.ObjectRegistry.toHashCode(S);var Y=this.__cC[V];if(Y){var T,X,Q,U;for(var W in Y){T=W.indexOf(h);X=W.substring(0,T);Q=W.charCodeAt(T+1)===99;U=Y[W];if(R){this.__cI(S,X,Q);}
else {this.__cJ(S,X,Q);}
;}
;}
;}
,hasListener:function(bb,bf,ba){{}
;var bd=bb.$$hash||qx.core.ObjectRegistry.toHashCode(bb);var bg=this.__cC[bd];if(!bg){return false;}
;var be=bf+(ba?k:c);var bc=bg[be];return !!(bc&&bc.length>0);}
,importListeners:function(bh,bj){{}
;var bn=bh.$$hash||qx.core.ObjectRegistry.toHashCode(bh);var bp=this.__cC[bn]={};var bl=qx.event.Manager;for(var bi in bj){var bm=bj[bi];var bo=bm.type+(bm.capture?k:c);var bk=bp[bo];if(!bk){bk=bp[bo]=[];this.__cI(bh,bm.type,bm.capture);}
;bk.push({handler:bm.listener,context:bm.self,unique:bm.unique||(bl.__cG++ )+d});}
;}
,addListener:function(bs,bz,bu,self,bq){{var bw;}
;var br=bs.$$hash||qx.core.ObjectRegistry.toHashCode(bs);var bA=this.__cC[br];if(!bA){bA=this.__cC[br]={};}
;var bv=bz+(bq?k:c);var bt=bA[bv];if(!bt){bt=bA[bv]=[];}
;if(bt.length===0){this.__cI(bs,bz,bq);}
;var by=(qx.event.Manager.__cG++ )+d;var bx={handler:bu,context:self,unique:by};bt.push(bx);return bv+h+by;}
,findHandler:function(bF,bO){var bM=false,bE=false,bP=false,bB=false;var bL;if(bF.nodeType===1){bM=true;bL=m+bF.tagName.toLowerCase()+e+bO;}
else if(bF.nodeType===9){bB=true;bL=r+bO;}
else if(bF==this.__cz){bE=true;bL=n+bO;}
else if(bF.classname){bP=true;bL=o+bF.classname+e+bO;}
else {bL=b+bF+e+bO;}
;var bD=this.__cF;if(bD[bL]){return bD[bL];}
;var bK=this.__cB.getHandlers();var bG=qx.event.IEventHandler;var bI,bJ,bH,bC;for(var i=0,l=bK.length;i<l;i++ ){bI=bK[i];bH=bI.SUPPORTED_TYPES;if(bH&&!bH[bO]){continue;}
;bC=bI.TARGET_CHECK;if(bC){var bN=false;if(bM&&((bC&bG.TARGET_DOMNODE)!=0)){bN=true;}
else if(bE&&((bC&bG.TARGET_WINDOW)!=0)){bN=true;}
else if(bP&&((bC&bG.TARGET_OBJECT)!=0)){bN=true;}
else if(bB&&((bC&bG.TARGET_DOCUMENT)!=0)){bN=true;}
;if(!bN){continue;}
;}
;bJ=this.getHandler(bK[i]);if(bI.IGNORE_CAN_HANDLE||bJ.canHandleEvent(bF,bO)){bD[bL]=bJ;return bJ;}
;}
;return null;}
,__cI:function(bT,bS,bQ){var bR=this.findHandler(bT,bS);if(bR){bR.registerEvent(bT,bS,bQ);return;}
;{}
;}
,removeListener:function(bW,cd,bY,self,bU){{var cb;}
;var bV=bW.$$hash||qx.core.ObjectRegistry.toHashCode(bW);var ce=this.__cC[bV];if(!ce){return false;}
;var ca=cd+(bU?k:c);var bX=ce[ca];if(!bX){return false;}
;var cc;for(var i=0,l=bX.length;i<l;i++ ){cc=bX[i];if(cc.handler===bY&&cc.context===self){qx.lang.Array.removeAt(bX,i);if(bX.length==0){this.__cJ(bW,cd,bU);}
;return true;}
;}
;return false;}
,removeListenerById:function(ch,cp){{var cl;}
;var cj=cp.split(h);var co=cj[0];var cf=cj[1].charCodeAt(0)==99;var cn=cj[2];var cg=ch.$$hash||qx.core.ObjectRegistry.toHashCode(ch);var cq=this.__cC[cg];if(!cq){return false;}
;var ck=co+(cf?k:c);var ci=cq[ck];if(!ci){return false;}
;var cm;for(var i=0,l=ci.length;i<l;i++ ){cm=ci[i];if(cm.unique===cn){qx.lang.Array.removeAt(ci,i);if(ci.length==0){this.__cJ(ch,co,cf);}
;return true;}
;}
;return false;}
,removeAllListeners:function(cs){var cu=cs.$$hash||qx.core.ObjectRegistry.toHashCode(cs);var cx=this.__cC[cu];if(!cx){return false;}
;var ct,cw,cr;for(var cv in cx){if(cx[cv].length>0){ct=cv.split(h);cw=ct[0];cr=ct[1]===q;this.__cJ(cs,cw,cr);}
;}
;delete this.__cC[cu];return true;}
,deleteAllListeners:function(cy){delete this.__cC[cy];}
,__cJ:function(cC,cB,cz){var cA=this.findHandler(cC,cB);if(cA){cA.unregisterEvent(cC,cB,cz);return;}
;{}
;}
,dispatchEvent:function(cE,event){{var cI;}
;var cJ=event.getType();if(!event.getBubbles()&&!this.hasListener(cE,cJ)){qx.event.Pool.getInstance().poolObject(event);return true;}
;if(!event.getTarget()){event.setTarget(cE);}
;var cH=this.__cB.getDispatchers();var cG;var cD=false;for(var i=0,l=cH.length;i<l;i++ ){cG=this.getDispatcher(cH[i]);if(cG.canDispatchEvent(cE,event,cJ)){cG.dispatchEvent(cE,event,cJ);cD=true;break;}
;}
;if(!cD){{}
;return true;}
;var cF=event.getDefaultPrevented();qx.event.Pool.getInstance().poolObject(event);return !cF;}
,dispose:function(){this.__cB.removeManager(this);qx.util.DisposeUtil.disposeMap(this,a);qx.util.DisposeUtil.disposeMap(this,f);this.__cC=this.__cz=this.__cH=null;this.__cB=this.__cF=null;}
}});}
)();
(function(){var a="qx.event.IEventHandler";qx.Interface.define(a,{statics:{TARGET_DOMNODE:1,TARGET_WINDOW:2,TARGET_OBJECT:4,TARGET_DOCUMENT:8},members:{canHandleEvent:function(c,b){}
,registerEvent:function(f,e,d){}
,unregisterEvent:function(i,h,g){}
}});}
)();
(function(){var c="qx.event.Registration";qx.Class.define(c,{statics:{__cK:{},getManager:function(f){if(f==null){{}
;f=window;}
else if(f.nodeType){f=qx.dom.Node.getWindow(f);}
else if(!qx.dom.Node.isWindow(f)){f=window;}
;var e=f.$$hash||qx.core.ObjectRegistry.toHashCode(f);var d=this.__cK[e];if(!d){d=new qx.event.Manager(f,this);this.__cK[e]=d;}
;return d;}
,removeManager:function(g){var h=g.getWindowId();delete this.__cK[h];}
,addListener:function(l,k,i,self,j){return this.getManager(l).addListener(l,k,i,self,j);}
,removeListener:function(p,o,m,self,n){return this.getManager(p).removeListener(p,o,m,self,n);}
,removeListenerById:function(q,r){return this.getManager(q).removeListenerById(q,r);}
,removeAllListeners:function(s){return this.getManager(s).removeAllListeners(s);}
,deleteAllListeners:function(u){var t=u.$$hash;if(t){this.getManager(u).deleteAllListeners(t);}
;}
,hasListener:function(x,w,v){return this.getManager(x).hasListener(x,w,v);}
,serializeListeners:function(y){return this.getManager(y).serializeListeners(y);}
,createEvent:function(B,C,A){{}
;if(C==null){C=qx.event.type.Event;}
;var z=qx.event.Pool.getInstance().getObject(C);A?z.init.apply(z,A):z.init();if(B){z.setType(B);}
;return z;}
,dispatchEvent:function(D,event){return this.getManager(D).dispatchEvent(D,event);}
,fireEvent:function(E,F,H,G){{var I;}
;var J=this.createEvent(F,H||null,G);return this.getManager(E).dispatchEvent(E,J);}
,fireNonBubblingEvent:function(K,P,N,M){{}
;var O=this.getManager(K);if(!O.hasListener(K,P,false)){return true;}
;var L=this.createEvent(P,N||null,M);return O.dispatchEvent(K,L);}
,PRIORITY_FIRST:-32000,PRIORITY_NORMAL:0,PRIORITY_LAST:32000,__cD:[],addHandler:function(Q){{}
;this.__cD.push(Q);this.__cD.sort(function(a,b){return a.PRIORITY-b.PRIORITY;}
);}
,getHandlers:function(){return this.__cD;}
,__cE:[],addDispatcher:function(S,R){{}
;this.__cE.push(S);this.__cE.sort(function(a,b){return a.PRIORITY-b.PRIORITY;}
);}
,getDispatchers:function(){return this.__cE;}
}});}
)();
(function(){var a="qx.core.MEvent";qx.Mixin.define(a,{members:{__cL:qx.event.Registration,addListener:function(d,b,self,c){if(!this.$$disposed){return this.__cL.addListener(this,d,b,self,c);}
;return null;}
,addListenerOnce:function(h,f,self,g){var i=function(e){this.removeListener(h,f,this,g);f.call(self||this,e);}
;if(!f.$$wrapped_callback){f.$$wrapped_callback={};}
;f.$$wrapped_callback[h+this.$$hash]=i;return this.addListener(h,i,this,g);}
,removeListener:function(l,j,self,k){if(!this.$$disposed){if(j.$$wrapped_callback&&j.$$wrapped_callback[l+this.$$hash]){var m=j.$$wrapped_callback[l+this.$$hash];delete j.$$wrapped_callback[l+this.$$hash];j=m;}
;return this.__cL.removeListener(this,l,j,self,k);}
;return false;}
,removeListenerById:function(n){if(!this.$$disposed){return this.__cL.removeListenerById(this,n);}
;return false;}
,hasListener:function(p,o){return this.__cL.hasListener(this,p,o);}
,dispatchEvent:function(q){if(!this.$$disposed){return this.__cL.dispatchEvent(this,q);}
;return true;}
,fireEvent:function(s,t,r){if(!this.$$disposed){return this.__cL.fireEvent(this,s,t,r);}
;return true;}
,fireNonBubblingEvent:function(v,w,u){if(!this.$$disposed){return this.__cL.fireNonBubblingEvent(this,v,w,u);}
;return true;}
,fireDataEvent:function(z,A,x,y){if(!this.$$disposed){if(x===undefined){x=null;}
;return this.__cL.fireNonBubblingEvent(this,z,qx.event.type.Data,[A,x,!!y]);}
;return true;}
}});}
)();
(function(){var a="module.events",b="Cloning only possible with properties.",c="qx.core.Object",d="module.property",e="]",f="[",g="Object";qx.Class.define(c,{extend:Object,include:qx.core.Environment.filter({"module.databinding":qx.data.MBinding,"module.logger":qx.core.MLogging,"module.events":qx.core.MEvent,"module.property":qx.core.MProperty}),construct:function(){qx.core.ObjectRegistry.register(this);}
,statics:{$$type:g},members:{__L:qx.core.Environment.get(d)?qx.core.Property:null,toHashCode:function(){return this.$$hash;}
,toString:function(){return this.classname+f+this.$$hash+e;}
,base:function(h,j){{}
;if(arguments.length===1){return h.callee.base.call(this);}
else {return h.callee.base.apply(this,Array.prototype.slice.call(arguments,1));}
;}
,self:function(k){return k.callee.self;}
,clone:function(){if(!qx.core.Environment.get(d)){throw new Error(b);}
;var n=this.constructor;var m=new n;var p=qx.Class.getProperties(n);var o=this.__L.$$store.user;var q=this.__L.$$method.set;var name;for(var i=0,l=p.length;i<l;i++ ){name=p[i];if(this.hasOwnProperty(o[name])){m[q[name]](this[o[name]]);}
;}
;return m;}
,__cM:null,setUserData:function(r,s){if(!this.__cM){this.__cM={};}
;this.__cM[r]=s;}
,getUserData:function(u){if(!this.__cM){return null;}
;var t=this.__cM[u];return t===undefined?null:t;}
,isDisposed:function(){return this.$$disposed||false;}
,dispose:function(){if(this.$$disposed){return;}
;this.$$disposed=true;this.$$instance=null;this.$$allowconstruct=null;{}
;var x=this.constructor;var v;while(x.superclass){if(x.$$destructor){x.$$destructor.call(this);}
;if(x.$$includes){v=x.$$flatIncludes;for(var i=0,l=v.length;i<l;i++ ){if(v[i].$$destructor){v[i].$$destructor.call(this);}
;}
;}
;x=x.superclass;}
;{var y,w;}
;}
,_disposeObjects:function(z){qx.util.DisposeUtil.disposeObjects(this,arguments);}
,_disposeSingletonObjects:function(A){qx.util.DisposeUtil.disposeObjects(this,arguments,true);}
,_disposeArray:function(B){qx.util.DisposeUtil.disposeArray(this,B);}
,_disposeMap:function(C){qx.util.DisposeUtil.disposeMap(this,C);}
},environment:{"qx.debug.dispose.level":0},destruct:function(){if(qx.core.Environment.get(a)){if(!qx.core.ObjectRegistry.inShutDown){qx.event.Registration.removeAllListeners(this);}
else {qx.event.Registration.deleteAllListeners(this);}
;}
;qx.core.ObjectRegistry.unregister(this);this.__cM=null;if(qx.core.Environment.get(d)){var F=this.constructor;var J;var K=this.__L.$$store;var H=K.user;var I=K.theme;var D=K.inherit;var G=K.useinit;var E=K.init;while(F){J=F.$$properties;if(J){for(var name in J){if(J[name].dereference){this[H[name]]=this[I[name]]=this[D[name]]=this[G[name]]=this[E[name]]=undefined;}
;}
;}
;F=F.superclass;}
;}
;}
});}
)();
(function(){var a=" is a singleton! Please use disposeSingleton instead.",b="undefined",c="qx.util.DisposeUtil",d=" of object: ",e="!",f=" has non disposable entries: ",g="The map field: ",h="The array field: ",j="The object stored in key ",k="Has no disposable object under key: ";qx.Class.define(c,{statics:{disposeObjects:function(n,m,o){var name;for(var i=0,l=m.length;i<l;i++ ){name=m[i];if(n[name]==null||!n.hasOwnProperty(name)){continue;}
;if(!qx.core.ObjectRegistry.inShutDown){if(n[name].dispose){if(!o&&n[name].constructor.$$instance){throw new Error(j+name+a);}
else {n[name].dispose();}
;}
else {throw new Error(k+name+e);}
;}
;n[name]=null;}
;}
,disposeArray:function(q,p){var r=q[p];if(!r){return;}
;if(qx.core.ObjectRegistry.inShutDown){q[p]=null;return;}
;try{var s;for(var i=r.length-1;i>=0;i-- ){s=r[i];if(s){s.dispose();}
;}
;}
catch(t){throw new Error(h+p+d+q+f+t);}
;r.length=0;q[p]=null;}
,disposeMap:function(v,u){var w=v[u];if(!w){return;}
;if(qx.core.ObjectRegistry.inShutDown){v[u]=null;return;}
;try{var y;for(var x in w){y=w[x];if(w.hasOwnProperty(x)&&y){y.dispose();}
;}
;}
catch(z){throw new Error(g+u+d+v+f+z);}
;v[u]=null;}
,disposeTriggeredBy:function(A,C){var B=C.dispose;C.dispose=function(){B.call(C);A.dispose();}
;}
,destroyContainer:function(E){{}
;var D=[];this._collectContainerChildren(E,D);var F=D.length;for(var i=F-1;i>=0;i-- ){D[i].destroy();}
;E.destroy();}
,_collectContainerChildren:function(I,H){var J=I.getChildren();for(var i=0;i<J.length;i++ ){var G=J[i];H.push(G);if(this.__cN(G)){this._collectContainerChildren(G,H);}
;}
;}
,__cN:function(L){var K=[];if(qx.ui.mobile&&L instanceof qx.ui.mobile.core.Widget){K=[qx.ui.mobile.container.Composite];}
else {K=[qx.ui.container.Composite,qx.ui.container.Scroll,qx.ui.container.SlideBar,qx.ui.container.Stack];}
;for(var i=0,l=K.length;i<l;i++ ){if(typeof K[i]!==b&&qx.Class.isSubClassOf(L.constructor,K[i])){return true;}
;}
;return false;}
}});}
)();
(function(){var a="qx.event.handler.Object";qx.Class.define(a,{extend:qx.core.Object,implement:qx.event.IEventHandler,statics:{PRIORITY:qx.event.Registration.PRIORITY_LAST,SUPPORTED_TYPES:null,TARGET_CHECK:qx.event.IEventHandler.TARGET_OBJECT,IGNORE_CAN_HANDLE:false},members:{canHandleEvent:function(c,b){return qx.Class.supportsEvent(c.constructor,b);}
,registerEvent:function(f,e,d){}
,unregisterEvent:function(i,h,g){}
},defer:function(j){qx.event.Registration.addHandler(j);}
});}
)();
(function(){var a="qx.event.IEventDispatcher";qx.Interface.define(a,{members:{canDispatchEvent:function(c,event,b){this.assertInstance(event,qx.event.type.Event);this.assertString(b);}
,dispatchEvent:function(e,event,d){this.assertInstance(event,qx.event.type.Event);this.assertString(d);}
}});}
)();
(function(){var a="qx.event.type.Event";qx.Class.define(a,{extend:qx.core.Object,statics:{CAPTURING_PHASE:1,AT_TARGET:2,BUBBLING_PHASE:3},members:{init:function(c,b){{}
;this._type=null;this._target=null;this._currentTarget=null;this._relatedTarget=null;this._originalTarget=null;this._stopPropagation=false;this._preventDefault=false;this._bubbles=!!c;this._cancelable=!!b;this._timeStamp=(new Date()).getTime();this._eventPhase=null;return this;}
,clone:function(d){if(d){var e=d;}
else {var e=qx.event.Pool.getInstance().getObject(this.constructor);}
;e._type=this._type;e._target=this._target;e._currentTarget=this._currentTarget;e._relatedTarget=this._relatedTarget;e._originalTarget=this._originalTarget;e._stopPropagation=this._stopPropagation;e._bubbles=this._bubbles;e._preventDefault=this._preventDefault;e._cancelable=this._cancelable;return e;}
,stop:function(){if(this._bubbles){this.stopPropagation();}
;if(this._cancelable){this.preventDefault();}
;}
,stopPropagation:function(){{}
;this._stopPropagation=true;}
,getPropagationStopped:function(){return !!this._stopPropagation;}
,preventDefault:function(){{}
;this._preventDefault=true;}
,getDefaultPrevented:function(){return !!this._preventDefault;}
,getType:function(){return this._type;}
,setType:function(f){this._type=f;}
,getEventPhase:function(){return this._eventPhase;}
,setEventPhase:function(g){this._eventPhase=g;}
,getTimeStamp:function(){return this._timeStamp;}
,getTarget:function(){return this._target;}
,setTarget:function(h){this._target=h;}
,getCurrentTarget:function(){return this._currentTarget||this._target;}
,setCurrentTarget:function(i){this._currentTarget=i;}
,getRelatedTarget:function(){return this._relatedTarget;}
,setRelatedTarget:function(j){this._relatedTarget=j;}
,getOriginalTarget:function(){return this._originalTarget;}
,setOriginalTarget:function(k){this._originalTarget=k;}
,getBubbles:function(){return this._bubbles;}
,setBubbles:function(l){this._bubbles=l;}
,isCancelable:function(){return this._cancelable;}
,setCancelable:function(m){this._cancelable=m;}
},destruct:function(){this._target=this._currentTarget=this._relatedTarget=this._originalTarget=null;}
});}
)();
(function(){var a="qx.util.ObjectPool",b="Class needs to be defined!",c="Object is already pooled: ",d="Integer";qx.Class.define(a,{extend:qx.core.Object,construct:function(e){qx.core.Object.call(this);this.__cO={};if(e!=null){this.setSize(e);}
;}
,properties:{size:{check:d,init:Infinity}},members:{__cO:null,getObject:function(h){if(this.$$disposed){return new h;}
;if(!h){throw new Error(b);}
;var f=null;var g=this.__cO[h.classname];if(g){f=g.pop();}
;if(f){f.$$pooled=false;}
else {f=new h;}
;return f;}
,poolObject:function(k){if(!this.__cO){return;}
;var j=k.classname;var m=this.__cO[j];if(k.$$pooled){throw new Error(c+k);}
;if(!m){this.__cO[j]=m=[];}
;if(m.length>this.getSize()){if(k.destroy){k.destroy();}
else {k.dispose();}
;return;}
;k.$$pooled=true;m.push(k);}
},destruct:function(){var p=this.__cO;var n,o,i,l;for(n in p){o=p[n];for(i=0,l=o.length;i<l;i++ ){o[i].dispose();}
;}
;delete this.__cO;}
});}
)();
(function(){var a="singleton",b="qx.event.Pool";qx.Class.define(b,{extend:qx.util.ObjectPool,type:a,construct:function(){qx.util.ObjectPool.call(this,30);}
});}
)();
(function(){var a="qx.event.dispatch.Direct";qx.Class.define(a,{extend:qx.core.Object,implement:qx.event.IEventDispatcher,construct:function(b){this._manager=b;}
,statics:{PRIORITY:qx.event.Registration.PRIORITY_LAST},members:{canDispatchEvent:function(d,event,c){return !event.getBubbles();}
,dispatchEvent:function(e,event,k){{var j,f;}
;event.setEventPhase(qx.event.type.Event.AT_TARGET);var g=this._manager.getListeners(e,k,false);if(g){for(var i=0,l=g.length;i<l;i++ ){var h=g[i].context||e;{}
;g[i].handler.call(h,event);}
;}
;}
},defer:function(m){qx.event.Registration.addDispatcher(m);}
});}
)();
(function(){var a="qx.event.type.Data";qx.Class.define(a,{extend:qx.event.type.Event,members:{__cP:null,__cQ:null,init:function(c,d,b){qx.event.type.Event.prototype.init.call(this,false,b);this.__cP=c;this.__cQ=d;return this;}
,clone:function(e){var f=qx.event.type.Event.prototype.clone.call(this,e);f.__cP=this.__cP;f.__cQ=this.__cQ;return f;}
,getData:function(){return this.__cP;}
,getOldData:function(){return this.__cQ;}
},destruct:function(){this.__cP=this.__cQ=null;}
});}
)();
(function(){var a="To enable localization please include qx.locale.Manager into your build!",b="qx.locale.MTranslation";qx.Mixin.define(b,{members:{tr:function(c,e){var d=qx.locale.Manager;if(d){return d.tr.apply(d,arguments);}
;throw new Error(a);}
,trn:function(g,j,f,h){var i=qx.locale.Manager;if(i){return i.trn.apply(i,arguments);}
;throw new Error(a);}
,trc:function(n,m,l){var k=qx.locale.Manager;if(k){return k.trc.apply(k,arguments);}
;throw new Error(a);}
,trnc:function(p,q,r,o,s){var t=qx.locale.Manager;if(t){return t.trnc.apply(t,arguments);}
;throw new Error(a);}
,marktr:function(v){var u=qx.locale.Manager;if(u){return u.marktr.apply(u,arguments);}
;throw new Error(a);}
}});}
)();
(function(){var a="qx.application.IApplication";qx.Interface.define(a,{members:{main:function(){}
,finalize:function(){}
,close:function(){}
,terminate:function(){}
}});}
)();
(function(){var a="qx.core.BaseInit",b="engine.name",c="Main runtime: ",d="",f='testrunner.TestLoader',g="os.name",h="engine.version",i="Missing application class: ",j="Load runtime: ",k="ms",l="Could not detect engine!",m="Finalize runtime: ",n="Could not detect operating system!",o="Could not detect the version of the engine!";qx.Class.define(a,{statics:{__cR:null,getApplication:function(){return this.__cR||null;}
,ready:function(){if(this.__cR){return;}
;if(qx.core.Environment.get(b)==d){qx.log.Logger.warn(l);}
;if(qx.core.Environment.get(h)==d){qx.log.Logger.warn(o);}
;if(qx.core.Environment.get(g)==d){qx.log.Logger.warn(n);}
;qx.log.Logger.debug(this,j+(new Date-qx.Bootstrap.LOADSTART)+k);var q=f;var r=qx.Class.getByName(q);if(r){this.__cR=new r;var p=new Date;this.__cR.main();qx.log.Logger.debug(this,c+(new Date-p)+k);var p=new Date;this.__cR.finalize();qx.log.Logger.debug(this,m+(new Date-p)+k);}
else {qx.log.Logger.warn(i+q);}
;}
,__cS:function(e){var s=this.__cR;if(s){s.close();}
;}
,__cT:function(){var t=this.__cR;if(t){t.terminate();}
;qx.core.ObjectRegistry.shutdown();}
}});}
)();
(function(){var a="qx.event.type.Native";qx.Class.define(a,{extend:qx.event.type.Event,members:{init:function(b,e,f,d,c){qx.event.type.Event.prototype.init.call(this,d,c);this._target=e||qx.bom.Event.getTarget(b);this._relatedTarget=f||qx.bom.Event.getRelatedTarget(b);if(b.timeStamp){this._timeStamp=b.timeStamp;}
;this._native=b;this._returnValue=null;return this;}
,clone:function(g){var h=qx.event.type.Event.prototype.clone.call(this,g);var i={};h._native=this._cloneNativeEvent(this._native,i);h._returnValue=this._returnValue;return h;}
,_cloneNativeEvent:function(j,k){k.preventDefault=(function(){}
);return k;}
,preventDefault:function(){qx.event.type.Event.prototype.preventDefault.call(this);qx.bom.Event.preventDefault(this._native);}
,getNativeEvent:function(){return this._native;}
,setReturnValue:function(l){this._returnValue=l;}
,getReturnValue:function(){return this._returnValue;}
},destruct:function(){this._native=this._returnValue=null;}
});}
)();
(function(){var a="qx.event.handler.Window";qx.Class.define(a,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(b){qx.core.Object.call(this);this._manager=b;this._window=b.getWindow();this._initWindowObserver();}
,statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{error:1,load:1,beforeunload:1,unload:1,resize:1,scroll:1,beforeshutdown:1},TARGET_CHECK:qx.event.IEventHandler.TARGET_WINDOW,IGNORE_CAN_HANDLE:true},members:{canHandleEvent:function(d,c){}
,registerEvent:function(h,g,f){}
,unregisterEvent:function(k,j,i){}
,_initWindowObserver:function(){this._onNativeWrapper=qx.lang.Function.listener(this._onNative,this);var l=qx.event.handler.Window.SUPPORTED_TYPES;for(var m in l){qx.bom.Event.addNativeListener(this._window,m,this._onNativeWrapper);}
;}
,_stopWindowObserver:function(){var n=qx.event.handler.Window.SUPPORTED_TYPES;for(var o in n){qx.bom.Event.removeNativeListener(this._window,o,this._onNativeWrapper);}
;}
,_onNative:function(){var p=qx.event.GlobalError.observeMethod(this.__cU);p.apply(this,arguments);}
,__cU:function(e){if(this.isDisposed()){return;}
;var u=this._window;var r;try{r=u.document;}
catch(v){return;}
;var s=r.documentElement;var q=qx.bom.Event.getTarget(e);if(q==null||q===u||q===r||q===s){var event=qx.event.Registration.createEvent(e.type,qx.event.type.Native,[e,u]);qx.event.Registration.dispatchEvent(u,event);var t=event.getReturnValue();if(t!=null){e.returnValue=t;return t;}
;}
;}
},destruct:function(){this._stopWindowObserver();this._manager=this._window=null;}
,defer:function(w){qx.event.Registration.addHandler(w);}
});}
)();
(function(){var a="ready",b="mshtml",c="engine.name",d="qx.event.handler.Application",f="complete",g="webkit",h="gecko",i="load",j="unload",k="opera",l="left",m="DOMContentLoaded",n="shutdown",o="browser.documentmode";qx.Class.define(d,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(p){qx.core.Object.call(this);this._window=p.getWindow();this.__cV=false;this.__cW=false;this.__cX=false;this.__cY=false;this._initObserver();qx.event.handler.Application.$$instance=this;}
,statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{ready:1,shutdown:1},TARGET_CHECK:qx.event.IEventHandler.TARGET_WINDOW,IGNORE_CAN_HANDLE:true,onScriptLoaded:function(){var q=qx.event.handler.Application.$$instance;if(q){q.__da();}
;}
},members:{canHandleEvent:function(s,r){}
,registerEvent:function(v,u,t){}
,unregisterEvent:function(y,x,w){}
,__cX:null,__cV:null,__cW:null,__cY:null,__da:function(){if(!this.__cX&&this.__cV&&qx.$$loader.scriptLoaded){if((qx.core.Environment.get(c)==b)){if(qx.event.Registration.hasListener(this._window,a)){this.__cX=true;qx.event.Registration.fireEvent(this._window,a);}
;}
else {this.__cX=true;qx.event.Registration.fireEvent(this._window,a);}
;}
;}
,isApplicationReady:function(){return this.__cX;}
,_initObserver:function(){if(qx.$$domReady||document.readyState==f||document.readyState==a){this.__cV=true;this.__da();}
else {this._onNativeLoadWrapped=qx.lang.Function.bind(this._onNativeLoad,this);if(qx.core.Environment.get(c)==h||qx.core.Environment.get(c)==k||qx.core.Environment.get(c)==g||(qx.core.Environment.get(c)==b&&qx.core.Environment.get(o)>8)){qx.bom.Event.addNativeListener(this._window,m,this._onNativeLoadWrapped);}
else {var self=this;var z=function(){try{document.documentElement.doScroll(l);if(document.body){self._onNativeLoadWrapped();}
;}
catch(A){window.setTimeout(z,100);}
;}
;z();}
;qx.bom.Event.addNativeListener(this._window,i,this._onNativeLoadWrapped);}
;this._onNativeUnloadWrapped=qx.lang.Function.bind(this._onNativeUnload,this);qx.bom.Event.addNativeListener(this._window,j,this._onNativeUnloadWrapped);}
,_stopObserver:function(){if(this._onNativeLoadWrapped){qx.bom.Event.removeNativeListener(this._window,i,this._onNativeLoadWrapped);}
;qx.bom.Event.removeNativeListener(this._window,j,this._onNativeUnloadWrapped);this._onNativeLoadWrapped=null;this._onNativeUnloadWrapped=null;}
,_onNativeLoad:function(){var B=qx.event.GlobalError.observeMethod(this.__db);B.apply(this,arguments);}
,__db:function(){this.__cV=true;this.__da();}
,_onNativeUnload:function(){var C=qx.event.GlobalError.observeMethod(this.__dc);C.apply(this,arguments);}
,__dc:function(){if(!this.__cY){this.__cY=true;try{qx.event.Registration.fireEvent(this._window,n);}
catch(e){throw e;}
finally{qx.core.ObjectRegistry.shutdown();}
;}
;}
},destruct:function(){this._stopObserver();this._window=null;}
,defer:function(D){qx.event.Registration.addHandler(D);}
});}
)();
(function(){var a="ready",b="shutdown",c="beforeunload",d="qx.core.Init";qx.Class.define(d,{statics:{getApplication:qx.core.BaseInit.getApplication,ready:qx.core.BaseInit.ready,__cS:function(e){var f=this.getApplication();if(f){e.setReturnValue(f.close());}
;}
,__cT:function(){var g=this.getApplication();if(g){g.terminate();}
;}
},defer:function(h){qx.event.Registration.addListener(window,a,h.ready,h);qx.event.Registration.addListener(window,b,h.__cT,h);qx.event.Registration.addListener(window,c,h.__cS,h);}
});}
)();
(function(){var a="Abstract method call",b="abstract",c="*",d="",e="-webkit-tap-highlight-color: transparent;",f="-ms-touch-select: none;",g="qx.application.AbstractGui",h="-webkit-touch-callout: none;",i="-webkit-tap-highlight-color: rgba(0,0,0,0);";qx.Class.define(g,{type:b,extend:qx.core.Object,implement:[qx.application.IApplication],include:qx.locale.MTranslation,members:{__dd:null,_createRootWidget:function(){throw new Error(a);}
,getRoot:function(){return this.__dd;}
,main:function(){qx.theme.manager.Meta.getInstance().initialize();qx.ui.tooltip.Manager.getInstance();var j=[h,f,i,e].join(d);qx.ui.style.Stylesheet.getInstance().addRule(c,j);this.__dd=this._createRootWidget();window.scrollTo(0,0);}
,finalize:function(){this.render();}
,render:function(){qx.ui.core.queue.Manager.flush();}
,close:function(k){}
,terminate:function(){}
},destruct:function(){this.__dd=null;}
});}
)();
(function(){var a="The theme to use is not available: ",b="_applyTheme",c="qx.theme",d="qx.theme.manager.Meta",f="qx.theme.Modern",g="qx.event.type.Event",h="Theme",i="changeTheme",j="singleton";qx.Class.define(d,{type:j,extend:qx.core.Object,events:{"changeTheme":g},properties:{theme:{check:h,nullable:false,apply:b}},members:{_applyTheme:function(k,m){var u=true;var w=true;var o=true;var q=true;var l=true;if(m){u=k.meta.color!==m.meta.color;w=k.meta.decoration!==m.meta.decoration;o=k.meta.font!==m.meta.font;q=k.meta.icon!==m.meta.icon;l=k.meta.appearance!==m.meta.appearance;}
;var n=qx.theme.manager.Color.getInstance();var t=qx.theme.manager.Decoration.getInstance();var r=qx.theme.manager.Font.getInstance();var p=qx.theme.manager.Icon.getInstance();var s=qx.theme.manager.Appearance.getInstance();this._suspendEvents();if(u){if(!w){var v=t.getTheme();t._applyTheme(v);}
;n.setTheme(k.meta.color);}
;t.setTheme(k.meta.decoration);r.setTheme(k.meta.font);p.setTheme(k.meta.icon);s.setTheme(k.meta.appearance);if(u||w||o||q||l){this.fireEvent(i);}
;this._activateEvents();}
,__de:null,_fireEvent:function(e){if(e.getTarget()===qx.theme.manager.Color.getInstance()){qx.theme.manager.Decoration.getInstance().refresh();}
;this.fireEvent(i);}
,_suspendEvents:function(){var B=qx.theme.manager.Color.getInstance();var A=qx.theme.manager.Decoration.getInstance();var x=qx.theme.manager.Font.getInstance();var z=qx.theme.manager.Icon.getInstance();var y=qx.theme.manager.Appearance.getInstance();if(B.hasListener(i)){B.removeListener(i,this._fireEvent,this);}
;if(A.hasListener(i)){A.removeListener(i,this._fireEvent,this);}
;if(x.hasListener(i)){x.removeListener(i,this._fireEvent,this);}
;if(z.hasListener(i)){z.removeListener(i,this._fireEvent,this);}
;if(y.hasListener(i)){y.removeListener(i,this._fireEvent,this);}
;}
,_activateEvents:function(){var G=qx.theme.manager.Color.getInstance();var F=qx.theme.manager.Decoration.getInstance();var C=qx.theme.manager.Font.getInstance();var E=qx.theme.manager.Icon.getInstance();var D=qx.theme.manager.Appearance.getInstance();if(!G.hasListener(i)){G.addListener(i,this._fireEvent,this);}
;if(!F.hasListener(i)){F.addListener(i,this._fireEvent,this);}
;if(!C.hasListener(i)){C.addListener(i,this._fireEvent,this);}
;if(!E.hasListener(i)){E.addListener(i,this._fireEvent,this);}
;if(!D.hasListener(i)){D.addListener(i,this._fireEvent,this);}
;}
,initialize:function(){var J=qx.core.Environment;var H,I;H=J.get(c);if(H){I=qx.Theme.getByName(H);if(!I){throw new Error(a+H);}
;this.setTheme(I);}
;}
},environment:{"qx.theme":f}});}
)();
(function(){var a="qx.util.ValueManager",b="abstract";qx.Class.define(a,{type:b,extend:qx.core.Object,construct:function(){qx.core.Object.call(this);this._dynamic={};}
,members:{_dynamic:null,resolveDynamic:function(c){return this._dynamic[c];}
,isDynamic:function(d){return !!this._dynamic[d];}
,resolve:function(e){if(e&&this._dynamic[e]){return this._dynamic[e];}
;return e;}
,_setDynamic:function(f){this._dynamic=f;}
,_getDynamic:function(){return this._dynamic;}
},destruct:function(){this._dynamic=null;}
});}
)();
(function(){var a="Could not parse color: ",b="_applyTheme",c="qx.theme.manager.Color",d="Theme",e="changeTheme",f="string",g="singleton";qx.Class.define(c,{type:g,extend:qx.util.ValueManager,properties:{theme:{check:d,nullable:true,apply:b,event:e}},members:{_applyTheme:function(j){var h={};if(j){var i=j.colors;for(var name in i){h[name]=this.__df(i,name);}
;}
;this._setDynamic(h);}
,__df:function(l,name){var k=l[name];if(typeof k===f){if(!qx.util.ColorUtil.isCssString(k)){if(l[k]!=undefined){return this.__df(l,k);}
;throw new Error(a+k);}
;return k;}
else if(k instanceof Array){return qx.util.ColorUtil.rgbToRgbString(k);}
;throw new Error(a+k);}
,resolve:function(p){var o=this._dynamic;var m=o[p];if(m){return m;}
;var n=this.getTheme();if(n!==null&&n.colors[p]){return o[p]=n.colors[p];}
;return p;}
,isDynamic:function(s){var r=this._dynamic;if(s&&(r[s]!==undefined)){return true;}
;var q=this.getTheme();if(q!==null&&s&&(q.colors[s]!==undefined)){r[s]=q.colors[s];return true;}
;return false;}
}});}
)();
(function(){var a="Could not parse color: ",c="",d="Invalid hex value: ",e="Could not convert system colors to RGB: ",h="(",j=")",k="#",l="a",m="Invalid hex3 value: ",n="qx.theme.manager.Color",o="qx.util.ColorUtil",q="Invalid hex6 value: ",s="rgb",u=",";qx.Bootstrap.define(o,{statics:{REGEXP:{hex3:/^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,hex6:/^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,rgb:/^rgb\(\s*([0-9]{1,3}\.{0,1}[0-9]*)\s*,\s*([0-9]{1,3}\.{0,1}[0-9]*)\s*,\s*([0-9]{1,3}\.{0,1}[0-9]*)\s*\)$/,rgba:/^rgba\(\s*([0-9]{1,3}\.{0,1}[0-9]*)\s*,\s*([0-9]{1,3}\.{0,1}[0-9]*)\s*,\s*([0-9]{1,3}\.{0,1}[0-9]*)\s*,\s*([0-9]{1,3}\.{0,1}[0-9]*)\s*\)$/},SYSTEM:{activeborder:true,activecaption:true,appworkspace:true,background:true,buttonface:true,buttonhighlight:true,buttonshadow:true,buttontext:true,captiontext:true,graytext:true,highlight:true,highlighttext:true,inactiveborder:true,inactivecaption:true,inactivecaptiontext:true,infobackground:true,infotext:true,menu:true,menutext:true,scrollbar:true,threeddarkshadow:true,threedface:true,threedhighlight:true,threedlightshadow:true,threedshadow:true,window:true,windowframe:true,windowtext:true},NAMED:{black:[0,0,0],silver:[192,192,192],gray:[128,128,128],white:[255,255,255],maroon:[128,0,0],red:[255,0,0],purple:[128,0,128],fuchsia:[255,0,255],green:[0,128,0],lime:[0,255,0],olive:[128,128,0],yellow:[255,255,0],navy:[0,0,128],blue:[0,0,255],teal:[0,128,128],aqua:[0,255,255],transparent:[-1,-1,-1],magenta:[255,0,255],orange:[255,165,0],brown:[165,42,42]},isNamedColor:function(v){return this.NAMED[v]!==undefined;}
,isSystemColor:function(w){return this.SYSTEM[w]!==undefined;}
,supportsThemes:function(){if(qx.Class){return qx.Class.isDefined(n);}
;return false;}
,isThemedColor:function(x){if(!this.supportsThemes()){return false;}
;if(qx.theme&&qx.theme.manager&&qx.theme.manager.Color){return qx.theme.manager.Color.getInstance().isDynamic(x);}
;return false;}
,stringToRgb:function(y){if(this.supportsThemes()&&this.isThemedColor(y)){y=qx.theme.manager.Color.getInstance().resolveDynamic(y);}
;if(this.isNamedColor(y)){return this.NAMED[y].concat();}
else if(this.isSystemColor(y)){throw new Error(e+y);}
else if(this.isRgbaString(y)){return this.__dh(y);}
else if(this.isRgbString(y)){return this.__dg();}
else if(this.isHex3String(y)){return this.__di();}
else if(this.isHex6String(y)){return this.__dj();}
;throw new Error(a+y);}
,cssStringToRgb:function(z){if(this.isNamedColor(z)){return this.NAMED[z];}
else if(this.isSystemColor(z)){throw new Error(e+z);}
else if(this.isRgbString(z)){return this.__dg();}
else if(this.isRgbaString(z)){return this.__dh();}
else if(this.isHex3String(z)){return this.__di();}
else if(this.isHex6String(z)){return this.__dj();}
;throw new Error(a+z);}
,stringToRgbString:function(A){return this.rgbToRgbString(this.stringToRgb(A));}
,rgbToRgbString:function(B){return s+(B[3]!==undefined?l:c)+h+B.join(u)+j;}
,rgbToHexString:function(C){return (k+qx.lang.String.pad(C[0].toString(16).toUpperCase(),2)+qx.lang.String.pad(C[1].toString(16).toUpperCase(),2)+qx.lang.String.pad(C[2].toString(16).toUpperCase(),2));}
,isValidPropertyValue:function(D){return (this.isThemedColor(D)||this.isNamedColor(D)||this.isHex3String(D)||this.isHex6String(D)||this.isRgbString(D)||this.isRgbaString(D));}
,isCssString:function(E){return (this.isSystemColor(E)||this.isNamedColor(E)||this.isHex3String(E)||this.isHex6String(E)||this.isRgbString(E)||this.isRgbaString(E));}
,isHex3String:function(F){return this.REGEXP.hex3.test(F);}
,isHex6String:function(G){return this.REGEXP.hex6.test(G);}
,isRgbString:function(H){return this.REGEXP.rgb.test(H);}
,isRgbaString:function(I){return this.REGEXP.rgba.test(I);}
,__dg:function(){var L=parseInt(RegExp.$1,10);var K=parseInt(RegExp.$2,10);var J=parseInt(RegExp.$3,10);return [L,K,J];}
,__dh:function(){var P=parseInt(RegExp.$1,10);var O=parseInt(RegExp.$2,10);var M=parseInt(RegExp.$3,10);var N=parseFloat(RegExp.$4,10);if(P===0&&O===0&M===0&&N===0){return [-1,-1,-1];}
;return [P,O,M];}
,__di:function(){var S=parseInt(RegExp.$1,16)*17;var R=parseInt(RegExp.$2,16)*17;var Q=parseInt(RegExp.$3,16)*17;return [S,R,Q];}
,__dj:function(){var V=(parseInt(RegExp.$1,16)*16)+parseInt(RegExp.$2,16);var U=(parseInt(RegExp.$3,16)*16)+parseInt(RegExp.$4,16);var T=(parseInt(RegExp.$5,16)*16)+parseInt(RegExp.$6,16);return [V,U,T];}
,hex3StringToRgb:function(W){if(this.isHex3String(W)){return this.__di(W);}
;throw new Error(m+W);}
,hex3StringToHex6String:function(X){if(this.isHex3String(X)){return this.rgbToHexString(this.hex3StringToRgb(X));}
;return X;}
,hex6StringToRgb:function(Y){if(this.isHex6String(Y)){return this.__dj(Y);}
;throw new Error(q+Y);}
,hexStringToRgb:function(ba){if(this.isHex3String(ba)){return this.__di(ba);}
;if(this.isHex6String(ba)){return this.__dj(ba);}
;throw new Error(d+ba);}
,rgbToHsb:function(bi){var bc,bd,bf;var bm=bi[0];var bj=bi[1];var bb=bi[2];var bl=(bm>bj)?bm:bj;if(bb>bl){bl=bb;}
;var be=(bm<bj)?bm:bj;if(bb<be){be=bb;}
;bf=bl/255.0;if(bl!=0){bd=(bl-be)/bl;}
else {bd=0;}
;if(bd==0){bc=0;}
else {var bh=(bl-bm)/(bl-be);var bk=(bl-bj)/(bl-be);var bg=(bl-bb)/(bl-be);if(bm==bl){bc=bg-bk;}
else if(bj==bl){bc=2.0+bh-bg;}
else {bc=4.0+bk-bh;}
;bc=bc/6.0;if(bc<0){bc=bc+1.0;}
;}
;return [Math.round(bc*360),Math.round(bd*100),Math.round(bf*100)];}
,hsbToRgb:function(bn){var i,f,p,r,t;var bo=bn[0]/360;var bp=bn[1]/100;var bq=bn[2]/100;if(bo>=1.0){bo%=1.0;}
;if(bp>1.0){bp=1.0;}
;if(bq>1.0){bq=1.0;}
;var br=Math.floor(255*bq);var bs={};if(bp==0.0){bs.red=bs.green=bs.blue=br;}
else {bo*=6.0;i=Math.floor(bo);f=bo-i;p=Math.floor(br*(1.0-bp));r=Math.floor(br*(1.0-(bp*f)));t=Math.floor(br*(1.0-(bp*(1.0-f))));switch(i){case 0:bs.red=br;bs.green=t;bs.blue=p;break;case 1:bs.red=r;bs.green=br;bs.blue=p;break;case 2:bs.red=p;bs.green=br;bs.blue=t;break;case 3:bs.red=p;bs.green=r;bs.blue=br;break;case 4:bs.red=t;bs.green=p;bs.blue=br;break;case 5:bs.red=br;bs.green=p;bs.blue=r;break;};}
;return [bs.red,bs.green,bs.blue];}
,randomColor:function(){var r=Math.round(Math.random()*255);var g=Math.round(Math.random()*255);var b=Math.round(Math.random()*255);return this.rgbToRgbString([r,g,b]);}
}});}
)();
(function(){var a="mshtml",b="engine.name",c="_applyTheme",d="",e="'.",f="qx-",g="__dm",h="Unable to resolve decorator '",j="singleton",k=";",l="qx.theme.manager.Decoration",m=".",n="Theme",o="object",p="changeTheme",q="string",r="browser.documentmode",s=":";qx.Class.define(l,{type:j,extend:qx.core.Object,statics:{CSS_CLASSNAME_PREFIX:f},construct:function(){qx.core.Object.call(this);this.__dk=[];this.__dl=(qx.core.Environment.get(b)==a&&qx.core.Environment.get(r)<9);}
,properties:{theme:{check:n,nullable:true,apply:c,event:p}},members:{__dm:null,__dk:null,__dl:false,getCssClassName:function(u){var t=qx.theme.manager.Decoration.CSS_CLASSNAME_PREFIX;if(qx.lang.Type.isString(u)){return t+u;}
else {return t+u.toHashCode();}
;}
,addCssClass:function(z){var w=qx.ui.style.Stylesheet.getInstance();var B=z;z=this.getCssClassName(z);var A=m+z;if(w.hasRule(A)){return z;}
;if(qx.lang.Type.isString(B)){B=this.resolve(B);}
;if(!B){throw new Error(h+z+e);}
;var G=d;var v=B.getStyles(true);for(var D in v){if(qx.Bootstrap.isObject(v[D])){var x=d;var F=v[D];var C=false;for(var y in F){C=true;x+=y+s+F[y]+k;}
;var E=this.__dl?A:A+(C?s:d);this.__dk.push(E+D);w.addRule(E+D,x);continue;}
;G+=D+s+v[D]+k;}
;if(G){w.addRule(A,G);this.__dk.push(A);}
;return z;}
,removeAllCssClasses:function(){for(var i=0;i<this.__dk.length;i++ ){var H=this.__dk[i];qx.ui.style.Stylesheet.getInstance().removeRule(H);}
;this.__dk=[];}
,resolve:function(L){if(!L){return null;}
;if(typeof L===o){return L;}
;var M=this.getTheme();if(!M){return null;}
;var J=this.__dm;if(!J){J=this.__dm={};}
;var I=J[L];if(I){return I;}
;var O=qx.lang.Object.clone(M.decorations[L],true);if(!O){return null;}
;if(!O.style){O.style={};}
;var K=O;while(K.include){K=M.decorations[K.include];if(!O.decorator&&K.decorator){O.decorator=qx.lang.Object.clone(K.decorator);}
;if(K.style){for(var N in K.style){if(O.style[N]===undefined){O.style[N]=qx.lang.Object.clone(K.style[N],true);}
;}
;}
;}
;return J[L]=(new qx.ui.decoration.Decorator()).set(O.style);}
,isValidPropertyValue:function(P){if(typeof P===q){return this.isDynamic(P);}
else if(typeof P===o){var Q=P.constructor;return qx.Class.hasInterface(Q,qx.ui.decoration.IDecorator);}
;return false;}
,isDynamic:function(S){if(!S){return false;}
;var R=this.getTheme();if(!R){return false;}
;return !!R.decorations[S];}
,isCached:function(T){return !this.__dm?false:qx.lang.Object.contains(this.__dm,T);}
,_applyTheme:function(X,V){var W=qx.util.AliasManager.getInstance();this.removeAllCssClasses();if(V){for(var U in V.aliases){W.remove(U);}
;}
;if(X){for(var U in X.aliases){W.add(U,X.aliases[U]);}
;}
;this._disposeMap(g);this.__dm={};}
,clear:function(){var bb=qx.util.AliasManager.getInstance();var ba=this.getTheme();if(!bb.isDisposed()&&ba&&ba.alias){for(var Y in ba.aliases){bb.remove(Y,ba.aliases[Y]);}
;}
;this.removeAllCssClasses();this._disposeMap(g);this.__dm={};}
,refresh:function(){this.clear();var be=qx.util.AliasManager.getInstance();var bd=this.getTheme();if(bd&&bd.alias){for(var bc in bd.aliases){be.add(bc,bd.aliases[bc]);}
;}
;}
},destruct:function(){this.clear();}
});}
)();
(function(){var a="qx.ui.style.Stylesheet",b="singleton";qx.Class.define(a,{type:b,extend:qx.core.Object,construct:function(){qx.core.Object.call(this);this.__dn=qx.bom.Stylesheet.createElement();this.__dk=[];}
,members:{__dk:null,__dn:null,addRule:function(d,c){if(this.hasRule(d)){return;}
;qx.bom.Stylesheet.addRule(this.__dn,d,c);this.__dk.push(d);}
,hasRule:function(e){return this.__dk.indexOf(e)!=-1;}
,removeRule:function(f){delete this.__dk[this.__dk.indexOf(f)];qx.bom.Stylesheet.removeRule(this.__dn,f);}
}});}
)();
(function(){var a="stylesheet",b="head",c="html.stylesheet.addimport",d="html.stylesheet.insertrule",e="}",f="html.stylesheet.createstylesheet",g='@import "',h="text/css",j="{",k='";',l="html.stylesheet.removeimport",m="html.stylesheet.deleterule",n="qx.bom.Stylesheet",o="link",p="style";qx.Bootstrap.define(n,{statics:{includeFile:function(s,q){if(!q){q=document;}
;var t=q.createElement(o);t.type=h;t.rel=a;t.href=s;var r=q.getElementsByTagName(b)[0];r.appendChild(t);}
,createElement:function(u){if(qx.core.Environment.get(f)){var v=document.createStyleSheet();if(u){v.cssText=u;}
;return v;}
else {var w=document.createElement(p);w.type=h;if(u){w.appendChild(document.createTextNode(u));}
;document.getElementsByTagName(b)[0].appendChild(w);return w.sheet;}
;}
,addRule:function(z,A,y){{var x;}
;if(qx.core.Environment.get(d)){z.insertRule(A+j+y+e,z.cssRules.length);}
else {z.addRule(A,y);}
;}
,removeRule:function(C,E){if(qx.core.Environment.get(m)){var B=C.cssRules;var D=B.length;for(var i=D-1;i>=0; --i){if(B[i].selectorText==E){C.deleteRule(i);}
;}
;}
else {var B=C.rules;var D=B.length;for(var i=D-1;i>=0; --i){if(B[i].selectorText==E){C.removeRule(i);}
;}
;}
;}
,removeSheet:function(G){var F=G.ownerNode?G.ownerNode:G.owningElement;qx.dom.Element.removeChild(F,F.parentNode);}
,removeAllRules:function(I){if(qx.core.Environment.get(m)){var H=I.cssRules;var J=H.length;for(var i=J-1;i>=0;i-- ){I.deleteRule(i);}
;}
else {var H=I.rules;var J=H.length;for(var i=J-1;i>=0;i-- ){I.removeRule(i);}
;}
;}
,addImport:function(L,K){if(qx.core.Environment.get(c)){L.addImport(K);}
else {L.insertRule(g+K+k,L.cssRules.length);}
;}
,removeImport:function(M,N){if(qx.core.Environment.get(l)){var O=M.imports;var P=O.length;for(var i=P-1;i>=0;i-- ){if(O[i].href==N||O[i].href==qx.util.Uri.getAbsolute(N)){M.removeImport(i);}
;}
;}
else {var Q=M.cssRules;var P=Q.length;for(var i=P-1;i>=0;i-- ){if(Q[i].href==N){M.deleteRule(i);}
;}
;}
;}
,removeAllImports:function(S){if(qx.core.Environment.get(l)){var U=S.imports;var T=U.length;for(var i=T-1;i>=0;i-- ){S.removeImport(i);}
;}
else {var R=S.cssRules;var T=R.length;for(var i=T-1;i>=0;i-- ){if(R[i].type==R[i].IMPORT_RULE){S.deleteRule(i);}
;}
;}
;}
}});}
)();
(function(){var a="engine.name",b="",c="none",d="qx.dom.Element",e="webkit",f="The tag name is missing!",g="div";qx.Bootstrap.define(d,{statics:{hasChild:function(parent,h){return h.parentNode===parent;}
,hasChildren:function(j){return !!j.firstChild;}
,hasChildElements:function(k){k=k.firstChild;while(k){if(k.nodeType===1){return true;}
;k=k.nextSibling;}
;return false;}
,getParentElement:function(m){return m.parentNode;}
,isInDom:function(p,n){if(!n){n=window;}
;var o=n.document.getElementsByTagName(p.nodeName);for(var i=0,l=o.length;i<l;i++ ){if(o[i]===p){return true;}
;}
;return false;}
,insertAt:function(q,parent,r){var s=parent.childNodes[r];if(s){parent.insertBefore(q,s);}
else {parent.appendChild(q);}
;return true;}
,insertBegin:function(t,parent){if(parent.firstChild){this.insertBefore(t,parent.firstChild);}
else {parent.appendChild(t);}
;return true;}
,insertEnd:function(u,parent){parent.appendChild(u);return true;}
,insertBefore:function(v,w){w.parentNode.insertBefore(v,w);return true;}
,insertAfter:function(x,y){var parent=y.parentNode;if(y==parent.lastChild){parent.appendChild(x);}
else {return this.insertBefore(x,y.nextSibling);}
;return true;}
,remove:function(z){if(!z.parentNode){return false;}
;z.parentNode.removeChild(z);return true;}
,removeChild:function(A,parent){if(A.parentNode!==parent){return false;}
;parent.removeChild(A);return true;}
,removeChildAt:function(B,parent){var C=parent.childNodes[B];if(!C){return false;}
;parent.removeChild(C);return true;}
,replaceChild:function(E,D){if(!D.parentNode){return false;}
;D.parentNode.replaceChild(E,D);return true;}
,replaceAt:function(G,H,parent){var F=parent.childNodes[H];if(!F){return false;}
;parent.replaceChild(G,F);return true;}
,__do:{},getHelperElement:function(I){if(!I){I=window;}
;var J=I.location.href;if(!qx.dom.Element.__do[J]){var K=qx.dom.Element.__do[J]=I.document.createElement(g);if(qx.core.Environment.get(a)==e){K.style.display=c;I.document.body.appendChild(K);}
;}
;return qx.dom.Element.__do[J];}
,create:function(name,M,L){if(!L){L=window;}
;if(!name){throw new Error(f);}
;var O=L.document.createElement(name);for(var N in M){qx.bom.element.Attribute.set(O,N,M[N]);}
;return O;}
,empty:function(P){return P.innerHTML=b;}
}});}
)();
(function(){var b="function",c="html.video.h264",d="html.element.contains",f='video/ogg; codecs="theora, vorbis"',g="qxtest",h="html.console",i="html.xul",j="http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul",k="html.video.ogg",l="http://www.w3.org/TR/SVG11/feature#BasicStructure",m="html.storage.local",n="div",o="qx.bom.client.Html",p="getSelection",q='audio',r='video/mp4; codecs="avc1.42E01E, mp4a.40.2"',s="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==",t="html.audio",u="video",w="url(#default#VML)",x="head",y="audio",z="audio/mpeg",A="org.w3c.dom.svg",B="html.classlist",C="html.svg",D="html.video",E="html.geolocation",F="DOMTokenList",G="html.storage.session",H="1.1",I="html.history.state",J="object",K="html.image.naturaldimensions",L="html.audio.aif",M="audio/x-wav",N='<v:shape id="vml_flag1" adj="1" />',O="html.node.isequalnode",P="html.canvas",Q="audio/ogg",R="",S="html.storage.userdata",T="html.fullscreen",U="number",V="html.element.compareDocumentPosition",W="audio/x-aiff",X="html.audio.au",Y="img",bF="html.selection",bG="selection",bH="html.xpath",bB="$qx_check",bC="test",bD='video',bE="span",bM="html.element.textcontent",bN="geolocation",bW="html.audio.mp3",bA="html.vml",bI="undefined",bJ="html.audio.ogg",bK="none",bL="label",bQ='video/webm; codecs="vp8, vorbis"',ca="html.dataurl",bR="html.webworker",bS="html.dataset",bX="1.0",bO="html.audio.wav",bY="html.filereader",bP="audio/basic",bT="display",bU="html.video.webm",bV="#default#userdata";qx.Bootstrap.define(o,{statics:{getWebWorker:function(){return window.Worker!=null;}
,getFileReader:function(){return window.FileReader!=null;}
,getGeoLocation:function(){return bN in navigator;}
,getAudio:function(){return !!document.createElement(q).canPlayType;}
,getAudioOgg:function(){if(!qx.bom.client.Html.getAudio()){return R;}
;var a=document.createElement(y);return a.canPlayType(Q);}
,getAudioMp3:function(){if(!qx.bom.client.Html.getAudio()){return R;}
;var a=document.createElement(y);return a.canPlayType(z);}
,getAudioWav:function(){if(!qx.bom.client.Html.getAudio()){return R;}
;var a=document.createElement(y);return a.canPlayType(M);}
,getAudioAu:function(){if(!qx.bom.client.Html.getAudio()){return R;}
;var a=document.createElement(y);return a.canPlayType(bP);}
,getAudioAif:function(){if(!qx.bom.client.Html.getAudio()){return R;}
;var a=document.createElement(y);return a.canPlayType(W);}
,getVideo:function(){return !!document.createElement(bD).canPlayType;}
,getVideoOgg:function(){if(!qx.bom.client.Html.getVideo()){return R;}
;var v=document.createElement(u);return v.canPlayType(f);}
,getVideoH264:function(){if(!qx.bom.client.Html.getVideo()){return R;}
;var v=document.createElement(u);return v.canPlayType(r);}
,getVideoWebm:function(){if(!qx.bom.client.Html.getVideo()){return R;}
;var v=document.createElement(u);return v.canPlayType(bQ);}
,getLocalStorage:function(){try{window.localStorage.setItem(bB,bC);window.localStorage.removeItem(bB);return true;}
catch(cb){return false;}
;}
,getSessionStorage:function(){try{window.sessionStorage.setItem(bB,bC);window.sessionStorage.removeItem(bB);return true;}
catch(cc){return false;}
;}
,getUserDataStorage:function(){var cd=document.createElement(n);cd.style[bT]=bK;document.getElementsByTagName(x)[0].appendChild(cd);var ce=false;try{cd.addBehavior(bV);cd.load(g);ce=true;}
catch(e){}
;document.getElementsByTagName(x)[0].removeChild(cd);return ce;}
,getClassList:function(){return !!(document.documentElement.classList&&qx.Bootstrap.getClass(document.documentElement.classList)===F);}
,getXPath:function(){return !!document.evaluate;}
,getXul:function(){try{document.createElementNS(j,bL);return true;}
catch(e){return false;}
;}
,getSvg:function(){return document.implementation&&document.implementation.hasFeature&&(document.implementation.hasFeature(A,bX)||document.implementation.hasFeature(l,H));}
,getVml:function(){var cf=document.createElement(n);document.body.appendChild(cf);cf.innerHTML=N;cf.firstChild.style.behavior=w;var cg=typeof cf.firstChild.adj==J;document.body.removeChild(cf);return cg;}
,getCanvas:function(){return !!window.CanvasRenderingContext2D;}
,getDataUrl:function(ch){var ci=new Image();ci.onload=ci.onerror=function(){window.setTimeout(function(){ch.call(null,(ci.width==1&&ci.height==1));}
,0);}
;ci.src=s;}
,getDataset:function(){return !!document.documentElement.dataset;}
,getContains:function(){return (typeof document.documentElement.contains!==bI);}
,getCompareDocumentPosition:function(){return (typeof document.documentElement.compareDocumentPosition===b);}
,getTextContent:function(){var cj=document.createElement(bE);return (typeof cj.textContent!==bI);}
,getFullScreen:function(){return document.fullscreenEnabled||document.webkitFullscreenEnabled||document.mozFullScreenEnabled||document.msFullscreenEnabled||false;}
,getConsole:function(){return typeof window.console!==bI;}
,getNaturalDimensions:function(){var ck=document.createElement(Y);return typeof ck.naturalHeight===U&&typeof ck.naturalWidth===U;}
,getHistoryState:function(){return (typeof window.onpopstate!==bI&&typeof window.history.replaceState!==bI&&typeof window.history.pushState!==bI);}
,getSelection:function(){if(typeof window.getSelection===b){return p;}
;if(typeof document.selection===J){return bG;}
;return null;}
,getIsEqualNode:function(){return typeof document.documentElement.isEqualNode===b;}
},defer:function(cl){qx.core.Environment.add(bR,cl.getWebWorker);qx.core.Environment.add(bY,cl.getFileReader);qx.core.Environment.add(E,cl.getGeoLocation);qx.core.Environment.add(t,cl.getAudio);qx.core.Environment.add(bJ,cl.getAudioOgg);qx.core.Environment.add(bW,cl.getAudioMp3);qx.core.Environment.add(bO,cl.getAudioWav);qx.core.Environment.add(X,cl.getAudioAu);qx.core.Environment.add(L,cl.getAudioAif);qx.core.Environment.add(D,cl.getVideo);qx.core.Environment.add(k,cl.getVideoOgg);qx.core.Environment.add(c,cl.getVideoH264);qx.core.Environment.add(bU,cl.getVideoWebm);qx.core.Environment.add(m,cl.getLocalStorage);qx.core.Environment.add(G,cl.getSessionStorage);qx.core.Environment.add(S,cl.getUserDataStorage);qx.core.Environment.add(B,cl.getClassList);qx.core.Environment.add(bH,cl.getXPath);qx.core.Environment.add(i,cl.getXul);qx.core.Environment.add(P,cl.getCanvas);qx.core.Environment.add(C,cl.getSvg);qx.core.Environment.add(bA,cl.getVml);qx.core.Environment.add(bS,cl.getDataset);qx.core.Environment.addAsync(ca,cl.getDataUrl);qx.core.Environment.add(d,cl.getContains);qx.core.Environment.add(V,cl.getCompareDocumentPosition);qx.core.Environment.add(bM,cl.getTextContent);qx.core.Environment.add(h,cl.getConsole);qx.core.Environment.add(K,cl.getNaturalDimensions);qx.core.Environment.add(I,cl.getHistoryState);qx.core.Environment.add(bF,cl.getSelection);qx.core.Environment.add(O,cl.getIsEqualNode);qx.core.Environment.add(T,cl.getFullScreen);}
});}
)();
(function(){var a="readOnly",b="data-",c="accessKey",d="qx.bom.element.Attribute",e="rowSpan",f="vAlign",g="className",h="textContent",i="'",j="htmlFor",k="longDesc",l="cellSpacing",m="frameBorder",n="='",o="",p="useMap",q="innerText",r="innerHTML",s="tabIndex",t="dateTime",u="maxLength",v="html.element.textcontent",w="mshtml",x="engine.name",y="cellPadding",z="browser.documentmode",A="colSpan",B="undefined";qx.Bootstrap.define(d,{statics:{__dp:{names:{"class":g,"for":j,html:r,text:qx.core.Environment.get(v)?h:q,colspan:A,rowspan:e,valign:f,datetime:t,accesskey:c,tabindex:s,maxlength:u,readonly:a,longdesc:k,cellpadding:y,cellspacing:l,frameborder:m,usemap:p},runtime:{"html":1,"text":1},bools:{compact:1,nowrap:1,ismap:1,declare:1,noshade:1,checked:1,disabled:1,readOnly:1,multiple:1,selected:1,noresize:1,defer:1,allowTransparency:1},property:{$$html:1,$$widget:1,checked:1,readOnly:1,multiple:1,selected:1,value:1,maxLength:1,className:1,innerHTML:1,innerText:1,textContent:1,htmlFor:1,tabIndex:1},qxProperties:{$$widget:1,$$html:1},propertyDefault:{disabled:false,checked:false,readOnly:false,multiple:false,selected:false,value:o,className:o,innerHTML:o,innerText:o,textContent:o,htmlFor:o,tabIndex:0,maxLength:qx.core.Environment.select(x,{"mshtml":2147483647,"webkit":524288,"default":-1})},removeableProperties:{disabled:1,multiple:1,maxLength:1}},compile:function(C){var D=[];var F=this.__dp.runtime;for(var E in C){if(!F[E]){D.push(E,n,C[E],i);}
;}
;return D.join(o);}
,get:function(I,name){var G=this.__dp;var H;name=G.names[name]||name;if(G.property[name]){H=I[name];if(typeof G.propertyDefault[name]!==B&&H==G.propertyDefault[name]){if(typeof G.bools[name]===B){return null;}
else {return H;}
;}
;}
else {H=I.getAttribute(name);if(G.bools[name]&&!(qx.core.Environment.get(x)==w&&parseInt(qx.core.Environment.get(z),10)<=8)){return qx.Bootstrap.isString(H);}
;}
;if(G.bools[name]){return !!H;}
;return H;}
,set:function(L,name,K){if(typeof K===B){return;}
;var J=this.__dp;name=J.names[name]||name;if(J.bools[name]&&!qx.lang.Type.isBoolean(K)){K=qx.lang.Type.isString(K);}
;if(J.property[name]&&(!(L[name]===undefined)||J.qxProperties[name])){if(K==null){if(J.removeableProperties[name]){L.removeAttribute(name);return;}
else if(typeof J.propertyDefault[name]!==B){K=J.propertyDefault[name];}
;}
;L[name]=K;}
else {if((J.bools[name]||K===null)&&name.indexOf(b)!==0){if(K===true){L.setAttribute(name,name);}
else if(K===false||K===null){L.removeAttribute(name);}
;}
else {L.setAttribute(name,K);}
;}
;}
,reset:function(M,name){if(name.indexOf(b)===0){M.removeAttribute(name);}
else {this.set(M,name,null);}
;}
}});}
)();
(function(){var a="file",b="+",c="strict",d="anchor",e="div",f="query",g="source",h="password",j="host",k="protocol",l="user",n="directory",p="loose",q="relative",r="queryKey",s="qx.util.Uri",t="",u="path",v="authority",w='">0</a>',x="&",y="port",z='<a href="',A="userInfo",B="?",C="=";qx.Bootstrap.define(s,{statics:{parseUri:function(F,E){var G={key:[g,k,v,A,l,h,j,y,q,u,n,a,f,d],q:{name:r,parser:/(?:^|&)([^&=]*)=?([^&]*)/g},parser:{strict:/^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,loose:/^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/}};var o=G,m=G.parser[E?c:p].exec(F),D={},i=14;while(i-- ){D[o.key[i]]=m[i]||t;}
;D[o.q.name]={};D[o.key[12]].replace(o.q.parser,function(I,J,H){if(J){D[o.q.name][J]=H;}
;}
);return D;}
,appendParamsToUrl:function(K,L){if(L===undefined){return K;}
;{}
;if(qx.lang.Type.isObject(L)){L=qx.util.Uri.toParameter(L);}
;if(!L){return K;}
;return K+=/\?/.test(K)?x+L:B+L;}
,toParameter:function(M,Q){var P,O=[];for(P in M){if(M.hasOwnProperty(P)){var N=M[P];if(N instanceof Array){for(var i=0;i<N.length;i++ ){this.__dq(P,N[i],O,Q);}
;}
else {this.__dq(P,N,O,Q);}
;}
;}
;return O.join(x);}
,__dq:function(U,V,T,S){var R=window.encodeURIComponent;if(S){T.push(R(U).replace(/%20/g,b)+C+R(V).replace(/%20/g,b));}
else {T.push(R(U)+C+R(V));}
;}
,getAbsolute:function(X){var W=document.createElement(e);W.innerHTML=z+X+w;return W.firstChild.href;}
}});}
)();
(function(){var a="qx.bom.client.Stylesheet",b="html.stylesheet.deleterule",c="html.stylesheet.insertrule",d="function",e="html.stylesheet.createstylesheet",f="html.stylesheet.addimport",g="html.stylesheet.removeimport",h="object";qx.Bootstrap.define(a,{statics:{__dr:function(){if(!qx.bom.client.Stylesheet.__ds){qx.bom.client.Stylesheet.__ds=qx.bom.Stylesheet.createElement();}
;return qx.bom.client.Stylesheet.__ds;}
,getCreateStyleSheet:function(){return typeof document.createStyleSheet===h;}
,getInsertRule:function(){return typeof qx.bom.client.Stylesheet.__dr().insertRule===d;}
,getDeleteRule:function(){return typeof qx.bom.client.Stylesheet.__dr().deleteRule===d;}
,getAddImport:function(){return (typeof qx.bom.client.Stylesheet.__dr().addImport===h);}
,getRemoveImport:function(){return (typeof qx.bom.client.Stylesheet.__dr().removeImport===h);}
},defer:function(i){qx.core.Environment.add(e,i.getCreateStyleSheet);qx.core.Environment.add(c,i.getInsertRule);qx.core.Environment.add(b,i.getDeleteRule);qx.core.Environment.add(f,i.getAddImport);qx.core.Environment.add(g,i.getRemoveImport);}
});}
)();
(function(){var a='[object Boolean]',b='[object String]',c='constructor',d='[object Date]',e='[object Number]',f='object',g="qx.lang.Object",h='[object RegExp]',j='[object Array]';qx.Bootstrap.define(g,{statics:{empty:function(k){{}
;for(var m in k){if(k.hasOwnProperty(m)){delete k[m];}
;}
;}
,isEmpty:function(n){{}
;for(var o in n){return false;}
;return true;}
,getLength:qx.Bootstrap.objectGetLength,getValues:function(q){{}
;var r=[];var p=Object.keys(q);for(var i=0,l=p.length;i<l;i++ ){r.push(q[p[i]]);}
;return r;}
,mergeWith:qx.Bootstrap.objectMergeWith,clone:function(s,v){if(qx.lang.Type.isObject(s)){var t={};for(var u in s){if(v){t[u]=qx.lang.Object.clone(s[u],v);}
else {t[u]=s[u];}
;}
;return t;}
else if(qx.lang.Type.isArray(s)){var t=[];for(var i=0;i<s.length;i++ ){if(v){t[i]=qx.lang.Object.clone(s[i],v);}
else {t[i]=s[i];}
;}
;return t;}
;return s;}
,equals:function(w,x){return qx.lang.Object.__dt(w,x,[],[]);}
,__dt:function(E,A,y,z){if(E===A){return E!==0||1/E==1/A;}
;if(E==null||A==null){return E===A;}
;var D=Object.prototype.toString.call(E);if(D!=Object.prototype.toString.call(A)){return false;}
;switch(D){case b:return E==String(A);case e:return E!=+E?A!=+A:(E==0?1/E==1/A:E==+A);case d:case a:return +E==+A;case h:return E.source==A.source&&E.global==A.global&&E.multiline==A.multiline&&E.ignoreCase==A.ignoreCase;};if(typeof E!=f||typeof A!=f){return false;}
;var length=y.length;while(length-- ){if(y[length]==E){return z[length]==A;}
;}
;var C=E.constructor,B=A.constructor;if(C!==B&&!(qx.Bootstrap.isFunction(C)&&(C instanceof C)&&qx.Bootstrap.isFunction(B)&&(B instanceof B))&&(c in E&&c in A)){return false;}
;y.push(E);z.push(A);var H=0,F=true;if(D==j){H=E.length;F=H==A.length;if(F){while(H-- ){if(!(F=qx.lang.Object.__dt(E[H],A[H],y,z))){break;}
;}
;}
;}
else {for(var G in E){if(Object.prototype.hasOwnProperty.call(E,G)){H++ ;if(!(F=Object.prototype.hasOwnProperty.call(A,G)&&qx.lang.Object.__dt(E[G],A[G],y,z))){break;}
;}
;}
;if(F){for(G in A){if(Object.prototype.hasOwnProperty.call(A,G)&&!(H-- )){break;}
;}
;F=!H;}
;}
;y.pop();z.pop();return F;}
,invert:function(I){{}
;var J={};for(var K in I){J[I[K].toString()]=K;}
;return J;}
,getKeyFromValue:function(L,M){{}
;for(var N in L){if(L.hasOwnProperty(N)&&L[N]===M){return N;}
;}
;return null;}
,contains:function(O,P){{}
;return this.getKeyFromValue(O,P)!==null;}
,fromArray:function(Q){{}
;var R={};for(var i=0,l=Q.length;i<l;i++ ){{}
;R[Q[i].toString()]=true;}
;return R;}
}});}
)();
(function(){var a="qx.ui.decoration.MBackgroundColor",b='',c="background-color",d="Color",e="_applyBackgroundColor";qx.Mixin.define(a,{properties:{backgroundColor:{check:d,nullable:true,apply:e}},members:{_styleBackgroundColor:function(f){var g=this.getBackgroundColor();if(g&&b){g=qx.theme.manager.Color.getInstance().resolve(g);}
;if(g){f[c]=g;}
;}
,_applyBackgroundColor:function(){{}
;}
}});}
)();
(function(){var a="qx.ui.decoration.IDecorator";qx.Interface.define(a,{members:{getStyles:function(){}
,getPadding:function(){}
,getInsets:function(){}
}});}
)();
(function(){var a="abstract",b="Abstract method called.",c="qx.ui.decoration.Abstract";qx.Class.define(c,{extend:qx.core.Object,implement:[qx.ui.decoration.IDecorator],type:a,members:{__du:null,_getDefaultInsets:function(){throw new Error(b);}
,_isInitialized:function(){throw new Error(b);}
,_resetInsets:function(){this.__du=null;}
,getInsets:function(){if(this.__du){return this.__du;}
;return this._getDefaultInsets();}
},destruct:function(){this.__du=null;}
});}
)();
(function(){var a="double",b="px ",c="widthTop",d="inset",e="solid",f="dotted",g="styleRight",h="styleBottom",i="_applyWidth",j="border-top",k="border-left",l="ridge",m="border-right",n="qx.ui.decoration.MSingleBorder",o="shorthand",p="Color",q="widthBottom",r="outset",s="widthLeft",t="",u="border-bottom",v="styleTop",w="colorBottom",x="groove",y="styleLeft",z="widthRight",A="dashed",B="Number",C="colorLeft",D="colorRight",E="colorTop",F="_applyStyle",G=" ",H="absolute";qx.Mixin.define(n,{properties:{widthTop:{check:B,init:0,apply:i},widthRight:{check:B,init:0,apply:i},widthBottom:{check:B,init:0,apply:i},widthLeft:{check:B,init:0,apply:i},styleTop:{nullable:true,check:[e,f,A,a,d,r,l,x],init:e,apply:F},styleRight:{nullable:true,check:[e,f,A,a,d,r,l,x],init:e,apply:F},styleBottom:{nullable:true,check:[e,f,A,a,d,r,l,x],init:e,apply:F},styleLeft:{nullable:true,check:[e,f,A,a,d,r,l,x],init:e,apply:F},colorTop:{nullable:true,check:p,apply:F},colorRight:{nullable:true,check:p,apply:F},colorBottom:{nullable:true,check:p,apply:F},colorLeft:{nullable:true,check:p,apply:F},left:{group:[s,y,C]},right:{group:[z,g,D]},top:{group:[c,v,E]},bottom:{group:[q,h,w]},width:{group:[c,z,q,s],mode:o},style:{group:[v,g,h,y],mode:o},color:{group:[E,D,w,C],mode:o}},members:{_styleBorder:function(I){{var K;var O=this.getColorTop();var L=this.getColorRight();var J=this.getColorBottom();var N=this.getColorLeft();}
;var M=this.getWidthTop();if(M>0){I[j]=M+b+this.getStyleTop()+G+(O||t);}
;var M=this.getWidthRight();if(M>0){I[m]=M+b+this.getStyleRight()+G+(L||t);}
;var M=this.getWidthBottom();if(M>0){I[u]=M+b+this.getStyleBottom()+G+(J||t);}
;var M=this.getWidthLeft();if(M>0){I[k]=M+b+this.getStyleLeft()+G+(N||t);}
;{}
;I.position=H;}
,_getDefaultInsetsForBorder:function(){return {top:this.getWidthTop(),right:this.getWidthRight(),bottom:this.getWidthBottom(),left:this.getWidthLeft()};}
,_applyWidth:function(){this._applyStyle();this._resetInsets();}
,_applyStyle:function(){{}
;}
}});}
)();
(function(){var a=', url(',b="repeat",c="backgroundPositionX",d="backgroundPositionY",e="px",f="background-position",g=" ",h="background-repeat",i="no-repeat",j=')',k="scale",l="_applyBackgroundPosition",m='url(',n="repeat-x",o="background-image",p="100% 100%",q="repeat-y",r="qx.ui.decoration.MBackgroundImage",s="background-size",t="String",u="_applyBackgroundImage";qx.Mixin.define(r,{properties:{backgroundImage:{check:t,nullable:true,apply:u},backgroundRepeat:{check:[b,n,q,i,k],init:b,apply:u},backgroundPositionX:{nullable:true,apply:l},backgroundPositionY:{nullable:true,apply:l},backgroundPosition:{group:[d,c]}},members:{_styleBackgroundImage:function(v){var x=this.getBackgroundImage();if(!x){return;}
;var y=qx.util.AliasManager.getInstance().resolve(x);var z=qx.util.ResourceManager.getInstance().toUri(y);if(v[o]){v[o]+=a+z+j;}
else {v[o]=m+z+j;}
;var w=this.getBackgroundRepeat();if(w===k){v[s]=p;}
else {v[h]=w;}
;var top=this.getBackgroundPositionY()||0;var A=this.getBackgroundPositionX()||0;if(!isNaN(top)){top+=e;}
;if(!isNaN(A)){A+=e;}
;v[f]=A+g+top;{}
;}
,_applyBackgroundImage:function(){{}
;}
,_applyBackgroundPosition:function(){{}
;}
}});}
)();
(function(){var a="0",b="qx/static",c="http://",d="https://",e="file://",f="qx.util.AliasManager",g="singleton",h=".",i="/",j="static";qx.Class.define(f,{type:g,extend:qx.util.ValueManager,construct:function(){qx.util.ValueManager.call(this);this.__dv={};this.add(j,b);}
,members:{__dv:null,_preprocess:function(n){var m=this._getDynamic();if(m[n]===false){return n;}
else if(m[n]===undefined){if(n.charAt(0)===i||n.charAt(0)===h||n.indexOf(c)===0||n.indexOf(d)===a||n.indexOf(e)===0){m[n]=false;return n;}
;if(this.__dv[n]){return this.__dv[n];}
;var l=n.substring(0,n.indexOf(i));var k=this.__dv[l];if(k!==undefined){m[n]=k+n.substring(l.length);}
;}
;return n;}
,add:function(o,q){this.__dv[o]=q;var p=this._getDynamic();for(var r in p){if(r.substring(0,r.indexOf(i))===o){p[r]=q+r.substring(o.length);}
;}
;}
,remove:function(s){delete this.__dv[s];}
,resolve:function(t){var u=this._getDynamic();if(t!=null){t=this._preprocess(t);}
;return u[t]||t;}
,getAliases:function(){var v={};for(var w in this.__dv){v[w]=this.__dv[w];}
;return v;}
},destruct:function(){this.__dv=null;}
});}
)();
(function(){var a="Microsoft.XMLHTTP",b="xhr",c="io.ssl",d="io.xhr",e="",f="file:",g="https:",h="webkit",i="gecko",j="activex",k="opera",l=".",m="io.maxrequests",n="qx.bom.client.Transport";qx.Bootstrap.define(n,{statics:{getMaxConcurrentRequestCount:function(){var p;var r=qx.bom.client.Engine.getVersion().split(l);var o=0;var s=0;var q=0;if(r[0]){o=r[0];}
;if(r[1]){s=r[1];}
;if(r[2]){q=r[2];}
;if(window.maxConnectionsPerServer){p=window.maxConnectionsPerServer;}
else if(qx.bom.client.Engine.getName()==k){p=8;}
else if(qx.bom.client.Engine.getName()==h){p=4;}
else if(qx.bom.client.Engine.getName()==i&&((o>1)||((o==1)&&(s>9))||((o==1)&&(s==9)&&(q>=1)))){p=6;}
else {p=2;}
;return p;}
,getSsl:function(){return window.location.protocol===g;}
,getXmlHttpRequest:function(){var t=window.ActiveXObject?(function(){if(window.location.protocol!==f){try{new window.XMLHttpRequest();return b;}
catch(u){}
;}
;try{new window.ActiveXObject(a);return j;}
catch(v){}
;}
)():(function(){try{new window.XMLHttpRequest();return b;}
catch(w){}
;}
)();return t||e;}
},defer:function(x){qx.core.Environment.add(m,x.getMaxConcurrentRequestCount);qx.core.Environment.add(c,x.getSsl);qx.core.Environment.add(d,x.getXmlHttpRequest);}
});}
)();
(function(){var a="singleton",b="qx.util.LibraryManager";qx.Class.define(b,{extend:qx.core.Object,type:a,statics:{__dw:qx.$$libraries||{}},members:{has:function(c){return !!this.self(arguments).__dw[c];}
,get:function(d,e){return this.self(arguments).__dw[d][e]?this.self(arguments).__dw[d][e]:null;}
,set:function(f,g,h){this.self(arguments).__dw[f][g]=h;}
}});}
)();
(function(){var a="mshtml",b="engine.name",c="//",d="io.ssl",e="",f="encoding",g="?",h="data",i="string",j="type",k="data:image/",l=";",m="/",n="resourceUri",o="qx.util.ResourceManager",p="singleton",q=",";qx.Class.define(o,{extend:qx.core.Object,type:p,construct:function(){qx.core.Object.call(this);}
,statics:{__j:qx.$$resources||{},__dx:{}},members:{has:function(r){return !!this.self(arguments).__j[r];}
,getData:function(s){return this.self(arguments).__j[s]||null;}
,getImageWidth:function(u){var t=this.self(arguments).__j[u];return t?t[0]:null;}
,getImageHeight:function(w){var v=this.self(arguments).__j[w];return v?v[1]:null;}
,getImageFormat:function(y){var x=this.self(arguments).__j[y];return x?x[2]:null;}
,getCombinedFormat:function(D){var A=e;var C=this.self(arguments).__j[D];var z=C&&C.length>4&&typeof (C[4])==i&&this.constructor.__j[C[4]];if(z){var E=C[4];var B=this.constructor.__j[E];A=B[2];}
;return A;}
,toUri:function(I){if(I==null){return I;}
;var F=this.self(arguments).__j[I];if(!F){return I;}
;if(typeof F===i){var H=F;}
else {var H=F[3];if(!H){return I;}
;}
;var G=e;if((qx.core.Environment.get(b)==a)&&qx.core.Environment.get(d)){G=this.self(arguments).__dx[H];}
;return G+qx.util.LibraryManager.getInstance().get(H,n)+m+I;}
,toDataUri:function(L){var K=this.constructor.__j[L];var N=this.constructor.__j[K[4]];var M;if(N){var J=N[4][L];M=k+J[j]+l+J[f]+q+J[h];}
else {M=this.toUri(L);}
;return M;}
},defer:function(P){if((qx.core.Environment.get(b)==a)){if(qx.core.Environment.get(d)){for(var Q in qx.$$libraries){var O;if(qx.util.LibraryManager.getInstance().get(Q,n)){O=qx.util.LibraryManager.getInstance().get(Q,n);}
else {P.__dx[Q]=e;continue;}
;if(O.match(/^\/\//)!=null){P.__dx[Q]=window.location.protocol;}
else if(O.match(/^\//)!=null){P.__dx[Q]=window.location.protocol+c+window.location.host;}
else if(O.match(/^\.\//)!=null){var S=document.URL;P.__dx[Q]=S.substring(0,S.lastIndexOf(m)+1);}
else if(O.match(/^http/)!=null){P.__dx[Q]=e;}
else {var R=window.location.href.indexOf(g);var T;if(R==-1){T=window.location.href;}
else {T=window.location.href.substring(0,R);}
;P.__dx[Q]=T.substring(0,T.lastIndexOf(m)+1);}
;}
;}
;}
;}
});}
)();
(function(){var a="innerWidthRight",b="innerColorBottom",c="css.borderradius",d="px ",e='""',f="_applyDoubleBorder",g="border-top",h="inset 0 -",i="css.boxsizing",j="innerWidthTop",k="100%",l="border-left",m="innerColorRight",n="css.boxshadow",o="innerColorTop",p="innerColorLeft",q="inset ",r="shorthand",s="inset -",t="Color",u="border-box",v="qx.ui.decoration.MDoubleBorder",w="border-bottom",x=":before",y="inset 0 ",z="px solid ",A="innerWidthBottom",B="css.rgba",C="inherit",D="Number",E="innerWidthLeft",F="px 0 ",G="inset 0 0 0 ",H="border-right",I=" ",J=",",K="absolute";qx.Mixin.define(v,{include:[qx.ui.decoration.MSingleBorder,qx.ui.decoration.MBackgroundImage],construct:function(){this._getDefaultInsetsForBorder=this.__dA;this._styleBorder=this.__dy;}
,properties:{innerWidthTop:{check:D,init:0,apply:f},innerWidthRight:{check:D,init:0,apply:f},innerWidthBottom:{check:D,init:0,apply:f},innerWidthLeft:{check:D,init:0,apply:f},innerWidth:{group:[j,a,A,E],mode:r},innerColorTop:{nullable:true,check:t,apply:f},innerColorRight:{nullable:true,check:t,apply:f},innerColorBottom:{nullable:true,check:t,apply:f},innerColorLeft:{nullable:true,check:t,apply:f},innerColor:{group:[o,m,b,p],mode:r},innerOpacity:{check:D,init:1,apply:f}},members:{__dy:function(L){var U=qx.core.Environment.get(n);var O,Y,innerWidth;{var T;O={top:this.getColorTop(),right:this.getColorRight(),bottom:this.getColorBottom(),left:this.getColorLeft()};Y={top:this.getInnerColorTop(),right:this.getInnerColorRight(),bottom:this.getInnerColorBottom(),left:this.getInnerColorLeft()};}
;innerWidth={top:this.getInnerWidthTop(),right:this.getInnerWidthRight(),bottom:this.getInnerWidthBottom(),left:this.getInnerWidthLeft()};var R=this.getWidthTop();if(R>0){L[g]=R+d+this.getStyleTop()+I+O.top;}
;R=this.getWidthRight();if(R>0){L[H]=R+d+this.getStyleRight()+I+O.right;}
;R=this.getWidthBottom();if(R>0){L[w]=R+d+this.getStyleBottom()+I+O.bottom;}
;R=this.getWidthLeft();if(R>0){L[l]=R+d+this.getStyleLeft()+I+O.left;}
;var X=this.getInnerOpacity();if(X<1){this.__dz(Y,X);}
;if(innerWidth.top>0||innerWidth.right>0||innerWidth.bottom>0||innerWidth.left>0){var W=(innerWidth.top||0)+z+Y.top;var V=(innerWidth.right||0)+z+Y.right;var Q=(innerWidth.bottom||0)+z+Y.bottom;var S=(innerWidth.left||0)+z+Y.left;L[x]={"width":k,"height":k,"position":K,"content":e,"border-top":W,"border-right":V,"border-bottom":Q,"border-left":S,"left":0,"top":0};var M=qx.bom.Style.getCssName(qx.core.Environment.get(i));L[x][M]=u;var N=qx.core.Environment.get(c);if(N){N=qx.bom.Style.getCssName(N);L[x][N]=C;}
;var P=[];if(Y.top&&innerWidth.top&&Y.top==Y.bottom&&Y.top==Y.right&&Y.top==Y.left&&innerWidth.top==innerWidth.bottom&&innerWidth.top==innerWidth.right&&innerWidth.top==innerWidth.left){P.push(G+innerWidth.top+d+Y.top);}
else {if(Y.top){P.push(y+(innerWidth.top||0)+d+Y.top);}
;if(Y.right){P.push(s+(innerWidth.right||0)+F+Y.right);}
;if(Y.bottom){P.push(h+(innerWidth.bottom||0)+d+Y.bottom);}
;if(Y.left){P.push(q+(innerWidth.left||0)+F+Y.left);}
;}
;if(P.length>0&&U){U=qx.bom.Style.getCssName(U);if(!L[U]){L[U]=P.join(J);}
else {L[U]+=J+P.join(J);}
;}
;}
else {L[x]={border:0};}
;}
,__dz:function(bd,ba){if(!qx.core.Environment.get(B)){{}
;return;}
;for(var be in bd){var bb=qx.util.ColorUtil.stringToRgb(bd[be]);bb.push(ba);var bc=qx.util.ColorUtil.rgbToRgbString(bb);bd[be]=bc;}
;}
,_applyDoubleBorder:function(){{}
;}
,__dA:function(){return {top:this.getWidthTop()+this.getInnerWidthTop(),right:this.getWidthRight()+this.getInnerWidthRight(),bottom:this.getWidthBottom()+this.getInnerWidthBottom(),left:this.getWidthLeft()+this.getInnerWidthLeft()};}
}});}
)();
(function(){var a="css.float",b="foo",c="css.borderimage.standardsyntax",d="detect",e="borderRadius",f="boxSizing",g="stretch",h="css.borderradius",j="content",k="css.inlineblock",l="css.gradient.filter",m="css.appearance",n="css.opacity",o="div",p="pointerEvents",q="css.gradient.radial",r="css.pointerevents",s="input",t="color",u="string",v="borderImage",w="userSelect",x="styleFloat",y="css.textShadow.filter",z="css.usermodify",A="flexbox",B='url("foo.png") 4 4 4 4 fill stretch',C="css.boxmodel",D="qx.bom.client.Css",E="css.boxshadow",F="appearance",G="-ms-flexbox",H="placeholder",I="-moz-none",J="backgroundImage",K="css.textShadow",L="DXImageTransform.Microsoft.Shadow",M="flex",N="css.alphaimageloaderneeded",O="css.gradient.legacywebkit",P="css.flexboxSyntax",Q="linear-gradient(0deg, #fff, #000)",R="textShadow",S="auto",T="css.borderimage",U="foo.png",V="rgba(1, 2, 3, 0.5)",W="color=#666666,direction=45",X="radial-gradient(0px 0px, cover, red 50%, blue 100%)",Y="rgba",bG="(",bH="-webkit-flex",bI='url("foo.png") 4 4 4 4 stretch',bC="css.gradient.linear",bD="DXImageTransform.Microsoft.Gradient",bE="css.userselect",bF="span",bM="css.boxsizing",bN="-webkit-gradient(linear,0% 0%,100% 100%,from(white), to(red))",bO="mshtml",ca="css.rgba",bJ=");",bK="4 fill",bL="none",bA="startColorStr=#550000FF, endColorStr=#55FFFF00",bR="progid:",bB="css.placeholder",bS="css.userselect.none",bT="css.textoverflow",bX="inline-block",bP="-moz-inline-box",bY="textOverflow",bQ="userModify",bU="boxShadow",bV="cssFloat",bW="border";qx.Bootstrap.define(D,{statics:{__dB:null,getBoxModel:function(){var content=qx.bom.client.Engine.getName()!==bO||!qx.bom.client.Browser.getQuirksMode();return content?j:bW;}
,getTextOverflow:function(){return qx.bom.Style.getPropertyName(bY);}
,getPlaceholder:function(){var i=document.createElement(s);return H in i;}
,getAppearance:function(){return qx.bom.Style.getPropertyName(F);}
,getBorderRadius:function(){return qx.bom.Style.getPropertyName(e);}
,getBoxShadow:function(){return qx.bom.Style.getPropertyName(bU);}
,getBorderImage:function(){return qx.bom.Style.getPropertyName(v);}
,getBorderImageSyntax:function(){var cc=qx.bom.client.Css.getBorderImage();if(!cc){return null;}
;var cb=document.createElement(o);if(cc===v){cb.style[cc]=B;if(cb.style.borderImageSource.indexOf(U)>=0&&cb.style.borderImageSlice.indexOf(bK)>=0&&cb.style.borderImageRepeat.indexOf(g)>=0){return true;}
;}
else {cb.style[cc]=bI;if(cb.style[cc].indexOf(U)>=0){return false;}
;}
;return null;}
,getUserSelect:function(){return qx.bom.Style.getPropertyName(w);}
,getUserSelectNone:function(){var ce=qx.bom.client.Css.getUserSelect();if(ce){var cd=document.createElement(bF);cd.style[ce]=I;return cd.style[ce]===I?I:bL;}
;return null;}
,getUserModify:function(){return qx.bom.Style.getPropertyName(bQ);}
,getFloat:function(){var cf=document.documentElement.style;return cf.cssFloat!==undefined?bV:cf.styleFloat!==undefined?x:null;}
,getLinearGradient:function(){qx.bom.client.Css.__dB=false;var cj=Q;var cg=document.createElement(o);var ch=qx.bom.Style.getAppliedStyle(cg,J,cj);if(!ch){cj=bN;var ch=qx.bom.Style.getAppliedStyle(cg,J,cj,false);if(ch){qx.bom.client.Css.__dB=true;}
;}
;if(!ch){return null;}
;var ci=/(.*?)\(/.exec(ch);return ci?ci[1]:null;}
,getFilterGradient:function(){return qx.bom.client.Css.__dC(bD,bA);}
,getRadialGradient:function(){var cn=X;var ck=document.createElement(o);var cl=qx.bom.Style.getAppliedStyle(ck,J,cn);if(!cl){return null;}
;var cm=/(.*?)\(/.exec(cl);return cm?cm[1]:null;}
,getLegacyWebkitGradient:function(){if(qx.bom.client.Css.__dB===null){qx.bom.client.Css.getLinearGradient();}
;return qx.bom.client.Css.__dB;}
,getRgba:function(){var co;try{co=document.createElement(o);}
catch(cp){co=document.createElement();}
;try{co.style[t]=V;if(co.style[t].indexOf(Y)!=-1){return true;}
;}
catch(cq){}
;return false;}
,getBoxSizing:function(){return qx.bom.Style.getPropertyName(f);}
,getInlineBlock:function(){var cr=document.createElement(bF);cr.style.display=bX;if(cr.style.display==bX){return bX;}
;cr.style.display=bP;if(cr.style.display!==bP){return bP;}
;return null;}
,getOpacity:function(){return (typeof document.documentElement.style.opacity==u);}
,getTextShadow:function(){return !!qx.bom.Style.getPropertyName(R);}
,getFilterTextShadow:function(){return qx.bom.client.Css.__dC(L,W);}
,__dC:function(cv,ct){var cu=false;var cw=bR+cv+bG+ct+bJ;var cs=document.createElement(o);document.body.appendChild(cs);cs.style.filter=cw;if(cs.filters&&cs.filters.length>0&&cs.filters.item(cv).enabled==true){cu=true;}
;document.body.removeChild(cs);return cu;}
,getAlphaImageLoaderNeeded:function(){return qx.bom.client.Engine.getName()==bO&&qx.bom.client.Browser.getDocumentMode()<9;}
,getPointerEvents:function(){var cx=document.documentElement;if(p in cx.style){var cz=cx.style.pointerEvents;cx.style.pointerEvents=S;cx.style.pointerEvents=b;var cy=cx.style.pointerEvents==S;cx.style.pointerEvents=cz;return cy;}
;return false;}
,getFlexboxSyntax:function(){var cB=null;var cA=document.createElement(d);var cC=[{value:M,syntax:M},{value:G,syntax:A},{value:bH,syntax:M}];for(var i=0;i<cC.length;i++ ){try{cA.style.display=cC[i].value;}
catch(cD){return null;}
;if(cA.style.display===cC[i].value){cB=cC[i].syntax;break;}
;}
;cA=null;return cB;}
},defer:function(cE){qx.core.Environment.add(bT,cE.getTextOverflow);qx.core.Environment.add(bB,cE.getPlaceholder);qx.core.Environment.add(h,cE.getBorderRadius);qx.core.Environment.add(E,cE.getBoxShadow);qx.core.Environment.add(bC,cE.getLinearGradient);qx.core.Environment.add(l,cE.getFilterGradient);qx.core.Environment.add(q,cE.getRadialGradient);qx.core.Environment.add(O,cE.getLegacyWebkitGradient);qx.core.Environment.add(C,cE.getBoxModel);qx.core.Environment.add(ca,cE.getRgba);qx.core.Environment.add(T,cE.getBorderImage);qx.core.Environment.add(c,cE.getBorderImageSyntax);qx.core.Environment.add(z,cE.getUserModify);qx.core.Environment.add(bE,cE.getUserSelect);qx.core.Environment.add(bS,cE.getUserSelectNone);qx.core.Environment.add(m,cE.getAppearance);qx.core.Environment.add(a,cE.getFloat);qx.core.Environment.add(bM,cE.getBoxSizing);qx.core.Environment.add(k,cE.getInlineBlock);qx.core.Environment.add(n,cE.getOpacity);qx.core.Environment.add(K,cE.getTextShadow);qx.core.Environment.add(y,cE.getFilterTextShadow);qx.core.Environment.add(N,cE.getAlphaImageLoaderNeeded);qx.core.Environment.add(r,cE.getPointerEvents);qx.core.Environment.add(P,cE.getFlexboxSyntax);}
});}
)();
(function(){var a="radiusTopRight",b="radiusTopLeft",c="px",d="-webkit-border-bottom-left-radius",e="-webkit-background-clip",f="radiusBottomRight",g="Integer",h="-webkit-border-bottom-right-radius",i="background-clip",j="border-top-left-radius",k="border-top-right-radius",l="border-bottom-left-radius",m="radiusBottomLeft",n="-webkit-border-top-left-radius",o="shorthand",p="-moz-border-radius-bottomright",q="padding-box",r="border-bottom-right-radius",s="qx.ui.decoration.MBorderRadius",t="-moz-border-radius-topright",u="engine.name",v="_applyBorderRadius",w="-webkit-border-top-right-radius",x="webkit",y="-moz-border-radius-topleft",z="-moz-border-radius-bottomleft";qx.Mixin.define(s,{properties:{radiusTopLeft:{nullable:true,check:g,apply:v},radiusTopRight:{nullable:true,check:g,apply:v},radiusBottomLeft:{nullable:true,check:g,apply:v},radiusBottomRight:{nullable:true,check:g,apply:v},radius:{group:[b,a,f,m],mode:o}},members:{_styleBorderRadius:function(A){A[e]=q;A[i]=q;var B=false;var C=this.getRadiusTopLeft();if(C>0){B=true;A[y]=C+c;A[n]=C+c;A[j]=C+c;}
;C=this.getRadiusTopRight();if(C>0){B=true;A[t]=C+c;A[w]=C+c;A[k]=C+c;}
;C=this.getRadiusBottomLeft();if(C>0){B=true;A[z]=C+c;A[d]=C+c;A[l]=C+c;}
;C=this.getRadiusBottomRight();if(C>0){B=true;A[p]=C+c;A[h]=C+c;A[r]=C+c;}
;if(B&&qx.core.Environment.get(u)==x){A[e]=q;}
else {A[i]=q;}
;}
,_applyBorderRadius:function(){{}
;}
}});}
)();
(function(){var a="border-width",b="css.borderimage.standardsyntax",c="repeat",d="Boolean",e="-l",f="stretch",g="px ",h="sliceBottom",i="-t",j="Integer",k="solid",l="borderImage",m="-r",n="border-style",o="sliceLeft",p="-b",q="sliceRight",r="px",s="repeatX",t=" fill",u="String",v="vertical",w="",x="transparent",y="round",z='") ',A="shorthand",B="qx.ui.decoration.MBorderImage",C="sliceTop",D="horizontal",E="_applyBorderImage",F="border-color",G='url("',H=" ",I="grid",J="repeatY";qx.Mixin.define(B,{properties:{borderImage:{check:u,nullable:true,apply:E},sliceTop:{check:j,nullable:true,init:null,apply:E},sliceRight:{check:j,nullable:true,init:null,apply:E},sliceBottom:{check:j,nullable:true,init:null,apply:E},sliceLeft:{check:j,nullable:true,init:null,apply:E},slice:{group:[C,q,h,o],mode:A},repeatX:{check:[f,c,y],init:f,apply:E},repeatY:{check:[f,c,y],init:f,apply:E},repeat:{group:[s,J],mode:A},fill:{check:d,init:true,apply:E},borderImageMode:{check:[D,v,I],init:I}},members:{_styleBorderImage:function(K){if(!this.getBorderImage()){return;}
;var M=qx.util.AliasManager.getInstance().resolve(this.getBorderImage());var O=qx.util.ResourceManager.getInstance().toUri(M);var R=this._getDefaultInsetsForBorderImage();var L=[R.top,R.right,R.bottom,R.left];var P=[this.getRepeatX(),this.getRepeatY()].join(H);var S=this.getFill()&&qx.core.Environment.get(b)?t:w;var N=qx.bom.Style.getPropertyName(l);if(N){var Q=qx.bom.Style.getCssName(N);K[Q]=G+O+z+L.join(H)+S+H+P;}
;K[n]=k;K[F]=x;K[a]=L.join(g)+r;}
,_getDefaultInsetsForBorderImage:function(){if(!this.getBorderImage()){return {top:0,right:0,bottom:0,left:0};}
;var T=qx.util.AliasManager.getInstance().resolve(this.getBorderImage());var U=this.__dD(T);return {top:this.getSliceTop()||U[0],right:this.getSliceRight()||U[1],bottom:this.getSliceBottom()||U[2],left:this.getSliceLeft()||U[3]};}
,_applyBorderImage:function(){{}
;}
,__dD:function(bc){var bb=this.getBorderImageMode();var bd=0;var Y=0;var ba=0;var be=0;var bf=/(.*)(\.[a-z]+)$/.exec(bc);var V=bf[1];var X=bf[2];var W=qx.util.ResourceManager.getInstance();if(bb==I||bb==v){bd=W.getImageHeight(V+i+X);ba=W.getImageHeight(V+p+X);}
;if(bb==I||bb==D){Y=W.getImageWidth(V+m+X);be=W.getImageWidth(V+e+X);}
;return [bd,Y,ba,be];}
}});}
)();
(function(){var a=" 0",b="),to(",c="px",d="css.borderradius",e="from(",f=")",g="background-image",h="background",i="filter",j="background-size",k="', ",l="0",m="_applyLinearBackgroundGradient",n="-webkit-gradient(linear,",o="startColorPosition",p="background-color",q="deg, ",r="url(",s="css.gradient.legacywebkit",t="EndColorStr='#FF",u="startColor",v="shorthand",w="Color",x="px 100%",y="StartColorStr='#FF",z="vertical",A="",B="transparent",C="qx.ui.decoration.MLinearBackgroundGradient",D="% 100%",E="endColorPosition",F="canvas",G="(",H="css.gradient.linear",I="';)",J="endColor",K=", ",L="css.gradient.filter",M="horizontal",N="Number",O="100% ",P='2d',Q="%",R=" ",S="white",T="linear-gradient",U='progid:DXImageTransform.Microsoft.Gradient(GradientType=',V=",";qx.Mixin.define(C,{properties:{startColor:{check:w,nullable:true,apply:m},endColor:{check:w,nullable:true,apply:m},orientation:{check:[M,z],init:z,apply:m},startColorPosition:{check:N,init:0,apply:m},endColorPosition:{check:N,init:100,apply:m},colorPositionUnit:{check:[c,Q],init:Q,apply:m},gradientStart:{group:[u,o],mode:v},gradientEnd:{group:[J,E],mode:v}},members:{__dE:null,_styleLinearBackgroundGradient:function(W){var bj=this.__dF();var bn=bj.start;var bh=bj.end;var bf;if(!bn||!bh){return;}
;var bq=this.getColorPositionUnit();if(qx.core.Environment.get(s)){bq=bq===c?A:bq;if(this.getOrientation()==M){var bm=this.getStartColorPosition()+bq+a+bq;var bk=this.getEndColorPosition()+bq+a+bq;}
else {var bm=l+bq+R+this.getStartColorPosition()+bq;var bk=l+bq+R+this.getEndColorPosition()+bq;}
;var bb=e+bn+b+bh+f;bf=n+bm+V+bk+V+bb+f;W[h]=bf;}
else if(qx.core.Environment.get(L)&&!qx.core.Environment.get(H)&&qx.core.Environment.get(d)){if(!this.__dE){this.__dE=document.createElement(F);}
;var X=this.getOrientation()==z;var bj=this.__dF();var bg=X?200:1;var ba=X?1:200;var be=Math.max(100,this.getEndColorPosition()-this.getStartColorPosition());if(bq===c){if(X){bg=Math.max(bg,this.getEndColorPosition()-this.getStartColorPosition());}
else {ba=Math.max(ba,this.getEndColorPosition()-this.getStartColorPosition());}
;}
else {if(X){bg=Math.max(bg,(this.getEndColorPosition()-this.getStartColorPosition())*2);}
else {ba=Math.max(ba,(this.getEndColorPosition()-this.getStartColorPosition())*2);}
;}
;this.__dE.width=ba;this.__dE.height=bg;var bd=this.__dE.getContext(P);if(X){var bp=bd.createLinearGradient(0,0,0,bg);}
else {var bp=bd.createLinearGradient(0,0,ba,0);}
;if(bq===Q){bp.addColorStop(Math.max(0,this.getStartColorPosition())/be,bj.start);bp.addColorStop(this.getEndColorPosition()/be,bj.end);}
else {var bc=X?bg:ba;bp.addColorStop(Math.max(0,this.getStartColorPosition())/bc,bj.start);bp.addColorStop(this.getEndColorPosition()/bc,bj.end);}
;bd.fillStyle=bp;bd.fillRect(0,0,ba,bg);var bf=r+this.__dE.toDataURL()+f;W[g]=bf;if(bq===Q){if(X){W[j]=O+be+Q;}
else {W[j]=be+D;}
;}
else {W[j]=X?bg+x:O+ba+c;}
;}
else if(qx.core.Environment.get(L)&&!qx.core.Environment.get(H)){var bj=this.__dF();var bo=this.getOrientation()==M?1:0;var bn=bj.start;var bh=bj.end;if(!qx.util.ColorUtil.isHex6String(bn)){bn=qx.util.ColorUtil.stringToRgb(bn);bn=qx.util.ColorUtil.rgbToHexString(bn);}
;if(!qx.util.ColorUtil.isHex6String(bh)){bh=qx.util.ColorUtil.stringToRgb(bh);bh=qx.util.ColorUtil.rgbToHexString(bh);}
;bn=bn.substring(1,bn.length);bh=bh.substring(1,bh.length);bf=U+bo+K+y+bn+k+t+bh+I;if(W[i]){W[i]+=K+bf;}
else {W[i]=bf;}
;if(!W[p]||W[p]==B){W[p]=S;}
;}
else {var br=this.getOrientation()==M?0:270;var bi=bn+R+this.getStartColorPosition()+bq;var Y=bh+R+this.getEndColorPosition()+bq;var bl=qx.core.Environment.get(H);if(bl===T){br=this.getOrientation()==M?br+90:br-90;}
;bf=bl+G+br+q+bi+V+Y+f;if(W[g]){W[g]+=K+bf;}
else {W[g]=bf;}
;}
;}
,__dF:function(){{var bs;var bu=this.getStartColor();var bt=this.getEndColor();}
;return {start:bu,end:bt};}
,_applyLinearBackgroundGradient:function(){{}
;}
}});}
)();
(function(){var a="_applyBoxShadow",b="shadowHorizontalLength",c="Boolean",d="",e="px ",f="css.boxshadow",g="shadowVerticalLength",h="inset ",i="shorthand",j="qx.ui.decoration.MBoxShadow",k="Integer",l="Color",m=",";qx.Mixin.define(j,{properties:{shadowHorizontalLength:{nullable:true,check:k,apply:a},shadowVerticalLength:{nullable:true,check:k,apply:a},shadowBlurRadius:{nullable:true,check:k,apply:a},shadowSpreadRadius:{nullable:true,check:k,apply:a},shadowColor:{nullable:true,check:l,apply:a},inset:{init:false,check:c,apply:a},shadowLength:{group:[b,g],mode:i}},members:{_styleBoxShadow:function(n){var v=qx.core.Environment.get(f);if(!v||this.getShadowVerticalLength()==null&&this.getShadowHorizontalLength()==null){return;}
;{var r;var o=this.getShadowColor();}
;if(o!=null){var u=this.getShadowVerticalLength()||0;var p=this.getShadowHorizontalLength()||0;var blur=this.getShadowBlurRadius()||0;var t=this.getShadowSpreadRadius()||0;var s=this.getInset()?h:d;var q=s+p+e+u+e+blur+e+t+e+o;v=qx.bom.Style.getCssName(v);if(!n[v]){n[v]=q;}
else {n[v]+=m+q;}
;}
;}
,_applyBoxShadow:function(){{}
;}
}});}
)();
(function(){var a="qx.ui.decoration.Decorator",b="_style",c="_getDefaultInsetsFor",d="bottom",e="top",f="left",g="right";qx.Class.define(a,{extend:qx.ui.decoration.Abstract,implement:[qx.ui.decoration.IDecorator],include:[qx.ui.decoration.MBackgroundColor,qx.ui.decoration.MBorderRadius,qx.ui.decoration.MBoxShadow,qx.ui.decoration.MDoubleBorder,qx.ui.decoration.MLinearBackgroundGradient,qx.ui.decoration.MBorderImage],members:{__dG:false,getPadding:function(){var k=this.getInset();var h=this._getDefaultInsetsForBorderImage();var n=k.top-(h.top?h.top:this.getWidthTop());var m=k.right-(h.right?h.right:this.getWidthRight());var j=k.bottom-(h.bottom?h.bottom:this.getWidthBottom());var l=k.left-(h.left?h.left:this.getWidthLeft());return {top:k.top?n:this.getInnerWidthTop(),right:k.right?m:this.getInnerWidthRight(),bottom:k.bottom?j:this.getInnerWidthBottom(),left:k.left?l:this.getInnerWidthLeft()};}
,getStyles:function(r){if(r){return this._getStyles();}
;var q={};var p=this._getStyles();for(var o in p){q[qx.lang.String.camelCase(o)]=p[o];}
;return q;}
,_getStyles:function(){var s={};for(var name in this){if(name.indexOf(b)==0&&this[name] instanceof Function){this[name](s);}
;}
;this.__dG=true;return s;}
,_getDefaultInsets:function(){var w=[e,g,d,f];var u={};for(var name in this){if(name.indexOf(c)==0&&this[name] instanceof Function){var v=this[name]();for(var i=0;i<w.length;i++ ){var t=w[i];if(u[t]==undefined){u[t]=v[t];}
;if(v[t]>u[t]){u[t]=v[t];}
;}
;}
;}
;if(u[e]!=undefined){return u;}
;return {top:0,right:0,bottom:0,left:0};}
,_isInitialized:function(){return this.__dG;}
}});}
)();
(function(){var a="_applyTheme",b="qx.theme.manager.Font",c="_dynamic",d="Theme",e="changeTheme",f="singleton";qx.Class.define(b,{type:f,extend:qx.util.ValueManager,properties:{theme:{check:d,nullable:true,apply:a,event:e}},members:{resolveDynamic:function(h){var g=this._dynamic;return h instanceof qx.bom.Font?h:g[h];}
,resolve:function(m){var l=this._dynamic;var i=l[m];if(i){return i;}
;var k=this.getTheme();if(k!==null&&k.fonts[m]){var j=this.__dI(k.fonts[m]);return l[m]=(new j).set(k.fonts[m]);}
;return m;}
,isDynamic:function(q){var p=this._dynamic;if(q&&(q instanceof qx.bom.Font||p[q]!==undefined)){return true;}
;var o=this.getTheme();if(o!==null&&q&&o.fonts[q]){var n=this.__dI(o.fonts[q]);p[q]=(new n).set(o.fonts[q]);return true;}
;return false;}
,__dH:function(s,r){if(s[r].include){var t=s[s[r].include];s[r].include=null;delete s[r].include;s[r]=qx.lang.Object.mergeWith(s[r],t,false);this.__dH(s,r);}
;}
,_applyTheme:function(y){var u=this._dynamic;for(var x in u){if(u[x].themed){u[x].dispose();delete u[x];}
;}
;if(y){var v=y.fonts;for(var x in v){if(v[x].include&&v[v[x].include]){this.__dH(v,x);}
;var w=this.__dI(v[x]);u[x]=(new w).set(v[x]);u[x].themed=true;}
;}
;this._setDynamic(u);}
,__dI:function(z){if(z.sources){return qx.bom.webfonts.WebFont;}
;return qx.bom.Font;}
},destruct:function(){this._disposeMap(c);}
});}
)();
(function(){var a="Boolean",b="px",c="_applyItalic",d="_applyBold",e="underline",f="_applyTextShadow",g="Integer",h="_applyFamily",j="_applyLineHeight",k='"',m="Array",n="line-through",o="overline",p="Color",q="String",r="",s="italic",t="normal",u="qx.bom.Font",v="bold",w="Number",x="_applyDecoration",y=" ",z="_applySize",A=",",B="_applyColor";qx.Class.define(u,{extend:qx.core.Object,construct:function(D,C){qx.core.Object.call(this);this.__dJ={fontFamily:r,fontSize:null,fontWeight:null,fontStyle:null,textDecoration:null,lineHeight:null,color:null,textShadow:null};if(D!==undefined){this.setSize(D);}
;if(C!==undefined){this.setFamily(C);}
;}
,statics:{fromString:function(H){var I=new qx.bom.Font();var F=H.split(/\s+/);var name=[];var G;for(var i=0;i<F.length;i++ ){switch(G=F[i]){case v:I.setBold(true);break;case s:I.setItalic(true);break;case e:I.setDecoration(e);break;default:var E=parseInt(G,10);if(E==G||qx.lang.String.contains(G,b)){I.setSize(E);}
else {name.push(G);}
;break;};}
;if(name.length>0){I.setFamily(name);}
;return I;}
,fromConfig:function(K){var J=new qx.bom.Font;J.set(K);return J;}
,__dK:{fontFamily:r,fontSize:r,fontWeight:r,fontStyle:r,textDecoration:r,lineHeight:1.2,color:r,textShadow:r},getDefaultStyles:function(){return this.__dK;}
},properties:{size:{check:g,nullable:true,apply:z},lineHeight:{check:w,nullable:true,apply:j},family:{check:m,nullable:true,apply:h},bold:{check:a,nullable:true,apply:d},italic:{check:a,nullable:true,apply:c},decoration:{check:[e,n,o],nullable:true,apply:x},color:{check:p,nullable:true,apply:B},textShadow:{nullable:true,check:q,apply:f}},members:{__dJ:null,_applySize:function(M,L){this.__dJ.fontSize=M===null?null:M+b;}
,_applyLineHeight:function(O,N){this.__dJ.lineHeight=O===null?null:O;}
,_applyFamily:function(P,Q){var R=r;for(var i=0,l=P.length;i<l;i++ ){if(P[i].indexOf(y)>0){R+=k+P[i]+k;}
else {R+=P[i];}
;if(i!==l-1){R+=A;}
;}
;this.__dJ.fontFamily=R;}
,_applyBold:function(T,S){this.__dJ.fontWeight=T==null?null:T?v:t;}
,_applyItalic:function(V,U){this.__dJ.fontStyle=V==null?null:V?s:t;}
,_applyDecoration:function(X,W){this.__dJ.textDecoration=X==null?null:X;}
,_applyColor:function(ba,Y){this.__dJ.color=null;if(ba){this.__dJ.color=qx.theme.manager.Color.getInstance().resolve(ba);}
;}
,_applyTextShadow:function(bc,bb){this.__dJ.textShadow=bc==null?null:bc;}
,getStyles:function(){return this.__dJ;}
}});}
)();
(function(){var a="changeStatus",b="qx.bom.webfonts.WebFont",c="_applySources",d="",e="qx.event.type.Data";qx.Class.define(b,{extend:qx.bom.Font,events:{"changeStatus":e},properties:{sources:{nullable:true,apply:c}},members:{__dL:null,_applySources:function(h,k){var f=[];for(var i=0,l=h.length;i<l;i++ ){var g=this._quoteFontFamily(h[i].family);f.push(g);var j=h[i].source;qx.bom.webfonts.Manager.getInstance().require(g,j,this._onWebFontChangeStatus,this);}
;this.setFamily(f.concat(this.getFamily()));}
,_onWebFontChangeStatus:function(m){var n=m.getData();this.fireDataEvent(a,n);{}
;}
,_quoteFontFamily:function(o){return o.replace(/["']/g,d);}
}});}
)();
(function(){var a="m",b="os.name",c=")",d="os.version",e="qx.bom.webfonts.Manager",f="svg",g="chrome",h="browser.name",k="singleton",n=",\n",o="src: ",p="mobileSafari",q="'eot)",r="');",s="changeStatus",t="interval",u="#",v="firefox",w="!",y="eot",z="ios",A="'eot')",B="\.(",C="}\n",D="font-family: ",E="browser.documentmode",F="mobile safari",G="safari",H="@font-face.*?",I="",J="ttf",K=";\n",L="') format('svg')",M="') format('woff')",N="('embedded-opentype')",O="browser.version",P="opera",Q="engine.version",R="Couldn't create @font-face rule for WebFont ",S="mshtml",T="engine.name",U="url('",V="src: url('",W="('embedded-opentype)",X="\nfont-style: normal;\nfont-weight: normal;",Y="?#iefix') format('embedded-opentype')",bh="woff",bi="ie",bj=";",bf="@font-face {",bg="') format('truetype')";qx.Class.define(e,{extend:qx.core.Object,type:k,construct:function(){qx.core.Object.call(this);this.__dM=[];this.__dN={};this.__dO=[];this.__dP=this.getPreferredFormats();}
,statics:{FONT_FORMATS:[y,bh,J,f],VALIDATION_TIMEOUT:5000},members:{__dM:null,__dQ:null,__dN:null,__dP:null,__dO:null,__dR:null,require:function(bm,bn,bo,bq){var bl=[];for(var i=0,l=bn.length;i<l;i++ ){var bp=bn[i].split(u);var bk=qx.util.ResourceManager.getInstance().toUri(bp[0]);if(bp.length>1){bk=bk+u+bp[1];}
;bl.push(bk);}
;if(qx.core.Environment.get(T)==S&&(parseInt(qx.core.Environment.get(Q))<9||qx.core.Environment.get(E)<9)){if(!this.__dR){this.__dR=new qx.event.Timer(100);this.__dR.addListener(t,this.__dT,this);}
;if(!this.__dR.isEnabled()){this.__dR.start();}
;this.__dO.push([bm,bl,bo,bq]);}
else {this.__dS(bm,bl,bo,bq);}
;}
,remove:function(bs){var br=null;for(var i=0,l=this.__dM.length;i<l;i++ ){if(this.__dM[i]==bs){br=i;this.__ea(bs);break;}
;}
;if(br){qx.lang.Array.removeAt(this.__dM,br);}
;if(bs in this.__dN){this.__dN[bs].dispose();delete this.__dN[bs];}
;}
,getPreferredFormats:function(){var bt=[];var bx=qx.core.Environment.get(h);var bu=qx.core.Environment.get(O);var bw=qx.core.Environment.get(b);var bv=qx.core.Environment.get(d);if((bx==bi&&qx.core.Environment.get(E)>=9)||(bx==v&&bu>=3.6)||(bx==g&&bu>=6)){bt.push(bh);}
;if((bx==P&&bu>=10)||(bx==G&&bu>=3.1)||(bx==v&&bu>=3.5)||(bx==g&&bu>=4)||(bx==F&&bw==z&&bv>=4.2)){bt.push(J);}
;if(bx==bi&&bu>=4){bt.push(y);}
;if(bx==p&&bw==z&&bv>=4.1){bt.push(f);}
;return bt;}
,removeStyleSheet:function(){this.__dM=[];if(this.__dQ){qx.bom.Stylesheet.removeSheet(this.__dQ);}
;this.__dQ=null;}
,__dS:function(bA,bC,bz,bD){if(!qx.lang.Array.contains(this.__dM,bA)){var bE=this.__dV(bC);var bB=this.__dW(bA,bE);if(!bB){throw new Error(R+bA+w);}
;if(!this.__dQ){this.__dQ=qx.bom.Stylesheet.createElement();}
;try{this.__dY(bB);}
catch(bF){{}
;}
;this.__dM.push(bA);}
;if(!this.__dN[bA]){this.__dN[bA]=new qx.bom.webfonts.Validator(bA);this.__dN[bA].setTimeout(qx.bom.webfonts.Manager.VALIDATION_TIMEOUT);this.__dN[bA].addListenerOnce(s,this.__dU,this);}
;if(bz){var by=bD||window;this.__dN[bA].addListenerOnce(s,bz,by);}
;this.__dN[bA].validate();}
,__dT:function(){if(this.__dO.length==0){this.__dR.stop();return;}
;var bG=this.__dO.shift();this.__dS.apply(this,bG);}
,__dU:function(bH){var bI=bH.getData();if(bI.valid===false){qx.event.Timer.once(function(){this.remove(bI.family);}
,this,250);}
;}
,__dV:function(bJ){var bL=qx.bom.webfonts.Manager.FONT_FORMATS;var bK={};for(var i=0,l=bJ.length;i<l;i++ ){var bM=null;for(var x=0;x<bL.length;x++ ){var bN=new RegExp(B+bL[x]+c);var bO=bN.exec(bJ[i]);if(bO){bM=bO[1];}
;}
;if(bM){bK[bM]=bJ[i];}
;}
;return bK;}
,__dW:function(bR,bU){var bT=[];var bP=this.__dP.length>0?this.__dP:qx.bom.webfonts.Manager.FONT_FORMATS;for(var i=0,l=bP.length;i<l;i++ ){var bQ=bP[i];if(bU[bQ]){bT.push(this.__dX(bQ,bU[bQ]));}
;}
;var bS=o+bT.join(n)+bj;bS=D+bR+K+bS;bS=bS+X;return bS;}
,__dX:function(bW,bV){switch(bW){case y:return U+bV+r+V+bV+Y;case bh:return U+bV+M;case J:return U+bV+bg;case f:return U+bV+L;default:return null;};}
,__dY:function(bY){var bX=bf+bY+C;if(qx.core.Environment.get(h)==bi&&qx.core.Environment.get(E)<9){var ca=this.__eb(this.__dQ.cssText);ca+=bX;this.__dQ.cssText=ca;}
else {this.__dQ.insertRule(bX,this.__dQ.cssRules.length);}
;}
,__ea:function(cb){var ce=new RegExp(H+cb,a);for(var i=0,l=document.styleSheets.length;i<l;i++ ){var cc=document.styleSheets[i];if(cc.cssText){var cd=cc.cssText.replace(/\n/g,I).replace(/\r/g,I);cd=this.__eb(cd);if(ce.exec(cd)){cd=cd.replace(ce,I);}
;cc.cssText=cd;}
else if(cc.cssRules){for(var j=0,m=cc.cssRules.length;j<m;j++ ){var cd=cc.cssRules[j].cssText.replace(/\n/g,I).replace(/\r/g,I);if(ce.exec(cd)){this.__dQ.deleteRule(j);return;}
;}
;}
;}
;}
,__eb:function(cf){return cf.replace(q,A).replace(W,N);}
},destruct:function(){if(this.__dR){this.__dR.stop();this.__dR.dispose();}
;delete this.__dM;this.removeStyleSheet();for(var cg in this.__dN){this.__dN[cg].dispose();}
;qx.bom.webfonts.Validator.removeDefaultHelperElements();}
});}
)();
(function(){var a="qx.event.Timer",b="_applyInterval",c="_applyEnabled",d="Boolean",f="interval",g="qx.event.type.Event",h="Integer";qx.Class.define(a,{extend:qx.core.Object,construct:function(i){qx.core.Object.call(this);this.setEnabled(false);if(i!=null){this.setInterval(i);}
;var self=this;this.__ec=function(){self._oninterval.call(self);}
;}
,events:{"interval":g},statics:{once:function(j,k,l){{}
;var m=new qx.event.Timer(l);m.__ed=j;m.addListener(f,function(e){m.stop();j.call(k,e);m.dispose();k=null;}
,k);m.start();return m;}
},properties:{enabled:{init:true,check:d,apply:c},interval:{check:h,init:1000,apply:b}},members:{__ee:null,__ec:null,_applyInterval:function(o,n){if(this.getEnabled()){this.restart();}
;}
,_applyEnabled:function(q,p){if(p){window.clearInterval(this.__ee);this.__ee=null;}
else if(q){this.__ee=window.setInterval(this.__ec,this.getInterval());}
;}
,start:function(){this.setEnabled(true);}
,startWith:function(r){this.setInterval(r);this.start();}
,stop:function(){this.setEnabled(false);}
,restart:function(){this.stop();this.start();}
,restartWith:function(s){this.stop();this.startWith(s);}
,_oninterval:qx.event.GlobalError.observeMethod(function(){if(this.$$disposed){return;}
;if(this.getEnabled()){this.fireEvent(f);}
;}
)},destruct:function(){if(this.__ee){window.clearInterval(this.__ee);}
;this.__ee=this.__ec=null;}
});}
)();
(function(){var a="sans-serif",b="changeStatus",c="Integer",d="auto",e="qx.event.type.Data",f="0",g="qx.bom.webfonts.Validator",h="interval",i="Georgia",j="WEei",k="visible",l="Times New Roman",m="Arial",n="normal",o="Helvetica",p="__ei",q="350px",r="_applyFontFamily",s="-1000px",t="hidden",u="serif",v="span",w="absolute",x=",";qx.Class.define(g,{extend:qx.core.Object,construct:function(y){qx.core.Object.call(this);if(y){this.setFontFamily(y);this.__ef=this._getRequestedHelpers();}
;}
,statics:{COMPARISON_FONTS:{sans:[m,o,a],serif:[l,i,u]},HELPER_CSS:{position:w,margin:f,padding:f,top:s,left:s,fontSize:q,width:d,height:d,lineHeight:n,fontVariant:n,visibility:t},COMPARISON_STRING:j,__eg:null,__eh:null,removeDefaultHelperElements:function(){var z=qx.bom.webfonts.Validator.__eh;if(z){for(var A in z){document.body.removeChild(z[A]);}
;}
;delete qx.bom.webfonts.Validator.__eh;}
},properties:{fontFamily:{nullable:true,init:null,apply:r},timeout:{check:c,init:5000}},events:{"changeStatus":e},members:{__ef:null,__ei:null,__ej:null,validate:function(){this.__ej=new Date().getTime();if(this.__ei){this.__ei.restart();}
else {this.__ei=new qx.event.Timer(100);this.__ei.addListener(h,this.__el,this);qx.event.Timer.once(function(){this.__ei.start();}
,this,0);}
;}
,_reset:function(){if(this.__ef){for(var C in this.__ef){var B=this.__ef[C];document.body.removeChild(B);}
;this.__ef=null;}
;}
,_isFontValid:function(){if(!qx.bom.webfonts.Validator.__eg){this.__ek();}
;if(!this.__ef){this.__ef=this._getRequestedHelpers();}
;this.__ef.sans.style.visibility=k;this.__ef.sans.style.visibility=t;this.__ef.serif.style.visibility=k;this.__ef.serif.style.visibility=t;var E=qx.bom.element.Dimension.getWidth(this.__ef.sans);var D=qx.bom.element.Dimension.getWidth(this.__ef.serif);var F=qx.bom.webfonts.Validator;if(E!==F.__eg.sans||D!==F.__eg.serif){return true;}
;return false;}
,_getRequestedHelpers:function(){var G=[this.getFontFamily()].concat(qx.bom.webfonts.Validator.COMPARISON_FONTS.sans);var H=[this.getFontFamily()].concat(qx.bom.webfonts.Validator.COMPARISON_FONTS.serif);return {sans:this._getHelperElement(G),serif:this._getHelperElement(H)};}
,_getHelperElement:function(I){var J=qx.lang.Object.clone(qx.bom.webfonts.Validator.HELPER_CSS);if(I){if(J.fontFamily){J.fontFamily+=x+I.join(x);}
else {J.fontFamily=I.join(x);}
;}
;var K=document.createElement(v);K.innerHTML=qx.bom.webfonts.Validator.COMPARISON_STRING;qx.bom.element.Style.setStyles(K,J);document.body.appendChild(K);return K;}
,_applyFontFamily:function(M,L){if(M!==L){this._reset();}
;}
,__ek:function(){var N=qx.bom.webfonts.Validator;if(!N.__eh){N.__eh={sans:this._getHelperElement(N.COMPARISON_FONTS.sans),serif:this._getHelperElement(N.COMPARISON_FONTS.serif)};}
;N.__eg={sans:qx.bom.element.Dimension.getWidth(N.__eh.sans),serif:qx.bom.element.Dimension.getWidth(N.__eh.serif)};}
,__el:function(){if(this._isFontValid()){this.__ei.stop();this._reset();this.fireDataEvent(b,{family:this.getFontFamily(),valid:true});}
else {var O=new Date().getTime();if(O-this.__ej>=this.getTimeout()){this.__ei.stop();this._reset();this.fireDataEvent(b,{family:this.getFontFamily(),valid:false});}
;}
;}
},destruct:function(){this._reset();this.__ei.stop();this.__ei.removeListener(h,this.__el,this);this._disposeObjects(p);}
});}
)();
(function(){var a="mshtml",b="engine.name",c="qx.bom.element.Dimension",d="0px",e="paddingRight",f="paddingLeft",g="opera",h="overflowY",i="paddingTop",j="overflowX",k="browser.documentmode",l="paddingBottom";qx.Bootstrap.define(c,{statics:{getWidth:function(n){var m=this._getBoundingClientRect(n);return Math.round(m.right-m.left);}
,getHeight:function(p){var o=this._getBoundingClientRect(p);return Math.round(o.bottom-o.top);}
,_getBoundingClientRect:function(t){var s=t.getBoundingClientRect();if(qx.core.Environment.get(k)===11&&!!document.msFullscreenElement&&window!==window.top&&this.__em(t)){var q={};for(var r in s){q[r]=s[r]*100;}
;s=q;}
;return s;}
,__em:function(u){if(document.msFullscreenElement===u){return true;}
;return qx.dom.Hierarchy.contains(document.msFullscreenElement,u);}
,getSize:function(v){return {width:this.getWidth(v),height:this.getHeight(v)};}
,__en:{visible:true,hidden:true},getContentWidth:function(z){var w=qx.bom.element.Style;var x=qx.bom.element.Style.get(z,j);var y=parseInt(w.get(z,f)||d,10);var C=parseInt(w.get(z,e)||d,10);if(this.__en[x]){var B=z.clientWidth;if((qx.core.Environment.get(b)==g)||qx.dom.Node.isBlockNode(z)){B=B-y-C;}
;if(qx.core.Environment.get(b)==a){if(B===0&&z.offsetHeight===0){return z.offsetWidth;}
;}
;return B;}
else {if(z.clientWidth>=z.scrollWidth){return Math.max(z.clientWidth,z.scrollWidth)-y-C;}
else {var A=z.scrollWidth-y;if(qx.core.Environment.get(b)==a){A-=C;}
;return A;}
;}
;}
,getContentHeight:function(H){var D=qx.bom.element.Style;var G=qx.bom.element.Style.get(H,h);var F=parseInt(D.get(H,i)||d,10);var E=parseInt(D.get(H,l)||d,10);if(this.__en[G]){return H.clientHeight-F-E;}
else {if(H.clientHeight>=H.scrollHeight){return Math.max(H.clientHeight,H.scrollHeight)-F-E;}
else {return H.scrollHeight-F;}
;}
;}
,getContentSize:function(I){return {width:this.getContentWidth(I),height:this.getContentHeight(I)};}
}});}
)();
(function(){var a="qx.dom.Hierarchy",b="previousSibling",c="html.element.contains",d="html.element.compareDocumentPosition",e="nextSibling",f="parentNode",g="*";qx.Bootstrap.define(a,{statics:{getNodeIndex:function(h){var i=0;while(h&&(h=h.previousSibling)){i++ ;}
;return i;}
,getElementIndex:function(l){var j=0;var k=qx.dom.Node.ELEMENT;while(l&&(l=l.previousSibling)){if(l.nodeType==k){j++ ;}
;}
;return j;}
,getNextElementSibling:function(m){while(m&&(m=m.nextSibling)&&!qx.dom.Node.isElement(m)){continue;}
;return m||null;}
,getPreviousElementSibling:function(n){while(n&&(n=n.previousSibling)&&!qx.dom.Node.isElement(n)){continue;}
;return n||null;}
,contains:function(q,p){if(qx.core.Environment.get(c)){if(qx.dom.Node.isDocument(q)){var o=qx.dom.Node.getDocument(p);return q&&o==q;}
else if(qx.dom.Node.isDocument(p)){return false;}
else {return q.contains(p);}
;}
else if(qx.core.Environment.get(d)){return !!(q.compareDocumentPosition(p)&16);}
else {while(p){if(q==p){return true;}
;p=p.parentNode;}
;return false;}
;}
,isRendered:function(s){var r=s.ownerDocument||s.document;if(qx.core.Environment.get(c)){if(!s.parentNode){return false;}
;return r.body.contains(s);}
else if(qx.core.Environment.get(d)){return !!(r.compareDocumentPosition(s)&16);}
else {while(s){if(s==r.body){return true;}
;s=s.parentNode;}
;return false;}
;}
,isDescendantOf:function(u,t){return this.contains(t,u);}
,getCommonParent:function(w,x){if(w===x){return w;}
;if(qx.core.Environment.get(c)){while(w&&qx.dom.Node.isElement(w)){if(w.contains(x)){return w;}
;w=w.parentNode;}
;return null;}
else {var v=[];while(w||x){if(w){if(qx.lang.Array.contains(v,w)){return w;}
;v.push(w);w=w.parentNode;}
;if(x){if(qx.lang.Array.contains(v,x)){return x;}
;v.push(x);x=x.parentNode;}
;}
;return null;}
;}
,getAncestors:function(y){return this._recursivelyCollect(y,f);}
,getChildElements:function(A){A=A.firstChild;if(!A){return [];}
;var z=this.getNextSiblings(A);if(A.nodeType===1){z.unshift(A);}
;return z;}
,getDescendants:function(B){return qx.lang.Array.fromCollection(B.getElementsByTagName(g));}
,getFirstDescendant:function(C){C=C.firstChild;while(C&&C.nodeType!=1){C=C.nextSibling;}
;return C;}
,getLastDescendant:function(D){D=D.lastChild;while(D&&D.nodeType!=1){D=D.previousSibling;}
;return D;}
,getPreviousSiblings:function(E){return this._recursivelyCollect(E,b);}
,getNextSiblings:function(F){return this._recursivelyCollect(F,e);}
,_recursivelyCollect:function(I,G){var H=[];while(I=I[G]){if(I.nodeType==1){H.push(I);}
;}
;return H;}
,getSiblings:function(J){return this.getPreviousSiblings(J).reverse().concat(this.getNextSiblings(J));}
,isEmpty:function(K){K=K.firstChild;while(K){if(K.nodeType===qx.dom.Node.ELEMENT||K.nodeType===qx.dom.Node.TEXT){return false;}
;K=K.nextSibling;}
;return true;}
,cleanWhitespace:function(N){var L=N.firstChild;while(L){var M=L.nextSibling;if(L.nodeType==3&&!/\S/.test(L.nodeValue)){N.removeChild(L);}
;L=M;}
;}
}});}
)();
(function(){var a="engine.name",b=");",c="",d=")",e="zoom:1;filter:alpha(opacity=",f="qx.bom.element.Opacity",g="css.opacity",h=";",i="opacity:",j="alpha(opacity=",k="opacity",l="filter";qx.Bootstrap.define(f,{statics:{compile:qx.core.Environment.select(a,{"mshtml":function(m){if(m>=1){m=1;}
;if(m<0.00001){m=0;}
;if(qx.core.Environment.get(g)){return i+m+h;}
else {return e+(m*100)+b;}
;}
,"default":function(n){return i+n+h;}
}),set:qx.core.Environment.select(a,{"mshtml":function(q,o){if(qx.core.Environment.get(g)){q.style.opacity=o;}
else {var p=qx.bom.element.Style.get(q,l,qx.bom.element.Style.COMPUTED_MODE,false);if(o>=1){o=1;}
;if(o<0.00001){o=0;}
;if(!q.currentStyle||!q.currentStyle.hasLayout){q.style.zoom=1;}
;q.style.filter=p.replace(/alpha\([^\)]*\)/gi,c)+j+o*100+d;}
;}
,"default":function(s,r){s.style.opacity=r;}
}),reset:qx.core.Environment.select(a,{"mshtml":function(u){if(qx.core.Environment.get(g)){u.style.opacity=c;}
else {var t=qx.bom.element.Style.get(u,l,qx.bom.element.Style.COMPUTED_MODE,false);u.style.filter=t.replace(/alpha\([^\)]*\)/gi,c);}
;}
,"default":function(v){v.style.opacity=c;}
}),get:qx.core.Environment.select(a,{"mshtml":function(z,y){if(qx.core.Environment.get(g)){var w=qx.bom.element.Style.get(z,k,y,false);if(w!=null){return parseFloat(w);}
;return 1.0;}
else {var x=qx.bom.element.Style.get(z,l,y,false);if(x){var w=x.match(/alpha\(opacity=(.*)\)/);if(w&&w[1]){return parseFloat(w[1])/100;}
;}
;return 1.0;}
;}
,"default":function(C,B){var A=qx.bom.element.Style.get(C,k,B,false);if(A!=null){return parseFloat(A);}
;return 1.0;}
})}});}
)();
(function(){var a="cursor:",b="engine.name",c="",d="mshtml",e="nw-resize",f="engine.version",g="nesw-resize",h="browser.documentmode",i=";",j="nwse-resize",k="qx.bom.element.Cursor",l="ne-resize",m="browser.quirksmode",n="cursor";qx.Bootstrap.define(k,{statics:{__eq:{},compile:function(o){return a+(this.__eq[o]||o)+i;}
,get:function(q,p){return qx.bom.element.Style.get(q,n,p,false);}
,set:function(s,r){s.style.cursor=this.__eq[r]||r;}
,reset:function(t){t.style.cursor=c;}
},defer:function(u){if(qx.core.Environment.get(b)==d&&((parseFloat(qx.core.Environment.get(f))<9||qx.core.Environment.get(h)<9)&&!qx.core.Environment.get(m))){u.__eq[g]=l;u.__eq[j]=e;}
;}
});}
)();
(function(){var a="border-box",b="qx.bom.element.BoxSizing",c="css.boxsizing",d="",e="boxSizing",f="content-box",g=":",h=";";qx.Bootstrap.define(b,{statics:{__eo:{tags:{button:true,select:true},types:{search:true,button:true,submit:true,reset:true,checkbox:true,radio:true}},__ep:function(j){var i=this.__eo;return i.tags[j.tagName.toLowerCase()]||i.types[j.type];}
,compile:function(k){if(qx.core.Environment.get(c)){var l=qx.bom.Style.getCssName(qx.core.Environment.get(c));return l+g+k+h;}
else {{}
;}
;}
,get:function(m){if(qx.core.Environment.get(c)){return qx.bom.element.Style.get(m,e,null,false)||d;}
;if(qx.bom.Document.isStandardMode(qx.dom.Node.getWindow(m))){if(!this.__ep(m)){return f;}
;}
;return a;}
,set:function(o,n){if(qx.core.Environment.get(c)){try{o.style[qx.core.Environment.get(c)]=n;}
catch(p){{}
;}
;}
else {{}
;}
;}
,reset:function(q){this.set(q,d);}
}});}
)();
(function(){var a="clip:auto;",b="rect(",c=")",d=");",e="",f="px",g="Could not parse clip string: ",h="qx.bom.element.Clip",i="string",j="clip:rect(",k=" ",l="clip",m="rect(auto,auto,auto,auto)",n="rect(auto, auto, auto, auto)",o="auto",p=",";qx.Bootstrap.define(h,{statics:{compile:function(q){if(!q){return a;}
;var v=q.left;var top=q.top;var u=q.width;var t=q.height;var r,s;if(v==null){r=(u==null?o:u+f);v=o;}
else {r=(u==null?o:v+u+f);v=v+f;}
;if(top==null){s=(t==null?o:t+f);top=o;}
else {s=(t==null?o:top+t+f);top=top+f;}
;return j+top+p+r+p+s+p+v+d;}
,get:function(z,D){var x=qx.bom.element.Style.get(z,l,D,false);var C,top,A,E;var w,y;if(typeof x===i&&x!==o&&x!==e){x=x.trim();if(/\((.*)\)/.test(x)){var F=RegExp.$1;if(/,/.test(F)){var B=F.split(p);}
else {var B=F.split(k);}
;top=B[0].trim();w=B[1].trim();y=B[2].trim();C=B[3].trim();if(C===o){C=null;}
;if(top===o){top=null;}
;if(w===o){w=null;}
;if(y===o){y=null;}
;if(top!=null){top=parseInt(top,10);}
;if(w!=null){w=parseInt(w,10);}
;if(y!=null){y=parseInt(y,10);}
;if(C!=null){C=parseInt(C,10);}
;if(w!=null&&C!=null){A=w-C;}
else if(w!=null){A=w;}
;if(y!=null&&top!=null){E=y-top;}
else if(y!=null){E=y;}
;}
else {throw new Error(g+x);}
;}
;return {left:C||null,top:top||null,width:A||null,height:E||null};}
,set:function(L,G){if(!G){L.style.clip=m;return;}
;var M=G.left;var top=G.top;var K=G.width;var J=G.height;var H,I;if(M==null){H=(K==null?o:K+f);M=o;}
else {H=(K==null?o:M+K+f);M=M+f;}
;if(top==null){I=(J==null?o:J+f);top=o;}
else {I=(J==null?o:top+J+f);top=top+f;}
;L.style.clip=b+top+p+H+p+I+p+M+c;}
,reset:function(N){N.style.clip=n;}
}});}
)();
(function(){var a="css.float",b='cssFloat',c="px",d="Cascaded styles are not supported in this browser!",e="css.appearance",f="pixelRight",g="css.userselect",h="css.boxsizing",i="css.textoverflow",j="pixelHeight",k=":",l="pixelTop",m="css.borderimage",n="pixelLeft",o="css.usermodify",p="qx.bom.element.Style",q="",r="pixelBottom",s="pixelWidth",t='float',u=";",v="\"\"",w="style";qx.Bootstrap.define(p,{statics:{__er:null,__es:null,__et:function(){var y={"appearance":qx.core.Environment.get(e),"userSelect":qx.core.Environment.get(g),"textOverflow":qx.core.Environment.get(i),"borderImage":qx.core.Environment.get(m),"float":qx.core.Environment.get(a),"userModify":qx.core.Environment.get(o),"boxSizing":qx.core.Environment.get(h)};this.__es={};for(var x in qx.lang.Object.clone(y)){if(!y[x]){delete y[x];}
else {if(x===t){this.__es[b]=x;}
else {this.__es[x]=qx.bom.Style.getCssName(y[x]);}
;}
;}
;this.__er=y;}
,__eu:function(name){var z=qx.bom.Style.getPropertyName(name);if(z){this.__er[name]=z;}
;return z;}
,__ev:{width:s,height:j,left:n,right:f,top:l,bottom:r},__ew:{clip:qx.bom.element.Clip,cursor:qx.bom.element.Cursor,opacity:qx.bom.element.Opacity,boxSizing:qx.bom.element.BoxSizing},compile:function(A){var D=[];var E=this.__ew;var C=this.__es;var name,B;for(name in A){B=A[name];if(B==null){continue;}
;name=this.__es[name]||name;if(E[name]){D.push(E[name].compile(B));}
else {if(!C[name]){C[name]=qx.bom.Style.getCssName(name);}
;D.push(C[name],k,B===q?v:B,u);}
;}
;return D.join(q);}
,setCss:function(G,F){G.setAttribute(w,F);}
,getCss:function(H){return H.getAttribute(w);}
,isPropertySupported:function(I){return (this.__ew[I]||this.__er[I]||I in document.documentElement.style);}
,COMPUTED_MODE:1,CASCADED_MODE:2,LOCAL_MODE:3,set:function(L,name,J,K){{}
;name=this.__er[name]||this.__eu(name)||name;if(K!==false&&this.__ew[name]){this.__ew[name].set(L,J);}
else {L.style[name]=J!==null?J:q;}
;}
,setStyles:function(S,M,T){{}
;var P=this.__er;var Q=this.__ew;var N=S.style;for(var R in M){var O=M[R];var name=P[R]||this.__eu(R)||R;if(O===undefined){if(T!==false&&Q[name]){Q[name].reset(S);}
else {N[name]=q;}
;}
else {if(T!==false&&Q[name]){Q[name].set(S,O);}
else {N[name]=O!==null?O:q;}
;}
;}
;}
,reset:function(V,name,U){name=this.__er[name]||this.__eu(name)||name;if(U!==false&&this.__ew[name]){this.__ew[name].reset(V);}
else {V.style[name]=q;}
;}
,get:function(ba,name,bc,be){name=this.__er[name]||this.__eu(name)||name;if(be!==false&&this.__ew[name]){return this.__ew[name].get(ba,bc);}
;switch(bc){case this.LOCAL_MODE:return ba.style[name]||q;case this.CASCADED_MODE:if(ba.currentStyle){return ba.currentStyle[name]||q;}
;throw new Error(d);default:var X=qx.dom.Node.getDocument(ba);var bb=X.defaultView?X.defaultView.getComputedStyle:undefined;if(bb!==undefined){var W=bb(ba,null);if(W&&W[name]){return W[name];}
;}
else {if(!ba.currentStyle){return ba.style[name]||q;}
;var bg=ba.currentStyle[name]||ba.style[name]||q;if(/^-?[\.\d]+(px)?$/i.test(bg)){return bg;}
;var bf=this.__ev[name];if(bf&&(bf in ba.style)){var bd=ba.style[name];ba.style[name]=bg||0;var Y=ba.style[bf]+c;ba.style[name]=bd;return Y;}
;return bg;}
;return ba.style[name]||q;};}
},defer:function(bh){bh.__et();}
});}
)();
(function(){var a="engine.name",b="CSS1Compat",c="position:absolute;width:0;height:0;width:1",d="engine.version",e="qx.bom.Document",f="1px",g="div";qx.Bootstrap.define(e,{statics:{isQuirksMode:qx.core.Environment.select(a,{"mshtml":function(h){if(qx.core.Environment.get(d)>=8){return (h||window).document.documentMode===5;}
else {return (h||window).document.compatMode!==b;}
;}
,"webkit":function(i){if(document.compatMode===undefined){var j=(i||window).document.createElement(g);j.style.cssText=c;return j.style.width===f?true:false;}
else {return (i||window).document.compatMode!==b;}
;}
,"default":function(k){return (k||window).document.compatMode!==b;}
}),isStandardMode:function(l){return !this.isQuirksMode(l);}
,getWidth:function(m){var o=(m||window).document;var n=qx.bom.Viewport.getWidth(m);var scroll=this.isStandardMode(m)?o.documentElement.scrollWidth:o.body.scrollWidth;return Math.max(scroll,n);}
,getHeight:function(p){var r=(p||window).document;var q=qx.bom.Viewport.getHeight(p);var scroll=this.isStandardMode(p)?r.documentElement.scrollHeight:r.body.scrollHeight;return Math.max(scroll,q);}
}});}
)();
(function(){var a="ios",b="os.name",c="undefined",d="qx.bom.Viewport";qx.Bootstrap.define(d,{statics:{getWidth:function(e){var e=e||window;var f=e.document;return qx.bom.Document.isStandardMode(e)?f.documentElement.clientWidth:f.body.clientWidth;}
,getHeight:function(g){var g=g||window;var h=g.document;if(qx.core.Environment.get(b)==a&&window.innerHeight!=h.documentElement.clientHeight){return window.innerHeight;}
;return qx.bom.Document.isStandardMode(g)?h.documentElement.clientHeight:h.body.clientHeight;}
,getScrollLeft:function(i){var i=i?i:window;if(typeof i.pageXOffset!==c){return i.pageXOffset;}
;var j=i.document;return j.documentElement.scrollLeft||j.body.scrollLeft;}
,getScrollTop:function(k){var k=k?k:window;if(typeof k.pageYOffset!==c){return k.pageYOffset;}
;var l=k.document;return l.documentElement.scrollTop||l.body.scrollTop;}
,__ex:function(m){var o=this.getWidth(m)>this.getHeight(m)?90:0;var n=m.orientation;if(n==null||Math.abs(n%180)==o){return {"-270":90,"-180":180,"-90":-90,"0":0,"90":90,"180":180,"270":-90};}
else {return {"-270":180,"-180":-90,"-90":0,"0":90,"90":180,"180":-90,"270":0};}
;}
,__ey:null,getOrientation:function(p){var p=p||window.top;var q=p.orientation;if(q==null){q=this.getWidth(p)>this.getHeight(p)?90:0;}
else {if(this.__ey==null){this.__ey=this.__ex(p);}
;q=this.__ey[q];}
;return q;}
,isLandscape:function(r){var s=this.getOrientation(r);return s===-90||s===90;}
,isPortrait:function(t){var u=this.getOrientation(t);return u===0||u===180;}
}});}
)();
(function(){var a="qx.theme.manager.Icon",b="Theme",c="changeTheme",d="_applyTheme",e="singleton";qx.Class.define(a,{type:e,extend:qx.core.Object,properties:{theme:{check:b,nullable:true,apply:d,event:c}},members:{_applyTheme:function(i,g){var h=qx.util.AliasManager.getInstance();if(g){for(var f in g.aliases){h.remove(f);}
;}
;if(i){for(var f in i.aliases){h.add(f,i.aliases[f]);}
;}
;}
}});}
)();
(function(){var a="Missing appearance: ",b="_applyTheme",c="string",d="qx.theme.manager.Appearance",e=":",f="Theme",g="changeTheme",h="/",j="singleton";qx.Class.define(d,{type:j,extend:qx.core.Object,construct:function(){qx.core.Object.call(this);this.__ez={};this.__eA={};}
,properties:{theme:{check:f,nullable:true,event:g,apply:b}},members:{__eB:{},__ez:null,__eA:null,_applyTheme:function(){this.__eA={};this.__ez={};}
,__eC:function(y,u,l,p){var r=u.appearances;var m=r[y];if(!m){var x=h;var n=[];var q=y.split(x);var w=qx.lang.Array.clone(q);var t;while(!m&&q.length>0){n.unshift(q.pop());var o=q.join(x);m=r[o];if(m){t=m.alias||m;if(typeof t===c){var v=t+x+n.join(x);return this.__eC(v,u,l,w);}
;}
;}
;for(var i=0;i<n.length-1;i++ ){n.shift();var s=n.join(x);var k=this.__eC(s,u,null,w);if(k){return k;}
;}
;if(l!=null){return this.__eC(l,u,null,w);}
;{}
;return null;}
else if(typeof m===c){return this.__eC(m,u,l,w);}
else if(m.include&&!m.style){return this.__eC(m.include,u,l,w);}
;return y;}
,styleFrom:function(R,J,K,A){if(!K){K=this.getTheme();}
;var H=this.__eA;var z=H[R];if(!z){z=H[R]=this.__eC(R,K,A);}
;var O=K.appearances[z];if(!O){this.warn(a+R);return null;}
;if(!O.style){return null;}
;var P=z;if(J){var D=O.$$bits;if(!D){D=O.$$bits={};O.$$length=0;}
;var E=0;for(var G in J){if(!J[G]){continue;}
;if(D[G]==null){D[G]=1<<O.$$length++ ;}
;E+=D[G];}
;if(E>0){P+=e+E;}
;}
;var F=this.__ez;if(F[P]!==undefined){return F[P];}
;if(!J){J=this.__eB;}
;var M;if(O.include||O.base){var Q;if(O.include){Q=this.styleFrom(O.include,J,K,A);}
;var I=O.style(J,Q);M={};if(O.base){var N=this.styleFrom(z,J,O.base,A);if(O.include){for(var C in N){if(!Q.hasOwnProperty(C)&&!I.hasOwnProperty(C)){M[C]=N[C];}
;}
;}
else {for(var L in N){if(!I.hasOwnProperty(L)){M[L]=N[L];}
;}
;}
;}
;if(O.include){for(var B in Q){if(!I.hasOwnProperty(B)){M[B]=Q[B];}
;}
;}
;for(var S in I){M[S]=I[S];}
;}
else {M=O.style(J);}
;return F[P]=M||null;}
},destruct:function(){this.__ez=this.__eA=null;}
});}
)();
(function(){var b="'!",c="other",d="widgets",e="undefined",f="fonts",g="appearances",h="qx.Theme",j="]",k="Mixin theme is not a valid theme!",m="[Theme ",n="colors",o="decorations",p="' are not compatible '",q="Theme",r="meta",s="The mixins '",t="borders",u="icons";qx.Bootstrap.define(h,{statics:{define:function(name,w){if(!w){var w={};}
;w.include=this.__eD(w.include);w.patch=this.__eD(w.patch);{}
;var v={$$type:q,name:name,title:w.title,toString:this.genericToString};if(w.extend){v.supertheme=w.extend;}
;v.basename=qx.Bootstrap.createNamespace(name,v);this.__eG(v,w);this.__eE(v,w);this.$$registry[name]=v;for(var i=0,a=w.include,l=a.length;i<l;i++ ){this.include(v,a[i]);}
;for(var i=0,a=w.patch,l=a.length;i<l;i++ ){this.patch(v,a[i]);}
;}
,__eD:function(x){if(!x){return [];}
;if(qx.Bootstrap.isArray(x)){return x;}
else {return [x];}
;}
,__eE:function(y,z){var A=z.aliases||{};if(z.extend&&z.extend.aliases){qx.Bootstrap.objectMergeWith(A,z.extend.aliases,false);}
;y.aliases=A;}
,getAll:function(){return this.$$registry;}
,getByName:function(name){return this.$$registry[name];}
,isDefined:function(name){return this.getByName(name)!==undefined;}
,getTotalNumber:function(){return qx.Bootstrap.objectGetLength(this.$$registry);}
,genericToString:function(){return m+this.name+j;}
,__eF:function(C){for(var i=0,B=this.__eH,l=B.length;i<l;i++ ){if(C[B[i]]){return B[i];}
;}
;}
,__eG:function(H,I){var E=this.__eF(I);if(I.extend&&!E){E=I.extend.type;}
;H.type=E||c;var F=function(){}
;if(I.extend){F.prototype=new I.extend.$$clazz;}
;var D=F.prototype;var G=I[E];for(var J in G){D[J]=G[J];if(D[J].base){{}
;D[J].base=I.extend;}
;}
;H.$$clazz=F;H[E]=new F;}
,$$registry:{},__eH:[n,t,o,f,u,d,g,r],__h:null,__eI:null,__i:function(){}
,patch:function(N,L){this.__eJ(L);var P=this.__eF(L);if(P!==this.__eF(N)){throw new Error(s+N.name+p+L.name+b);}
;var M=L[P];var K=N.$$clazz.prototype;for(var O in M){K[O]=M[O];}
;}
,include:function(T,R){this.__eJ(R);var V=R.type;if(V!==T.type){throw new Error(s+T.name+p+R.name+b);}
;var S=R[V];var Q=T.$$clazz.prototype;for(var U in S){if(Q[U]!==undefined){continue;}
;Q[U]=S[U];}
;}
,__eJ:function(W){if(typeof W===e||W==null){var X=new Error(k);{var Y;}
;throw X;}
;}
}});}
)();
(function(){var a="__eN",b="qx.ui.tooltip.ToolTip",c="Boolean",d="",f="mouse",g="pointerover",h="interval",i="__eK",j="_applyCurrent",k="widget",l="__eL",m="qx.ui.tooltip.Manager",n="pointermove",o="focusout",p="tooltip-error",q="singleton",r="pointerout";qx.Class.define(m,{type:q,extend:qx.core.Object,construct:function(){qx.core.Object.call(this);qx.event.Registration.addListener(document.body,g,this.__eS,this,true);this.__eK=new qx.event.Timer();this.__eK.addListener(h,this.__eP,this);this.__eL=new qx.event.Timer();this.__eL.addListener(h,this.__eQ,this);this.__eM={left:0,top:0};}
,properties:{current:{check:b,nullable:true,apply:j},showInvalidToolTips:{check:c,init:true},showToolTips:{check:c,init:true}},members:{__eM:null,__eL:null,__eK:null,__eN:null,__eO:null,getSharedTooltip:function(){if(!this.__eN){this.__eN=new qx.ui.tooltip.ToolTip().set({rich:true});}
;return this.__eN;}
,getSharedErrorTooltip:function(){if(!this.__eO){this.__eO=new qx.ui.tooltip.ToolTip().set({appearance:p,rich:true});this.__eO.setLabel(d);this.__eO.syncAppearance();}
;return this.__eO;}
,_applyCurrent:function(u,t){if(t&&qx.ui.core.Widget.contains(t,u)){return;}
;if(t){if(!t.isDisposed()){t.exclude();}
;this.__eK.stop();this.__eL.stop();}
;var v=qx.event.Registration;var s=document.body;if(u){this.__eK.startWith(u.getShowTimeout());v.addListener(s,r,this.__eT,this,true);v.addListener(s,o,this.__eU,this,true);v.addListener(s,n,this.__eR,this,true);}
else {v.removeListener(s,r,this.__eT,this,true);v.removeListener(s,o,this.__eU,this,true);v.removeListener(s,n,this.__eR,this,true);}
;}
,__eP:function(e){var w=this.getCurrent();if(w&&!w.isDisposed()){this.__eL.startWith(w.getHideTimeout());if(w.getPlaceMethod()==k){w.placeToWidget(w.getOpener());}
else {w.placeToPoint(this.__eM);}
;w.show();}
;this.__eK.stop();}
,__eQ:function(e){var x=this.getCurrent();if(x&&!x.isDisposed()){x.exclude();}
;this.__eL.stop();this.resetCurrent();}
,__eR:function(e){var y=this.__eM;y.left=Math.round(e.getDocumentLeft());y.top=Math.round(e.getDocumentTop());}
,__eS:function(e){var z=qx.ui.core.Widget.getWidgetByElement(e.getTarget());this.__eR(e);this.showToolTip(z);}
,showToolTip:function(C){if(!C){return;}
;var D,B,E,A;while(C!=null){D=C.getToolTip();B=C.getToolTipText()||null;E=C.getToolTipIcon()||null;if(qx.Class.hasInterface(C.constructor,qx.ui.form.IForm)&&!C.isValid()){A=C.getInvalidMessage();}
;if(D||B||E||A){break;}
;C=C.getLayoutParent();}
;if(!C||(!C.getEnabled()&&!C.isShowToolTipWhenDisabled())||C.isBlockToolTip()||(!A&&!this.getShowToolTips())||(A&&!this.getShowInvalidToolTips())){return;}
;if(A){D=this.getSharedErrorTooltip().set({label:A});}
;if(!D){D=this.getSharedTooltip().set({label:B,icon:E});}
;this.setCurrent(D);D.setOpener(C);}
,__eT:function(e){var F=qx.ui.core.Widget.getWidgetByElement(e.getTarget());if(!F){return;}
;var G=qx.ui.core.Widget.getWidgetByElement(e.getRelatedTarget());if(!G&&e.getPointerType()==f){return;}
;var H=this.getCurrent();if(H&&(G==H||qx.ui.core.Widget.contains(H,G))){return;}
;if(G&&F&&qx.ui.core.Widget.contains(F,G)){return;}
;if(H&&!G){this.setCurrent(null);}
else {this.resetCurrent();}
;}
,__eU:function(e){var I=qx.ui.core.Widget.getWidgetByElement(e.getTarget());if(!I){return;}
;var J=this.getCurrent();if(J&&J==I.getToolTip()){this.setCurrent(null);}
;}
},destruct:function(){qx.event.Registration.removeListener(document.body,g,this.__eS,this,true);this._disposeObjects(i,l,a);this.__eM=null;}
});}
)();
(function(){var a="qx.ui.core.MLayoutHandling";qx.Mixin.define(a,{members:{setLayout:function(b){this._setLayout(b);}
,getLayout:function(){return this._getLayout();}
},statics:{remap:function(c){c.getLayout=c._getLayout;c.setLayout=c._setLayout;}
}});}
)();
(function(){var a="changeWidth",b="Boolean",c="allowShrinkY",d="_applyAlign",e="_applyStretching",f="bottom",g="Integer",h="changeTheme",i="_applyDimension",j="baseline",k="marginBottom",l="qx.ui.core.LayoutItem",m="center",n="marginTop",o="allowGrowX",p="shorthand",q="middle",r="marginLeft",s="qx.dyntheme",t="allowShrinkX",u="top",v="right",w="marginRight",x="abstract",y="_applyMargin",z="allowGrowY",A="left",B="changeHeight";qx.Class.define(l,{type:x,extend:qx.core.Object,construct:function(){qx.core.Object.call(this);if(qx.core.Environment.get(s)){qx.theme.manager.Meta.getInstance().addListener(h,this._onChangeTheme,this);}
;}
,properties:{minWidth:{check:g,nullable:true,apply:i,init:null,themeable:true},width:{check:g,event:a,nullable:true,apply:i,init:null,themeable:true},maxWidth:{check:g,nullable:true,apply:i,init:null,themeable:true},minHeight:{check:g,nullable:true,apply:i,init:null,themeable:true},height:{check:g,event:B,nullable:true,apply:i,init:null,themeable:true},maxHeight:{check:g,nullable:true,apply:i,init:null,themeable:true},allowGrowX:{check:b,apply:e,init:true,themeable:true},allowShrinkX:{check:b,apply:e,init:true,themeable:true},allowGrowY:{check:b,apply:e,init:true,themeable:true},allowShrinkY:{check:b,apply:e,init:true,themeable:true},allowStretchX:{group:[o,t],mode:p,themeable:true},allowStretchY:{group:[z,c],mode:p,themeable:true},marginTop:{check:g,init:0,apply:y,themeable:true},marginRight:{check:g,init:0,apply:y,themeable:true},marginBottom:{check:g,init:0,apply:y,themeable:true},marginLeft:{check:g,init:0,apply:y,themeable:true},margin:{group:[n,w,k,r],mode:p,themeable:true},alignX:{check:[A,m,v],nullable:true,apply:d,themeable:true},alignY:{check:[u,q,f,j],nullable:true,apply:d,themeable:true}},members:{_onChangeTheme:qx.core.Environment.select(s,{"true":function(){var E=qx.util.PropertyUtil.getAllProperties(this.constructor);for(var name in E){var D=E[name];if(D.themeable){var C=qx.util.PropertyUtil.getUserValue(this,name);if(C==null){qx.util.PropertyUtil.resetThemed(this,name);}
;}
;}
;}
,"false":null}),__eV:null,__eW:null,__eX:null,__eY:null,__fa:null,__fb:null,__fc:null,getBounds:function(){return this.__fb||this.__eW||null;}
,clearSeparators:function(){}
,renderSeparator:function(F,G){}
,renderLayout:function(N,top,K,J){{var L;}
;var I=null;if(this.getHeight()==null&&this._hasHeightForWidth()){var I=this._getHeightForWidth(K);}
;if(I!=null&&I!==this.__eV){this.__eV=I;qx.ui.core.queue.Layout.add(this);return null;}
;var H=this.__eW;if(!H){H=this.__eW={};}
;var M={};if(N!==H.left||top!==H.top){M.position=true;H.left=N;H.top=top;}
;if(K!==H.width||J!==H.height){M.size=true;H.width=K;H.height=J;}
;if(this.__eX){M.local=true;delete this.__eX;}
;if(this.__fa){M.margin=true;delete this.__fa;}
;return M;}
,isExcluded:function(){return false;}
,hasValidLayout:function(){return !this.__eX;}
,scheduleLayoutUpdate:function(){qx.ui.core.queue.Layout.add(this);}
,invalidateLayoutCache:function(){this.__eX=true;this.__eY=null;}
,getSizeHint:function(O){var P=this.__eY;if(P){return P;}
;if(O===false){return null;}
;P=this.__eY=this._computeSizeHint();if(this._hasHeightForWidth()&&this.__eV&&this.getHeight()==null){P.height=this.__eV;}
;if(P.minWidth>P.width){P.width=P.minWidth;}
;if(P.maxWidth<P.width){P.width=P.maxWidth;}
;if(!this.getAllowGrowX()){P.maxWidth=P.width;}
;if(!this.getAllowShrinkX()){P.minWidth=P.width;}
;if(P.minHeight>P.height){P.height=P.minHeight;}
;if(P.maxHeight<P.height){P.height=P.maxHeight;}
;if(!this.getAllowGrowY()){P.maxHeight=P.height;}
;if(!this.getAllowShrinkY()){P.minHeight=P.height;}
;return P;}
,_computeSizeHint:function(){var U=this.getMinWidth()||0;var R=this.getMinHeight()||0;var V=this.getWidth()||U;var T=this.getHeight()||R;var Q=this.getMaxWidth()||Infinity;var S=this.getMaxHeight()||Infinity;return {minWidth:U,width:V,maxWidth:Q,minHeight:R,height:T,maxHeight:S};}
,_hasHeightForWidth:function(){var W=this._getLayout();if(W){return W.hasHeightForWidth();}
;return false;}
,_getHeightForWidth:function(X){var Y=this._getLayout();if(Y&&Y.hasHeightForWidth()){return Y.getHeightForWidth(X);}
;return null;}
,_getLayout:function(){return null;}
,_applyMargin:function(){this.__fa=true;var parent=this.$$parent;if(parent){parent.updateLayoutProperties();}
;}
,_applyAlign:function(){var parent=this.$$parent;if(parent){parent.updateLayoutProperties();}
;}
,_applyDimension:function(){qx.ui.core.queue.Layout.add(this);}
,_applyStretching:function(){qx.ui.core.queue.Layout.add(this);}
,hasUserBounds:function(){return !!this.__fb;}
,setUserBounds:function(bb,top,ba,bc){this.__fb={left:bb,top:top,width:ba,height:bc};qx.ui.core.queue.Layout.add(this);}
,resetUserBounds:function(){delete this.__fb;qx.ui.core.queue.Layout.add(this);}
,__fd:{},setLayoutProperties:function(bf){if(bf==null){return;}
;var bd=this.__fc;if(!bd){bd=this.__fc={};}
;var parent=this.getLayoutParent();if(parent){parent.updateLayoutProperties(bf);}
;for(var be in bf){if(bf[be]==null){delete bd[be];}
else {bd[be]=bf[be];}
;}
;}
,getLayoutProperties:function(){return this.__fc||this.__fd;}
,clearLayoutProperties:function(){delete this.__fc;}
,updateLayoutProperties:function(bi){var bg=this._getLayout();if(bg){{var bh;}
;bg.invalidateChildrenCache();}
;qx.ui.core.queue.Layout.add(this);}
,getApplicationRoot:function(){return qx.core.Init.getApplication().getRoot();}
,getLayoutParent:function(){return this.$$parent||null;}
,setLayoutParent:function(parent){if(this.$$parent===parent){return;}
;this.$$parent=parent||null;qx.ui.core.queue.Visibility.add(this);}
,isRootWidget:function(){return false;}
,_getRoot:function(){var parent=this;while(parent){if(parent.isRootWidget()){return parent;}
;parent=parent.$$parent;}
;return null;}
,clone:function(){var bj=qx.core.Object.prototype.clone.call(this);var bk=this.__fc;if(bk){bj.__fc=qx.lang.Object.clone(bk);}
;return bj;}
},destruct:function(){if(qx.core.Environment.get(s)){qx.theme.manager.Meta.getInstance().removeListener(h,this._onChangeTheme,this);}
;this.$$parent=this.$$subparent=this.__fc=this.__eW=this.__fb=this.__eY=null;}
});}
)();
(function(){var a="$$theme_",b="$$user_",c="qx.util.PropertyUtil",d="$$init_";qx.Class.define(c,{statics:{getProperties:function(e){return e.$$properties;}
,getAllProperties:function(j){var g={};var f=j;while(f!=qx.core.Object){var i=this.getProperties(f);for(var h in i){g[h]=i[h];}
;f=f.superclass;}
;return g;}
,getUserValue:function(l,k){return l[b+k];}
,setUserValue:function(n,m,o){n[b+m]=o;}
,deleteUserValue:function(q,p){delete (q[b+p]);}
,getInitValue:function(s,r){return s[d+r];}
,setInitValue:function(u,t,v){u[d+t]=v;}
,deleteInitValue:function(x,w){delete (x[d+w]);}
,getThemeValue:function(z,y){return z[a+y];}
,setThemeValue:function(B,A,C){B[a+A]=C;}
,deleteThemeValue:function(E,D){delete (E[a+D]);}
,setThemed:function(H,G,I){var F=qx.core.Property.$$method.setThemed;H[F[G]](I);}
,resetThemed:function(K,J){var L=qx.core.Property.$$method.resetThemed;K[L[J]]();}
}});}
)();
(function(){var a="qx.ui.core.queue.Layout",b="layout";qx.Class.define(a,{statics:{__dO:{},__fe:{},remove:function(c){delete this.__dO[c.$$hash];}
,add:function(d){this.__dO[d.$$hash]=d;qx.ui.core.queue.Manager.scheduleFlush(b);}
,isScheduled:function(e){return !!this.__dO[e.$$hash];}
,flush:function(){var f=this.__fg();for(var i=f.length-1;i>=0;i-- ){var g=f[i];if(g.hasValidLayout()){continue;}
;if(g.isRootWidget()&&!g.hasUserBounds()){var j=g.getSizeHint();g.renderLayout(0,0,j.width,j.height);}
else {var h=g.getBounds();g.renderLayout(h.left,h.top,h.width,h.height);}
;}
;}
,getNestingLevel:function(l){var k=this.__fe;var n=0;var parent=l;while(true){if(k[parent.$$hash]!=null){n+=k[parent.$$hash];break;}
;if(!parent.$$parent){break;}
;parent=parent.$$parent;n+=1;}
;var m=n;while(l&&l!==parent){k[l.$$hash]=m-- ;l=l.$$parent;}
;return n;}
,__ff:function(){var t=qx.ui.core.queue.Visibility;this.__fe={};var s=[];var r=this.__dO;var o,q;for(var p in r){o=r[p];if(t.isVisible(o)){q=this.getNestingLevel(o);if(!s[q]){s[q]={};}
;s[q][p]=o;delete r[p];}
;}
;return s;}
,__fg:function(){var x=[];var z=this.__ff();for(var w=z.length-1;w>=0;w-- ){if(!z[w]){continue;}
;for(var v in z[w]){var u=z[w][v];if(w==0||u.isRootWidget()||u.hasUserBounds()){x.push(u);u.invalidateLayoutCache();continue;}
;var B=u.getSizeHint(false);if(B){u.invalidateLayoutCache();var y=u.getSizeHint();var A=(!u.getBounds()||B.minWidth!==y.minWidth||B.width!==y.width||B.maxWidth!==y.maxWidth||B.minHeight!==y.minHeight||B.height!==y.height||B.maxHeight!==y.maxHeight);}
else {A=true;}
;if(A){var parent=u.getLayoutParent();if(!z[w-1]){z[w-1]={};}
;z[w-1][parent.$$hash]=parent;}
else {x.push(u);}
;}
;}
;return x;}
}});}
)();
(function(){var a="mshtml",b="engine.name",c="pop.push.reverse.shift.sort.splice.unshift.join.slice",d="number",e="qx.type.BaseArray",f=".";qx.Bootstrap.define(e,{extend:Array,construct:function(g){}
,members:{toArray:null,valueOf:null,pop:null,push:null,reverse:null,shift:null,sort:null,splice:null,unshift:null,concat:null,join:null,slice:null,toString:null,indexOf:null,lastIndexOf:null,forEach:null,filter:null,map:null,some:null,every:null}});(function(){function h(p){if((qx.core.Environment.get(b)==a)){j.prototype={length:0,$$isArray:true};var n=c.split(f);for(var length=n.length;length;){j.prototype[n[ --length]]=Array.prototype[n[length]];}
;}
;var m=Array.prototype.slice;j.prototype.concat=function(){var r=this.slice(0);for(var i=0,length=arguments.length;i<length;i++ ){var q;if(arguments[i] instanceof j){q=m.call(arguments[i],0);}
else if(arguments[i] instanceof Array){q=arguments[i];}
else {q=[arguments[i]];}
;r.push.apply(r,q);}
;return r;}
;j.prototype.toString=function(){return m.call(this,0).toString();}
;j.prototype.toLocaleString=function(){return m.call(this,0).toLocaleString();}
;j.prototype.constructor=j;j.prototype.indexOf=Array.prototype.indexOf;j.prototype.lastIndexOf=Array.prototype.lastIndexOf;j.prototype.forEach=Array.prototype.forEach;j.prototype.some=Array.prototype.some;j.prototype.every=Array.prototype.every;var o=Array.prototype.filter;var l=Array.prototype.map;j.prototype.filter=function(){var s=new this.constructor;s.push.apply(s,o.apply(this,arguments));return s;}
;j.prototype.map=function(){var t=new this.constructor;t.push.apply(t,l.apply(this,arguments));return t;}
;j.prototype.slice=function(){var u=new this.constructor;u.push.apply(u,Array.prototype.slice.apply(this,arguments));return u;}
;j.prototype.splice=function(){var v=new this.constructor;v.push.apply(v,Array.prototype.splice.apply(this,arguments));return v;}
;j.prototype.toArray=function(){return Array.prototype.slice.call(this,0);}
;j.prototype.valueOf=function(){return this.length;}
;return j;}
;function j(length){if(arguments.length===1&&typeof length===d){this.length=-1<length&&length===length>>.5?length:this.push(length);}
else if(arguments.length){this.push.apply(this,arguments);}
;}
;function k(){}
;k.prototype=[];j.prototype=new k;j.prototype.length=0;qx.type.BaseArray=h(j);}
)();}
)();
(function(){var a="name",b="qxWeb",c="toString",d="$",e="number",f="_",g="data-qx-class",h="basename",j="classname";qx.Bootstrap.define(b,{extend:qx.type.BaseArray,statics:{__ek:[],$$qx:qx,$init:function(p,n){if(p.length&&p.length==1&&p[0]&&p[0].$widget instanceof qxWeb){return p[0].$widget;}
;var o=[];for(var i=0;i<p.length;i++ ){var m=!!(p[i]&&(p[i].nodeType===1||p[i].nodeType===9||p[i].nodeType===11));if(m){o.push(p[i]);continue;}
;var k=!!(p[i]&&p[i].history&&p[i].location&&p[i].document);if(k){o.push(p[i]);}
;}
;if(p[0]&&p[0].getAttribute&&p[0].getAttribute(g)&&o.length<2){n=qx.Bootstrap.getByName(p[0].getAttribute(g))||n;}
;var r=qx.lang.Array.cast(o,n);for(var i=0;i<qxWeb.__ek.length;i++ ){qxWeb.__ek[i].call(r);}
;return r;}
,$attach:function(t,s){for(var name in t){if(qxWeb.prototype[name]!=undefined&&Array.prototype[name]==undefined&&s!==true){{}
;}
else {qxWeb.prototype[name]=t[name];}
;}
;}
,$attachStatic:function(v,u){for(var name in v){{}
;qxWeb[name]=v[name];}
;}
,$attachAll:function(y,x){for(var name in y.members){if(name.indexOf(d)!==0&&name.indexOf(f)!==0)qxWeb.prototype[name]=y.members[name];}
;var w;if(x!=null){qxWeb[x]=qxWeb[x]||{};w=qxWeb[x];}
else {w=qxWeb;}
;for(var name in y.statics){if(name.indexOf(d)!==0&&name.indexOf(f)!==0&&name!==a&&name!==h&&name!==j&&name!==c&&name!==name.toUpperCase())w[name]=y.statics[name];}
;}
,$attachInit:function(z){this.__ek.push(z);}
,define:function(name,A){if(A==undefined){A=name;name=null;}
;return qx.Bootstrap.define.call(qx.Bootstrap,name,A);}
},construct:function(C,B){if(!C&&this instanceof qxWeb){return this;}
;if(!C){C=[];}
else if(qx.Bootstrap.isString(C)){if(B instanceof qxWeb&&B.length!=0){B=B[0];}
;if(B instanceof qxWeb){C=[];}
else {C=qx.bom.Selector.query(C,B);}
;}
else if((C.nodeType===1||C.nodeType===9||C.nodeType===11)||(C.history&&C.location&&C.document)){C=[C];}
;return qxWeb.$init(C,qxWeb);}
,members:{filter:function(D){if(qx.lang.Type.isFunction(D)){return qxWeb.$init(Array.prototype.filter.call(this,D),this.constructor);}
;return qxWeb.$init(qx.bom.Selector.matches(D,this),this.constructor);}
,unique:function(){var E=qx.lang.Array.unique(this);return qxWeb.$init(E,this.constructor);}
,slice:function(F,G){if(G!==undefined){return qxWeb.$init(Array.prototype.slice.call(this,F,G),this.constructor);}
;return qxWeb.$init(Array.prototype.slice.call(this,F),this.constructor);}
,splice:function(H,I,J){return qxWeb.$init(Array.prototype.splice.apply(this,arguments),this.constructor);}
,map:function(K,L){return qxWeb.$init(Array.prototype.map.apply(this,arguments),qxWeb);}
,concat:function(N){var M=Array.prototype.slice.call(this,0);for(var i=0;i<arguments.length;i++ ){if(arguments[i] instanceof qxWeb){M=M.concat(Array.prototype.slice.call(arguments[i],0));}
else {M.push(arguments[i]);}
;}
;return qxWeb.$init(M,this.constructor);}
,indexOf:function(O,P){if(!O){return -1;}
;if(!P){P=0;}
;if(typeof P!==e){return -1;}
;if(P<0){P=this.length+P;if(P<0){P=0;}
;}
;if(qx.lang.Type.isArray(O)){O=O[0];}
;for(var i=P,l=this.length;i<l;i++ ){if(this[i]===O){return i;}
;}
;return -1;}
,debug:function(){{}
;return this;}
,logThis:function(){{var Q,length;}
;return this;}
,_forEachElement:function(S,R){for(var i=0,l=this.length;i<l;i++ ){if(this[i]&&(this[i].nodeType===1||this[i].nodeType===11)){S.apply(R||this,[this[i],i,this]);}
;}
;return this;}
,_forEachElementWrapped:function(U,T){this._forEachElement(function(V,X,W){U.apply(this,[qxWeb(V),X,W]);}
,T);return this;}
},defer:function(Y){if(window.q==undefined){q=Y;}
;}
});}
)();
(function(){var c="-",d="(^|",f="'] ",g="CLASS",h=":disabled",k="div",l="input",n="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",o="nth",p="*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(",q="type|href|height|width",r=")*)|.*)\\)|)",s="disabled",t="*(?:value|",u="~=",v="previousSibling",w="*(even|odd|(([+-]|)(\\d*)n|)",x="xml:lang",y="only",z="*",A="unsupported lang: ",B="+|((?:^|[^\\\\])(?:\\\\.)*)",C="i",D="\\\\([\\da-f]{1,6}",E="='$1']",F="w#",G="^=",H="*([>+~]|",I="[t^='']",J="*\\)|)",K="+$",L="=",M="unload",N="id",O="text",P="needsContext",Q="nextSibling",R="$=",S="[s!='']:x",T="string",U=")|.)",V="[\\x20\\t\\r\\n\\f]",W="[name=d]",X="*(?:([+-]|)",Y="*((?:-\\d)?\\d*)",cL="#",cM="[selected]",cN="type",cH="ig",cI="parentNode",cJ="href",cK="0x",cS="(",cT="w",cY="even",cU="<div class='a'></div><div class='a i'></div>",cO="g",cP="*\\]",cQ="*\\)|)(?=[^-]|$)",cR="unsupported pseudo: ",dC="w*",eo="*[*^$|!~]?=",da="<select t=''><option selected=''></option></select>",cV=" ",cW="hidden",el="*(?:([*^$|!~]?=)",cX="*,",db="function",dc="^",dd=")",di=")|)|)",dj=":(",dk="onunload",de="button",df="0",dg="^(",dh="option",dq="odd",dr="class",ds="*(\\d+)|))",dt="lang",dl="|=",dm="\\[",dn="name",dp="D",dx="!=",dy="<input/>",en="*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(",dz="sizzle",du="*=",dv="|",em="Syntax error, unrecognized expression: ",dw=")$",dA="object",dB="?|(",dN="$1",dM=")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|",dL="*([^\\]'\"]*?)",dR="*(?:''|\"\")",dQ="eq",dP="className",dO=":enabled",dG="of-type",dF="TAG",dE="|$)",dD="<a href='#'></a>",dK="empty",dJ="qx.bom.Selector",dI="^(?:",dH="value",dY="[id='",dX="^#(",dW="[*^$]=",dV="*,:x",ed="*(",ec="^\\.(",eb="",ea="CHILD",dU=",.*:",dT="^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(",dS="(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",eg="$",ef="\\$&",ee=":checked",ek=",",ej="ID",ei="last",eh="HTML";qx.Bootstrap.define(dJ,{statics:{query:null,matches:null}});(function(window){var i,eM,fM,ew,eB,fC,eG,ep,eE,eF,eD,document,fK,fq,fe,eq,ff,eN,fa=dz+-(new Date()),eH=window.document,eW=0,eA=0,es=ey(),fr=ey(),fI=ey(),eT=function(a,b){if(a===b){eF=true;}
;return 0;}
,eR=typeof undefined,ft=1<<31,fA=({}).hasOwnProperty,ev=[],ez=ev.pop,fD=ev.push,fG=ev.push,eI=ev.slice,eS=ev.indexOf||function(fN){var i=0,fO=this.length;for(;i<fO;i++ ){if(this[i]===fN){return i;}
;}
;return -1;}
,fd=n,eK=V,fh=dS,fv=fh.replace(cT,F),fH=dm+eK+ed+fh+dd+eK+el+eK+p+fv+di+eK+cP,fg=dj+fh+dM+fH.replace(3,8)+r,fp=new RegExp(dc+eK+B+eK+K,cO),fx=new RegExp(dc+eK+cX+eK+z),eL=new RegExp(dc+eK+H+eK+dd+eK+z),fj=new RegExp(L+eK+dL+eK+cP,cO),fu=new RegExp(fg),eX=new RegExp(dc+fv+eg),fB={"ID":new RegExp(dX+fh+dd),"CLASS":new RegExp(ec+fh+dd),"TAG":new RegExp(dg+fh.replace(cT,dC)+dd),"ATTR":new RegExp(dc+fH),"PSEUDO":new RegExp(dc+fg),"CHILD":new RegExp(dT+eK+w+eK+X+eK+ds+eK+J,C),"bool":new RegExp(dI+fd+dw,C),"needsContext":new RegExp(dc+eK+en+eK+Y+eK+cQ,C)},fl=/^(?:input|select|textarea|button)$/i,et=/^h\d$/i,fz=/^[^{]+\{\s*\[native \w/,fF=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,fc=/[+~]/,fm=/'|\\/g,eu=new RegExp(D+eK+dB+eK+U,cH),fs=function(_,fP,fQ){var fR=cK+fP-0x10000;return fR!==fR||fQ?fP:fR<0?String.fromCharCode(fR+0x10000):String.fromCharCode(fR>>10|0xD800,fR&0x3FF|0xDC00);}
;try{fG.apply((ev=eI.call(eH.childNodes)),eH.childNodes);ev[eH.childNodes.length].nodeType;}
catch(e){fG={apply:ev.length?function(fT,fS){fD.apply(fT,eI.call(fS));}
:function(fV,fU){var j=fV.length,i=0;while((fV[j++ ]=fU[i++ ])){}
;fV.length=j-1;}
};}
;function fL(gg,fX,gb,gd){var gi,fY,m,fW,i,ge,gh,ga,gf,gc;if((fX?fX.ownerDocument||fX:eH)!==document){eD(fX);}
;fX=fX||document;gb=gb||[];if(!gg||typeof gg!==T){return gb;}
;if((fW=fX.nodeType)!==1&&fW!==9){return [];}
;if(fq&&!gd){if((gi=fF.exec(gg))){if((m=gi[1])){if(fW===9){fY=fX.getElementById(m);if(fY&&fY.parentNode){if(fY.id===m){gb.push(fY);return gb;}
;}
else {return gb;}
;}
else {if(fX.ownerDocument&&(fY=fX.ownerDocument.getElementById(m))&&eN(fX,fY)&&fY.id===m){gb.push(fY);return gb;}
;}
;}
else if(gi[2]){fG.apply(gb,fX.getElementsByTagName(gg));return gb;}
else if((m=gi[3])&&eM.getElementsByClassName&&fX.getElementsByClassName){fG.apply(gb,fX.getElementsByClassName(m));return gb;}
;}
;if(eM.qsa&&(!fe||!fe.test(gg))){ga=gh=fa;gf=fX;gc=fW===9&&gg;if(fW===1&&fX.nodeName.toLowerCase()!==dA){ge=eV(gg);if((gh=fX.getAttribute(N))){ga=gh.replace(fm,ef);}
else {fX.setAttribute(N,ga);}
;ga=dY+ga+f;i=ge.length;while(i-- ){ge[i]=ga+eQ(ge[i]);}
;gf=fc.test(gg)&&eC(fX.parentNode)||fX;gc=ge.join(ek);}
;if(gc){try{fG.apply(gb,gf.querySelectorAll(gc));return gb;}
catch(gj){}
finally{if(!gh){fX.removeAttribute(N);}
;}
;}
;}
;}
;return eG(gg.replace(fp,dN),fX,gb,gd);}
;function ey(){var gk=[];function gl(gm,gn){if(gk.push(gm+cV)>fM.cacheLength){delete gl[gk.shift()];}
;return (gl[gm+cV]=gn);}
;return gl;}
;function fy(go){go[fa]=true;return go;}
;function fk(gq){var gp=document.createElement(k);try{return !!gq(gp);}
catch(e){return false;}
finally{if(gp.parentNode){gp.parentNode.removeChild(gp);}
;gp=null;}
;}
;function fo(gt,gs){var gr=gt.split(dv),i=gt.length;while(i-- ){fM.attrHandle[gr[i]]=gs;}
;}
;function eY(a,b){var gv=b&&a,gu=gv&&a.nodeType===1&&b.nodeType===1&&(~b.sourceIndex||ft)-(~a.sourceIndex||ft);if(gu){return gu;}
;if(gv){while((gv=gv.nextSibling)){if(gv===b){return -1;}
;}
;}
;return a?1:-1;}
;function fE(gw){return function(gx){var name=gx.nodeName.toLowerCase();return name===l&&gx.type===gw;}
;}
;function er(gy){return function(gz){var name=gz.nodeName.toLowerCase();return (name===l||name===de)&&gz.type===gy;}
;}
;function fi(gA){return fy(function(gB){gB=+gB;return fy(function(gE,gC){var j,gD=gA([],gE.length,gB),i=gD.length;while(i-- ){if(gE[(j=gD[i])]){gE[j]=!(gC[j]=gE[j]);}
;}
;}
);}
);}
;function eC(gF){return gF&&typeof gF.getElementsByTagName!==eR&&gF;}
;eM=fL.support={};eB=fL.isXML=function(gG){var gH=gG&&(gG.ownerDocument||gG).documentElement;return gH?gH.nodeName!==eh:false;}
;eD=fL.setDocument=function(gI){var gK,gJ=gI?gI.ownerDocument||gI:eH,parent=gJ.defaultView;if(gJ===document||gJ.nodeType!==9||!gJ.documentElement){return document;}
;document=gJ;fK=gJ.documentElement;fq=!eB(gJ);if(parent&&parent!==parent.top){if(parent.addEventListener){parent.addEventListener(M,function(){eD();}
,false);}
else if(parent.attachEvent){parent.attachEvent(dk,function(){eD();}
);}
;}
;eM.attributes=fk(function(gL){gL.className=C;return !gL.getAttribute(dP);}
);eM.getElementsByTagName=fk(function(gM){gM.appendChild(gJ.createComment(eb));return !gM.getElementsByTagName(z).length;}
);eM.getElementsByClassName=fz.test(gJ.getElementsByClassName)&&fk(function(gN){gN.innerHTML=cU;gN.firstChild.className=C;return gN.getElementsByClassName(C).length===2;}
);eM.getById=fk(function(gO){fK.appendChild(gO).id=fa;return !gJ.getElementsByName||!gJ.getElementsByName(fa).length;}
);if(eM.getById){fM.find[ej]=function(gP,gQ){if(typeof gQ.getElementById!==eR&&fq){var m=gQ.getElementById(gP);return m&&m.parentNode?[m]:[];}
;}
;fM.filter[ej]=function(gS){var gR=gS.replace(eu,fs);return function(gT){return gT.getAttribute(N)===gR;}
;}
;}
else {delete fM.find[ej];fM.filter[ej]=function(gV){var gU=gV.replace(eu,fs);return function(gX){var gW=typeof gX.getAttributeNode!==eR&&gX.getAttributeNode(N);return gW&&gW.value===gU;}
;}
;}
;fM.find[dF]=eM.getElementsByTagName?function(gY,ha){if(typeof ha.getElementsByTagName!==eR){return ha.getElementsByTagName(gY);}
;}
:function(he,hf){var hc,hb=[],i=0,hd=hf.getElementsByTagName(he);if(he===z){while((hc=hd[i++ ])){if(hc.nodeType===1){hb.push(hc);}
;}
;return hb;}
;return hd;}
;fM.find[g]=eM.getElementsByClassName&&function(hg,hh){if(typeof hh.getElementsByClassName!==eR&&fq){return hh.getElementsByClassName(hg);}
;}
;eq=[];fe=[];if((eM.qsa=fz.test(gJ.querySelectorAll))){fk(function(hi){hi.innerHTML=da;if(hi.querySelectorAll(I).length){fe.push(dW+eK+dR);}
;if(!hi.querySelectorAll(cM).length){fe.push(dm+eK+t+fd+dd);}
;if(!hi.querySelectorAll(ee).length){fe.push(ee);}
;}
);fk(function(hk){var hj=gJ.createElement(l);hj.setAttribute(cN,cW);hk.appendChild(hj).setAttribute(dn,dp);if(hk.querySelectorAll(W).length){fe.push(dn+eK+eo);}
;if(!hk.querySelectorAll(dO).length){fe.push(dO,h);}
;hk.querySelectorAll(dV);fe.push(dU);}
);}
;if((eM.matchesSelector=fz.test((ff=fK.webkitMatchesSelector||fK.mozMatchesSelector||fK.oMatchesSelector||fK.msMatchesSelector)))){fk(function(hl){eM.disconnectedMatch=ff.call(hl,k);ff.call(hl,S);eq.push(dx,fg);}
);}
;fe=fe.length&&new RegExp(fe.join(dv));eq=eq.length&&new RegExp(eq.join(dv));gK=fz.test(fK.compareDocumentPosition);eN=gK||fz.test(fK.contains)?function(a,b){var hm=a.nodeType===9?a.documentElement:a,hn=b&&b.parentNode;return a===hn||!!(hn&&hn.nodeType===1&&(hm.contains?hm.contains(hn):a.compareDocumentPosition&&a.compareDocumentPosition(hn)&16));}
:function(a,b){if(b){while((b=b.parentNode)){if(b===a){return true;}
;}
;}
;return false;}
;eT=gK?function(a,b){if(a===b){eF=true;return 0;}
;var ho=!a.compareDocumentPosition-!b.compareDocumentPosition;if(ho){return ho;}
;ho=(a.ownerDocument||a)===(b.ownerDocument||b)?a.compareDocumentPosition(b):1;if(ho&1||(!eM.sortDetached&&b.compareDocumentPosition(a)===ho)){if(a===gJ||a.ownerDocument===eH&&eN(eH,a)){return -1;}
;if(b===gJ||b.ownerDocument===eH&&eN(eH,b)){return 1;}
;return eE?(eS.call(eE,a)-eS.call(eE,b)):0;}
;return ho&4?-1:1;}
:function(a,b){if(a===b){eF=true;return 0;}
;var hp,i=0,hq=a.parentNode,hr=b.parentNode,hs=[a],ht=[b];if(!hq||!hr){return a===gJ?-1:b===gJ?1:hq?-1:hr?1:eE?(eS.call(eE,a)-eS.call(eE,b)):0;}
else if(hq===hr){return eY(a,b);}
;hp=a;while((hp=hp.parentNode)){hs.unshift(hp);}
;hp=b;while((hp=hp.parentNode)){ht.unshift(hp);}
;while(hs[i]===ht[i]){i++ ;}
;return i?eY(hs[i],ht[i]):hs[i]===eH?-1:ht[i]===eH?1:0;}
;return gJ;}
;fL.matches=function(hu,hv){return fL(hu,null,null,hv);}
;fL.matchesSelector=function(hx,hw){if((hx.ownerDocument||hx)!==document){eD(hx);}
;hw=hw.replace(fj,E);if(eM.matchesSelector&&fq&&(!eq||!eq.test(hw))&&(!fe||!fe.test(hw))){try{var hy=ff.call(hx,hw);if(hy||eM.disconnectedMatch||hx.document&&hx.document.nodeType!==11){return hy;}
;}
catch(e){}
;}
;return fL(hw,document,null,[hx]).length>0;}
;fL.contains=function(hA,hz){if((hA.ownerDocument||hA)!==document){eD(hA);}
;return eN(hA,hz);}
;fL.attr=function(hC,name){if((hC.ownerDocument||hC)!==document){eD(hC);}
;var hB=fM.attrHandle[name.toLowerCase()],hD=hB&&fA.call(fM.attrHandle,name.toLowerCase())?hB(hC,name,!fq):undefined;return hD!==undefined?hD:eM.attributes||!fq?hC.getAttribute(name):(hD=hC.getAttributeNode(name))&&hD.specified?hD.value:null;}
;fL.error=function(hE){throw new Error(em+hE);}
;fL.uniqueSort=function(hG){var hH,hF=[],j=0,i=0;eF=!eM.detectDuplicates;eE=!eM.sortStable&&hG.slice(0);hG.sort(eT);if(eF){while((hH=hG[i++ ])){if(hH===hG[i]){j=hF.push(i);}
;}
;while(j-- ){hG.splice(hF[j],1);}
;}
;eE=null;return hG;}
;ew=fL.getText=function(hK){var hI,hL=eb,i=0,hJ=hK.nodeType;if(!hJ){while((hI=hK[i++ ])){hL+=ew(hI);}
;}
else if(hJ===1||hJ===9||hJ===11){if(typeof hK.textContent===T){return hK.textContent;}
else {for(hK=hK.firstChild;hK;hK=hK.nextSibling){hL+=ew(hK);}
;}
;}
else if(hJ===3||hJ===4){return hK.nodeValue;}
;return hL;}
;fM=fL.selectors={cacheLength:50,createPseudo:fy,match:fB,attrHandle:{},find:{},relative:{">":{dir:cI,first:true}," ":{dir:cI},"+":{dir:v,first:true},"~":{dir:v}},preFilter:{"ATTR":function(hM){hM[1]=hM[1].replace(eu,fs);hM[3]=(hM[4]||hM[5]||eb).replace(eu,fs);if(hM[2]===u){hM[3]=cV+hM[3]+cV;}
;return hM.slice(0,4);}
,"CHILD":function(hN){hN[1]=hN[1].toLowerCase();if(hN[1].slice(0,3)===o){if(!hN[3]){fL.error(hN[0]);}
;hN[4]=+(hN[4]?hN[5]+(hN[6]||1):2*(hN[3]===cY||hN[3]===dq));hN[5]=+((hN[7]+hN[8])||hN[3]===dq);}
else if(hN[3]){fL.error(hN[0]);}
;return hN;}
,"PSEUDO":function(hP){var hQ,hO=!hP[5]&&hP[2];if(fB[ea].test(hP[0])){return null;}
;if(hP[3]&&hP[4]!==undefined){hP[2]=hP[4];}
else if(hO&&fu.test(hO)&&(hQ=eV(hO,true))&&(hQ=hO.indexOf(dd,hO.length-hQ)-hO.length)){hP[0]=hP[0].slice(0,hQ);hP[2]=hO.slice(0,hQ);}
;return hP.slice(0,3);}
},filter:{"TAG":function(hR){var hS=hR.replace(eu,fs).toLowerCase();return hR===z?function(){return true;}
:function(hT){return hT.nodeName&&hT.nodeName.toLowerCase()===hS;}
;}
,"CLASS":function(hU){var hV=es[hU+cV];return hV||(hV=new RegExp(d+eK+dd+hU+cS+eK+dE))&&es(hU,function(hW){return hV.test(typeof hW.className===T&&hW.className||typeof hW.getAttribute!==eR&&hW.getAttribute(dr)||eb);}
);}
,"ATTR":function(name,hX,hY){return function(ia){var ib=fL.attr(ia,name);if(ib==null){return hX===dx;}
;if(!hX){return true;}
;ib+=eb;return hX===L?ib===hY:hX===dx?ib!==hY:hX===G?hY&&ib.indexOf(hY)===0:hX===du?hY&&ib.indexOf(hY)>-1:hX===R?hY&&ib.slice(-hY.length)===hY:hX===u?(cV+ib+cV).indexOf(hY)>-1:hX===dl?ib===hY||ib.slice(0,hY.length+1)===hY+c:false;}
;}
,"CHILD":function(ij,ic,ii,ik,ie){var ih=ij.slice(0,3)!==o,forward=ij.slice(-4)!==ei,ig=ic===dG;return ik===1&&ie===0?function(il){return !!il.parentNode;}
:function(ir,iu,im){var iq,iv,io,iw,ip,is,ix=ih!==forward?Q:v,parent=ir.parentNode,name=ig&&ir.nodeName.toLowerCase(),it=!im&&!ig;if(parent){if(ih){while(ix){io=ir;while((io=io[ix])){if(ig?io.nodeName.toLowerCase()===name:io.nodeType===1){return false;}
;}
;is=ix=ij===y&&!is&&Q;}
;return true;}
;is=[forward?parent.firstChild:parent.lastChild];if(forward&&it){iv=parent[fa]||(parent[fa]={});iq=iv[ij]||[];ip=iq[0]===eW&&iq[1];iw=iq[0]===eW&&iq[2];io=ip&&parent.childNodes[ip];while((io= ++ip&&io&&io[ix]||(iw=ip=0)||is.pop())){if(io.nodeType===1&& ++iw&&io===ir){iv[ij]=[eW,ip,iw];break;}
;}
;}
else if(it&&(iq=(ir[fa]||(ir[fa]={}))[ij])&&iq[0]===eW){iw=iq[1];}
else {while((io= ++ip&&io&&io[ix]||(iw=ip=0)||is.pop())){if((ig?io.nodeName.toLowerCase()===name:io.nodeType===1)&& ++iw){if(it){(io[fa]||(io[fa]={}))[ij]=[eW,iw];}
;if(io===ir){break;}
;}
;}
;}
;iw-=ie;return iw===ik||(iw%ik===0&&iw/ik>=0);}
;}
;}
,"PSEUDO":function(iz,iA){var iy,iB=fM.pseudos[iz]||fM.setFilters[iz.toLowerCase()]||fL.error(cR+iz);if(iB[fa]){return iB(iA);}
;if(iB.length>1){iy=[iz,iz,eb,iA];return fM.setFilters.hasOwnProperty(iz.toLowerCase())?fy(function(iD,iC){var iE,iF=iB(iD,iA),i=iF.length;while(i-- ){iE=eS.call(iD,iF[i]);iD[iE]=!(iC[iE]=iF[i]);}
;}
):function(iG){return iB(iG,0,iy);}
;}
;return iB;}
},pseudos:{"not":fy(function(iI){var iH=[],iJ=[],iK=fC(iI.replace(fp,dN));return iK[fa]?fy(function(iP,iM,iQ,iL){var iN,iO=iK(iP,null,iL,[]),i=iP.length;while(i-- ){if((iN=iO[i])){iP[i]=!(iM[i]=iN);}
;}
;}
):function(iS,iT,iR){iH[0]=iS;iK(iH,null,iR,iJ);return !iJ.pop();}
;}
),"has":fy(function(iU){return function(iV){return fL(iU,iV).length>0;}
;}
),"contains":fy(function(iW){return function(iX){return (iX.textContent||iX.innerText||ew(iX)).indexOf(iW)>-1;}
;}
),"lang":fy(function(iY){if(!eX.test(iY||eb)){fL.error(A+iY);}
;iY=iY.replace(eu,fs).toLowerCase();return function(jb){var ja;do {if((ja=fq?jb.lang:jb.getAttribute(x)||jb.getAttribute(dt))){ja=ja.toLowerCase();return ja===iY||ja.indexOf(iY+c)===0;}
;}
while((jb=jb.parentNode)&&jb.nodeType===1);return false;}
;}
),"target":function(jd){var jc=window.location&&window.location.hash;return jc&&jc.slice(1)===jd.id;}
,"root":function(je){return je===fK;}
,"focus":function(jf){return jf===document.activeElement&&(!document.hasFocus||document.hasFocus())&&!!(jf.type||jf.href||~jf.tabIndex);}
,"enabled":function(jg){return jg.disabled===false;}
,"disabled":function(jh){return jh.disabled===true;}
,"checked":function(ji){var jj=ji.nodeName.toLowerCase();return (jj===l&&!!ji.checked)||(jj===dh&&!!ji.selected);}
,"selected":function(jk){if(jk.parentNode){jk.parentNode.selectedIndex;}
;return jk.selected===true;}
,"empty":function(jl){for(jl=jl.firstChild;jl;jl=jl.nextSibling){if(jl.nodeType<6){return false;}
;}
;return true;}
,"parent":function(jm){return !fM.pseudos[dK](jm);}
,"header":function(jn){return et.test(jn.nodeName);}
,"input":function(jo){return fl.test(jo.nodeName);}
,"button":function(jp){var name=jp.nodeName.toLowerCase();return name===l&&jp.type===de||name===de;}
,"text":function(jq){var jr;return jq.nodeName.toLowerCase()===l&&jq.type===O&&((jr=jq.getAttribute(cN))==null||jr.toLowerCase()===O);}
,"first":fi(function(){return [0];}
),"last":fi(function(js,length){return [length-1];}
),"eq":fi(function(jt,length,ju){return [ju<0?ju+length:ju];}
),"even":fi(function(jv,length){var i=0;for(;i<length;i+=2){jv.push(i);}
;return jv;}
),"odd":fi(function(jw,length){var i=1;for(;i<length;i+=2){jw.push(i);}
;return jw;}
),"lt":fi(function(jx,length,jy){var i=jy<0?jy+length:jy;for(; --i>=0;){jx.push(i);}
;return jx;}
),"gt":fi(function(jz,length,jA){var i=jA<0?jA+length:jA;for(; ++i<length;){jz.push(i);}
;return jz;}
)}};fM.pseudos[o]=fM.pseudos[dQ];for(i in {radio:true,checkbox:true,file:true,password:true,image:true}){fM.pseudos[i]=fE(i);}
;for(i in {submit:true,reset:true}){fM.pseudos[i]=er(i);}
;function fJ(){}
;fJ.prototype=fM.filters=fM.pseudos;fM.setFilters=new fJ();function eV(jE,jD){var jK,jJ,jB,jI,jF,jH,jG,jC=fr[jE+cV];if(jC){return jD?0:jC.slice(0);}
;jF=jE;jH=[];jG=fM.preFilter;while(jF){if(!jK||(jJ=fx.exec(jF))){if(jJ){jF=jF.slice(jJ[0].length)||jF;}
;jH.push((jB=[]));}
;jK=false;if((jJ=eL.exec(jF))){jK=jJ.shift();jB.push({value:jK,type:jJ[0].replace(fp,cV)});jF=jF.slice(jK.length);}
;for(jI in fM.filter){if((jJ=fB[jI].exec(jF))&&(!jG[jI]||(jJ=jG[jI](jJ)))){jK=jJ.shift();jB.push({value:jK,type:jI,matches:jJ});jF=jF.slice(jK.length);}
;}
;if(!jK){break;}
;}
;return jD?jF.length:jF?fL.error(jE):fr(jE,jH).slice(0);}
;function eQ(jL){var i=0,jM=jL.length,jN=eb;for(;i<jM;i++ ){jN+=jL[i].value;}
;return jN;}
;function eO(jO,jP,jQ){var jR=jP.dir,jT=jQ&&jR===cI,jS=eA++ ;return jP.first?function(jV,jW,jU){while((jV=jV[jR])){if(jV.nodeType===1||jT){return jO(jV,jW,jU);}
;}
;}
:function(jY,kb,jX){var ka,kc,kd=[eW,jS];if(jX){while((jY=jY[jR])){if(jY.nodeType===1||jT){if(jO(jY,kb,jX)){return true;}
;}
;}
;}
else {while((jY=jY[jR])){if(jY.nodeType===1||jT){kc=jY[fa]||(jY[fa]={});if((ka=kc[jR])&&ka[0]===eW&&ka[1]===jS){return (kd[2]=ka[2]);}
else {kc[jR]=kd;if((kd[2]=jO(jY,kb,jX))){return true;}
;}
;}
;}
;}
;}
;}
;function eP(ke){return ke.length>1?function(kg,kh,kf){var i=ke.length;while(i-- ){if(!ke[i](kg,kh,kf)){return false;}
;}
;return true;}
:ke[0];}
;function fw(kl,ki,kj){var i=0,kk=ki.length;for(;i<kk;i++ ){fL(kl,ki[i],kj);}
;return kj;}
;function ex(kp,kn,kq,ks,km){var ko,ku=[],i=0,kr=kp.length,kt=kn!=null;for(;i<kr;i++ ){if((ko=kp[i])){if(!kq||kq(ko,ks,km)){ku.push(ko);if(kt){kn.push(i);}
;}
;}
;}
;return ku;}
;function eJ(kz,ky,kx,kw,kv,kA){if(kw&&!kw[fa]){kw=eJ(kw);}
;if(kv&&!kv[fa]){kv=eJ(kv,kA);}
;return fy(function(kJ,kE,kK,kB){var kC,i,kG,kI=[],kM=[],kD=kE.length,kL=kJ||fw(ky||z,kK.nodeType?[kK]:kK,[]),kF=kz&&(kJ||!ky)?ex(kL,kI,kz,kK,kB):kL,kH=kx?kv||(kJ?kz:kD||kw)?[]:kE:kF;if(kx){kx(kF,kH,kK,kB);}
;if(kw){kC=ex(kH,kM);kw(kC,[],kK,kB);i=kC.length;while(i-- ){if((kG=kC[i])){kH[kM[i]]=!(kF[kM[i]]=kG);}
;}
;}
;if(kJ){if(kv||kz){if(kv){kC=[];i=kH.length;while(i-- ){if((kG=kH[i])){kC.push((kF[i]=kG));}
;}
;kv(null,(kH=[]),kC,kB);}
;i=kH.length;while(i-- ){if((kG=kH[i])&&(kC=kv?eS.call(kJ,kG):kI[i])>-1){kJ[kC]=!(kE[kC]=kG);}
;}
;}
;}
else {kH=ex(kH===kE?kH.splice(kD,kH.length):kH);if(kv){kv(null,kE,kH,kB);}
else {fG.apply(kE,kH);}
;}
;}
);}
;function fb(kS){var kN,kP,j,kQ=kS.length,kO=fM.relative[kS[0].type],kV=kO||fM.relative[cV],i=kO?1:0,kU=eO(function(kW){return kW===kN;}
,kV,true),kR=eO(function(kX){return eS.call(kN,kX)>-1;}
,kV,true),kT=[function(la,lb,kY){return (!kO&&(kY||lb!==ep))||((kN=lb).nodeType?kU(la,lb,kY):kR(la,lb,kY));}
];for(;i<kQ;i++ ){if((kP=fM.relative[kS[i].type])){kT=[eO(eP(kT),kP)];}
else {kP=fM.filter[kS[i].type].apply(null,kS[i].matches);if(kP[fa]){j= ++i;for(;j<kQ;j++ ){if(fM.relative[kS[j].type]){break;}
;}
;return eJ(i>1&&eP(kT),i>1&&eQ(kS.slice(0,i-1).concat({value:kS[i-2].type===cV?z:eb})).replace(fp,dN),kP,i<j&&fb(kS.slice(i,j)),j<kQ&&fb((kS=kS.slice(j))),j<kQ&&eQ(kS));}
;kT.push(kP);}
;}
;return eP(kT);}
;function eU(lg,ld){var lc=ld.length>0,le=lg.length>0,lf=function(lp,ls,lh,ll,lk){var ln,j,lt,li=0,i=df,lm=lp&&[],lo=[],lj=ep,lu=lp||le&&fM.find[dF](z,lk),lq=(eW+=lj==null?1:Math.random()||0.1),lr=lu.length;if(lk){ep=ls!==document&&ls;}
;for(;i!==lr&&(ln=lu[i])!=null;i++ ){if(le&&ln){j=0;while((lt=lg[j++ ])){if(lt(ln,ls,lh)){ll.push(ln);break;}
;}
;if(lk){eW=lq;}
;}
;if(lc){if((ln=!lt&&ln)){li-- ;}
;if(lp){lm.push(ln);}
;}
;}
;li+=i;if(lc&&i!==li){j=0;while((lt=ld[j++ ])){lt(lm,lo,ls,lh);}
;if(lp){if(li>0){while(i-- ){if(!(lm[i]||lo[i])){lo[i]=ez.call(ll);}
;}
;}
;lo=ex(lo);}
;fG.apply(ll,lo);if(lk&&!lp&&lo.length>0&&(li+ld.length)>1){fL.uniqueSort(ll);}
;}
;if(lk){eW=lq;ep=lj;}
;return lm;}
;return lc?fy(lf):lf;}
;fC=fL.compile=function(lw,lz){var i,ly=[],lv=[],lx=fI[lw+cV];if(!lx){if(!lz){lz=eV(lw);}
;i=lz.length;while(i-- ){lx=fb(lz[i]);if(lx[fa]){ly.push(lx);}
else {lv.push(lx);}
;}
;lx=fI(lw,eU(lv,ly));lx.selector=lw;}
;return lx;}
;eG=fL.select=function(lC,lG,lB,lF){var i,lD,lE,lH,find,lA=typeof lC===db&&lC,lI=!lF&&eV((lC=lA.selector||lC));lB=lB||[];if(lI.length===1){lD=lI[0]=lI[0].slice(0);if(lD.length>2&&(lE=lD[0]).type===ej&&eM.getById&&lG.nodeType===9&&fq&&fM.relative[lD[1].type]){lG=(fM.find[ej](lE.matches[0].replace(eu,fs),lG)||[])[0];if(!lG){return lB;}
else if(lA){lG=lG.parentNode;}
;lC=lC.slice(lD.shift().value.length);}
;i=fB[P].test(lC)?0:lD.length;while(i-- ){lE=lD[i];if(fM.relative[(lH=lE.type)]){break;}
;if((find=fM.find[lH])){if((lF=find(lE.matches[0].replace(eu,fs),fc.test(lD[0].type)&&eC(lG.parentNode)||lG))){lD.splice(i,1);lC=lF.length&&eQ(lD);if(!lC){fG.apply(lB,lF);return lB;}
;break;}
;}
;}
;}
;(lA||fC(lC,lI))(lF,lG,!fq,lB,fc.test(lC)&&eC(lG.parentNode)||lG);return lB;}
;eM.sortStable=fa.split(eb).sort(eT).join(eb)===fa;eM.detectDuplicates=!!eF;eD();eM.sortDetached=fk(function(lJ){return lJ.compareDocumentPosition(document.createElement(k))&1;}
);if(!fk(function(lK){lK.innerHTML=dD;return lK.firstChild.getAttribute(cJ)===cL;}
)){fo(q,function(lL,name,lM){if(!lM){return lL.getAttribute(name,name.toLowerCase()===cN?1:2);}
;}
);}
;if(!eM.attributes||!fk(function(lN){lN.innerHTML=dy;lN.firstChild.setAttribute(dH,eb);return lN.firstChild.getAttribute(dH)===eb;}
)){fo(dH,function(lO,name,lP){if(!lP&&lO.nodeName.toLowerCase()===l){return lO.defaultValue;}
;}
);}
;if(!fk(function(lQ){return lQ.getAttribute(s)==null;}
)){fo(fd,function(lS,name,lR){var lT;if(!lR){return lS[name]===true?name.toLowerCase():(lT=lS.getAttributeNode(name))&&lT.specified?lT.value:null;}
;}
);}
;qx.bom.Selector.query=function(lV,lU){return fL(lV,lU);}
;qx.bom.Selector.matches=function(lX,lW){return fL(lX,null,null,lW);}
;}
)(window);}
)();
(function(){var a="display",b="",c="block",d="none",e="_getHeight",f="_getContentWidth",g="_getContentHeight",h="hidden",j="_getWidth",k="qx.module.Css",m="absolute";qx.Bootstrap.define(k,{statics:{_getHeight:function(p){var q=this[0];if(q){if(qx.dom.Node.isElement(q)){var n;if(p){var o={display:c,position:m,visibility:h};n=qx.module.Css.__fj(q,o,e,this);}
else {n=qx.bom.element.Dimension.getHeight(q);}
;return n;}
else if(qx.dom.Node.isDocument(q)){return qx.bom.Document.getHeight(qx.dom.Node.getWindow(q));}
else if(qx.dom.Node.isWindow(q)){return qx.bom.Viewport.getHeight(q);}
;}
;return null;}
,_getWidth:function(t){var u=this[0];if(u){if(qx.dom.Node.isElement(u)){var r;if(t){var s={display:c,position:m,visibility:h};r=qx.module.Css.__fj(u,s,j,this);}
else {r=qx.bom.element.Dimension.getWidth(u);}
;return r;}
else if(qx.dom.Node.isDocument(u)){return qx.bom.Document.getWidth(qx.dom.Node.getWindow(u));}
else if(qx.dom.Node.isWindow(u)){return qx.bom.Viewport.getWidth(u);}
;}
;return null;}
,_getContentHeight:function(w){var y=this[0];if(qx.dom.Node.isElement(y)){var x;if(w){var v={position:m,visibility:h,display:c};x=qx.module.Css.__fj(y,v,g,this);}
else {x=qx.bom.element.Dimension.getContentHeight(y);}
;return x;}
;return null;}
,_getContentWidth:function(B){var z=this[0];if(qx.dom.Node.isElement(z)){var C;if(B){var A={position:m,visibility:h,display:c};C=qx.module.Css.__fj(z,A,f,this);}
else {C=qx.bom.element.Dimension.getContentWidth(z);}
;return C;}
;return null;}
,__fh:{},__fi:function(G,D){var F=qx.module.Css.__fh;if(!F[G]){var H=D||document;var E=qxWeb(H.createElement(G)).appendTo(D.body);F[G]=E.getStyle(a);E.remove();}
;return F[G]||b;}
,__fj:function(L,I,J,O){var M={};for(var N in I){M[N]=L.style[N];L.style[N]=I[N];}
;var K=O[J]();for(var N in M){L.style[N]=M[N];}
;return K;}
,includeStylesheet:function(Q,P){qx.bom.Stylesheet.includeFile(Q,P);}
},members:{getHeight:function(R){return this._getHeight(R);}
,getWidth:function(S){return this._getWidth(S);}
,getContentHeight:function(T){return this._getContentHeight(T);}
,getContentWidth:function(U){return this._getContentWidth(U);}
,show:function(){this._forEachElementWrapped(function(X){var Y=X.getStyle(a);var W=X[0].$$qPrevDisp;var V;if(Y==d){if(W&&W!=d){V=W;}
else {var ba=qxWeb.getDocument(X[0]);V=qx.module.Css.__fi(X[0].tagName,ba);}
;X.setStyle(a,V);X[0].$$qPrevDisp=d;}
;}
);return this;}
,hide:function(){this._forEachElementWrapped(function(bb){var bc=bb.getStyle(a);if(bc!==d){bb[0].$$qPrevDisp=bc;bb.setStyle(a,d);}
;}
);return this;}
,getPosition:function(){var bd=this[0];if(qx.dom.Node.isElement(bd)){return qx.bom.element.Location.getPosition(bd);}
;return null;}
,getOffset:function(be){var bf=this[0];if(bf&&qx.dom.Node.isElement(bf)){return qx.bom.element.Location.get(bf,be);}
;return null;}
,setStyle:function(name,bg){if(/\w-\w/.test(name)){name=qx.lang.String.camelCase(name);}
;this._forEachElement(function(bh){qx.bom.element.Style.set(bh,name,bg);}
);return this;}
,getStyle:function(name){if(this[0]&&qx.dom.Node.isElement(this[0])){if(/\w-\w/.test(name)){name=qx.lang.String.camelCase(name);}
;return qx.bom.element.Style.get(this[0],name);}
;return null;}
,setStyles:function(bi){for(var name in bi){this.setStyle(name,bi[name]);}
;return this;}
,getStyles:function(bk){var bj={};for(var i=0;i<bk.length;i++ ){bj[bk[i]]=this.getStyle(bk[i]);}
;return bj;}
,addClass:function(name){this._forEachElement(function(bl){qx.bom.element.Class.add(bl,name);}
);return this;}
,addClasses:function(bm){this._forEachElement(function(bn){qx.bom.element.Class.addClasses(bn,bm);}
);return this;}
,removeClass:function(name){this._forEachElement(function(bo){qx.bom.element.Class.remove(bo,name);}
);return this;}
,removeClasses:function(bp){this._forEachElement(function(bq){qx.bom.element.Class.removeClasses(bq,bp);}
);return this;}
,hasClass:function(name){if(!this[0]||!qx.dom.Node.isElement(this[0])){return false;}
;return qx.bom.element.Class.has(this[0],name);}
,getClass:function(){if(!this[0]||!qx.dom.Node.isElement(this[0])){return b;}
;return qx.bom.element.Class.get(this[0]);}
,toggleClass:function(name){var br=qx.bom.element.Class;this._forEachElement(function(bs){br.has(bs,name)?br.remove(bs,name):br.add(bs,name);}
);return this;}
,toggleClasses:function(bt){for(var i=0,l=bt.length;i<l;i++ ){this.toggleClass(bt[i]);}
;return this;}
,replaceClass:function(bv,bu){this._forEachElement(function(bw){qx.bom.element.Class.replace(bw,bv,bu);}
);return this;}
},defer:function(bx){qxWeb.$attachAll(this);qxWeb.$attach({"_getWidth":bx._getWidth,"_getHeight":bx._getHeight,"_getContentHeight":bx._getContentHeight,"_getContentWidth":bx._getContentWidth});}
});}
)();
(function(){var a="borderBottomWidth",b="scroll",c="qx.bom.element.Location",d="gecko",e="paddingLeft",f="borderRightWidth",g="auto",h="static",i="borderTopWidth",j="borderLeftWidth",k="marginBottom",l="marginTop",m="overflowY",n="marginLeft",o="border-box",p="padding",q="paddingBottom",r="paddingTop",s="marginRight",t="browser.quirksmode",u="engine.name",v="position",w="margin",x="paddingRight",y="BODY",z="overflowX",A="border";qx.Bootstrap.define(c,{statics:{__fk:function(C,B){return qx.bom.element.Style.get(C,B,qx.bom.element.Style.COMPUTED_MODE,false);}
,__fl:function(E,D){return parseInt(qx.bom.element.Style.get(E,D,qx.bom.element.Style.COMPUTED_MODE,false),10)||0;}
,__fm:function(G){var H=0,top=0;var F=qx.dom.Node.getWindow(G);H-=qx.bom.Viewport.getScrollLeft(F);top-=qx.bom.Viewport.getScrollTop(F);return {left:H,top:top};}
,__fn:qx.core.Environment.select(u,{"mshtml":function(K){var J=qx.dom.Node.getDocument(K);var I=J.body;var L=0;var top=0;L-=I.clientLeft+J.documentElement.clientLeft;top-=I.clientTop+J.documentElement.clientTop;if(!qx.core.Environment.get(t)){L+=this.__fl(I,j);top+=this.__fl(I,i);}
;return {left:L,top:top};}
,"webkit":function(O){var N=qx.dom.Node.getDocument(O);var M=N.body;var P=M.offsetLeft;var top=M.offsetTop;return {left:P,top:top};}
,"gecko":function(R){var Q=qx.dom.Node.getDocument(R).body;var S=Q.offsetLeft;var top=Q.offsetTop;if(qx.bom.element.BoxSizing.get(Q)!==o){S+=this.__fl(Q,j);top+=this.__fl(Q,i);}
;return {left:S,top:top};}
,"default":function(U){var T=qx.dom.Node.getDocument(U).body;var V=T.offsetLeft;var top=T.offsetTop;return {left:V,top:top};}
}),__fo:function(W){var X=W.getBoundingClientRect();return {left:Math.round(X.left),top:Math.round(X.top)};}
,get:function(bd,be){if(bd.tagName==y){var location=this.__fp(bd);var bh=location.left;var top=location.top;}
else {var Y=this.__fn(bd);var bc=this.__fo(bd);var scroll=this.__fm(bd);var bh=bc.left+Y.left-scroll.left;var top=bc.top+Y.top-scroll.top;}
;var ba=bh+bd.offsetWidth;var bb=top+bd.offsetHeight;if(be){if(be==p||be==b){var bg=qx.bom.element.Style.get(bd,z);if(bg==b||bg==g){ba+=bd.scrollWidth-bd.offsetWidth+this.__fl(bd,j)+this.__fl(bd,f);}
;var bf=qx.bom.element.Style.get(bd,m);if(bf==b||bf==g){bb+=bd.scrollHeight-bd.offsetHeight+this.__fl(bd,i)+this.__fl(bd,a);}
;}
;switch(be){case p:bh+=this.__fl(bd,e);top+=this.__fl(bd,r);ba-=this.__fl(bd,x);bb-=this.__fl(bd,q);case b:bh-=bd.scrollLeft;top-=bd.scrollTop;ba-=bd.scrollLeft;bb-=bd.scrollTop;case A:bh+=this.__fl(bd,j);top+=this.__fl(bd,i);ba-=this.__fl(bd,f);bb-=this.__fl(bd,a);break;case w:bh-=this.__fl(bd,n);top-=this.__fl(bd,l);ba+=this.__fl(bd,s);bb+=this.__fl(bd,k);break;};}
;return {left:bh,top:top,right:ba,bottom:bb};}
,__fp:function(bi){var top=bi.offsetTop;var bj=bi.offsetLeft;top+=this.__fl(bi,l);bj+=this.__fl(bi,n);if(qx.core.Environment.get(u)===d){top+=this.__fl(bi,j);bj+=this.__fl(bi,i);}
;return {left:bj,top:top};}
,getLeft:function(bk,bl){return this.get(bk,bl).left;}
,getTop:function(bm,bn){return this.get(bm,bn).top;}
,getRight:function(bo,bp){return this.get(bo,bp).right;}
,getBottom:function(bq,br){return this.get(bq,br).bottom;}
,getRelative:function(bv,bu,bt,bs){var bx=this.get(bv,bt);var bw=this.get(bu,bs);return {left:bx.left-bw.left,top:bx.top-bw.top,right:bx.right-bw.right,bottom:bx.bottom-bw.bottom};}
,getPosition:function(by){return this.getRelative(by,this.getOffsetParent(by));}
,getOffsetParent:function(bB){var bA=bB.offsetParent||document.body;var bz=qx.bom.element.Style;while(bA&&(!/^body|html$/i.test(bA.tagName)&&bz.get(bA,v)===h)){bA=bA.offsetParent;}
;return bA;}
}});}
)();
(function(){var a='',b="g",c="(^|\\s)",d='function',e="(\\s|$)",f="",g="\\b|\\b",h="qx.bom.element.Class",j='SVGAnimatedString',k="html.classlist",m="default",n=" ",o='object',p="$2",q="native",r="\\b",s='undefined';qx.Bootstrap.define(h,{statics:{__fq:/\s+/g,__fr:/^\s+|\s+$/g,add:{"native":function(t,name){if(name.length>0){t.classList.add(name);}
;return name;}
,"default":function(u,name){if(!this.has(u,name)){u.className+=(u.className?n:f)+name;}
;return name;}
}[qx.core.Environment.get(k)?q:m],addClasses:{"native":function(w,v){for(var i=0;i<v.length;i++ ){if(v[i].length>0){w.classList.add(v[i]);}
;}
;return w.className;}
,"default":function(y,A){var z={};var B;var x=y.className;if(x){B=x.split(this.__fq);for(var i=0,l=B.length;i<l;i++ ){z[B[i]]=true;}
;for(var i=0,l=A.length;i<l;i++ ){if(!z[A[i]]){B.push(A[i]);}
;}
;}
else {B=A;}
;return y.className=B.join(n);}
}[qx.core.Environment.get(k)?q:m],get:function(D){var C=D.className;if(typeof C.split!==d){if(typeof C===o){if(qx.Bootstrap.getClass(C)==j){C=C.baseVal;}
else {{}
;C=a;}
;}
;if(typeof C===s){{}
;C=a;}
;}
;return C;}
,has:{"native":function(E,name){return E.classList.contains(name);}
,"default":function(G,name){var F=new RegExp(c+name+e);return F.test(G.className);}
}[qx.core.Environment.get(k)?q:m],remove:{"native":function(H,name){H.classList.remove(name);return name;}
,"default":function(J,name){var I=new RegExp(c+name+e);J.className=J.className.replace(I,p);return name;}
}[qx.core.Environment.get(k)?q:m],removeClasses:{"native":function(L,K){for(var i=0;i<K.length;i++ ){L.classList.remove(K[i]);}
;return L.className;}
,"default":function(O,M){var N=new RegExp(r+M.join(g)+r,b);return O.className=O.className.replace(N,f).replace(this.__fr,f).replace(this.__fq,n);}
}[qx.core.Environment.get(k)?q:m],replace:function(R,Q,P){if(!this.has(R,Q)){return f;}
;this.remove(R,Q);return this.add(R,P);}
,toggle:{"native":function(T,name,S){if(S===undefined){T.classList.toggle(name);}
else {S?this.add(T,name):this.remove(T,name);}
;return name;}
,"default":function(V,name,U){if(U==null){U=!this.has(V,name);}
;U?this.add(V,name):this.remove(V,name);return name;}
}[qx.core.Environment.get(k)?q:m]}});}
)();
(function(){var a="ipod",b="pc",c="ps3",d=")",e="device.type",f="psp",g="wii",h="xbox",i="\.",j="iemobile",k="ipad",l="ds",m="(",n="mobile",o="tablet",p="ontouchstart",q="g",r="iphone",s="|",t="qx.bom.client.Device",u="desktop",v="device.name",w="device.touch",x="undefined",y="device.pixelRatio";qx.Bootstrap.define(t,{statics:{__cv:{"Windows Phone":j,"iPod":a,"iPad":k,"iPhone":r,"PSP":f,"PLAYSTATION 3":c,"Nintendo Wii":g,"Nintendo DS":l,"XBOX":h,"Xbox":h},getName:function(){var B=[];for(var A in qx.bom.client.Device.__cv){B.push(A);}
;var C=new RegExp(m+B.join(s).replace(/\./g,i)+d,q);var z=C.exec(navigator.userAgent);if(z&&z[1]){return qx.bom.client.Device.__cv[z[1]];}
;return b;}
,getType:function(){return qx.bom.client.Device.detectDeviceType(navigator.userAgent);}
,detectDeviceType:function(D){if(qx.bom.client.Device.detectTabletDevice(D)){return o;}
else if(qx.bom.client.Device.detectMobileDevice(D)){return n;}
;return u;}
,detectMobileDevice:function(E){return /android.+mobile|ip(hone|od)|bada\/|blackberry|BB10|maemo|opera m(ob|in)i|fennec|NetFront|phone|psp|symbian|IEMobile|windows (ce|phone)|xda/i.test(E);}
,detectTabletDevice:function(G){var H=(/MSIE 10/i.test(G))&&(/ARM/i.test(G))&&!(/windows phone/i.test(G));var F=(!(/android.+mobile|Tablet PC/i.test(G))&&(/Android|ipad|tablet|playbook|silk|kindle|psp/i.test(G)));return H||F;}
,getDevicePixelRatio:function(){if(typeof window.devicePixelRatio!==x){return window.devicePixelRatio;}
;return 1;}
,getTouch:function(){return ((p in window)||window.navigator.maxTouchPoints>0||window.navigator.msMaxTouchPoints>0);}
},defer:function(I){qx.core.Environment.add(v,I.getName);qx.core.Environment.add(w,I.getTouch);qx.core.Environment.add(e,I.getType);qx.core.Environment.add(y,I.getDevicePixelRatio);}
});}
)();
(function(){var a="mshtml",b="function",c="event.mouseevent",d="pointerEnabled",e="onhashchange",f="event.help",g="mousewheel",h="event.customevent",j="event.mousewheel",k="event.touch",l="wheel",m="DOMMouseScroll",n="msPointerEnabled",o="event.hashchange",p="onhelp",q="documentMode",r="qx.bom.client.Event",s="ontouchstart",t="foo",u="event.mspointer",v="event.dispatchevent";qx.Bootstrap.define(r,{statics:{getTouch:function(){return (s in window);}
,getMsPointer:function(){if(d in window.navigator){return window.navigator.pointerEnabled;}
else if(n in window.navigator){return window.navigator.msPointerEnabled;}
;return false;}
,getHelp:function(){return (p in document);}
,getHashChange:function(){var w=qx.bom.client.Engine.getName();var x=e in window;return (w!==a&&x)||(w===a&&q in document&&document.documentMode>=8&&x);}
,getDispatchEvent:function(){return typeof document.dispatchEvent==b;}
,getCustomEvent:function(){if(!window.CustomEvent){return false;}
;try{new window.CustomEvent(t);return true;}
catch(y){return false;}
;}
,getMouseEvent:function(){if(!window.MouseEvent){return false;}
;try{new window.MouseEvent(t);return true;}
catch(z){return false;}
;}
,getMouseWheel:function(A){if(!A){A=window;}
;var D=[A,A.document,A.document.body];var C=A;var B=m;for(var i=0;i<D.length;i++ ){if(qx.bom.Event.supportsEvent(D[i],l)){B=l;C=D[i];break;}
;if(qx.bom.Event.supportsEvent(D[i],g)){B=g;C=D[i];break;}
;}
;return {type:B,target:C};}
},defer:function(E){qx.core.Environment.add(k,E.getTouch);qx.core.Environment.add(c,E.getMouseEvent);qx.core.Environment.add(v,E.getDispatchEvent);qx.core.Environment.add(h,E.getCustomEvent);qx.core.Environment.add(u,E.getMsPointer);qx.core.Environment.add(f,E.getHelp);qx.core.Environment.add(o,E.getHashChange);qx.core.Environment.add(j,E.getMouseWheel);}
});}
)();
(function(){var a="engine.name",b="event.mspointer",c="device.type",d="env",e="engine.version",f="qx.module.Environment",g="browser.version",h="event.touch",i="device.name",j="browser.quirksmode",k="browser.name",l="browser.documentmode";qx.Bootstrap.define(f,{statics:{get:function(m){return qx.core.Environment.get(m);}
,add:function(n,o){qx.core.Environment.add(n,o);return this;}
},defer:function(p){qx.core.Environment.get(k);qx.core.Environment.get(g);qx.core.Environment.get(j);qx.core.Environment.get(l);qx.core.Environment.get(a);qx.core.Environment.get(e);qx.core.Environment.get(i);qx.core.Environment.get(c);qx.core.Environment.get(h);qx.core.Environment.get(b);qxWeb.$attachAll(this,d);}
});}
)();
(function(){var a="qx.module.Polyfill";qx.Bootstrap.define(a,{});}
)();
(function(){var a="mshtml",b="engine.name",c="complete",d="Array",f="pointerout",g="pointerover",h="load",n="left",o="qx.module.Event",p="undefined",q="DOMContentLoaded",r="browser.documentmode",s="*";qx.Bootstrap.define(o,{statics:{__fs:{},__ft:{on:{},off:{}},__cX:false,ready:function(t){if(document.readyState===c){window.setTimeout(t,1);return;}
;var u=function(){qx.module.Event.__cX=true;t();}
;qxWeb(window).on(h,u);var v=function(){qxWeb(window).off(h,u);t();}
;if(qxWeb.env.get(b)!==a||qxWeb.env.get(r)>8){qx.bom.Event.addNativeListener(document,q,v);}
else {var w=function(){if(qx.module.Event.__cX){return;}
;try{document.documentElement.doScroll(n);if(document.body){v();}
;}
catch(z){window.setTimeout(w,100);}
;}
;w();}
;}
,$registerEventNormalization:function(D,A){if(!qx.lang.Type.isArray(D)){D=[D];}
;var B=qx.module.Event.__fs;for(var i=0,l=D.length;i<l;i++ ){var C=D[i];if(qx.lang.Type.isFunction(A)){if(!B[C]){B[C]=[];}
;B[C].push(A);}
;}
;}
,$unregisterEventNormalization:function(H,E){if(!qx.lang.Type.isArray(H)){H=[H];}
;var F=qx.module.Event.__fs;for(var i=0,l=H.length;i<l;i++ ){var G=H[i];if(F[G]){qx.lang.Array.remove(F[G],E);}
;}
;}
,$getEventNormalizationRegistry:function(){return qx.module.Event.__fs;}
,$registerEventHook:function(N,K,J){if(!qx.lang.Type.isArray(N)){N=[N];}
;var L=qx.module.Event.__ft.on;for(var i=0,l=N.length;i<l;i++ ){var M=N[i];if(qx.lang.Type.isFunction(K)){if(!L[M]){L[M]=[];}
;L[M].push(K);}
;}
;if(!J){return;}
;var I=qx.module.Event.__ft.off;for(var i=0,l=N.length;i<l;i++ ){var M=N[i];if(qx.lang.Type.isFunction(J)){if(!I[M]){I[M]=[];}
;I[M].push(J);}
;}
;}
,$unregisterEventHook:function(T,Q,P){if(!qx.lang.Type.isArray(T)){T=[T];}
;var R=qx.module.Event.__ft.on;for(var i=0,l=T.length;i<l;i++ ){var S=T[i];if(R[S]){qx.lang.Array.remove(R[S],Q);}
;}
;if(!P){return;}
;var O=qx.module.Event.__ft.off;for(var i=0,l=T.length;i<l;i++ ){var S=T[i];if(O[S]){qx.lang.Array.remove(O[S],P);}
;}
;}
,$getEventHookRegistry:function(){return qx.module.Event.__ft;}
},members:{on:function(bc,ba,bb,V){for(var i=0;i<this.length;i++ ){var U=this[i];var X=bb||qxWeb(U);var W=qx.module.Event.__ft.on;var bd=W[s]||[];if(W[bc]){bd=bd.concat(W[bc]);}
;for(var j=0,m=bd.length;j<m;j++ ){bd[j](U,bc,ba,bb);}
;var Y=function(be,event){var bg=qx.module.Event.__fs;var bf=bg[s]||[];if(bg[bc]){bf=bf.concat(bg[bc]);}
;for(var x=0,y=bf.length;x<y;x++ ){event=bf[x](event,be,bc);}
;ba.apply(this,[event]);}
.bind(X,U);Y.original=ba;qx.bom.Event.addNativeListener(U,bc,Y,V);if(!U.$$emitter){U.$$emitter=new qx.event.Emitter();}
;U.$$lastlistenerId=U.$$emitter.on(bc,Y,X);U.$$emitter.getEntryById(U.$$lastlistenerId).useCapture=!!V;if(!U.__fu){U.__fu={};}
;if(!U.__fu[bc]){U.__fu[bc]={};}
;U.__fu[bc][U.$$lastlistenerId]=Y;if(!bb){if(!U.__fv){U.__fv={};}
;U.__fv[U.$$lastlistenerId]=X;}
;}
;return this;}
,off:function(br,bj,bo,bi){var bn=(bj===null&&bo===null);for(var j=0;j<this.length;j++ ){var bh=this[j];if(!bh.__fu){continue;}
;var bt=[];if(br!==null){bt.push(br);}
else {for(var bl in bh.__fu){bt.push(bl);}
;}
;for(var i=0,l=bt.length;i<l;i++ ){for(var bm in bh.__fu[bt[i]]){var bq=bh.__fu[bt[i]][bm];if(bn||bq==bj||bq.original==bj){var bk=typeof bh.__fv!==p&&bh.__fv[bm];var bu;if(!bo&&bk){bu=bh.__fv[bm];}
;bh.$$emitter.off(bt[i],bq,bu||bo);if(bn||bq.original==bj){qx.bom.Event.removeNativeListener(bh,bt[i],bq,bi);}
;delete bh.__fu[bt[i]][bm];if(bk){delete bh.__fv[bm];}
;}
;}
;var bp=qx.module.Event.__ft.off;var bs=bp[s]||[];if(bp[br]){bs=bs.concat(bp[br]);}
;for(var k=0,m=bs.length;k<m;k++ ){bs[k](bh,br,bj,bo);}
;}
;}
;return this;}
,allOff:function(bv){return this.off(bv||null,null,null);}
,offById:function(bx){var bw=this[0].$$emitter.getEntryById(bx);return this.off(bw.name,bw.listener.original,bw.ctx,bw.useCapture);}
,emit:function(by,bz){for(var j=0;j<this.length;j++ ){var bA=this[j];if(bA.$$emitter){bA.$$emitter.emit(by,bz);}
;}
;return this;}
,once:function(bC,bB,bE){var self=this;var bD=function(bF){self.off(bC,bD,bE);bB.call(this,bF);}
;this.on(bC,bD,bE);return this;}
,hasListener:function(bJ,bH,bI){if(!this[0]||!this[0].$$emitter||!this[0].$$emitter.getListeners()[bJ]){return false;}
;if(bH){var bK=this[0].$$emitter.getListeners()[bJ];for(var i=0;i<bK.length;i++ ){var bG=false;if(bK[i].listener==bH){bG=true;}
;if(bK[i].listener.original&&bK[i].listener.original==bH){bG=true;}
;if(bG){if(bI!==undefined){if(bK[i].ctx===bI){return true;}
;}
else {return true;}
;}
;}
;return false;}
;return this[0].$$emitter.getListeners()[bJ].length>0;}
,copyEventsTo:function(bR){var bP=this.concat();var bQ=bR.concat();for(var i=bP.length-1;i>=0;i-- ){var bM=bP[i].getElementsByTagName(s);for(var j=0;j<bM.length;j++ ){bP.push(bM[j]);}
;}
;for(var i=bQ.length-1;i>=0;i-- ){var bM=bQ[i].getElementsByTagName(s);for(var j=0;j<bM.length;j++ ){bQ.push(bM[j]);}
;}
;bQ.forEach(function(bS){bS.$$emitter=null;}
);for(var i=0;i<bP.length;i++ ){var bL=bP[i];if(!bL.$$emitter){continue;}
;var bN=bL.$$emitter.getListeners();for(var name in bN){for(var j=bN[name].length-1;j>=0;j-- ){var bO=bN[name][j].listener;if(bO.original){bO=bO.original;}
;qxWeb(bQ[i]).on(name,bO,bN[name][j].ctx);}
;}
;}
;}
,hover:function(bT,bU){this.on(g,bT,this);if(qx.lang.Type.isFunction(bU)){this.on(f,bU,this);}
;return this;}
,onMatchTarget:function(bW,bX,ca,bY){bY=bY!==undefined?bY:this;var bV=function(e){var cb=qxWeb(e.getTarget());if(cb.is(bX)){ca.call(bY,cb,qxWeb.object.clone(e));}
;}
;this.forEach(function(cc){var cd={type:bW,listener:bV,callback:ca,context:bY};if(!cc.$$matchTargetInfo){cc.$$matchTargetInfo=[];}
;cc.$$matchTargetInfo.push(cd);}
);this.on(bW,bV);return this;}
,offMatchTarget:function(ce,cf,ch,cg){cg=cg!==undefined?cg:this;this.forEach(function(ci){if(ci.$$matchTargetInfo&&qxWeb.type.get(ci.$$matchTargetInfo)==d){var cj=ci.$$matchTargetInfo;for(var i=cj.length-1;i>=0;i-- ){var ck=cj[i];if(ck.type==ce&&ck.callback==ch&&ck.context==cg){this.off(ce,ck.listener);cj.splice(i,1);}
;}
;if(cj.length===0){ci.$$matchTargetInfo=null;}
;}
;}
,this);return this;}
},defer:function(cl){qxWeb.$attachAll(this);qxWeb.$attachStatic({"$registerEventNormalization":cl.$registerEventNormalization,"$unregisterEventNormalization":cl.$unregisterEventNormalization,"$getEventNormalizationRegistry":cl.$getEventNormalizationRegistry,"$registerEventHook":cl.$registerEventHook,"$unregisterEventHook":cl.$unregisterEventHook,"$getEventHookRegistry":cl.$getEventHookRegistry});}
});}
)();
(function(){var a="qx.module.event.PointerHandler",b="pointerup",c="event.dispatchevent",d="gesturemove",e="pointerover",f="gesturebegin",g="pointerdown",h="pointermove",i="gesturefinish",j="qx.event.handler.Pointer",k="gesturecancel",l="pointercancel",m="pointerout";qx.Bootstrap.define(a,{statics:{TYPES:[h,e,m,g,b,l,f,d,i,k],register:function(o,n){if(!o.$$pointerHandler){if(!qx.core.Environment.get(c)){if(!o.$$emitter){o.$$emitter=new qx.event.Emitter();}
;}
;o.$$pointerHandler=new qx.event.handler.PointerCore(o,o.$$emitter);}
;}
,unregister:function(r){if(r.$$pointerHandler){if(r.$$pointerHandler.classname===j){return;}
;var p=r.$$emitter.getListeners();for(var q in p){if(qx.module.event.PointerHandler.TYPES.indexOf(q)!==-1){if(p[q].length>0){return;}
;}
;}
;r.$$pointerHandler.dispose();r.$$pointerHandler=undefined;}
;}
},defer:function(s){qxWeb.$registerEventHook(s.TYPES,s.register,s.unregister);}
});}
)();
(function(){var a="qx.event.Emitter",b="*";qx.Bootstrap.define(a,{extend:Object,statics:{__fw:[]},members:{__fu:null,__fx:null,on:function(name,c,d){var e=qx.event.Emitter.__fw.length;this.__fy(name).push({listener:c,ctx:d,id:e,name:name});qx.event.Emitter.__fw.push({name:name,listener:c,ctx:d});return e;}
,once:function(name,f,g){var h=qx.event.Emitter.__fw.length;this.__fy(name).push({listener:f,ctx:g,once:true,id:h});qx.event.Emitter.__fw.push({name:name,listener:f,ctx:g});return h;}
,off:function(name,m,k){var l=this.__fy(name);for(var i=l.length-1;i>=0;i-- ){var n=l[i];if(n.listener==m&&n.ctx==k){l.splice(i,1);qx.event.Emitter.__fw[n.id]=null;return n.id;}
;}
;return null;}
,offById:function(p){var o=qx.event.Emitter.__fw[p];if(o){this.off(o.name,o.listener,o.ctx);}
;return null;}
,addListener:function(name,q,r){return this.on(name,q,r);}
,addListenerOnce:function(name,s,t){return this.once(name,s,t);}
,removeListener:function(name,u,v){this.off(name,u,v);}
,removeListenerById:function(w){this.offById(w);}
,emit:function(name,A){var x=this.__fy(name).concat();var y=[];for(var i=0;i<x.length;i++ ){var z=x[i];z.listener.call(z.ctx,A);if(z.once){y.push(z);}
;}
;y.forEach(function(B){var C=this.__fy(name);var D=C.indexOf(B);C.splice(D,1);}
.bind(this));x=this.__fy(b);for(var i=x.length-1;i>=0;i-- ){var z=x[i];z.listener.call(z.ctx,A);}
;}
,getListeners:function(){return this.__fu;}
,getEntryById:function(F){for(var name in this.__fu){var E=this.__fu[name];for(var i=0,j=E.length;i<j;i++ ){if(E[i].id===F){return E[i];}
;}
;}
;}
,__fy:function(name){if(this.__fu==null){this.__fu={};}
;if(this.__fu[name]==null){this.__fu[name]=[];}
;return this.__fu[name];}
}});}
)();
(function(){var a="touchmove",b="os.name",c="mousedown",d="event.dispatchevent",e="MSPointerDown",f="gesturemove",g="pointerover",h="touch",k="mouseout",m="ms",n="Processed",o="pointercancel",p="pointerleave",q="touchstart",r="pointerenter",s="mouse",t="event.mspointer",u="mousemove",v="MSPointerCancel",w="gesturefinish",z="browser.documentmode",A="pointerup",B="touchend",C="osx",D="mouseover",E="$$qx",F="pointerdown",G="MSPointerUp",H="pointermove",I="MSPointerOver",J="gecko",K="mshtml",L="engine.name",M="mouseup",N="touchcancel",O="contextmenu",P="gesturecancel",Q="MSPointerMove",R="MSPointerOut",S="gesturebegin",T="qx.event.handler.PointerCore",U=".",V="device.touch",W="pointerout";qx.Bootstrap.define(T,{extend:Object,statics:{MOUSE_TO_POINTER_MAPPING:{mousedown:F,mouseup:A,mousemove:H,mouseout:W,mouseover:g},TOUCH_TO_POINTER_MAPPING:{touchstart:F,touchend:A,touchmove:H,touchcancel:o},MSPOINTER_TO_POINTER_MAPPING:{MSPointerDown:F,MSPointerMove:H,MSPointerUp:A,MSPointerCancel:o,MSPointerLeave:p,MSPointerEnter:r,MSPointerOver:g,MSPointerOut:W},POINTER_TO_GESTURE_MAPPING:{pointerdown:S,pointerup:w,pointercancel:P,pointermove:f},LEFT_BUTTON:(qx.core.Environment.get(L)==K&&qx.core.Environment.get(z)<=8)?1:0,SIM_MOUSE_DISTANCE:25,SIM_MOUSE_DELAY:2500,__fz:null},construct:function(ba,bb){this.__fA=ba;this.__fB=bb;this.__fC=[];this.__fD=[];this.__fE=[];this._processedFlag=E+this.classname.substr(this.classname.lastIndexOf(U)+1)+n;var Y=qx.core.Environment.get(L);var X=parseInt(qx.core.Environment.get(z),10);if(Y==K&&X==10){this.__fC=[e,Q,G,v,I,R,F,H,A,o,g,W];this._initPointerObserver();}
else {if(qx.core.Environment.get(t)){this.__fF=true;}
;this.__fC=[F,H,A,o,g,W];this._initPointerObserver();}
;if(!qx.core.Environment.get(t)){if(qx.core.Environment.get(V)){this.__fC=[q,B,a,N];this._initObserver(this._onTouchEvent);}
;this.__fC=[c,M,u,D,k,O];this._initObserver(this._onMouseEvent);}
;}
,members:{__fA:null,__fB:null,__fC:null,__fF:false,__fG:null,__fH:0,__fD:null,__fI:null,__fE:null,_processedFlag:null,_initPointerObserver:function(){this._initObserver(this._onPointerEvent);}
,_initObserver:function(bc,bd){this.__fG=qx.lang.Function.listener(bc,this);this.__fC.forEach(function(be){if(bd&&qx.dom.Node.isDocument(this.__fA)){if(!this.__fA.$$emitter){this.__fA.$$emitter=new qx.event.Emitter();}
;this.__fA.$$emitter.on(be,this.__fG);}
else {qx.bom.Event.addNativeListener(this.__fA,be,this.__fG);}
;}
.bind(this));}
,_onPointerEvent:function(bh){if(!qx.core.Environment.get(t)||(qx.core.Environment.get(z)===10&&bh.type.toLowerCase().indexOf(m)==-1)){return;}
;if(!this.__fF){bh.stopPropagation();}
;var bf=qx.event.handler.PointerCore.MSPOINTER_TO_POINTER_MAPPING[bh.type]||bh.type;var bi=qx.bom.Event.getTarget(bh);var bg=new qx.event.type.dom.Pointer(bf,bh);this._fireEvent(bg,bf,bi);}
,_onTouchEvent:function(bl){if(bl[this._processedFlag]){return;}
;bl[this._processedFlag]=true;var bm=qx.event.handler.PointerCore.TOUCH_TO_POINTER_MAPPING[bl.type];var bo=bl.changedTouches;this._determineActiveTouches(bl.type,bo);if(bl.touches.length<this.__fE.length){for(var i=this.__fE.length-1;i>=0;i-- ){var bq=new qx.event.type.dom.Pointer(o,bl,{identifier:this.__fE[i].identifier,target:bl.target,pointerType:h,pointerId:this.__fE[i].identifier+2});this._fireEvent(bq,o,bl.target);}
;this.__fI=null;this.__fE=[];return;}
;if(bl.type==q&&this.__fI===null){this.__fI=bo[0].identifier;}
;for(var i=0,l=bo.length;i<l;i++ ){var bp=bo[i];var bn=bl.view.document.elementFromPoint(bp.clientX,bp.clientY)||bl.target;var bk={clientX:bp.clientX,clientY:bp.clientY,pageX:bp.pageX,pageY:bp.pageY,identifier:bp.identifier,screenX:bp.screenX,screenY:bp.screenY,target:bn,pointerType:h,pointerId:bp.identifier+2};if(bl.type==q){var bj=new qx.event.type.dom.Pointer(g,bl,bk);this._fireEvent(bj,g,bk.target);}
;if(bp.identifier==this.__fI){bk.isPrimary=true;bk.button=0;bk.buttons=1;qx.event.handler.PointerCore.__fz={"x":bp.clientX,"y":bp.clientY,"time":new Date().getTime()};}
;var br=new qx.event.type.dom.Pointer(bm,bl,bk);this._fireEvent(br,bm,bk.target);if(bl.type==B||bl.type==N){var bs=new qx.event.type.dom.Pointer(W,bl,bk);this._fireEvent(bs,W,bl.target);if(this.__fI==bp.identifier){this.__fI=null;}
;}
;}
;}
,_onMouseEvent:function(bt){if(bt[this._processedFlag]){return;}
;bt[this._processedFlag]=true;if(this._isSimulatedMouseEvent(bt.clientX,bt.clientY)){return;}
;if(bt.type==c){this.__fD[bt.which]=1;}
else if(bt.type==M){if(qx.core.Environment.get(b)==C&&qx.core.Environment.get(L)==J){if(this.__fD[bt.which]!=1&&bt.ctrlKey){this.__fD[1]=0;}
;}
;this.__fD[bt.which]=0;}
;var bv=qx.event.handler.PointerCore.MOUSE_TO_POINTER_MAPPING[bt.type];var bu=qx.bom.Event.getTarget(bt);var bw=qx.lang.Array.sum(this.__fD);var bz={pointerType:s,pointerId:1};if(this.__fH!=bw&&bw!==0&&this.__fH!==0){var bx=new qx.event.type.dom.Pointer(H,bt,bz);this._fireEvent(bx,H,bu);}
;this.__fH=bw;if(bt.type==c&&bw>1){return;}
;if(bt.type==M&&bw>0){return;}
;if(bt.type==O){this.__fD[bt.which]=0;return;}
;var by=new qx.event.type.dom.Pointer(bv,bt,bz);this._fireEvent(by,bv,bu);}
,_determineActiveTouches:function(bD,bC){if(bD==q){for(var i=0;i<bC.length;i++ ){this.__fE.push(bC[i]);}
;}
else if(bD==B||bD==N){var bA=[];for(var i=0;i<this.__fE.length;i++ ){var bB=true;for(var j=0;j<bC.length;j++ ){if(this.__fE[i].identifier==bC[j].identifier){bB=false;break;}
;}
;if(bB){bA.push(this.__fE[i]);}
;}
;this.__fE=bA;}
;}
,_isSimulatedMouseEvent:function(x,y){var bF=qx.event.handler.PointerCore.__fz;if(bF){var bG=new Date().getTime()-bF.time;var bE=qx.event.handler.PointerCore.SIM_MOUSE_DISTANCE;var bI=Math.abs(x-qx.event.handler.PointerCore.__fz.x);var bH=Math.abs(y-qx.event.handler.PointerCore.__fz.y);if(bG<qx.event.handler.PointerCore.SIM_MOUSE_DELAY){if(bI<bE||bH<bE){return true;}
;}
;}
;return false;}
,_stopObserver:function(){for(var i=0;i<this.__fC.length;i++ ){qx.bom.Event.removeNativeListener(this.__fA,this.__fC[i],this.__fG);}
;}
,_fireEvent:function(bK,bJ,bL){bL=bL||bK.target;bJ=bJ||bK.type;var bM;if((bK.pointerType!==s||bK.button<=qx.event.handler.PointerCore.LEFT_BUTTON)&&(bJ==F||bJ==A||bJ==H)){bM=new qx.event.type.dom.Pointer(qx.event.handler.PointerCore.POINTER_TO_GESTURE_MAPPING[bJ],bK);qx.event.type.dom.Pointer.normalize(bM);bM.srcElement=bL;}
;if(qx.core.Environment.get(d)){if(!this.__fF){bL.dispatchEvent(bK);}
;if(bM){bL.dispatchEvent(bM);}
;}
else {bK.srcElement=bL;while(bL){if(bL.$$emitter){bK.currentTarget=bL;if(!bK._stopped){bL.$$emitter.emit(bJ,bK);}
;if(bM&&!bM._stopped){bM.currentTarget=bL;bL.$$emitter.emit(bM.type,bM);}
;}
;bL=bL.parentNode;}
;}
;}
,dispose:function(){this._stopObserver();this.__fA=this.__fB=null;}
}});}
)();
(function(){var a="qx.event.type.dom.Custom",b="UIEvents",c="function",d="event.customevent",e="object";qx.Bootstrap.define(a,{extend:Object,statics:{PROPERTIES:{bubbles:false,cancelable:true}},construct:function(f,g,h){this._type=f;this._event=this._createEvent();this._initEvent(g,h);this._event._original=g;this._event.preventDefault=function(){if(this._original.preventDefault){this._original.preventDefault();}
else {try{this._original.returnValue=false;}
catch(i){}
;}
;}
;if(this._event.stopPropagation){this._event._nativeStopPropagation=this._event.stopPropagation;}
;this._event.stopPropagation=function(){this._stopped=true;if(this._nativeStopPropagation){this._original.stopPropagation();this._nativeStopPropagation();}
else {this._original.cancelBubble=true;}
;}
;return this._event;}
,members:{_type:null,_event:null,_createEvent:function(){var j;if(qx.core.Environment.get(d)){j=new window.CustomEvent(this._type);}
else if(typeof document.createEvent==c){j=document.createEvent(b);}
else if(typeof document.createEventObject==e){j={};j.type=this._type;}
;return j;}
,_initEvent:function(k,m){m=m||{};var l=qx.lang.Object.clone(qx.event.type.dom.Custom.PROPERTIES);for(var n in m){l[n]=m[n];}
;if(this._event.initEvent){this._event.initEvent(this._type,l.bubbles,l.cancelable);}
;for(var n in l){this._event[n]=l[n];}
;}
}});}
)();
(function(){var a="bubbles",b="event.mouseevent",c="getScreenLeft",d="getPointerType",e="touch",f="ctrlKey",g="altKey",h="gecko",j="view",k="os.name",m="button",n="string",o="relatedTarget",p="buttons",q="mouse",r="clientX",s="qx.event.type.dom.Pointer",t="UIEvents",u="ios",v="pageY",w="cancelable",x="screenX",y="shiftKey",z="",A="number",B="detail",C="toElement",D="fromElement",E="getViewportLeft",F="function",G="clientY",H="os.version",I="engine.name",J="undefined",K="getViewportTop",L="screenY",M="getScreenTop",N="pen",O="metaKey",P="pageX",Q="object",R="getDocumentTop",S="which",T="getDocumentLeft";qx.Bootstrap.define(s,{extend:qx.event.type.dom.Custom,statics:{MOUSE_PROPERTIES:[a,w,j,B,x,L,r,G,P,v,f,g,y,O,m,S,o,D,C],POINTER_PROPERTIES:{pointerId:1,width:0,height:0,pressure:0.5,tiltX:0,tiltY:0,pointerType:z,isPrimary:false},READONLY_PROPERTIES:[],BIND_METHODS:[d,E,K,T,R,c,M],getPointerType:function(){if(typeof this.pointerType==n){return this.pointerType;}
;if(typeof this.pointerType==A){if(this.pointerType==this.MSPOINTER_TYPE_MOUSE){return q;}
;if(this.pointerType==this.MSPOINTER_TYPE_PEN){return N;}
;if(this.pointerType==this.MSPOINTER_TYPE_TOUCH){return e;}
;}
;return z;}
,getViewportLeft:function(){return this.clientX;}
,getViewportTop:function(){return this.clientY;}
,getDocumentLeft:function(){if(this.pageX!==undefined){return this.pageX;}
else {var U=qx.dom.Node.getWindow(this.srcElement);return this.clientX+qx.bom.Viewport.getScrollLeft(U);}
;}
,getDocumentTop:function(){if(this.pageY!==undefined){return this.pageY;}
else {var V=qx.dom.Node.getWindow(this.srcElement);return this.clientY+qx.bom.Viewport.getScrollTop(V);}
;}
,getScreenLeft:function(){return this.screenX;}
,getScreenTop:function(){return this.screenY;}
,normalize:function(event){var W=qx.event.type.dom.Pointer.BIND_METHODS;for(var i=0,l=W.length;i<l;i++ ){if(typeof event[W[i]]!=F){event[W[i]]=qx.event.type.dom.Pointer[W[i]].bind(event);}
;}
;}
},construct:function(X,Y,ba){return qx.event.type.dom.Custom.call(this,X,Y,ba);}
,members:{_createEvent:function(){var bb;if(qx.core.Environment.get(b)){bb=new window.MouseEvent(this._type);}
else if(typeof document.createEvent==F){bb=document.createEvent(t);}
else if(typeof document.createEventObject==Q){bb={};bb.type=this._type;}
;return bb;}
,_initEvent:function(bc,bd){bd=bd||{};var bg=this._event;var bh={};qx.event.type.dom.Pointer.normalize(bc);Object.keys(qx.event.type.dom.Pointer.POINTER_PROPERTIES).concat(qx.event.type.dom.Pointer.MOUSE_PROPERTIES).forEach(function(bi){if(typeof bd[bi]!==J){bh[bi]=bd[bi];}
else if(typeof bc[bi]!==J){bh[bi]=bc[bi];}
else if(typeof qx.event.type.dom.Pointer.POINTER_PROPERTIES[bi]!==J){bh[bi]=qx.event.type.dom.Pointer.POINTER_PROPERTIES[bi];}
;}
);var bf;switch(bc.which){case 1:bf=1;break;case 2:bf=4;break;case 3:bf=2;break;default:bf=0;};if(bf!==undefined){bh.buttons=bf;bh.pressure=bf?0.5:0;}
;if(bg.initMouseEvent){bg.initMouseEvent(this._type,bh.bubbles,bh.cancelable,bh.view,bh.detail,bh.screenX,bh.screenY,bh.clientX,bh.clientY,bh.ctrlKey,bh.altKey,bh.shiftKey,bh.metaKey,bh.button,bh.relatedTarget);}
else if(bg.initUIEvent){bg.initUIEvent(this._type,bh.bubbles,bh.cancelable,bh.view,bh.detail);}
;for(var be in bh){if(bg[be]!==bh[be]&&qx.event.type.dom.Pointer.READONLY_PROPERTIES.indexOf(be)===-1){bg[be]=bh[be];}
;}
;switch(bg.pointerType){case bc.MSPOINTER_TYPE_MOUSE:bg.pointerType=q;break;case bc.MSPOINTER_TYPE_PEN:bg.pointerType=N;break;case bc.MSPOINTER_TYPE_TOUCH:bg.pointerType=e;break;};if(bg.pointerType==q){bg.isPrimary=true;}
;}
},defer:function(bj){if(qx.core.Environment.get(I)==h){bj.READONLY_PROPERTIES.push(p);}
else if(qx.core.Environment.get(k)==u&&parseFloat(qx.core.Environment.get(H))>=8){bj.READONLY_PROPERTIES=bj.READONLY_PROPERTIES.concat(bj.MOUSE_PROPERTIES);}
;}
});}
)();
(function(){var a="start",b="animationEnd",c="",d="none",e="browser.name",f="browser.version",g="qx.module.Animation",h="animationIteration",j="end",k="animationStart",l="ease-in",m="iteration",n="ease-out",o="ie",p="display";qx.Bootstrap.define(g,{events:{"animationStart":undefined,"animationIteration":undefined,"animationEnd":undefined},statics:{_fadeOut:{duration:700,timing:n,keep:100,keyFrames:{'0':{opacity:1},'100':{opacity:0,display:d}}},_fadeIn:{duration:700,timing:l,keep:100,keyFrames:{'0':{opacity:0},'100':{opacity:1}}},_animate:function(s,q,r){this._forEachElement(function(t,i){if(t.$$animation){t.$$animation.stop();}
;var u;if(r){u=qx.bom.element.Animation.animateReverse(t,s,q);}
else {u=qx.bom.element.Animation.animate(t,s,q);}
;var self=this;if(i==0){u.on(a,function(){self.emit(k);}
,u);u.on(m,function(){self.emit(h);}
,u);}
;u.on(j,function(){for(var i=0;i<self.length;i++ ){if(self[i].$$animation){return;}
;}
;self.emit(b);}
,t);}
);}
},members:{getAnimationHandles:function(){var v=[];for(var i=0;i<this.length;i++ ){v[i]=this[i].$$animation;}
;return v;}
,animate:function(x,w){qx.module.Animation._animate.bind(this)(x,w,false);return this;}
,animateReverse:function(z,y){qx.module.Animation._animate.bind(this)(z,y,true);return this;}
,play:function(){for(var i=0;i<this.length;i++ ){var A=this[i].$$animation;if(A){A.play();}
;}
;return this;}
,pause:function(){for(var i=0;i<this.length;i++ ){var B=this[i].$$animation;if(B){B.pause();}
;}
;return this;}
,stop:function(){for(var i=0;i<this.length;i++ ){var C=this[i].$$animation;if(C){C.stop();}
;}
;return this;}
,isPlaying:function(){for(var i=0;i<this.length;i++ ){var D=this[i].$$animation;if(D&&D.isPlaying()){return true;}
;}
;return false;}
,isEnded:function(){for(var i=0;i<this.length;i++ ){var E=this[i].$$animation;if(E&&!E.isEnded()){return false;}
;}
;return true;}
,fadeIn:function(F){this.setStyle(p,c);return this.animate(qx.module.Animation._fadeIn,F);}
,fadeOut:function(G){return this.animate(qx.module.Animation._fadeOut,G);}
},defer:function(H){qxWeb.$attachAll(this);if(qxWeb.env.get(e)===o&&qxWeb.env.get(f)<=9){H._fadeIn.keyFrames[100].opacity=0.99;}
;}
});}
)();
(function(){var a="css.animation",b="translate",c="rotate",d="skew",e="scale",f="qx.bom.element.Animation";qx.Bootstrap.define(f,{statics:{animate:function(h,k,g){var j=qx.bom.element.Animation.__fJ(h,k.keyFrames);if(qx.core.Environment.get(a)&&j){return qx.bom.element.AnimationCss.animate(h,k,g);}
else {return qx.bom.element.AnimationJs.animate(h,k,g);}
;}
,animateReverse:function(m,o,l){var n=qx.bom.element.Animation.__fJ(m,o.keyFrames);if(qx.core.Environment.get(a)&&n){return qx.bom.element.AnimationCss.animateReverse(m,o,l);}
else {return qx.bom.element.AnimationJs.animateReverse(m,o,l);}
;}
,__fJ:function(p,t){var r=[];for(var v in t){var s=t[v];for(var u in s){if(r.indexOf(u)==-1){r.push(u);}
;}
;}
;var q=[e,c,d,b];for(var i=0;i<r.length;i++ ){var u=qx.lang.String.camelCase(r[i]);if(!(u in p.style)){if(q.indexOf(r[i])!=-1){continue;}
;if(qx.bom.Style.getPropertyName(u)){continue;}
;return false;}
;}
;return true;}
}});}
)();
(function(){var a="oAnimationStart",b="animationend",c="MSAnimationStart",d="oRequestAnimationFrame",f="AnimationFillMode",g="webkitAnimationStart",h="MSAnimationEnd",j="requestAnimationFrame",k="mozRequestAnimationFrame",l="webkitanimationend",m="css.animation.requestframe",n="AnimationPlayState",o="",p="MSAnimationIteration",q="animation",r="oAnimationEnd",s="@",t="animationiteration",u="webkitAnimationEnd",v="webkitRequestAnimationFrame",w=" name",x="qx.bom.client.CssAnimation",y="css.animation",z="oAnimationIteration",A="webkitanimationiteration",B="-keyframes",C="msRequestAnimationFrame",D="@keyframes",E="webkitAnimationIteration",F="animationstart",G="webkitanimationstart";qx.Bootstrap.define(x,{statics:{getSupport:function(){var name=qx.bom.client.CssAnimation.getName();if(name!=null){return {"name":name,"play-state":qx.bom.client.CssAnimation.getPlayState(),"start-event":qx.bom.client.CssAnimation.getAnimationStart(),"iteration-event":qx.bom.client.CssAnimation.getAnimationIteration(),"end-event":qx.bom.client.CssAnimation.getAnimationEnd(),"fill-mode":qx.bom.client.CssAnimation.getFillMode(),"keyframes":qx.bom.client.CssAnimation.getKeyFrames()};}
;return null;}
,getFillMode:function(){return qx.bom.Style.getPropertyName(f);}
,getPlayState:function(){return qx.bom.Style.getPropertyName(n);}
,getName:function(){return qx.bom.Style.getPropertyName(q);}
,getAnimationStart:function(){if(qx.bom.Event.supportsEvent(window,G)){return g;}
;var H={"msAnimation":c,"WebkitAnimation":g,"MozAnimation":F,"OAnimation":a,"animation":F};return H[this.getName()];}
,getAnimationIteration:function(){if(qx.bom.Event.supportsEvent(window,A)){return E;}
;var I={"msAnimation":p,"WebkitAnimation":E,"MozAnimation":t,"OAnimation":z,"animation":t};return I[this.getName()];}
,getAnimationEnd:function(){if(qx.bom.Event.supportsEvent(window,l)){return u;}
;var J={"msAnimation":h,"WebkitAnimation":u,"MozAnimation":b,"OAnimation":r,"animation":b};return J[this.getName()];}
,getKeyFrames:function(){var K=qx.bom.Style.VENDOR_PREFIXES;var N=[];for(var i=0;i<K.length;i++ ){var M=s+qx.bom.Style.getCssName(K[i])+B;N.push(M);}
;N.unshift(D);var L=qx.bom.Stylesheet.createElement();for(var i=0;i<N.length;i++ ){try{qx.bom.Stylesheet.addRule(L,N[i]+w,o);return N[i];}
catch(e){}
;}
;return null;}
,getRequestAnimationFrame:function(){var O=[j,C,v,k,d];for(var i=0;i<O.length;i++ ){if(window[O[i]]!=undefined){return O[i];}
;}
;return null;}
},defer:function(P){qx.core.Environment.add(y,P.getSupport);qx.core.Environment.add(m,P.getRequestAnimationFrame);}
});}
)();
(function(){var a="fill-mode",b="os.name",c="repeat",d="os.version",f="timing",g="start",h="end",i="Anni",j="alternate",k="keep",l="visibilitychange",m=":",n="ios",o="} ",p="name",q="iteration-event",r="",s="origin",t="forwards",u="start-event",v="iteration",w="end-event",x="css.animation",y="ms ",z="% {",A=" ",B="linear",C=";",D="qx.bom.element.AnimationCss",E="keyframes";qx.Bootstrap.define(D,{statics:{__dn:null,__fK:i,__cl:0,__dk:{},__fL:{"scale":true,"rotate":true,"skew":true,"translate":true},__fM:qx.core.Environment.get(x),animateReverse:function(G,H,F){return this._animate(G,H,F,true);}
,animate:function(J,K,I){return this._animate(J,K,I,false);}
,_animate:function(L,S,R,N){this.__fR(S);{}
;var P=S.keep;if(P!=null&&(N||(S.alternate&&S.repeat%2==0))){P=100-P;}
;if(!this.__dn){this.__dn=qx.bom.Stylesheet.createElement();}
;var O=S.keyFrames;if(R==undefined){R=S.duration;}
;if(this.__fM!=null){var name=this.__fT(O,N);var M=name+A+R+y+S.timing+A+(S.delay?S.delay+y:r)+S.repeat+A+(S.alternate?j:r);qx.bom.Event.addNativeListener(L,this.__fM[u],this.__fN);qx.bom.Event.addNativeListener(L,this.__fM[q],this.__fO);qx.bom.Event.addNativeListener(L,this.__fM[w],this.__fP);{}
;L.style[qx.lang.String.camelCase(this.__fM[p])]=M;if(P&&P==100&&this.__fM[a]){L.style[this.__fM[a]]=t;}
;}
;var Q=new qx.bom.element.AnimationHandle();Q.desc=S;Q.el=L;Q.keep=P;L.$$animation=Q;if(S.origin!=null){qx.bom.element.Transform.setOrigin(L,S.origin);}
;if(this.__fM==null){window.setTimeout(function(){qx.bom.element.AnimationCss.__fP({target:L});}
,0);}
;return Q;}
,__fN:function(e){if(e.target.$$animation){e.target.$$animation.emit(g,e.target);}
;}
,__fO:function(e){if(e.target!=null&&e.target.$$animation!=null){e.target.$$animation.emit(v,e.target);}
;}
,__fP:function(e){var T=e.target;var U=T.$$animation;if(!U){return;}
;var W=U.desc;if(qx.bom.element.AnimationCss.__fM!=null){var V=qx.lang.String.camelCase(qx.bom.element.AnimationCss.__fM[p]);T.style[V]=r;qx.bom.Event.removeNativeListener(T,qx.bom.element.AnimationCss.__fM[p],qx.bom.element.AnimationCss.__fP);}
;if(W.origin!=null){qx.bom.element.Transform.setOrigin(T,r);}
;qx.bom.element.AnimationCss.__fQ(T,W.keyFrames[U.keep]);T.$$animation=null;U.el=null;U.ended=true;U.emit(h,T);}
,__fQ:function(X,Y){var bb;for(var ba in Y){if(ba in qx.bom.element.AnimationCss.__fL){if(!bb){bb={};}
;bb[ba]=Y[ba];}
else {X.style[qx.lang.String.camelCase(ba)]=Y[ba];}
;}
;if(bb){qx.bom.element.Transform.transform(X,bb);}
;}
,__fR:function(bc){if(!bc.hasOwnProperty(j)){bc.alternate=false;}
;if(!bc.hasOwnProperty(k)){bc.keep=null;}
;if(!bc.hasOwnProperty(c)){bc.repeat=1;}
;if(!bc.hasOwnProperty(f)){bc.timing=B;}
;if(!bc.hasOwnProperty(s)){bc.origin=null;}
;}
,__fS:null,__fT:function(frames,be){var bh=r;for(var bl in frames){bh+=(be?-(bl-100):bl)+z;var bg=frames[bl];var bj;for(var bd in bg){if(bd in this.__fL){if(!bj){bj={};}
;bj[bd]=bg[bd];}
else {var bk=qx.bom.Style.getPropertyName(bd);var bf=(bk!==null)?qx.bom.Style.getCssName(bk):r;bh+=(bf||bd)+m+bg[bd]+C;}
;}
;if(bj){bh+=qx.bom.element.Transform.getCss(bj);}
;bh+=o;}
;if(this.__dk[bh]){return this.__dk[bh];}
;var name=this.__fK+this.__cl++ ;var bi=this.__fM[E]+A+name;qx.bom.Stylesheet.addRule(this.__dn,bi,bh);this.__dk[bh]=name;return name;}
,__fU:function(){this.__cl=0;if(this.__dn){this.__dn.ownerNode.remove();this.__dn=null;this.__dk={};}
;}
},defer:function(bm){if(qx.core.Environment.get(b)===n&&parseInt(qx.core.Environment.get(d))>=8){document.addEventListener(l,function(){if(!document.hidden){bm.__fU();}
;}
,false);}
;}
});}
)();
(function(){var a="css.animation",b="Element",c="",d="qx.bom.element.AnimationHandle",e="play-state",f="paused",g="running";qx.Bootstrap.define(d,{extend:qx.event.Emitter,construct:function(){var h=qx.core.Environment.get(a);this.__fV=h&&h[e];this.__fW=true;}
,events:{"start":b,"end":b,"iteration":b},members:{__fV:null,__fW:false,__fX:false,isPlaying:function(){return this.__fW;}
,isEnded:function(){return this.__fX;}
,isPaused:function(){return this.el.style[this.__fV]==f;}
,pause:function(){if(this.el){this.el.style[this.__fV]=f;this.el.$$animation.__fW=false;if(this.animationId&&qx.bom.element.AnimationJs){qx.bom.element.AnimationJs.pause(this);}
;}
;}
,play:function(){if(this.el){this.el.style[this.__fV]=g;this.el.$$animation.__fW=true;if(this.i!=undefined&&qx.bom.element.AnimationJs){qx.bom.element.AnimationJs.play(this);}
;}
;}
,stop:function(){if(this.el&&qx.core.Environment.get(a)&&!this.jsAnimation){this.el.style[this.__fV]=c;this.el.style[qx.core.Environment.get(a).name]=c;this.el.$$animation.__fW=false;this.el.$$animation.__fX=true;}
else if(this.jsAnimation){this.stopped=true;qx.bom.element.AnimationJs.stop(this);}
;}
}});}
)();
(function(){var c="cm",d="mm",e="0",f="pt",g="pc",h="",k="%",l="em",m="qx.bom.element.AnimationJs",n="infinite",o="#",p="in",q="px",r="start",s="end",t="ex",u=";",v="undefined",w="iteration",y="string",z=":";qx.Bootstrap.define(m,{statics:{__fY:30,__ga:[k,p,c,d,l,t,f,g,q],__fL:{"scale":true,"rotate":true,"skew":true,"translate":true},animate:function(B,C,A){return this._animate(B,C,A,false);}
,animateReverse:function(E,F,D){return this._animate(E,F,D,true);}
,_animate:function(G,Q,P,I){if(G.$$animation){return G.$$animation;}
;Q=qx.lang.Object.clone(Q,true);if(P==undefined){P=Q.duration;}
;var L=Q.keyFrames;var J=this.__gj(L);var K=this.__gi(P,J);var N=parseInt(P/K,10);this.__gb(L,G);var O=this.__gd(N,K,J,L,P,Q.timing);var H=new qx.bom.element.AnimationHandle();H.jsAnimation=true;if(I){O.reverse();H.reverse=true;}
;H.desc=Q;H.el=G;H.delta=O;H.stepTime=K;H.steps=N;G.$$animation=H;H.i=0;H.initValues={};H.repeatSteps=this.__gg(N,Q.repeat);var M=Q.delay||0;var self=this;H.delayId=window.setTimeout(function(){H.delayId=null;self.play(H);}
,M);return H;}
,__gb:function(V,R){var Y={};for(var U in V){for(var name in V[U]){var S=qx.bom.Style.getPropertyName(name);if(S&&S!=name){var X=qx.bom.Style.getCssName(S);V[U][X]=V[U][name];delete V[U][name];name=X;}
;if(Y[name]==undefined){var W=V[U][name];if(typeof W==y){Y[name]=this.__ge(W);}
else {Y[name]=h;}
;}
;}
;}
;for(var U in V){var T=V[U];for(var name in Y){if(T[name]==undefined){if(name in R.style){if(window.getComputedStyle){T[name]=getComputedStyle(R,null)[name];}
else {T[name]=R.style[name];}
;}
else {T[name]=R[name];}
;if(T[name]===h&&this.__ga.indexOf(Y[name])!=-1){T[name]=e+Y[name];}
;}
;}
;}
;}
,__gc:function(bb){bb=qx.lang.Object.clone(bb);var bc;for(var name in bb){if(name in this.__fL){if(!bc){bc={};}
;bc[name]=bb[name];delete bb[name];}
;}
;if(bc){var ba=qx.bom.element.Transform.getCss(bc).split(z);if(ba.length>1){bb[ba[0]]=ba[1].replace(u,h);}
;}
;return bb;}
,__gd:function(bw,bh,bo,bi,be,bq){var bp=new Array(bw);var bm=1;bp[0]=this.__gc(bi[0]);var bt=bi[0];var bj=bi[bo[bm]];var bf=Math.floor(bo[bm]/(bh/be*100));var bs=1;for(var i=1;i<bp.length;i++ ){if(i*bh/be*100>bo[bm]){bt=bj;bm++ ;bj=bi[bo[bm]];bf=Math.floor(bo[bm]/(bh/be*100))-bf;bs=1;}
;bp[i]={};var bd;for(var name in bj){var br=bj[name]+h;if(name in this.__fL){if(!bd){bd={};}
;if(qx.Bootstrap.isArray(bt[name])){if(!qx.Bootstrap.isArray(bj[name])){bj[name]=[bj[name]];}
;bd[name]=[];for(var j=0;j<bj[name].length;j++ ){var bu=bj[name][j]+h;var x=bs/bf;bd[name][j]=this.__gf(bu,bt[name],bq,x);}
;}
else {var x=bs/bf;bd[name]=this.__gf(br,bt[name],bq,x);}
;}
else if(br.charAt(0)==o){var bl=qx.util.ColorUtil.cssStringToRgb(bt[name]);var bk=qx.util.ColorUtil.cssStringToRgb(br);var bg=[];for(var j=0;j<bl.length;j++ ){var bv=bl[j]-bk[j];var x=bs/bf;var bn=qx.bom.AnimationFrame.calculateTiming(bq,x);bg[j]=parseInt(bl[j]-bv*bn,10);}
;bp[i][name]=qx.util.ColorUtil.rgbToHexString(bg);}
else if(!isNaN(parseFloat(br))){var x=bs/bf;bp[i][name]=this.__gf(br,bt[name],bq,x);}
else {bp[i][name]=bt[name]+h;}
;}
;if(bd){var bx=qx.bom.element.Transform.getCss(bd).split(z);if(bx.length>1){bp[i][bx[0]]=bx[1].replace(u,h);}
;}
;bs++ ;}
;bp[bp.length-1]=this.__gc(bi[100]);return bp;}
,__ge:function(by){return by.substring((parseFloat(by)+h).length,by.length);}
,__gf:function(bC,bB,bz,x){var bA=parseFloat(bC)-parseFloat(bB);return (parseFloat(bB)+bA*qx.bom.AnimationFrame.calculateTiming(bz,x))+this.__ge(bC);}
,play:function(bD){bD.emit(r,bD.el);var bE=window.setInterval(function(){bD.repeatSteps-- ;var bF=bD.delta[bD.i%bD.steps];if(bD.i===0){for(var name in bF){if(bD.initValues[name]===undefined){if(bD.el[name]!==undefined){bD.initValues[name]=bD.el[name];}
else if(qx.bom.element.Style){bD.initValues[name]=qx.bom.element.Style.get(bD.el,qx.lang.String.camelCase(name));}
else {bD.initValues[name]=bD.el.style[qx.lang.String.camelCase(name)];}
;}
;}
;}
;qx.bom.element.AnimationJs.__gh(bD.el,bF);bD.i++ ;if(bD.i%bD.steps==0){bD.emit(w,bD.el);if(bD.desc.alternate){bD.delta.reverse();}
;}
;if(bD.repeatSteps<0){qx.bom.element.AnimationJs.stop(bD);}
;}
,bD.stepTime);bD.animationId=bE;return bD;}
,pause:function(bG){window.clearInterval(bG.animationId);bG.animationId=null;return bG;}
,stop:function(bK){var bJ=bK.desc;var bH=bK.el;var bI=bK.initValues;if(bK.animationId){window.clearInterval(bK.animationId);}
;if(bK.delayId){window.clearTimeout(bK.delayId);}
;if(bH==undefined){return bK;}
;var bL=bJ.keep;if(bL!=undefined&&!bK.stopped){if(bK.reverse||(bJ.alternate&&bJ.repeat&&bJ.repeat%2==0)){bL=100-bL;}
;this.__gh(bH,bJ.keyFrames[bL]);}
else {this.__gh(bH,bI);}
;bH.$$animation=null;bK.el=null;bK.ended=true;bK.animationId=null;bK.emit(s,bH);return bK;}
,__gg:function(bN,bM){if(bM==undefined){return bN;}
;if(bM==n){return Number.MAX_VALUE;}
;return bN*bM;}
,__gh:function(bP,bO){for(var bQ in bO){if(bO[bQ]===undefined){continue;}
;if(typeof bP.style[bQ]===v&&bQ in bP){bP[bQ]=bO[bQ];continue;}
;var name=qx.bom.Style.getPropertyName(bQ)||bQ;if(qx.bom.element.Style){qx.bom.element.Style.set(bP,name,bO[bQ]);}
else {bP.style[name]=bO[bQ];}
;}
;}
,__gi:function(bT,bR){var bU=100;for(var i=0;i<bR.length-1;i++ ){bU=Math.min(bU,bR[i+1]-bR[i]);}
;var bS=bT*bU/100;while(bS>this.__fY){bS=bS/2;}
;return Math.round(bS);}
,__gj:function(bW){var bV=Object.keys(bW);for(var i=0;i<bV.length;i++ ){bV[i]=parseInt(bV[i],10);}
;bV.sort(function(a,b){return a-b;}
);return bV;}
}});}
)();
(function(){var a="css.transform.3d",b="backfaceVisibility",c="transformStyle",d="css.transform",e="transformOrigin",f="qx.bom.client.CssTransform",g="transform",h="perspective",i="perspectiveOrigin";qx.Bootstrap.define(f,{statics:{getSupport:function(){var name=qx.bom.client.CssTransform.getName();if(name!=null){return {"name":name,"style":qx.bom.client.CssTransform.getStyle(),"origin":qx.bom.client.CssTransform.getOrigin(),"3d":qx.bom.client.CssTransform.get3D(),"perspective":qx.bom.client.CssTransform.getPerspective(),"perspective-origin":qx.bom.client.CssTransform.getPerspectiveOrigin(),"backface-visibility":qx.bom.client.CssTransform.getBackFaceVisibility()};}
;return null;}
,getStyle:function(){return qx.bom.Style.getPropertyName(c);}
,getPerspective:function(){return qx.bom.Style.getPropertyName(h);}
,getPerspectiveOrigin:function(){return qx.bom.Style.getPropertyName(i);}
,getBackFaceVisibility:function(){return qx.bom.Style.getPropertyName(b);}
,getOrigin:function(){return qx.bom.Style.getPropertyName(e);}
,getName:function(){return qx.bom.Style.getPropertyName(g);}
,get3D:function(){return qx.bom.client.CssTransform.getPerspective()!=null;}
},defer:function(j){qx.core.Environment.add(d,j.getSupport);qx.core.Environment.add(a,j.get3D);}
});}
)();
(function(){var a="backface-visibility",b="css.transform.3d",c=") ",d="px",e="scale",f="Z",g="X",h=", ",j="visible",k=":",l="3d",m="name",n="",o="origin",p="(",q="qx.bom.element.Transform",r="perspective",s="Y",t="css.transform",u="translate",v="perspective-origin",w="hidden",x=";",y=" ",z="style";qx.Bootstrap.define(q,{statics:{__gk:qx.core.Environment.get(t),transform:function(A,C){var D=this.getTransformValue(C);if(this.__gk!=null){var B=this.__gk[m];A.style[B]=D;}
;}
,translate:function(E,F){this.transform(E,{translate:F});}
,scale:function(G,H){this.transform(G,{scale:H});}
,rotate:function(I,J){this.transform(I,{rotate:J});}
,skew:function(K,L){this.transform(K,{skew:L});}
,getCss:function(N){var O=this.getTransformValue(N);if(this.__gk!=null){var M=this.__gk[m];return qx.bom.Style.getCssName(M)+k+O+x;}
;return n;}
,setOrigin:function(P,Q){if(this.__gk!=null){P.style[this.__gk[o]]=Q;}
;}
,getOrigin:function(R){if(this.__gk!=null){return R.style[this.__gk[o]];}
;return n;}
,setStyle:function(S,T){if(this.__gk!=null){S.style[this.__gk[z]]=T;}
;}
,getStyle:function(U){if(this.__gk!=null){return U.style[this.__gk[z]];}
;return n;}
,setPerspective:function(V,W){if(this.__gk!=null){V.style[this.__gk[r]]=W+d;}
;}
,getPerspective:function(X){if(this.__gk!=null){return X.style[this.__gk[r]];}
;return n;}
,setPerspectiveOrigin:function(Y,ba){if(this.__gk!=null){Y.style[this.__gk[v]]=ba;}
;}
,getPerspectiveOrigin:function(bb){if(this.__gk!=null){var bc=bb.style[this.__gk[v]];if(bc!=n){return bc;}
else {var be=bb.style[this.__gk[v]+g];var bd=bb.style[this.__gk[v]+s];if(be!=n){return be+y+bd;}
;}
;}
;return n;}
,setBackfaceVisibility:function(bf,bg){if(this.__gk!=null){bf.style[this.__gk[a]]=bg?j:w;}
;}
,getBackfaceVisibility:function(bh){if(this.__gk!=null){return bh.style[this.__gk[a]]==j;}
;return true;}
,getTransformValue:function(bl){var bm=n;var bi=[u,e];for(var bj in bl){var bk=bl[bj];if(qx.Bootstrap.isArray(bk)){if(bk.length===3&&bi.indexOf(bj)>-1&&qx.core.Environment.get(b)){bm+=this._compute3dProperty(bj,bk);}
else {bm+=this._computeAxisProperties(bj,bk);}
;}
else {bm+=bj+p+bk+c;}
;}
;return bm.trim();}
,_compute3dProperty:function(bo,bn){var bp=n;bo+=l;for(var i=0;i<bn.length;i++ ){if(bn[i]==null){bn[i]=0;}
;}
;bp+=bo+p+bn.join(h)+c;return bp;}
,_computeAxisProperties:function(bq,br){var bt=n;var bs=[g,s,f];for(var i=0;i<br.length;i++ ){if(br[i]==null||(i==2&&!qx.core.Environment.get(b))){continue;}
;bt+=bq+bs[i]+p;bt+=br[i];bt+=c;}
;return bt;}
}});}
)();
(function(){var b="ease-in-out",c="Number",d="css.animation.requestframe",e="qx.bom.AnimationFrame",f="frame",g="end",h="linear",j="ease-in",k="ease-out";qx.Bootstrap.define(e,{extend:qx.event.Emitter,events:{"end":undefined,"frame":c},members:{__gl:false,startSequence:function(l){this.__gl=false;var m=+(new Date());var n=function(p){if(this.__gl){this.id=null;return;}
;if(p>=m+l){this.emit(g);this.id=null;}
else {var o=Math.max(p-m,0);this.emit(f,o);this.id=qx.bom.AnimationFrame.request(n,this);}
;}
;this.id=qx.bom.AnimationFrame.request(n,this);}
,cancelSequence:function(){this.__gl=true;}
},statics:{TIMEOUT:30,calculateTiming:function(q,x){if(q==j){var a=[3.1223e-7,0.0757,1.2646,-0.167,-0.4387,0.2654];}
else if(q==k){var a=[-7.0198e-8,1.652,-0.551,-0.0458,0.1255,-0.1807];}
else if(q==h){return x;}
else if(q==b){var a=[2.482e-7,-0.2289,3.3466,-1.0857,-1.7354,0.7034];}
else {var a=[-0.0021,0.2472,9.8054,-21.6869,17.7611,-5.1226];}
;var y=0;for(var i=0;i<a.length;i++ ){y+=a[i]*Math.pow(x,i);}
;return y;}
,request:function(r,t){var s=qx.core.Environment.get(d);var u=function(v){if(v<1e10){v=this.__gm+v;}
;v=v||+(new Date());r.call(t,v);}
;if(s){return window[s](u);}
else {return window.setTimeout(function(){u();}
,qx.bom.AnimationFrame.TIMEOUT);}
;}
},defer:function(w){w.__gm=window.performance&&performance.timing&&performance.timing.navigationStart;if(!w.__gm){w.__gm=Date.now();}
;}
});}
)();
(function(){var a="qx.util.DeferredCallManager",b="singleton";qx.Class.define(a,{extend:qx.core.Object,type:b,construct:function(){this.__gn={};this.__go=qx.lang.Function.bind(this.__gs,this);this.__gp=false;}
,members:{__gq:null,__gr:null,__gn:null,__gp:null,__go:null,schedule:function(d){if(this.__gq==null){this.__gq=window.setTimeout(this.__go,0);}
;var c=d.toHashCode();if(this.__gr&&this.__gr[c]){return;}
;this.__gn[c]=d;this.__gp=true;}
,cancel:function(f){var e=f.toHashCode();if(this.__gr&&this.__gr[e]){this.__gr[e]=null;return;}
;delete this.__gn[e];if(qx.lang.Object.isEmpty(this.__gn)&&this.__gq!=null){window.clearTimeout(this.__gq);this.__gq=null;}
;}
,__gs:qx.event.GlobalError.observeMethod(function(){this.__gq=null;while(this.__gp){this.__gr=qx.lang.Object.clone(this.__gn);this.__gn={};this.__gp=false;for(var h in this.__gr){var g=this.__gr[h];if(g){this.__gr[h]=null;g.call();}
;}
;}
;this.__gr=null;}
)},destruct:function(){if(this.__gq!=null){window.clearTimeout(this.__gq);}
;this.__go=this.__gn=null;}
});}
)();
(function(){var a="qx.util.DeferredCall";qx.Class.define(a,{extend:qx.core.Object,construct:function(b,c){qx.core.Object.call(this);this.__bJ=b;this.__bL=c||null;this.__gt=qx.util.DeferredCallManager.getInstance();}
,members:{__bJ:null,__bL:null,__gt:null,cancel:function(){this.__gt.cancel(this);}
,schedule:function(){this.__gt.schedule(this);}
,call:function(){{var d;}
;this.__bL?this.__bJ.apply(this.__bL):this.__bJ();}
},destruct:function(){this.cancel();this.__bL=this.__bJ=this.__gt=null;}
});}
)();
(function(){var a="Child is already in: ",b="text",c="qx.html.Element",d="|capture|",f="focus",g="blur",h="div",j="class",k="deactivate",m="css.userselect",n="animationEnd",o="capture",p="visible",q="Root elements could not be inserted into other ones.",r="Has no children!",s="|bubble|",t="releaseCapture",u="Could not move to same index!",v="element",w="",z="__gP",A="qxSelectable",B="tabIndex",C="off",D="on",E="qx.html.Iframe",F="activate",G="Has no parent to remove from.",H="mshtml",I="engine.name",J="none",K="Has no child: ",L="scroll",M=" ",N="hidden",O="Has no child at this position!",P="css.userselect.none",Q="Could not overwrite existing element!";qx.Class.define(c,{extend:qx.core.Object,construct:function(T,R,S){qx.core.Object.call(this);this.__gu=T||h;this.__gv=R||null;this.__gw=S||null;}
,statics:{DEBUG:false,_modified:{},_visibility:{},_scroll:{},_actions:[],__gx:{},__gy:null,__gz:null,_scheduleFlush:function(U){qx.html.Element.__hb.schedule();}
,flush:function(){var bg;{}
;var X=this.__gA();var W=X.getFocus();if(W&&this.__gC(W)){X.blur(W);}
;var bn=X.getActive();if(bn&&this.__gC(bn)){qx.bom.Element.deactivate(bn);}
;var bb=this.__gB();if(bb&&this.__gC(bb)){qx.bom.Element.releaseCapture(bb);}
;var bh=[];var bi=this._modified;for(var bf in bi){bg=bi[bf];if(bg.__gT()||bg.classname==E){if(bg.__gD&&qx.dom.Hierarchy.isRendered(bg.__gD)){bh.push(bg);}
else {{}
;bg.__gS();}
;delete bi[bf];}
;}
;for(var i=0,l=bh.length;i<l;i++ ){bg=bh[i];{}
;bg.__gS();}
;var bd=this._visibility;for(var bf in bd){bg=bd[bf];var bj=bg.__gD;if(!bj){delete bd[bf];continue;}
;{}
;if(!bg.$$disposed){bj.style.display=bg.__gF?w:J;if((qx.core.Environment.get(I)==H)){if(!(document.documentMode>=8)){bj.style.visibility=bg.__gF?p:N;}
;}
;}
;delete bd[bf];}
;var scroll=this._scroll;for(var bf in scroll){bg=scroll[bf];var bo=bg.__gD;if(bo&&bo.offsetWidth){var ba=true;if(bg.__gI!=null){bg.__gD.scrollLeft=bg.__gI;delete bg.__gI;}
;if(bg.__gJ!=null){bg.__gD.scrollTop=bg.__gJ;delete bg.__gJ;}
;var bk=bg.__gG;if(bk!=null){var be=bk.element.getDomElement();if(be&&be.offsetWidth){qx.bom.element.Scroll.intoViewX(be,bo,bk.align);delete bg.__gG;}
else {ba=false;}
;}
;var bl=bg.__gH;if(bl!=null){var be=bl.element.getDomElement();if(be&&be.offsetWidth){qx.bom.element.Scroll.intoViewY(be,bo,bl.align);delete bg.__gH;}
else {ba=false;}
;}
;if(ba){delete scroll[bf];}
;}
;}
;var Y={"releaseCapture":1,"blur":1,"deactivate":1};for(var i=0;i<this._actions.length;i++ ){var bm=this._actions[i];var bj=bm.element.__gD;if(!bj||!Y[bm.type]&&!bm.element.__gT()){continue;}
;var bc=bm.args;bc.unshift(bj);qx.bom.Element[bm.type].apply(qx.bom.Element,bc);}
;this._actions=[];for(var bf in this.__gx){var V=this.__gx[bf];var bo=V.element.__gD;if(bo){qx.bom.Selection.set(bo,V.start,V.end);delete this.__gx[bf];}
;}
;qx.event.handler.Appear.refresh();}
,__gA:function(){if(!this.__gy){var bp=qx.event.Registration.getManager(window);this.__gy=bp.getHandler(qx.event.handler.Focus);}
;return this.__gy;}
,__gB:function(){if(!this.__gz){var bq=qx.event.Registration.getManager(window);this.__gz=bq.getDispatcher(qx.event.dispatch.MouseCapture);}
;return this.__gz.getCaptureElement();}
,__gC:function(br){var bs=qx.core.ObjectRegistry.fromHashCode(br.$$element);return bs&&!bs.__gT();}
},members:{__gu:null,__gD:null,__dd:false,__gE:true,__gF:true,__gG:null,__gH:null,__gI:null,__gJ:null,__gK:null,__gL:null,__gM:null,__gv:null,__gw:null,__gN:null,__gO:null,__gP:null,__gQ:null,__gR:null,_scheduleChildrenUpdate:function(){if(this.__gQ){return;}
;this.__gQ=true;qx.html.Element._modified[this.$$hash]=this;qx.html.Element._scheduleFlush(v);}
,_createDomElement:function(){return qx.dom.Element.create(this.__gu);}
,__gS:function(){{}
;var length;var bt=this.__gP;if(bt){length=bt.length;var bu;for(var i=0;i<length;i++ ){bu=bt[i];if(bu.__gF&&bu.__gE&&!bu.__gD){bu.__gS();}
;}
;}
;if(!this.__gD){this.__gD=this._createDomElement();this.__gD.$$element=this.$$hash;this._copyData(false);if(bt&&length>0){this._insertChildren();}
;}
else {this._syncData();if(this.__gQ){this._syncChildren();}
;}
;delete this.__gQ;}
,_insertChildren:function(){var bv=this.__gP;var length=bv.length;var bx;if(length>2){var bw=document.createDocumentFragment();for(var i=0;i<length;i++ ){bx=bv[i];if(bx.__gD&&bx.__gE){bw.appendChild(bx.__gD);}
;}
;this.__gD.appendChild(bw);}
else {var bw=this.__gD;for(var i=0;i<length;i++ ){bx=bv[i];if(bx.__gD&&bx.__gE){bw.appendChild(bx.__gD);}
;}
;}
;}
,_syncChildren:function(){var bH=qx.core.ObjectRegistry;var by=this.__gP;var bF=by.length;var bz;var bD;var bB=this.__gD;var bG=bB.childNodes;var bA=0;var bE;{var bC;}
;for(var i=bG.length-1;i>=0;i-- ){bE=bG[i];bD=bH.fromHashCode(bE.$$element);if(!bD||!bD.__gE||bD.__gR!==this){bB.removeChild(bE);{}
;}
;}
;for(var i=0;i<bF;i++ ){bz=by[i];if(bz.__gE){bD=bz.__gD;bE=bG[bA];if(!bD){continue;}
;if(bD!=bE){if(bE){bB.insertBefore(bD,bE);}
else {bB.appendChild(bD);}
;{}
;}
;bA++ ;}
;}
;{}
;}
,_copyData:function(bJ){var bL=this.__gD;var bN=this.__gw;if(bN){var bK=qx.bom.element.Attribute;for(var bM in bN){bK.set(bL,bM,bN[bM]);}
;}
;var bN=this.__gv;if(bN){var bI=qx.bom.element.Style;if(bJ){bI.setStyles(bL,bN);}
else {bI.setCss(bL,bI.compile(bN));}
;}
;var bN=this.__gN;if(bN){for(var bM in bN){this._applyProperty(bM,bN[bM]);}
;}
;var bN=this.__gO;if(bN){qx.event.Registration.getManager(bL).importListeners(bL,bN);delete this.__gO;}
;}
,_syncData:function(){var bS=this.__gD;var bR=qx.bom.element.Attribute;var bP=qx.bom.element.Style;var bQ=this.__gL;if(bQ){var bV=this.__gw;if(bV){var bT;for(var bU in bQ){bT=bV[bU];if(bT!==undefined){bR.set(bS,bU,bT);}
else {bR.reset(bS,bU);}
;}
;}
;this.__gL=null;}
;var bQ=this.__gK;if(bQ){var bV=this.__gv;if(bV){var bO={};for(var bU in bQ){bO[bU]=bV[bU];}
;bP.setStyles(bS,bO);}
;this.__gK=null;}
;var bQ=this.__gM;if(bQ){var bV=this.__gN;if(bV){var bT;for(var bU in bQ){this._applyProperty(bU,bV[bU]);}
;}
;this.__gM=null;}
;}
,__gT:function(){var bW=this;while(bW){if(bW.__dd){return true;}
;if(!bW.__gE||!bW.__gF){return false;}
;bW=bW.__gR;}
;return false;}
,__gU:function(bX){if(bX.__gR===this){throw new Error(a+bX);}
;if(bX.__dd){throw new Error(q);}
;if(bX.__gR){bX.__gR.remove(bX);}
;bX.__gR=this;if(!this.__gP){this.__gP=[];}
;if(this.__gD){this._scheduleChildrenUpdate();}
;}
,__gV:function(bY){if(bY.__gR!==this){throw new Error(K+bY);}
;if(this.__gD){this._scheduleChildrenUpdate();}
;delete bY.__gR;}
,__gW:function(ca){if(ca.__gR!==this){throw new Error(K+ca);}
;if(this.__gD){this._scheduleChildrenUpdate();}
;}
,getChildren:function(){return this.__gP||null;}
,getChild:function(cb){var cc=this.__gP;return cc&&cc[cb]||null;}
,hasChildren:function(){var cd=this.__gP;return cd&&cd[0]!==undefined;}
,indexOf:function(cf){var ce=this.__gP;return ce?ce.indexOf(cf):-1;}
,hasChild:function(ch){var cg=this.__gP;return cg&&cg.indexOf(ch)!==-1;}
,add:function(ci){if(arguments[1]){for(var i=0,l=arguments.length;i<l;i++ ){this.__gU(arguments[i]);}
;this.__gP.push.apply(this.__gP,arguments);}
else {this.__gU(ci);this.__gP.push(ci);}
;return this;}
,addAt:function(ck,cj){this.__gU(ck);qx.lang.Array.insertAt(this.__gP,ck,cj);return this;}
,remove:function(cl){var cm=this.__gP;if(!cm){return this;}
;if(arguments[1]){var cn;for(var i=0,l=arguments.length;i<l;i++ ){cn=arguments[i];this.__gV(cn);qx.lang.Array.remove(cm,cn);}
;}
else {this.__gV(cl);qx.lang.Array.remove(cm,cl);}
;return this;}
,removeAt:function(co){var cp=this.__gP;if(!cp){throw new Error(r);}
;var cq=cp[co];if(!cq){throw new Error(O);}
;this.__gV(cq);qx.lang.Array.removeAt(this.__gP,co);return this;}
,removeAll:function(){var cr=this.__gP;if(cr){for(var i=0,l=cr.length;i<l;i++ ){this.__gV(cr[i]);}
;cr.length=0;}
;return this;}
,getParent:function(){return this.__gR||null;}
,insertInto:function(parent,cs){parent.__gU(this);if(cs==null){parent.__gP.push(this);}
else {qx.lang.Array.insertAt(this.__gP,this,cs);}
;return this;}
,insertBefore:function(ct){var parent=ct.__gR;parent.__gU(this);qx.lang.Array.insertBefore(parent.__gP,this,ct);return this;}
,insertAfter:function(cu){var parent=cu.__gR;parent.__gU(this);qx.lang.Array.insertAfter(parent.__gP,this,cu);return this;}
,moveTo:function(cv){var parent=this.__gR;parent.__gW(this);var cw=parent.__gP.indexOf(this);if(cw===cv){throw new Error(u);}
else if(cw<cv){cv-- ;}
;qx.lang.Array.removeAt(parent.__gP,cw);qx.lang.Array.insertAt(parent.__gP,this,cv);return this;}
,moveBefore:function(cx){var parent=this.__gR;return this.moveTo(parent.__gP.indexOf(cx));}
,moveAfter:function(cy){var parent=this.__gR;return this.moveTo(parent.__gP.indexOf(cy)+1);}
,free:function(){var parent=this.__gR;if(!parent){throw new Error(G);}
;if(!parent.__gP){return this;}
;parent.__gV(this);qx.lang.Array.remove(parent.__gP,this);return this;}
,getDomElement:function(){return this.__gD||null;}
,getNodeName:function(){return this.__gu;}
,setNodeName:function(name){this.__gu=name;}
,setRoot:function(cz){this.__dd=cz;}
,useMarkup:function(cA){if(this.__gD){throw new Error(Q);}
;if(qx.core.Environment.get(I)==H){var cB=document.createElement(h);}
else {var cB=qx.dom.Element.getHelperElement();}
;cB.innerHTML=cA;this.useElement(cB.firstChild);return this.__gD;}
,useElement:function(cC){if(this.__gD){throw new Error(Q);}
;this.__gD=cC;this.__gD.$$element=this.$$hash;this._copyData(true);}
,isFocusable:function(){var cE=this.getAttribute(B);if(cE>=1){return true;}
;var cD=qx.event.handler.Focus.FOCUSABLE_ELEMENTS;if(cE>=0&&cD[this.__gu]){return true;}
;return false;}
,setSelectable:function(cG){this.setAttribute(A,cG?D:C);var cF=qx.core.Environment.get(m);if(cF){this.setStyle(cF,cG?b:qx.core.Environment.get(P));}
;}
,isNativelyFocusable:function(){return !!qx.event.handler.Focus.FOCUSABLE_ELEMENTS[this.__gu];}
,include:function(){if(this.__gE){return this;}
;delete this.__gE;if(this.__gR){this.__gR._scheduleChildrenUpdate();}
;return this;}
,exclude:function(){if(!this.__gE){return this;}
;this.__gE=false;if(this.__gR){this.__gR._scheduleChildrenUpdate();}
;return this;}
,isIncluded:function(){return this.__gE===true;}
,fadeIn:function(cH){var cI=qxWeb(this.__gD);if(cI.isPlaying()){cI.stop();}
;if(!this.__gD){this.__gS();cI.push(this.__gD);}
;if(this.__gD){cI.fadeIn(cH);return cI.getAnimationHandles()[0];}
;}
,fadeOut:function(cJ){var cK=qxWeb(this.__gD);if(cK.isPlaying()){cK.stop();}
;if(this.__gD){cK.fadeOut(cJ).once(n,function(){this.hide();qx.html.Element.flush();}
,this);return cK.getAnimationHandles()[0];}
;}
,show:function(){if(this.__gF){return this;}
;if(this.__gD){qx.html.Element._visibility[this.$$hash]=this;qx.html.Element._scheduleFlush(v);}
;if(this.__gR){this.__gR._scheduleChildrenUpdate();}
;delete this.__gF;return this;}
,hide:function(){if(!this.__gF){return this;}
;if(this.__gD){qx.html.Element._visibility[this.$$hash]=this;qx.html.Element._scheduleFlush(v);}
;this.__gF=false;return this;}
,isVisible:function(){return this.__gF===true;}
,scrollChildIntoViewX:function(cO,cM,cP){var cL=this.__gD;var cN=cO.getDomElement();if(cP!==false&&cL&&cL.offsetWidth&&cN&&cN.offsetWidth){qx.bom.element.Scroll.intoViewX(cN,cL,cM);}
else {this.__gG={element:cO,align:cM};qx.html.Element._scroll[this.$$hash]=this;qx.html.Element._scheduleFlush(v);}
;delete this.__gI;}
,scrollChildIntoViewY:function(cT,cR,cU){var cQ=this.__gD;var cS=cT.getDomElement();if(cU!==false&&cQ&&cQ.offsetWidth&&cS&&cS.offsetWidth){qx.bom.element.Scroll.intoViewY(cS,cQ,cR);}
else {this.__gH={element:cT,align:cR};qx.html.Element._scroll[this.$$hash]=this;qx.html.Element._scheduleFlush(v);}
;delete this.__gJ;}
,scrollToX:function(x,cV){var cW=this.__gD;if(cV!==true&&cW&&cW.offsetWidth){cW.scrollLeft=x;delete this.__gI;}
else {this.__gI=x;qx.html.Element._scroll[this.$$hash]=this;qx.html.Element._scheduleFlush(v);}
;delete this.__gG;}
,getScrollX:function(){var cX=this.__gD;if(cX){return cX.scrollLeft;}
;return this.__gI||0;}
,scrollToY:function(y,da){var cY=this.__gD;if(da!==true&&cY&&cY.offsetWidth){cY.scrollTop=y;delete this.__gJ;}
else {this.__gJ=y;qx.html.Element._scroll[this.$$hash]=this;qx.html.Element._scheduleFlush(v);}
;delete this.__gH;}
,getScrollY:function(){var dc=this.__gD;if(dc){return dc.scrollTop;}
;return this.__gJ||0;}
,disableScrolling:function(){this.enableScrolling();this.scrollToX(0);this.scrollToY(0);this.addListener(L,this.__gY,this);}
,enableScrolling:function(){this.removeListener(L,this.__gY,this);}
,__gX:null,__gY:function(e){if(!this.__gX){this.__gX=true;this.__gD.scrollTop=0;this.__gD.scrollLeft=0;delete this.__gX;}
;}
,getTextSelection:function(){var dd=this.__gD;if(dd){return qx.bom.Selection.get(dd);}
;return null;}
,getTextSelectionLength:function(){var de=this.__gD;if(de){return qx.bom.Selection.getLength(de);}
;return null;}
,getTextSelectionStart:function(){var df=this.__gD;if(df){return qx.bom.Selection.getStart(df);}
;return null;}
,getTextSelectionEnd:function(){var dg=this.__gD;if(dg){return qx.bom.Selection.getEnd(dg);}
;return null;}
,setTextSelection:function(dh,di){var dj=this.__gD;if(dj){qx.bom.Selection.set(dj,dh,di);return;}
;qx.html.Element.__gx[this.toHashCode()]={element:this,start:dh,end:di};qx.html.Element._scheduleFlush(v);}
,clearTextSelection:function(){var dk=this.__gD;if(dk){qx.bom.Selection.clear(dk);}
;delete qx.html.Element.__gx[this.toHashCode()];}
,__ha:function(dl,dm){var dn=qx.html.Element._actions;dn.push({type:dl,element:this,args:dm||[]});qx.html.Element._scheduleFlush(v);}
,focus:function(){this.__ha(f);}
,blur:function(){this.__ha(g);}
,activate:function(){this.__ha(F);}
,deactivate:function(){this.__ha(k);}
,capture:function(dp){this.__ha(o,[dp!==false]);}
,releaseCapture:function(){this.__ha(t);}
,setStyle:function(dq,dr,ds){if(!this.__gv){this.__gv={};}
;if(this.__gv[dq]==dr){return this;}
;if(dr==null){delete this.__gv[dq];}
else {this.__gv[dq]=dr;}
;if(this.__gD){if(ds){qx.bom.element.Style.set(this.__gD,dq,dr);return this;}
;if(!this.__gK){this.__gK={};}
;this.__gK[dq]=true;qx.html.Element._modified[this.$$hash]=this;qx.html.Element._scheduleFlush(v);}
;return this;}
,setStyles:function(du,dw){var dv=qx.bom.element.Style;if(!this.__gv){this.__gv={};}
;if(this.__gD){if(!this.__gK){this.__gK={};}
;for(var dt in du){var dx=du[dt];if(this.__gv[dt]==dx){continue;}
;if(dx==null){delete this.__gv[dt];}
else {this.__gv[dt]=dx;}
;if(dw){dv.set(this.__gD,dt,dx);continue;}
;this.__gK[dt]=true;}
;qx.html.Element._modified[this.$$hash]=this;qx.html.Element._scheduleFlush(v);}
else {for(var dt in du){var dx=du[dt];if(this.__gv[dt]==dx){continue;}
;if(dx==null){delete this.__gv[dt];}
else {this.__gv[dt]=dx;}
;}
;}
;return this;}
,removeStyle:function(dz,dy){this.setStyle(dz,null,dy);return this;}
,getStyle:function(dA){return this.__gv?this.__gv[dA]:null;}
,getAllStyles:function(){return this.__gv||null;}
,setAttribute:function(dB,dC,dD){if(!this.__gw){this.__gw={};}
;if(this.__gw[dB]==dC){return this;}
;if(dC==null){delete this.__gw[dB];}
else {this.__gw[dB]=dC;}
;if(this.__gD){if(dD){qx.bom.element.Attribute.set(this.__gD,dB,dC);return this;}
;if(!this.__gL){this.__gL={};}
;this.__gL[dB]=true;qx.html.Element._modified[this.$$hash]=this;qx.html.Element._scheduleFlush(v);}
;return this;}
,setAttributes:function(dE,dF){for(var dG in dE){this.setAttribute(dG,dE[dG],dF);}
;return this;}
,removeAttribute:function(dI,dH){return this.setAttribute(dI,null,dH);}
,getAttribute:function(dJ){return this.__gw?this.__gw[dJ]:null;}
,addClass:function(name){var dK=((this.getAttribute(j)||w)+M+name).trim();this.setAttribute(j,dK);}
,removeClass:function(name){var dL=this.getAttribute(j);if(dL){this.setAttribute(j,(dL.replace(name,w)).trim());}
;}
,_applyProperty:function(name,dM){}
,_setProperty:function(dN,dO,dP){if(!this.__gN){this.__gN={};}
;if(this.__gN[dN]==dO){return this;}
;if(dO==null){delete this.__gN[dN];}
else {this.__gN[dN]=dO;}
;if(this.__gD){if(dP){this._applyProperty(dN,dO);return this;}
;if(!this.__gM){this.__gM={};}
;this.__gM[dN]=true;qx.html.Element._modified[this.$$hash]=this;qx.html.Element._scheduleFlush(v);}
;return this;}
,_removeProperty:function(dR,dQ){return this._setProperty(dR,null,dQ);}
,_getProperty:function(dT){var dS=this.__gN;if(!dS){return null;}
;var dU=dS[dT];return dU==null?null:dU;}
,addListener:function(ea,dW,self,dV){if(this.$$disposed){return null;}
;{var dX;}
;if(this.__gD){return qx.event.Registration.addListener(this.__gD,ea,dW,self,dV);}
;if(!this.__gO){this.__gO={};}
;if(dV==null){dV=false;}
;var dY=qx.event.Manager.getNextUniqueId();var eb=ea+(dV?d:s)+dY;this.__gO[eb]={type:ea,listener:dW,self:self,capture:dV,unique:dY};return eb;}
,removeListener:function(ej,ed,self,ec){if(this.$$disposed){return null;}
;{var eh;}
;if(this.__gD){if(ed.$$wrapped_callback&&ed.$$wrapped_callback[ej+this.$$hash]){var ee=ed.$$wrapped_callback[ej+this.$$hash];delete ed.$$wrapped_callback[ej+this.$$hash];ed=ee;}
;qx.event.Registration.removeListener(this.__gD,ej,ed,self,ec);}
else {var ef=this.__gO;var ei;if(ec==null){ec=false;}
;for(var eg in ef){ei=ef[eg];if(ei.listener===ed&&ei.self===self&&ei.capture===ec&&ei.type===ej){delete ef[eg];break;}
;}
;}
;return this;}
,removeListenerById:function(ek){if(this.$$disposed){return null;}
;if(this.__gD){qx.event.Registration.removeListenerById(this.__gD,ek);}
else {delete this.__gO[ek];}
;return this;}
,hasListener:function(en,em){if(this.$$disposed){return false;}
;if(this.__gD){return qx.event.Registration.hasListener(this.__gD,en,em);}
;var eo=this.__gO;var eq;if(em==null){em=false;}
;for(var ep in eo){eq=eo[ep];if(eq.capture===em&&eq.type===en){return true;}
;}
;return false;}
,getListeners:function(){if(this.$$disposed){return null;}
;if(this.__gD){return qx.event.Registration.getManager(this.__gD).serializeListeners(this.__gD);}
;var er=[];for(var et in this.__gO){var es=this.__gO[et];er.push({type:es.type,handler:es.listener,self:es.self,capture:es.capture});}
;return er;}
},defer:function(eu){eu.__hb=new qx.util.DeferredCall(eu.flush,eu);}
,destruct:function(){if(this.$$hash){delete qx.html.Element._modified[this.$$hash];delete qx.html.Element._scroll[this.$$hash];}
;var ev=this.__gD;if(ev){qx.event.Registration.getManager(ev).removeAllListeners(ev);ev.$$element=w;}
;if(!qx.core.ObjectRegistry.inShutDown){var parent=this.__gR;if(parent&&!parent.$$disposed){parent.remove(this);}
;}
;this._disposeArray(z);this.__gw=this.__gv=this.__gO=this.__gN=this.__gL=this.__gK=this.__gM=this.__gD=this.__gR=this.__gG=this.__gH=null;}
});}
)();
(function(){var a="qx.event.handler.Appear",b="engine.name",c="mshtml",d="disappear",e="appear",f="browser.documentmode";qx.Class.define(a,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(g){qx.core.Object.call(this);this.__gt=g;this.__hc={};qx.event.handler.Appear.__hd[this.$$hash]=this;}
,statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{appear:true,disappear:true},TARGET_CHECK:qx.event.IEventHandler.TARGET_DOMNODE,IGNORE_CAN_HANDLE:true,__hd:{},refresh:function(){var h=this.__hd;for(var i in h){h[i].refresh();}
;}
},members:{__gt:null,__hc:null,canHandleEvent:function(k,j){}
,registerEvent:function(o,p,m){var n=qx.core.ObjectRegistry.toHashCode(o)+p;var l=this.__hc;if(l&&!l[n]){l[n]=o;o.$$displayed=o.offsetWidth>0;}
;}
,unregisterEvent:function(t,u,r){var s=qx.core.ObjectRegistry.toHashCode(t)+u;var q=this.__hc;if(!q){return;}
;if(q[s]){delete q[s];}
;}
,refresh:function(){var A=this.__hc;var x;var y=qx.core.Environment.get(b)==c&&qx.core.Environment.get(f)<9;for(var v in A){x=A[v];var w=x.offsetWidth>0;if(!w&&y){w=x.offsetWidth>0;}
;if((!!x.$$displayed)!==w){x.$$displayed=w;var z=qx.event.Registration.createEvent(w?e:d);this.__gt.dispatchEvent(x,z);}
;}
;}
},destruct:function(){this.__gt=this.__hc=null;delete qx.event.handler.Appear.__hd[this.$$hash];}
,defer:function(B){qx.event.Registration.addHandler(B);}
});}
)();
(function(){var a="abstract",b="Missing implementation",c="qx.event.dispatch.AbstractBubbling";qx.Class.define(c,{extend:qx.core.Object,implement:qx.event.IEventDispatcher,type:a,construct:function(d){this._manager=d;}
,members:{_getParent:function(e){throw new Error(b);}
,canDispatchEvent:function(g,event,f){return event.getBubbles();}
,dispatchEvent:function(l,event,w){var parent=l;var s=this._manager;var o,x;var n;var v,u;var y;var q=[];o=s.getListeners(l,w,true);x=s.getListeners(l,w,false);if(o){q.push(o);}
;if(x){q.push(x);}
;var parent=this._getParent(l);var k=[];var h=[];var m=[];var p=[];while(parent!=null){o=s.getListeners(parent,w,true);if(o){m.push(o);p.push(parent);}
;x=s.getListeners(parent,w,false);if(x){k.push(x);h.push(parent);}
;parent=this._getParent(parent);}
;event.setEventPhase(qx.event.type.Event.CAPTURING_PHASE);for(var i=m.length-1;i>=0;i-- ){y=p[i];event.setCurrentTarget(y);n=m[i];for(var j=0,r=n.length;j<r;j++ ){v=n[j];u=v.context||y;{}
;v.handler.call(u,event);}
;if(event.getPropagationStopped()){return;}
;}
;event.setEventPhase(qx.event.type.Event.AT_TARGET);event.setCurrentTarget(l);for(var i=0,t=q.length;i<t;i++ ){n=q[i];for(var j=0,r=n.length;j<r;j++ ){v=n[j];u=v.context||l;{}
;v.handler.call(u,event);}
;if(event.getPropagationStopped()){return;}
;}
;event.setEventPhase(qx.event.type.Event.BUBBLING_PHASE);for(var i=0,t=k.length;i<t;i++ ){y=h[i];event.setCurrentTarget(y);n=k[i];for(var j=0,r=n.length;j<r;j++ ){v=n[j];u=v.context||y;{}
;v.handler.call(u,event);}
;if(event.getPropagationStopped()){return;}
;}
;}
}});}
)();
(function(){var a="qx.event.dispatch.DomBubbling";qx.Class.define(a,{extend:qx.event.dispatch.AbstractBubbling,statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL},members:{_getParent:function(b){return b.parentNode;}
,canDispatchEvent:function(d,event,c){return d.nodeType!==undefined&&event.getBubbles();}
},defer:function(e){qx.event.Registration.addDispatcher(e);}
});}
)();
(function(){var a="os.name",b="opera",c="engine.name",d="qx.event.type.Dom",e="osx";qx.Class.define(d,{extend:qx.event.type.Native,statics:{SHIFT_MASK:1,CTRL_MASK:2,ALT_MASK:4,META_MASK:8},members:{_cloneNativeEvent:function(f,g){var g=qx.event.type.Native.prototype._cloneNativeEvent.call(this,f,g);g.shiftKey=f.shiftKey;g.ctrlKey=f.ctrlKey;g.altKey=f.altKey;g.metaKey=f.metaKey;return g;}
,getModifiers:function(){var h=0;var i=this._native;if(i.shiftKey){h|=qx.event.type.Dom.SHIFT_MASK;}
;if(i.ctrlKey){h|=qx.event.type.Dom.CTRL_MASK;}
;if(i.altKey){h|=qx.event.type.Dom.ALT_MASK;}
;if(i.metaKey){h|=qx.event.type.Dom.META_MASK;}
;return h;}
,isCtrlPressed:function(){return this._native.ctrlKey;}
,isShiftPressed:function(){return this._native.shiftKey;}
,isAltPressed:function(){return this._native.altKey;}
,isMetaPressed:function(){return this._native.metaKey;}
,isCtrlOrCommandPressed:function(){if(qx.core.Environment.get(a)==e&&qx.core.Environment.get(c)!=b){return this._native.metaKey;}
else {return this._native.ctrlKey;}
;}
}});}
)();
(function(){var a="mshtml",b="engine.name",c="click",d="middle",e="none",f="contextmenu",g="qx.event.type.Mouse",h="browser.documentmode",i="left",j="right",k="browser.name",l="ie";qx.Class.define(g,{extend:qx.event.type.Dom,members:{_cloneNativeEvent:function(m,n){var n=qx.event.type.Dom.prototype._cloneNativeEvent.call(this,m,n);n.button=m.button;n.clientX=Math.round(m.clientX);n.clientY=Math.round(m.clientY);n.pageX=m.pageX?Math.round(m.pageX):undefined;n.pageY=m.pageY?Math.round(m.pageY):undefined;n.screenX=Math.round(m.screenX);n.screenY=Math.round(m.screenY);n.wheelDelta=m.wheelDelta;n.wheelDeltaX=m.wheelDeltaX;n.wheelDeltaY=m.wheelDeltaY;n.delta=m.delta;n.deltaX=m.deltaX;n.deltaY=m.deltaY;n.deltaZ=m.deltaZ;n.detail=m.detail;n.axis=m.axis;n.wheelX=m.wheelX;n.wheelY=m.wheelY;n.HORIZONTAL_AXIS=m.HORIZONTAL_AXIS;n.srcElement=m.srcElement;n.target=m.target;return n;}
,__he:{'0':i,'2':j,'1':d},__hf:{'0':e,'1':i,'2':j,'4':d},__hg:{'1':i,'2':j,'4':d},stop:function(){this.stopPropagation();}
,getButton:function(){switch(this._type){case f:return j;case c:if(qx.core.Environment.get(k)===l&&qx.core.Environment.get(h)<9){return i;}
;default:if(!(qx.core.Environment.get(b)==a&&qx.core.Environment.get(h)<=8)){if(this._native.button===-1){return this.__hf[this._native.buttons]||e;}
;return this.__he[this._native.button]||e;}
else {return this.__hg[this._native.button]||e;}
;};}
,isLeftPressed:function(){return this.getButton()===i;}
,isMiddlePressed:function(){return this.getButton()===d;}
,isRightPressed:function(){return this.getButton()===j;}
,getRelatedTarget:function(){return this._relatedTarget;}
,getViewportLeft:function(){return Math.round(this._native.clientX);}
,getViewportTop:function(){return Math.round(this._native.clientY);}
,getDocumentLeft:function(){if(this._native.pageX!==undefined){return Math.round(this._native.pageX);}
else if(this._native.srcElement){var o=qx.dom.Node.getWindow(this._native.srcElement);return Math.round(this._native.clientX)+qx.bom.Viewport.getScrollLeft(o);}
else {return Math.round(this._native.clientX)+qx.bom.Viewport.getScrollLeft(window);}
;}
,getDocumentTop:function(){if(this._native.pageY!==undefined){return Math.round(this._native.pageY);}
else if(this._native.srcElement){var p=qx.dom.Node.getWindow(this._native.srcElement);return Math.round(this._native.clientY)+qx.bom.Viewport.getScrollTop(p);}
else {return Math.round(this._native.clientY)+qx.bom.Viewport.getScrollTop(window);}
;}
,getScreenLeft:function(){return Math.round(this._native.screenX);}
,getScreenTop:function(){return Math.round(this._native.screenY);}
}});}
)();
(function(){var a="",b="mouse",c="number",d="touch",e="qx.event.type.Pointer",f="pen",g="string";qx.Class.define(e,{extend:qx.event.type.Mouse,members:{_cloneNativeEvent:function(h,i){i=qx.event.type.Mouse.prototype._cloneNativeEvent.call(this,h,i);i.pointerId=h.pointerId;i.width=h.width;i.height=h.height;i.pressure=h.pressure;i.tiltX=h.tiltX;i.tiltY=h.tiltY;i.pointerType=h.pointerType;i.isPrimary=h.isPrimary;i._original=h._original;i.MSPOINTER_TYPE_MOUSE=h.MSPOINTER_TYPE_MOUSE;i.MSPOINTER_TYPE_PEN=h.MSPOINTER_TYPE_PEN;i.MSPOINTER_TYPE_TOUCH=h.MSPOINTER_TYPE_TOUCH;return i;}
,getDocumentLeft:function(){var x=qx.event.type.Mouse.prototype.getDocumentLeft.call(this);if(x==0&&this.getPointerType()==d&&this._native._original!==undefined){x=Math.round(this._native._original.changedTouches[0].pageX)||0;}
;return x;}
,getDocumentTop:function(){var y=qx.event.type.Mouse.prototype.getDocumentTop.call(this);if(y==0&&this.getPointerType()==d&&this._native._original!==undefined){y=Math.round(this._native._original.changedTouches[0].pageY)||0;}
;return y;}
,getPointerId:function(){return this._native.pointerId||0;}
,getWidth:function(){return this._native.width||0;}
,getHeight:function(){return this._native.height||0;}
,getPressure:function(){return this._native.pressure||0;}
,getTiltX:function(){return this._native.tiltX||0;}
,getTiltY:function(){return this._native.tiltY||0;}
,getOriginalTarget:function(){if(this._native&&this._native._original){var j=this._native._original;try{if(j.type.indexOf(d)==0){if(j.changedTouches[0]){return document.elementFromPoint(j.changedTouches[0].clientX,j.changedTouches[0].clientY);}
;}
;}
catch(k){return qx.bom.Event.getTarget(this._native);}
;return qx.bom.Event.getTarget(j);}
else if(this._native){return qx.bom.Event.getTarget(this._native);}
;return qx.event.type.Mouse.prototype.getOriginalTarget.call(this);}
,getPointerType:function(){if(typeof this._native.pointerType==g){return this._native.pointerType;}
;if(typeof this._native.pointerType==c){if(this._native.pointerType==this._native.MSPOINTER_TYPE_MOUSE){return b;}
;if(this._native.pointerType==this._native.MSPOINTER_TYPE_PEN){return f;}
;if(this._native.pointerType==this._native.MSPOINTER_TYPE_TOUCH){return d;}
;}
;return a;}
,isPrimary:function(){return !!this._native.isPrimary;}
}});}
)();
(function(){var a="mshtml",b="engine.name",c="pointerup",d="dispose",e="useraction",f="mouse",g="pointercancel",h="pointerdown",i="pointermove",j="qx.event.handler.Pointer",k="browser.documentmode",l="qxanonymous";qx.Class.define(j,{extend:qx.event.handler.PointerCore,implement:qx.event.IEventHandler,statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{pointermove:1,pointerover:1,pointerout:1,pointerdown:1,pointerup:1,pointercancel:1,gesturebegin:1,gesturemove:1,gesturefinish:1,gesturecancel:1},TARGET_CHECK:qx.event.IEventHandler.TARGET_DOMNODE+qx.event.IEventHandler.TARGET_DOCUMENT,IGNORE_CAN_HANDLE:true},construct:function(m){this.__gt=m;this.__cz=m.getWindow();this.__dd=this.__cz.document;qx.event.handler.PointerCore.apply(this,[this.__dd]);}
,members:{__gt:null,__cz:null,__dd:null,canHandleEvent:function(o,n){}
,registerEvent:function(r,q,p){}
,unregisterEvent:function(u,t,s){}
,_initPointerObserver:function(){var v=false;if(qx.core.Environment.get(b)==a&&qx.core.Environment.get(k)<9){v=true;}
;this._initObserver(this._onPointerEvent,v);}
,_fireEvent:function(w,x,y){if(!y){y=qx.bom.Event.getTarget(w);}
;while(y&&y.getAttribute&&y.getAttribute(l)){y=y.parentNode;}
;if(!x){x=w.type;}
;x=qx.event.handler.PointerCore.MSPOINTER_TO_POINTER_MAPPING[x]||x;if(y&&y.nodeType){qx.event.type.dom.Pointer.normalize(w);w.srcElement=y;qx.event.Registration.fireEvent(y,x,qx.event.type.Pointer,[w,y,null,true,true]);if((w.getPointerType()!==f||w.button<=qx.event.handler.PointerCore.LEFT_BUTTON)&&(x==h||x==c||x==i||x==g)){qx.event.Registration.fireEvent(this.__dd,qx.event.handler.PointerCore.POINTER_TO_GESTURE_MAPPING[x],qx.event.type.Pointer,[w,y,null,false,false]);}
;qx.event.Registration.fireEvent(this.__cz,e,qx.event.type.Data,[x]);}
;}
,_onPointerEvent:function(z){if(z._original&&z._original[this._processedFlag]){return;}
;var A=qx.event.handler.PointerCore.MSPOINTER_TO_POINTER_MAPPING[z.type]||z.type;this._fireEvent(z,A,qx.bom.Event.getTarget(z));}
,dispose:function(){this.__hh(d);this.__gt=this.__cz=this.__dd=null;}
,__hh:function(C,B){qx.event.handler.PointerCore.prototype[C].apply(this,B||[]);}
},defer:function(D){qx.event.Registration.addHandler(D);qx.event.Registration.getManager(document).getHandler(D);}
});}
)();
(function(){var a="qx.event.type.Tap";qx.Class.define(a,{extend:qx.event.type.Pointer});}
)();
(function(){var a="qx.event.type.Track";qx.Class.define(a,{extend:qx.event.type.Pointer,members:{_cloneNativeEvent:function(b,c){var c=qx.event.type.Pointer.prototype._cloneNativeEvent.call(this,b,c);c.delta=b.delta;return c;}
,getDelta:function(){return this._native.delta;}
}});}
)();
(function(){var a="qx.event.type.Swipe";qx.Class.define(a,{extend:qx.event.type.Pointer,members:{_cloneNativeEvent:function(b,c){var c=qx.event.type.Pointer.prototype._cloneNativeEvent.call(this,b,c);c.swipe=b.swipe;return c;}
,getStartTime:function(){return this._native.swipe.startTime;}
,getDuration:function(){return this._native.swipe.duration;}
,getAxis:function(){return this._native.swipe.axis;}
,getDirection:function(){return this._native.swipe.direction;}
,getVelocity:function(){return this._native.swipe.velocity;}
,getDistance:function(){return this._native.swipe.distance;}
}});}
)();
(function(){var a="qx.event.type.Rotate";qx.Class.define(a,{extend:qx.event.type.Pointer,members:{_cloneNativeEvent:function(b,c){var c=qx.event.type.Pointer.prototype._cloneNativeEvent.call(this,b,c);c.angle=b.angle;return c;}
,getAngle:function(){return this._native.angle;}
}});}
)();
(function(){var a="qx.event.type.Roll";qx.Class.define(a,{extend:qx.event.type.Pointer,members:{stop:function(){this.stopPropagation();this.preventDefault();}
,_cloneNativeEvent:function(b,c){var c=qx.event.type.Pointer.prototype._cloneNativeEvent.call(this,b,c);c.delta=b.delta;c.momentum=b.momentum;c.timeoutId=b.timeoutId;return c;}
,getMomentum:function(){return this._native.momentum;}
,stopMomentum:function(){if(this._native.timeoutId){qx.event.Registration.getManager(this._originalTarget).getHandler(qx.event.handler.Gesture).stopMomentum(this._native.timeoutId);}
;}
,getDelta:function(){return this._native.delta;}
}});}
)();
(function(){var a="qx.event.type.Pinch";qx.Class.define(a,{extend:qx.event.type.Pointer,members:{_cloneNativeEvent:function(b,c){var c=qx.event.type.Pointer.prototype._cloneNativeEvent.call(this,b,c);c.scale=b.scale;return c;}
,getScale:function(){return this._native.scale;}
}});}
)();
(function(){var a="swipe",b="pinch",c="event.dispatchevent",d="gesturemove",e="touch",f="longtap",g="event.mousewheel",h="roll",i="dblclick",j="wheel",k="rotate",l="trackstart",m="gesturefinish",n="y",o="browser.documentmode",p="dbltap",q="qx.event.handler.GestureCore",r="right",s="mshtml",t="engine.name",u="gesturecancel",v="gesturebegin",w="track",z="trackend",A="left",B="tap",C="down",D="x",E="up";qx.Bootstrap.define(q,{extend:Object,statics:{TYPES:[B,a,f,p,w,l,z,k,b,h],GESTURE_EVENTS:[v,m,d,u],TAP_MAX_DISTANCE:{"touch":40,"mouse":5,"pen":20},DOUBLETAP_MAX_DISTANCE:{"touch":10,"mouse":4,"pen":10},SWIPE_DIRECTION:{x:[A,r],y:[E,C]},LONGTAP_TIME:500,DOUBLETAP_TIME:500,ROLL_FACTOR:18},construct:function(F,G){this.__fA=F;this.__fB=G;this.__hi={};this.__hj={};this.__hk={};this._initObserver();}
,members:{__fA:null,__fB:null,__hi:null,__hl:null,__hm:null,__hn:null,__ho:null,__hj:null,__hp:null,__hk:null,__hq:null,_initObserver:function(){qx.event.handler.GestureCore.GESTURE_EVENTS.forEach(function(I){qxWeb(this.__fA).on(I,this.checkAndFireGesture,this);}
.bind(this));if(qx.core.Environment.get(t)==s&&qx.core.Environment.get(o)<9){qxWeb(this.__fA).on(i,this._onDblClick,this);}
;var H=qx.core.Environment.get(g);qxWeb(H.target).on(H.type,this._fireRoll,this);}
,_stopObserver:function(){qx.event.handler.GestureCore.GESTURE_EVENTS.forEach(function(K){qxWeb(this.__fA).off(K,this.checkAndFireGesture,this);}
.bind(this));if(qx.core.Environment.get(t)==s&&qx.core.Environment.get(o)<9){qxWeb(this.__fA).off(i,this._onDblClick,this);}
;var J=qx.core.Environment.get(g);qxWeb(J.target).off(J.type,this._fireRoll,this);}
,checkAndFireGesture:function(L,M,N){if(!M){M=L.type;}
;if(!N){N=qx.bom.Event.getTarget(L);}
;if(M==v){this.gestureBegin(L,N);}
else if(M==d){this.gestureMove(L,N);}
else if(M==m){this.gestureFinish(L,N);}
else if(M==u){this.gestureCancel(L.pointerId);}
;}
,gestureBegin:function(O,P){if(this.__hi[O.pointerId]){this.__hy(this.__hi[O.pointerId]);delete this.__hi[O.pointerId];}
;if(this._hasIntermediaryHandler(P)){return;}
;this.__hi[O.pointerId]={"startTime":new Date().getTime(),"lastEventTime":new Date().getTime(),"startX":O.clientX,"startY":O.clientY,"clientX":O.clientX,"clientY":O.clientY,"velocityX":0,"velocityY":0,"target":P,"isTap":true,"isPrimary":O.isPrimary,"longTapTimer":window.setTimeout(this.__hx.bind(this,O,P),qx.event.handler.GestureCore.LONGTAP_TIME)};if(O.isPrimary){this.__hn=false;this.__hm=P;this.__hu(l,O,P);}
else {this.__hn=true;if(Object.keys(this.__hi).length===2){this.__ho=this._calcAngle();this.__hq=this._calcDistance();}
;}
;}
,gestureMove:function(R,S){var T=this.__hi[R.pointerId];if(T){var Q=T.clientX;var U=T.clientY;T.clientX=R.clientX;T.clientY=R.clientY;T.lastEventTime=new Date().getTime();if(Q){T.velocityX=T.clientX-Q;}
;if(U){T.velocityY=T.clientY-U;}
;if(Object.keys(this.__hi).length===2){this.__hv(R,T.target);this.__hw(R,T.target);}
;if(!this.__hn){this.__hu(w,R,T.target);this._fireRoll(R,e,T.target);}
;if(T.isTap){T.isTap=this._isBelowTapMaxDistance(R);if(!T.isTap){this.__hy(T);}
;}
;}
;}
,_hasIntermediaryHandler:function(V){while(V&&V!==this.__fA){if(V.$$gestureHandler){return true;}
;V=V.parentNode;}
;return false;}
,gestureFinish:function(X,Y){if(!this.__hi[X.pointerId]){return;}
;var bf=this.__hi[X.pointerId];this.__hy(bf);if(this._hasIntermediaryHandler(Y)){return;}
;this.__hr(bf.velocityX,bf.velocityY,X,bf.target);this.__hu(z,X,bf.target);if(bf.isTap){if(Y!==bf.target){delete this.__hi[X.pointerId];return;}
;this._fireEvent(X,B,X.target||Y);var ba=false;if(Object.keys(this.__hj).length>0){var be=Date.now()-qx.event.handler.GestureCore.DOUBLETAP_TIME;for(var bg in this.__hj){if(bg<be){delete this.__hj[bg];}
else {var W=this.__hj[bg];var bc=this.__hs(W.x,W.y,X.clientX,X.clientY,X.getPointerType());var bd=W.target===(X.target||Y);var bh=W.button===X.button;if(bc&&bh&&bd){ba=true;delete this.__hj[bg];this._fireEvent(X,p,X.target||Y);}
;}
;}
;}
;if(!ba){this.__hj[Date.now()]={x:X.clientX,y:X.clientY,target:X.target||Y,button:X.button};}
;}
else if(!this._isBelowTapMaxDistance(X)){var bb=this.__ht(X,Y);if(bb){X.swipe=bb;this._fireEvent(X,a,bf.target||Y);}
;}
;delete this.__hi[X.pointerId];}
,stopMomentum:function(bi){this.__hk[bi]=true;}
,gestureCancel:function(bj){if(this.__hi[bj]){this.__hy(this.__hi[bj]);delete this.__hi[bj];}
;}
,updateGestureTarget:function(bk,bl){this.__hi[bk].target=bl;}
,__hr:function(bq,br,bn,bo,bt){var bs=bn.timeoutId;if((Math.abs(br)<1&&Math.abs(bq)<1)||this.__hk[bs]){delete this.__hk[bs];return;}
;if(!bt){bt=1;var bp=2.8;br=br/bp;bq=bq/bp;}
;bt+=0.0006;br=br/bt;bq=bq/bt;var bm=qx.bom.AnimationFrame.request(qx.lang.Function.bind(function(bu,bv,bw,bx,by){this.__hr(bu,bv,bw,bx,by);}
,this,bq,br,bn,bo,bt));bq=Math.round(bq*100)/100;br=Math.round(br*100)/100;bn.delta={x:-bq,y:-br};bn.momentum=true;bn.timeoutId=bm;this._fireEvent(bn,h,bn.target||bo);}
,_calcAngle:function(){var bA=null;var bB=null;for(var bz in this.__hi){var bC=this.__hi[bz];if(bA===null){bA=bC;}
else {bB=bC;}
;}
;var x=bA.clientX-bB.clientX;var y=bA.clientY-bB.clientY;return (360+Math.atan2(y,x)*(180/Math.PI))%360;}
,_calcDistance:function(){var bD=null;var bE=null;for(var bG in this.__hi){var bH=this.__hi[bG];if(bD===null){bD=bH;}
else {bE=bH;}
;}
;var bF=Math.sqrt(Math.pow(bD.clientX-bE.clientX,2)+Math.pow(bD.clientY-bE.clientY,2));return bF;}
,_isBelowTapMaxDistance:function(bJ){var bK=this._getDeltaCoordinates(bJ);var bI=qx.event.handler.GestureCore.TAP_MAX_DISTANCE[bJ.getPointerType()];if(!bK){return null;}
;return (Math.abs(bK.x)<=bI&&Math.abs(bK.y)<=bI);}
,__hs:function(bL,bP,bQ,bR,bS){var bO=qx.event.handler.GestureCore;var bM=Math.abs(bL-bQ)<bO.DOUBLETAP_MAX_DISTANCE[bS];var bN=Math.abs(bP-bR)<bO.DOUBLETAP_MAX_DISTANCE[bS];return bM&&bN;}
,_getDeltaCoordinates:function(bV){var bW=this.__hi[bV.pointerId];if(!bW){return null;}
;var bT=bV.clientX-bW.startX;var bU=bV.clientY-bW.startY;var bX=D;if(Math.abs(bT/bU)<1){bX=n;}
;return {"x":bT,"y":bU,"axis":bX};}
,_fireEvent:function(ca,cc,cb){if(!this.__fA){return;}
;var bY;if(qx.core.Environment.get(c)){bY=new qx.event.type.dom.Custom(cc,ca,{bubbles:true,swipe:ca.swipe,scale:ca.scale,angle:ca.angle,delta:ca.delta,pointerType:ca.pointerType,momentum:ca.momentum});cb.dispatchEvent(bY);}
else if(this.__fB){bY=new qx.event.type.dom.Custom(cc,ca,{target:this.__fA,currentTarget:this.__fA,srcElement:this.__fA,swipe:ca.swipe,scale:ca.scale,angle:ca.angle,delta:ca.delta,pointerType:ca.pointerType,momentum:ca.momentum});this.__fB.emit(cc,ca);}
;}
,_onDblClick:function(cd){var ce=qx.bom.Event.getTarget(cd);this._fireEvent(cd,B,ce);this._fireEvent(cd,p,ce);}
,__ht:function(ch,ci){var co=this.__hi[ch.pointerId];if(!co){return null;}
;var ck=qx.event.handler.GestureCore;var cn=this._getDeltaCoordinates(ch);var cl=new Date().getTime()-co.startTime;var cp=(Math.abs(cn.x)>=Math.abs(cn.y))?D:n;var cf=cn[cp];var cg=ck.SWIPE_DIRECTION[cp][cf<0?0:1];var cm=(cl!==0)?cf/cl:0;var cj={startTime:co.startTime,duration:cl,axis:cp,direction:cg,distance:cf,velocity:cm};return cj;}
,__hu:function(cq,cr,cs){cr.delta=this._getDeltaCoordinates(cr);this._fireEvent(cr,cq,cr.target||cs);}
,_fireRoll:function(cu,ct,cv){if(cu.type===qx.core.Environment.get(g).type){cu.delta={x:qx.util.Wheel.getDelta(cu,D)*qx.event.handler.GestureCore.ROLL_FACTOR,y:qx.util.Wheel.getDelta(cu,n)*qx.event.handler.GestureCore.ROLL_FACTOR};cu.delta.axis=Math.abs(cu.delta.x/cu.delta.y)<1?n:D;cu.pointerType=j;}
else {var cw=this.__hi[cu.pointerId];cu.delta={x:-cw.velocityX,y:-cw.velocityY,axis:Math.abs(cw.velocityX/cw.velocityY)<1?n:D};}
;this._fireEvent(cu,h,cu.target||cv);}
,__hv:function(cx,cz){if(!cx.isPrimary){var cy=this._calcAngle();cx.angle=Math.round((cy-this.__ho)%360);this._fireEvent(cx,k,this.__hm);}
;}
,__hw:function(cC,cD){if(!cC.isPrimary){var cA=this._calcDistance();var cB=cA/this.__hq;cC.scale=(Math.round(cB*100)/100);this._fireEvent(cC,b,this.__hm);}
;}
,__hx:function(cE,cF){var cG=this.__hi[cE.pointerId];if(cG){this._fireEvent(cE,f,cE.target||cF);cG.longTapTimer=null;cG.isTap=false;}
;}
,__hy:function(cH){if(cH.longTapTimer){window.clearTimeout(cH.longTapTimer);cH.longTapTimer=null;}
;}
,isBelowTapMaxDistance:function(event){var cI=this._calcDelta(event);var cJ=qx.event.handler.GestureCore;return (Math.abs(cI.x)<=cJ.TAP_MAX_DISTANCE&&Math.abs(cI.y)<=cJ.TAP_MAX_DISTANCE);}
,dispose:function(){for(var cK in this.__hi){this.__hy(cK);}
;this._stopObserver();this.__fA=this.__fB=null;}
}});}
)();
(function(){var a="x",b="y",c="qx.util.Wheel";qx.Bootstrap.define(c,{statics:{MAXSCROLL:null,MINSCROLL:null,FACTOR:1,getDelta:function(e,d){if(d===undefined){var f=0;if(e.wheelDelta!==undefined){f=-e.wheelDelta;}
else if(e.detail!==0){f=e.detail;}
else if(e.deltaY!==undefined){f=e.deltaY;}
;return this.__hz(f);}
;if(d===a){var x=0;if(e.wheelDelta!==undefined){if(e.wheelDeltaX!==undefined){x=e.wheelDeltaX?this.__hz(-e.wheelDeltaX):0;}
;}
else {if(e.axis&&e.axis==e.HORIZONTAL_AXIS&&(e.detail!==undefined)&&(e.detail>0)){x=this.__hz(e.detail);}
else if(e.deltaX!==undefined){x=this.__hz(e.deltaX);}
;}
;return x;}
;if(d===b){var y=0;if(e.wheelDelta!==undefined){if(e.wheelDeltaY!==undefined){y=e.wheelDeltaY?this.__hz(-e.wheelDeltaY):0;}
else {y=this.__hz(-e.wheelDelta);}
;}
else {if(!(e.axis&&e.axis==e.HORIZONTAL_AXIS)&&(e.detail!==undefined)&&(e.detail>0)){y=this.__hz(e.detail);}
else if(e.deltaY!==undefined){y=this.__hz(e.deltaY);}
;}
;return y;}
;return 0;}
,__hz:function(j){var g=Math.abs(j);if(g===0){return 0;}
;if(qx.util.Wheel.MINSCROLL==null||qx.util.Wheel.MINSCROLL>g){qx.util.Wheel.MINSCROLL=g;this.__hA();}
;if(qx.util.Wheel.MAXSCROLL==null||qx.util.Wheel.MAXSCROLL<g){qx.util.Wheel.MAXSCROLL=g;this.__hA();}
;if(qx.util.Wheel.MAXSCROLL===g&&qx.util.Wheel.MINSCROLL===g){return 2*(j/g);}
;var h=qx.util.Wheel.MAXSCROLL-qx.util.Wheel.MINSCROLL;var i=(j/h)*Math.log(h)*qx.util.Wheel.FACTOR;return i<0?Math.min(i,-1):Math.max(i,1);}
,__hA:function(){var k=qx.util.Wheel.MAXSCROLL||0;var n=qx.util.Wheel.MINSCROLL||k;if(k<=n){return;}
;var l=k-n;var m=(k/l)*Math.log(l);if(m==0){m=1;}
;qx.util.Wheel.FACTOR=6/m;}
}});}
)();
(function(){var a="dblclick",b="mshtml",c="engine.name",d="dispose",e="useraction",f="gesturemove",g="gesturecancel",h="checkAndFireGesture",i="gesturebegin",j="qx.event.handler.Gesture",k="gesturefinish",l="browser.documentmode";qx.Class.define(j,{extend:qx.event.handler.GestureCore,implement:qx.event.IEventHandler,statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{tap:1,swipe:1,longtap:1,dbltap:1,rotate:1,pinch:1,track:1,trackstart:1,trackend:1,roll:1},GESTURE_EVENTS:[i,k,f,g],TARGET_CHECK:qx.event.IEventHandler.TARGET_DOMNODE+qx.event.IEventHandler.TARGET_DOCUMENT,IGNORE_CAN_HANDLE:true,EVENT_CLASSES:{"tap":qx.event.type.Tap,"longtap":qx.event.type.Tap,"dbltap":qx.event.type.Tap,"swipe":qx.event.type.Swipe,"rotate":qx.event.type.Rotate,"pinch":qx.event.type.Pinch,"track":qx.event.type.Track,"trackstart":qx.event.type.Track,"trackend":qx.event.type.Track,"roll":qx.event.type.Roll}},construct:function(m){this.__gt=m;this.__cz=m.getWindow();this.__dd=this.__cz.document;qx.event.handler.GestureCore.apply(this,[this.__dd]);}
,members:{__gt:null,__cz:null,__dd:null,__fu:null,__hB:null,__hC:null,canHandleEvent:function(o,n){}
,registerEvent:function(r,q,p){}
,unregisterEvent:function(u,t,s){}
,_initObserver:function(){this.__fu=qx.lang.Function.listener(this.checkAndFireGesture,this);qx.event.handler.Gesture.GESTURE_EVENTS.forEach(function(w){qx.event.Registration.addListener(this.__dd,w,this.__fu,this);}
.bind(this));if(qx.core.Environment.get(c)==b&&qx.core.Environment.get(l)<9){this.__hB=qx.lang.Function.listener(this._onDblClick,this);qx.bom.Event.addNativeListener(this.__dd,a,this.__hB);}
;var v=qx.bom.client.Event.getMouseWheel(this.__cz);this.__hC=qx.lang.Function.listener(this._fireRoll,this);qx.bom.Event.addNativeListener(v.target,v.type,this.__hC,this);}
,checkAndFireGesture:function(y,x,z){this.__hh(h,[y.getNativeEvent(),y.getType(),y.getTarget()]);}
,_stopObserver:function(){qx.event.handler.Gesture.GESTURE_EVENTS.forEach(function(B){qx.event.Registration.removeListener(this.__dd,B,this.__fu);}
.bind(this));if(qx.core.Environment.get(c)==b&&qx.core.Environment.get(l)<9){qx.bom.Event.removeNativeListener(this.__dd,a,this.__hB);}
;var A=qx.bom.client.Event.getMouseWheel(this.__cz);qx.bom.Event.removeNativeListener(A.target,A.type,this.__hC);}
,_hasIntermediaryHandler:function(C){return false;}
,_fireEvent:function(E,D,F){if(!F){F=qx.bom.Event.getTarget(E);}
;if(!D){D=E.type;}
;var G=qx.event.handler.Gesture.EVENT_CLASSES[D]||qx.event.type.Pointer;if(F&&F.nodeType){qx.event.Registration.fireEvent(F,D,G,[E,F,null,true,true]);}
;qx.event.Registration.fireEvent(this.__cz,e,qx.event.type.Data,[D]);}
,dispose:function(){this._stopObserver();this.__hh(d);this.__gt=this.__cz=this.__dd=this.__hB=null;}
,__hh:function(I,H){qx.event.handler.GestureCore.prototype[I].apply(this,H||[]);}
},defer:function(J){qx.event.Registration.addHandler(J);qx.event.Registration.getManager(document).getHandler(J);}
});}
)();
(function(){var a="-",b="qx.event.handler.Element",c="load",d="iframe";qx.Class.define(b,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(e){qx.core.Object.call(this);this._manager=e;this._registeredEvents={};}
,statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{abort:true,load:true,scroll:true,select:true,reset:true,submit:true},CANCELABLE:{selectstart:true},TARGET_CHECK:qx.event.IEventHandler.TARGET_DOMNODE,IGNORE_CAN_HANDLE:false},members:{canHandleEvent:function(g,f){if(f===c){return g.tagName.toLowerCase()!==d;}
else {return true;}
;}
,registerEvent:function(j,l,i){var m=qx.core.ObjectRegistry.toHashCode(j);var h=m+a+l;var k=qx.lang.Function.listener(this._onNative,this,h);qx.bom.Event.addNativeListener(j,l,k);this._registeredEvents[h]={element:j,type:l,listener:k};}
,unregisterEvent:function(p,r,o){var s=this._registeredEvents;if(!s){return;}
;var t=qx.core.ObjectRegistry.toHashCode(p);var n=t+a+r;var q=this._registeredEvents[n];if(q){qx.bom.Event.removeNativeListener(p,r,q.listener);}
;delete this._registeredEvents[n];}
,_onNative:qx.event.GlobalError.observeMethod(function(v,u){var w=this._registeredEvents;if(!w){return;}
;var y=w[u];var x=this.constructor.CANCELABLE[y.type];qx.event.Registration.fireNonBubblingEvent(y.element,y.type,qx.event.type.Native,[v,undefined,undefined,undefined,x]);}
)},destruct:function(){var z;var A=this._registeredEvents;for(var B in A){z=A[B];qx.bom.Event.removeNativeListener(z.element,z.type,z.listener);}
;this._manager=this._registeredEvents=null;}
,defer:function(C){qx.event.Registration.addHandler(C);}
});}
)();
(function(){var a="qx.event.handler.UserAction";qx.Class.define(a,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(b){qx.core.Object.call(this);this.__gt=b;this.__cz=b.getWindow();}
,statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{useraction:1},TARGET_CHECK:qx.event.IEventHandler.TARGET_WINDOW,IGNORE_CAN_HANDLE:true},members:{__gt:null,__cz:null,canHandleEvent:function(d,c){}
,registerEvent:function(g,f,e){}
,unregisterEvent:function(j,i,h){}
},destruct:function(){this.__gt=this.__cz=null;}
,defer:function(k){qx.event.Registration.addHandler(k);}
});}
)();
(function(){var a="dblclick",b="os.name",c="mouseup",d="mousedown",e="useraction",f="webkit",g="contextmenu",h="mousewheel",i="engine.name",j="mouseover",k="mouseout",l="gecko",m="ios",n="click",o="mousemove",p="qx.event.handler.Mouse",q="on";qx.Class.define(p,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(r){qx.core.Object.call(this);this.__gt=r;this.__cz=r.getWindow();this.__dd=this.__cz.document;this._initButtonObserver();this._initMoveObserver();this._initWheelObserver();}
,statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{mousemove:1,mouseover:1,mouseout:1,mousedown:1,mouseup:1,click:1,dblclick:1,contextmenu:1,mousewheel:1},TARGET_CHECK:qx.event.IEventHandler.TARGET_DOMNODE+qx.event.IEventHandler.TARGET_DOCUMENT+qx.event.IEventHandler.TARGET_WINDOW,IGNORE_CAN_HANDLE:true},members:{__hD:null,__hE:null,__hF:null,__hG:null,__hH:null,__gt:null,__cz:null,__dd:null,__hI:null,canHandleEvent:function(t,s){}
,registerEvent:qx.core.Environment.get(b)===m?function(w,v,u){w[q+v]=(function(){return null;}
);}
:(function(){return null;}
),unregisterEvent:qx.core.Environment.get(b)===m?function(z,y,x){z[q+y]=undefined;}
:(function(){return null;}
),__hJ:function(A,B,C){if(!C){C=qx.bom.Event.getTarget(A);}
;if(C&&C.nodeType){qx.event.Registration.fireEvent(C,B||A.type,B==h?qx.event.type.MouseWheel:qx.event.type.Mouse,[A,C,null,true,true]);}
;qx.event.Registration.fireEvent(this.__cz,e,qx.event.type.Data,[B||A.type]);}
,preventNextClick:function(){this.__hI=true;}
,_initButtonObserver:function(){this.__hD=qx.lang.Function.listener(this._onButtonEvent,this);var Event=qx.bom.Event;Event.addNativeListener(this.__dd,d,this.__hD);Event.addNativeListener(this.__dd,c,this.__hD);Event.addNativeListener(this.__dd,n,this.__hD);Event.addNativeListener(this.__dd,a,this.__hD);Event.addNativeListener(this.__dd,g,this.__hD);}
,_initMoveObserver:function(){this.__hE=qx.lang.Function.listener(this._onMoveEvent,this);var Event=qx.bom.Event;Event.addNativeListener(this.__dd,o,this.__hE);Event.addNativeListener(this.__dd,j,this.__hE);Event.addNativeListener(this.__dd,k,this.__hE);}
,_initWheelObserver:function(){this.__hF=qx.lang.Function.listener(this._onWheelEvent,this);var D=qx.bom.client.Event.getMouseWheel(this.__cz);qx.bom.Event.addNativeListener(D.target,D.type,this.__hF);}
,_stopButtonObserver:function(){var Event=qx.bom.Event;Event.removeNativeListener(this.__dd,d,this.__hD);Event.removeNativeListener(this.__dd,c,this.__hD);Event.removeNativeListener(this.__dd,n,this.__hD);Event.removeNativeListener(this.__dd,a,this.__hD);Event.removeNativeListener(this.__dd,g,this.__hD);}
,_stopMoveObserver:function(){var Event=qx.bom.Event;Event.removeNativeListener(this.__dd,o,this.__hE);Event.removeNativeListener(this.__dd,j,this.__hE);Event.removeNativeListener(this.__dd,k,this.__hE);}
,_stopWheelObserver:function(){var E=qx.bom.client.Event.getMouseWheel(this.__cz);qx.bom.Event.removeNativeListener(E.target,E.type,this.__hF);}
,_onMoveEvent:qx.event.GlobalError.observeMethod(function(F){this.__hJ(F);}
),_onButtonEvent:qx.event.GlobalError.observeMethod(function(I){var H=I.type;var J=qx.bom.Event.getTarget(I);if(H==n&&this.__hI){delete this.__hI;return;}
;if(qx.core.Environment.get(i)==l||qx.core.Environment.get(i)==f){if(J&&J.nodeType==3){J=J.parentNode;}
;}
;var G=qx.event.handler.DragDrop&&this.__gt.getHandler(qx.event.handler.DragDrop).isSessionActive();if(G&&H==n){return;}
;if(this.__hL){this.__hL(I,H,J);}
;this.__hJ(I,H,J);if(this.__hK){this.__hK(I,H,J);}
;if(this.__hM&&!G){this.__hM(I,H,J);}
;this.__hG=H;}
),_onWheelEvent:qx.event.GlobalError.observeMethod(function(K){this.__hJ(K,h);}
),__hK:qx.core.Environment.select(i,{"opera":function(L,M,N){if(M==c&&L.button==2){this.__hJ(L,g,N);}
;}
,"default":null}),__hL:qx.core.Environment.select(i,{"mshtml":function(O,P,Q){if(O.target!==undefined){return;}
;if(P==c&&this.__hG==n){this.__hJ(O,d,Q);}
else if(P==a){this.__hJ(O,n,Q);}
;}
,"default":null}),__hM:qx.core.Environment.select(i,{"mshtml":null,"default":function(S,R,T){switch(R){case d:this.__hH=T;break;case c:if(T!==this.__hH){var U=qx.dom.Hierarchy.getCommonParent(T,this.__hH);if(U){this.__hJ(S,n,U);}
;}
;};}
})},destruct:function(){this._stopButtonObserver();this._stopMoveObserver();this._stopWheelObserver();this.__gt=this.__cz=this.__dd=this.__hH=null;}
,defer:function(V){qx.event.Registration.addHandler(V);}
});}
)();
(function(){var a="qx.event.type.MouseWheel";qx.Class.define(a,{extend:qx.event.type.Mouse,members:{stop:function(){this.stopPropagation();this.preventDefault();}
,getWheelDelta:function(b){return qx.util.Wheel.getDelta(this._native,b);}
}});}
)();
(function(){var a="mshtml",b="engine.name",c="keypress",d="useraction",e="win",f="text",g="keyinput",h="os.name",i="webkit",j="input",k="gecko",l="off",m="keydown",n="autoComplete",o="keyup",p="qx.event.handler.Keyboard";qx.Class.define(p,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(q){qx.core.Object.call(this);this.__gt=q;this.__cz=q.getWindow();if((qx.core.Environment.get(b)==k)){this.__dd=this.__cz;}
else {this.__dd=this.__cz.document.documentElement;}
;this.__hN={};this._initKeyObserver();}
,statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{keyup:1,keydown:1,keypress:1,keyinput:1},TARGET_CHECK:qx.event.IEventHandler.TARGET_DOMNODE,IGNORE_CAN_HANDLE:true},members:{__hO:null,__gt:null,__cz:null,__dd:null,__hN:null,__hP:null,__hQ:null,__hR:null,canHandleEvent:function(s,r){}
,registerEvent:function(v,u,t){}
,unregisterEvent:function(y,x,w){}
,_fireInputEvent:function(A,z){var B=this.__hS();if(B&&B.offsetWidth!=0){var event=qx.event.Registration.createEvent(g,qx.event.type.KeyInput,[A,B,z]);this.__gt.dispatchEvent(B,event);}
;if(this.__cz){qx.event.Registration.fireEvent(this.__cz,d,qx.event.type.Data,[g]);}
;}
,_fireSequenceEvent:function(D,F,C){var E=this.__hS();var G=D.keyCode;var event=qx.event.Registration.createEvent(F,qx.event.type.KeySequence,[D,E,C]);this.__gt.dispatchEvent(E,event);if(qx.core.Environment.get(b)==a||qx.core.Environment.get(b)==i){if(F==m&&event.getDefaultPrevented()){if(!qx.event.util.Keyboard.isNonPrintableKeyCode(G)&&!this._emulateKeyPress[G]){this._fireSequenceEvent(D,c,C);}
;}
;}
;if(this.__cz){qx.event.Registration.fireEvent(this.__cz,d,qx.event.type.Data,[F]);}
;}
,__hS:function(){var H=this.__gt.getHandler(qx.event.handler.Focus);var I=H.getActive();if(!I||I.offsetWidth==0){I=H.getFocus();}
;if(!I||I.offsetWidth==0){I=this.__gt.getWindow().document.body;}
;return I;}
,_initKeyObserver:function(){this.__hO=qx.lang.Function.listener(this.__hT,this);this.__hR=qx.lang.Function.listener(this.__hV,this);var Event=qx.bom.Event;Event.addNativeListener(this.__dd,o,this.__hO);Event.addNativeListener(this.__dd,m,this.__hO);Event.addNativeListener(this.__dd,c,this.__hR);}
,_stopKeyObserver:function(){var Event=qx.bom.Event;Event.removeNativeListener(this.__dd,o,this.__hO);Event.removeNativeListener(this.__dd,m,this.__hO);Event.removeNativeListener(this.__dd,c,this.__hR);for(var K in (this.__hQ||{})){var J=this.__hQ[K];Event.removeNativeListener(J.target,c,J.callback);}
;delete (this.__hQ);}
,__hT:qx.event.GlobalError.observeMethod(qx.core.Environment.select(b,{"mshtml":function(N){N=window.event||N;var O=N.keyCode;var M=0;var L=N.type;if(!(this.__hN[O]==m&&L==m)){this._idealKeyHandler(O,M,L,N);}
;if(L==m){if(qx.event.util.Keyboard.isNonPrintableKeyCode(O)||this._emulateKeyPress[O]){this._idealKeyHandler(O,M,c,N);}
;}
;this.__hN[O]=L;}
,"gecko":function(Q){var S=0;var U=Q.keyCode;var T=Q.type;var R=qx.event.util.Keyboard;if(qx.core.Environment.get(h)==e){var P=U?R.keyCodeToIdentifier(U):R.charCodeToIdentifier(S);if(!(this.__hN[P]==m&&T==m)){this._idealKeyHandler(U,S,T,Q);}
;this.__hN[P]=T;}
else {this._idealKeyHandler(U,S,T,Q);}
;this.__hU(Q.target,T,U);}
,"webkit":function(X){var Y=0;var W=0;var V=X.type;Y=X.keyCode;this._idealKeyHandler(Y,W,V,X);if(V==m){if(qx.event.util.Keyboard.isNonPrintableKeyCode(Y)||this._emulateKeyPress[Y]){this._idealKeyHandler(Y,W,c,X);}
;}
;this.__hN[Y]=V;}
,"opera":function(ba){this.__hP=ba.keyCode;this._idealKeyHandler(ba.keyCode,0,ba.type,ba);}
})),__hU:qx.core.Environment.select(b,{"gecko":function(bc,be,bf){if(be===m&&(bf==33||bf==34||bf==38||bf==40)&&bc.type==f&&bc.tagName.toLowerCase()===j&&bc.getAttribute(n)!==l){if(!this.__hQ){this.__hQ={};}
;var bb=qx.core.ObjectRegistry.toHashCode(bc);if(this.__hQ[bb]){return;}
;var self=this;this.__hQ[bb]={target:bc,callback:function(bg){qx.bom.Event.stopPropagation(bg);self.__hV(bg);}
};var bd=qx.event.GlobalError.observeMethod(this.__hQ[bb].callback);qx.bom.Event.addNativeListener(bc,c,bd);}
;}
,"default":null}),__hV:qx.event.GlobalError.observeMethod(qx.core.Environment.select(b,{"mshtml":function(bh){bh=window.event||bh;if(this._charCode2KeyCode[bh.keyCode]){this._idealKeyHandler(this._charCode2KeyCode[bh.keyCode],0,bh.type,bh);}
else {this._idealKeyHandler(0,bh.keyCode,bh.type,bh);}
;}
,"gecko":function(bi){var bj=bi.charCode;var bk=bi.type;this._idealKeyHandler(bi.keyCode,bj,bk,bi);}
,"webkit":function(bl){if(this._charCode2KeyCode[bl.keyCode]){this._idealKeyHandler(this._charCode2KeyCode[bl.keyCode],0,bl.type,bl);}
else {this._idealKeyHandler(0,bl.keyCode,bl.type,bl);}
;}
,"opera":function(bm){var bo=bm.keyCode;var bn=bm.type;if(bo!=this.__hP){this._idealKeyHandler(0,this.__hP,bn,bm);}
else {if(qx.event.util.Keyboard.keyCodeToIdentifierMap[bm.keyCode]){this._idealKeyHandler(bm.keyCode,0,bm.type,bm);}
else {this._idealKeyHandler(0,bm.keyCode,bm.type,bm);}
;}
;}
})),_idealKeyHandler:function(bs,bq,bt,br){var bp;if(bs||(!bs&&!bq)){bp=qx.event.util.Keyboard.keyCodeToIdentifier(bs);this._fireSequenceEvent(br,bt,bp);}
else {bp=qx.event.util.Keyboard.charCodeToIdentifier(bq);this._fireSequenceEvent(br,c,bp);this._fireInputEvent(br,bq);}
;}
,_emulateKeyPress:qx.core.Environment.select(b,{"mshtml":{'8':true,'9':true},"webkit":{'8':true,'9':true,'27':true},"default":{}}),_identifierToKeyCode:function(bu){return qx.event.util.Keyboard.identifierToKeyCodeMap[bu]||bu.charCodeAt(0);}
},destruct:function(){this._stopKeyObserver();this.__hP=this.__gt=this.__cz=this.__dd=this.__hN=null;}
,defer:function(bv,bw){qx.event.Registration.addHandler(bv);if((qx.core.Environment.get(b)==a)||qx.core.Environment.get(b)==i){bw._charCode2KeyCode={'13':13,'27':27};}
;}
});}
)();
(function(){var a="qx.event.type.KeyInput";qx.Class.define(a,{extend:qx.event.type.Dom,members:{init:function(c,d,b){qx.event.type.Dom.prototype.init.call(this,c,d,null,true,true);this._charCode=b;return this;}
,clone:function(e){var f=qx.event.type.Dom.prototype.clone.call(this,e);f._charCode=this._charCode;return f;}
,getCharCode:function(){return this._charCode;}
,getChar:function(){return String.fromCharCode(this._charCode);}
}});}
)();
(function(){var a="qx.event.type.KeySequence";qx.Class.define(a,{extend:qx.event.type.Dom,members:{init:function(c,d,b){qx.event.type.Dom.prototype.init.call(this,c,d,null,true,true);this._keyCode=c.keyCode;this._identifier=b;return this;}
,clone:function(e){var f=qx.event.type.Dom.prototype.clone.call(this,e);f._keyCode=this._keyCode;f._identifier=this._identifier;return f;}
,getKeyIdentifier:function(){return this._identifier;}
,getKeyCode:function(){return this._keyCode;}
,isPrintable:function(){return qx.event.util.Keyboard.isPrintableKeyIdentifier(this._identifier);}
}});}
)();
(function(){var a="-",b="PageUp",c="Escape",d="Enter",e="+",f="PrintScreen",g="os.name",h="7",i="A",j="Space",k="Left",l="5",m="F5",n="Down",o="Up",p="3",q="Meta",r="F11",s="0",t="F6",u="PageDown",v="osx",w="CapsLock",x="Insert",y="F8",z="Scroll",A="Control",B="Tab",C="Shift",D="End",E="Pause",F="Unidentified",G="/",H="8",I="Z",J="*",K="cmd",L="F1",M="F4",N="Home",O="qx.event.util.Keyboard",P="F2",Q="6",R="F7",S="Apps",T="4",U="F12",V="Alt",W="2",X="NumLock",Y="Delete",bn="1",bo="Win",bp="Backspace",bj="F9",bk="F10",bl="Right",bm="F3",bq="9",br=",";qx.Bootstrap.define(O,{statics:{specialCharCodeMap:{'8':bp,'9':B,'13':d,'27':c,'32':j},numpadToCharCode:{'96':s.charCodeAt(0),'97':bn.charCodeAt(0),'98':W.charCodeAt(0),'99':p.charCodeAt(0),'100':T.charCodeAt(0),'101':l.charCodeAt(0),'102':Q.charCodeAt(0),'103':h.charCodeAt(0),'104':H.charCodeAt(0),'105':bq.charCodeAt(0),'106':J.charCodeAt(0),'107':e.charCodeAt(0),'109':a.charCodeAt(0),'110':br.charCodeAt(0),'111':G.charCodeAt(0)},keyCodeToIdentifierMap:{'16':C,'17':A,'18':V,'20':w,'224':q,'37':k,'38':o,'39':bl,'40':n,'33':b,'34':u,'35':D,'36':N,'45':x,'46':Y,'112':L,'113':P,'114':bm,'115':M,'116':m,'117':t,'118':R,'119':y,'120':bj,'121':bk,'122':r,'123':U,'144':X,'44':f,'145':z,'19':E,'91':qx.core.Environment.get(g)==v?K:bo,'92':bo,'93':qx.core.Environment.get(g)==v?K:S},charCodeA:i.charCodeAt(0),charCodeZ:I.charCodeAt(0),charCode0:s.charCodeAt(0),charCode9:bq.charCodeAt(0),keyCodeToIdentifier:function(bs){if(this.isIdentifiableKeyCode(bs)){var bt=this.numpadToCharCode[bs];if(bt){return String.fromCharCode(bt);}
;return (this.keyCodeToIdentifierMap[bs]||this.specialCharCodeMap[bs]||String.fromCharCode(bs));}
else {return F;}
;}
,charCodeToIdentifier:function(bu){return this.specialCharCodeMap[bu]||String.fromCharCode(bu).toUpperCase();}
,isIdentifiableKeyCode:function(bv){if(bv>=this.charCodeA&&bv<=this.charCodeZ){return true;}
;if(bv>=this.charCode0&&bv<=this.charCode9){return true;}
;if(this.specialCharCodeMap[bv]){return true;}
;if(this.numpadToCharCode[bv]){return true;}
;if(this.isNonPrintableKeyCode(bv)){return true;}
;return false;}
,isNonPrintableKeyCode:function(bw){return this.keyCodeToIdentifierMap[bw]?true:false;}
,isValidKeyIdentifier:function(bx){if(this.identifierToKeyCodeMap[bx]){return true;}
;if(bx.length!=1){return false;}
;if(bx>=s&&bx<=bq){return true;}
;if(bx>=i&&bx<=I){return true;}
;switch(bx){case e:case a:case J:case G:case br:return true;default:return false;};}
,isPrintableKeyIdentifier:function(by){if(by===j){return true;}
else {return this.identifierToKeyCodeMap[by]?false:true;}
;}
},defer:function(bz,bA){if(!bz.identifierToKeyCodeMap){bz.identifierToKeyCodeMap={};for(var bB in bz.keyCodeToIdentifierMap){bz.identifierToKeyCodeMap[bz.keyCodeToIdentifierMap[bB]]=parseInt(bB,10);}
;for(var bB in bz.specialCharCodeMap){bz.identifierToKeyCodeMap[bz.specialCharCodeMap[bB]]=parseInt(bB,10);}
;}
;}
});}
)();
(function(){var a="selectstart",b="os.name",c="blur",d="mousedown",e="focus",f="os.version",g="qx.event.handler.Focus",h="_applyFocus",i="DOMFocusIn",j="deactivate",k="textarea",l="_applyActive",m='character',n="input",o="ios",p="",q="qxSelectable",r="tabIndex",s="off",t="on",u="activate",v="focusin",w="mshtml",x="engine.name",y="mouseup",z="DOMFocusOut",A="focusout",B="qxKeepFocus",C="draggesture",D="qxKeepActive";qx.Class.define(g,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(E){qx.core.Object.call(this);this._manager=E;this._window=E.getWindow();this._document=this._window.document;this._root=this._document.documentElement;this._body=this._document.body;if((qx.core.Environment.get(b)==o&&parseFloat(qx.core.Environment.get(f))>6)&&(!qx.application.Inline||!qx.core.Init.getApplication() instanceof qx.application.Inline)){this.__hW=true;}
;this._initObserver();}
,properties:{active:{apply:l,nullable:true},focus:{apply:h,nullable:true}},statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{focus:1,blur:1,focusin:1,focusout:1,activate:1,deactivate:1},IGNORE_CAN_HANDLE:true,FOCUSABLE_ELEMENTS:qx.core.Environment.select(x,{"mshtml":{a:1,body:1,button:1,frame:1,iframe:1,img:1,input:1,object:1,select:1,textarea:1},"gecko":{a:1,body:1,button:1,frame:1,iframe:1,img:1,input:1,object:1,select:1,textarea:1},"opera":{button:1,input:1,select:1,textarea:1},"webkit":{button:1,input:1,select:1,textarea:1}})},members:{__hX:null,__hY:null,__ia:null,__ib:null,__ic:null,__id:null,__ie:null,__if:null,__ig:null,__ih:null,__ii:p,__ij:p,__hW:false,__ik:null,canHandleEvent:function(G,F){}
,registerEvent:function(J,I,H){}
,unregisterEvent:function(M,L,K){}
,focus:function(N){if((qx.core.Environment.get(x)==w)){window.setTimeout(function(){try{N.focus();var O=qx.bom.Selection.get(N);if(O.length==0){var P=N.createTextRange();P.moveStart(m,N.value.length);P.collapse();P.select();}
;}
catch(Q){}
;}
,0);}
else {try{N.focus();}
catch(R){}
;}
;this.setFocus(N);this.setActive(N);}
,activate:function(S){this.setActive(S);}
,blur:function(T){try{T.blur();}
catch(U){}
;if(this.getActive()===T){this.resetActive();}
;if(this.getFocus()===T){this.resetFocus();}
;}
,deactivate:function(V){if(this.getActive()===V){this.resetActive();}
;}
,tryActivate:function(X){var W=this.__iy(X);if(W){this.setActive(W);}
;}
,__hJ:function(Y,bb,be,bd){var bc=qx.event.Registration;var ba=bc.createEvent(be,qx.event.type.Focus,[Y,bb,bd]);bc.dispatchEvent(Y,ba);}
,_windowFocused:true,__il:function(){if(this._windowFocused){this._windowFocused=false;this.__hJ(this._window,null,c,false);}
;}
,__im:function(){if(!this._windowFocused){this._windowFocused=true;this.__hJ(this._window,null,e,false);}
;}
,_initObserver:qx.core.Environment.select(x,{"gecko":function(){this.__hX=qx.lang.Function.listener(this.__is,this);this.__hY=qx.lang.Function.listener(this.__it,this);this.__ia=qx.lang.Function.listener(this.__ir,this);this.__ib=qx.lang.Function.listener(this.__iq,this);this.__ic=qx.lang.Function.listener(this.__in,this);qx.bom.Event.addNativeListener(this._document,d,this.__hX,true);qx.bom.Event.addNativeListener(this._document,y,this.__hY,true);qx.bom.Event.addNativeListener(this._window,e,this.__ia,true);qx.bom.Event.addNativeListener(this._window,c,this.__ib,true);qx.bom.Event.addNativeListener(this._window,C,this.__ic,true);}
,"mshtml":function(){this.__hX=qx.lang.Function.listener(this.__is,this);this.__hY=qx.lang.Function.listener(this.__it,this);this.__ie=qx.lang.Function.listener(this.__io,this);this.__if=qx.lang.Function.listener(this.__ip,this);this.__id=qx.lang.Function.listener(this.__iv,this);qx.bom.Event.addNativeListener(this._document,d,this.__hX);qx.bom.Event.addNativeListener(this._document,y,this.__hY);qx.bom.Event.addNativeListener(this._document,v,this.__ie);qx.bom.Event.addNativeListener(this._document,A,this.__if);qx.bom.Event.addNativeListener(this._document,a,this.__id);}
,"webkit":function(){this.__hX=qx.lang.Function.listener(this.__is,this);this.__hY=qx.lang.Function.listener(this.__it,this);this.__if=qx.lang.Function.listener(this.__ip,this);this.__ia=qx.lang.Function.listener(this.__ir,this);this.__ib=qx.lang.Function.listener(this.__iq,this);this.__id=qx.lang.Function.listener(this.__iv,this);qx.bom.Event.addNativeListener(this._document,d,this.__hX,true);qx.bom.Event.addNativeListener(this._document,y,this.__hY,true);qx.bom.Event.addNativeListener(this._document,a,this.__id,false);qx.bom.Event.addNativeListener(this._window,z,this.__if,true);qx.bom.Event.addNativeListener(this._window,e,this.__ia,true);qx.bom.Event.addNativeListener(this._window,c,this.__ib,true);}
,"opera":function(){this.__hX=qx.lang.Function.listener(this.__is,this);this.__hY=qx.lang.Function.listener(this.__it,this);this.__ie=qx.lang.Function.listener(this.__io,this);this.__if=qx.lang.Function.listener(this.__ip,this);qx.bom.Event.addNativeListener(this._document,d,this.__hX,true);qx.bom.Event.addNativeListener(this._document,y,this.__hY,true);qx.bom.Event.addNativeListener(this._window,i,this.__ie,true);qx.bom.Event.addNativeListener(this._window,z,this.__if,true);}
}),_stopObserver:qx.core.Environment.select(x,{"gecko":function(){qx.bom.Event.removeNativeListener(this._document,d,this.__hX,true);qx.bom.Event.removeNativeListener(this._document,y,this.__hY,true);qx.bom.Event.removeNativeListener(this._window,e,this.__ia,true);qx.bom.Event.removeNativeListener(this._window,c,this.__ib,true);qx.bom.Event.removeNativeListener(this._window,C,this.__ic,true);}
,"mshtml":function(){qx.bom.Event.removeNativeListener(this._document,d,this.__hX);qx.bom.Event.removeNativeListener(this._document,y,this.__hY);qx.bom.Event.removeNativeListener(this._document,v,this.__ie);qx.bom.Event.removeNativeListener(this._document,A,this.__if);qx.bom.Event.removeNativeListener(this._document,a,this.__id);}
,"webkit":function(){qx.bom.Event.removeNativeListener(this._document,d,this.__hX,true);qx.bom.Event.removeNativeListener(this._document,y,this.__hY,true);qx.bom.Event.removeNativeListener(this._document,a,this.__id,false);qx.bom.Event.removeNativeListener(this._window,z,this.__if,true);qx.bom.Event.removeNativeListener(this._window,e,this.__ia,true);qx.bom.Event.removeNativeListener(this._window,c,this.__ib,true);}
,"opera":function(){qx.bom.Event.removeNativeListener(this._document,d,this.__hX,true);qx.bom.Event.removeNativeListener(this._document,y,this.__hY,true);qx.bom.Event.removeNativeListener(this._window,i,this.__ie,true);qx.bom.Event.removeNativeListener(this._window,z,this.__if,true);}
}),__in:qx.event.GlobalError.observeMethod(qx.core.Environment.select(x,{"gecko":function(bf){var bg=qx.bom.Event.getTarget(bf);if(!this.__iz(bg)){qx.bom.Event.preventDefault(bf);}
;}
,"default":null})),__io:qx.event.GlobalError.observeMethod(qx.core.Environment.select(x,{"mshtml":function(bi){this.__im();var bj=qx.bom.Event.getTarget(bi);var bh=this.__ix(bj);if(bh){this.setFocus(bh);}
;this.tryActivate(bj);}
,"opera":function(bk){var bl=qx.bom.Event.getTarget(bk);if(bl==this._document||bl==this._window){this.__im();if(this.__ig){this.setFocus(this.__ig);delete this.__ig;}
;if(this.__ih){this.setActive(this.__ih);delete this.__ih;}
;}
else {this.setFocus(bl);this.tryActivate(bl);if(!this.__iz(bl)){bl.selectionStart=0;bl.selectionEnd=0;}
;}
;}
,"default":null})),__ip:qx.event.GlobalError.observeMethod(qx.core.Environment.select(x,{"mshtml":function(bm){var bn=qx.bom.Event.getRelatedTarget(bm);if(bn==null){this.__il();this.resetFocus();this.resetActive();}
;}
,"webkit":function(bo){var bp=qx.bom.Event.getTarget(bo);if(bp===this.getFocus()){this.resetFocus();}
;if(bp===this.getActive()){this.resetActive();}
;}
,"opera":function(bq){var br=qx.bom.Event.getTarget(bq);if(br==this._document){this.__il();this.__ig=this.getFocus();this.__ih=this.getActive();this.resetFocus();this.resetActive();}
else {if(br===this.getFocus()){this.resetFocus();}
;if(br===this.getActive()){this.resetActive();}
;}
;}
,"default":null})),__iq:qx.event.GlobalError.observeMethod(qx.core.Environment.select(x,{"gecko":function(bs){var bt=qx.bom.Event.getTarget(bs);if(bt===this._window||bt===this._document){this.__il();this.resetActive();this.resetFocus();}
;}
,"webkit":function(bu){var bv=qx.bom.Event.getTarget(bu);if(bv===this._window||bv===this._document){this.__il();this.__ig=this.getFocus();this.__ih=this.getActive();this.resetActive();this.resetFocus();}
;}
,"default":null})),__ir:qx.event.GlobalError.observeMethod(qx.core.Environment.select(x,{"gecko":function(bw){var bx=qx.bom.Event.getTarget(bw);if(bx===this._window||bx===this._document){this.__im();bx=this._body;}
;this.setFocus(bx);this.tryActivate(bx);}
,"webkit":function(by){var bz=qx.bom.Event.getTarget(by);if(bz===this._window||bz===this._document){this.__im();if(this.__ig){this.setFocus(this.__ig);delete this.__ig;}
;if(this.__ih){this.setActive(this.__ih);delete this.__ih;}
;}
else {this.__ik=by.relatedTarget;this.setFocus(bz);this.__ik=null;this.tryActivate(bz);}
;}
,"default":null})),__is:qx.event.GlobalError.observeMethod(qx.core.Environment.select(x,{"mshtml":function(bB){var bC=qx.bom.Event.getTarget(bB);var bA=this.__ix(bC);if(bA){if(!this.__iz(bC)){bC.unselectable=t;try{document.selection.empty();}
catch(bD){}
;try{bA.focus();}
catch(bE){}
;}
;}
else {qx.bom.Event.preventDefault(bB);if(!this.__iz(bC)){bC.unselectable=t;}
;}
;}
,"webkit":function(bG){var bH=qx.bom.Event.getTarget(bG);var bF=this.__ix(bH);if(bF){this.setFocus(bF);}
else {qx.bom.Event.preventDefault(bG);}
;}
,"gecko":function(bJ){var bK=qx.bom.Event.getTarget(bJ);var bI=this.__ix(bK);if(bI){this.setFocus(bI);}
else {qx.bom.Event.preventDefault(bJ);}
;}
,"opera":function(bN){var bO=qx.bom.Event.getTarget(bN);var bL=this.__ix(bO);if(!this.__iz(bO)){qx.bom.Event.preventDefault(bN);if(bL){var bM=this.getFocus();if(bM&&bM.selectionEnd){bM.selectionStart=0;bM.selectionEnd=0;bM.blur();}
;if(bL){this.setFocus(bL);}
;}
;}
else if(bL){this.setFocus(bL);}
;}
,"default":null})),__it:qx.event.GlobalError.observeMethod(qx.core.Environment.select(x,{"mshtml":function(bP){var bQ=qx.bom.Event.getTarget(bP);if(bQ.unselectable){bQ.unselectable=s;}
;this.tryActivate(this.__iu(bQ));}
,"gecko":function(bR){var bS=qx.bom.Event.getTarget(bR);while(bS&&bS.offsetWidth===undefined){bS=bS.parentNode;}
;if(bS){this.tryActivate(bS);}
;}
,"webkit":function(bT){var bU=qx.bom.Event.getTarget(bT);this.tryActivate(this.__iu(bU));}
,"opera":function(bV){var bW=qx.bom.Event.getTarget(bV);this.tryActivate(this.__iu(bW));}
,"default":null})),__iu:qx.event.GlobalError.observeMethod(qx.core.Environment.select(x,{"mshtml":function(bX){var bY=this.getFocus();if(bY&&bX!=bY&&(bY.nodeName.toLowerCase()===n||bY.nodeName.toLowerCase()===k)){bX=bY;}
;return bX;}
,"webkit":function(ca){var cb=this.getFocus();if(cb&&ca!=cb&&(cb.nodeName.toLowerCase()===n||cb.nodeName.toLowerCase()===k)){ca=cb;}
;return ca;}
,"default":function(cc){return cc;}
})),__iv:qx.event.GlobalError.observeMethod(qx.core.Environment.select(x,{"mshtml":function(cd){var ce=qx.bom.Event.getTarget(cd);if(!this.__iz(ce)){qx.bom.Event.preventDefault(cd);}
;}
,"webkit":function(cf){var cg=qx.bom.Event.getTarget(cf);if(!this.__iz(cg)){qx.bom.Event.preventDefault(cf);}
;}
,"default":null})),__iw:function(ch){var ci=qx.bom.element.Attribute.get(ch,r);if(ci>=1){return true;}
;var cj=qx.event.handler.Focus.FOCUSABLE_ELEMENTS;if(ci>=0&&cj[ch.tagName]){return true;}
;return false;}
,__ix:function(ck){while(ck&&ck.nodeType===1){if(ck.getAttribute(B)==t){return null;}
;if(this.__iw(ck)){return ck;}
;ck=ck.parentNode;}
;return this._body;}
,__iy:function(cl){var cm=cl;while(cl&&cl.nodeType===1){if(cl.getAttribute(D)==t){return null;}
;cl=cl.parentNode;}
;return cm;}
,__iz:function(cn){while(cn&&cn.nodeType===1){var co=cn.getAttribute(q);if(co!=null){return co===t;}
;cn=cn.parentNode;}
;return true;}
,_applyActive:function(cq,cp){if(cp){this.__hJ(cp,cq,j,true);}
;if(cq){this.__hJ(cq,cp,u,true);}
;if(this.__hW){window.scrollTo(0,0);}
;}
,_applyFocus:function(cs,cr){if(cr){this.__hJ(cr,cs,A,true);}
;if(cs){this.__hJ(cs,cr,v,true);}
;if(cr){this.__hJ(cr,cs,c,false);}
;if(cs){this.__hJ(cs,cr||this.__ik,e,false);}
;}
},destruct:function(){this._stopObserver();this._manager=this._window=this._document=this._root=this._body=this.__iA=this.__ik=null;}
,defer:function(cu){qx.event.Registration.addHandler(cu);var cv=cu.FOCUSABLE_ELEMENTS;for(var ct in cv){cv[ct.toUpperCase()]=1;}
;}
});}
)();
(function(){var a="engine.name",b="qx.bom.Selection",c="character",d="button",e='character',f="#text",g="webkit",h="input",i="gecko",j="EndToEnd",k="opera",l="StartToStart",m="html.selection",n="textarea",o="body";qx.Bootstrap.define(b,{statics:{getSelectionObject:qx.core.Environment.select(m,{"selection":function(p){return p.selection;}
,"default":function(q){return qx.dom.Node.getWindow(q).getSelection();}
}),get:qx.core.Environment.select(m,{"selection":function(r){var s=qx.bom.Range.get(qx.dom.Node.getDocument(r));return s.text;}
,"default":function(t){if(this.__iB(t)){return t.value.substring(t.selectionStart,t.selectionEnd);}
else {return this.getSelectionObject(qx.dom.Node.getDocument(t)).toString();}
;}
}),getLength:qx.core.Environment.select(m,{"selection":function(u){var w=this.get(u);var v=qx.util.StringSplit.split(w,/\r\n/);return w.length-(v.length-1);}
,"default":function(x){if(qx.core.Environment.get(a)==k){var B,C,A;if(this.__iB(x)){var z=x.selectionStart;var y=x.selectionEnd;B=x.value.substring(z,y);C=y-z;}
else {B=qx.bom.Selection.get(x);C=B.length;}
;A=qx.util.StringSplit.split(B,/\r\n/);return C-(A.length-1);}
;if(this.__iB(x)){return x.selectionEnd-x.selectionStart;}
else {return this.get(x).length;}
;}
}),getStart:qx.core.Environment.select(m,{"selection":function(D){if(this.__iB(D)){var I=qx.bom.Range.get();if(!D.contains(I.parentElement())){return -1;}
;var J=qx.bom.Range.get(D);var H=D.value.length;J.moveToBookmark(I.getBookmark());J.moveEnd(e,H);return H-J.text.length;}
else {var J=qx.bom.Range.get(D);var F=J.parentElement();var K=qx.bom.Range.get();try{K.moveToElementText(F);}
catch(M){return 0;}
;var E=qx.bom.Range.get(qx.dom.Node.getBodyElement(D));E.setEndPoint(l,J);E.setEndPoint(j,K);if(K.compareEndPoints(l,E)==0){return 0;}
;var G;var L=0;while(true){G=E.moveStart(c,-1);if(K.compareEndPoints(l,E)==0){break;}
;if(G==0){break;}
else {L++ ;}
;}
;return  ++L;}
;}
,"default":function(N){if(qx.core.Environment.get(a)===i||qx.core.Environment.get(a)===g){if(this.__iB(N)){return N.selectionStart;}
else {var P=qx.dom.Node.getDocument(N);var O=this.getSelectionObject(P);if(O.anchorOffset<O.focusOffset){return O.anchorOffset;}
else {return O.focusOffset;}
;}
;}
;if(this.__iB(N)){return N.selectionStart;}
else {return qx.bom.Selection.getSelectionObject(qx.dom.Node.getDocument(N)).anchorOffset;}
;}
}),getEnd:qx.core.Environment.select(m,{"selection":function(Q){if(this.__iB(Q)){var V=qx.bom.Range.get();if(!Q.contains(V.parentElement())){return -1;}
;var W=qx.bom.Range.get(Q);var U=Q.value.length;W.moveToBookmark(V.getBookmark());W.moveStart(e,-U);return W.text.length;}
else {var W=qx.bom.Range.get(Q);var S=W.parentElement();var X=qx.bom.Range.get();try{X.moveToElementText(S);}
catch(ba){return 0;}
;var U=X.text.length;var R=qx.bom.Range.get(qx.dom.Node.getBodyElement(Q));R.setEndPoint(j,W);R.setEndPoint(l,X);if(X.compareEndPoints(j,R)==0){return U-1;}
;var T;var Y=0;while(true){T=R.moveEnd(c,1);if(X.compareEndPoints(j,R)==0){break;}
;if(T==0){break;}
else {Y++ ;}
;}
;return U-( ++Y);}
;}
,"default":function(bb){if(qx.core.Environment.get(a)===i||qx.core.Environment.get(a)===g){if(this.__iB(bb)){return bb.selectionEnd;}
else {var bd=qx.dom.Node.getDocument(bb);var bc=this.getSelectionObject(bd);if(bc.focusOffset>bc.anchorOffset){return bc.focusOffset;}
else {return bc.anchorOffset;}
;}
;}
;if(this.__iB(bb)){return bb.selectionEnd;}
else {return qx.bom.Selection.getSelectionObject(qx.dom.Node.getDocument(bb)).focusOffset;}
;}
}),__iB:function(be){return qx.dom.Node.isElement(be)&&(be.nodeName.toLowerCase()==h||be.nodeName.toLowerCase()==n);}
,set:qx.core.Environment.select(m,{"selection":function(bf,bi,bh){var bg;if(qx.dom.Node.isDocument(bf)){bf=bf.body;}
;if(qx.dom.Node.isElement(bf)||qx.dom.Node.isText(bf)){switch(bf.nodeName.toLowerCase()){case h:case n:case d:if(bh===undefined){bh=bf.value.length;}
;if(bi>=0&&bi<=bf.value.length&&bh>=0&&bh<=bf.value.length){bg=qx.bom.Range.get(bf);bg.collapse(true);bg.moveStart(c,bi);bg.moveEnd(c,bh-bi);bg.select();return true;}
;break;case f:if(bh===undefined){bh=bf.nodeValue.length;}
;if(bi>=0&&bi<=bf.nodeValue.length&&bh>=0&&bh<=bf.nodeValue.length){bg=qx.bom.Range.get(qx.dom.Node.getBodyElement(bf));bg.moveToElementText(bf.parentNode);bg.collapse(true);bg.moveStart(c,bi);bg.moveEnd(c,bh-bi);bg.select();return true;}
;break;default:if(bh===undefined){bh=bf.childNodes.length-1;}
;if(bf.childNodes[bi]&&bf.childNodes[bh]){bg=qx.bom.Range.get(qx.dom.Node.getBodyElement(bf));bg.moveToElementText(bf.childNodes[bi]);bg.collapse(true);var bj=qx.bom.Range.get(qx.dom.Node.getBodyElement(bf));bj.moveToElementText(bf.childNodes[bh]);bg.setEndPoint(j,bj);bg.select();return true;}
;};}
;return false;}
,"default":function(bk,bp,bm){var bn=bk.nodeName.toLowerCase();if(qx.dom.Node.isElement(bk)&&(bn==h||bn==n)){if(bm===undefined){bm=bk.value.length;}
;if(bp>=0&&bp<=bk.value.length&&bm>=0&&bm<=bk.value.length){bk.focus();bk.select();bk.setSelectionRange(bp,bm);return true;}
;}
else {var bq=false;var bl=qx.dom.Node.getWindow(bk).getSelection();var bo=qx.bom.Range.get(bk);if(qx.dom.Node.isText(bk)){if(bm===undefined){bm=bk.length;}
;if(bp>=0&&bp<bk.length&&bm>=0&&bm<=bk.length){bq=true;}
;}
else if(qx.dom.Node.isElement(bk)){if(bm===undefined){bm=bk.childNodes.length-1;}
;if(bp>=0&&bk.childNodes[bp]&&bm>=0&&bk.childNodes[bm]){bq=true;}
;}
else if(qx.dom.Node.isDocument(bk)){bk=bk.body;if(bm===undefined){bm=bk.childNodes.length-1;}
;if(bp>=0&&bk.childNodes[bp]&&bm>=0&&bk.childNodes[bm]){bq=true;}
;}
;if(bq){if(!bl.isCollapsed){bl.collapseToStart();}
;bo.setStart(bk,bp);if(qx.dom.Node.isText(bk)){bo.setEnd(bk,bm);}
else {bo.setEndAfter(bk.childNodes[bm]);}
;if(bl.rangeCount>0){bl.removeAllRanges();}
;bl.addRange(bo);return true;}
;}
;return false;}
}),setAll:function(br){return qx.bom.Selection.set(br,0);}
,clear:qx.core.Environment.select(m,{"selection":function(bs){var bu=qx.bom.Range.get(bs);var parent=bu.parentElement();var bv=qx.bom.Range.get(qx.dom.Node.getDocument(bs));if(qx.dom.Node.isText(bs)){bs=bs.parentNode;}
;if(parent==bv.parentElement()&&parent==bs){var bt=qx.bom.Selection.getSelectionObject(qx.dom.Node.getDocument(bs));bt.empty();}
;}
,"default":function(bw){var bB=qx.bom.Selection.getSelectionObject(qx.dom.Node.getDocument(bw));var bx=bw.nodeName.toLowerCase();if(qx.dom.Node.isElement(bw)&&(bx==h||bx==n)){bw.setSelectionRange(0,0);if(qx.bom.Element&&qx.bom.Element.blur){qx.bom.Element.blur(bw);}
;}
else if(qx.dom.Node.isDocument(bw)||bx==o){bB.collapse(bw.body?bw.body:bw,0);}
else {var by=qx.bom.Range.get(bw);if(!by.collapsed){var bz;var bA=by.commonAncestorContainer;if(qx.dom.Node.isElement(bw)&&qx.dom.Node.isText(bA)){bz=bA.parentNode;}
else {bz=bA;}
;if(bz==bw){bB.collapse(bw,0);}
;}
;}
;}
})}});}
)();
(function(){var a="qx.bom.Range",b="text",c="password",d="file",e="submit",f="reset",g="textarea",h="input",i="hidden",j="html.selection",k="button",l="body";qx.Bootstrap.define(a,{statics:{get:qx.core.Environment.select(j,{"selection":function(m){if(qx.dom.Node.isElement(m)){switch(m.nodeName.toLowerCase()){case h:switch(m.type){case b:case c:case i:case k:case f:case d:case e:return m.createTextRange();default:return qx.bom.Selection.getSelectionObject(qx.dom.Node.getDocument(m)).createRange();};break;case g:case l:case k:return m.createTextRange();default:return qx.bom.Selection.getSelectionObject(qx.dom.Node.getDocument(m)).createRange();};}
else {if(m==null){m=window;}
;return qx.bom.Selection.getSelectionObject(qx.dom.Node.getDocument(m)).createRange();}
;}
,"default":function(n){var o=qx.dom.Node.getDocument(n);var p=qx.bom.Selection.getSelectionObject(o);if(p.rangeCount>0){return p.getRangeAt(0);}
else {return o.createRange();}
;}
})}});}
)();
(function(){var a="m",b="g",c="^",d="",e="qx.util.StringSplit",f="i",g="$(?!\\s)",h="[object RegExp]",j="y";qx.Bootstrap.define(e,{statics:{split:function(k,p,o){if(Object.prototype.toString.call(p)!==h){return String.prototype.split.call(k,p,o);}
;var r=[],l=0,m=(p.ignoreCase?f:d)+(p.multiline?a:d)+(p.sticky?j:d),p=RegExp(p.source,m+b),n,t,q,u,s=/()??/.exec(d)[1]===undefined;k=k+d;if(!s){n=RegExp(c+p.source+g,m);}
;if(o===undefined||+o<0){o=Infinity;}
else {o=Math.floor(+o);if(!o){return [];}
;}
;while(t=p.exec(k)){q=t.index+t[0].length;if(q>l){r.push(k.slice(l,t.index));if(!s&&t.length>1){t[0].replace(n,function(){for(var i=1;i<arguments.length-2;i++ ){if(arguments[i]===undefined){t[i]=undefined;}
;}
;}
);}
;if(t.length>1&&t.index<k.length){Array.prototype.push.apply(r,t.slice(1));}
;u=t[0].length;l=q;if(r.length>=o){break;}
;}
;if(p.lastIndex===t.index){p.lastIndex++ ;}
;}
;if(l===k.length){if(u||!p.test(d)){r.push(d);}
;}
else {r.push(k.slice(l));}
;return r.length>o?r.slice(0,o):r;}
}});}
)();
(function(){var a="qx.event.type.Focus";qx.Class.define(a,{extend:qx.event.type.Event,members:{init:function(d,b,c){qx.event.type.Event.prototype.init.call(this,c,false);this._target=d;this._relatedTarget=b;return this;}
}});}
)();
(function(){var a="touchmove",b="os.name",c="MSPointerDown",d="android",e="engine.version",f="pointercancel",g="qx.event.handler.TouchCore",h="event.mspointer",j="MSPointerCancel",k="y",l="pointer-events",m="pointerup",n="touchend",o="pointerdown",p="MSPointerUp",q="right",r="engine.name",s="undefined",t="touchcancel",u="MSPointerMove",v="webkit",w="none",z="left",A="pointermove",B="down",C="x",D="up",E="touchstart";qx.Bootstrap.define(g,{extend:Object,statics:{TAP_MAX_DISTANCE:qx.core.Environment.get(b)!=d?10:40,SWIPE_DIRECTION:{x:[z,q],y:[D,B]},SWIPE_MIN_DISTANCE:qx.core.Environment.get(b)!=d?11:41,SWIPE_MIN_VELOCITY:0,LONGTAP_TIME:500},construct:function(F,G){this.__iC=F;this.__fB=G;this._initTouchObserver();this.__iD=[];this.__iE={};}
,members:{__iC:null,__fB:null,__iF:null,__iG:null,__iE:null,__iH:null,__iI:null,__iJ:null,__iD:null,__iK:null,_initTouchObserver:function(){this.__iF=qx.lang.Function.listener(this._onTouchEvent,this);this.__iK=[E,a,n,t];if(qx.core.Environment.get(h)){var H=parseInt(qx.core.Environment.get(e),10);if(H==10){this.__iK=[c,u,p,j];}
else {this.__iK=[o,A,m,f];}
;}
;for(var i=0;i<this.__iK.length;i++ ){qx.bom.Event.addNativeListener(this.__iC,this.__iK[i],this.__iF);}
;}
,_stopTouchObserver:function(){for(var i=0;i<this.__iK.length;i++ ){qx.bom.Event.removeNativeListener(this.__iC,this.__iK[i],this.__iF);}
;}
,_onTouchEvent:function(I){this._commonTouchEventHandler(I);}
,_getScalingDistance:function(K,J){return (Math.sqrt(Math.pow(K.pageX-J.pageX,2)+Math.pow(K.pageY-J.pageY,2)));}
,_getRotationAngle:function(M,L){var x=M.pageX-L.pageX;var y=M.pageY-L.pageY;return (Math.atan2(y,x)*180/Math.PI);}
,_calcTouchesDelta:function(N){var O=[];for(var i=0;i<N.length;i++ ){O.push(this._calcSingleTouchDelta(N[i]));}
;return O;}
,_calcSingleTouchDelta:function(S){if(this.__iE.hasOwnProperty(S.identifier)){var R=this.__iE[S.identifier];var P=Math.floor(S.clientX-R[0]);var Q=Math.floor(S.clientY-R[1]);var T=C;if(Math.abs(P/Q)<1){T=k;}
;return {"x":P,"y":Q,"axis":T,"identifier":S.identifier};}
else {return {"x":0,"y":0,"axis":null,"identifier":S.identifier};}
;}
,_commonTouchEventHandler:function(V,ba){var ba=ba||V.type;if(qx.core.Environment.get(h)){ba=this._mapPointerEvent(ba);var U=this._detectTouchesByPointer(V,ba);V.changedTouches=U;V.targetTouches=U;V.touches=U;}
;V.delta=[];if(ba==E){this.__iG=this._getTarget(V);if(V.touches&&V.touches.length>1){this.__iI=this._getScalingDistance(V.touches[0],V.touches[1]);this.__iJ=this._getRotationAngle(V.touches[0],V.touches[1]);}
;for(var i=0;i<V.changedTouches.length;i++ ){var Y=V.changedTouches[i];this.__iE[Y.identifier]=[Y.clientX,Y.clientY];}
;}
;if(ba==a){if(typeof V.scale==s&&V.targetTouches.length>1){var W=this._getScalingDistance(V.targetTouches[0],V.targetTouches[1]);V.scale=W/this.__iI;}
;if((typeof V.rotation==s||qx.core.Environment.get(h))&&V.targetTouches.length>1){var X=this._getRotationAngle(V.targetTouches[0],V.targetTouches[1]);V._rotation=X-this.__iJ;}
;V.delta=this._calcTouchesDelta(V.targetTouches);}
;this._fireEvent(V,ba,this.__iG);if(qx.core.Environment.get(h)){if(ba==n||ba==t){delete this.__iD[V.pointerId];}
;}
;if(ba==n||ba==t&&V.changedTouches[0]){delete this.__iE[V.changedTouches[0].identifier];}
;}
,_detectTouchesByPointer:function(bd,bf){var bc=[];if(bf==E){this.__iD[bd.pointerId]=bd;}
else if(bf==a){this.__iD[bd.pointerId]=bd;}
;for(var be in this.__iD){var bb=this.__iD[be];bc.push(bb);}
;return bc;}
,_mapPointerEvent:function(bg){bg=bg.toLowerCase();if(bg.indexOf(o)!==-1){return E;}
else if(bg.indexOf(m)!==-1){return n;}
else if(bg.indexOf(A)!==-1){return a;}
else if(bg.indexOf(f)!==-1){return t;}
;return bg;}
,_getTarget:function(bi){var bj=qx.bom.Event.getTarget(bi);if(qx.core.Environment.get(r)==v){if(bj&&bj.nodeType==3){bj=bj.parentNode;}
;}
else if(qx.core.Environment.get(h)){var bh=this.__iL(bi);if(bh){bj=bh;}
;}
;return bj;}
,__iL:function(bm){var bk=null;var bl=null;if(bm&&bm.touches&&bm.touches.length!==0){bk=bm.touches[0].clientX;bl=bm.touches[0].clientY;}
;var bo=document.msElementsFromPoint(bk,bl);if(bo){for(var i=0;i<bo.length;i++ ){var bp=bo[i];var bn=qx.bom.element.Style.get(bp,l,3);if(bn!=w){return bp;}
;}
;}
;return null;}
,_fireEvent:function(bq,br,bs){if(!bs){bs=this._getTarget(bq);}
;var br=br||bq.type;if(bs&&bs.nodeType&&this.__fB){this.__fB.emit(br,bq);}
;}
,dispose:function(){this._stopTouchObserver();this.__iG=this.__iC=this.__iK=this.__iD=this.__fB=this.__iI=this.__iJ=null;}
}});}
)();
(function(){var a="resize",b="os.name",c="qx.event.handler.Orientation",d="landscape",e="android",f="portrait",g="orientationchange";qx.Class.define(c,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(h){qx.core.Object.call(this);this.__gt=h;this.__cz=h.getWindow();this._initObserver();}
,statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{orientationchange:1},TARGET_CHECK:qx.event.IEventHandler.TARGET_WINDOW,IGNORE_CAN_HANDLE:true},members:{__gt:null,__cz:null,__iM:null,_currentOrientation:null,__iN:null,canHandleEvent:function(j,i){}
,registerEvent:function(m,l,k){}
,unregisterEvent:function(p,o,n){}
,_initObserver:function(){this.__iN=qx.lang.Function.listener(this._onNative,this);this.__iM=qx.bom.Event.supportsEvent(this.__cz,g)?g:a;var Event=qx.bom.Event;Event.addNativeListener(this.__cz,this.__iM,this.__iN);}
,_stopObserver:function(){var Event=qx.bom.Event;Event.removeNativeListener(this.__cz,this.__iM,this.__iN);}
,_onNative:qx.event.GlobalError.observeMethod(function(q){var r=0;if(qx.core.Environment.get(b)==e){r=300;}
;qx.lang.Function.delay(this._onOrientationChange,r,this,q);}
),_onOrientationChange:function(s){var u=qx.bom.Viewport;var t=u.getOrientation(s.target);if(this._currentOrientation!=t){this._currentOrientation=t;var v=u.isLandscape(s.target)?d:f;qx.event.Registration.fireEvent(this.__cz,g,qx.event.type.Orientation,[t,v]);}
;}
},destruct:function(){this._stopObserver();this.__gt=this.__cz=null;}
,defer:function(w){qx.event.Registration.addHandler(w);}
});}
)();
(function(){var a="landscape",b="qx.event.type.Orientation",c="portrait";qx.Class.define(b,{extend:qx.event.type.Event,members:{__iO:null,__iP:null,init:function(d,e){qx.event.type.Event.prototype.init.call(this,false,false);this.__iO=d;this.__iP=e;return this;}
,clone:function(f){var g=qx.event.type.Event.prototype.clone.call(this,f);g.__iO=this.__iO;g.__iP=this.__iP;return g;}
,getOrientation:function(){return this.__iO;}
,isLandscape:function(){return this.__iP==a;}
,isPortrait:function(){return this.__iP==c;}
}});}
)();
(function(){var a="touchmove",b="dispose",c="useraction",d="touchend",e="event.touch",f="touchstart",g="qx.event.handler.Touch";qx.Class.define(g,{extend:qx.event.handler.TouchCore,implement:qx.event.IEventHandler,construct:function(h){this.__gt=h;this.__cz=h.getWindow();this.__dd=this.__cz.document;qx.event.handler.TouchCore.apply(this,[this.__dd]);}
,statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{touchstart:1,touchmove:1,touchend:1,touchcancel:1,tap:1,longtap:1,swipe:1},TARGET_CHECK:qx.event.IEventHandler.TARGET_DOMNODE+qx.event.IEventHandler.TARGET_DOCUMENT,IGNORE_CAN_HANDLE:true,MOUSE_TO_TOUCH_MAPPING:{"mousedown":f,"mousemove":a,"mouseup":d}},members:{__gt:null,__cz:null,__dd:null,__iQ:false,canHandleEvent:function(j,i){}
,registerEvent:function(m,l,k){}
,unregisterEvent:function(p,o,n){}
,_fireEvent:function(r,q,s,t){if(!s){s=this._getTarget(r);}
;var q=q||r.type;if(s&&s.nodeType){qx.event.Registration.fireEvent(s,q,t||qx.event.type.Touch,[r,s,null,true,true]);}
;qx.event.Registration.fireEvent(this.__cz,c,qx.event.type.Data,[q]);}
,_onTouchEvent:qx.event.GlobalError.observeMethod(function(u){this._commonTouchEventHandler(u);}
),dispose:function(){this.__hh(b);this.__gt=this.__cz=this.__dd=null;}
,__hh:function(w,v){qx.event.handler.TouchCore.prototype[w].apply(this,v||[]);}
},defer:function(x){qx.event.Registration.addHandler(x);if(qx.core.Environment.get(e)){qx.event.Registration.getManager(document).getHandler(x);}
;}
});}
)();
(function(){var a="touchcancel",b="qx.event.type.Touch",c="touchend",d="undefined";qx.Class.define(b,{extend:qx.event.type.Dom,members:{_cloneNativeEvent:function(e,f){var f=qx.event.type.Dom.prototype._cloneNativeEvent.call(this,e,f);f.pageX=e.pageX;f.pageY=e.pageY;f.offsetX=e.offsetX;f.offsetY=e.offsetY;f.layerX=(e.offsetX||e.layerX);f.layerY=(e.offsetY||e.layerY);f.scale=e.scale;f.rotation=e.rotation;f._rotation=e._rotation;f.delta=e.delta;f.srcElement=e.srcElement;f.targetTouches=[];for(var i=0;i<e.targetTouches.length;i++ ){f.targetTouches[i]=e.targetTouches[i];}
;f.changedTouches=[];for(i=0;i<e.changedTouches.length;i++ ){f.changedTouches[i]=e.changedTouches[i];}
;f.touches=[];for(i=0;i<e.touches.length;i++ ){f.touches[i]=e.touches[i];}
;return f;}
,stop:function(){this.stopPropagation();}
,getAllTouches:function(){return this._native.touches;}
,getTargetTouches:function(){return this._native.targetTouches;}
,getChangedTargetTouches:function(){return this._native.changedTouches;}
,isMultiTouch:function(){return this.__iS().length>1;}
,getScale:function(){return this._native.scale;}
,getRotation:function(){if(typeof this._native._rotation===d){return this._native.rotation;}
else {return this._native._rotation;}
;}
,getDelta:function(){return this._native.delta;}
,getDocumentLeft:function(g){return this.__iR(g).pageX;}
,getDocumentTop:function(h){return this.__iR(h).pageY;}
,getScreenLeft:function(j){return this.__iR(j).screenX;}
,getScreenTop:function(k){return this.__iR(k).screenY;}
,getViewportLeft:function(l){return this.__iR(l).clientX;}
,getViewportTop:function(m){return this.__iR(m).clientY;}
,getIdentifier:function(n){return this.__iR(n).identifier;}
,__iR:function(o){o=o==null?0:o;return this.__iS()[o];}
,__iS:function(){var p=(this._isTouchEnd()?this.getChangedTargetTouches():this.getTargetTouches());return p;}
,_isTouchEnd:function(){return (this.getType()==c||this.getType()==a);}
}});}
)();
(function(){var a="text",b="engine.version",c="keydown",d="radio",f="textarea",g="password",h="propertychange",j="select-multiple",k="change",m="input",n="value",p="select",q="browser.documentmode",r="browser.version",s="opera",t="keyup",u="mshtml",v="engine.name",w="keypress",x="checkbox",y="qx.event.handler.Input",z="checked";qx.Class.define(y,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(){qx.core.Object.call(this);this._onChangeCheckedWrapper=qx.lang.Function.listener(this._onChangeChecked,this);this._onChangeValueWrapper=qx.lang.Function.listener(this._onChangeValue,this);this._onInputWrapper=qx.lang.Function.listener(this._onInput,this);this._onPropertyWrapper=qx.lang.Function.listener(this._onProperty,this);if((qx.core.Environment.get(v)==s)){this._onKeyDownWrapper=qx.lang.Function.listener(this._onKeyDown,this);this._onKeyUpWrapper=qx.lang.Function.listener(this._onKeyUp,this);}
;}
,statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{input:1,change:1},TARGET_CHECK:qx.event.IEventHandler.TARGET_DOMNODE,IGNORE_CAN_HANDLE:false},members:{__iT:false,__iU:null,__iV:null,__iW:null,canHandleEvent:function(C,B){var A=C.tagName.toLowerCase();if(B===m&&(A===m||A===f)){return true;}
;if(B===k&&(A===m||A===f||A===p)){return true;}
;return false;}
,registerEvent:function(H,G,E){if(qx.core.Environment.get(v)==u&&(qx.core.Environment.get(b)<9||(qx.core.Environment.get(b)>=9&&qx.core.Environment.get(q)<9))){if(!H.__iX){var F=H.tagName.toLowerCase();var D=H.type;if(D===a||D===g||F===f||D===x||D===d){qx.bom.Event.addNativeListener(H,h,this._onPropertyWrapper);}
;if(D!==x&&D!==d){qx.bom.Event.addNativeListener(H,k,this._onChangeValueWrapper);}
;if(D===a||D===g){this._onKeyPressWrapped=qx.lang.Function.listener(this._onKeyPress,this,H);qx.bom.Event.addNativeListener(H,w,this._onKeyPressWrapped);}
;H.__iX=true;}
;}
else {if(G===m){this.__iY(H);}
else if(G===k){if(H.type===d||H.type===x){qx.bom.Event.addNativeListener(H,k,this._onChangeCheckedWrapper);}
else {qx.bom.Event.addNativeListener(H,k,this._onChangeValueWrapper);}
;if((qx.core.Environment.get(v)==s)||(qx.core.Environment.get(v)==u)){if(H.type===a||H.type===g){this._onKeyPressWrapped=qx.lang.Function.listener(this._onKeyPress,this,H);qx.bom.Event.addNativeListener(H,w,this._onKeyPressWrapped);}
;}
;}
;}
;}
,__iY:qx.core.Environment.select(v,{"mshtml":function(I){if(qx.core.Environment.get(b)>=9&&qx.core.Environment.get(q)>=9){qx.bom.Event.addNativeListener(I,m,this._onInputWrapper);if(I.type===a||I.type===g||I.type===f){this._inputFixWrapper=qx.lang.Function.listener(this._inputFix,this,I);qx.bom.Event.addNativeListener(I,t,this._inputFixWrapper);}
;}
;}
,"webkit":function(K){var J=K.tagName.toLowerCase();if(parseFloat(qx.core.Environment.get(b))<532&&J==f){qx.bom.Event.addNativeListener(K,w,this._onInputWrapper);}
;qx.bom.Event.addNativeListener(K,m,this._onInputWrapper);}
,"opera":function(L){qx.bom.Event.addNativeListener(L,t,this._onKeyUpWrapper);qx.bom.Event.addNativeListener(L,c,this._onKeyDownWrapper);qx.bom.Event.addNativeListener(L,m,this._onInputWrapper);}
,"default":function(M){qx.bom.Event.addNativeListener(M,m,this._onInputWrapper);}
}),unregisterEvent:function(Q,P){if(qx.core.Environment.get(v)==u&&qx.core.Environment.get(b)<9&&qx.core.Environment.get(q)<9){if(Q.__iX){var O=Q.tagName.toLowerCase();var N=Q.type;if(N===a||N===g||O===f||N===x||N===d){qx.bom.Event.removeNativeListener(Q,h,this._onPropertyWrapper);}
;if(N!==x&&N!==d){qx.bom.Event.removeNativeListener(Q,k,this._onChangeValueWrapper);}
;if(N===a||N===g){qx.bom.Event.removeNativeListener(Q,w,this._onKeyPressWrapped);}
;try{delete Q.__iX;}
catch(R){Q.__iX=null;}
;}
;}
else {if(P===m){this.__ja(Q);}
else if(P===k){if(Q.type===d||Q.type===x){qx.bom.Event.removeNativeListener(Q,k,this._onChangeCheckedWrapper);}
else {qx.bom.Event.removeNativeListener(Q,k,this._onChangeValueWrapper);}
;}
;if((qx.core.Environment.get(v)==s)||(qx.core.Environment.get(v)==u)){if(Q.type===a||Q.type===g){qx.bom.Event.removeNativeListener(Q,w,this._onKeyPressWrapped);}
;}
;}
;}
,__ja:qx.core.Environment.select(v,{"mshtml":function(S){if(qx.core.Environment.get(b)>=9&&qx.core.Environment.get(q)>=9){qx.bom.Event.removeNativeListener(S,m,this._onInputWrapper);if(S.type===a||S.type===g||S.type===f){qx.bom.Event.removeNativeListener(S,t,this._inputFixWrapper);}
;}
;}
,"webkit":function(U){var T=U.tagName.toLowerCase();if(parseFloat(qx.core.Environment.get(b))<532&&T==f){qx.bom.Event.removeNativeListener(U,w,this._onInputWrapper);}
;qx.bom.Event.removeNativeListener(U,m,this._onInputWrapper);}
,"opera":function(V){qx.bom.Event.removeNativeListener(V,t,this._onKeyUpWrapper);qx.bom.Event.removeNativeListener(V,c,this._onKeyDownWrapper);qx.bom.Event.removeNativeListener(V,m,this._onInputWrapper);}
,"default":function(W){qx.bom.Event.removeNativeListener(W,m,this._onInputWrapper);}
}),_onKeyPress:qx.core.Environment.select(v,{"mshtml":function(e,X){if(e.keyCode===13){if(X.value!==this.__iV){this.__iV=X.value;qx.event.Registration.fireEvent(X,k,qx.event.type.Data,[X.value]);}
;}
;}
,"opera":function(e,Y){if(e.keyCode===13){if(Y.value!==this.__iV){this.__iV=Y.value;qx.event.Registration.fireEvent(Y,k,qx.event.type.Data,[Y.value]);}
;}
;}
,"default":null}),_inputFix:qx.core.Environment.select(v,{"mshtml":function(e,ba){if(e.keyCode===46||e.keyCode===8){if(ba.value!==this.__iW){this.__iW=ba.value;qx.event.Registration.fireEvent(ba,m,qx.event.type.Data,[ba.value]);}
;}
;}
,"default":null}),_onKeyDown:qx.core.Environment.select(v,{"opera":function(e){if(e.keyCode===13){this.__iT=true;}
;}
,"default":null}),_onKeyUp:qx.core.Environment.select(v,{"opera":function(e){if(e.keyCode===13){this.__iT=false;}
;}
,"default":null}),_onInput:qx.event.GlobalError.observeMethod(function(e){var bc=qx.bom.Event.getTarget(e);var bb=bc.tagName.toLowerCase();if(!this.__iT||bb!==m){if((qx.core.Environment.get(v)==s)&&qx.core.Environment.get(r)<10.6){this.__iU=window.setTimeout(function(){qx.event.Registration.fireEvent(bc,m,qx.event.type.Data,[bc.value]);}
,0);}
else {qx.event.Registration.fireEvent(bc,m,qx.event.type.Data,[bc.value]);}
;}
;}
),_onChangeValue:qx.event.GlobalError.observeMethod(function(e){var bd=qx.bom.Event.getTarget(e);var be=bd.value;if(bd.type===j){var be=[];for(var i=0,o=bd.options,l=o.length;i<l;i++ ){if(o[i].selected){be.push(o[i].value);}
;}
;}
;qx.event.Registration.fireEvent(bd,k,qx.event.type.Data,[be]);}
),_onChangeChecked:qx.event.GlobalError.observeMethod(function(e){var bf=qx.bom.Event.getTarget(e);if(bf.type===d){if(bf.checked){qx.event.Registration.fireEvent(bf,k,qx.event.type.Data,[bf.value]);}
;}
else {qx.event.Registration.fireEvent(bf,k,qx.event.type.Data,[bf.checked]);}
;}
),_onProperty:qx.core.Environment.select(v,{"mshtml":qx.event.GlobalError.observeMethod(function(e){var bg=qx.bom.Event.getTarget(e);var bh=e.propertyName;if(bh===n&&(bg.type===a||bg.type===g||bg.tagName.toLowerCase()===f)){if(!bg.$$inValueSet){qx.event.Registration.fireEvent(bg,m,qx.event.type.Data,[bg.value]);}
;}
else if(bh===z){if(bg.type===x){qx.event.Registration.fireEvent(bg,k,qx.event.type.Data,[bg.checked]);}
else if(bg.checked){qx.event.Registration.fireEvent(bg,k,qx.event.type.Data,[bg.value]);}
;}
;}
),"default":function(){}
})},defer:function(bi){qx.event.Registration.addHandler(bi);}
});}
)();
(function(){var a="offline",b="qx.event.handler.Offline",c="online";qx.Class.define(b,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(d){qx.core.Object.call(this);this.__gt=d;this.__cz=d.getWindow();this._initObserver();}
,statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{online:true,offline:true},TARGET_CHECK:qx.event.IEventHandler.TARGET_WINDOW,IGNORE_CAN_HANDLE:true},members:{__gt:null,__cz:null,__iN:null,canHandleEvent:function(f,e){}
,registerEvent:function(i,h,g){}
,unregisterEvent:function(l,k,j){}
,_initObserver:function(){this.__iN=qx.lang.Function.listener(this._onNative,this);qx.bom.Event.addNativeListener(this.__cz,a,this.__iN);qx.bom.Event.addNativeListener(this.__cz,c,this.__iN);}
,_stopObserver:function(){qx.bom.Event.removeNativeListener(this.__cz,a,this.__iN);qx.bom.Event.removeNativeListener(this.__cz,c,this.__iN);}
,_onNative:qx.event.GlobalError.observeMethod(function(m){qx.event.Registration.fireEvent(this.__cz,m.type,qx.event.type.Event,[]);}
),isOnline:function(){return !!this.__cz.navigator.onLine;}
},destruct:function(){this.__gt=null;this._stopObserver();delete qx.event.handler.Appear.__instances[this.$$hash];}
,defer:function(n){qx.event.Registration.addHandler(n);}
});}
)();
(function(){var a="mshtml",b="engine.name",c="qx.bom.Element";qx.Class.define(c,{statics:{addListener:function(g,f,d,self,e){return qx.event.Registration.addListener(g,f,d,self,e);}
,removeListener:function(n,m,h,self,k){return qx.event.Registration.removeListener(n,m,h,self,k);}
,removeListenerById:function(o,p){return qx.event.Registration.removeListenerById(o,p);}
,hasListener:function(s,r,q){return qx.event.Registration.hasListener(s,r,q);}
,focus:function(t){qx.event.Registration.getManager(t).getHandler(qx.event.handler.Focus).focus(t);}
,blur:function(u){qx.event.Registration.getManager(u).getHandler(qx.event.handler.Focus).blur(u);}
,activate:function(v){qx.event.Registration.getManager(v).getHandler(qx.event.handler.Focus).activate(v);}
,deactivate:function(w){qx.event.Registration.getManager(w).getHandler(qx.event.handler.Focus).deactivate(w);}
,capture:function(y,x){qx.event.Registration.getManager(y).getDispatcher(qx.event.dispatch.MouseCapture).activateCapture(y,x);}
,releaseCapture:function(z){qx.event.Registration.getManager(z).getDispatcher(qx.event.dispatch.MouseCapture).releaseCapture(z);}
,clone:function(E,L){var C;if(L||((qx.core.Environment.get(b)==a)&&!qx.xml.Document.isXmlDocument(E))){var G=qx.event.Registration.getManager(E);var A=qx.dom.Hierarchy.getDescendants(E);A.push(E);}
;if((qx.core.Environment.get(b)==a)){for(var i=0,l=A.length;i<l;i++ ){G.toggleAttachedEvents(A[i],false);}
;}
;var C=E.cloneNode(true);if((qx.core.Environment.get(b)==a)){for(var i=0,l=A.length;i<l;i++ ){G.toggleAttachedEvents(A[i],true);}
;}
;if(L===true){var K=qx.dom.Hierarchy.getDescendants(C);K.push(C);var B,J,I,D;for(var i=0,H=A.length;i<H;i++ ){I=A[i];B=G.serializeListeners(I);if(B.length>0){J=K[i];for(var j=0,F=B.length;j<F;j++ ){D=B[j];G.addListener(J,D.type,D.handler,D.self,D.capture);}
;}
;}
;}
;return C;}
}});}
)();
(function(){var a="mshtml",b="engine.name",c="blur",d="losecapture",e="focus",f="os.version",g="click",h="qx.event.dispatch.MouseCapture",i="capture",j="scroll",k="browser.documentmode";qx.Class.define(h,{extend:qx.event.dispatch.AbstractBubbling,construct:function(l,m){qx.event.dispatch.AbstractBubbling.call(this,l);this.__cz=l.getWindow();this.__cB=m;l.addListener(this.__cz,c,this.releaseCapture,this);l.addListener(this.__cz,e,this.releaseCapture,this);l.addListener(this.__cz,j,this.releaseCapture,this);}
,statics:{PRIORITY:qx.event.Registration.PRIORITY_FIRST},members:{__cB:null,__jb:null,__jc:true,__cz:null,_getParent:function(n){return n.parentNode;}
,canDispatchEvent:function(p,event,o){return !!(this.__jb&&this.__jd[o]);}
,dispatchEvent:function(r,event,q){if(q==g){event.stopPropagation();this.releaseCapture();return;}
;if(this.__jc||!qx.dom.Hierarchy.contains(this.__jb,r)){r=this.__jb;}
;qx.event.dispatch.AbstractBubbling.prototype.dispatchEvent.call(this,r,event,q);}
,__jd:{"mouseup":1,"mousedown":1,"click":1,"dblclick":1,"mousemove":1,"mouseout":1,"mouseover":1,"pointerdown":1,"pointerup":1,"pointermove":1,"pointerover":1,"pointerout":1,"tap":1,"dbltap":1},activateCapture:function(t,s){var s=s!==false;if(this.__jb===t&&this.__jc==s){return;}
;if(this.__jb){this.releaseCapture();}
;if(this.hasNativeCapture){this.nativeSetCapture(t,s);var self=this;qx.bom.Event.addNativeListener(t,d,function(){qx.bom.Event.removeNativeListener(t,d,arguments.callee);self.releaseCapture();}
);}
;this.__jc=s;this.__jb=t;this.__cB.fireEvent(t,i,qx.event.type.Event,[true,false]);}
,getCaptureElement:function(){return this.__jb;}
,releaseCapture:function(){var u=this.__jb;if(!u){return;}
;this.__jb=null;this.__cB.fireEvent(u,d,qx.event.type.Event,[true,false]);this.nativeReleaseCapture(u);}
,hasNativeCapture:(qx.core.Environment.get(b)==a&&qx.core.Environment.get(k)<9||(parseInt(qx.core.Environment.get(f),10)>7&&qx.core.Environment.get(k)>9)),nativeSetCapture:qx.core.Environment.select(b,{"mshtml":function(w,v){w.setCapture(v!==false);}
,"default":(function(){}
)}),nativeReleaseCapture:qx.core.Environment.select(b,{"mshtml":function(x){x.releaseCapture();}
,"default":(function(){}
)})},destruct:function(){this.__jb=this.__cz=this.__cB=null;}
,defer:function(y){qx.event.Registration.addDispatcher(y);}
});}
)();
(function(){var a="qx.event.handler.Capture";qx.Class.define(a,{extend:qx.core.Object,implement:qx.event.IEventHandler,statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{capture:true,losecapture:true},TARGET_CHECK:qx.event.IEventHandler.TARGET_DOMNODE,IGNORE_CAN_HANDLE:true},members:{canHandleEvent:function(c,b){}
,registerEvent:function(f,e,d){}
,unregisterEvent:function(i,h,g){}
},defer:function(j){qx.event.Registration.addHandler(j);}
});}
)();
(function(){var a="function",b="plugin.silverlight.version",c="Silverlight",d="Skype.Detection",f="QuickTimeCheckObject.QuickTimeCheck.1",g="Adobe Acrobat",h="plugin.windowsmedia",k="QuickTime",l="plugin.silverlight",m="pdf",n="wmv",o="qx.bom.client.Plugin",p="application/x-skype",q=',',r="plugin.divx",s='=',t="Chrome PDF Viewer",u="divx",v="Windows Media",w="",x="mshtml",y="skype.click2call",z="plugin.skype",A="plugin.gears",B="plugin.quicktime",C="plugin.windowsmedia.version",D="quicktime",E="DivX Web Player",F="AgControl.AgControl",G="Microsoft.XMLHTTP",H="silverlight",I="plugin.pdf",J="plugin.pdf.version",K="MSXML2.DOMDocument.6.0",L="WMPlayer.OCX.7",M="AcroPDF.PDF",N="plugin.activex",O="plugin.quicktime.version",P="plugin.divx.version",Q="npdivx.DivXBrowserPlugin.1",R="object";qx.Bootstrap.define(o,{statics:{getGears:function(){return !!(window.google&&window.google.gears);}
,getActiveX:function(){if(typeof window.ActiveXObject===a){return true;}
;try{return (typeof (new window.ActiveXObject(G))===R||typeof (new window.ActiveXObject(K))===R);}
catch(S){return false;}
;}
,getSkype:function(){if(qx.bom.client.Plugin.getActiveX()){try{new ActiveXObject(d);return true;}
catch(e){}
;}
;var T=navigator.mimeTypes;if(T){if(p in T){return true;}
;for(var i=0;i<T.length;i++ ){var U=T[i];if(U.type.indexOf(y)!=-1){return true;}
;}
;}
;return false;}
,__je:{quicktime:{plugin:[k],control:f},wmv:{plugin:[v],control:L},divx:{plugin:[E],control:Q},silverlight:{plugin:[c],control:F},pdf:{plugin:[t,g],control:M}},getQuicktimeVersion:function(){var V=qx.bom.client.Plugin.__je[D];return qx.bom.client.Plugin.__jf(V.control,V.plugin);}
,getWindowsMediaVersion:function(){var W=qx.bom.client.Plugin.__je[n];return qx.bom.client.Plugin.__jf(W.control,W.plugin,true);}
,getDivXVersion:function(){var X=qx.bom.client.Plugin.__je[u];return qx.bom.client.Plugin.__jf(X.control,X.plugin);}
,getSilverlightVersion:function(){var Y=qx.bom.client.Plugin.__je[H];return qx.bom.client.Plugin.__jf(Y.control,Y.plugin);}
,getPdfVersion:function(){var ba=qx.bom.client.Plugin.__je[m];return qx.bom.client.Plugin.__jf(ba.control,ba.plugin);}
,getQuicktime:function(){var bb=qx.bom.client.Plugin.__je[D];return qx.bom.client.Plugin.__jg(bb.control,bb.plugin);}
,getWindowsMedia:function(){var bc=qx.bom.client.Plugin.__je[n];return qx.bom.client.Plugin.__jg(bc.control,bc.plugin,true);}
,getDivX:function(){var bd=qx.bom.client.Plugin.__je[u];return qx.bom.client.Plugin.__jg(bd.control,bd.plugin);}
,getSilverlight:function(){var be=qx.bom.client.Plugin.__je[H];return qx.bom.client.Plugin.__jg(be.control,be.plugin);}
,getPdf:function(){var bf=qx.bom.client.Plugin.__je[m];return qx.bom.client.Plugin.__jg(bf.control,bf.plugin);}
,__jf:function(bo,bk,bj){var bg=qx.bom.client.Plugin.__jg(bo,bk,bj);if(!bg){return w;}
;if(qx.bom.client.Engine.getName()==x&&(qx.bom.client.Browser.getDocumentMode()<11||bj)){try{var bh=new ActiveXObject(bo);var bm;if(bh.GetVersions&&bh.GetVersions()){bm=bh.GetVersions().split(q);if(bm.length>1){bm=bm[0].split(s);if(bm.length===2){return bm[1];}
;}
;}
;bm=bh.versionInfo;if(bm!=undefined){return bm;}
;bm=bh.version;if(bm!=undefined){return bm;}
;bm=bh.settings.version;if(bm!=undefined){return bm;}
;}
catch(bp){return w;}
;return w;}
else {var bn=navigator.plugins;var bl=/([0-9]\.[0-9])/g;for(var i=0;i<bn.length;i++ ){var bi=bn[i];for(var j=0;j<bk.length;j++ ){if(bi.name.indexOf(bk[j])!==-1){if(bl.test(bi.name)||bl.test(bi.description)){return RegExp.$1;}
;}
;}
;}
;return w;}
;}
,__jg:function(bt,br,bq){if(qx.bom.client.Engine.getName()==x&&(qx.bom.client.Browser.getDocumentMode()<11||bq)){if(!this.getActiveX()){return false;}
;try{new ActiveXObject(bt);}
catch(bu){return false;}
;return true;}
else {var bs=navigator.plugins;if(!bs){return false;}
;var name;for(var i=0;i<bs.length;i++ ){name=bs[i].name;for(var j=0;j<br.length;j++ ){if(name.indexOf(br[j])!==-1){return true;}
;}
;}
;return false;}
;}
},defer:function(bv){qx.core.Environment.add(A,bv.getGears);qx.core.Environment.add(B,bv.getQuicktime);qx.core.Environment.add(O,bv.getQuicktimeVersion);qx.core.Environment.add(h,bv.getWindowsMedia);qx.core.Environment.add(C,bv.getWindowsMediaVersion);qx.core.Environment.add(r,bv.getDivX);qx.core.Environment.add(P,bv.getDivXVersion);qx.core.Environment.add(l,bv.getSilverlight);qx.core.Environment.add(b,bv.getSilverlightVersion);qx.core.Environment.add(I,bv.getPdf);qx.core.Environment.add(J,bv.getPdfVersion);qx.core.Environment.add(N,bv.getActiveX);qx.core.Environment.add(z,bv.getSkype);}
});}
)();
(function(){var a='<\?xml version="1.0" encoding="utf-8"?>\n<',b="MSXML2.DOMDocument.3.0",c="qx.xml.Document",d="",e=" />",f="xml.domparser",g="SelectionLanguage",h="'",j="MSXML2.XMLHTTP.3.0",k="plugin.activex",m="No XML implementation available!",n="MSXML2.XMLHTTP.6.0",o="xml.implementation",p=" xmlns='",q="text/xml",r="XPath",s="MSXML2.DOMDocument.6.0",t="HTML";qx.Bootstrap.define(c,{statics:{DOMDOC:null,XMLHTTP:null,isXmlDocument:function(u){if(u.nodeType===9){return u.documentElement.nodeName!==t;}
else if(u.ownerDocument){return this.isXmlDocument(u.ownerDocument);}
else {return false;}
;}
,create:function(v,w){if(qx.core.Environment.get(k)){var x=new ActiveXObject(this.DOMDOC);if(this.DOMDOC==b){x.setProperty(g,r);}
;if(w){var y=a;y+=w;if(v){y+=p+v+h;}
;y+=e;x.loadXML(y);}
;return x;}
;if(qx.core.Environment.get(o)){return document.implementation.createDocument(v||d,w||d,null);}
;throw new Error(m);}
,fromString:function(A){if(qx.core.Environment.get(k)){var B=qx.xml.Document.create();B.loadXML(A);return B;}
;if(qx.core.Environment.get(f)){var z=new DOMParser();return z.parseFromString(A,q);}
;throw new Error(m);}
},defer:function(D){if(qx.core.Environment.get(k)){var C=[s,b];var E=[n,j];for(var i=0,l=C.length;i<l;i++ ){try{new ActiveXObject(C[i]);new ActiveXObject(E[i]);}
catch(F){continue;}
;D.DOMDOC=C[i];D.XMLHTTP=E[i];break;}
;}
;}
});}
)();
(function(){var a="function",b="xml.implementation",c="xml.attributens",d="xml.selectnodes",e="<a></a>",f="xml.getqualifieditem",g="SelectionLanguage",h="xml.getelementsbytagnamens",i="qx.bom.client.Xml",j="xml.domproperties",k="xml.selectsinglenode",l="1.0",m="xml.createnode",n="xml.domparser",o="getProperty",p="undefined",q="XML",r="string",s="xml.createelementns";qx.Bootstrap.define(i,{statics:{getImplementation:function(){return document.implementation&&document.implementation.hasFeature&&document.implementation.hasFeature(q,l);}
,getDomParser:function(){return typeof window.DOMParser!==p;}
,getSelectSingleNode:function(){return typeof qx.xml.Document.create().selectSingleNode!==p;}
,getSelectNodes:function(){return typeof qx.xml.Document.create().selectNodes!==p;}
,getElementsByTagNameNS:function(){return typeof qx.xml.Document.create().getElementsByTagNameNS!==p;}
,getDomProperties:function(){var t=qx.xml.Document.create();return (o in t&&typeof t.getProperty(g)===r);}
,getAttributeNS:function(){var u=qx.xml.Document.fromString(e).documentElement;return typeof u.getAttributeNS===a&&typeof u.setAttributeNS===a;}
,getCreateElementNS:function(){return typeof qx.xml.Document.create().createElementNS===a;}
,getCreateNode:function(){return typeof qx.xml.Document.create().createNode!==p;}
,getQualifiedItem:function(){var v=qx.xml.Document.fromString(e).documentElement;return typeof v.attributes.getQualifiedItem!==p;}
},defer:function(w){qx.core.Environment.add(b,w.getImplementation);qx.core.Environment.add(n,w.getDomParser);qx.core.Environment.add(k,w.getSelectSingleNode);qx.core.Environment.add(d,w.getSelectNodes);qx.core.Environment.add(h,w.getElementsByTagNameNS);qx.core.Environment.add(j,w.getDomProperties);qx.core.Environment.add(c,w.getAttributeNS);qx.core.Environment.add(s,w.getCreateElementNS);qx.core.Environment.add(m,w.getCreateNode);qx.core.Environment.add(f,w.getQualifiedItem);}
});}
)();
(function(){var a="borderBottomWidth",b="visible",d="engine.name",e="borderTopWidth",f="top",g="borderLeftStyle",h="none",i="overflow",j="right",k="bottom",l="borderLeftWidth",m="100px",n="-moz-scrollbars-vertical",o="borderRightStyle",p="hidden",q="div",r="left",u="qx.bom.element.Scroll",v="borderRightWidth",w="scroll",x="overflowY";qx.Class.define(u,{statics:{__jh:null,getScrollbarWidth:function(){if(this.__jh!==null){return this.__jh;}
;var y=qx.bom.element.Style;var A=function(E,F){return parseInt(y.get(E,F),10)||0;}
;var B=function(G){return (y.get(G,o)==h?0:A(G,v));}
;var C=function(H){return (y.get(H,g)==h?0:A(H,l));}
;var D=qx.core.Environment.select(d,{"mshtml":function(I){if(y.get(I,x)==p||I.clientWidth==0){return B(I);}
;return Math.max(0,I.offsetWidth-I.clientLeft-I.clientWidth);}
,"default":function(J){if(J.clientWidth==0){var L=y.get(J,i);var K=(L==w||L==n?16:0);return Math.max(0,B(J)+K);}
;return Math.max(0,(J.offsetWidth-J.clientWidth-C(J)));}
});var z=function(M){return D(M)-B(M);}
;var t=document.createElement(q);var s=t.style;s.height=s.width=m;s.overflow=w;document.body.appendChild(t);var c=z(t);this.__jh=c;document.body.removeChild(t);return this.__jh;}
,intoViewX:function(bi,stop,bh){var parent=bi.parentNode;var bg=qx.dom.Node.getDocument(bi);var Y=bg.body;var be,Q,V;var R,P,S;var bb,T,O;var X,bc,bd,ba;var bf,U,bj;var N=bh===r;var W=bh===j;stop=stop?stop.parentNode:bg;while(parent&&parent!=stop){if(parent.scrollWidth>parent.clientWidth&&(parent===Y||qx.bom.element.Style.get(parent,x)!=b)){if(parent===Y){Q=parent.scrollLeft;V=Q+qx.bom.Viewport.getWidth();R=qx.bom.Viewport.getWidth();P=parent.clientWidth;S=parent.scrollWidth;bb=0;T=0;O=0;}
else {be=qx.bom.element.Location.get(parent);Q=be.left;V=be.right;R=parent.offsetWidth;P=parent.clientWidth;S=parent.scrollWidth;bb=parseInt(qx.bom.element.Style.get(parent,l),10)||0;T=parseInt(qx.bom.element.Style.get(parent,v),10)||0;O=R-P-bb-T;}
;X=qx.bom.element.Location.get(bi);bc=X.left;bd=X.right;ba=bi.offsetWidth;bf=bc-Q-bb;U=bd-V+T;bj=0;if(N){bj=bf;}
else if(W){bj=U+O;}
else if(bf<0||ba>P){bj=bf;}
else if(U>0){bj=U+O;}
;parent.scrollLeft+=bj;qx.event.Registration.fireNonBubblingEvent(parent,w);}
;if(parent===Y){break;}
;parent=parent.parentNode;}
;}
,intoViewY:function(bD,stop,bC){var parent=bD.parentNode;var bB=qx.dom.Node.getDocument(bD);var bk=bB.body;var by,bt,bw;var bE,bx,bu;var bp,bl,bA;var br,bs,bq,bm;var bn,bv,bz;var bo=bC===f;var bF=bC===k;stop=stop?stop.parentNode:bB;while(parent&&parent!=stop){if(parent.scrollHeight>parent.clientHeight&&(parent===bk||qx.bom.element.Style.get(parent,x)!=b)){if(parent===bk){bt=parent.scrollTop;bw=bt+qx.bom.Viewport.getHeight();bE=qx.bom.Viewport.getHeight();bx=parent.clientHeight;bu=parent.scrollHeight;bp=0;bl=0;bA=0;}
else {by=qx.bom.element.Location.get(parent);bt=by.top;bw=by.bottom;bE=parent.offsetHeight;bx=parent.clientHeight;bu=parent.scrollHeight;bp=parseInt(qx.bom.element.Style.get(parent,e),10)||0;bl=parseInt(qx.bom.element.Style.get(parent,a),10)||0;bA=bE-bx-bp-bl;}
;br=qx.bom.element.Location.get(bD);bs=br.top;bq=br.bottom;bm=bD.offsetHeight;bn=bs-bt-bp;bv=bq-bw+bl;bz=0;if(bo){bz=bn;}
else if(bF){bz=bv+bA;}
else if(bn<0||bm>bx){bz=bn;}
else if(bv>0){bz=bv+bA;}
;parent.scrollTop+=bz;qx.event.Registration.fireNonBubblingEvent(parent,w);}
;if(parent===bk){break;}
;parent=parent.parentNode;}
;}
,intoView:function(bI,stop,bH,bG){this.intoViewX(bI,stop,bH);this.intoViewY(bI,stop,bG);}
}});}
)();
(function(){var a="useraction",b="Error in the 'Appearance' queue:",c="Error in the 'Widget' queue:",d=" due to exceptions in user code. The application has to be reloaded!",f="Error in the 'Layout' queue:",g="Error in the 'Visibility' queue:",h="qx.debug.ui.queue",i="Error in the 'Dispose' queue:",j="event.touch",k="qx.ui.core.queue.Manager",l=" times in a row",m="Fatal Error: Flush terminated ";qx.Class.define(k,{statics:{__ji:false,__gl:false,__jj:{},__jk:0,MAX_RETRIES:10,scheduleFlush:function(n){var self=qx.ui.core.queue.Manager;self.__jj[n]=true;if(!self.__ji){self.__gl=false;qx.bom.AnimationFrame.request(function(){if(self.__gl){self.__gl=false;return;}
;self.flush();}
,self);self.__ji=true;}
;}
,flush:function(){var self=qx.ui.core.queue.Manager;if(self.__jl){return;}
;self.__jl=true;self.__gl=true;var o=self.__jj;self.__jm(function(){while(o.visibility||o.widget||o.appearance||o.layout||o.element){if(o.widget){delete o.widget;if(qx.core.Environment.get(h)){try{qx.ui.core.queue.Widget.flush();}
catch(e){qx.log.Logger.error(qx.ui.core.queue.Widget,c+e,e);}
;}
else {qx.ui.core.queue.Widget.flush();}
;}
;if(o.visibility){delete o.visibility;if(qx.core.Environment.get(h)){try{qx.ui.core.queue.Visibility.flush();}
catch(e){qx.log.Logger.error(qx.ui.core.queue.Visibility,g+e,e);}
;}
else {qx.ui.core.queue.Visibility.flush();}
;}
;if(o.appearance){delete o.appearance;if(qx.core.Environment.get(h)){try{qx.ui.core.queue.Appearance.flush();}
catch(e){qx.log.Logger.error(qx.ui.core.queue.Appearance,b+e,e);}
;}
else {qx.ui.core.queue.Appearance.flush();}
;}
;if(o.widget||o.visibility||o.appearance){continue;}
;if(o.layout){delete o.layout;if(qx.core.Environment.get(h)){try{qx.ui.core.queue.Layout.flush();}
catch(e){qx.log.Logger.error(qx.ui.core.queue.Layout,f+e,e);}
;}
else {qx.ui.core.queue.Layout.flush();}
;}
;if(o.widget||o.visibility||o.appearance||o.layout){continue;}
;if(o.element){delete o.element;qx.html.Element.flush();}
;}
;}
,function(){self.__ji=false;}
);self.__jm(function(){if(o.dispose){delete o.dispose;if(qx.core.Environment.get(h)){try{qx.ui.core.queue.Dispose.flush();}
catch(e){qx.log.Logger.error(i+e);}
;}
else {qx.ui.core.queue.Dispose.flush();}
;}
;}
,function(){self.__jl=false;}
);self.__jk=0;}
,__jm:function(p,q){var self=qx.ui.core.queue.Manager;try{p();}
catch(e){{}
;self.__ji=false;self.__jl=false;self.__jk+=1;if(self.__jk<=self.MAX_RETRIES){self.scheduleFlush();}
else {throw new Error(m+(self.__jk-1)+l+d);}
;throw e;}
finally{q();}
;}
,__jn:function(e){qx.ui.core.queue.Manager.flush();}
},defer:function(r){qx.html.Element._scheduleFlush=r.scheduleFlush;qx.event.Registration.addListener(window,a,qx.core.Environment.get(j)?r.__jn:r.flush);}
});}
)();
(function(){var a="qx.ui.core.queue.Widget",b="widget",c="$$default";qx.Class.define(a,{statics:{__dO:[],__jj:{},remove:function(e,g){var d=this.__dO;if(!qx.lang.Array.contains(d,e)){return;}
;var f=e.$$hash;if(g==null){qx.lang.Array.remove(d,e);delete this.__jj[f];return;}
;if(this.__jj[f]){delete this.__jj[f][g];if(qx.lang.Object.getLength(this.__jj[f])==0){qx.lang.Array.remove(d,e);}
;}
;}
,add:function(j,l){var h=this.__dO;if(!qx.lang.Array.contains(h,j)){h.unshift(j);}
;if(l==null){l=c;}
;var k=j.$$hash;if(!this.__jj[k]){this.__jj[k]={};}
;this.__jj[k][l]=true;qx.ui.core.queue.Manager.scheduleFlush(b);}
,flush:function(){var m=this.__dO;var n,o;for(var i=m.length-1;i>=0;i-- ){n=m[i];o=this.__jj[n.$$hash];m.splice(i,1);n.syncWidget(o);}
;if(m.length!=0){return;}
;this.__dO=[];this.__jj={};}
}});}
)();
(function(){var a="qx.ui.core.queue.Visibility",b="visibility";qx.Class.define(a,{statics:{__dO:[],__cP:{},remove:function(c){delete this.__cP[c.$$hash];qx.lang.Array.remove(this.__dO,c);}
,isVisible:function(d){return this.__cP[d.$$hash]||false;}
,__jo:function(f){var h=this.__cP;var g=f.$$hash;var e;if(f.isExcluded()){e=false;}
else {var parent=f.$$parent;if(parent){e=this.__jo(parent);}
else {e=f.isRootWidget();}
;}
;return h[g]=e;}
,add:function(k){var j=this.__dO;if(qx.lang.Array.contains(j,k)){return;}
;j.unshift(k);qx.ui.core.queue.Manager.scheduleFlush(b);}
,flush:function(){var o=this.__dO;var p=this.__cP;for(var i=o.length-1;i>=0;i-- ){var n=o[i].$$hash;if(p[n]!=null){o[i].addChildrenToQueue(o);}
;}
;var l={};for(var i=o.length-1;i>=0;i-- ){var n=o[i].$$hash;l[n]=p[n];p[n]=null;}
;for(var i=o.length-1;i>=0;i-- ){var m=o[i];var n=m.$$hash;o.splice(i,1);if(p[n]==null){this.__jo(m);}
;if(p[n]&&p[n]!=l[n]){m.checkAppearanceNeeds();}
;}
;this.__dO=[];}
}});}
)();
(function(){var a="appearance",b="qx.ui.core.queue.Appearance";qx.Class.define(b,{statics:{__dO:[],remove:function(c){qx.lang.Array.remove(this.__dO,c);}
,add:function(e){var d=this.__dO;if(qx.lang.Array.contains(d,e)){return;}
;d.unshift(e);qx.ui.core.queue.Manager.scheduleFlush(a);}
,has:function(f){return qx.lang.Array.contains(this.__dO,f);}
,flush:function(){var j=qx.ui.core.queue.Visibility;var g=this.__dO;var h;for(var i=g.length-1;i>=0;i-- ){h=g[i];g.splice(i,1);if(j.isVisible(h)){h.syncAppearance();}
else {h.$$stateChanges=true;}
;}
;}
}});}
)();
(function(){var a="dispose",b="qx.ui.core.queue.Dispose";qx.Class.define(b,{statics:{__dO:[],add:function(d){var c=this.__dO;if(qx.lang.Array.contains(c,d)){return;}
;c.unshift(d);qx.ui.core.queue.Manager.scheduleFlush(a);}
,isEmpty:function(){return this.__dO.length==0;}
,flush:function(){var e=this.__dO;for(var i=e.length-1;i>=0;i-- ){var f=e[i];e.splice(i,1);f.dispose();}
;if(e.length!=0){return;}
;this.__dO=[];}
}});}
)();
(function(){var a="backgroundColor",b="drag",c="_applyNativeContextMenu",d="touch",f="div",g="_applyBackgroundColor",h="qx.event.type.Data",j="__ju",k="_applyFocusable",m=" requires a layout, but no one was defined!",n="qx.event.type.KeyInput",o="focused",p="disabled",q="move",r="createChildControl",s="qxanonymous",t="Unsupported control: ",u="dragstart",v="Font",w="qx.dynlocale",x="dragchange",y="_applyEnabled",z="_applySelectable",A="Number",B="_applyKeepActive",C="qx.event.type.Pinch",D="dragend",E="_applyVisibility",F="Child control '",G="qxDraggable",H="qx.event.type.Roll",I="syncAppearance",J="paddingLeft",K="__jp",L="' of widget ",M="qx.event.type.Mouse",N="_applyPadding",O="#",P="At least one child in control ",Q="visible",R="qx.event.type.Event",S="qx.event.type.MouseWheel",T="_applyCursor",U="changeVisibility",V="_applyDraggable",W="resize",X="Decorator",Y="Remove Error: ",cK="zIndex",cL="changeTextColor",cM="$$widget",cG="changeContextMenu",cH="on",cI="paddingTop",cJ="opacity",cR="This widget has no children!",cS="changeSelectable",cT="_applyAnonymous",cU="none",cN="outline",cO="hidden",cP="_applyAppearance",cQ="hovered",cY="_applyOpacity",dB="Boolean",eo="px",da="qx.ui.core.Widget",cV="longtap",cW="default",ej="TabIndex property must be between 1 and 32000",cX="_applyFont",db="cursor",dc="qxDroppable",dd="' already created!",di="changeZIndex",dj=": ",dk="Color",de="changeEnabled",df="Abstract method call: _getContentHeightForWidth()!",dg="changeFont",dh="qx.event.type.Focus",dp="_applyDecorator",dq="_applyZIndex",dr="_applyTextColor",ds="__jw",dl="Widget is not focusable!",dm="qx.ui.menu.Menu",ek="engine.name",dn="qx.event.type.Drag",dw="qx.event.type.KeySequence",dx="excluded",en="DOM element is not yet created!",dy="_applyToolTipText",dt="Exception while creating child control '",du="qx.event.type.Rotate",em="_applyDroppable",dv=" is not a child of this widget!",dz="true",dA="widget",dM="changeDecorator",dL="qx.event.type.Tap",dK="Integer",dQ="_applyTabIndex",dP="changeAppearance",dO="qx.event.type.Track",dN="shorthand",dF="/",dE="String",dD="border-box",dC="",dJ="_applyContextMenu",dI="changeToolTipText",dH="padding",dG="tabIndex",dX="paddingBottom",dW="beforeContextmenuOpen",dV="changeNativeContextMenu",dU="undefined",ec="qx.ui.tooltip.ToolTip",eb="__jt",ea="contextmenu",dY="_applyKeepFocus",dT="paddingRight",dS="changeBackgroundColor",dR="changeLocale",ef="qx.event.type.Pointer",ee="qxKeepFocus",ed="opera",ei="qx.event.type.Touch",eh="qxKeepActive",eg="absolute";qx.Class.define(da,{extend:qx.ui.core.LayoutItem,include:[qx.locale.MTranslation],construct:function(){qx.ui.core.LayoutItem.call(this);this.__jp=this.__jv();this.initFocusable();this.initSelectable();this.initNativeContextMenu();}
,events:{appear:R,disappear:R,createChildControl:h,resize:h,move:h,syncAppearance:h,mousemove:M,mouseover:M,mouseout:M,mousedown:M,mouseup:M,click:M,dblclick:M,contextmenu:M,beforeContextmenuOpen:h,mousewheel:S,touchstart:ei,touchend:ei,touchmove:ei,touchcancel:ei,tap:dL,longtap:dL,dbltap:dL,swipe:ei,rotate:du,pinch:C,track:dO,roll:H,pointermove:ef,pointerover:ef,pointerout:ef,pointerdown:ef,pointerup:ef,pointercancel:ef,keyup:dw,keydown:dw,keypress:dw,keyinput:n,focus:dh,blur:dh,focusin:dh,focusout:dh,activate:dh,deactivate:dh,capture:R,losecapture:R,drop:dn,dragleave:dn,dragover:dn,drag:dn,dragstart:dn,dragend:dn,dragchange:dn,droprequest:dn},properties:{paddingTop:{check:dK,init:0,apply:N,themeable:true},paddingRight:{check:dK,init:0,apply:N,themeable:true},paddingBottom:{check:dK,init:0,apply:N,themeable:true},paddingLeft:{check:dK,init:0,apply:N,themeable:true},padding:{group:[cI,dT,dX,J],mode:dN,themeable:true},zIndex:{nullable:true,init:10,apply:dq,event:di,check:dK,themeable:true},decorator:{nullable:true,init:null,apply:dp,event:dM,check:X,themeable:true},backgroundColor:{nullable:true,check:dk,apply:g,event:dS,themeable:true},textColor:{nullable:true,check:dk,apply:dr,event:cL,themeable:true,inheritable:true},font:{nullable:true,apply:cX,check:v,event:dg,themeable:true,inheritable:true,dereference:true},opacity:{check:A,apply:cY,themeable:true,nullable:true,init:null},cursor:{check:dE,apply:T,themeable:true,inheritable:true,nullable:true,init:null},toolTip:{check:ec,nullable:true},toolTipText:{check:dE,nullable:true,event:dI,apply:dy},toolTipIcon:{check:dE,nullable:true,event:dI},blockToolTip:{check:dB,init:false},showToolTipWhenDisabled:{check:dB,init:false},visibility:{check:[Q,cO,dx],init:Q,apply:E,event:U},enabled:{init:true,check:dB,inheritable:true,apply:y,event:de},anonymous:{init:false,check:dB,apply:cT},tabIndex:{check:dK,nullable:true,apply:dQ},focusable:{check:dB,init:false,apply:k},keepFocus:{check:dB,init:false,apply:dY},keepActive:{check:dB,init:false,apply:B},draggable:{check:dB,init:false,apply:V},droppable:{check:dB,init:false,apply:em},selectable:{check:dB,init:false,event:cS,apply:z},contextMenu:{check:dm,apply:dJ,nullable:true,event:cG},nativeContextMenu:{check:dB,init:false,themeable:true,event:dV,apply:c},appearance:{check:dE,init:dA,apply:cP,event:dP}},statics:{DEBUG:false,getWidgetByElement:function(es,eq){while(es){var ep=es.$$widget;if(ep!=null){var er=qx.core.ObjectRegistry.fromHashCode(ep);if(!eq||!er.getAnonymous()){return er;}
;}
;try{es=es.parentNode;}
catch(e){return null;}
;}
;return null;}
,contains:function(parent,et){while(et){et=et.getLayoutParent();if(parent==et){return true;}
;}
;return false;}
,__jq:new qx.util.ObjectPool()},members:{__jp:null,__jr:null,__js:null,__jt:null,_getLayout:function(){return this.__jt;}
,_setLayout:function(eu){{}
;if(this.__jt){this.__jt.connectToWidget(null);}
;if(eu){eu.connectToWidget(this);}
;this.__jt=eu;qx.ui.core.queue.Layout.add(this);}
,setLayoutParent:function(parent){if(this.$$parent===parent){return;}
;var content=this.getContentElement();if(this.$$parent&&!this.$$parent.$$disposed){this.$$parent.getContentElement().remove(content);}
;this.$$parent=parent||null;if(parent&&!parent.$$disposed){this.$$parent.getContentElement().add(content);}
;this.$$refreshInheritables();qx.ui.core.queue.Visibility.add(this);}
,_updateInsets:null,renderLayout:function(eB,top,ey,ew){var eC=qx.ui.core.LayoutItem.prototype.renderLayout.call(this,eB,top,ey,ew);if(!eC){return null;}
;if(qx.lang.Object.isEmpty(eC)&&!this._updateInsets){return null;}
;var content=this.getContentElement();var eF=eC.size||this._updateInsets;var eD=eo;var ev={};if(eC.position){ev.left=eB+eD;ev.top=top+eD;}
;if(eF||eC.margin){ev.width=ey+eD;ev.height=ew+eD;}
;if(Object.keys(ev).length>0){content.setStyles(ev);}
;if(eF||eC.local||eC.margin){if(this.__jt&&this.hasLayoutChildren()){var eA=this.getInsets();var innerWidth=ey-eA.left-eA.right;var innerHeight=ew-eA.top-eA.bottom;var eE=this.getDecorator();var ez={left:0,right:0,top:0,bottom:0};if(eE){eE=qx.theme.manager.Decoration.getInstance().resolve(eE);ez=eE.getPadding();}
;var ex={top:this.getPaddingTop()+ez.top,right:this.getPaddingRight()+ez.right,bottom:this.getPaddingBottom()+ez.bottom,left:this.getPaddingLeft()+ez.left};this.__jt.renderLayout(innerWidth,innerHeight,ex);}
else if(this.hasLayoutChildren()){throw new Error(P+this._findTopControl()+m);}
;}
;if(eC.position&&this.hasListener(q)){this.fireDataEvent(q,this.getBounds());}
;if(eC.size&&this.hasListener(W)){this.fireDataEvent(W,this.getBounds());}
;delete this._updateInsets;return eC;}
,__ju:null,clearSeparators:function(){var eH=this.__ju;if(!eH){return;}
;var eI=qx.ui.core.Widget.__jq;var content=this.getContentElement();var eG;for(var i=0,l=eH.length;i<l;i++ ){eG=eH[i];eI.poolObject(eG);content.remove(eG.getContentElement());}
;eH.length=0;}
,renderSeparator:function(eK,eL){var eJ=qx.ui.core.Widget.__jq.getObject(qx.ui.core.Widget);eJ.set({decorator:eK});var eN=eJ.getContentElement();this.getContentElement().add(eN);var eM=eN.getDomElement();if(eM){eM.style.top=eL.top+eo;eM.style.left=eL.left+eo;eM.style.width=eL.width+eo;eM.style.height=eL.height+eo;}
else {eN.setStyles({left:eL.left+eo,top:eL.top+eo,width:eL.width+eo,height:eL.height+eo});}
;if(!this.__ju){this.__ju=[];}
;this.__ju.push(eJ);}
,_computeSizeHint:function(){var eU=this.getWidth();var eO=this.getMinWidth();var eP=this.getMaxWidth();var eS=this.getHeight();var eQ=this.getMinHeight();var eR=this.getMaxHeight();{}
;var eV=this._getContentHint();var eT=this.getInsets();var eX=eT.left+eT.right;var eW=eT.top+eT.bottom;if(eU==null){eU=eV.width+eX;}
;if(eS==null){eS=eV.height+eW;}
;if(eO==null){eO=eX;if(eV.minWidth!=null){eO+=eV.minWidth;if(eO>eP&&eP!=null){eO=eP;}
;}
;}
;if(eQ==null){eQ=eW;if(eV.minHeight!=null){eQ+=eV.minHeight;if(eQ>eR&&eR!=null){eQ=eR;}
;}
;}
;if(eP==null){if(eV.maxWidth==null){eP=Infinity;}
else {eP=eV.maxWidth+eX;if(eP<eO&&eO!=null){eP=eO;}
;}
;}
;if(eR==null){if(eV.maxHeight==null){eR=Infinity;}
else {eR=eV.maxHeight+eW;if(eR<eQ&&eQ!=null){eR=eQ;}
;}
;}
;return {width:eU,minWidth:eO,maxWidth:eP,height:eS,minHeight:eQ,maxHeight:eR};}
,invalidateLayoutCache:function(){qx.ui.core.LayoutItem.prototype.invalidateLayoutCache.call(this);if(this.__jt){this.__jt.invalidateLayoutCache();}
;}
,_getContentHint:function(){var fa=this.__jt;if(fa){if(this.hasLayoutChildren()){var fb=fa.getSizeHint();{var eY;}
;return fb;}
else {return {width:0,height:0};}
;}
else {return {width:100,height:50};}
;}
,_getHeightForWidth:function(fg){var ff=this.getInsets();var fc=ff.left+ff.right;var fi=ff.top+ff.bottom;var fh=fg-fc;var fd=this._getLayout();if(fd&&fd.hasHeightForWidth()){var fj=fd.getHeightForWidth(fh);}
else {fj=this._getContentHeightForWidth(fh);}
;var fe=fj+fi;return fe;}
,_getContentHeightForWidth:function(fk){throw new Error(df);}
,getInsets:function(){var top=this.getPaddingTop();var fl=this.getPaddingRight();var fm=this.getPaddingBottom();var fp=this.getPaddingLeft();if(this.getDecorator()){var fo=qx.theme.manager.Decoration.getInstance().resolve(this.getDecorator());var fn=fo.getInsets();{}
;top+=fn.top;fl+=fn.right;fm+=fn.bottom;fp+=fn.left;}
;return {"top":top,"right":fl,"bottom":fm,"left":fp};}
,getInnerSize:function(){var fr=this.getBounds();if(!fr){return null;}
;var fq=this.getInsets();return {width:fr.width-fq.left-fq.right,height:fr.height-fq.top-fq.bottom};}
,fadeOut:function(fs){return this.getContentElement().fadeOut(fs);}
,fadeIn:function(ft){return this.getContentElement().fadeIn(ft);}
,_applyAnonymous:function(fu){if(fu){this.getContentElement().setAttribute(s,dz);}
else {this.getContentElement().removeAttribute(s);}
;}
,show:function(){this.setVisibility(Q);}
,hide:function(){this.setVisibility(cO);}
,exclude:function(){this.setVisibility(dx);}
,isVisible:function(){return this.getVisibility()===Q;}
,isHidden:function(){return this.getVisibility()!==Q;}
,isExcluded:function(){return this.getVisibility()===dx;}
,isSeeable:function(){qx.ui.core.queue.Manager.flush();var fv=this.getContentElement().getDomElement();if(fv){return fv.offsetWidth>0;}
;return false;}
,__jv:function(){var fx=this._createContentElement();fx.setAttribute(cM,this.toHashCode());fx.setStyles({"touch-action":cU,"-ms-touch-action":cU});{}
;var fw={"zIndex":10,"boxSizing":dD};if(!qx.ui.root.Inline||!(this instanceof qx.ui.root.Inline)){fw.position=eg;}
;fx.setStyles(fw);return fx;}
,_createContentElement:function(){return new qx.html.Element(f,{overflowX:cO,overflowY:cO});}
,getContentElement:function(){return this.__jp;}
,__jw:null,getLayoutChildren:function(){var fz=this.__jw;if(!fz){return this.__jx;}
;var fA;for(var i=0,l=fz.length;i<l;i++ ){var fy=fz[i];if(fy.hasUserBounds()||fy.isExcluded()){if(fA==null){fA=fz.concat();}
;qx.lang.Array.remove(fA,fy);}
;}
;return fA||fz;}
,scheduleLayoutUpdate:function(){qx.ui.core.queue.Layout.add(this);}
,invalidateLayoutChildren:function(){var fB=this.__jt;if(fB){fB.invalidateChildrenCache();}
;qx.ui.core.queue.Layout.add(this);}
,hasLayoutChildren:function(){var fD=this.__jw;if(!fD){return false;}
;var fC;for(var i=0,l=fD.length;i<l;i++ ){fC=fD[i];if(!fC.hasUserBounds()&&!fC.isExcluded()){return true;}
;}
;return false;}
,getChildrenContainer:function(){return this;}
,__jx:[],_getChildren:function(){return this.__jw||this.__jx;}
,_indexOf:function(fF){var fE=this.__jw;if(!fE){return -1;}
;return fE.indexOf(fF);}
,_hasChildren:function(){var fG=this.__jw;return fG!=null&&(!!fG[0]);}
,addChildrenToQueue:function(fH){var fI=this.__jw;if(!fI){return;}
;var fJ;for(var i=0,l=fI.length;i<l;i++ ){fJ=fI[i];fH.push(fJ);fJ.addChildrenToQueue(fH);}
;}
,_add:function(fL,fK){{}
;if(fL.getLayoutParent()==this){qx.lang.Array.remove(this.__jw,fL);}
;if(this.__jw){this.__jw.push(fL);}
else {this.__jw=[fL];}
;this.__jy(fL,fK);}
,_addAt:function(fP,fM,fO){if(!this.__jw){this.__jw=[];}
;if(fP.getLayoutParent()==this){qx.lang.Array.remove(this.__jw,fP);}
;var fN=this.__jw[fM];if(fN===fP){fP.setLayoutProperties(fO);}
;if(fN){qx.lang.Array.insertBefore(this.__jw,fP,fN);}
else {this.__jw.push(fP);}
;this.__jy(fP,fO);}
,_addBefore:function(fQ,fS,fR){{}
;if(fQ==fS){return;}
;if(!this.__jw){this.__jw=[];}
;if(fQ.getLayoutParent()==this){qx.lang.Array.remove(this.__jw,fQ);}
;qx.lang.Array.insertBefore(this.__jw,fQ,fS);this.__jy(fQ,fR);}
,_addAfter:function(fV,fT,fU){{}
;if(fV==fT){return;}
;if(!this.__jw){this.__jw=[];}
;if(fV.getLayoutParent()==this){qx.lang.Array.remove(this.__jw,fV);}
;qx.lang.Array.insertAfter(this.__jw,fV,fT);this.__jy(fV,fU);}
,_remove:function(fW){if(!this.__jw){throw new Error(cR);}
;qx.lang.Array.remove(this.__jw,fW);this.__jz(fW);}
,_removeAt:function(fX){if(!this.__jw){throw new Error(cR);}
;var fY=this.__jw[fX];qx.lang.Array.removeAt(this.__jw,fX);this.__jz(fY);return fY;}
,_removeAll:function(){if(!this.__jw){return [];}
;var ga=this.__jw.concat();this.__jw.length=0;for(var i=ga.length-1;i>=0;i-- ){this.__jz(ga[i]);}
;qx.ui.core.queue.Layout.add(this);return ga;}
,_afterAddChild:null,_afterRemoveChild:null,__jy:function(gc,gb){{}
;var parent=gc.getLayoutParent();if(parent&&parent!=this){parent._remove(gc);}
;gc.setLayoutParent(this);if(gb){gc.setLayoutProperties(gb);}
else {this.updateLayoutProperties();}
;if(this._afterAddChild){this._afterAddChild(gc);}
;}
,__jz:function(gd){{}
;if(gd.getLayoutParent()!==this){throw new Error(Y+gd+dv);}
;gd.setLayoutParent(null);if(this.__jt){this.__jt.invalidateChildrenCache();}
;qx.ui.core.queue.Layout.add(this);if(this._afterRemoveChild){this._afterRemoveChild(gd);}
;}
,capture:function(ge){this.getContentElement().capture(ge);}
,releaseCapture:function(){this.getContentElement().releaseCapture();}
,isCapturing:function(){var gf=this.getContentElement().getDomElement();if(!gf){return false;}
;var gg=qx.event.Registration.getManager(gf);var gh=gg.getDispatcher(qx.event.dispatch.MouseCapture);return gf==gh.getCaptureElement();}
,_applyPadding:function(gj,gi,name){this._updateInsets=true;qx.ui.core.queue.Layout.add(this);this.__jA(name,gj);}
,__jA:function(gk,gn){var content=this.getContentElement();var gl=this.getDecorator();gl=qx.theme.manager.Decoration.getInstance().resolve(gl);if(gl){var gm=qx.Bootstrap.firstLow(gk.replace(dH,dC));gn+=gl.getPadding()[gm]||0;}
;content.setStyle(gk,gn+eo);}
,_applyDecorator:function(gp,go){var content=this.getContentElement();if(go){go=qx.theme.manager.Decoration.getInstance().getCssClassName(go);content.removeClass(go);}
;if(gp){gp=qx.theme.manager.Decoration.getInstance().addCssClass(gp);content.addClass(gp);}
;if(gp||go){qx.ui.core.queue.Layout.add(this);}
;}
,_applyToolTipText:function(gs,gr){if(qx.core.Environment.get(w)){if(this.__js){return;}
;var gq=qx.locale.Manager.getInstance();this.__js=gq.addListener(dR,function(){var gt=this.getToolTipText();if(gt&&gt.translate){this.setToolTipText(gt.translate());}
;}
,this);}
;}
,_applyTextColor:function(gv,gu){}
,_applyZIndex:function(gx,gw){this.getContentElement().setStyle(cK,gx==null?0:gx);}
,_applyVisibility:function(gz,gy){var content=this.getContentElement();if(gz===Q){content.show();}
else {content.hide();}
;var parent=this.$$parent;if(parent&&(gy==null||gz==null||gy===dx||gz===dx)){parent.invalidateLayoutChildren();}
;qx.ui.core.queue.Visibility.add(this);}
,_applyOpacity:function(gB,gA){this.getContentElement().setStyle(cJ,gB==1?null:gB);}
,_applyCursor:function(gD,gC){if(gD==null&&!this.isSelectable()){gD=cW;}
;this.getContentElement().setStyle(db,gD,qx.core.Environment.get(ek)==ed);}
,_applyBackgroundColor:function(gH,gG){var gF=this.getBackgroundColor();var content=this.getContentElement();var gE=qx.theme.manager.Color.getInstance().resolve(gF);content.setStyle(a,gE);}
,_applyFont:function(gJ,gI){}
,_onChangeTheme:function(){if(this.isDisposed()){return;}
;qx.ui.core.LayoutItem.prototype._onChangeTheme.call(this);this.updateAppearance();var gK=this.getDecorator();this._applyDecorator(null,gK);this._applyDecorator(gK);gK=this.getFont();if(qx.lang.Type.isString(gK)){this._applyFont(gK,gK);}
;gK=this.getTextColor();if(qx.lang.Type.isString(gK)){this._applyTextColor(gK,gK);}
;gK=this.getBackgroundColor();if(qx.lang.Type.isString(gK)){this._applyBackgroundColor(gK,gK);}
;}
,__jB:null,$$stateChanges:null,_forwardStates:null,hasState:function(gM){var gL=this.__jB;return !!gL&&!!gL[gM];}
,addState:function(gQ){var gP=this.__jB;if(!gP){gP=this.__jB={};}
;if(gP[gQ]){return;}
;this.__jB[gQ]=true;if(gQ===cQ){this.syncAppearance();}
else if(!qx.ui.core.queue.Visibility.isVisible(this)){this.$$stateChanges=true;}
else {qx.ui.core.queue.Appearance.add(this);}
;var forward=this._forwardStates;var gO=this.__jE;if(forward&&forward[gQ]&&gO){var gN;for(var gR in gO){gN=gO[gR];if(gN instanceof qx.ui.core.Widget){gO[gR].addState(gQ);}
;}
;}
;}
,removeState:function(gV){var gU=this.__jB;if(!gU||!gU[gV]){return;}
;delete this.__jB[gV];if(gV===cQ){this.syncAppearance();}
else if(!qx.ui.core.queue.Visibility.isVisible(this)){this.$$stateChanges=true;}
else {qx.ui.core.queue.Appearance.add(this);}
;var forward=this._forwardStates;var gT=this.__jE;if(forward&&forward[gV]&&gT){for(var gW in gT){var gS=gT[gW];if(gS instanceof qx.ui.core.Widget){gS.removeState(gV);}
;}
;}
;}
,replaceState:function(gY,hc){var hb=this.__jB;if(!hb){hb=this.__jB={};}
;if(!hb[hc]){hb[hc]=true;}
;if(hb[gY]){delete hb[gY];}
;if(!qx.ui.core.queue.Visibility.isVisible(this)){this.$$stateChanges=true;}
else {qx.ui.core.queue.Appearance.add(this);}
;var forward=this._forwardStates;var ha=this.__jE;if(forward&&forward[hc]&&ha){for(var hd in ha){var gX=ha[hd];if(gX instanceof qx.ui.core.Widget){gX.replaceState(gY,hc);}
;}
;}
;}
,__jC:null,__jD:null,syncAppearance:function(){var hi=this.__jB;var hh=this.__jC;var hj=qx.theme.manager.Appearance.getInstance();var hf=qx.core.Property.$$method.setThemed;var hn=qx.core.Property.$$method.resetThemed;if(this.__jD){delete this.__jD;if(hh){var he=hj.styleFrom(hh,hi,null,this.getAppearance());hh=null;}
;}
;if(!hh){var hg=this;var hk=[];do {hk.push(hg.$$subcontrol||hg.getAppearance());}
while(hg=hg.$$subparent);hh=hk.reverse().join(dF).replace(/#[0-9]+/g,dC);this.__jC=hh;}
;var hm=hj.styleFrom(hh,hi,null,this.getAppearance());if(hm){if(he){for(var hl in he){if(hm[hl]===undefined){this[hn[hl]]();}
;}
;}
;{var hl;}
;for(var hl in hm){hm[hl]===undefined?this[hn[hl]]():this[hf[hl]](hm[hl]);}
;}
else if(he){for(var hl in he){this[hn[hl]]();}
;}
;this.fireDataEvent(I,this.__jB);}
,_applyAppearance:function(hp,ho){this.updateAppearance();}
,checkAppearanceNeeds:function(){if(!this.__jr){qx.ui.core.queue.Appearance.add(this);this.__jr=true;}
else if(this.$$stateChanges){qx.ui.core.queue.Appearance.add(this);delete this.$$stateChanges;}
;}
,updateAppearance:function(){this.__jD=true;qx.ui.core.queue.Appearance.add(this);var hs=this.__jE;if(hs){var hq;for(var hr in hs){hq=hs[hr];if(hq instanceof qx.ui.core.Widget){hq.updateAppearance();}
;}
;}
;}
,syncWidget:function(ht){}
,getEventTarget:function(){var hu=this;while(hu.getAnonymous()){hu=hu.getLayoutParent();if(!hu){return null;}
;}
;return hu;}
,getFocusTarget:function(){var hv=this;if(!hv.getEnabled()){return null;}
;while(hv.getAnonymous()||!hv.getFocusable()){hv=hv.getLayoutParent();if(!hv||!hv.getEnabled()){return null;}
;}
;return hv;}
,getFocusElement:function(){return this.getContentElement();}
,isTabable:function(){return (!!this.getContentElement().getDomElement())&&this.isFocusable();}
,_applyFocusable:function(hy,hw){var hx=this.getFocusElement();if(hy){var hz=this.getTabIndex();if(hz==null){hz=1;}
;hx.setAttribute(dG,hz);hx.setStyle(cN,cU);}
else {if(hx.isNativelyFocusable()){hx.setAttribute(dG,-1);}
else if(hw){hx.setAttribute(dG,null);}
;}
;}
,_applyKeepFocus:function(hB){var hA=this.getFocusElement();hA.setAttribute(ee,hB?cH:null);}
,_applyKeepActive:function(hD){var hC=this.getContentElement();hC.setAttribute(eh,hD?cH:null);}
,_applyTabIndex:function(hE){if(hE==null){hE=1;}
else if(hE<1||hE>32000){throw new Error(ej);}
;if(this.getFocusable()&&hE!=null){this.getFocusElement().setAttribute(dG,hE);}
;}
,_applySelectable:function(hG,hF){if(hF!==null){this._applyCursor(this.getCursor());}
;this.getContentElement().setSelectable(hG);}
,_applyEnabled:function(hI,hH){if(hI===false){this.addState(p);this.removeState(cQ);if(this.isFocusable()){this.removeState(o);this._applyFocusable(false,true);}
;if(this.isDraggable()){this._applyDraggable(false,true);}
;if(this.isDroppable()){this._applyDroppable(false,true);}
;}
else {this.removeState(p);if(this.isFocusable()){this._applyFocusable(true,false);}
;if(this.isDraggable()){this._applyDraggable(true,false);}
;if(this.isDroppable()){this._applyDroppable(true,false);}
;}
;}
,_applyNativeContextMenu:function(hK,hJ,name){}
,_applyContextMenu:function(hM,hL){if(hL){hL.removeState(ea);if(hL.getOpener()==this){hL.resetOpener();}
;if(!hM){this.removeListener(ea,this._onContextMenuOpen);this.removeListener(cV,this._onContextMenuOpen);hL.removeListener(U,this._onBeforeContextMenuOpen,this);}
;}
;if(hM){hM.setOpener(this);hM.addState(ea);if(!hL){this.addListener(ea,this._onContextMenuOpen);this.addListener(cV,this._onContextMenuOpen);hM.addListener(U,this._onBeforeContextMenuOpen,this);}
;}
;}
,_onContextMenuOpen:function(e){if(e.getType()==cV){if(e.getPointerType()!==d){return;}
;}
;this.getContextMenu().openAtPointer(e);e.stop();}
,_onBeforeContextMenuOpen:function(e){if(e.getData()==Q&&this.hasListener(dW)){this.fireDataEvent(dW,e);}
;}
,_onStopEvent:function(e){e.stopPropagation();}
,_getDragDropCursor:function(){return qx.ui.core.DragDropCursor.getInstance();}
,_applyDraggable:function(hO,hN){if(!this.isEnabled()&&hO===true){hO=false;}
;this._getDragDropCursor();if(hO){this.addListener(u,this._onDragStart);this.addListener(b,this._onDrag);this.addListener(D,this._onDragEnd);this.addListener(x,this._onDragChange);}
else {this.removeListener(u,this._onDragStart);this.removeListener(b,this._onDrag);this.removeListener(D,this._onDragEnd);this.removeListener(x,this._onDragChange);}
;this.getContentElement().setAttribute(G,hO?cH:null);}
,_applyDroppable:function(hQ,hP){if(!this.isEnabled()&&hQ===true){hQ=false;}
;this.getContentElement().setAttribute(dc,hQ?cH:null);}
,_onDragStart:function(e){this._getDragDropCursor().placeToPointer(e);this.getApplicationRoot().setGlobalCursor(cW);}
,_onDrag:function(e){this._getDragDropCursor().placeToPointer(e);}
,_onDragEnd:function(e){this._getDragDropCursor().moveTo(-1000,-1000);this.getApplicationRoot().resetGlobalCursor();}
,_onDragChange:function(e){var hR=this._getDragDropCursor();var hS=e.getCurrentAction();hS?hR.setAction(hS):hR.resetAction();}
,visualizeFocus:function(){this.addState(o);}
,visualizeBlur:function(){this.removeState(o);}
,scrollChildIntoView:function(hX,hW,hV,hU){hU=typeof hU==dU?true:hU;var hT=qx.ui.core.queue.Layout;var parent;if(hU){hU=!hT.isScheduled(hX);parent=hX.getLayoutParent();if(hU&&parent){hU=!hT.isScheduled(parent);if(hU){parent.getChildren().forEach(function(hY){hU=hU&&!hT.isScheduled(hY);}
);}
;}
;}
;this.scrollChildIntoViewX(hX,hW,hU);this.scrollChildIntoViewY(hX,hV,hU);}
,scrollChildIntoViewX:function(ic,ia,ib){this.getContentElement().scrollChildIntoViewX(ic.getContentElement(),ia,ib);}
,scrollChildIntoViewY:function(ih,ie,ig){this.getContentElement().scrollChildIntoViewY(ih.getContentElement(),ie,ig);}
,focus:function(){if(this.isFocusable()){this.getFocusElement().focus();}
else {throw new Error(dl);}
;}
,blur:function(){if(this.isFocusable()){this.getFocusElement().blur();}
else {throw new Error(dl);}
;}
,activate:function(){this.getContentElement().activate();}
,deactivate:function(){this.getContentElement().deactivate();}
,tabFocus:function(){this.getFocusElement().focus();}
,hasChildControl:function(ii){if(!this.__jE){return false;}
;return !!this.__jE[ii];}
,__jE:null,_getCreatedChildControls:function(){return this.__jE;}
,getChildControl:function(il,ik){if(!this.__jE){if(ik){return null;}
;this.__jE={};}
;var ij=this.__jE[il];if(ij){return ij;}
;if(ik===true){return null;}
;return this._createChildControl(il);}
,_showChildControl:function(io){var im=this.getChildControl(io);im.show();return im;}
,_excludeChildControl:function(iq){var ip=this.getChildControl(iq,true);if(ip){ip.exclude();}
;}
,_isChildControlVisible:function(is){var ir=this.getChildControl(is,true);if(ir){return ir.isVisible();}
;return false;}
,_releaseChildControl:function(iw){var it=this.getChildControl(iw,false);if(!it){throw new Error(t+iw);}
;delete it.$$subcontrol;delete it.$$subparent;var iu=this.__jB;var forward=this._forwardStates;if(iu&&forward&&it instanceof qx.ui.core.Widget){for(var iv in iu){if(forward[iv]){it.removeState(iv);}
;}
;}
;delete this.__jE[iw];return it;}
,_createChildControl:function(iB){if(!this.__jE){this.__jE={};}
else if(this.__jE[iB]){throw new Error(F+iB+dd);}
;var iy=iB.indexOf(O);try{if(iy==-1){var ix=this._createChildControlImpl(iB);}
else {var ix=this._createChildControlImpl(iB.substring(0,iy),iB.substring(iy+1,iB.length));}
;}
catch(iC){iC.message=dt+iB+L+this.toString()+dj+iC.message;throw iC;}
;if(!ix){throw new Error(t+iB);}
;ix.$$subcontrol=iB;ix.$$subparent=this;var iz=this.__jB;var forward=this._forwardStates;if(iz&&forward&&ix instanceof qx.ui.core.Widget){for(var iA in iz){if(forward[iA]){ix.addState(iA);}
;}
;}
;this.fireDataEvent(r,ix);return this.__jE[iB]=ix;}
,_createChildControlImpl:function(iE,iD){return null;}
,_disposeChildControls:function(){var iI=this.__jE;if(!iI){return;}
;var iG=qx.ui.core.Widget;for(var iH in iI){var iF=iI[iH];if(!iG.contains(this,iF)){iF.destroy();}
else {iF.dispose();}
;}
;delete this.__jE;}
,_findTopControl:function(){var iJ=this;while(iJ){if(!iJ.$$subparent){return iJ;}
;iJ=iJ.$$subparent;}
;return null;}
,getContentLocation:function(iL){var iK=this.getContentElement().getDomElement();return iK?qx.bom.element.Location.get(iK,iL):null;}
,setDomLeft:function(iN){var iM=this.getContentElement().getDomElement();if(iM){iM.style.left=iN+eo;}
else {throw new Error(en);}
;}
,setDomTop:function(iP){var iO=this.getContentElement().getDomElement();if(iO){iO.style.top=iP+eo;}
else {throw new Error(en);}
;}
,setDomPosition:function(iR,top){var iQ=this.getContentElement().getDomElement();if(iQ){iQ.style.left=iR+eo;iQ.style.top=top+eo;}
else {throw new Error(en);}
;}
,destroy:function(){if(this.$$disposed){return;}
;var parent=this.$$parent;if(parent){parent._remove(this);}
;qx.ui.core.queue.Dispose.add(this);}
,clone:function(){var iS=qx.ui.core.LayoutItem.prototype.clone.call(this);if(this.getChildren){var iT=this.getChildren();for(var i=0,l=iT.length;i<l;i++ ){iS.add(iT[i].clone());}
;}
;return iS;}
},destruct:function(){if(!qx.core.ObjectRegistry.inShutDown){if(qx.core.Environment.get(w)){if(this.__js){qx.locale.Manager.getInstance().removeListenerById(this.__js);}
;}
;var iU=this.getContentElement();if(iU){iU.setAttribute(cM,null,true);}
;this._disposeChildControls();qx.ui.core.queue.Appearance.remove(this);qx.ui.core.queue.Layout.remove(this);qx.ui.core.queue.Visibility.remove(this);qx.ui.core.queue.Widget.remove(this);}
;if(this.getContextMenu()){this.setContextMenu(null);}
;if(!qx.core.ObjectRegistry.inShutDown){this.clearSeparators();this.__ju=null;}
else {this._disposeArray(j);}
;this._disposeArray(ds);this.__jB=this.__jE=null;this._disposeObjects(eb,K);}
});}
)();
(function(){var a="blur",b="activate",c="focus",d="qx.ui.core.EventHandler";qx.Class.define(d,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(){qx.core.Object.call(this);this.__gt=qx.event.Registration.getManager(window);}
,statics:{PRIORITY:qx.event.Registration.PRIORITY_FIRST,SUPPORTED_TYPES:{mousemove:1,mouseover:1,mouseout:1,mousedown:1,mouseup:1,click:1,dblclick:1,contextmenu:1,mousewheel:1,keyup:1,keydown:1,keypress:1,keyinput:1,capture:1,losecapture:1,focusin:1,focusout:1,focus:1,blur:1,activate:1,deactivate:1,appear:1,disappear:1,dragstart:1,dragend:1,dragover:1,dragleave:1,drop:1,drag:1,dragchange:1,droprequest:1,touchstart:1,touchend:1,touchmove:1,touchcancel:1,tap:1,longtap:1,swipe:1,dbltap:1,track:1,trackend:1,trackstart:1,pinch:1,rotate:1,roll:1,pointermove:1,pointerover:1,pointerout:1,pointerdown:1,pointerup:1,pointercancel:1},IGNORE_CAN_HANDLE:false},members:{__gt:null,__lf:{focusin:1,focusout:1,focus:1,blur:1},__lg:{mouseover:1,mouseout:1,appear:1,disappear:1},canHandleEvent:function(f,e){return f instanceof qx.ui.core.Widget;}
,_dispatchEvent:function(j){var o=j.getTarget();var n=qx.ui.core.Widget.getWidgetByElement(o);var p=false;while(n&&n.isAnonymous()){var p=true;n=n.getLayoutParent();}
;if(n&&p&&j.getType()==b){n.getContentElement().activate();}
;if(this.__lf[j.getType()]){n=n&&n.getFocusTarget();if(!n){return;}
;}
;if(j.getRelatedTarget){var w=j.getRelatedTarget();var v=qx.ui.core.Widget.getWidgetByElement(w);while(v&&v.isAnonymous()){v=v.getLayoutParent();}
;if(v){if(this.__lf[j.getType()]){v=v.getFocusTarget();}
;if(v===n){return;}
;}
;}
;var r=j.getCurrentTarget();var t=qx.ui.core.Widget.getWidgetByElement(r);if(!t||t.isAnonymous()){return;}
;if(this.__lf[j.getType()]){t=t.getFocusTarget();}
;var u=j.getType();if(!t||!(t.isEnabled()||this.__lg[u])){return;}
;var g=j.getEventPhase()==qx.event.type.Event.CAPTURING_PHASE;var q=this.__gt.getListeners(t,u,g);if(j.getEventPhase()==qx.event.type.Event.AT_TARGET){if(!q){q=[];}
;var h=this.__gt.getListeners(t,u,!g);if(h){q=q.concat(h);}
;}
;if(!q||q.length===0){return;}
;var k=qx.event.Pool.getInstance().getObject(j.constructor);j.clone(k);k.setTarget(n);k.setRelatedTarget(v||null);k.setCurrentTarget(t);var x=j.getOriginalTarget();if(x){var m=qx.ui.core.Widget.getWidgetByElement(x);while(m&&m.isAnonymous()){m=m.getLayoutParent();}
;k.setOriginalTarget(m);}
else {k.setOriginalTarget(o);}
;for(var i=0,l=q.length;i<l;i++ ){var s=q[i].context||t;q[i].handler.call(s,k);}
;if(k.getPropagationStopped()){j.stopPropagation();}
;if(k.getDefaultPrevented()){j.preventDefault();}
;qx.event.Pool.getInstance().poolObject(k);}
,registerEvent:function(A,z,y){var B;if(z===c||z===a){B=A.getFocusElement();}
else {B=A.getContentElement();}
;if(B){B.addListener(z,this._dispatchEvent,this,y);}
;}
,unregisterEvent:function(E,D,C){var F;if(D===c||D===a){F=E.getFocusElement();}
else {F=E.getContentElement();}
;if(F){F.removeListener(D,this._dispatchEvent,this,C);}
;}
},destruct:function(){this.__gt=null;}
,defer:function(G){qx.event.Registration.addHandler(G);}
});}
)();
(function(){var a="blur",b="qxDraggable",c="touch",d="qx.ui.core.Widget",f="longtap",g="Escape",h="drag",i="keydown",j="Unsupported data type: ",k="roll",l="drop",m="qxDroppable",n="qx.event.handler.DragDrop",o="mouse",p="This method must not be used outside the drop event listener!",q="Control",r="Shift",s="!",t="alias",u="droprequest",v="copy",w="pointerup",x="dragstart",y="move",z="pointerdown",A="dragchange",B="on",C="Alt",D="keyup",E="keypress",F="dragleave",G="dragend",H="dragover",I="left",J="Please use a droprequest listener to the drag source to fill the manager with data!",K="pointermove";qx.Class.define(n,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(L){qx.core.Object.call(this);this.__gt=L;this.__dd=L.getWindow().document.documentElement;this.__gt.addListener(this.__dd,f,this._onLongtap,this);this.__gt.addListener(this.__dd,z,this._onPointerdown,this);qx.event.Registration.addListener(window,a,this._onWindowBlur,this);this.__jR();}
,statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{dragstart:1,dragend:1,dragover:1,dragleave:1,drop:1,drag:1,dragchange:1,droprequest:1},IGNORE_CAN_HANDLE:true,ALLOWED_BUTTONS:[I],MIN_DRAG_DISTANCE:5},properties:{cursor:{check:d,nullable:true,init:null}},members:{__gt:null,__dd:null,__jF:null,__jG:null,__jH:null,__jI:null,__jJ:null,__c:null,__jK:null,__jL:null,__jM:false,__jN:false,__jO:false,__jP:null,__jQ:null,canHandleEvent:function(N,M){}
,registerEvent:function(Q,P,O){}
,unregisterEvent:function(T,S,R){}
,addType:function(U){this.__jH[U]=true;}
,addAction:function(V){this.__jI[V]=true;}
,supportsType:function(W){return !!this.__jH[W];}
,supportsAction:function(X){return !!this.__jI[X];}
,setDropAllowed:function(Y){this.__jN=Y;this.__jS();}
,getData:function(ba){if(!this.__jN||!this.__jF){throw new Error(p);}
;if(!this.__jH[ba]){throw new Error(j+ba+s);}
;if(!this.__c[ba]){this.__jK=ba;this.__hJ(u,this.__jG,this.__jF,false);}
;if(!this.__c[ba]){throw new Error(J);}
;return this.__c[ba]||null;}
,getCurrentAction:function(){this.__jS();return this.__jL;}
,getDragTarget:function(){return this.__jP;}
,addData:function(bb,bc){this.__c[bb]=bc;}
,getCurrentType:function(){return this.__jK;}
,isSessionActive:function(){return this.__jM;}
,__jR:function(){this.__jH={};this.__jI={};this.__jJ={};this.__c={};}
,__jS:function(){if(this.__jG==null){return;}
;var bg=this.__jI;var bd=this.__jJ;var be=null;if(this.__jN){if(bd.Shift&&bd.Control&&bg.alias){be=t;}
else if(bd.Shift&&bd.Alt&&bg.copy){be=v;}
else if(bd.Shift&&bg.move){be=y;}
else if(bd.Alt&&bg.alias){be=t;}
else if(bd.Control&&bg.copy){be=v;}
else if(bg.move){be=y;}
else if(bg.copy){be=v;}
else if(bg.alias){be=t;}
;}
;var bf=this.__jL;if(be!=bf){if(this.__jF){this.__jL=be;this.__jO=this.__hJ(A,this.__jF,this.__jG,true);if(!this.__jO){be=null;}
;}
;if(be!=bf){this.__jL=be;this.__hJ(A,this.__jG,this.__jF,false);}
;}
;}
,__hJ:function(bm,bi,bj,bk,bn){var bl=qx.event.Registration;var bh=bl.createEvent(bm,qx.event.type.Drag,[bk,bn]);if(bi!==bj){bh.setRelatedTarget(bj);}
;return bl.dispatchEvent(bi,bh);}
,__jT:function(bo){while(bo&&bo.nodeType==1){if(bo.getAttribute(b)==B){return bo;}
;bo=bo.parentNode;}
;return null;}
,__jU:function(bp){while(bp&&bp.nodeType==1){if(bp.getAttribute(m)==B){return bp;}
;bp=bp.parentNode;}
;return null;}
,clearSession:function(){this.__gt.removeListener(this.__dd,K,this._onPointermove,this);this.__gt.removeListener(this.__dd,w,this._onPointerup,this,true);this.__gt.removeListener(this.__dd,i,this._onKeyDown,this,true);this.__gt.removeListener(this.__dd,D,this._onKeyUp,this,true);this.__gt.removeListener(this.__dd,E,this._onKeyPress,this,true);this.__gt.removeListener(this.__dd,k,this._onRoll,this,true);if(this.__jG){this.__hJ(G,this.__jG,this.__jF,false);}
;this.__jN=false;this.__jF=null;if(this.__jP){this.__jP.removeState(h);this.__jP=null;}
;this.__jG=null;this.__jM=false;this.__jQ=null;this.__jR();}
,_onLongtap:function(e){if(e.getPointerType()!=c){return;}
;this.__gt.addListener(this.__dd,k,this._onRoll,this,true);this._start(e);}
,_start:function(e){var bq=qx.event.handler.DragDrop.ALLOWED_BUTTONS.indexOf(e.getButton())!==-1;if(!e.isPrimary()||!bq){return false;}
;var bs=this.__jQ?this.__jQ.target:e.getTarget();var br=this.__jT(bs);if(br){this.__jG=br;var bt=qx.ui.core.Widget.getWidgetByElement(this.__jQ.original);while(bt&&bt.isAnonymous()){bt=bt.getLayoutParent();}
;if(bt){this.__jP=bt;bt.addState(h);}
;if(!this.__hJ(x,this.__jG,this.__jF,true,e)){return false;}
;this.__gt.addListener(this.__dd,i,this._onKeyDown,this,true);this.__gt.addListener(this.__dd,D,this._onKeyUp,this,true);this.__gt.addListener(this.__dd,E,this._onKeyPress,this,true);this.__jM=true;return true;}
;}
,_onPointerdown:function(e){if(e.isPrimary()){this.__jQ={target:e.getTarget(),original:e.getOriginalTarget(),left:e.getDocumentLeft(),top:e.getDocumentTop()};this.__gt.addListener(this.__dd,K,this._onPointermove,this);this.__gt.addListener(this.__dd,w,this._onPointerup,this,true);}
;}
,_onPointermove:function(e){if(!e.isPrimary()){return;}
;if(!this.__jM&&e.getPointerType()==o){var bA=this._getDelta(e);var bu=qx.event.handler.DragDrop.MIN_DRAG_DISTANCE;if(bA&&(Math.abs(bA.x)>bu||Math.abs(bA.y)>bu)){if(!this._start(e)){this.clearSession();return;}
;}
;}
;if(!this.__jM){return;}
;if(!this.__hJ(h,this.__jG,this.__jF,true,e)){this.clearSession();}
;var bv=e.getTarget();var by=this.getCursor();if(!by){by=qx.ui.core.DragDropCursor.getInstance();}
;var bx=by.getContentElement().getDomElement();if(bv!==bx){var bw=this.__jU(bv);if(bw&&bw!=this.__jF){if(this.__jF){this.__hJ(F,this.__jF,this.__jG,false,e);}
;this.__jN=true;this.__jF=bw;this.__jN=this.__hJ(H,bw,this.__jG,true,e);}
else if(!bw&&this.__jF){this.__hJ(F,this.__jF,this.__jG,false,e);this.__jF=null;this.__jN=false;qx.event.Timer.once(this.__jS,this,0);}
;}
;var bz=this.__jJ;bz.Control=e.isCtrlPressed();bz.Shift=e.isShiftPressed();bz.Alt=e.isAltPressed();this.__jS();}
,_getDelta:function(e){if(!this.__jQ){return null;}
;var bB=e.getDocumentLeft()-this.__jQ.left;var bC=e.getDocumentTop()-this.__jQ.top;return {"x":bB,"y":bC};}
,_onPointerup:function(e){if(!e.isPrimary()){return;}
;if(this.__jN&&this.__jO){this.__hJ(l,this.__jF,this.__jG,false,e);}
;if(e.getTarget()==this.__jG){e.stopPropagation();}
;this.clearSession();}
,_onRoll:function(e){e.stop();}
,_onWindowBlur:function(e){this.clearSession();}
,_onKeyDown:function(e){var bD=e.getKeyIdentifier();switch(bD){case C:case q:case r:if(!this.__jJ[bD]){this.__jJ[bD]=true;this.__jS();}
;};}
,_onKeyUp:function(e){var bE=e.getKeyIdentifier();switch(bE){case C:case q:case r:if(this.__jJ[bE]){this.__jJ[bE]=false;this.__jS();}
;};}
,_onKeyPress:function(e){var bF=e.getKeyIdentifier();switch(bF){case g:this.clearSession();};}
},destruct:function(){qx.event.Registration.removeListener(window,a,this._onWindowBlur,this);this.__jG=this.__jF=this.__gt=this.__dd=this.__jH=this.__jI=this.__jJ=this.__c=null;}
,defer:function(bG){qx.event.Registration.addHandler(bG);}
});}
)();
(function(){var a="qx.event.type.Drag",b="touch";qx.Class.define(a,{extend:qx.event.type.Event,members:{init:function(c,d){qx.event.type.Event.prototype.init.call(this,true,c);if(d){this._native=d.getNativeEvent()||null;this._originalTarget=d.getOriginalTarget()||null;}
else {this._native=null;this._originalTarget=null;}
;return this;}
,clone:function(e){var f=qx.event.type.Event.prototype.clone.call(this,e);f._native=this._native;return f;}
,getDocumentLeft:function(){if(this._native==null){return 0;}
;var x=this._native.pageX;if(x!==undefined){if(x==0&&this._native.pointerType==b){x=this._native._original.changedTouches[0].pageX||0;}
;return Math.round(x);}
else {var g=qx.dom.Node.getWindow(this._native.srcElement);return Math.round(this._native.clientX)+qx.bom.Viewport.getScrollLeft(g);}
;}
,getDocumentTop:function(){if(this._native==null){return 0;}
;var y=this._native.pageY;if(y!==undefined){if(y==0&&this._native.pointerType==b){y=this._native._original.changedTouches[0].pageY||0;}
;return Math.round(y);}
else {var h=qx.dom.Node.getWindow(this._native.srcElement);return Math.round(this._native.clientY)+qx.bom.Viewport.getScrollTop(h);}
;}
,getManager:function(){return qx.event.Registration.getManager(this.getTarget()).getHandler(qx.event.handler.DragDrop);}
,addType:function(i){this.getManager().addType(i);}
,addAction:function(j){this.getManager().addAction(j);}
,supportsType:function(k){return this.getManager().supportsType(k);}
,supportsAction:function(l){return this.getManager().supportsAction(l);}
,addData:function(m,n){this.getManager().addData(m,n);}
,getData:function(o){return this.getManager().getData(o);}
,getCurrentType:function(){return this.getManager().getCurrentType();}
,getCurrentAction:function(){if(this.getDefaultPrevented()){return null;}
;return this.getManager().getCurrentAction();}
,setDropAllowed:function(p){this.getManager().setDropAllowed(p);}
,getDragTarget:function(){return this.getManager().getDragTarget();}
,stopSession:function(){this.getManager().clearSession();}
}});}
)();
(function(){var a="best-fit",b="placementRight",c="Boolean",d="bottom-right",e="' ",f="widget",g="placementLeft",h="qx.ui.core.MPlacement",i="left-top",j="Integer",k="left-middle",l="right-middle",m="top-center",n="[qx.ui.core.MPlacement.setMoveDirection()], the value was '",o="offsetRight",p="interval",q="keep-align",r="bottom-left",s="pointer",t="direct",u="shorthand",v="Invalid value for the parameter 'direction' ",w="offsetLeft",x="top-left",y="appear",z="offsetBottom",A="top",B="top-right",C="offsetTop",D="but 'top' or 'left' are allowed.",E="right-bottom",F="disappear",G="right-top",H="bottom-center",I="left-bottom",J="left";qx.Mixin.define(h,{statics:{__gF:null,__jV:J,setVisibleElement:function(K){this.__gF=K;}
,getVisibleElement:function(){return this.__gF;}
,setMoveDirection:function(L){if(L===A||L===J){this.__jV=L;}
else {throw new Error(v+n+L+e+D);}
;}
,getMoveDirection:function(){return this.__jV;}
},properties:{position:{check:[x,m,B,r,H,d,i,k,I,G,l,E],init:r,themeable:true},placeMethod:{check:[f,s],init:s,themeable:true},domMove:{check:c,init:false},placementModeX:{check:[t,q,a],init:q,themeable:true},placementModeY:{check:[t,q,a],init:q,themeable:true},offsetLeft:{check:j,init:0,themeable:true},offsetTop:{check:j,init:0,themeable:true},offsetRight:{check:j,init:0,themeable:true},offsetBottom:{check:j,init:0,themeable:true},offset:{group:[C,o,z,w],mode:u,themeable:true}},members:{__jW:null,__jX:null,__jY:null,getLayoutLocation:function(N){var P,O,R,top;O=N.getBounds();if(!O){return null;}
;R=O.left;top=O.top;var Q=O;N=N.getLayoutParent();while(N&&!N.isRootWidget()){O=N.getBounds();R+=O.left;top+=O.top;P=N.getInsets();R+=P.left;top+=P.top;N=N.getLayoutParent();}
;if(N.isRootWidget()){var M=N.getContentLocation();if(M){R+=M.left;top+=M.top;}
;}
;return {left:R,top:top,right:R+Q.width,bottom:top+Q.height};}
,moveTo:function(Y,top){var X=qx.ui.core.MPlacement.getVisibleElement();if(X){var W=this.getBounds();var V=X.getContentLocation();if(W&&V){var U=top+W.height;var T=Y+W.width;if((T>V.left&&Y<V.right)&&(U>V.top&&top<V.bottom)){var S=qx.ui.core.MPlacement.getMoveDirection();if(S===J){Y=Math.max(V.left-W.width,0);}
else {top=Math.max(V.top-W.height,0);}
;}
;}
;}
;if(this.getDomMove()){this.setDomPosition(Y,top);}
else {this.setLayoutProperties({left:Y,top:top});}
;}
,placeToWidget:function(bc,ba){if(ba){this.__ka();this.__jW=qx.lang.Function.bind(this.placeToWidget,this,bc,false);qx.event.Idle.getInstance().addListener(p,this.__jW);this.__jY=function(){this.__ka();}
;this.addListener(F,this.__jY,this);}
;var bb=bc.getContentLocation()||this.getLayoutLocation(bc);if(bb!=null){this._place(bb);return true;}
else {return false;}
;}
,__ka:function(){if(this.__jW){qx.event.Idle.getInstance().removeListener(p,this.__jW);this.__jW=null;}
;if(this.__jY){this.removeListener(F,this.__jY,this);this.__jY=null;}
;}
,placeToPointer:function(event){var be=Math.round(event.getDocumentLeft());var top=Math.round(event.getDocumentTop());var bd={left:be,top:top,right:be,bottom:top};this._place(bd);}
,placeToElement:function(bh,bf){var location=qx.bom.element.Location.get(bh);var bg={left:location.left,top:location.top,right:location.left+bh.offsetWidth,bottom:location.top+bh.offsetHeight};if(bf){this.__jW=qx.lang.Function.bind(this.placeToElement,this,bh,false);qx.event.Idle.getInstance().addListener(p,this.__jW);this.addListener(F,function(){if(this.__jW){qx.event.Idle.getInstance().removeListener(p,this.__jW);this.__jW=null;}
;}
,this);}
;this._place(bg);}
,placeToPoint:function(bj){var bi={left:bj.left,top:bj.top,right:bj.left,bottom:bj.top};this._place(bi);}
,_getPlacementOffsets:function(){return {left:this.getOffsetLeft(),top:this.getOffsetTop(),right:this.getOffsetRight(),bottom:this.getOffsetBottom()};}
,__kb:function(bk){var bl=null;if(this._computePlacementSize){var bl=this._computePlacementSize();}
else if(this.isVisible()){var bl=this.getBounds();}
;if(bl==null){this.addListenerOnce(y,function(){this.__kb(bk);}
,this);}
else {bk.call(this,bl);}
;}
,_place:function(bm){this.__kb(function(bo){var bn=qx.util.placement.Placement.compute(bo,this.getLayoutParent().getBounds(),bm,this._getPlacementOffsets(),this.getPosition(),this.getPlacementModeX(),this.getPlacementModeY());this.removeState(g);this.removeState(b);this.addState(bm.left<bn.left?b:g);this.moveTo(bn.left,bn.top);}
);}
},destruct:function(){this.__ka();}
});}
)();
(function(){var a="Number",b="interval",c="_applyTimeoutInterval",d="qx.event.type.Event",e="qx.event.Idle",f="singleton";qx.Class.define(e,{extend:qx.core.Object,type:f,construct:function(){qx.core.Object.call(this);var g=new qx.event.Timer(this.getTimeoutInterval());g.addListener(b,this._onInterval,this);g.start();this.__de=g;}
,events:{"interval":d},properties:{timeoutInterval:{check:a,init:100,apply:c}},members:{__de:null,_applyTimeoutInterval:function(h){this.__de.setInterval(h);}
,_onInterval:function(){this.fireEvent(b);}
},destruct:function(){if(this.__de){this.__de.stop();}
;this.__de=null;}
});}
)();
(function(){var a="-",b="align-start",c="best-fit",d="qx.util.placement.Placement",e='__kc',f="middle",g="bottom",h="keep-align",i="align-end",j="align-center",k="Invalid 'mode' argument!'",l="center",m="edge-start",n="Class",o="direct",p="top",q="left",r="right",s="edge-end";qx.Class.define(d,{extend:qx.core.Object,construct:function(){qx.core.Object.call(this);this.__kc=qx.util.placement.DirectAxis;}
,properties:{axisX:{check:n},axisY:{check:n},edge:{check:[p,r,g,q],init:p},align:{check:[p,r,g,q,l,f],init:r}},statics:{__kd:null,compute:function(D,w,t,u,C,x,y){this.__kd=this.__kd||new qx.util.placement.Placement();var A=C.split(a);var z=A[0];var v=A[1];{var B;}
;this.__kd.set({axisX:this.__kh(x),axisY:this.__kh(y),edge:z,align:v});return this.__kd.compute(D,w,t,u);}
,__ke:null,__kf:null,__kg:null,__kh:function(E){switch(E){case o:this.__ke=this.__ke||qx.util.placement.DirectAxis;return this.__ke;case h:this.__kf=this.__kf||qx.util.placement.KeepAlignAxis;return this.__kf;case c:this.__kg=this.__kg||qx.util.placement.BestFitAxis;return this.__kg;default:throw new Error(k);};}
},members:{__kc:null,compute:function(K,H,F,G){{}
;var I=this.getAxisX()||this.__kc;var L=I.computeStart(K.width,{start:F.left,end:F.right},{start:G.left,end:G.right},H.width,this.__ki());var J=this.getAxisY()||this.__kc;var top=J.computeStart(K.height,{start:F.top,end:F.bottom},{start:G.top,end:G.bottom},H.height,this.__kj());return {left:L,top:top};}
,__ki:function(){var N=this.getEdge();var M=this.getAlign();if(N==q){return m;}
else if(N==r){return s;}
else if(M==q){return b;}
else if(M==l){return j;}
else if(M==r){return i;}
;}
,__kj:function(){var P=this.getEdge();var O=this.getAlign();if(P==p){return m;}
else if(P==g){return s;}
else if(O==p){return b;}
else if(O==f){return j;}
else if(O==g){return i;}
;}
},destruct:function(){this._disposeObjects(e);}
});}
)();
(function(){var a="align-start",b="align-end",c="qx.util.placement.AbstractAxis",d="edge-start",e="align-center",f="abstract method call!",g="edge-end";qx.Bootstrap.define(c,{extend:Object,statics:{computeStart:function(j,k,l,h,i){throw new Error(f);}
,_moveToEdgeAndAlign:function(n,o,p,m){switch(m){case d:return o.start-p.end-n;case g:return o.end+p.start;case a:return o.start+p.start;case e:return o.start+parseInt((o.end-o.start-n)/2,10)+p.start;case b:return o.end-p.end-n;};}
,_isInRange:function(r,s,q){return r>=0&&r+s<=q;}
}});}
)();
(function(){var a="qx.util.placement.DirectAxis";qx.Bootstrap.define(a,{statics:{_moveToEdgeAndAlign:qx.util.placement.AbstractAxis._moveToEdgeAndAlign,computeStart:function(d,e,f,b,c){return this._moveToEdgeAndAlign(d,e,f,c);}
}});}
)();
(function(){var a="qx.util.placement.KeepAlignAxis",b="edge-start",c="edge-end";qx.Bootstrap.define(a,{statics:{_moveToEdgeAndAlign:qx.util.placement.AbstractAxis._moveToEdgeAndAlign,_isInRange:qx.util.placement.AbstractAxis._isInRange,computeStart:function(k,f,g,d,j){var i=this._moveToEdgeAndAlign(k,f,g,j);var e,h;if(this._isInRange(i,k,d)){return i;}
;if(j==b||j==c){e=f.start-g.end;h=f.end+g.start;}
else {e=f.end-g.end;h=f.start+g.start;}
;if(e>d-h){i=Math.max(0,e-k);}
else {i=h;}
;return i;}
}});}
)();
(function(){var a="qx.util.placement.BestFitAxis";qx.Bootstrap.define(a,{statics:{_isInRange:qx.util.placement.AbstractAxis._isInRange,_moveToEdgeAndAlign:qx.util.placement.AbstractAxis._moveToEdgeAndAlign,computeStart:function(g,c,d,b,f){var e=this._moveToEdgeAndAlign(g,c,d,f);if(this._isInRange(e,g,b)){return e;}
;if(e<0){e=Math.min(0,b-g);}
;if(e+g>b){e=Math.max(0,b-g);}
;return e;}
}});}
)();
(function(){var a="Image could not be loaded: ",b="Boolean",c="px",d=".png",e="background-image",f="engine.version",g="scale",h="changeSource",j="x",l="div",m="aborted",n="background-size",o="nonScaled",p="3",q="qx.ui.basic.Image",r="top",s="0 0",t=", no-repeat",u="loaded",v="backgroundImage",w="backgroundRepeat",x="-disabled.$1",y="class",z="qx.event.type.Event",A="image",B="loadingFailed",C="css.alphaimageloaderneeded",D="1.5",E="String",F="browser.documentmode",G="backgroundPosition",H="border-box",I="left",J="_applySource",K="__kk",L="$$widget",M="@",N="px, ",O='.',P="scaled",Q=", ",R="2",S="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",T="mshtml",U="engine.name",V=", 0 0",W="_applyScale",X="position",Y="replacement",bl="img",bm="no-repeat",bn="background-position",bh="hidden",bi="alphaScaled",bj=",",bk="absolute";qx.Class.define(q,{extend:qx.ui.core.Widget,construct:function(bo){this.__kk={};qx.ui.core.Widget.call(this);if(bo){this.setSource(bo);}
;}
,properties:{source:{check:E,init:null,nullable:true,event:h,apply:J,themeable:true},scale:{check:b,init:false,themeable:true,apply:W},appearance:{refine:true,init:A},allowShrinkX:{refine:true,init:false},allowShrinkY:{refine:true,init:false},allowGrowX:{refine:true,init:false},allowGrowY:{refine:true,init:false}},events:{loadingFailed:z,loaded:z,aborted:z},statics:{PLACEHOLDER_IMAGE:S},members:{__kl:null,__km:null,__iP:null,__kk:null,__kn:null,__ko:null,__kp:0,_onChangeTheme:function(){qx.ui.core.Widget.prototype._onChangeTheme.call(this);this._styleSource();}
,getContentElement:function(){return this.__kt();}
,_createContentElement:function(){return this.__kt();}
,_getContentHint:function(){return {width:this.__kl||0,height:this.__km||0};}
,_applyDecorator:function(br,bq){qx.ui.core.Widget.prototype._applyDecorator.call(this,br,bq);var bs=this.getSource();bs=qx.util.AliasManager.getInstance().resolve(bs);var bp=this.getContentElement();if(this.__ko){bp=bp.getChild(0);}
;this.__kC(bp,bs);}
,_applyPadding:function(bu,bt,name){qx.ui.core.Widget.prototype._applyPadding.call(this,bu,bt,name);var bv=this.getContentElement();if(this.__ko){bv.getChild(0).setStyles({top:this.getPaddingTop()||0,left:this.getPaddingLeft()||0});}
else {bv.setPadding(this.getPaddingLeft()||0,this.getPaddingTop()||0);}
;}
,renderLayout:function(by,top,bw,bz){qx.ui.core.Widget.prototype.renderLayout.call(this,by,top,bw,bz);var bx=this.getContentElement();if(this.__ko){bx.getChild(0).setStyles({width:bw-(this.getPaddingLeft()||0)-(this.getPaddingRight()||0),height:bz-(this.getPaddingTop()||0)-(this.getPaddingBottom()||0),top:this.getPaddingTop()||0,left:this.getPaddingLeft()||0});}
;}
,_applyEnabled:function(bB,bA){qx.ui.core.Widget.prototype._applyEnabled.call(this,bB,bA);if(this.getSource()){this._styleSource();}
;}
,_applySource:function(bD,bC){if(bC){if(qx.io.ImageLoader.isLoading(bC)){qx.io.ImageLoader.abort(bC);}
;}
;this._styleSource();}
,_applyScale:function(bE){this._styleSource();}
,__kq:function(bF){this.__iP=bF;}
,__kr:function(){if(this.__iP==null){var bH=this.getSource();var bG=false;if(bH!=null){bG=qx.lang.String.endsWith(bH,d);}
;if(this.getScale()&&bG&&qx.core.Environment.get(C)){this.__iP=bi;}
else if(this.getScale()){this.__iP=P;}
else {this.__iP=o;}
;}
;return this.__iP;}
,__ks:function(bK){var bJ;var bI;if(bK==bi){bJ=true;bI=l;}
else if(bK==o){bJ=false;bI=l;}
else {bJ=true;bI=bl;}
;var bM=new qx.html.Image(bI);bM.setAttribute(L,this.toHashCode());bM.setScale(bJ);bM.setStyles({"overflowX":bh,"overflowY":bh,"boxSizing":H});if(qx.core.Environment.get(C)){var bL=this.__ko=new qx.html.Element(l);bL.setAttribute(L,this.toHashCode());bL.setStyle(X,bk);bL.add(bM);return bL;}
;return bM;}
,__kt:function(){if(this.$$disposed){return null;}
;var bN=this.__kr();if(this.__kk[bN]==null){this.__kk[bN]=this.__ks(bN);}
;var bO=this.__kk[bN];if(!this.__kn){this.__kn=bO;}
;return bO;}
,_styleSource:function(){var bT=qx.util.AliasManager.getInstance();var bS=qx.util.ResourceManager.getInstance();var bV=bT.resolve(this.getSource());var bU=this.getContentElement();if(this.__ko){bU=bU.getChild(0);}
;if(!bV){bU.resetSource();return;}
;this.__kw(bV);if((qx.core.Environment.get(U)==T)&&(parseInt(qx.core.Environment.get(f),10)<9||qx.core.Environment.get(F)<9)){var bQ=this.getScale()?g:bm;bU.tagNameHint=qx.bom.element.Decoration.getTagName(bQ,bV);}
;var bR=this.__kv();if(qx.util.ResourceManager.getInstance().has(bV)){var bW=this._findHighResolutionSource(bV);if(bW){var bY=bS.getImageHeight(bV);var bX=bS.getImageWidth(bV);this.setWidth(bY);this.setHeight(bX);var bP=bY+N+bX+c;this.__kn.setStyle(n,bP);this.setSource(bW);bV=bW;}
;this.__ky(bR,bV);this.__ku();}
else if(qx.io.ImageLoader.isLoaded(bV)){this.__kz(bR,bV);this.__ku();}
else {this.__kA(bR,bV);}
;}
,__ku:function(){this.__kp++ ;qx.bom.AnimationFrame.request(function(ca){if(ca===this.__kp){this.fireEvent(u);}
else {this.fireEvent(m);}
;}
.bind(this,this.__kp));}
,__kv:function(){var cb=this.__kn;if(this.__ko){cb=cb.getChild(0);}
;return cb;}
,__kw:qx.core.Environment.select(U,{"mshtml":function(cd){var ce=qx.core.Environment.get(C);var cc=qx.lang.String.endsWith(cd,d);if(ce&&cc){if(this.getScale()&&this.__kr()!=bi){this.__kq(bi);}
else if(!this.getScale()&&this.__kr()!=o){this.__kq(o);}
;}
else {if(this.getScale()&&this.__kr()!=P){this.__kq(P);}
else if(!this.getScale()&&this.__kr()!=o){this.__kq(o);}
;}
;this.__kx(this.__kt());}
,"default":function(cf){if(this.getScale()&&this.__kr()!=P){this.__kq(P);}
else if(!this.getScale()&&this.__kr(o)){this.__kq(o);}
;this.__kx(this.__kt());}
}),__kx:function(cj){var ci=this.__kn;if(ci!=cj){if(ci!=null){var cu=c;var cg={};var co=this.getBounds();if(co!=null){cg.width=co.width+cu;cg.height=co.height+cu;}
;var cp=this.getInsets();cg.left=parseInt(ci.getStyle(I)||cp.left)+cu;cg.top=parseInt(ci.getStyle(r)||cp.top)+cu;cg.zIndex=10;var cm=this.__ko?cj.getChild(0):cj;cm.setStyles(cg,true);cm.setSelectable(this.getSelectable());if(!ci.isVisible()){cj.hide();}
;if(!ci.isIncluded()){cj.exclude();}
;var cr=ci.getParent();if(cr){var ch=cr.getChildren().indexOf(ci);cr.removeAt(ch);cr.addAt(cj,ch);}
;var cl=cm.getNodeName();cm.setSource(null);var ck=this.__kv();cm.tagNameHint=cl;cm.setAttribute(y,ck.getAttribute(y));qx.html.Element.flush();var ct=ck.getDomElement();var cs=cj.getDomElement();var cq=ci.getListeners()||[];cq.forEach(function(cv){cj.addListener(cv.type,cv.handler,cv.self,cv.capture);}
);if(ct&&cs){var cn=ct.$$hash;ct.$$hash=cs.$$hash;cs.$$hash=cn;}
;this.__kn=cj;}
;}
;}
,__ky:function(cx,cz){var cy=qx.util.ResourceManager.getInstance();if(!this.getEnabled()){var cw=cz.replace(/\.([a-z]+)$/,x);if(cy.has(cw)){cz=cw;this.addState(Y);}
else {this.removeState(Y);}
;}
;if(cx.getSource()===cz){return;}
;this.__kC(cx,cz);this.__kE(cy.getImageWidth(cz),cy.getImageHeight(cz));}
,__kz:function(cA,cE){var cC=qx.io.ImageLoader;this.__kC(cA,cE);var cD=cC.getWidth(cE);var cB=cC.getHeight(cE);this.__kE(cD,cB);}
,__kA:function(cF,cI){var cJ=qx.io.ImageLoader;{var cH,cG,self;}
;if(!cJ.isFailed(cI)){cJ.load(cI,this.__kD,this);}
else {if(cF!=null){cF.resetSource();}
;}
;}
,__kC:function(cK,cO){if(cK.getNodeName()==l){var cS=qx.theme.manager.Decoration.getInstance().resolve(this.getDecorator());if(cS){var cP=(cS.getStartColor()&&cS.getEndColor());var cN=cS.getBackgroundImage();if(cP||cN){var cL=this.getScale()?g:bm;var cM=qx.bom.element.Decoration.getAttributes(cO,cL);var cR=cS.getStyles(true);var cQ={"backgroundImage":cM.style.backgroundImage,"backgroundPosition":(cM.style.backgroundPosition||s),"backgroundRepeat":(cM.style.backgroundRepeat||bm)};if(cN){cQ[G]+=bj+cR[bn]||s;cQ[w]+=Q+cS.getBackgroundRepeat();}
;if(cP){cQ[G]+=V;cQ[w]+=t;}
;cQ[v]+=bj+cR[e];cK.setStyles(cQ);return;}
;}
else {cK.setSource(null);}
;}
;cK.setSource(cO);}
,_findHighResolutionSource:function(cT){var cW=[p,R,D];var cV=parseFloat(qx.bom.client.Device.getDevicePixelRatio().toFixed(2));if(cV<=1){return false;}
;var i=cW.length;while(i>0&&cV>cW[ --i]){}
;var cU;var k;for(k=i;k>=0;k-- ){cU=this._getHighResolutionSource(cT,cW[k]);if(cU){return cU;}
;}
;for(k=i+1;k<cW.length;k++ ){cU=this._getHighResolutionSource(cT,cW[k]);if(cU){return cU;}
;}
;return null;}
,_getHighResolutionSource:function(cX,cY){var db=cX.lastIndexOf(O);if(db>-1){var da=M+cY+j;var dc=cX.slice(0,db)+da+cX.slice(db);if(qx.util.ResourceManager.getInstance().has(dc)){return dc;}
;}
;return null;}
,__kD:function(dd,de){if(this.$$disposed===true){return;}
;if(dd!==qx.util.AliasManager.getInstance().resolve(this.getSource())){this.fireEvent(m);return;}
;if(de.failed){this.warn(a+dd);this.fireEvent(B);}
else if(de.aborted){this.fireEvent(m);return;}
else {this.fireEvent(u);}
;this.__kz(this.__kv(),dd);}
,__kE:function(df,dg){if(df!==this.__kl||dg!==this.__km){this.__kl=df;this.__km=dg;qx.ui.core.queue.Layout.add(this);}
;}
},destruct:function(){for(var dh in this.__kk){if(this.__kk.hasOwnProperty(dh)){this.__kk[dh].setAttribute(L,null,true);}
;}
;delete this.__kn;if(this.__ko){delete this.__ko;}
;this._disposeMap(K);}
});}
)();
(function(){var a="load",b="",c="qx.io.ImageLoader",d="html.image.naturaldimensions";qx.Bootstrap.define(c,{statics:{__cP:{},__kF:{width:null,height:null},__kG:/\.(png|gif|jpg|jpeg|bmp)\b/i,__kH:/^data:image\/(png|gif|jpg|jpeg|bmp)\b/i,isLoaded:function(e){var f=this.__cP[e];return !!(f&&f.loaded);}
,isFailed:function(g){var h=this.__cP[g];return !!(h&&h.failed);}
,isLoading:function(j){var k=this.__cP[j];return !!(k&&k.loading);}
,getFormat:function(p){var o=this.__cP[p];if(!o||!o.format){var m=this.__kH.exec(p);if(m!=null){var n=(o&&qx.lang.Type.isNumber(o.width)?o.width:this.__kF.width);var q=(o&&qx.lang.Type.isNumber(o.height)?o.height:this.__kF.height);o={loaded:true,format:m[1],width:n,height:q};}
;}
;return o?o.format:null;}
,getSize:function(r){var s=this.__cP[r];return s?{width:s.width,height:s.height}:this.__kF;}
,getWidth:function(t){var u=this.__cP[t];return u?u.width:null;}
,getHeight:function(v){var w=this.__cP[v];return w?w.height:null;}
,load:function(z,y,A){var B=this.__cP[z];if(!B){B=this.__cP[z]={};}
;if(y&&!A){A=window;}
;if(B.loaded||B.loading||B.failed){if(y){if(B.loading){B.callbacks.push(y,A);}
else {y.call(A,z,B);}
;}
;}
else {B.loading=true;B.callbacks=[];if(y){B.callbacks.push(y,A);}
;var x=new Image();var C=qx.lang.Function.listener(this.__kI,this,x,z);x.onload=C;x.onerror=C;x.src=z;B.element=x;}
;}
,abort:function(D){var G=this.__cP[D];if(G&&!G.loaded){G.aborted=true;var F=G.callbacks;var E=G.element;E.onload=E.onerror=null;E.src=b;delete G.callbacks;delete G.element;delete G.loading;for(var i=0,l=F.length;i<l;i+=2){F[i].call(F[i+1],D,G);}
;}
;this.__cP[D]=null;}
,__kI:function(){var H=qx.event.GlobalError.observeMethod(this.__kJ);H.apply(this,arguments);}
,__kJ:function(event,J,I){var N=this.__cP[I];var K=function(O){return (O&&O.height!==0);}
;if(event.type===a&&K(J)){N.loaded=true;N.width=this.__kK(J);N.height=this.__kL(J);var L=this.__kG.exec(I);if(L!=null){N.format=L[1];}
;}
else {N.failed=true;}
;J.onload=J.onerror=null;var M=N.callbacks;delete N.loading;delete N.callbacks;delete N.element;for(var i=0,l=M.length;i<l;i+=2){M[i].call(M[i+1],I,N);}
;}
,__kK:function(P){return qx.core.Environment.get(d)?P.naturalWidth:P.width;}
,__kL:function(Q){return qx.core.Environment.get(d)?Q.naturalHeight:Q.height;}
,dispose:function(){this.__cP={};}
}});}
)();
(function(){var a="source",b="engine.name",c="",d="mshtml",e="px",f="px ",g="no-repeat",h="backgroundImage",i="scale",j="webkit",k="div",l="qx.html.Image",m="qx/static/blank.gif",n="backgroundPosition";qx.Class.define(l,{extend:qx.html.Element,members:{__kM:null,__kN:null,tagNameHint:null,setPadding:function(o,p){this.__kN=o;this.__kM=p;if(this.getNodeName()==k){this.setStyle(n,o+f+p+e);}
;}
,_applyProperty:function(name,t){qx.html.Element.prototype._applyProperty.call(this,name,t);if(name===a){var s=this.getDomElement();var q=this.getAllStyles();if(this.getNodeName()==k&&this.getStyle(h)){q.backgroundRepeat=null;}
;var u=this._getProperty(a);var r=this._getProperty(i);var v=r?i:g;if(u!=null){u=u||null;q.paddingTop=this.__kM;q.paddingLeft=this.__kN;qx.bom.element.Decoration.update(s,u,v,q);}
;}
;}
,_removeProperty:function(x,w){if(x==a){this._setProperty(x,c,w);}
else {this._setProperty(x,null,w);}
;}
,_createDomElement:function(){var z=this._getProperty(i);var A=z?i:g;if((qx.core.Environment.get(b)==d)){var y=this._getProperty(a);if(this.tagNameHint!=null){this.setNodeName(this.tagNameHint);}
else {this.setNodeName(qx.bom.element.Decoration.getTagName(A,y));}
;}
else {this.setNodeName(qx.bom.element.Decoration.getTagName(A));}
;return qx.html.Element.prototype._createDomElement.call(this);}
,_copyData:function(B){return qx.html.Element.prototype._copyData.call(this,true);}
,setSource:function(C){this._setProperty(a,C);return this;}
,getSource:function(){return this._getProperty(a);}
,resetSource:function(){if((qx.core.Environment.get(b)==j)){this._setProperty(a,m);}
else {this._removeProperty(a,true);}
;return this;}
,setScale:function(D){this._setProperty(i,D);return this;}
,getScale:function(){return this._getProperty(i);}
}});}
)();
(function(){var a="qx/icon",b="repeat",c="px",d=".png",f="crop",g="px ",h="background-image",i="scale",j="no-repeat",k="div",l="Potential clipped image candidate: ",m="progid:DXImageTransform.Microsoft.AlphaImageLoader(src='",n='<div style="',o="scale-x",p="css.alphaimageloaderneeded",q="repeat-y",r='<img src="',s="qx.bom.element.Decoration",t="Image modification not possible because elements could not be replaced at runtime anymore!",u="', sizingMethod='",v="",w='"/>',x="png",y="img",z="')",A='"></div>',B="mshtml",C="engine.name",D='" style="',E="none",F="b64",G="webkit",H=" ",I="repeat-x",J="background-repeat",K="DXImageTransform.Microsoft.AlphaImageLoader",L="qx/static/blank.gif",M="scale-y",N="absolute";qx.Class.define(s,{statics:{DEBUG:false,__kO:{},__kP:qx.core.Environment.select(C,{"mshtml":{"scale-x":true,"scale-y":true,"scale":true,"no-repeat":true},"default":null}),__kQ:{"scale-x":y,"scale-y":y,"scale":y,"repeat":k,"no-repeat":k,"repeat-x":k,"repeat-y":k},update:function(R,S,P,O){var T=this.getTagName(P,S);if(T!=R.tagName.toLowerCase()){throw new Error(t);}
;var Q=this.getAttributes(S,P,O);if(T===y){R.src=Q.src||qx.util.ResourceManager.getInstance().toUri(L);}
;if(R.style.backgroundPosition!=v&&Q.style.backgroundPosition===undefined){Q.style.backgroundPosition=null;}
;if(R.style.clip!=v&&Q.style.clip===undefined){Q.style.clip=null;}
;qx.bom.element.Style.setStyles(R,Q.style);if(qx.core.Environment.get(p)){try{R.filters[K].apply();}
catch(e){}
;}
;}
,create:function(X,V,U){var Y=this.getTagName(V,X);var W=this.getAttributes(X,V,U);var ba=qx.bom.element.Style.compile(W.style);if(Y===y){return r+W.src+D+ba+w;}
else {return n+ba+A;}
;}
,getTagName:function(bc,bb){if(bb&&qx.core.Environment.get(p)&&this.__kP[bc]&&qx.lang.String.endsWith(bb,d)){return k;}
;return this.__kQ[bc];}
,getAttributes:function(bh,be,bd){if(!bd){bd={};}
;if(!bd.position){bd.position=N;}
;if((qx.core.Environment.get(C)==B)){bd.fontSize=0;bd.lineHeight=0;}
else if((qx.core.Environment.get(C)==G)){bd.WebkitUserDrag=E;}
;var bf=qx.util.ResourceManager.getInstance().getImageFormat(bh)||qx.io.ImageLoader.getFormat(bh);{}
;var bi;if(qx.core.Environment.get(p)&&this.__kP[be]&&bf===x){var bj=this.__kS(bh);this.__kR(bd,bj.width,bj.height);bi=this.processAlphaFix(bd,be,bh);}
else {delete bd.clip;if(be===i){bi=this.__kT(bd,be,bh);}
else if(be===o||be===M){bi=this.__kU(bd,be,bh);}
else {bi=this.__kX(bd,be,bh);}
;}
;return bi;}
,__kR:function(bl,bk,bm){if(bl.width==null&&bk!=null){bl.width=bk+c;}
;if(bl.height==null&&bm!=null){bl.height=bm+c;}
;}
,__kS:function(bn){var bo=qx.util.ResourceManager.getInstance().getImageWidth(bn)||qx.io.ImageLoader.getWidth(bn);var bp=qx.util.ResourceManager.getInstance().getImageHeight(bn)||qx.io.ImageLoader.getHeight(bn);return {width:bo,height:bp};}
,processAlphaFix:function(bs,bt,br){if(bt==b||bt==I||bt==q){return bs;}
;var bu=bt==j?f:i;var bq=m+qx.util.ResourceManager.getInstance().toUri(br)+u+bu+z;bs.filter=bq;bs.backgroundImage=bs.backgroundRepeat=v;delete bs[h];delete bs[J];return {style:bs};}
,__kT:function(bw,bx,bv){var by=qx.util.ResourceManager.getInstance().toUri(bv);var bz=this.__kS(bv);this.__kR(bw,bz.width,bz.height);return {src:by,style:bw};}
,__kU:function(bA,bB,bD){var bC=qx.util.ResourceManager.getInstance();var bG=bC.getCombinedFormat(bD);var bI=this.__kS(bD);var bE;if(bG){var bH=bC.getData(bD);var bF=bH[4];if(bG==F){bE=bC.toDataUri(bD);}
else {bE=bC.toUri(bF);}
;if(bB===o){bA=this.__kV(bA,bH,bI.height);}
else {bA=this.__kW(bA,bH,bI.width);}
;return {src:bE,style:bA};}
else {{}
;if(bB==o){bA.height=bI.height==null?null:bI.height+c;}
else if(bB==M){bA.width=bI.width==null?null:bI.width+c;}
;bE=bC.toUri(bD);return {src:bE,style:bA};}
;}
,__kV:function(bJ,bK,bM){var bL=qx.util.ResourceManager.getInstance().getImageHeight(bK[4]);bJ.clip={top:-bK[6],height:bM};bJ.height=bL+c;if(bJ.top!=null){bJ.top=(parseInt(bJ.top,10)+bK[6])+c;}
else if(bJ.bottom!=null){bJ.bottom=(parseInt(bJ.bottom,10)+bM-bL-bK[6])+c;}
;return bJ;}
,__kW:function(bO,bP,bN){var bQ=qx.util.ResourceManager.getInstance().getImageWidth(bP[4]);bO.clip={left:-bP[5],width:bN};bO.width=bQ+c;if(bO.left!=null){bO.left=(parseInt(bO.left,10)+bP[5])+c;}
else if(bO.right!=null){bO.right=(parseInt(bO.right,10)+bN-bQ-bP[5])+c;}
;return bO;}
,__kX:function(bR,bS,bV){var bU=qx.util.ResourceManager.getInstance();var bT=bU.getCombinedFormat(bV);var ce=this.__kS(bV);if(bT&&bS!==b){var cd=bU.getData(bV);var cb=cd[4];if(bT==F){var bX=bU.toDataUri(bV);var bW=0;var bY=0;}
else {var bX=bU.toUri(cb);var bW=cd[5];var bY=cd[6];if(bR.paddingTop||bR.paddingLeft||bR.paddingRight||bR.paddingBottom){var top=bR.paddingTop||0;var cf=bR.paddingLeft||0;bW+=bR.paddingLeft||0;bY+=bR.paddingTop||0;bR.clip={left:cf,top:top,width:ce.width,height:ce.height};}
;}
;var ca=qx.bom.element.Background.getStyles(bX,bS,bW,bY);for(var cc in ca){bR[cc]=ca[cc];}
;if(ce.width!=null&&bR.width==null&&(bS==q||bS===j)){bR.width=ce.width+c;}
;if(ce.height!=null&&bR.height==null&&(bS==I||bS===j)){bR.height=ce.height+c;}
;return {style:bR};}
else {var top=bR.paddingTop||0;var cf=bR.paddingLeft||0;bR.backgroundPosition=cf+g+top+c;{}
;this.__kR(bR,ce.width,ce.height);this.__kY(bR,bV,bS);return {style:bR};}
;}
,__kY:function(cg,cj,ch){var top=null;var cm=null;if(cg.backgroundPosition){var ci=cg.backgroundPosition.split(H);cm=parseInt(ci[0],10);if(isNaN(cm)){cm=ci[0];}
;top=parseInt(ci[1],10);if(isNaN(top)){top=ci[1];}
;}
;var ck=qx.bom.element.Background.getStyles(cj,ch,cm,top);for(var cl in ck){cg[cl]=ck[cl];}
;if(cg.filter){cg.filter=v;}
;}
,__la:function(cn){if(this.DEBUG&&qx.util.ResourceManager.getInstance().has(cn)&&cn.indexOf(a)==-1){if(!this.__kO[cn]){qx.log.Logger.debug(l+cn);this.__kO[cn]=true;}
;}
;}
}});}
)();
(function(){var a="')",b="gecko",c="background-image:url(",d="0",e=");",f="",g="px",h="number",i=")",j="background-repeat:",k="engine.version",l="data:",m=" ",n="qx.bom.element.Background",o=";",p="url(",q="background-position:",r="base64",s="url('",t="engine.name",u="'";qx.Class.define(n,{statics:{__lb:[c,null,e,q,null,o,j,null,o],__lc:{backgroundImage:null,backgroundPosition:null,backgroundRepeat:null},__ld:function(z,top){var v=qx.core.Environment.get(t);var x=qx.core.Environment.get(k);if(v==b&&x<1.9&&z==top&&typeof z==h){top+=0.01;}
;if(z){var y=(typeof z==h)?z+g:z;}
else {y=d;}
;if(top){var w=(typeof top==h)?top+g:top;}
else {w=d;}
;return y+m+w;}
,__le:function(A){var String=qx.lang.String;var B=A.substr(0,50);return String.startsWith(B,l)&&String.contains(B,r);}
,compile:function(F,D,H,top){var G=this.__ld(H,top);var E=qx.util.ResourceManager.getInstance().toUri(F);if(this.__le(E)){E=u+E+u;}
;var C=this.__lb;C[1]=E;C[4]=G;C[7]=D;return C.join(f);}
,getStyles:function(L,J,N,top){if(!L){return this.__lc;}
;var M=this.__ld(N,top);var K=qx.util.ResourceManager.getInstance().toUri(L);var O;if(this.__le(K)){O=s+K+a;}
else {O=p+K+i;}
;var I={backgroundPosition:M,backgroundImage:O};if(J!=null){I.backgroundRepeat=J;}
;return I;}
,set:function(T,S,Q,U,top){var P=this.getStyles(S,Q,U,top);for(var R in P){T.style[R]=P[R];}
;}
}});}
)();
(function(){var a="dragdrop-cursor",b="_applyAction",c="alias",d="qx.ui.core.DragDropCursor",e="move",f="singleton",g="copy";qx.Class.define(d,{extend:qx.ui.basic.Image,include:qx.ui.core.MPlacement,type:f,construct:function(){qx.ui.basic.Image.call(this);this.setZIndex(1e8);this.setDomMove(true);var h=this.getApplicationRoot();h.add(this,{left:-1000,top:-1000});}
,properties:{appearance:{refine:true,init:a},action:{check:[c,g,e],apply:b,nullable:true}},members:{_applyAction:function(j,i){if(i){this.removeState(i);}
;if(j){this.addState(j);}
;}
}});}
)();
(function(){var a='indexOf',b='slice',c='concat',d='toLocaleLowerCase',e="qx.type.BaseString",f="",g='trim',h='match',j='toLocaleUpperCase',k='search',m='replace',n='toLowerCase',o='charCodeAt',p='split',q='substring',r='lastIndexOf',s='substr',t='toUpperCase',u='charAt';qx.Class.define(e,{extend:Object,construct:function(v){var v=v||f;this.__li=v;this.length=v.length;}
,members:{$$isString:true,length:0,__li:null,toString:function(){return this.__li;}
,charAt:null,valueOf:null,charCodeAt:null,concat:null,indexOf:null,lastIndexOf:null,match:null,replace:null,search:null,slice:null,split:null,substr:null,substring:null,toLowerCase:null,toUpperCase:null,toHashCode:function(){return qx.core.ObjectRegistry.toHashCode(this);}
,toLocaleLowerCase:null,toLocaleUpperCase:null,base:function(x,w){return qx.core.Object.prototype.base.apply(this,arguments);}
},defer:function(y,z){{}
;var A=[u,o,c,a,r,h,m,k,b,p,s,q,n,t,d,j,g];z.valueOf=z.toString;if(new y(f).valueOf()==null){delete z.valueOf;}
;for(var i=0,l=A.length;i<l;i++ ){z[A[i]]=String.prototype[A[i]];}
;}
});}
)();
(function(){var a="qx.locale.LocalizedString";qx.Class.define(a,{extend:qx.type.BaseString,construct:function(b,d,c){qx.type.BaseString.call(this,b);this.__lj=d;this.__lk=c;}
,members:{__lj:null,__lk:null,translate:function(){return qx.locale.Manager.getInstance().translate(this.__lj,this.__lk);}
,getMessageId:function(){return this.__lj;}
}});}
)();
(function(){var a="locale",b="_applyLocale",c="",d="changeLocale",e="_",f="C",g="locale.variant",h="qx.dynlocale",j="qx.locale.Manager",k="String",l="singleton";qx.Class.define(j,{type:l,extend:qx.core.Object,construct:function(){qx.core.Object.call(this);this.__ll=qx.$$translations||{};this.__lm=qx.$$locales||{};var m=qx.core.Environment.get(a);var n=qx.core.Environment.get(g);if(n!==c){m+=e+n;}
;this.__ln=m;this.setLocale(m||this.__lo);}
,statics:{tr:function(p,q){var o=qx.lang.Array.fromArguments(arguments);o.splice(0,1);return qx.locale.Manager.getInstance().translate(p,o);}
,trn:function(s,v,r,u){var t=qx.lang.Array.fromArguments(arguments);t.splice(0,3);if(r!=1){return qx.locale.Manager.getInstance().translate(v,t);}
else {return qx.locale.Manager.getInstance().translate(s,t);}
;}
,trc:function(z,x,y){var w=qx.lang.Array.fromArguments(arguments);w.splice(0,2);return qx.locale.Manager.getInstance().translate(x,w);}
,trnc:function(B,C,F,A,E){var D=qx.lang.Array.fromArguments(arguments);D.splice(0,4);if(A!=1){return qx.locale.Manager.getInstance().translate(F,D);}
else {return qx.locale.Manager.getInstance().translate(C,D);}
;}
,marktr:function(G){return G;}
},properties:{locale:{check:k,nullable:true,apply:b,event:d}},members:{__lo:f,__lp:null,__lq:null,__ll:null,__lm:null,__ln:null,getLanguage:function(){return this.__lq;}
,getTerritory:function(){return this.getLocale().split(e)[1]||c;}
,getAvailableLocales:function(I){var J=[];for(var H in this.__lm){if(H!=this.__lo){if(this.__lm[H]===null&&!I){continue;}
;J.push(H);}
;}
;return J;}
,__lr:function(K){var M;if(K==null){return null;}
;var L=K.indexOf(e);if(L==-1){M=K;}
else {M=K.substring(0,L);}
;return M;}
,_applyLocale:function(O,N){{}
;this.__lp=O;this.__lq=this.__lr(O);}
,addTranslation:function(P,S){var Q=this.__ll;if(Q[P]){for(var R in S){Q[P][R]=S[R];}
;}
else {Q[P]=S;}
;}
,addLocale:function(W,U){var T=this.__lm;if(T[W]){for(var V in U){T[W][V]=U[V];}
;}
else {T[W]=U;}
;}
,translate:function(bb,ba,X){var Y=this.__ll;return this.__ls(Y,bb,ba,X);}
,localize:function(bf,be,bc){var bd=this.__lm;return this.__ls(bd,bf,be,bc);}
,__ls:function(bk,bl,bi,bj){{}
;var bg;if(!bk){return bl;}
;if(bj){var bh=this.__lr(bj);}
else {bj=this.__lp;bh=this.__lq;}
;if(!bg&&bk[bj]){bg=bk[bj][bl];}
;if(!bg&&bk[bh]){bg=bk[bh][bl];}
;if(!bg&&bk[this.__lo]){bg=bk[this.__lo][bl];}
;if(!bg){bg=bl;}
;if(bi.length>0){var bm=[];for(var i=0;i<bi.length;i++ ){var bn=bi[i];if(bn&&bn.translate){bm[i]=bn.translate();}
else {bm[i]=bn;}
;}
;bg=qx.lang.String.format(bg,bm);}
;if(qx.core.Environment.get(h)){bg=new qx.locale.LocalizedString(bg,bl,bi);}
;return bg;}
},destruct:function(){this.__ll=this.__lm=null;}
});}
)();
(function(){var a="qx.bom.client.Locale",b="-",c="locale",d="",e="android",f="locale.variant";qx.Bootstrap.define(a,{statics:{getLocale:function(){var g=qx.bom.client.Locale.__lt();var h=g.indexOf(b);if(h!=-1){g=g.substr(0,h);}
;return g;}
,getVariant:function(){var i=qx.bom.client.Locale.__lt();var k=d;var j=i.indexOf(b);if(j!=-1){k=i.substr(j+1);}
;return k;}
,__lt:function(){var l=(navigator.userLanguage||navigator.language||d);if(qx.bom.client.OperatingSystem.getName()==e){var m=/(\w{2})-(\w{2})/i.exec(navigator.userAgent);if(m){l=m[0];}
;}
;return l.toLowerCase();}
},defer:function(n){qx.core.Environment.add(c,n.getLocale);qx.core.Environment.add(f,n.getVariant);}
});}
)();
(function(){var a="qx.ui.core.MChildrenHandling";qx.Mixin.define(a,{members:{getChildren:function(){return this._getChildren();}
,hasChildren:function(){return this._hasChildren();}
,indexOf:function(b){return this._indexOf(b);}
,add:function(d,c){this._add(d,c);}
,addAt:function(g,e,f){this._addAt(g,e,f);}
,addBefore:function(h,j,i){this._addBefore(h,j,i);}
,addAfter:function(m,k,l){this._addAfter(m,k,l);}
,remove:function(n){this._remove(n);}
,removeAt:function(o){return this._removeAt(o);}
,removeAll:function(){return this._removeAll();}
},statics:{remap:function(p){p.getChildren=p._getChildren;p.hasChildren=p._hasChildren;p.indexOf=p._indexOf;p.add=p._add;p.addAt=p._addAt;p.addBefore=p._addBefore;p.addAfter=p._addAfter;p.remove=p._remove;p.removeAt=p._removeAt;p.removeAll=p._removeAll;}
}});}
)();
(function(){var a="qx.ui.container.Composite",b="addChildWidget",c="removeChildWidget",d="qx.event.type.Data";qx.Class.define(a,{extend:qx.ui.core.Widget,include:[qx.ui.core.MChildrenHandling,qx.ui.core.MLayoutHandling],construct:function(e){qx.ui.core.Widget.call(this);if(e!=null){this._setLayout(e);}
;}
,events:{addChildWidget:d,removeChildWidget:d},members:{_afterAddChild:function(f){this.fireNonBubblingEvent(b,qx.event.type.Data,[f]);}
,_afterRemoveChild:function(g){this.fireNonBubblingEvent(c,qx.event.type.Data,[g]);}
},defer:function(h,i){qx.ui.core.MChildrenHandling.remap(i);qx.ui.core.MLayoutHandling.remap(i);}
});}
)();
(function(){var a="qx.ui.popup.Popup",b="visible",c="excluded",d="popup",e="Boolean";qx.Class.define(a,{extend:qx.ui.container.Composite,include:qx.ui.core.MPlacement,construct:function(f){qx.ui.container.Composite.call(this,f);this.initVisibility();}
,properties:{appearance:{refine:true,init:d},visibility:{refine:true,init:c},autoHide:{check:e,init:true}},members:{show:function(){if(this.getLayoutParent()==null){qx.core.Init.getApplication().getRoot().add(this);}
;qx.ui.container.Composite.prototype.show.call(this);}
,_applyVisibility:function(i,h){qx.ui.container.Composite.prototype._applyVisibility.call(this,i,h);var g=qx.ui.popup.Manager.getInstance();i===b?g.add(this):g.remove(this);}
},destruct:function(){if(!qx.ui.popup.Manager.getInstance().isDisposed()){qx.ui.popup.Manager.getInstance().remove(this);}
;}
});}
)();
(function(){var a="__lu",b="blur",c="pointerdown",d="singleton",f="qx.ui.popup.Manager";qx.Class.define(f,{type:d,extend:qx.core.Object,construct:function(){qx.core.Object.call(this);this.__lu=[];qx.event.Registration.addListener(document.documentElement,c,this.__lw,this,true);qx.bom.Element.addListener(window,b,this.hideAll,this);}
,members:{__lu:null,add:function(g){{}
;this.__lu.push(g);this.__lv();}
,remove:function(h){{}
;qx.lang.Array.remove(this.__lu,h);this.__lv();}
,hideAll:function(){var l=this.__lu.length,j={};while(l-- ){j=this.__lu[l];if(j.getAutoHide()){j.exclude();}
;}
;}
,__lv:function(){var k=1e7;for(var i=0;i<this.__lu.length;i++ ){this.__lu[i].setZIndex(k++ );}
;}
,__lw:function(e){var n=qx.ui.core.Widget.getWidgetByElement(e.getTarget());var o=this.__lu;for(var i=0;i<o.length;i++ ){var m=o[i];if(!m.getAutoHide()||n==m||qx.ui.core.Widget.contains(m,n)){continue;}
;m.exclude();}
;}
},destruct:function(){qx.event.Registration.removeListener(document.documentElement,c,this.__lw,this,true);this._disposeArray(a);}
});}
)();
(function(){var a="_applyRich",b="qx.ui.tooltip.ToolTip",c="_applyIcon",d="tooltip",f="pointerover",g="qx.ui.core.Widget",h="arrow",i="Boolean",j="_applyArrowPosition",k="left",l="right",m="_applyLabel",n="Integer",o="String",p="atom";qx.Class.define(b,{extend:qx.ui.popup.Popup,construct:function(q,r){qx.ui.popup.Popup.call(this);this.setLayout(new qx.ui.layout.HBox());this._createChildControl(h);this._createChildControl(p);if(q!=null){this.setLabel(q);}
;if(r!=null){this.setIcon(r);}
;this.addListener(f,this._onPointerOver,this);}
,properties:{appearance:{refine:true,init:d},showTimeout:{check:n,init:700,themeable:true},hideTimeout:{check:n,init:4000,themeable:true},label:{check:o,nullable:true,apply:m},icon:{check:o,nullable:true,apply:c,themeable:true},rich:{check:i,init:false,apply:a},opener:{check:g,nullable:true},arrowPosition:{check:[k,l],init:k,themeable:true,apply:j}},members:{_forwardStates:{placementLeft:true},_createChildControlImpl:function(u,t){var s;switch(u){case p:s=new qx.ui.basic.Atom();this._add(s,{flex:1});break;case h:s=new qx.ui.basic.Image();this._add(s);};return s||qx.ui.popup.Popup.prototype._createChildControlImpl.call(this,u);}
,_onPointerOver:function(e){}
,_applyIcon:function(w,v){var x=this.getChildControl(p);w==null?x.resetIcon():x.setIcon(w);}
,_applyLabel:function(z,y){var A=this.getChildControl(p);z==null?A.resetLabel():A.setLabel(z);}
,_applyRich:function(C,B){var D=this.getChildControl(p);D.setRich(C);}
,_applyArrowPosition:function(F,E){this._getLayout().setReversed(F==k);}
}});}
)();
(function(){var a="Missing renderLayout() implementation!",b="abstract",c="It is not possible to manually set the connected widget.",d="qx.ui.layout.Abstract",e="Missing getHeightForWidth() implementation!";qx.Class.define(d,{type:b,extend:qx.core.Object,members:{__eY:null,_invalidChildrenCache:null,__lh:null,invalidateLayoutCache:function(){this.__eY=null;}
,renderLayout:function(g,h,f){this.warn(a);}
,getSizeHint:function(){if(this.__eY){return this.__eY;}
;return this.__eY=this._computeSizeHint();}
,hasHeightForWidth:function(){return false;}
,getHeightForWidth:function(i){this.warn(e);return null;}
,_computeSizeHint:function(){return null;}
,invalidateChildrenCache:function(){this._invalidChildrenCache=true;}
,verifyLayoutProperty:null,_clearSeparators:function(){var j=this.__lh;if(j instanceof qx.ui.core.LayoutItem){j.clearSeparators();}
;}
,_renderSeparator:function(k,l){this.__lh.renderSeparator(k,l);}
,connectToWidget:function(m){if(m&&this.__lh){throw new Error(c);}
;this.__lh=m;this.invalidateChildrenCache();}
,_getWidget:function(){return this.__lh;}
,_applyLayoutChange:function(){if(this.__lh){this.__lh.scheduleLayoutUpdate();}
;}
,_getLayoutChildren:function(){return this.__lh.getLayoutChildren();}
},destruct:function(){this.__lh=this.__eY=null;}
});}
)();
(function(){var a="Decorator",b="middle",c="_applyLayoutChange",d="_applyReversed",e="bottom",f="center",g="Boolean",h="top",j="left",k="right",m="Integer",n="qx.ui.layout.HBox";qx.Class.define(n,{extend:qx.ui.layout.Abstract,construct:function(o,p,q){qx.ui.layout.Abstract.call(this);if(o){this.setSpacing(o);}
;if(p){this.setAlignX(p);}
;if(q){this.setSeparator(q);}
;}
,properties:{alignX:{check:[j,f,k],init:j,apply:c},alignY:{check:[h,b,e],init:h,apply:c},spacing:{check:m,init:0,apply:c},separator:{check:a,nullable:true,apply:c},reversed:{check:g,init:false,apply:d}},members:{__lx:null,__ly:null,__lz:null,__gP:null,_applyReversed:function(){this._invalidChildrenCache=true;this._applyLayoutChange();}
,__lA:function(){var w=this._getLayoutChildren();var length=w.length;var t=false;var r=this.__lx&&this.__lx.length!=length&&this.__ly&&this.__lx;var u;var s=r?this.__lx:new Array(length);var v=r?this.__ly:new Array(length);if(this.getReversed()){w=w.concat().reverse();}
;for(var i=0;i<length;i++ ){u=w[i].getLayoutProperties();if(u.width!=null){s[i]=parseFloat(u.width)/100;}
;if(u.flex!=null){v[i]=u.flex;t=true;}
else {v[i]=0;}
;}
;if(!r){this.__lx=s;this.__ly=v;}
;this.__lz=t;this.__gP=w;delete this._invalidChildrenCache;}
,verifyLayoutProperty:null,renderLayout:function(N,H,M){if(this._invalidChildrenCache){this.__lA();}
;var D=this.__gP;var length=D.length;var P=qx.ui.layout.Util;var L=this.getSpacing();var R=this.getSeparator();if(R){var A=P.computeHorizontalSeparatorGaps(D,L,R);}
else {var A=P.computeHorizontalGaps(D,L,true);}
;var i,O,J,I;var Q=[];var E=A;for(i=0;i<length;i+=1){I=this.__lx[i];J=I!=null?Math.floor((N-A)*I):D[i].getSizeHint().width;Q.push(J);E+=J;}
;if(this.__lz&&E!=N){var G={};var K,y;for(i=0;i<length;i+=1){K=this.__ly[i];if(K>0){F=D[i].getSizeHint();G[i]={min:F.minWidth,value:Q[i],max:F.maxWidth,flex:K};}
;}
;var B=P.computeFlexOffsets(G,N,E);for(i in B){y=B[i].offset;Q[i]+=y;E+=y;}
;}
;var V=D[0].getMarginLeft();if(E<N&&this.getAlignX()!=j){V=N-E;if(this.getAlignX()===f){V=Math.round(V/2);}
;}
;var F,top,z,J,C,T,x;var L=this.getSpacing();this._clearSeparators();if(R){var S=qx.theme.manager.Decoration.getInstance().resolve(R).getInsets();var U=S.left+S.right;}
;for(i=0;i<length;i+=1){O=D[i];J=Q[i];F=O.getSizeHint();T=O.getMarginTop();x=O.getMarginBottom();z=Math.max(F.minHeight,Math.min(H-T-x,F.maxHeight));top=P.computeVerticalAlignOffset(O.getAlignY()||this.getAlignY(),z,H,T,x);if(i>0){if(R){V+=C+L;this._renderSeparator(R,{left:V+M.left,top:M.top,width:U,height:H});V+=U+L+O.getMarginLeft();}
else {V+=P.collapseMargins(L,C,O.getMarginLeft());}
;}
;O.renderLayout(V+M.left,top+M.top,J,z);V+=J;C=O.getMarginRight();}
;}
,_computeSizeHint:function(){if(this._invalidChildrenCache){this.__lA();}
;var bl=qx.ui.layout.Util;var X=this.__gP;var bd=0,be=0,W=0;var bb=0,bc=0;var bi,Y,bk;for(var i=0,l=X.length;i<l;i+=1){bi=X[i];Y=bi.getSizeHint();be+=Y.width;var bh=this.__ly[i];var ba=this.__lx[i];if(bh){bd+=Y.minWidth;}
else if(ba){W=Math.max(W,Math.round(Y.minWidth/ba));}
else {bd+=Y.width;}
;bk=bi.getMarginTop()+bi.getMarginBottom();if((Y.height+bk)>bc){bc=Y.height+bk;}
;if((Y.minHeight+bk)>bb){bb=Y.minHeight+bk;}
;}
;bd+=W;var bg=this.getSpacing();var bj=this.getSeparator();if(bj){var bf=bl.computeHorizontalSeparatorGaps(X,bg,bj);}
else {var bf=bl.computeHorizontalGaps(X,bg,true);}
;return {minWidth:bd+bf,width:be+bf,minHeight:bb,height:bc};}
},destruct:function(){this.__lx=this.__ly=this.__gP=null;}
});}
)();
(function(){var a="middle",b="qx.ui.layout.Util",c="left",d="center",e="top",f="bottom",g="right";qx.Class.define(b,{statics:{PERCENT_VALUE:/[0-9]+(?:\.[0-9]+)?%/,computeFlexOffsets:function(j,n,h){var r,q,s,k;var m=n>h;var t=Math.abs(n-h);var u,o;var p={};for(q in j){r=j[q];p[q]={potential:m?r.max-r.value:r.value-r.min,flex:m?r.flex:1/r.flex,offset:0};}
;while(t!=0){k=Infinity;s=0;for(q in p){r=p[q];if(r.potential>0){s+=r.flex;k=Math.min(k,r.potential/r.flex);}
;}
;if(s==0){break;}
;k=Math.min(t,k*s)/s;u=0;for(q in p){r=p[q];if(r.potential>0){o=Math.min(t,r.potential,Math.ceil(k*r.flex));u+=o-k*r.flex;if(u>=1){u-=1;o-=1;}
;r.potential-=o;if(m){r.offset+=o;}
else {r.offset-=o;}
;t-=o;}
;}
;}
;return p;}
,computeHorizontalAlignOffset:function(w,v,y,z,A){if(z==null){z=0;}
;if(A==null){A=0;}
;var x=0;switch(w){case c:x=z;break;case g:x=y-v-A;break;case d:x=Math.round((y-v)/2);if(x<z){x=z;}
else if(x<A){x=Math.max(z,y-v-A);}
;break;};return x;}
,computeVerticalAlignOffset:function(C,F,B,G,D){if(G==null){G=0;}
;if(D==null){D=0;}
;var E=0;switch(C){case e:E=G;break;case f:E=B-F-D;break;case a:E=Math.round((B-F)/2);if(E<G){E=G;}
else if(E<D){E=Math.max(G,B-F-D);}
;break;};return E;}
,collapseMargins:function(K){var I=0,H=0;for(var i=0,l=arguments.length;i<l;i++ ){var J=arguments[i];if(J<0){H=Math.min(H,J);}
else if(J>0){I=Math.max(I,J);}
;}
;return I+H;}
,computeHorizontalGaps:function(O,M,L){if(M==null){M=0;}
;var N=0;if(L){N+=O[0].getMarginLeft();for(var i=1,l=O.length;i<l;i+=1){N+=this.collapseMargins(M,O[i-1].getMarginRight(),O[i].getMarginLeft());}
;N+=O[l-1].getMarginRight();}
else {for(var i=1,l=O.length;i<l;i+=1){N+=O[i].getMarginLeft()+O[i].getMarginRight();}
;N+=(M*(l-1));}
;return N;}
,computeVerticalGaps:function(S,Q,P){if(Q==null){Q=0;}
;var R=0;if(P){R+=S[0].getMarginTop();for(var i=1,l=S.length;i<l;i+=1){R+=this.collapseMargins(Q,S[i-1].getMarginBottom(),S[i].getMarginTop());}
;R+=S[l-1].getMarginBottom();}
else {for(var i=1,l=S.length;i<l;i+=1){R+=S[i].getMarginTop()+S[i].getMarginBottom();}
;R+=(Q*(l-1));}
;return R;}
,computeHorizontalSeparatorGaps:function(bb,U,Y){var T=qx.theme.manager.Decoration.getInstance().resolve(Y);var V=T.getInsets();var W=V.left+V.right;var X=0;for(var i=0,l=bb.length;i<l;i++ ){var ba=bb[i];X+=ba.getMarginLeft()+ba.getMarginRight();}
;X+=(U+W+U)*(l-1);return X;}
,computeVerticalSeparatorGaps:function(bj,bc,bh){var bf=qx.theme.manager.Decoration.getInstance().resolve(bh);var be=bf.getInsets();var bd=be.top+be.bottom;var bg=0;for(var i=0,l=bj.length;i<l;i++ ){var bi=bj[i];bg+=bi.getMarginTop()+bi.getMarginBottom();}
;bg+=(bc+bd+bc)*(l-1);return bg;}
,arrangeIdeals:function(bl,bn,bk,bm,bo,bp){if(bn<bl||bo<bm){if(bn<bl&&bo<bm){bn=bl;bo=bm;}
else if(bn<bl){bo-=(bl-bn);bn=bl;if(bo<bm){bo=bm;}
;}
else if(bo<bm){bn-=(bm-bo);bo=bm;if(bn<bl){bn=bl;}
;}
;}
;if(bn>bk||bo>bp){if(bn>bk&&bo>bp){bn=bk;bo=bp;}
else if(bn>bk){bo+=(bn-bk);bn=bk;if(bo>bp){bo=bp;}
;}
else if(bo>bp){bn+=(bo-bp);bo=bp;if(bn>bk){bn=bk;}
;}
;}
;return {begin:bn,end:bo};}
}});}
)();
(function(){var a="Boolean",b="changeGap",c="changeShow",d="bottom",e="bottom-right",f="_applyCenter",g="changeIcon",h="qx.ui.basic.Atom",i="changeLabel",j="both",k="Integer",l="_applyIconPosition",m="bottom-left",n="String",o="icon",p="top-left",q="top",r="top-right",s="right",t="_applyRich",u="_applyIcon",v="label",w="_applyShow",x="left",y="_applyLabel",z="_applyGap",A="atom";qx.Class.define(h,{extend:qx.ui.core.Widget,construct:function(B,C){{}
;qx.ui.core.Widget.call(this);this._setLayout(new qx.ui.layout.Atom());if(B!=null){this.setLabel(B);}
;if(C!==undefined){this.setIcon(C);}
;}
,properties:{appearance:{refine:true,init:A},label:{apply:y,nullable:true,check:n,event:i},rich:{check:a,init:false,apply:t},icon:{check:n,apply:u,nullable:true,themeable:true,event:g},gap:{check:k,nullable:false,event:b,apply:z,themeable:true,init:4},show:{init:j,check:[j,v,o],themeable:true,inheritable:true,apply:w,event:c},iconPosition:{init:x,check:[q,s,d,x,p,m,r,e],themeable:true,apply:l},center:{init:false,check:a,themeable:true,apply:f}},members:{_createChildControlImpl:function(F,E){var D;switch(F){case v:D=new qx.ui.basic.Label(this.getLabel());D.setAnonymous(true);D.setRich(this.getRich());this._add(D);if(this.getLabel()==null||this.getShow()===o){D.exclude();}
;break;case o:D=new qx.ui.basic.Image(this.getIcon());D.setAnonymous(true);this._addAt(D,0);if(this.getIcon()==null||this.getShow()===v){D.exclude();}
;break;};return D||qx.ui.core.Widget.prototype._createChildControlImpl.call(this,F);}
,_forwardStates:{focused:true,hovered:true},_handleLabel:function(){if(this.getLabel()==null||this.getShow()===o){this._excludeChildControl(v);}
else {this._showChildControl(v);}
;}
,_handleIcon:function(){if(this.getIcon()==null||this.getShow()===v){this._excludeChildControl(o);}
else {this._showChildControl(o);}
;}
,_applyLabel:function(H,G){var I=this.getChildControl(v,true);if(I){I.setValue(H);}
;this._handleLabel();}
,_applyRich:function(K,J){var L=this.getChildControl(v,true);if(L){L.setRich(K);}
;}
,_applyIcon:function(N,M){var O=this.getChildControl(o,true);if(O){O.setSource(N);}
;this._handleIcon();}
,_applyGap:function(Q,P){this._getLayout().setGap(Q);}
,_applyShow:function(S,R){this._handleLabel();this._handleIcon();}
,_applyIconPosition:function(U,T){this._getLayout().setIconPosition(U);}
,_applyCenter:function(W,V){this._getLayout().setCenter(W);}
,_applySelectable:function(Y,X){qx.ui.core.Widget.prototype._applySelectable.call(this,Y,X);var ba=this.getChildControl(v,true);if(ba){this.getChildControl(v).setSelectable(Y);}
;}
}});}
)();
(function(){var a="middle",b="_applyLayoutChange",c="top-right",d="bottom",e="top-left",f="bottom-left",g="center",h="qx.ui.layout.Atom",j="bottom-right",k="top",l="left",m="right",n="Integer",o="Boolean";qx.Class.define(h,{extend:qx.ui.layout.Abstract,properties:{gap:{check:n,init:4,apply:b},iconPosition:{check:[l,k,m,d,e,f,c,j],init:l,apply:b},center:{check:o,init:false,apply:b}},members:{verifyLayoutProperty:null,renderLayout:function(E,y,D){var N=D.left;var top=D.top;var z=qx.ui.layout.Util;var q=this.getIconPosition();var t=this._getLayoutChildren();var length=t.length;var x,r;var G,L;var C=this.getGap();var J=this.getCenter();var M=[d,m,c,j];if(M.indexOf(q)!=-1){var A=length-1;var v=-1;var s=-1;}
else {var A=0;var v=length;var s=1;}
;if(q==k||q==d){if(J){var F=0;for(var i=A;i!=v;i+=s){r=t[i].getSizeHint().height;if(r>0){F+=r;if(i!=A){F+=C;}
;}
;}
;top+=Math.round((y-F)/2);}
;var u=top;for(var i=A;i!=v;i+=s){G=t[i];L=G.getSizeHint();x=Math.min(L.maxWidth,Math.max(E,L.minWidth));r=L.height;N=z.computeHorizontalAlignOffset(g,x,E)+D.left;G.renderLayout(N,u,x,r);if(r>0){u=top+r+C;}
;}
;}
else {var w=E;var p=null;var I=0;for(var i=A;i!=v;i+=s){G=t[i];x=G.getSizeHint().width;if(x>0){if(!p&&G instanceof qx.ui.basic.Label){p=G;}
else {w-=x;}
;I++ ;}
;}
;if(I>1){var H=(I-1)*C;w-=H;}
;if(p){var L=p.getSizeHint();var B=Math.max(L.minWidth,Math.min(w,L.maxWidth));w-=B;}
;if(J&&w>0){N+=Math.round(w/2);}
;for(var i=A;i!=v;i+=s){G=t[i];L=G.getSizeHint();r=Math.min(L.maxHeight,Math.max(y,L.minHeight));if(G===p){x=B;}
else {x=L.width;}
;var K=a;if(q==e||q==c){K=k;}
else if(q==f||q==j){K=d;}
;var u=top+z.computeVerticalAlignOffset(K,L.height,y);G.renderLayout(N,u,x,r);if(x>0){N+=x+C;}
;}
;}
;}
,_computeSizeHint:function(){var Y=this._getLayoutChildren();var length=Y.length;var P,W;if(length===1){var P=Y[0].getSizeHint();W={width:P.width,height:P.height,minWidth:P.minWidth,minHeight:P.minHeight};}
else {var U=0,V=0;var R=0,T=0;var S=this.getIconPosition();var Q=this.getGap();if(S===k||S===d){var O=0;for(var i=0;i<length;i++ ){P=Y[i].getSizeHint();V=Math.max(V,P.width);U=Math.max(U,P.minWidth);if(P.height>0){T+=P.height;R+=P.minHeight;O++ ;}
;}
;if(O>1){var X=(O-1)*Q;T+=X;R+=X;}
;}
else {var O=0;for(var i=0;i<length;i++ ){P=Y[i].getSizeHint();T=Math.max(T,P.height);R=Math.max(R,P.minHeight);if(P.width>0){V+=P.width;U+=P.minWidth;O++ ;}
;}
;if(O>1){var X=(O-1)*Q;V+=X;U+=X;}
;}
;W={minWidth:U,width:V,minHeight:R,height:T};}
;return W;}
}});}
)();
(function(){var a="qx.event.type.Data",b="qx.ui.form.IStringForm";qx.Interface.define(b,{events:{"changeValue":a},members:{setValue:function(c){return arguments.length==1;}
,resetValue:function(){}
,getValue:function(){}
}});}
)();
(function(){var a="safari",b="os.name",c="_applyTextAlign",d="Boolean",f="qx.ui.core.Widget",g="nowrap",h="changeStatus",i="changeTextAlign",j="_applyWrap",k="changeValue",l="browser.name",m="color",n="qx.ui.basic.Label",o="osx",p="css.textoverflow",q="html.xul",r="_applyValue",s="center",t="_applyBuddy",u="enabled",v="String",w="toggleValue",x="whiteSpace",y="textAlign",z="function",A="browser.version",B="qx.dynlocale",C="engine.version",D="right",E="gecko",F="justify",G="changeRich",H="normal",I="_applyRich",J="engine.name",K="label",L="changeLocale",M="left",N="tap",O="A";qx.Class.define(n,{extend:qx.ui.core.Widget,implement:[qx.ui.form.IStringForm],construct:function(P){qx.ui.core.Widget.call(this);if(P!=null){this.setValue(P);}
;if(qx.core.Environment.get(B)){qx.locale.Manager.getInstance().addListener(L,this._onChangeLocale,this);}
;}
,properties:{rich:{check:d,init:false,event:G,apply:I},wrap:{check:d,init:true,apply:j},value:{check:v,apply:r,event:k,nullable:true},buddy:{check:f,apply:t,nullable:true,init:null,dereference:true},textAlign:{check:[M,s,D,F],nullable:true,themeable:true,apply:c,event:i},appearance:{refine:true,init:K},selectable:{refine:true,init:false},allowGrowX:{refine:true,init:false},allowGrowY:{refine:true,init:false},allowShrinkY:{refine:true,init:false}},members:{__lB:null,__lC:null,__lD:null,__lE:null,_getContentHint:function(){if(this.__lC){this.__lF=this.__lG();delete this.__lC;}
;return {width:this.__lF.width,height:this.__lF.height};}
,_hasHeightForWidth:function(){return this.getRich()&&this.getWrap();}
,_applySelectable:function(Q){if(!qx.core.Environment.get(p)&&qx.core.Environment.get(q)){if(Q&&!this.isRich()){{}
;return;}
;}
;qx.ui.core.Widget.prototype._applySelectable.call(this,Q);}
,_getContentHeightForWidth:function(R){if(!this.getRich()&&!this.getWrap()){return null;}
;return this.__lG(R).height;}
,_createContentElement:function(){return new qx.html.Label;}
,_applyTextAlign:function(T,S){this.getContentElement().setStyle(y,T);}
,_applyTextColor:function(V,U){if(V){this.getContentElement().setStyle(m,qx.theme.manager.Color.getInstance().resolve(V));}
else {this.getContentElement().removeStyle(m);}
;}
,__lF:{width:0,height:0},_applyFont:function(Y,X){if(X&&this.__lB&&this.__lE){this.__lB.removeListenerById(this.__lE);this.__lE=null;}
;var W;if(Y){this.__lB=qx.theme.manager.Font.getInstance().resolve(Y);if(this.__lB instanceof qx.bom.webfonts.WebFont){this.__lE=this.__lB.addListener(h,this._onWebFontStatusChange,this);}
;W=this.__lB.getStyles();}
else {this.__lB=null;W=qx.bom.Font.getDefaultStyles();}
;if(this.getTextColor()!=null){delete W[m];}
;this.getContentElement().setStyles(W);this.__lC=true;qx.ui.core.queue.Layout.add(this);}
,__lG:function(bc){var bb=qx.bom.Label;var be=this.getFont();var ba=be?this.__lB.getStyles():qx.bom.Font.getDefaultStyles();var content=this.getValue()||O;var bd=this.getRich();if(this.__lE){this.__lH();}
;return bd?bb.getHtmlSize(content,ba,bc):bb.getTextSize(content,ba);}
,__lH:function(){if(!this.getContentElement()){return;}
;if(qx.core.Environment.get(b)==o&&qx.core.Environment.get(J)==E&&parseInt(qx.core.Environment.get(C),10)<16&&parseInt(qx.core.Environment.get(C),10)>9){var bf=this.getContentElement().getDomElement();if(bf){bf.innerHTML=bf.innerHTML;}
;}
;}
,_applyBuddy:function(bh,bg){if(bg!=null){this.removeRelatedBindings(bg);this.removeListenerById(this.__lD);this.__lD=null;}
;if(bh!=null){bh.bind(u,this,u);this.__lD=this.addListener(N,function(){if(bh.isFocusable()){bh.focus.apply(bh);}
;if(w in bh&&typeof bh.toggleValue===z){bh.toggleValue();}
;}
,this);}
;}
,_applyRich:function(bi){this.getContentElement().setRich(bi);this.__lC=true;qx.ui.core.queue.Layout.add(this);}
,_applyWrap:function(bl,bj){if(bl&&!this.isRich()){{}
;}
;if(this.isRich()){var bk=bl?H:g;this.getContentElement().setStyle(x,bk);}
;}
,_onChangeLocale:qx.core.Environment.select(B,{"true":function(e){var content=this.getValue();if(content&&content.translate){this.setValue(content.translate());}
;}
,"false":null}),_onWebFontStatusChange:function(bm){if(bm.getData().valid===true){if(qx.core.Environment.get(l)==a&&parseFloat(qx.core.Environment.get(A))>=8){window.setTimeout(function(){this.__lC=true;qx.ui.core.queue.Layout.add(this);}
.bind(this),0);}
;this.__lC=true;qx.ui.core.queue.Layout.add(this);}
;}
,_applyValue:function(bo,bn){this.getContentElement().setValue(bo);this.__lC=true;qx.ui.core.queue.Layout.add(this);}
},destruct:function(){if(qx.core.Environment.get(B)){qx.locale.Manager.getInstance().removeListener(L,this._onChangeLocale,this);}
;if(this.__lB&&this.__lE){this.__lB.removeListenerById(this.__lE);}
;this.__lB=null;}
});}
)();
(function(){var a="value",b="qx.html.Label",c="The label mode cannot be modified after initial creation",d='hidden';qx.Class.define(b,{extend:qx.html.Element,members:{__lI:null,_applyProperty:function(name,e){qx.html.Element.prototype._applyProperty.call(this,name,e);if(name==a){var f=this.getDomElement();qx.bom.Label.setValue(f,e);}
;}
,_createDomElement:function(){var h=this.__lI;var g=qx.bom.Label.create(this._content,h);g.style.overflow=d;return g;}
,_copyData:function(i){return qx.html.Element.prototype._copyData.call(this,true);}
,setRich:function(j){var k=this.getDomElement();if(k){throw new Error(c);}
;j=!!j;if(this.__lI==j){return this;}
;this.__lI=j;return this;}
,setValue:function(l){this._setProperty(a,l);return this;}
,getValue:function(){return this._getProperty(a);}
}});}
)();
(function(){var a="text",b="function",c="px",d="http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul",e="crop",f="nowrap",g="end",h="div",i="100%",j="auto",k="0",l="css.textoverflow",m="html.xul",n="value",o="visible",p="qx.bom.Label",q="",r="ellipsis",s="normal",t="inherit",u="block",v="label",w="-1000px",x="hidden",y="absolute";qx.Bootstrap.define(p,{statics:{__lJ:{fontFamily:1,fontSize:1,fontWeight:1,fontStyle:1,lineHeight:1},__lK:function(){var z=this.__lM(false);document.body.insertBefore(z,document.body.firstChild);return this._textElement=z;}
,__lL:function(){var A=this.__lM(true);document.body.insertBefore(A,document.body.firstChild);return this._htmlElement=A;}
,__lM:function(D){var B=qx.dom.Element.create(h);var C=B.style;C.width=C.height=j;C.left=C.top=w;C.visibility=x;C.position=y;C.overflow=o;C.display=u;if(D){C.whiteSpace=s;}
else {C.whiteSpace=f;if(!qx.core.Environment.get(l)&&qx.core.Environment.get(m)){var E=document.createElementNS(d,v);var C=E.style;C.padding=k;C.margin=k;C.width=j;for(var F in this.__lJ){C[F]=t;}
;B.appendChild(E);}
;}
;return B;}
,__lN:function(H){var G={};if(H){G.whiteSpace=s;}
else if(!qx.core.Environment.get(l)&&qx.core.Environment.get(m)){G.display=u;}
else {G.overflow=x;G.whiteSpace=f;G[qx.core.Environment.get(l)]=r;}
;return G;}
,create:function(content,L,K){if(!K){K=window;}
;var I=K.document.createElement(h);if(L){I.useHtml=true;}
else if(!qx.core.Environment.get(l)&&qx.core.Environment.get(m)){var M=K.document.createElementNS(d,v);var J=M.style;J.cursor=t;J.color=t;J.overflow=x;J.maxWidth=i;J.padding=k;J.margin=k;J.width=j;for(var N in this.__lJ){M.style[N]=t;}
;M.setAttribute(e,g);I.appendChild(M);}
else {qx.bom.element.Style.setStyles(I,this.__lN(L));}
;if(content){this.setValue(I,content);}
;return I;}
,__lO:null,setSanitizer:function(O){{}
;qx.bom.Label.__lO=O;}
,setValue:function(Q,P){P=P||q;if(Q.useHtml){if(qx.bom.Label.__lO&&typeof (qx.bom.Label.__lO)===b){P=qx.bom.Label.__lO(P);}
;Q.innerHTML=P;}
else if(!qx.core.Environment.get(l)&&qx.core.Environment.get(m)){Q.firstChild.setAttribute(n,P);}
else {qx.bom.element.Attribute.set(Q,a,P);}
;}
,getValue:function(R){if(R.useHtml){return R.innerHTML;}
else if(!qx.core.Environment.get(l)&&qx.core.Environment.get(m)){return R.firstChild.getAttribute(n)||q;}
else {return qx.bom.element.Attribute.get(R,a);}
;}
,getHtmlSize:function(content,S,T){var U=this._htmlElement||this.__lL();U.style.width=T!=undefined?T+c:j;U.innerHTML=content;return this.__lP(U,S);}
,getTextSize:function(W,V){var X=this._textElement||this.__lK();if(!qx.core.Environment.get(l)&&qx.core.Environment.get(m)){X.firstChild.setAttribute(n,W);}
else {qx.bom.element.Attribute.set(X,a,W);}
;return this.__lP(X,V);}
,__lP:function(bd,Y){var ba=this.__lJ;if(!Y){Y={};}
;for(var bc in ba){bd.style[bc]=Y[bc]||q;}
;var bb=qx.bom.element.Dimension.getSize(bd);bb.width++ ;return bb;}
}});}
)();
(function(){var a="qx.ui.form.IForm",b="qx.event.type.Data";qx.Interface.define(a,{events:{"changeEnabled":b,"changeValid":b,"changeInvalidMessage":b,"changeRequired":b},members:{setEnabled:function(c){return arguments.length==1;}
,getEnabled:function(){}
,setRequired:function(d){return arguments.length==1;}
,getRequired:function(){}
,setValid:function(e){return arguments.length==1;}
,getValid:function(){}
,setInvalidMessage:function(f){return arguments.length==1;}
,getInvalidMessage:function(){}
,setRequiredInvalidMessage:function(g){return arguments.length==1;}
,getRequiredInvalidMessage:function(){}
}});}
)();
(function(){var a="qx.application.Standalone";qx.Class.define(a,{extend:qx.application.AbstractGui,members:{_createRootWidget:function(){return new qx.ui.root.Application(document);}
}});}
)();
(function(){var a="_applyActiveWindow",b="__gt",c="changeModal",d="windowAdded",f="changeVisibility",g="__lQ",h="windowRemoved",i="qx.ui.window.Window",j="changeActive",k="qx.ui.window.MDesktop",l="changeActiveWindow",m="qx.event.type.Data";qx.Mixin.define(k,{properties:{activeWindow:{check:i,apply:a,event:l,init:null,nullable:true}},events:{windowAdded:m,windowRemoved:m},members:{__lQ:null,__gt:null,getWindowManager:function(){if(!this.__gt){this.setWindowManager(new qx.ui.window.Window.DEFAULT_MANAGER_CLASS());}
;return this.__gt;}
,supportsMaximize:function(){return true;}
,setWindowManager:function(n){if(this.__gt){this.__gt.setDesktop(null);}
;n.setDesktop(this);this.__gt=n;}
,_onChangeActive:function(e){if(e.getData()){this.setActiveWindow(e.getTarget());}
else if(this.getActiveWindow()==e.getTarget()){this.setActiveWindow(null);}
;}
,_applyActiveWindow:function(p,o){this.getWindowManager().changeActiveWindow(p,o);this.getWindowManager().updateStack();}
,_onChangeModal:function(e){this.getWindowManager().updateStack();}
,_onChangeVisibility:function(){this.getWindowManager().updateStack();}
,_afterAddChild:function(q){if(qx.Class.isDefined(i)&&q instanceof qx.ui.window.Window){this._addWindow(q);}
;}
,_addWindow:function(r){if(!qx.lang.Array.contains(this.getWindows(),r)){this.getWindows().push(r);this.fireDataEvent(d,r);r.addListener(j,this._onChangeActive,this);r.addListener(c,this._onChangeModal,this);r.addListener(f,this._onChangeVisibility,this);}
;if(r.getActive()){this.setActiveWindow(r);}
;this.getWindowManager().updateStack();}
,_afterRemoveChild:function(s){if(qx.Class.isDefined(i)&&s instanceof qx.ui.window.Window){this._removeWindow(s);}
;}
,_removeWindow:function(t){if(qx.lang.Array.contains(this.getWindows(),t)){qx.lang.Array.remove(this.getWindows(),t);this.fireDataEvent(h,t);t.removeListener(j,this._onChangeActive,this);t.removeListener(c,this._onChangeModal,this);t.removeListener(f,this._onChangeVisibility,this);this.getWindowManager().updateStack();}
;}
,getWindows:function(){if(!this.__lQ){this.__lQ=[];}
;return this.__lQ;}
},destruct:function(){this._disposeArray(g);this._disposeObjects(b);}
});}
)();
(function(){var a="__lR",b="_applyBlockerColor",c="Number",d="qx.ui.core.MBlocker",e="_applyBlockerOpacity",f="Color";qx.Mixin.define(d,{properties:{blockerColor:{check:f,init:null,nullable:true,apply:b,themeable:true},blockerOpacity:{check:c,init:1,apply:e,themeable:true}},members:{__lR:null,_createBlocker:function(){return new qx.ui.core.Blocker(this);}
,_applyBlockerColor:function(h,g){this.getBlocker().setColor(h);}
,_applyBlockerOpacity:function(j,i){this.getBlocker().setOpacity(j);}
,block:function(){this.getBlocker().block();}
,isBlocked:function(){return this.__lR&&this.__lR.isBlocked();}
,unblock:function(){if(this.__lR){this.__lR.unblock();}
;}
,forceUnblock:function(){if(this.__lR){this.__lR.forceUnblock();}
;}
,blockContent:function(k){this.getBlocker().blockContent(k);}
,getBlocker:function(){if(!this.__lR){this.__lR=this._createBlocker();}
;return this.__lR;}
},destruct:function(){this._disposeObjects(a);}
});}
)();
(function(){var a="qx.dyntheme",b="backgroundColor",c="_applyOpacity",d="Boolean",f="px",g="keydown",h="deactivate",j="changeTheme",k="__lR",l="opacity",m="Tab",n="qx.event.type.Event",o="move",p="Color",q="resize",r="__de",s="zIndex",t="appear",u="qx.ui.root.Abstract",v="keyup",w="keypress",x="Number",y="unblocked",z="qx.ui.core.Blocker",A="disappear",B="blocked",C="_applyColor";qx.Class.define(z,{extend:qx.core.Object,events:{blocked:n,unblocked:n},construct:function(D){qx.core.Object.call(this);this._widget=D;D.addListener(q,this.__lW,this);D.addListener(o,this.__lW,this);D.addListener(A,this.__lY,this);if(qx.Class.isDefined(u)&&D instanceof qx.ui.root.Abstract){this._isRoot=true;this.setKeepBlockerActive(true);}
;if(qx.core.Environment.get(a)){qx.theme.manager.Meta.getInstance().addListener(j,this._onChangeTheme,this);}
;this.__lS=[];this.__lT=[];}
,properties:{color:{check:p,init:null,nullable:true,apply:C,themeable:true},opacity:{check:x,init:1,apply:c,themeable:true},keepBlockerActive:{check:d,init:false}},members:{__lR:null,__lU:0,__lS:null,__lT:null,__de:null,_widget:null,_isRoot:false,__lV:null,__lW:function(e){var E=e.getData();if(this.isBlocked()){this._updateBlockerBounds(E);}
;}
,__lX:function(){this._updateBlockerBounds(this._widget.getBounds());if(this._widget.isRootWidget()){this._widget.getContentElement().add(this.getBlockerElement());}
else {this._widget.getLayoutParent().getContentElement().add(this.getBlockerElement());}
;}
,__lY:function(){if(this.isBlocked()){this.getBlockerElement().getParent().remove(this.getBlockerElement());this._widget.addListenerOnce(t,this.__lX,this);}
;}
,_updateBlockerBounds:function(F){this.getBlockerElement().setStyles({width:F.width+f,height:F.height+f,left:F.left+f,top:F.top+f});}
,_applyColor:function(I,H){var G=qx.theme.manager.Color.getInstance().resolve(I);this.__ma(b,G);}
,_applyOpacity:function(K,J){this.__ma(l,K);}
,_onChangeTheme:qx.core.Environment.select(a,{"true":function(){this._applyColor(this.getColor());}
,"false":null}),__ma:function(M,N){var L=[];this.__lR&&L.push(this.__lR);for(var i=0;i<L.length;i++ ){L[i].setStyle(M,N);}
;}
,_backupActiveWidget:function(){var O=qx.event.Registration.getManager(window).getHandler(qx.event.handler.Focus);this.__lS.push(qx.ui.core.Widget.getWidgetByElement(O.getActive()));this.__lT.push(qx.ui.core.Widget.getWidgetByElement(O.getFocus()));if(this._widget.isFocusable()){this._widget.focus();}
;}
,_restoreActiveWidget:function(){var Q;var P=this.__lT.length;if(P>0){Q=this.__lT.pop();if(Q&&!Q.isDisposed()&&Q.isFocusable()){Q.focus();}
;}
;var R=this.__lS.length;if(R>0){Q=this.__lS.pop();if(Q&&!Q.isDisposed()){Q.activate();}
;}
;}
,__mb:function(){return new qx.html.Blocker(this.getColor(),this.getOpacity());}
,getBlockerElement:function(S){if(!this.__lR){this.__lR=this.__mb();this.__lR.setStyle(s,15);if(!S){if(this._isRoot){S=this._widget;}
else {S=this._widget.getLayoutParent();}
;}
;S.getContentElement().add(this.__lR);this.__lR.exclude();}
;return this.__lR;}
,block:function(){this._block();}
,_block:function(T,V){if(!this._isRoot&&!this._widget.getLayoutParent()){this.__lV=this._widget.addListenerOnce(t,this._block.bind(this,T));return;}
;var parent;if(this._isRoot||V){parent=this._widget;}
else {parent=this._widget.getLayoutParent();}
;var U=this.getBlockerElement(parent);if(T!=null){U.setStyle(s,T);}
;this.__lU++ ;if(this.__lU<2){this._backupActiveWidget();var W=this._widget.getBounds();if(W){this._updateBlockerBounds(W);}
;U.include();if(!V){U.activate();}
;U.addListener(h,this.__me,this);U.addListener(w,this.__md,this);U.addListener(g,this.__md,this);U.addListener(v,this.__md,this);this.fireEvent(B,qx.event.type.Event);}
;}
,isBlocked:function(){return this.__lU>0;}
,unblock:function(){if(this.__lV){this._widget.removeListenerById(this.__lV);}
;if(!this.isBlocked()){return;}
;this.__lU-- ;if(this.__lU<1){this.__mc();this.__lU=0;}
;}
,forceUnblock:function(){if(!this.isBlocked()){return;}
;this.__lU=0;this.__mc();}
,__mc:function(){this._restoreActiveWidget();var X=this.getBlockerElement();X.removeListener(h,this.__me,this);X.removeListener(w,this.__md,this);X.removeListener(g,this.__md,this);X.removeListener(v,this.__md,this);X.exclude();this.fireEvent(y,qx.event.type.Event);}
,blockContent:function(Y){this._block(Y,true);}
,__md:function(e){if(e.getKeyIdentifier()==m){e.stop();}
;}
,__me:function(){if(this.getKeepBlockerActive()){this.getBlockerElement().activate();}
;}
},destruct:function(){if(qx.core.Environment.get(a)){qx.theme.manager.Meta.getInstance().removeListener(j,this._onChangeTheme,this);}
;this._widget.removeListener(q,this.__lW,this);this._widget.removeListener(o,this.__lW,this);this._widget.removeListener(t,this.__lX,this);this._widget.removeListener(A,this.__lY,this);if(this.__lV){this._widget.removeListenerById(this.__lV);}
;this._disposeObjects(k,r);this.__lS=this.__lT=this._widget=null;}
});}
)();
(function(){var a="swipe",b="repeat",c="mousedown",d="url(",f="pointerover",g=")",h="longtap",i="mouseout",j="div",k="roll",l="cursor",m="dblclick",n="mousewheel",o="qx.html.Blocker",p="mousemove",q="dbltap",r="pointerup",s="mouseover",t="appear",u="click",v="pointerdown",w="mshtml",x="engine.name",y="mouseup",z="contextmenu",A="disappear",B="tap",C="pointermove",D="pointerout",E="qx/static/blank.gif",F="absolute";qx.Class.define(o,{extend:qx.html.Element,construct:function(I,G){var I=I?qx.theme.manager.Color.getInstance().resolve(I):null;var H={position:F,opacity:G||0,backgroundColor:I};if((qx.core.Environment.get(x)==w)){H.backgroundImage=d+qx.util.ResourceManager.getInstance().toUri(E)+g;H.backgroundRepeat=b;}
;qx.html.Element.call(this,j,H);this.addListener(c,this._stopPropagation,this);this.addListener(y,this._stopPropagation,this);this.addListener(u,this._stopPropagation,this);this.addListener(m,this._stopPropagation,this);this.addListener(p,this._stopPropagation,this);this.addListener(s,this._stopPropagation,this);this.addListener(i,this._stopPropagation,this);this.addListener(n,this._stopPropagation,this);this.addListener(k,this._stopPropagation,this);this.addListener(z,this._stopPropagation,this);this.addListener(v,this._stopPropagation,this);this.addListener(r,this._stopPropagation,this);this.addListener(C,this._stopPropagation,this);this.addListener(f,this._stopPropagation,this);this.addListener(D,this._stopPropagation,this);this.addListener(B,this._stopPropagation,this);this.addListener(q,this._stopPropagation,this);this.addListener(a,this._stopPropagation,this);this.addListener(h,this._stopPropagation,this);this.addListener(t,this.__mf,this);this.addListener(A,this.__mf,this);}
,members:{_stopPropagation:function(e){e.stopPropagation();}
,__mf:function(){var J=this.getStyle(l);this.setStyle(l,null,true);this.setStyle(l,J,true);}
}});}
)();
(function(){var a="changeGlobalCursor",b="engine.name",c="keypress",d="Boolean",f="root",g="help",h="",i="contextmenu",j=" !important",k="input",l="_applyGlobalCursor",m="Space",n="_applyNativeHelp",o=";",p="event.help",q="qx.ui.root.Abstract",r="abstract",s="textarea",t="String",u="*";qx.Class.define(q,{type:r,extend:qx.ui.core.Widget,include:[qx.ui.core.MChildrenHandling,qx.ui.core.MBlocker,qx.ui.window.MDesktop],construct:function(){qx.ui.core.Widget.call(this);qx.ui.core.FocusHandler.getInstance().addRoot(this);qx.ui.core.queue.Visibility.add(this);this.initNativeHelp();this.addListener(c,this.__mh,this);}
,properties:{appearance:{refine:true,init:f},enabled:{refine:true,init:true},focusable:{refine:true,init:true},globalCursor:{check:t,nullable:true,themeable:true,apply:l,event:a},nativeContextMenu:{refine:true,init:false},nativeHelp:{check:d,init:false,apply:n}},members:{__mg:null,isRootWidget:function(){return true;}
,getLayout:function(){return this._getLayout();}
,_applyGlobalCursor:qx.core.Environment.select(b,{"mshtml":function(w,v){}
,"default":function(A,z){var y=qx.bom.Stylesheet;var x=this.__mg;if(!x){this.__mg=x=y.createElement();}
;y.removeAllRules(x);if(A){y.addRule(x,u,qx.bom.element.Cursor.compile(A).replace(o,h)+j);}
;}
}),_applyNativeContextMenu:function(C,B){if(C){this.removeListener(i,this._onNativeContextMenu,this,true);}
else {this.addListener(i,this._onNativeContextMenu,this,true);}
;}
,_onNativeContextMenu:function(e){if(e.getTarget().getNativeContextMenu()){return;}
;e.preventDefault();}
,__mh:function(e){if(e.getKeyIdentifier()!==m){return;}
;var E=e.getTarget();var D=qx.ui.core.FocusHandler.getInstance();if(!D.isFocused(E)){return;}
;var F=E.getContentElement().getNodeName();if(F===k||F===s){return;}
;e.preventDefault();}
,_applyNativeHelp:function(H,G){if(qx.core.Environment.get(p)){if(G===false){qx.bom.Event.removeNativeListener(document,g,(function(){return false;}
));}
;if(H===false){qx.bom.Event.addNativeListener(document,g,(function(){return false;}
));}
;}
;}
},destruct:function(){this.__mg=null;}
,defer:function(I,J){qx.ui.core.MChildrenHandling.remap(J);}
});}
)();
(function(){var a="keypress",b="focusout",c="__mi",d="activate",f="Tab",g="singleton",h="deactivate",j="focusin",k="qx.ui.core.FocusHandler";qx.Class.define(k,{extend:qx.core.Object,type:g,construct:function(){qx.core.Object.call(this);this.__mi={};}
,members:{__mi:null,__mj:null,__mk:null,__ml:null,connectTo:function(m){m.addListener(a,this.__hV,this);m.addListener(j,this._onFocusIn,this,true);m.addListener(b,this._onFocusOut,this,true);m.addListener(d,this._onActivate,this,true);m.addListener(h,this._onDeactivate,this,true);}
,addRoot:function(n){this.__mi[n.$$hash]=n;}
,removeRoot:function(o){delete this.__mi[o.$$hash];}
,getActiveWidget:function(){return this.__mj;}
,isActive:function(p){return this.__mj==p;}
,getFocusedWidget:function(){return this.__mk;}
,isFocused:function(q){return this.__mk==q;}
,isFocusRoot:function(r){return !!this.__mi[r.$$hash];}
,_onActivate:function(e){var t=e.getTarget();this.__mj=t;var s=this.__mm(t);if(s!=this.__ml){this.__ml=s;}
;}
,_onDeactivate:function(e){var u=e.getTarget();if(this.__mj==u){this.__mj=null;}
;}
,_onFocusIn:function(e){var v=e.getTarget();if(v!=this.__mk){this.__mk=v;v.visualizeFocus();}
;}
,_onFocusOut:function(e){var w=e.getTarget();if(w==this.__mk){this.__mk=null;w.visualizeBlur();}
;}
,__hV:function(e){if(e.getKeyIdentifier()!=f){return;}
;if(!this.__ml){return;}
;e.stopPropagation();e.preventDefault();var x=this.__mk;if(!e.isShiftPressed()){var y=x?this.__mq(x):this.__mo();}
else {var y=x?this.__mr(x):this.__mp();}
;if(y){y.tabFocus();}
;}
,__mm:function(z){var A=this.__mi;while(z){if(A[z.$$hash]){return z;}
;z=z.getLayoutParent();}
;return null;}
,__mn:function(I,H){if(I===H){return 0;}
;var C=I.getTabIndex()||0;var B=H.getTabIndex()||0;if(C!=B){return C-B;}
;var J=I.getContentElement().getDomElement();var G=H.getContentElement().getDomElement();var F=qx.bom.element.Location;var E=F.get(J);var D=F.get(G);if(E.top!=D.top){return E.top-D.top;}
;if(E.left!=D.left){return E.left-D.left;}
;var K=I.getZIndex();var L=H.getZIndex();if(K!=L){return K-L;}
;return 0;}
,__mo:function(){return this.__mu(this.__ml,null);}
,__mp:function(){return this.__mv(this.__ml,null);}
,__mq:function(M){var N=this.__ml;if(N==M){return this.__mo();}
;while(M&&M.getAnonymous()){M=M.getLayoutParent();}
;if(M==null){return [];}
;var O=[];this.__ms(N,M,O);O.sort(this.__mn);var P=O.length;return P>0?O[0]:this.__mo();}
,__mr:function(Q){var R=this.__ml;if(R==Q){return this.__mp();}
;while(Q&&Q.getAnonymous()){Q=Q.getLayoutParent();}
;if(Q==null){return [];}
;var S=[];this.__mt(R,Q,S);S.sort(this.__mn);var T=S.length;return T>0?S[T-1]:this.__mp();}
,__ms:function(parent,U,V){var X=parent.getLayoutChildren();var W;for(var i=0,l=X.length;i<l;i++ ){W=X[i];if(!(W instanceof qx.ui.core.Widget)){continue;}
;if(!this.isFocusRoot(W)&&W.isEnabled()&&W.isVisible()){if(W.isTabable()&&this.__mn(U,W)<0){V.push(W);}
;this.__ms(W,U,V);}
;}
;}
,__mt:function(parent,Y,ba){var bc=parent.getLayoutChildren();var bb;for(var i=0,l=bc.length;i<l;i++ ){bb=bc[i];if(!(bb instanceof qx.ui.core.Widget)){continue;}
;if(!this.isFocusRoot(bb)&&bb.isEnabled()&&bb.isVisible()){if(bb.isTabable()&&this.__mn(Y,bb)>0){ba.push(bb);}
;this.__mt(bb,Y,ba);}
;}
;}
,__mu:function(parent,bd){var bf=parent.getLayoutChildren();var be;for(var i=0,l=bf.length;i<l;i++ ){be=bf[i];if(!(be instanceof qx.ui.core.Widget)){continue;}
;if(!this.isFocusRoot(be)&&be.isEnabled()&&be.isVisible()){if(be.isTabable()){if(bd==null||this.__mn(be,bd)<0){bd=be;}
;}
;bd=this.__mu(be,bd);}
;}
;return bd;}
,__mv:function(parent,bg){var bi=parent.getLayoutChildren();var bh;for(var i=0,l=bi.length;i<l;i++ ){bh=bi[i];if(!(bh instanceof qx.ui.core.Widget)){continue;}
;if(!this.isFocusRoot(bh)&&bh.isEnabled()&&bh.isVisible()){if(bh.isTabable()){if(bg==null||this.__mn(bh,bg)>0){bg=bh;}
;}
;bg=this.__mv(bh,bg);}
;}
;return bg;}
},destruct:function(){this._disposeMap(c);this.__mk=this.__mj=this.__ml=null;}
});}
)();
(function(){var a="touchmove",b="os.name",c="-webkit-overflow-scrolling",d="touch",f="paddingLeft",g="div",h="100%",i="The root widget does not support 'left', or 'top' paddings!",j="0px",k="The application could not be started due to a missing body tag in the HTML file!",l="ios",m="overflowY",n="resize",o="",p="$$widget",q="paddingTop",r="engine.name",s="none",t="webkit",u="-webkit-backface-visibility",v="touch-action",w="qx.ui.root.Application",x="hidden",y="tap",z="overflowX",A="absolute";qx.Class.define(w,{extend:qx.ui.root.Abstract,construct:function(B){this.__cz=qx.dom.Node.getWindow(B);this.__mw=B;qx.ui.root.Abstract.call(this);qx.event.Registration.addListener(this.__cz,n,this._onResize,this);this._setLayout(new qx.ui.layout.Canvas());qx.ui.core.queue.Layout.add(this);qx.ui.core.FocusHandler.getInstance().connectTo(this);this.getContentElement().disableScrolling();this.getContentElement().setStyle(u,x);this.addListener(a,this.__mx,this);if(qx.core.Environment.get(b)==l){this.getContentElement().addListener(y,function(e){var C=qx.ui.core.Widget.getWidgetByElement(e.getTarget());while(C&&!C.isFocusable()){C=C.getLayoutParent();}
;if(C&&C.isFocusable()){C.getContentElement().focus();}
;}
,this,true);}
;}
,members:{__cz:null,__mw:null,_createContentElement:function(){var D=this.__mw;if((qx.core.Environment.get(r)==t)){if(!D.body){alert(k);}
;}
;var H=D.documentElement.style;var E=D.body.style;H.overflow=E.overflow=x;H.padding=H.margin=E.padding=E.margin=j;H.width=H.height=E.width=E.height=h;var G=D.createElement(g);D.body.appendChild(G);var F=new qx.html.Root(G);F.setStyles({"position":A,"overflowX":x,"overflowY":x});F.setAttribute(p,this.toHashCode());return F;}
,_onResize:function(e){qx.ui.core.queue.Layout.add(this);if(qx.ui.popup&&qx.ui.popup.Manager){qx.ui.popup.Manager.getInstance().hideAll();}
;if(qx.ui.menu&&qx.ui.menu.Manager){qx.ui.menu.Manager.getInstance().hideAll();}
;}
,_computeSizeHint:function(){var I=qx.bom.Viewport.getWidth(this.__cz);var J=qx.bom.Viewport.getHeight(this.__cz);return {minWidth:I,width:I,maxWidth:I,minHeight:J,height:J,maxHeight:J};}
,_applyPadding:function(L,K,name){if(L&&(name==q||name==f)){throw new Error(i);}
;qx.ui.root.Abstract.prototype._applyPadding.call(this,L,K,name);}
,__mx:function(e){var M=e.getOriginalTarget();while(M&&M.style){var Q=qx.bom.element.Style.get(M,v)!==s&&qx.bom.element.Style.get(M,v)!==o;var P=qx.bom.element.Style.get(M,c)===d;var O=qx.bom.element.Style.get(M,z)!=x;var N=qx.bom.element.Style.get(M,m)!=x;if(Q||P||N||O){return;}
;M=M.parentNode;}
;e.preventDefault();}
},destruct:function(){this.__cz=this.__mw=null;}
});}
)();
(function(){var a="qx.ui.layout.Canvas",b="number",c="Boolean";qx.Class.define(a,{extend:qx.ui.layout.Abstract,properties:{desktop:{check:c,init:false}},members:{verifyLayoutProperty:null,renderLayout:function(g,j,m){var s=this._getLayoutChildren();var d,u,r;var f,top,e,h,n,k;var q,p,t,o;for(var i=0,l=s.length;i<l;i++ ){d=s[i];u=d.getSizeHint();r=d.getLayoutProperties();q=d.getMarginTop();p=d.getMarginRight();t=d.getMarginBottom();o=d.getMarginLeft();f=r.left!=null?r.left:r.edge;if(qx.lang.Type.isString(f)){f=Math.round(parseFloat(f)*g/100);}
;e=r.right!=null?r.right:r.edge;if(qx.lang.Type.isString(e)){e=Math.round(parseFloat(e)*g/100);}
;top=r.top!=null?r.top:r.edge;if(qx.lang.Type.isString(top)){top=Math.round(parseFloat(top)*j/100);}
;h=r.bottom!=null?r.bottom:r.edge;if(qx.lang.Type.isString(h)){h=Math.round(parseFloat(h)*j/100);}
;if(f!=null&&e!=null){n=g-f-e-o-p;if(n<u.minWidth){n=u.minWidth;}
else if(n>u.maxWidth){n=u.maxWidth;}
;f+=o;}
else {n=r.width;if(n==null){n=u.width;}
else {n=Math.round(parseFloat(n)*g/100);if(n<u.minWidth){n=u.minWidth;}
else if(n>u.maxWidth){n=u.maxWidth;}
;}
;if(e!=null){f=g-n-e-p-o;}
else if(f==null){f=o;}
else {f+=o;}
;}
;if(top!=null&&h!=null){k=j-top-h-q-t;if(k<u.minHeight){k=u.minHeight;}
else if(k>u.maxHeight){k=u.maxHeight;}
;top+=q;}
else {k=r.height;if(k==null){k=u.height;}
else {k=Math.round(parseFloat(k)*j/100);if(k<u.minHeight){k=u.minHeight;}
else if(k>u.maxHeight){k=u.maxHeight;}
;}
;if(h!=null){top=j-k-h-t-q;}
else if(top==null){top=q;}
else {top+=q;}
;}
;f+=m.left;top+=m.top;d.renderLayout(f,top,n,k);}
;}
,_computeSizeHint:function(){var M=0,y=0;var J=0,I=0;var H,v;var E,C;var L=this._getLayoutChildren();var w,B,z;var K=this.isDesktop();var A,top,x,D;for(var i=0,l=L.length;i<l;i++ ){w=L[i];B=w.getLayoutProperties();z=w.getSizeHint();var G=w.getMarginLeft()+w.getMarginRight();var F=w.getMarginTop()+w.getMarginBottom();H=z.width+G;v=z.minWidth+G;A=B.left!=null?B.left:B.edge;if(A&&typeof A===b){H+=A;v+=A;}
;x=B.right!=null?B.right:B.edge;if(x&&typeof x===b){H+=x;v+=x;}
;M=Math.max(M,H);y=K?0:Math.max(y,v);E=z.height+F;C=z.minHeight+F;top=B.top!=null?B.top:B.edge;if(top&&typeof top===b){E+=top;C+=top;}
;D=B.bottom!=null?B.bottom:B.edge;if(D&&typeof D===b){E+=D;C+=D;}
;J=Math.max(J,E);I=K?0:Math.max(I,C);}
;return {width:M,minWidth:y,height:J,minHeight:I};}
}});}
)();
(function(){var a="qx.html.Root";qx.Class.define(a,{extend:qx.html.Element,construct:function(b){qx.html.Element.call(this);if(b!=null){this.useElement(b);}
;}
,members:{useElement:function(c){qx.html.Element.prototype.useElement.call(this,c);this.setRoot(true);qx.html.Element._modified[this.$$hash]=this;}
}});}
)();
(function(){var a="qx.dev.unit.TestSuite",b="__unknown_class__",c="Stack trace: ",d="error",f="\n",g="qx.dev.unit.MTestLoader",h="' had an error: ",k=" - ",l="The test '",m="failure",n="' failed: ",o="Test '";qx.Mixin.define(g,{properties:{suite:{check:a,nullable:true,init:null}},members:{_getClassNameFromUrl:function(){var q=window.location.search;var p=q.match(/[\?&]testclass=([A-Za-z0-9_\.]+)/);if(p){p=p[1];}
else {p=b;}
;return p;}
,setTestNamespace:function(s){var r=new qx.dev.unit.TestSuite();r.add(s);this.setSuite(r);}
,runJsUnit:function(){var t=new qx.dev.unit.JsUnitTestResult();this.getSuite().run(t);t.exportToJsUnit();}
,runStandAlone:function(){var u=new qx.dev.unit.TestResult();u.addListener(m,function(e){var w=e.getData()[0].exception;var v=e.getData()[0].test;this.error(o+v.getFullName()+n+w.message+k+w.getComment());if(w.getStackTrace){this.error(c+w.getStackTrace().join(f));}
;}
,this);u.addListener(d,function(e){var y=e.getData()[0].exception;var x=e.getData()[0].test;this.error(l+x.getFullName()+h+y,y);}
,this);this.getSuite().run(u);}
,getTestDescriptions:function(){var D=[];var B=this.getSuite().getTestClasses();for(var i=0;i<B.length;i++ ){var C=B[i];var z={};z.classname=C.getName();z.tests=[];var A=C.getTestMethods();for(var j=0;j<A.length;j++ ){z.tests.push(A[j].getName());}
;D.push(z);}
;return qx.lang.Json.stringify(D);}
,runTests:function(F,G,E){var H=this.getSuite().getTestClasses();for(var i=0;i<H.length;i++ ){if(G==H[i].getName()){var I=H[i].getTestMethods();for(var j=0;j<I.length;j++ ){if(E&&I[j].getName()!=E){continue;}
;I[j].run(F);}
;return;}
;}
;}
,runTestsFromNamespace:function(L,J){var K=this.getSuite().getTestClasses();for(var i=0;i<K.length;i++ ){if(K[i].getName().indexOf(J)==0){K[i].run(L);}
;}
;}
}});}
)();
(function(){var a="qx.dev.unit.AbstractTestSuite",b="abstract",c="_tests";qx.Class.define(a,{extend:qx.core.Object,type:b,construct:function(){qx.core.Object.call(this);this._tests=[];}
,members:{_tests:null,addTestFunction:function(name,d){this._tests.push(new qx.dev.unit.TestFunction(null,name,d));}
,addTestMethod:function(e,f){this._tests.push(new qx.dev.unit.TestFunction(e,f));}
,addFail:function(h,g){this.addTestFunction(h,function(){this.fail(g);}
);}
,run:function(j){for(var i=0;i<this._tests.length;i++ ){(this._tests[i]).run(j);}
;}
,getTestMethods:function(){var l=[];for(var i=0;i<this._tests.length;i++ ){var k=this._tests[i];if(k instanceof qx.dev.unit.TestFunction){l.push(k);}
;}
;return l;}
},destruct:function(){this._disposeArray(c);}
});}
)();
(function(){var a="qx.dev.unit.TestFunction",b="Function",c="",d=":",e="qx.dev.unit.TestCase",f="String";qx.Class.define(a,{extend:qx.core.Object,construct:function(g,i,h){if(h){this.setTestFunction(h);}
;if(g){this.setClassName(g.classname);this.setTestClass(g);}
;this.setName(i);}
,properties:{testFunction:{check:b},name:{check:f},className:{check:f,init:c},testClass:{check:e,init:null}},members:{run:function(k){var j=this.getTestClass();var m=this.getName();var l=this;k.run(this,function(){j.setTestFunc(l);j.setTestResult(k);try{j[m]();}
catch(n){throw n;}
;}
);}
,setUp:function(){var o=this.getTestClass();if(qx.lang.Type.isFunction(o.setUp)){o.setUp();}
;}
,tearDown:function(){var p=this.getTestClass();if(qx.lang.Type.isFunction(p.tearDown)){p.tearDown();}
;}
,getFullName:function(){return [this.getClassName(),this.getName()].join(d);}
}});}
)();
(function(){var a="'!",b="qx.dev.unit.TestSuite",c="' is undefined!",d="abstract",e="existsCheck",f="Unknown test class '",g="The class/namespace '";qx.Class.define(b,{extend:qx.dev.unit.AbstractTestSuite,construct:function(h){qx.dev.unit.AbstractTestSuite.call(this);this._tests=[];if(h){this.add(h);}
;}
,members:{add:function(j){if(qx.lang.Type.isString(j)){var k=window.eval(j);if(!k){this.addFail(j,g+j+c);}
;j=k;}
;if(qx.lang.Type.isFunction(j)){this.addTestClass(j);}
else if(qx.lang.Type.isObject(j)){this.addTestNamespace(j);}
else {this.addFail(e,f+j+a);return;}
;}
,addTestNamespace:function(l){if(qx.lang.Type.isFunction(l)&&l.classname){if(qx.Class.isSubClassOf(l,qx.dev.unit.TestCase)){if(l.$$classtype!==d){this.addTestClass(l);}
;return;}
;}
else if(qx.lang.Type.isObject(l)&&!(l instanceof Array)){for(var m in l){this.addTestNamespace(l[m]);}
;}
;}
,addTestClass:function(n){this._tests.push(new qx.dev.unit.TestClass(n));}
,getTestClasses:function(){var p=[];for(var i=0;i<this._tests.length;i++ ){var o=this._tests[i];if(o instanceof qx.dev.unit.TestClass){p.push(o);}
;}
;return p;}
}});}
)();
(function(){var a="qx.core.MAssert";qx.Mixin.define(a,{members:{assert:function(c,b){qx.core.Assert.assert(c,b);}
,fail:function(d,e){qx.core.Assert.fail(d,e);}
,assertTrue:function(g,f){qx.core.Assert.assertTrue(g,f);}
,assertFalse:function(i,h){qx.core.Assert.assertFalse(i,h);}
,assertEquals:function(j,k,l){qx.core.Assert.assertEquals(j,k,l);}
,assertNotEquals:function(m,n,o){qx.core.Assert.assertNotEquals(m,n,o);}
,assertIdentical:function(p,q,r){qx.core.Assert.assertIdentical(p,q,r);}
,assertNotIdentical:function(s,t,u){qx.core.Assert.assertNotIdentical(s,t,u);}
,assertNotUndefined:function(w,v){qx.core.Assert.assertNotUndefined(w,v);}
,assertUndefined:function(y,x){qx.core.Assert.assertUndefined(y,x);}
,assertNotNull:function(A,z){qx.core.Assert.assertNotNull(A,z);}
,assertNull:function(C,B){qx.core.Assert.assertNull(C,B);}
,assertJsonEquals:function(D,E,F){qx.core.Assert.assertJsonEquals(D,E,F);}
,assertMatch:function(I,H,G){qx.core.Assert.assertMatch(I,H,G);}
,assertArgumentsCount:function(L,K,M,J){qx.core.Assert.assertArgumentsCount(L,K,M,J);}
,assertEventFired:function(P,event,Q,N,O){qx.core.Assert.assertEventFired(P,event,Q,N,O);}
,assertEventNotFired:function(T,event,R,S){qx.core.Assert.assertEventNotFired(T,event,R,S);}
,assertException:function(V,W,X,U){qx.core.Assert.assertException(V,W,X,U);}
,assertInArray:function(bb,ba,Y){qx.core.Assert.assertInArray(bb,ba,Y);}
,assertArrayEquals:function(bc,bd,be){qx.core.Assert.assertArrayEquals(bc,bd,be);}
,assertKeyInMap:function(bh,bg,bf){qx.core.Assert.assertKeyInMap(bh,bg,bf);}
,assertFunction:function(bj,bi){qx.core.Assert.assertFunction(bj,bi);}
,assertString:function(bl,bk){qx.core.Assert.assertString(bl,bk);}
,assertBoolean:function(bn,bm){qx.core.Assert.assertBoolean(bn,bm);}
,assertNumber:function(bp,bo){qx.core.Assert.assertNumber(bp,bo);}
,assertPositiveNumber:function(br,bq){qx.core.Assert.assertPositiveNumber(br,bq);}
,assertInteger:function(bt,bs){qx.core.Assert.assertInteger(bt,bs);}
,assertPositiveInteger:function(bv,bu){qx.core.Assert.assertPositiveInteger(bv,bu);}
,assertInRange:function(by,bz,bx,bw){qx.core.Assert.assertInRange(by,bz,bx,bw);}
,assertObject:function(bB,bA){qx.core.Assert.assertObject(bB,bA);}
,assertArray:function(bD,bC){qx.core.Assert.assertArray(bD,bC);}
,assertMap:function(bF,bE){qx.core.Assert.assertMap(bF,bE);}
,assertRegExp:function(bH,bG){qx.core.Assert.assertRegExp(bH,bG);}
,assertType:function(bK,bJ,bI){qx.core.Assert.assertType(bK,bJ,bI);}
,assertInstance:function(bM,bN,bL){qx.core.Assert.assertInstance(bM,bN,bL);}
,assertInterface:function(bQ,bP,bO){qx.core.Assert.assertInterface(bQ,bP,bO);}
,assertCssColor:function(bR,bT,bS){qx.core.Assert.assertCssColor(bR,bT,bS);}
,assertElement:function(bV,bU){qx.core.Assert.assertElement(bV,bU);}
,assertQxObject:function(bX,bW){qx.core.Assert.assertQxObject(bX,bW);}
,assertQxWidget:function(ca,bY){qx.core.Assert.assertQxWidget(ca,bY);}
}});}
)();
(function(){var a="qx.dev.unit.TestCase",b="Called skip()",c="qx.event.type.Data";qx.Class.define(a,{extend:qx.core.Object,include:[qx.core.MAssert],events:{assertionFailed:c},properties:{testResult:{init:null},testFunc:{init:null}},members:{isDebugOn:function(){return false;}
,wait:function(d,e,f){throw new qx.dev.unit.AsyncWrapper(d,e,f);}
,resume:function(g,self){return this.getTestResult().run(this.getTestFunc(),g||(function(){}
),self||this,true);}
,resumeHandler:function(h,self){{}
;var i=h;var j=this;return function(){var k=qx.lang.Array.fromArguments(arguments);return j.resume(i.bind.apply(i,[self||this].concat(k)),self);}
;}
,skip:function(l){throw new qx.dev.unit.RequirementError(null,l||b);}
}});}
)();
(function(){var a="Function",b="qx.dev.unit.AsyncWrapper",c="Integer",d="Object";qx.Class.define(b,{extend:qx.core.Object,construct:function(e,g,f){for(var i=0;i<2;i++ ){if(qx.lang.Type.isFunction(arguments[i])){this.setDeferredFunction(arguments[i]);}
else if(qx.lang.Type.isNumber(arguments[i])){this.setDelay(arguments[i]);}
;}
;if(f){this.setContext(f);}
;}
,properties:{deferredFunction:{check:a,init:false},context:{check:d,init:null},delay:{check:c,nullable:false,init:5000}}});}
)();
(function(){var a=": ",b="qx.dev.unit.RequirementError",c="Requirement not met";qx.Class.define(b,{extend:Error,construct:function(d,f){this.__mK=f||c;this.__mL=d;var e=Error.call(this,this.__mK);if(e.stack){this.stack=e.stack;}
;if(e.stacktrace){this.stacktrace=e.stacktrace;}
;}
,members:{__mK:null,__mL:null,getRequirement:function(){return this.__mL;}
,toString:function(){var g=this.__mK;if(this.__mL){g+=a+this.__mL;}
;return g;}
}});}
)();
(function(){var a="existsCheck",b="test",c="Unknown test class!",d="Sub class check.",e="String",f="'is not a sub class of 'qx.dev.unit.TestCase'",g="The test class '",h="qx.dev.unit.TestClass";qx.Class.define(h,{extend:qx.dev.unit.AbstractTestSuite,construct:function(k){qx.dev.unit.AbstractTestSuite.call(this);if(!k){this.addFail(a,c);return;}
;if(!qx.Class.isSubClassOf(k,qx.dev.unit.TestCase)){this.addFail(d,g+k.classname+f);return;}
;var l=k.prototype;var i=new k;for(var j in l){if(qx.lang.Type.isFunction(l[j])&&j.indexOf(b)==0){this.addTestMethod(i,j);}
;}
;this.setName(k.classname);}
,properties:{name:{check:e}}});}
)();
(function(){var a="Error in asynchronous test",b=": ",c="qx.debug.dispose",d="testrunner.unit",e="assertionFailed",f="skip",g="Asynchronous Test Error",h="tearDown",j="qx.dev.unit.RequirementError",k="setUp failed",m="endTest",n="wait",o="tearDown failed: ",p="qx.dev.unit.TestResult",q="error",r="failure",s="resume() called before wait()",t="qx.core.AssertionError",u="qx.event.type.Data",v="Undisposed object in ",w="setUp failed: ",x="tearDown failed",y="]",z="endMeasurement",A="[",B="Timeout reached before resume() was called.",C="failed",D="\n",E="startTest";qx.Class.define(p,{extend:qx.core.Object,events:{startTest:u,endTest:u,error:u,failure:u,wait:u,skip:u,endMeasurement:u},statics:{run:function(H,F,G){H.run(F,G);}
},members:{_timeout:null,run:function(O,K,self,L){if(!this._timeout){this._timeout={};}
;var M=O.getTestClass();if(!M.hasListener(e)){M.addListener(e,function(T){var U=[{exception:T.getData(),test:O}];this.fireDataEvent(r,U);}
,this);}
;if(L&&!this._timeout[O.getFullName()]){this._timeout[O.getFullName()]=C;var N=new qx.type.BaseError(a,s);this._createError(r,[N],O);this.fireDataEvent(m,O);return undefined;}
;this.fireDataEvent(E,O);if(qx.core.Environment.get(c)){qx.dev.Debug.startDisposeProfiling();}
;if(this._timeout[O.getFullName()]){if(this._timeout[O.getFullName()]!==C){this._timeout[O.getFullName()].stop();this._timeout[O.getFullName()].dispose();}
;delete this._timeout[O.getFullName()];}
else {try{O.setUp();}
catch(V){try{this.tearDown(O);}
catch(W){}
;if(V.classname==j){this._createError(f,[V],O);this.fireDataEvent(m,O);}
else {if(V instanceof qx.type.BaseError&&V.message==qx.type.BaseError.DEFAULTMESSAGE){V.message=k;}
else {V.message=w+V.message;}
;this._createError(q,[V],O);this.fireDataEvent(m,O);}
;return undefined;}
;}
;var I;try{I=K.call(self||window);}
catch(X){var Q=true;if(X instanceof qx.dev.unit.AsyncWrapper){if(this._timeout[O.getFullName()]){return;}
;if(X.getDelay()){var J=this;var S=function(){throw new qx.core.AssertionError(g,B);}
;var R=(X.getDeferredFunction()?X.getDeferredFunction():S);var P=(X.getContext()?X.getContext():window);this._timeout[O.getFullName()]=qx.event.Timer.once(function(){this.run(O,R,P);}
,J,X.getDelay());this.fireDataEvent(n,O);}
;}
else if(X instanceof qx.dev.unit.MeasurementResult){Q=false;this._createError(z,[X],O);}
else {try{this.tearDown(O);}
catch(Y){}
;if(X.classname==t){this._createError(r,[X],O);this.fireDataEvent(m,O);}
else if(X.classname==j){this._createError(f,[X],O);this.fireDataEvent(m,O);}
else {this._createError(q,[X],O);this.fireDataEvent(m,O);}
;}
;}
;if(!Q){try{this.tearDown(O);this.fireDataEvent(m,O);}
catch(ba){if(ba instanceof qx.type.BaseError&&ba.message==qx.type.BaseError.DEFAULTMESSAGE){ba.message=x;}
else {ba.message=o+ba.message;}
;this._createError(q,[ba],O);this.fireDataEvent(m,O);}
;}
;return I;}
,_createError:function(bc,bd,be){var bb=[];for(var i=0,l=bd.length;i<l;i++ ){bb.push({exception:bd[i],test:be});}
;this.fireDataEvent(bc,bb);}
,__mM:function(bf){bf._addedListeners=[];if(!qx.event.Registration.addListenerOriginal){qx.event.Registration.addListenerOriginal=qx.event.Registration.addListener;qx.event.Registration.addListener=function(bh,bk,bj,self,bg){var bi=qx.event.Registration.addListenerOriginal(bh,bk,bj,self,bg);var bl=true;if((bh.classname&&bh.classname.indexOf(d)==0)||(self&&self.classname&&self.classname.indexOf(d)==0)){bl=false;}
;if(bl){bf._addedListeners.push([bh,bi]);}
;return bi;}
;}
;}
,__mN:function(bn){if(bn._addedListeners){var bo=bn._addedListeners;for(var i=0,l=bo.length;i<l;i++ ){var bm=bo[i][0];var bp=bo[i][1];try{qx.event.Registration.removeListenerById(bm,bp);}
catch(bq){}
;}
;}
;}
,tearDown:function(bw){bw.tearDown();var bv=bw.getTestClass();var bs=h+qx.lang.String.firstUp(bw.getName());if(bv[bs]){bv[bs]();}
;if(qx.core.Environment.get(c)&&qx.dev.Debug.disposeProfilingActive){var bu=bw.getFullName();var bt=qx.dev.Debug.stopDisposeProfiling();for(var i=0;i<bt.length;i++ ){var br;if(bt[i].stackTrace){br=bt[i].stackTrace.join(D);}
;window.top.qx.log.Logger.warn(v+bu+b+bt[i].object.classname+A+bt[i].object.toHashCode()+y+D+br);}
;}
;}
},destruct:function(){this._timeout=null;}
});}
)();
(function(){var a="-",b=") ***",c="qx.debug.dispose",d="\r\n",f="px;'>",g="): ",h="function",k="</span><br>",l="*** EXCEPTION (",m="============================================================",n="Object",o="<br>",p="null",q="Array",r="Call ",s="members",t=":",u=": ",v="statics",w="get",x="construct",y="",z="qx.dev.Debug",A=": EXCEPTION expanding property",B=".startDisposeProfiling first.",C="\n",D="*** TOO MUCH RECURSION: not displaying ***",E="Object, count=",F="  ",G="<span style='padding-left:",H=" ",I="------------------------------------------------------------",J="Array, length=",K="undefined",L="index(",M="object";qx.Class.define(z,{statics:{disposeProfilingActive:false,debugObject:function(N,P,O){qx.log.Logger.debug(this,qx.dev.Debug.debugObjectToString(N,P,O,false));}
,debugObjectToString:function(S,T,ba,U){if(!ba){ba=10;}
;var Y=(U?k:C);var V=function(bc){var bb;if(!U){bb=y;for(var i=0;i<bc;i++ ){bb+=F;}
;}
else {bb=G+(bc*8)+f;}
;return bb;}
;var X=y;var R=function(bf,bg,bd){if(bg>bd){X+=(V(bg)+D+Y);return;}
;if(typeof (bf)!=M){X+=V(bg)+bf+Y;return;}
;for(var be in bf){if(typeof (bf[be])==M){try{if(bf[be] instanceof Array){X+=V(bg)+be+u+q+Y;}
else if(bf[be]===null){X+=V(bg)+be+u+p+Y;continue;}
else if(bf[be]===undefined){X+=V(bg)+be+u+K+Y;continue;}
else {X+=V(bg)+be+u+n+Y;}
;R(bf[be],bg+1,bd);}
catch(e){X+=V(bg)+be+A+Y;}
;}
else {X+=V(bg)+be+u+bf[be]+Y;}
;}
;}
;if(T){X+=V(0)+T+Y;}
;if(S instanceof Array){X+=V(0)+J+S.length+t+Y;}
else if(typeof (S)==M){var Q=0;for(var W in S){Q++ ;}
;X+=V(0)+E+Q+t+Y;}
;X+=V(0)+I+Y;try{R(S,0,ba);}
catch(bh){X+=V(0)+l+bh+b+Y;}
;X+=V(0)+m+Y;return X;}
,getFunctionName:function(bj,bi){var bk=bj.self;if(!bk){return null;}
;while(bj.wrapper){bj=bj.wrapper;}
;switch(bi){case x:return bj==bk?x:null;case s:return qx.lang.Object.getKeyFromValue(bk,bj);case v:return qx.lang.Object.getKeyFromValue(bk.prototype,bj);default:if(bj==bk){return x;}
;return (qx.lang.Object.getKeyFromValue(bk.prototype,bj)||qx.lang.Object.getKeyFromValue(bk,bj)||null);};}
,debugProperties:function(bq,br,bo,bl){if(br==null){br=10;}
;if(bl==null){bl=1;}
;var bn=y;bo?bn=o:bn=d;var bm=y;if(qx.lang.Type.isNumber(bq)||qx.lang.Type.isString(bq)||qx.lang.Type.isBoolean(bq)||bq==null||br<=0){return bq;}
else if(qx.Class.hasInterface(bq.constructor,qx.data.IListData)){for(var i=0;i<bq.length;i++ ){for(var j=0;j<bl;j++ ){bm+=a;}
;bm+=L+i+g+this.debugProperties(bq.getItem(i),br-1,bo,bl+1)+bn;}
;return bm+bn;}
else if(bq.constructor!=null){var bs=bq.constructor.$$properties;for(var bp in bs){bm+=bn;for(var j=0;j<bl;j++ ){bm+=a;}
;bm+=H+bp+u+this.debugProperties(bq[w+qx.lang.String.firstUp(bp)](),br-1,bo,bl+1);}
;return bm;}
;return y;}
,startDisposeProfiling:qx.core.Environment.select(c,{"true":function(){this.disposeProfilingActive=true;this.__mO=qx.core.ObjectRegistry.getNextHash();}
,"default":(function(){}
)}),stopDisposeProfiling:qx.core.Environment.select(c,{"true":function(bv){if(!this.__mO){qx.log.Logger.error(r+this.classname+B);return [];}
;this.disposeProfilingActive=false;var bu=[];while(!qx.ui.core.queue.Dispose.isEmpty()){qx.ui.core.queue.Dispose.flush();}
;var bw=qx.core.ObjectRegistry.getNextHash();var by=qx.core.ObjectRegistry.getPostId();var bz=qx.core.ObjectRegistry.getStackTraces();for(var bx=this.__mO;bx<bw;bx++ ){var bt=qx.core.ObjectRegistry.fromHashCode(bx+by);if(bt&&bt.isDisposed&&!bt.isDisposed()){if(bv&&typeof bv==h&&!bv(bt)){continue;}
;if(bt.constructor.$$instance===bt){continue;}
;if(qx.Class.implementsInterface(bt,qx.event.IEventHandler)){continue;}
;if(bt.$$pooled){continue;}
;if(qx.Class.implementsInterface(bt,qx.ui.decoration.IDecorator)&&qx.theme.manager.Decoration.getInstance().isCached(bt)){continue;}
;if(bt.$$ignoreDisposeWarning){continue;}
;if(bt instanceof qx.bom.Font&&qx.theme.manager.Font.getInstance().isDynamic(bt)){continue;}
;bu.push({object:bt,stackTrace:bz[bx+by]?bz[bx+by]:null});}
;}
;delete this.__mO;return bu;}
,"default":(function(){}
)})}});}
)();
(function(){var a="Iterations: ",b="\n",c="Time: ",d="Render time: ",e="Measured: ",f="ms",g="qx.dev.unit.MeasurementResult";qx.Class.define(g,{extend:Object,construct:function(i,k,j,h){this.__mK=i;this.__mP=k;this.__mQ=j;this.__mR=h;}
,members:{__mK:null,__mP:null,__mQ:null,__mR:null,getData:function(){return {message:this.__mK,iterations:this.__mP,ownTime:this.__mQ,renderTime:this.__mR};}
,toString:function(){return [e+this.__mK,a+this.__mP,c+this.__mQ+f,d+this.__mR+f].join(b);}
}});}
)();
(function(){var a="$test_",b="_",c="qx.dev.unit.JsUnitTestResult";qx.Class.define(c,{extend:qx.dev.unit.TestResult,construct:function(){qx.dev.unit.TestResult.call(this);this.__mS=[];}
,members:{__mS:null,run:function(d,e){var f=a+d.getFullName().replace(/\W/g,b);this.__mS.push(f);window[f]=e;}
,exportToJsUnit:function(){var self=this;window.exposeTestFunctionNames=function(){return self.__mS;}
;window.isTestPageLoaded=true;}
}});}
)();
(function(){var a="qx.dev.unit.TestLoader",b="__unknown_class__",c='validator.test';qx.Class.define(a,{extend:qx.application.Standalone,include:[qx.dev.unit.MTestLoader],members:{main:function(){qx.application.Standalone.prototype.main.call(this);qx.log.appender.Console;var d=this._getClassNameFromUrl();if(d!==b){this.setTestNamespace(this._getClassNameFromUrl());}
else {var e=c;if(e){this.setTestNamespace(e);}
;}
;if(window.top.jsUnitTestSuite){this.runJsUnit();return;}
;if(window==window.top&&false){this.runStandAlone();}
;}
}});}
)();
(function(){var a='.qxconsole .messages{background:white;height:100%;width:100%;overflow:auto;}',b="Enter",c="px",d='</div>',f="longtap",g='.qxconsole .messages .user-result{background:white}',h='.qxconsole .messages .level-error{background:#FFE2D5}',i="navigationbar",j="div",k="user-command",l='<div class="command">',m="Up",n='.qxconsole .command input:focus{outline:none;}',o='.qxconsole .messages .type-key{color:#565656;font-style:italic}',p="none",q='.qxconsole .messages .type-instance{color:#565656;font-weight:bold}',r='.qxconsole .messages div{padding:0px 4px;}',s='.qxconsole .messages .level-debug{background:white}',t='.qxconsole .messages .type-class{color:#5F3E8A;font-weight:bold}',u="DIV",v='.qxconsole .messages .level-user{background:#E3EFE9}',w='<div class="qxconsole">',x="",y="D",z='.qxconsole .messages .type-map{color:#CC3E8A;font-weight:bold;}',A='.qxconsole .messages .type-string{color:black;font-weight:normal;}',B='.qxconsole .control a{text-decoration:none;color:black;}',C='<div class="messages">',D='.qxconsole .messages .type-boolean{color:#15BC91;font-weight:normal;}',E='<input type="text"/>',F="clear",G='.qxconsole .command input{width:100%;border:0 none;font-family:Consolas,Monaco,monospace;font-size:11px;line-height:1.2;}',H="keypress",I='.qxconsole .messages .type-array{color:#CC3E8A;font-weight:bold;}',J='.qxconsole{z-index:10000;width:600px;height:300px;top:0px;right:0px;position:absolute;border-left:1px solid black;color:black;border-bottom:1px solid black;color:black;font-family:Consolas,Monaco,monospace;font-size:11px;line-height:1.2;}',K='.qxconsole .command{background:white;padding:2px 4px;border-top:1px solid black;}',L='.qxconsole .messages .user-command{color:blue}',M="F7",N="qx.log.appender.Console",O='.qxconsole .messages .level-info{background:#DEEDFA}',P="block",Q='.qxconsole .messages .level-warn{background:#FFF7D5}',R='.qxconsole .messages .type-stringify{color:#565656;font-weight:bold}',S='.qxconsole .messages .user-error{background:#FFE2D5}',T='.qxconsole .control{background:#cdcdcd;border-bottom:1px solid black;padding:4px 8px;}',U='<div class="control"><a href="javascript:qx.log.appender.Console.clear()">Clear</a> | <a href="javascript:qx.log.appender.Console.toggle()">Hide</a></div>',V=">>> ",W="Down",X='.qxconsole .messages .type-number{color:#155791;font-weight:normal;}';qx.Class.define(N,{statics:{__mz:null,__co:null,__mA:null,__mB:null,init:function(){var Y=[J,T,B,a,r,L,g,S,s,O,Q,h,v,A,X,D,I,z,o,t,q,R,K,G,n];qx.bom.Stylesheet.createElement(Y.join(x));var bb=[w,U,C,d,l,E,d,d];var bc=document.createElement(u);bc.innerHTML=bb.join(x);var ba=bc.firstChild;document.body.appendChild(bc.firstChild);this.__mz=ba;this.__co=ba.childNodes[1];this.__mA=ba.childNodes[2].firstChild;this.__mE();qx.log.Logger.register(this);qx.core.ObjectRegistry.register(this);}
,dispose:function(){qx.event.Registration.removeListener(document.documentElement,H,this.__hV,this);qx.log.Logger.unregister(this);}
,clear:function(){this.__co.innerHTML=x;}
,process:function(bd){this.__co.appendChild(qx.log.appender.Util.toHtml(bd));this.__mC();}
,__mC:function(){this.__co.scrollTop=this.__co.scrollHeight;}
,__gF:true,toggle:function(){if(!this.__mz){this.init();}
else if(this.__mz.style.display==p){this.show();}
else {this.__mz.style.display=p;}
;}
,show:function(){if(!this.__mz){this.init();}
else {this.__mz.style.display=P;this.__co.scrollTop=this.__co.scrollHeight;}
;}
,__mD:[],execute:function(){var bf=this.__mA.value;if(bf==x){return;}
;if(bf==F){this.clear();return;}
;var be=document.createElement(j);be.innerHTML=qx.log.appender.Util.escapeHTML(V+bf);be.className=k;this.__mD.push(bf);this.__mB=this.__mD.length;this.__co.appendChild(be);this.__mC();try{var bg=window.eval(bf);}
catch(bh){qx.log.Logger.error(bh);}
;if(bg!==undefined){qx.log.Logger.debug(bg);}
;}
,__mE:function(e){this.__co.style.height=(this.__mz.clientHeight-this.__mz.firstChild.offsetHeight-this.__mz.lastChild.offsetHeight)+c;}
,__hV:function(e){if(e instanceof qx.event.type.Tap||e instanceof qx.event.type.Pointer){var bk=e.getTarget();if(bk&&bk.className&&bk.className.indexOf&&bk.className.indexOf(i)!=-1){this.toggle();}
;return;}
;var bj=e.getKeyIdentifier();if((bj==M)||(bj==y&&e.isCtrlPressed())){this.toggle();e.preventDefault();}
;if(!this.__mz){return;}
;if(!qx.dom.Hierarchy.contains(this.__mz,e.getTarget())){return;}
;if(bj==b&&this.__mA.value!=x){this.execute();this.__mA.value=x;}
;if(bj==m||bj==W){this.__mB+=bj==m?-1:1;this.__mB=Math.min(Math.max(0,this.__mB),this.__mD.length);var bi=this.__mD[this.__mB];this.__mA.value=bi||x;this.__mA.select();}
;}
},defer:function(bl){qx.event.Registration.addListener(document.documentElement,H,bl.__hV,bl);qx.event.Registration.addListener(document.documentElement,f,bl.__hV,bl);}
});}
)();
(function(){var a="Use qx.dev.StackTrace.FORMAT_STACKTRACE instead",b="function",c="<span class='object'>",d="]:",e="&gt;",f="<span class='object' title='Object instance with hash code: ",g="FORMAT_STACK",h="string",k="level-",l="0",m="&lt;",n="<span class='offset'>",o="</span> ",p="}",q=":",r="qx.log.appender.Util",s="&amp;",t="&#39;",u="DIV",v="",w="]",x="'>",y="<span>",z="[",A=", ",B="</span>",C="\n",D="&quot;",E="<span class='type-key'>",F="{",G="</span>:<span class='type-",H="</span>: ",I=" ",J="]</span>: ",K="map",L="?",M="<span class='type-";qx.Bootstrap.define(r,{statics:{toHtml:function(V){var X=[];var T,W,O,Q;X.push(n,this.formatOffset(V.offset,6),o);if(V.object){var N=V.win.qx.core.ObjectRegistry.fromHashCode(V.object);if(N){X.push(f+N.$$hash+x,N.classname,z,N.$$hash,J);}
;}
else if(V.clazz){X.push(c+V.clazz.classname,H);}
;var P=V.items;for(var i=0,U=P.length;i<U;i++ ){T=P[i];W=T.text;if(W instanceof Array){var Q=[];for(var j=0,S=W.length;j<S;j++ ){O=W[j];if(typeof O===h){Q.push(y+this.escapeHTML(O)+B);}
else if(O.key){Q.push(E+O.key+G+O.type+x+this.escapeHTML(O.text)+B);}
else {Q.push(M+O.type+x+this.escapeHTML(O.text)+B);}
;}
;X.push(M+T.type+x);if(T.type===K){X.push(F,Q.join(A),p);}
else {X.push(z,Q.join(A),w);}
;X.push(B);}
else {X.push(M+T.type+x+this.escapeHTML(W)+o);}
;}
;var R=document.createElement(u);R.innerHTML=X.join(v);R.className=k+V.level;return R;}
,formatOffset:function(bb,length){var ba=bb.toString();var bc=(length||6)-ba.length;var Y=v;for(var i=0;i<bc;i++ ){Y+=l;}
;return Y+ba;}
,escapeHTML:function(bd){return String(bd).replace(/[<>&"']/g,this.__my);}
,__my:function(bf){var be={"<":m,">":e,"&":s,"'":t,'"':D};return be[bf]||L;}
,toText:function(bg){return this.toTextArray(bg).join(I);}
,toTextArray:function(bn){var bp=[];bp.push(this.formatOffset(bn.offset,6));if(bn.object){var bh=bn.win.qx.core.ObjectRegistry.fromHashCode(bn.object);if(bh){bp.push(bh.classname+z+bh.$$hash+d);}
;}
else if(bn.clazz){bp.push(bn.clazz.classname+q);}
;var bi=bn.items;var bl,bo;for(var i=0,bm=bi.length;i<bm;i++ ){bl=bi[i];bo=bl.text;if(bl.trace&&bl.trace.length>0){if(typeof (this.FORMAT_STACK)==b){qx.log.Logger.deprecatedConstantWarning(qx.log.appender.Util,g,a);bo+=C+this.FORMAT_STACK(bl.trace);}
else {bo+=C+bl.trace;}
;}
;if(bo instanceof Array){var bj=[];for(var j=0,bk=bo.length;j<bk;j++ ){bj.push(bo[j].text);}
;if(bl.type===K){bp.push(F,bj.join(A),p);}
else {bp.push(z,bj.join(A),w);}
;}
else {bp.push(bo);}
;}
;return bp;}
}});}
)();
(function(){var a="testrunner.TestLoader";qx.Class.define(a,{extend:qx.dev.unit.TestLoader,statics:{getInstance:function(){return this.instance;}
},members:{main:function(){testrunner.TestLoader.instance=this;qx.dev.unit.TestLoader.prototype.main.call(this);}
}});}
)();
(function(){var a="",b="Validation Error: Debe ser falso!",c="Debe ser falso!",d="validator.test.unit.constraints.IsFalseTest";qx.Class.define(d,{extend:qx.dev.unit.TestCase,members:{testIsFalse:function(){var e=validator.constraints.IsFalse.validate();e(false);}
,testIsTrue:function(){var f=validator.constraints.IsFalse.validate();this.assertException(function(){f(true);}
,Error,b);}
,testConvertToFalseUndefined:function(){var g=validator.constraints.IsFalse.validate(c);this.assertException(function(){g(undefined);}
,Error,b);}
,testConvertToFalseEmptyString:function(){var h=validator.constraints.IsFalse.validate(c);this.assertException(function(){h(a);}
,Error,b);}
,testConvertToFalseCero:function(){var i=validator.constraints.IsFalse.validate(c);this.assertException(function(){i(0);}
,Error,b);}
,testConvertToFalseNull:function(){var j=validator.constraints.IsFalse.validate(c);this.assertException(function(){j(null);}
,Error,b);}
}});}
)();
(function(){var a="n regular!",b="validator.constraints.Constraint",c="abstract",d="regexp",e="n debe ser una expresi",f='\u00f3',g="El patr",h="Validation Error";qx.Class.define(b,{extend:qx.core.Object,type:c,properties:{_message:{},_pattern:{},_value:{}},members:{validate:function(){if(!this._pattern.test(this._value)){throw new qx.core.ValidationError(h,this._message);}
;}
,setMessage:function(i){this._message=i||this._message;}
,setPattern:function(j){var k=validator.constraints.Type.validate(g+f+e+f+a,d);k(j);this._pattern=j;}
}});}
)();
(function(){var a="__tO",b="function",c="Boolean",d="n regular!",e="RegExp",f="Debe ser una funci",g="Debe ser una expresi",h="__tR",i="__tP",j="string",k="__tU",l='function',m="__tS",n="validator.constraints.Type",o="__tM",p="__tK",q="Debe ser un objeto!",r="mero!",s="Debe ser un string!",t=" no existe!",u="Error",v="__tN",w="Debe ser un error!",x="number",y="n!",z='\u00f3',A="__tQ",B="__tT",C="Debe ser un booleano!",D="boolean",E="Number",F="Debe ser un n",G='\u00fa',H="__tL",I="Debe ser indefinido!",J="undefined",K="El tipo de dato ",L="Debe ser un arreglo!",M="Validation Error";qx.Class.define(n,{extend:validator.constraints.Constraint,properties:{__pY:{}},statics:{validate:function(N,O){return function(P){var Q=new validator.constraints.Type(P);Q.setMessage(N);Q.setType(O);Q.validate();}
;}
,STRING:p,NUMBER:H,UNDEFINED:o,NULL:v,OBJECT:a,BOOLEAN:i,FUNCTION:A,ARRAY:h,REGEXP:m,ERROR:B,DATE:k},construct:function(R){this._value=R;}
,members:{validate:function(){var S;if((typeof this[this.__pY])!==l){throw new qx.core.ValidationError(M,K+this.__pY+t);}
;S=this[this.__pY]();S(this._value);}
,__tg:function(T){var U=this._message;return function(V){if(!T(V)){throw new qx.core.ValidationError(M,U);}
;}
;}
,setType:function(W){this.__pY=W;}
,__tK:function(){this._message=this._message||s;return this.__tg(function(X){return ((typeof X)===j&&Boolean(qx.lang.Type.isString(X)));}
);}
,__tL:function(){this._message=this._message||F+G+r;return this.__tg(function(Y){return (Y!==null&&((qx.Bootstrap.getClass(Y)==E||Y instanceof Number)&&(typeof Y)===x));}
);}
,__tM:function(){this._message=this._message||I;return this.__tg(function(ba){return (typeof ba)===J;}
);}
,__tN:function(){return validator.constraints.IsNull.validate(this._message);}
,__tO:function(){this._message=this._message||q;return this.__tg(qx.lang.Type.isObject);}
,__tP:function(){this._message=this._message||C;return this.__tg(function(bb){return (bb!==null&&(qx.Bootstrap.getClass(bb)==c||bb instanceof Boolean)&&(typeof bb)===D);}
);}
,__tQ:function(){this._message=this._message||f+z+y;return this.__tg(function(bc){return ((typeof bc)===b&&Boolean(qx.lang.Type.isFunction(bc)));}
);}
,__tR:function(){this._message=this._message||L;return this.__tg(qx.lang.Type.isArray);}
,__tS:function(){this._message=this._message||g+z+d;return this.__tg(function(bd){return (qx.Bootstrap.getClass(bd)==e&&bd instanceof RegExp);}
);}
,__tT:function(){this._message=this._message||w;return this.__tg(function(be){return (be!==null&&(qx.Bootstrap.getClass(be)==u||be instanceof Error));}
);}
,__tU:function(){return validator.constraints.Date.validate(this._message);}
}});}
)();
(function(){var a="Debe ser id",b='\u00e9',c="validator.constraints.IdenticalTo",d="ntico a %s!",e="Validation Error";qx.Class.define(c,{extend:validator.constraints.Constraint,properties:{_comparison:{}},statics:{validate:function(g,f){return function(h){var i=new validator.constraints.IdenticalTo(h);i.setMessage(g);i.setComparison(f);i.validate();}
;}
},construct:function(j){this._message=a+b+d;this._value=j;}
,members:{validate:function(){if(this._value!==this._comparison){throw new qx.core.ValidationError(e,this._message.replace(/\%s/g,this._comparison));}
;}
,setComparison:function(k){this._comparison=k;}
}});}
)();
(function(){var a="validator.constraints.IsNull",b="Debe ser nulo!";qx.Class.define(a,{extend:validator.constraints.IdenticalTo,properties:{},statics:{validate:function(c){return function(d){var e=new validator.constraints.IsNull(d);e.setMessage(c);e.validate();}
;}
},construct:function(f){this._message=b;this._value=f;this._comparison=null;}
,members:{}});}
)();
(function(){var a="Debe contener una fecha correcta!",b="Date",c="validator.constraints.Date",d="Validation Error";qx.Class.define(c,{extend:validator.constraints.Constraint,properties:{},statics:{validate:function(e){return function(f){var g=new validator.constraints.Date(f);g.setMessage(e);g.validate();}
;}
},construct:function(h){this._message=a;this._value=h;}
,members:{validate:function(){if(!(this._value!==null&&(qx.Bootstrap.getClass(this._value)==b||this._value instanceof Date))){throw new qx.core.ValidationError(d,this._message);}
;}
}});}
)();
(function(){var a="validator.constraints.IsFalse",b="Debe ser falso!";qx.Class.define(a,{extend:validator.constraints.IdenticalTo,properties:{},statics:{validate:function(c){return function(d){var e=new validator.constraints.IsFalse(d);e.setMessage(c);e.validate();}
;}
},construct:function(f){this._message=b;this._value=f;this._comparison=false;}
,members:{}});}
)();
(function(){var a="user@subdomain",b="mal",c="",d="Validation Error: mal",e="validator.test.unit.constraints.RangeLengthTest",f="user",g="nilmar1";qx.Class.define(e,{extend:qx.dev.unit.TestCase,members:{testLength:function(){var h=new validator.constraints.RangeLength.validate(c,3,7);h(g);}
,testUpLength:function(){var i=new validator.constraints.RangeLength.validate(b,3,7);this.assertException(function(){i(a);}
,Error,d);}
,testDownLength:function(){var j=new validator.constraints.RangeLength.validate(b,13,15);this.assertException(function(){j(f);}
,Error,d);}
}});}
)();
(function(){var a="validator.constraints.RangeLength";qx.Class.define(a,{extend:validator.constraints.Constraint,properties:{__th:{},__ti:{}},statics:{validate:function(c,b,d){return function(e){var f=new validator.constraints.RangeLength(e);f.setMessage(c);f.setMinLength(b);f.setMaxLength(d);f.validate();}
;}
},construct:function(g){this._value=g;this.__th=new validator.constraints.MinLength(this._value);this.__ti=new validator.constraints.MaxLength(this._value);}
,members:{validate:function(){this.__th.validate();this.__ti.validate();}
,setMinLength:function(h){this.__th.setMinLength(h);}
,setMaxLength:function(i){this.__ti.setMaxLength(i);}
,setMessage:function(j){this.__th.setMessage(j);this.__ti.setMessage(j);}
}});}
)();
(function(){var a="Validation Error",b="s de %s caracteres!",c="Debe tener m",d='\u00e1',e="validator.constraints.MinLength";qx.Class.define(e,{extend:validator.constraints.Constraint,properties:{__th:{}},statics:{validate:function(g,f){return function(h){var i=new validator.constraints.MinLength(h);i.setMessage(g);i.setMinLength(f);i.validate();}
;}
},construct:function(j){this._message=c+d+b;this._value=j;this.__th=0;}
,members:{validate:function(){if(this._value.length<this.__th){throw new qx.core.ValidationError(a,this._message.replace(/\%d/g,this.__th));}
;}
,setMinLength:function(length){this.__th=length;}
}});}
)();
(function(){var a="Debe tener menos de %s caracteres!",b="validator.constraints.MaxLength",c="Validation Error";qx.Class.define(b,{extend:validator.constraints.Constraint,properties:{__ti:{}},statics:{validate:function(d,e){return function(f){var g=new validator.constraints.MaxLength(f);g.setMessage(d);g.setMaxLength(e);g.validate();}
;}
},construct:function(h){this._message=a;this._value=h;this.__ti=0;}
,members:{validate:function(){if(this._value.length>this.__ti){throw new qx.core.ValidationError(c,this._message.replace(/\%d/g,this.__ti));}
;}
,setMaxLength:function(i){this.__ti=i;}
}});}
)();
(function(){var a="user@subdomain",b="mal",c="",d="Validation Error: mal",e="user@subdomain.domain",f="validator.test.unit.constraints.EmailTest";qx.Class.define(f,{extend:qx.dev.unit.TestCase,members:{testEmail:function(){var g=new validator.constraints.Email.validate(c);g(e);}
,testNotEmail:function(){var h=new validator.constraints.Email.validate(b);this.assertException(function(){h(a);}
,Error,d);}
}});}
)();
(function(){var a="Debe ser un correo!",b="validator.constraints.Email";qx.Class.define(b,{extend:validator.constraints.Constraint,properties:{},statics:{validate:function(c){return function(d){var e=new validator.constraints.Email(d);e.setMessage(c);e.validate();}
;}
},construct:function(f){this._message=a;this._pattern=/^([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})$/;this._value=f;}
,members:{}});}
)();
(function(){var a="Validation Error: mal",b="validator.test.unit.constraints.RangeNumberTest",c="mal",d="";qx.Class.define(b,{extend:qx.dev.unit.TestCase,members:{testLength:function(){var e=new validator.constraints.RangeNumber.validate(d,3,7);e(5);}
,testUpLength:function(){var f=new validator.constraints.RangeNumber.validate(c,3,7);this.assertException(function(){f(13);}
,Error,a);}
,testDownLength:function(){var g=new validator.constraints.RangeNumber.validate(c,13,15);this.assertException(function(){g(9);}
,Error,a);}
}});}
)();
(function(){var a="validator.constraints.RangeNumber";qx.Class.define(a,{extend:validator.constraints.Constraint,properties:{__tj:{},__tk:{}},statics:{validate:function(c,d,b){return function(e){var f=new validator.constraints.RangeNumber(e);f.setMessage(c);f.setMinNumber(d);f.setMaxNumber(b);f.validate();}
;}
},construct:function(g){this._value=g;this.__tj=new validator.constraints.MinNumber(this._value);this.__tk=new validator.constraints.MaxNumber(this._value);}
,members:{validate:function(){this.__tj.validate();this.__tk.validate();}
,setMinNumber:function(h){this.__tj.setMinNumber(h);}
,setMaxNumber:function(i){this.__tk.setMaxNumber(i);}
,setMessage:function(j){this.__tj.setMessage(j);this.__tk.setMessage(j);}
}});}
)();
(function(){var a="Debe contener solo n",b='\u00fa',c="validator.constraints.Number",d="meros enteros!",e="meros decimales!",f="Validation Error";qx.Class.define(c,{extend:validator.constraints.Constraint,properties:{_decimals:{}},statics:{validate:function(g,h){return function(i){var j=new validator.constraints.Number(i);j.setMessage(g);j.setDecimals(h);j.validate();}
;}
},construct:function(k){this._value=k;this._decimals=false;}
,members:{validate:function(){(this._decimals)?this._decimal():this._integer();}
,setDecimals:function(l){this._decimals=l||this._decimals;}
,_integer:function(){var m=/^([0-9]{1,})$/;var n=this._message||a+b+d;if(!m.test(this._value)||!qx.lang.Type.isNumber(this._value)){throw new qx.core.ValidationError(f,n);}
;}
,_decimal:function(){var o=/^([0-9]+).(([0-9]+){1,})$/;var p=this._message||a+b+e;if(!o.test(this._value)||!qx.lang.Type.isNumber(this._value)){throw new qx.core.ValidationError(f,p);}
;}
}});}
)();
(function(){var a='\u00fa',b="mero debe ser mayor o igual que %d",c="validator.constraints.MinNumber",d="El n",e="Validation Error";qx.Class.define(c,{extend:validator.constraints.Number,properties:{__tj:{}},statics:{validate:function(f,h,g){return function(i){var j=new validator.constraints.MinNumber(i);j.setMessage(f);j.setMinNumber(h);j.setDecimals(g);j.validate();}
;}
},construct:function(k){this._value=k;this._decimals=false;this.__tj=0;}
,members:{validate:function(){validator.constraints.Number.prototype.validate.call(this);var l=this._message||d+a+b;if(this._value<this.__tj){throw new qx.core.ValidationError(e,l.replace(/\%d/g,this.__tj));}
;}
,setMinNumber:function(m){this.__tj=m;}
}});}
)();
(function(){var a='\u00fa',b="mero debe ser menor o igual que %d",c="validator.constraints.MaxNumber",d="El n",e="Validation Error";qx.Class.define(c,{extend:validator.constraints.Number,properties:{__tk:{}},statics:{validate:function(g,f,h){return function(i){var j=new validator.constraints.MaxNumber(i);j.setMessage(g);j.setMaxNumber(f);j.setDecimals(h);j.validate();}
;}
},construct:function(k){this._value=k;this._decimals=false;this.__tk=0;}
,members:{validate:function(){validator.constraints.Number.prototype.validate.call(this);var l=this._message||d+a+b;if(this._value>this.__tk){throw new qx.core.ValidationError(e,l.replace(/\%d/g,this.__tk));}
;}
,setMaxNumber:function(m){this.__tk=m;}
}});}
)();
(function(){var a="Validation Error: No debe ser nulo!",b="null",c="validator.test.unit.constraints.IsNotNullTest";qx.Class.define(c,{extend:qx.dev.unit.TestCase,members:{testIsNull:function(){var d=validator.constraints.IsNotNull.validate();this.assertException(function(){d(null);}
,Error,a);}
,testIsNotNull:function(){var e=validator.constraints.IsNotNull.validate();e(b);}
,testUndefined:function(){var f=validator.constraints.IsNotNull.validate();f(undefined);}
}});}
)();
(function(){var a="ntico a %s!",b='\u00e9',c="validator.constraints.NotIdenticalTo",d="No debe ser id",e="Validation Error";qx.Class.define(c,{extend:validator.constraints.Constraint,properties:{_comparison:{}},statics:{validate:function(g,f){return function(h){var i=new validator.constraints.NotIdenticalTo(h);i.setMessage(g);i.setComparison(f);i.validate();}
;}
},construct:function(j){this._message=d+b+a;this._value=j;}
,members:{validate:function(){if(this._value===this._comparison){throw new qx.core.ValidationError(e,this._message.replace(/\%s/g,this._comparison));}
;}
,setComparison:function(k){this._comparison=k;}
}});}
)();
(function(){var a="No debe ser nulo!",b="validator.constraints.IsNotNull";qx.Class.define(b,{extend:validator.constraints.NotIdenticalTo,properties:{},statics:{validate:function(c){return function(d){var e=new validator.constraints.IsNotNull(d);e.setMessage(c);e.validate();}
;}
},construct:function(f){this._message=a;this._value=f;this._comparison=null;}
,members:{}});}
)();
(function(){var a="un valor",b="validator.test.unit.constraints.IsNullTest",c="Validation Error: Debe ser nulo!",d="null";qx.Class.define(b,{extend:qx.dev.unit.TestCase,members:{testIsNull:function(){var e=validator.constraints.IsNull.validate();e(null);}
,testIsNotNull:function(){var g=validator.constraints.IsNull.validate();this.assertException(function(){g(d);}
,Error,c);}
,testIsUndefined:function(){var h=validator.constraints.IsNull.validate();this.assertException(function(){h(undefined);}
,Error,c);}
,testUndefinedVar:function(){var name;var i=validator.constraints.IsNull.validate();this.assertException(function(){i(name);}
,Error,c);}
,testUndefinedObject:function(){var j={};var k=validator.constraints.IsNull.validate();this.assertException(function(){k(j.name);}
,Error,c);}
,testUndefinedFunctionEmpty:function(){var f=function(){}
;var l=validator.constraints.IsNull.validate();this.assertException(function(){l(f());}
,Error,c);}
,testUndefinedFunction:function(){var f=function(){return a;}
;var m=validator.constraints.IsNull.validate();this.assertException(function(){m(f());}
,Error,c);}
}});}
)();
(function(){var a="7.5",b="mal",c="",d="Validation Error: Debe contener solo n",e='\u00fa',f="Validation Error: mal",g="7",h="validator.test.unit.constraints.NumberTest",i="meros enteros!";qx.Class.define(h,{extend:qx.dev.unit.TestCase,members:{testNumber:function(){var j=new validator.constraints.Number.validate(c);j(7);}
,testNumberDecimalNotAcepted:function(){var k=new validator.constraints.Number.validate();this.assertException(function(){k(7.5);}
,Error,d+e+i);}
,testNotNumber:function(){var l=new validator.constraints.Number.validate(b);this.assertException(function(){l(g);}
,Error,f);}
,testDecimalNumberAcepted:function(){var m=new validator.constraints.Number.validate(c,true);m(7.5);}
,testNotDecimalNumber:function(){var n=new validator.constraints.Number.validate(b,true);this.assertException(function(){n(a);}
,Error,f);}
}});}
)();
(function(){var a="71",b="name",c="",d="7",e="name1",f="validator.test.unit.constraints.NotEqualToTest";qx.Class.define(f,{extend:qx.dev.unit.TestCase,members:{testEqualString:function(){var g=new validator.constraints.NotEqualTo.validate(c,b);g(e);}
,testEqualNumber:function(){var h=new validator.constraints.NotEqualTo.validate(c,7);h(71);}
,testEqualStringNumber:function(){var i=new validator.constraints.NotEqualTo.validate(c,7);i(a);}
,testEqualNumberString:function(){var j=new validator.constraints.NotEqualTo.validate(c,d);j(17);}
}});}
)();
(function(){var a="validator.constraints.NotEqualTo",b="No debe ser igual a %s!",c="Validation Error";qx.Class.define(a,{extend:validator.constraints.Constraint,properties:{__tl:{}},statics:{validate:function(e,d){return function(f){var g=new validator.constraints.NotEqualTo(f);g.setMessage(e);g.setComparison(d);g.validate();}
;}
},construct:function(h){this._message=b;this._value=h;}
,members:{validate:function(){if(this._value==this.__tl){throw new qx.core.ValidationError(c,this._message.replace(/\%s/g,this.__tl));}
;}
,setComparison:function(i){this.__tl=i;}
}});}
)();
(function(){var a="mal",b="",c="Validation Error: mal",d="199:99:99",e="asd:78:45",f="validator.test.unit.constraints.DurationTest";qx.Class.define(f,{extend:qx.dev.unit.TestCase,members:{testDuration:function(){var g=new validator.constraints.Duration.validate(b);g(d);}
,testNotDuration:function(){var h=new validator.constraints.Duration.validate(a);this.assertException(function(){h(e);}
,Error,c);}
}});}
)();
(function(){var a="n incorrecto!",b='\u00f3',c="Tiempo de duraci",d="validator.constraints.Duration";qx.Class.define(d,{extend:validator.constraints.Constraint,properties:{},statics:{validate:function(e){return function(f){var g=new validator.constraints.Duration(f);g.setMessage(e);g.validate();}
;}
},construct:function(h){this._message=c+b+a;this._pattern=/^([0-9]{1,}):([0-9]{2}):[0-9]{2}$/;this._value=h;}
,members:{}});}
)();
(function(){var a="0.256.0.0",b="mal",c="",d="0.0.0.0",e="Validation Error: mal",f="0.0.0.255",g="validator.test.unit.constraints.Ipv4Test",h="0.0.256.0",i="0.0.4",j="255.255.255.254",k="256.0.0.0",l="10.54.17.31";qx.Class.define(g,{extend:qx.dev.unit.TestCase,members:{testIp:function(){var m=new validator.constraints.Ipv4.validate(c);m(l);}
,testLimitIp:function(){var n=new validator.constraints.Ipv4.validate(c);n(j);}
,testMinimunIp:function(){var o=new validator.constraints.Ipv4.validate(b);o(d);}
,testNotIp1:function(){var p=new validator.constraints.Ipv4.validate(b);this.assertException(function(){p(k);}
,Error,e);}
,testNotIp2:function(){var q=new validator.constraints.Ipv4.validate(b);this.assertException(function(){q(a);}
,Error,e);}
,testNotIp3:function(){var r=new validator.constraints.Ipv4.validate(b);this.assertException(function(){r(h);}
,Error,e);}
,testNotIp4:function(){var s=new validator.constraints.Ipv4.validate(b);this.assertException(function(){s(f);}
,Error,e);}
,testIncompliteIpv4:function(){var t=new validator.constraints.Ipv4.validate(b);this.assertException(function(){t(i);}
,Error,e);}
}});}
)();
(function(){var a="n Ipv4 incorrecta!",b="validator.constraints.Ipv4",c='\u00f3',d="Direcci";qx.Class.define(b,{extend:validator.constraints.Constraint,properties:{},statics:{validate:function(e){return function(f){var g=new validator.constraints.Ipv4(f);g.setMessage(e);g.validate();}
;}
},construct:function(h){this._message=d+c+a;this._pattern=/^(([1-9]?[0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]).){3}([1-9]?[0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-4])$/;this._value=h;}
,members:{}});}
)();
(function(){var a="user@subdomain",b="mal",c="",d="Validation Error: mal",e="user",f="validator.test.unit.constraints.MinLengthTest",g="nilmar1986";qx.Class.define(f,{extend:qx.dev.unit.TestCase,members:{testLength:function(){var h=new validator.constraints.MinLength.validate(c,7);h(g);}
,testUpLength:function(){var i=new validator.constraints.MinLength.validate(b,3);i(a);}
,testDownLength:function(){var j=new validator.constraints.MinLength.validate(b,13);this.assertException(function(){j(e);}
,Error,d);}
}});}
)();
(function(){var a='male',b="mal",c="",d="male",e="Validation Error: mal",f='pepe',g='female',h="validator.test.unit.constraints.ChoiceTest";qx.Class.define(h,{extend:qx.dev.unit.TestCase,members:{testInChoice:function(){var i=new validator.constraints.Choice.validate(c,[g,a]);i(d);}
,testNotInChoice:function(){var j=new validator.constraints.Choice.validate(b,[g,a]);this.assertException(function(){j(f);}
,Error,e);}
}});}
)();
(function(){var a='\u00f3',b="validator.constraints.Choice",c="Seleccione una opci",d="n!",e="Validation Error";qx.Class.define(b,{extend:validator.constraints.Constraint,properties:{__tm:{}},statics:{validate:function(f,g){return function(h){var i=new validator.constraints.Choice(h);i.setMessage(f);i.setChoices(g);i.validate();}
;}
},construct:function(j){this._message=c+a+d;this._value=j;}
,members:{validate:function(){if(this.__tm.indexOf(this._value)===-1){throw new qx.core.ValidationError(e,this._message);}
;}
,setChoices:function(k){this.__tm=k;}
}});}
)();
(function(){var a="mal",b="",c="Validation Error: mal",d="https://www.user.subdomain.domain.cu",e="fttp://user.com",f="http://www.user.subdomain.domain.cu",g="validator.test.unit.constraints.HttpTest";qx.Class.define(g,{extend:qx.dev.unit.TestCase,members:{testHttp:function(){var h=new validator.constraints.Http.validate(b);h(f);}
,testHttps:function(){var i=new validator.constraints.Http.validate(b);i(d);}
,testNotHttp:function(){var j=new validator.constraints.Http.validate(a);this.assertException(function(){j(e);}
,Error,c);}
}});}
)();
(function(){var a="validator.constraints.Http",b="n http incorrecta!",c='\u00f3',d="Direcci";qx.Class.define(a,{extend:validator.constraints.Constraint,properties:{},statics:{validate:function(e){return function(f){var g=new validator.constraints.Http(f);g.setMessage(e);g.validate();}
;}
},construct:function(h){this._message=d+c+b;this._pattern=/^(http|https):\/\/[a-zA-Z0-9_ \/-\/.\/:]+\.(com|org|net|mil|edu|cu|es|ar|de|bl|rs|ch|ci|ca|de|uk)$/;this._value=h;}
,members:{}});}
)();
(function(){var a="name",b="mal",c="validator.test.unit.constraints.NotIdenticalToTest",d="",e="Validation Error: mal",f="7",g="name1";qx.Class.define(c,{extend:qx.dev.unit.TestCase,members:{testEqualString:function(){var h=new validator.constraints.NotIdenticalTo.validate(d,a);h(g);}
,testEqualNumber:function(){var i=new validator.constraints.NotIdenticalTo.validate(d,7);i(75);}
,testEqualStringNumber:function(){var j=new validator.constraints.NotIdenticalTo.validate(b,7);j(f);}
,testEqualNumberString:function(){var k=new validator.constraints.NotIdenticalTo.validate(b,f);k(7);}
,testIdentical:function(){var l=new validator.constraints.NotIdenticalTo.validate(b,a);this.assertException(function(){l(a);}
,Error,e);}
}});}
)();
(function(){var a="name",b="7",c="validator.test.unit.constraints.EqualToTest",d="";qx.Class.define(c,{extend:qx.dev.unit.TestCase,members:{testEqualString:function(){var e=new validator.constraints.EqualTo.validate(d,a);e(a);}
,testEqualNumber:function(){var f=new validator.constraints.EqualTo.validate(d,7);f(7);}
,testEqualStringNumber:function(){var g=new validator.constraints.EqualTo.validate(d,7);g(b);}
,testEqualNumberString:function(){var h=new validator.constraints.EqualTo.validate(d,b);h(7);}
}});}
)();
(function(){var a="validator.constraints.EqualTo",b="Debe ser igual a %s!",c="Validation Error";qx.Class.define(a,{extend:validator.constraints.Constraint,properties:{_comparison:{}},statics:{validate:function(e,d){return function(f){var g=new validator.constraints.EqualTo(f);g.setMessage(e);g.setComparison(d);g.validate();}
;}
},construct:function(h){this._message=b;this._value=h;}
,members:{validate:function(){if(this._value!=this._comparison){throw new qx.core.ValidationError(c,this._message.replace(/\%s/g,this._comparison));}
;}
,setComparison:function(i){this._comparison=i;}
}});}
)();
(function(){var a="validator.test.unit.constraints.DateTest",b="es un string",c="Validation Error: es un string";qx.Class.define(a,{extend:qx.dev.unit.TestCase,members:{testDate:function(){var d=validator.constraints.Date.validate();d(new Date());}
,testDateConstructor:function(){var e=validator.constraints.Date.validate(b);this.assertException(function(){e(Date());}
,Error,c);}
}});}
)();
(function(){var a="7.5",b="mal",c="Validation Error: El n",d="mero debe ser menor o igual que 5.3",e="",f="Validation Error: mal",g="validator.test.unit.constraints.MaxNumberTest",h='\u00fa',i="7",j="mero debe ser menor o igual que 5";qx.Class.define(g,{extend:qx.dev.unit.TestCase,members:{testNumber:function(){var k=new validator.constraints.MaxNumber.validate(e,7);k(7);}
,testNumberDecimalNotAcepted:function(){var l=new validator.constraints.MaxNumber.validate(b,8,false);this.assertException(function(){l(7.5);}
,Error,f);}
,testNotNumber:function(){var m=new validator.constraints.MaxNumber.validate(b,9);this.assertException(function(){m(i);}
,Error,f);}
,testDecimalNumberAcepted:function(){var n=new validator.constraints.MaxNumber.validate(e,8,true);n(7.5);}
,testNotDecimalNumber:function(){var o=new validator.constraints.MaxNumber.validate(b,8,true);this.assertException(function(){o(a);}
,Error,f);}
,testMaxNumber:function(){var p=new validator.constraints.MaxNumber.validate(e,5);this.assertException(function(){p(7);}
,Error,c+h+j);}
,testMaxDecimalNumber:function(){var q=new validator.constraints.MaxNumber.validate(e,5.3,true);this.assertException(function(){q(5.4);}
,Error,c+h+d);}
}});}
)();
(function(){var a="24:60:60",b="validator.test.unit.constraints.TimeTest",c="",d="Validation Error: mal",e="mal",f="23:59:59";qx.Class.define(b,{extend:qx.dev.unit.TestCase,members:{testDuration:function(){var g=new validator.constraints.Time.validate(c);g(f);}
,testNotDuration:function(){var h=new validator.constraints.Time.validate(e);this.assertException(function(){h(a);}
,Error,d);}
}});}
)();
(function(){var a="Los minutos deben ser menor que 60!",b="Hora incorrecta!",c="La hora debe ser menor que 24!",d="validator.constraints.Time",e="Los segundos deben ser menor que 60!",f="Validation Error";qx.Class.define(d,{extend:validator.constraints.Constraint,properties:{},statics:{validate:function(g){return function(h){var i=new validator.constraints.Time(h);i.setMessage(g);i.validate();}
;}
},construct:function(j){this._message=b;this._pattern=/^([0-9]{2}):([0-9]{2}):[0-9]{2}$/;this._value=j;}
,members:{validate:function(){validator.constraints.Constraint.prototype.validate.call(this);this.__tn(this._value.substring(0,2),24,this._message||c);this.__tn(this._value.substring(3,5),60,this._message||a);this.__tn(this._value.substring(6,8),60,this._message||e);}
,__tn:function(l,m,k){if(l>=m){throw new qx.core.ValidationError(f,k);}
;}
}});}
)();
(function(){var a="validator.fixture.Author.name: No es correo",b="validator.fixture.Author.getEmail(): Nombre solo letras",d="",e="validator.test.unit.ValidatorTest",f="Nombre solo letras",g="Valor vacio",h="No es correo",i="validator.fixture.Author",j="Nombre vacio",k="Validation Error";qx.Class.define(e,{extend:qx.dev.unit.TestCase,members:{testValidatePrimitiveData:function(){var v=new validator.Validator();var l=v.validateValue(d,validator.constraints.Letter.validate(j,true));this.assertEquals(j,l[0].getMessage());}
,testValidateWithCallback:function(){var v=new validator.Validator();var m=v.validateValue(d,function(n){if(n.length==0){throw new qx.core.ValidationError(k,g);}
;}
);this.assertEquals(g,m[0].getMessage());}
,testValidateWithArray:function(){var v=new validator.Validator();var c=[];c.push(validator.constraints.Letter.validate(f,true));c.push(validator.constraints.Email.validate(h,true));var o=v.validateValue(7,c);this.assertEquals(h,o[1].getMessage());}
,testAttrEntity:function(){var p={};p.clazz=i;p.fields={};p.fields.name={};p.fields.name.constraints=[];p.fields.name.constraints.push(validator.constraints.Letter.validate(f,true));p.fields.name.constraints.push(validator.constraints.Email.validate(h,true));var r=new validator.fixture.Author();r.name=7;var v=new validator.Validator();var q=v.validate(r,p);this.assertEquals(a,q[1].getMessage());}
,testMethodEntity:function(){var s={};s.clazz=i;s.fields={};s.getters={};s.getters.getEmail={};s.getters.getEmail.constraints=[];s.getters.getEmail.constraints.push(validator.constraints.Letter.validate(f,true));s.getters.getEmail.constraints.push(validator.constraints.Email.validate(h,true));var u=new validator.fixture.Author();var v=new validator.Validator();var t=v.validate(u,s);this.assertEquals(b,t[0].getMessage());}
,testEntityAll:function(){var w={};w.clazz=i;w.fields={};w.fields.name={};w.fields.name.constraints=[];w.fields.name.constraints.push(validator.constraints.Letter.validate(f,true));w.fields.name.constraints.push(validator.constraints.Email.validate(h,true));w.getters={};w.getters.getEmail={};w.getters.getEmail.constraints=[];w.getters.getEmail.constraints.push(validator.constraints.Letter.validate(f,true));w.getters.getEmail.constraints.push(validator.constraints.Email.validate(h,true));var y=new validator.fixture.Author();y.name=7;var v=new validator.Validator();var x=v.validate(y,w);this.assertEquals(4,x.length);}
}});}
)();
(function(){var a="function",b="",c="has",d='protected',e='private',f="get",g="validator.Validator",h="is";qx.Class.define(g,{extend:qx.core.Object,properties:{},construct:function(){}
,members:{validateValue:function(m,n,l){var k=[];l=l||{"entityNamespace":b,"entityMethod":b,"entityAttr":b};if(Array.isArray(n)){k=[].concat(this.__to(m,n,l));}
;if((typeof n)===a){var j=this.__tp(m,n,l);if(j!==null){k.push(j);}
;}
;return k;}
,__to:function(p,s,o){var r=[];for(var i=0;i<s.length;i++ ){var q=this.__tp(p,s[i],o);if(q!==null){r.push(q);}
;}
;return r;}
,__tp:function(v,w,u){u=u||{"entityNamespace":b,"entityMethod":b,"entityAttr":b};try{w(v);}
catch(x){var t=new validator.ConstraintViolation(x.message);t.setEntityNamespace(u.entityNamespace);t.setEntityMethod(u.entityMethod);t.setEntityAttr(u.entityAttr);return t;}
;return null;}
,validate:function(A,y){var z=[];y=y||null;if(y.fields!==undefined){z=z.concat(this.__tq(A,y.fields));}
;if(y.getters!==undefined){z=z.concat(this.__tr(A,y.getters));}
;return z;}
,__tq:function(C,E){var F=[];for(var D in E){if(C[D]!==undefined){if(E[D].visibility===e||E[D].visibility===d){if(E[D].accessor!==undefined){}
else {if(C[f+D]!==undefined){}
;if(C[h+D]!==undefined){}
;if(C[c+D]!==undefined){}
;}
;}
else {var G=E[D].constraints;var B={"entityNamespace":C.classname,"entityMethod":b,"entityAttr":D};F=F.concat(this.validateValue(C[D],G,B));}
;}
;}
;return F;}
,__tr:function(I,K){var J=[];for(var L in K){if((typeof I[L])===a){var M=K[L].constraints;var H={"entityNamespace":I.classname,"entityMethod":L,"entityAttr":b};J=J.concat(this.validateValue(I[L](),M,H));}
;}
;return J;}
}});}
)();
(function(){var a=".",b=": ",c="validator.ConstraintViolation",d="",e="(): ";qx.Class.define(c,{extend:qx.core.Object,properties:{__ts:{},__mK:{},__tt:{},__tu:{},__tv:{}},construct:function(f){this.__tw=f||d;this.__tt=d;this.__tu=d;this.__tv=d;this.__mK=[];}
,members:{getMessage:function(){return this.__tD();}
,__tx:function(){return (this.__tt.length>0);}
,__ty:function(){return (this.__tv.length>0);}
,__tz:function(){return (this.__tu.length>0);}
,__tA:function(){var g=this.__tt;g+=(this.__ty()||this.__tz())?a:b;this.__mK.push(g);}
,__tB:function(){if(this.__ty()){this.__mK.push(this.__tv+e);}
;}
,__tC:function(){if(this.__tz()){this.__mK.push(this.__tu+b);}
;}
,__tD:function(){if(this.__tx()){this.__tA();this.__tB();this.__tC();}
;this.__mK.push(this.__tw);return this.__mK.join(d);}
,setMessage:function(h){this.__tw=h;return this;}
,setEntityNamespace:function(i){this.__tt=i;return this;}
,setEntityMethod:function(j){this.__tv=j;return this;}
,setEntityAttr:function(k){this.__tu=k;return this;}
}});}
)();
(function(){var a="validator.constraints.Letter",b="Debe contener solo letras!",c="Validation Error";qx.Class.define(a,{extend:validator.constraints.Constraint,properties:{},statics:{validate:function(d){return function(e){var f=new validator.constraints.Letter(e);f.setMessage(d);f.validate();}
;}
},construct:function(g){this._message=b;this._pattern=/^([a-zA-Z ]{1,})$/;this._value=g;}
,members:{validate:function(){if(!this._pattern.test(this._value)||!qx.lang.Type.isString(this._value)){throw new qx.core.ValidationError(c,this._message);}
;}
}});}
)();
(function(){var a="validator.fixture.Author";qx.Class.define(a,{extend:qx.core.Object,properties:{name:{}},construct:function(){}
,members:{getEmail:function(){return 42;}
}});}
)();
(function(){var a="Validation Error: Debe contener solo letras!",b="mal",c="validator.test.unit.constraints.LetterTest",d="",e="Validation Error: mal",f="valor del string",g="7",h="null",i="undefined";qx.Class.define(c,{extend:qx.dev.unit.TestCase,members:{testString:function(){var j=new validator.constraints.Letter.validate(d);j(f);}
,testNotString:function(){var k=new validator.constraints.Letter.validate(b);this.assertException(function(){k(7);}
,Error,e);}
,testStringNumber:function(){var l=new validator.constraints.Letter.validate();this.assertException(function(){l(g);}
,Error,a);}
,testUndefined:function(){var m=new validator.constraints.Letter.validate();this.assertException(function(){m(undefined);}
,Error,a);}
,testStringUndefined:function(){var n=new validator.constraints.Letter.validate();n(i);}
,testStringNull:function(){var o=new validator.constraints.Letter.validate();o(h);}
}});}
)();
(function(){var a="name",b="mal",c="",d="Validation Error: mal",e="validator.test.unit.constraints.IdenticalToTest",f="7";qx.Class.define(e,{extend:qx.dev.unit.TestCase,members:{testEqualString:function(){var g=new validator.constraints.IdenticalTo.validate(c,a);g(a);}
,testEqualNumber:function(){var h=new validator.constraints.IdenticalTo.validate(c,7);h(7);}
,testEqualStringNumber:function(){var i=new validator.constraints.IdenticalTo.validate(b,7);this.assertException(function(){i(f);}
,Error,d);}
,testEqualNumberString:function(){var j=new validator.constraints.IdenticalTo.validate(b,f);this.assertException(function(){j(7);}
,Error,d);}
}});}
)();
(function(){var a="Validation Error: mal",b="Validation Error: Debe especificar al menos 13 elemento",c="mal",d="validator.test.unit.constraints.CountTest",e="";qx.Class.define(d,{extend:qx.dev.unit.TestCase,members:{testLength:function(){var f=new validator.constraints.Count.validate(e,3,7);f([1,2,3,4]);}
,testUpLength:function(){var g=new validator.constraints.Count.validate(c,3,7);this.assertException(function(){g([1,2,3,4,5,6,7,8,9,10,11,12,13]);}
,Error,a);}
,testDownLength:function(){var h=new validator.constraints.Count.validate(e,13,15);this.assertException(function(){h([1,2,3,4,5,6,7,8,9]);}
,Error,b);}
}});}
)();
(function(){var a='\u00e1',b="array",c="No debe especificar m",d="validator.constraints.Count",e="Debe especificar al menos %d elemento!",f="s de %d elementos!";qx.Class.define(d,{extend:validator.constraints.Constraint,properties:{__tE:{},__tF:{}},statics:{validate:function(g,h,i){return function(j){var k=new validator.constraints.Count(j);k.setMessage(g);k.setMinElements(h);k.setMaxElements(i);k.validate();}
;}
},construct:function(l){this._value=l;this.__tG();this.__tE=new validator.constraints.MinNumber(this._value.length);this.__tF=new validator.constraints.MaxNumber(this._value.length);}
,members:{__tG:function(){var m=new validator.constraints.Type(this._value);m.setType(b);m.validate();}
,validate:function(){this.__tE.validate();this.__tF.validate();}
,setMinElements:function(n){this.__tE.setMinNumber(n);this.__tE.setDecimals(false);}
,setMaxElements:function(o){this.__tF.setMaxNumber(o);this.__tF.setDecimals(false);}
,setMessage:function(q){var r=q||e;var p=q||c+a+f;this.__tE.setMessage(r);this.__tF.setMessage(p);}
}});}
)();
(function(){var a="package.Entity: Error",b="package.Entity",c="package.Entity.propiedad: Error",d="Error",e="package.Entity.execute(): Error",f="validator.test.unit.ConstraintViolationTest",g="propiedad",h="execute";qx.Class.define(f,{extend:qx.dev.unit.TestCase,properties:{__tH:{}},members:{setUp:function(){this.__tH=new validator.ConstraintViolation();this.__tH.setMessage(d);}
,testGetSimpleMessage:function(){var i=new validator.ConstraintViolation(d);var j=i.getMessage();this.assertEquals(d,j);}
,testGetSetterMessage:function(){var k=this.__tH.getMessage();this.assertEquals(d,k);}
,testEntityNamespace:function(){this.__tH.setEntityNamespace(b);var l=this.__tH.getMessage();this.assertEquals(a,l);}
,testEntityMethod:function(){this.__tH.setEntityNamespace(b);this.__tH.setEntityMethod(h);var m=this.__tH.getMessage();this.assertEquals(e,m);}
,testEntityAttr:function(){this.__tH.setEntityNamespace(b);this.__tH.setEntityAttr(g);var n=this.__tH.getMessage();this.assertEquals(c,n);}
,testEntityMethodError:function(){this.__tH.setEntityMethod(h);var o=this.__tH.getMessage();this.assertEquals(d,o);}
,testEntityAttrError:function(){this.__tH.setEntityAttr(g);var p=this.__tH.getMessage();this.assertEquals(d,p);}
}});}
)();
(function(){var a="7.5",b="mal",c="Validation Error: El n",d="validator.test.unit.constraints.MinNumberTest",e="",f="Validation Error: mal",g="mero debe ser mayor o igual que 5",h='\u00fa',i="7",j="mero debe ser mayor o igual que 5.3";qx.Class.define(d,{extend:qx.dev.unit.TestCase,members:{testNumber:function(){var k=new validator.constraints.MinNumber.validate(e,7);k(7);}
,testNumberDecimalNotAcepted:function(){var l=new validator.constraints.MinNumber.validate(b,8,false);this.assertException(function(){l(7.5);}
,Error,f);}
,testNotNumber:function(){var m=new validator.constraints.MinNumber.validate(b,9);this.assertException(function(){m(i);}
,Error,f);}
,testDecimalNumberAcepted:function(){var n=new validator.constraints.MinNumber.validate(e,3,true);n(7.5);}
,testNotDecimalNumber:function(){var o=new validator.constraints.MinNumber.validate(b,8,true);this.assertException(function(){o(a);}
,Error,f);}
,testMinNumber:function(){var p=new validator.constraints.MinNumber.validate(e,5);this.assertException(function(){p(3);}
,Error,c+h+g);}
,testMaxDecimalNumber:function(){var q=new validator.constraints.MinNumber.validate(e,5.3,true);this.assertException(function(){q(5.2);}
,Error,c+h+j);}
}});}
)();
(function(){var a="Validation Error: mal",b="mal",c="",d="validator.test.unit.constraints.MoneyTest";qx.Class.define(d,{extend:qx.dev.unit.TestCase,members:{testMoney:function(){var e=new validator.constraints.Money.validate(c);e(125.98);}
,testNotMoney:function(){var f=new validator.constraints.Money.validate(b);this.assertException(function(){f(125.321);}
,Error,a);}
,testCeroMoney:function(){var g=new validator.constraints.Money.validate(c);g(0.98);}
,testRealCeroMoney:function(){var h=new validator.constraints.Money.validate(c);h(0.00);}
,testValue:function(){var i=new validator.constraints.Money.validate(c);i(0);}
}});}
)();
(function(){var a="Precio incorrecto!",b="validator.constraints.Money";qx.Class.define(b,{extend:validator.constraints.Constraint,properties:{},statics:{validate:function(c){return function(d){var e=new validator.constraints.Money(d);e.setMessage(c);e.validate();}
;}
},construct:function(f){this._message=a;this._pattern=/^([0-9]+).([0-9]{2})$/;this._value=f;}
,members:{validate:function(){if(Number(this._value)==0){return;}
;validator.constraints.Constraint.prototype.validate.call(this);}
}});}
)();
(function(){var a="es un string",b='^(ab)$',c="true",d="{}",e="string",f="null",g="Validation Error: Debe ser indefinido!",h='1',i='nombre',j="789",k="mero!",l="name",m="Validation Error: El tipo de dato name no existe!",n="",o="147",p='pepe',q="validator.test.unit.constraints.TypeTest",r='a',s="Validation Error: Debe ser nulo!",t="Validation Error: es un string",u='error',v="mal",w='true',x="Validation Error: mal",y='\u00fa',z="Validation Error: Debe ser un n",A="undefined",B="Validation Error";qx.Class.define(q,{extend:qx.dev.unit.TestCase,members:{testString:function(){var C=validator.constraints.Type.validate(n,validator.constraints.Type.STRING);C(e);}
,testStringConstructor:function(){var D=validator.constraints.Type.validate(n,validator.constraints.Type.STRING);D(String(r));}
,testNotString:function(){var E=validator.constraints.Type.validate(v,validator.constraints.Type.STRING);this.assertException(function(){E(7);}
,Error,x);}
,testNumberString:function(){var F=validator.constraints.Type.validate(n,validator.constraints.Type.STRING);F(o);}
,testObjectString:function(){var G=validator.constraints.Type.validate(v,validator.constraints.Type.STRING);this.assertException(function(){G(new String(r));}
,Error,x);}
,testNumber:function(){var H=validator.constraints.Type.validate(n,validator.constraints.Type.NUMBER);H(7);}
,testNumberConstructor:function(){var I=validator.constraints.Type.validate(n,validator.constraints.Type.NUMBER);I(Number(7));}
,testStringNumber:function(){var J=validator.constraints.Type.validate(n,validator.constraints.Type.NUMBER);this.assertException(function(){J(j);}
,Error,z+y+k);}
,testObjectNumber:function(){var K=validator.constraints.Type.validate(v,validator.constraints.Type.NUMBER);this.assertException(function(){K(new Number(7));}
,Error,x);}
,testIsUndefined:function(){var L=validator.constraints.IsUndefined.validate();L(undefined);}
,testIsNotUndefined:function(){var M=validator.constraints.IsUndefined.validate();this.assertException(function(){M(A);}
,Error,g);}
,testIsNull:function(){var N=validator.constraints.IsNull.validate();N(null);}
,testIsNotNull:function(){var O=validator.constraints.IsNull.validate();this.assertException(function(){O(f);}
,Error,s);}
,testObject:function(){var P=validator.constraints.Type.validate(n,validator.constraints.Type.OBJECT);P({name:i});}
,testLiteralObject:function(){var Q=validator.constraints.Type.validate(n,validator.constraints.Type.OBJECT);Q(new Object());}
,testObjectConstructor:function(){var R=validator.constraints.Type.validate(n,validator.constraints.Type.OBJECT);R(Object());}
,testEmptyObject:function(){var S=validator.constraints.Type.validate(n,validator.constraints.Type.OBJECT);S({});}
,testNotObject:function(){var T=validator.constraints.Type.validate(v,validator.constraints.Type.OBJECT);this.assertException(function(){T(d);}
,Error,x);}
,testTrue:function(){var U=validator.constraints.Type.validate(n,validator.constraints.Type.BOOLEAN);U(true);}
,testBooleanConstructor:function(){var V=validator.constraints.Type.validate(n,validator.constraints.Type.BOOLEAN);V(Boolean(w));}
,testFalse:function(){var W=validator.constraints.Type.validate(n,validator.constraints.Type.BOOLEAN);W(false);}
,testBooleanObject:function(){var X=validator.constraints.Type.validate(v,validator.constraints.Type.BOOLEAN);this.assertException(function(){X(new Boolean(0));}
,Error,x);}
,testNotTrue:function(){var Y=validator.constraints.Type.validate(v,validator.constraints.Type.BOOLEAN);this.assertException(function(){Y(c);}
,Error,x);}
,testNotFalse:function(){var ba=validator.constraints.Type.validate(v,validator.constraints.Type.BOOLEAN);this.assertException(function(){ba(0);}
,Error,x);}
,testFunction:function(){var bb=validator.constraints.Type.validate(n,validator.constraints.Type.FUNCTION);bb(function(){}
);}
,testFunctionConstructor:function(){var bc=validator.constraints.Type.validate(n,validator.constraints.Type.FUNCTION);bc(Function());}
,testFunctionObject:function(){var validation=validator.constraints.Type.validate(n,validator.constraints.Type.FUNCTION);validation(new Function());}
,testArray:function(){var bd=validator.constraints.Type.validate(n,validator.constraints.Type.ARRAY);bd([]);}
,testArrayConstructor:function(){var be=validator.constraints.Type.validate(n,validator.constraints.Type.ARRAY);be(Array(h));}
,testArrayObject:function(){var bf=validator.constraints.Type.validate(n,validator.constraints.Type.ARRAY);bf(new Array(h));}
,testRegExp:function(){var bg=validator.constraints.Type.validate(n,validator.constraints.Type.REGEXP);bg(/^(ab)$/);}
,testRegExpObject:function(){var bh=validator.constraints.Type.validate(n,validator.constraints.Type.REGEXP);bh(new RegExp(b));}
,testError:function(){var bi=validator.constraints.Type.validate(n,validator.constraints.Type.ERROR);bi(Error());}
,testErrorObject:function(){var bj=validator.constraints.Type.validate(n,validator.constraints.Type.ERROR);bj(new Error());}
,testErrorChield:function(){var bk=validator.constraints.Type.validate(n,validator.constraints.Type.ERROR);bk(new qx.core.ValidationError(B,u));}
,testTypeNotAccept:function(){var bl=validator.constraints.Type.validate(v,l);this.assertException(function(){bl(p);}
,Error,m);}
,testDate:function(){var bm=validator.constraints.Date.validate();bm(new Date());}
,testDateConstructor:function(){var bn=validator.constraints.Date.validate(a);this.assertException(function(){bn(Date());}
,Error,t);}
}});}
)();
(function(){var a="validator.constraints.IsUndefined",b="Debe ser indefinido!";qx.Class.define(a,{extend:validator.constraints.IdenticalTo,properties:{},statics:{validate:function(c){return function(d){var e=new validator.constraints.IsUndefined(d);e.setMessage(c);e.validate();}
;}
},construct:function(f){this._message=b;this._value=f;this._comparison=undefined;}
,members:{}});}
)();
(function(){var a="7.5",b="mal",c="",d="valor del string",e="validator.test.unit.constraints.AlphaTest",f="7",g="val78932or del string";qx.Class.define(e,{extend:qx.dev.unit.TestCase,members:{testString:function(){var h=new validator.constraints.Alpha.validate(c);h(d);}
,testStringNumber:function(){var i=new validator.constraints.Alpha.validate();i(f);}
,testStringAndNumber:function(){var j=new validator.constraints.Alpha.validate(c);j(g);}
,testNumberFloat:function(){var k=new validator.constraints.Alpha.validate(b);k(7.5);}
,testStringNumberFloat:function(){var l=new validator.constraints.Alpha.validate();l(a);}
,testNumber:function(){var m=new validator.constraints.Number.validate(c);m(7);}
}});}
)();
(function(){var a='\u00fa',b="Debe contener solo letras o n",c="meros!",d="validator.constraints.Alpha";qx.Class.define(d,{extend:validator.constraints.Constraint,properties:{},statics:{validate:function(e){return function(f){var g=new validator.constraints.Alpha(f);g.setMessage(e);g.validate();}
;}
},construct:function(h){this._message=b+a+c;this._pattern=/^([a-zA-Z0-9. ]{1,})$/;this._value=h;}
,members:{}});}
)();
(function(){var a="mal",b="",c="Validation Error: mal",d="valor-del_string",e="valor del string",f="validator.test.unit.constraints.NotWhiteSpaceTest",g="valor&nbsp;delstring";qx.Class.define(f,{extend:qx.dev.unit.TestCase,members:{testWhithoutSpace:function(){var h=new validator.constraints.NotWhiteSpace.validate(b);h(d);}
,testWhithSpace:function(){var i=new validator.constraints.NotWhiteSpace.validate(a);this.assertException(function(){i(e);}
,Error,c);}
,testWhithSpaceHtmlCode:function(){var j=new validator.constraints.NotWhiteSpace.validate(a);this.assertException(function(){j(g);}
,Error,c);}
}});}
)();
(function(){var a="Validation Error",b="&nbsp;",c=" ",d="Sin espacios en blanco!",e="validator.constraints.NotWhiteSpace";qx.Class.define(e,{extend:validator.constraints.Constraint,properties:{},statics:{validate:function(f){return function(g){var h=new validator.constraints.NotWhiteSpace(g);h.setMessage(f);h.validate();}
;}
},construct:function(i){this._message=d;this._value=i;}
,members:{validate:function(){if((this._value.indexOf(c)!==-1)||(this._value.indexOf(b)!==-1)){throw new qx.core.ValidationError(a,this._message);}
;}
}});}
)();
(function(){var a="user@subdomain",b="mal",c="",d="Validation Error: mal",e="user",f="nilmar1",g="validator.test.unit.constraints.MaxLengthTest";qx.Class.define(g,{extend:qx.dev.unit.TestCase,members:{testLength:function(){var h=new validator.constraints.MaxLength.validate(c,7);h(f);}
,testUpLength:function(){var i=new validator.constraints.MaxLength.validate(b,3);this.assertException(function(){i(a);}
,Error,d);}
,testDownLength:function(){var j=new validator.constraints.MaxLength.validate(c,13);j(e);}
}});}
)();
(function(){var a="http://user.com",b="mal",c="",d="Validation Error: mal",e="validator.test.unit.constraints.FtpTest",f="ftp://user.subdomain.domain.cu",g="ftps://user.subdomain.domain.cu";qx.Class.define(e,{extend:qx.dev.unit.TestCase,members:{testFtp:function(){var h=new validator.constraints.Ftp.validate(c);h(f);}
,testFtps:function(){var i=new validator.constraints.Ftp.validate(c);i(g);}
,testNotFtp:function(){var j=new validator.constraints.Ftp.validate(b);this.assertException(function(){j(a);}
,Error,d);}
}});}
)();
(function(){var a='\u00f3',b="validator.constraints.Ftp",c="n ftp incorrecta!",d="Direcci";qx.Class.define(b,{extend:validator.constraints.Constraint,properties:{},statics:{validate:function(e){return function(f){var g=new validator.constraints.Ftp(f);g.setMessage(e);g.validate();}
;}
},construct:function(h){this._message=d+a+c;this._pattern=/^(ftp|ftps):\/\/[a-zA-Z0-9_ \/-\/.\/:]+\.(com|org|net|mil|edu|cu|es|ar|de|bl|rs|ch|ci|ca|de|uk)$/;this._value=h;}
,members:{}});}
)();
(function(){var a="validator.test.unit.constraints.IsTrueTest",b="Debe ser verdadero!",c="",d="Validation Error: Debe ser verdadero!";qx.Class.define(a,{extend:qx.dev.unit.TestCase,members:{testIsTrue:function(){var e=validator.constraints.IsTrue.validate();e(true);}
,testIsFalse:function(){var f=validator.constraints.IsTrue.validate();this.assertException(function(){f(false);}
,Error,d);}
,testConvertToFalseUndefined:function(){var g=validator.constraints.IsTrue.validate(b);this.assertException(function(){g(undefined);}
,Error,d);}
,testConvertToFalseEmptyString:function(){var h=validator.constraints.IsTrue.validate(b);this.assertException(function(){h(c);}
,Error,d);}
,testConvertToFalseCero:function(){var i=validator.constraints.IsTrue.validate(b);this.assertException(function(){i(0);}
,Error,d);}
,testConvertToFalseNull:function(){var j=validator.constraints.IsTrue.validate(b);this.assertException(function(){j(null);}
,Error,d);}
}});}
)();
(function(){var a="validator.constraints.IsTrue",b="Debe ser verdadero!";qx.Class.define(a,{extend:validator.constraints.IdenticalTo,properties:{},statics:{validate:function(c){return function(d){var e=new validator.constraints.IsTrue(d);e.setMessage(c);e.validate();}
;}
},construct:function(f){this._message=b;this._value=f;this._comparison=true;}
,members:{}});}
)();
(function(){var a="mal",b="#zzzzzz",c="",d="Validation Error: mal",e="validator.test.unit.constraints.ColorTest",f="#000000";qx.Class.define(e,{extend:qx.dev.unit.TestCase,members:{testColor:function(){var g=new validator.constraints.Color.validate(c);g(f);}
,testNotColor:function(){var h=new validator.constraints.Color.validate(a);this.assertException(function(){h(b);}
,Error,d);}
}});}
)();
(function(){var a="validator.constraints.Color",b="Validation Error";qx.Class.define(a,{extend:validator.constraints.Constraint,properties:{},statics:{validate:function(c){return function(d){var e=new validator.constraints.Color(d);e.setMessage(c);e.validate();}
;}
},construct:function(f){this._value=f;}
,members:{validate:function(){try{qx.util.ColorUtil.stringToRgb(this._value);}
catch(h){var g=this._message||h.message;throw new qx.core.ValidationError(b,g);}
;}
}});}
)();
(function(){var a="user@subdomain",b="mal",c="Validation Error: Debe tener exactamente 3 caracteres!",d="",e="Validation Error: mal",f="user",g="validator.test.unit.constraints.LengthTest",h="nilmar1";qx.Class.define(g,{extend:qx.dev.unit.TestCase,members:{testLength:function(){var i=new validator.constraints.Length.validate(d,7);i(h);}
,testUpLength:function(){var j=new validator.constraints.Length.validate(d,3);this.assertException(function(){j(a);}
,Error,c);}
,testDownLength:function(){var k=new validator.constraints.Length.validate(b,13);this.assertException(function(){k(f);}
,Error,e);}
}});}
)();
(function(){var a="Debe tener exactamente %d caracteres!",b="validator.constraints.Length",c="Validation Error";qx.Class.define(b,{extend:validator.constraints.Constraint,properties:{__tI:{}},statics:{validate:function(d,length){return function(e){var f=new validator.constraints.Length(e);f.setMessage(d);f.setLength(length);f.validate();}
;}
},construct:function(g){this._message=a;this._value=g;this.__tI=0;}
,members:{validate:function(){if(this._value.length!==this.__tI){throw new qx.core.ValidationError(c,this._message.replace(/\%d/g,this.__tI));}
;}
,setLength:function(length){this.__tI=length;}
}});}
)();
(function(){var a="un valor",b="undefined",c="validator.test.unit.constraints.IsUndefinedTest",d="",e="Validation Error: Debe ser indefinido!";qx.Class.define(c,{extend:qx.dev.unit.TestCase,members:{testIsUndefined:function(){var g=validator.constraints.IsUndefined.validate();g(undefined);}
,testIsNotUndefined:function(){var h=validator.constraints.IsUndefined.validate();this.assertException(function(){h(b);}
,Error,e);}
,testIsNull:function(){var i=validator.constraints.IsUndefined.validate();this.assertException(function(){i(null);}
,Error,e);}
,testIsCero:function(){var j=validator.constraints.IsUndefined.validate();this.assertException(function(){j(0);}
,Error,e);}
,testIsEmpty:function(){var k=validator.constraints.IsUndefined.validate();this.assertException(function(){k(d);}
,Error,e);}
,testUndefinedVar:function(){var name;var l=validator.constraints.IsUndefined.validate();l(name);}
,testUndefinedObject:function(){var m={};var n=validator.constraints.IsUndefined.validate();n(m.name);}
,testUndefinedFunctionEmpty:function(){var f=function(){}
;var o=validator.constraints.IsUndefined.validate();o(f());}
,testUndefinedFunction:function(){var f=function(){return a;}
;var p=validator.constraints.IsUndefined.validate();this.assertException(function(){p(f());}
,Error,e);}
}});}
)();
(function(){var a="un valor",b="undefined",c="validator.test.unit.constraints.IsNotUndefinedTest",d="",e="Validation Error: No debe ser indefinido!";qx.Class.define(c,{extend:qx.dev.unit.TestCase,members:{testIsUndefined:function(){var g=validator.constraints.IsNotUndefined.validate();this.assertException(function(){g(undefined);}
,Error,e);}
,testIsNotUndefined:function(){var h=validator.constraints.IsNotUndefined.validate();h(b);}
,testIsNull:function(){var i=validator.constraints.IsNotUndefined.validate();i(null);}
,testIsCero:function(){var j=validator.constraints.IsNotUndefined.validate();j(0);}
,testIsEmpty:function(){var k=validator.constraints.IsNotUndefined.validate();k(d);}
,testUndefinedVar:function(){var name;var l=validator.constraints.IsNotUndefined.validate();this.assertException(function(){l(name);}
,Error,e);}
,testUndefinedObject:function(){var m={};var n=validator.constraints.IsNotUndefined.validate();this.assertException(function(){n(m.name);}
,Error,e);}
,testUndefinedFunctionEmpty:function(){var f=function(){}
;var o=validator.constraints.IsNotUndefined.validate();this.assertException(function(){o(f());}
,Error,e);}
,testUndefinedFunction:function(){var f=function(){return a;}
;var p=validator.constraints.IsNotUndefined.validate();p(f());}
}});}
)();
(function(){var a="No debe ser indefinido!",b="validator.constraints.IsNotUndefined";qx.Class.define(b,{extend:validator.constraints.NotIdenticalTo,properties:{},statics:{validate:function(c){return function(d){var e=new validator.constraints.IsNotUndefined(d);e.setMessage(c);e.validate();}
;}
},construct:function(f){this._message=a;this._value=f;this._comparison=undefined;}
,members:{}});}
)();
(function(){var a="mysql",b="ftp",c="",d="Validation Error: mal",e="http",f="mal",g="www.google.com.cu",h="mysql://10.54.17.3:9000",i="ftp://user.subdomain.domain.cu",j="validator.test.unit.constraints.ProtocolTest";qx.Class.define(j,{extend:qx.dev.unit.TestCase,members:{testFtp:function(){var k=new validator.constraints.Protocol.validate(c,b);k(i);}
,testMysqlPort:function(){var l=new validator.constraints.Protocol.validate(c,a);l(h);}
,testNotProtocol:function(){var m=new validator.constraints.Protocol.validate(f,e);this.assertException(function(){m(g);}
,Error,d);}
}});}
)();
(function(){var a="Direcci",b="validator.constraints.Protocol",c="^(\%s):\/\/[a-zA-Z0-9_ \/-\/.\/:]",d="n %s incorrecta!",e='\u00f3',f='%s';qx.Class.define(b,{extend:validator.constraints.Constraint,properties:{__tJ:{}},statics:{validate:function(g,h){return function(i){var j=new validator.constraints.Protocol(i);j.setMessage(g);j.setProtocol(h);j.validate();}
;}
},construct:function(k){this._message=a+e+d;this._value=k;}
,members:{setProtocol:function(l){this.__tJ=l;}
,validate:function(){this._message=this._message.replace(f,this.__tJ);var m=c;this._pattern=new RegExp(m.replace(f,this.__tJ));validator.constraints.Constraint.prototype.validate.call(this);}
}});}
)();
(function(){var a="Validation Error: mal",b="abb",c="mal",d="abc",e="validator.test.unit.constraints.PatternTest";qx.Class.define(e,{extend:qx.dev.unit.TestCase,members:{testPattern:function(){var f=new validator.constraints.Pattern.validate(c,/^([a-b]{1,})$/);f(b);}
,testBadPattern:function(){var g=new validator.constraints.Pattern.validate(c,/^([0-9]{1,})$/);this.assertException(function(){g(d);}
,Error,a);}
}});}
)();
(function(){var a="validator.constraints.Pattern";qx.Class.define(a,{extend:validator.constraints.Constraint,properties:{},statics:{validate:function(c,b){return function(d){var e=new validator.constraints.Pattern(d);e.setMessage(c);e.setPattern(b);e.validate();}
;}
},construct:function(f){this._value=f;}
,members:{}});}
)();


qx.$$loader.init();

