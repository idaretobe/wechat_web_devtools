;!function(require, directRequire){;'use strict';const path=require('path'),fileUtils=require('./60e94018e5c42875e658435ea04a006d.js'),locales=require('./common/locales/index.js');async function contentWatcher(a){if(!a.pluginRoot)throw new Error(locales.config.PROJECT_JSON_VALUE_NO_FOUND.format('pluginRoot'));const b=path.posix.join(a.projectpath,a.pluginRoot);return await fileUtils(a.projectpath,b)}module.exports=contentWatcher;
;}(require("lazyload"), require);
