;!function(require, directRequire){;'use strict';const path=require('path'),fs=require('fs'),tools=require('./84b183688a46c9e2626d3e6f83365e13.js'),locales=require('./common/locales/index.js'),C=require('./56c390e04c10e91a4aa2a2c19d9a885d.js'),appErrcodeConfig=require('./949d8235c744ced2a80121e4dba34c28.js');function checkUsingComponents(a,b){if(a.usingComponents){const{msg:e=[],filePath:c,JSON_PARSE_ERR:d}=b;if('object'!==tools.getType(a.usingComponents)){const a=new Error(locales.config.JSON_CONTENT_SHOULD_BE.format(['usingComponents','object']));throw a.path=c,a.code=d,a}for(const b in a.usingComponents){const c=a.usingComponents[b]||'';if('string'!==tools.getType(c)){e.push(locales.config.JSON_CONTENT_SHOULD_BE.format([`usingComponents['${b}']`,'string']));continue}const d=b.split('*'),f=c.split('*');if(d.length!==f.length){e.push(locales.config.ASTERISK_NOT_MATCH.format(`usingComponents['${b}']`));continue}if(1<d.length&&0===c.indexOf('plugin://')){e.push(locales.config.PLUGIN_NOT_SUPPORT_ASTERISK.format(`usingComponents['${b}']`));continue}}if(0<e.length){const a=new Error(e.join('\n'));throw a.path=c,a.code=appErrcodeConfig.JSON_PARSE_ERR,a}}}module.exports={checkUsingComponents};
;}(require("lazyload"), require);
