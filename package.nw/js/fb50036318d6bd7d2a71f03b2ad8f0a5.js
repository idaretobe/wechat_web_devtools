;!function(require, directRequire){;'use strict';const _=require('lodash'),actions=require('./0634ee2ebd3e560d9d4804ecc960160f.js'),defaults=require('./5498e660c05c574f739a28bd5d202cfa.js');function getInitialState(){const a=_.cloneDeep(defaults.settings);let b=a;try{b=JSON.parse(localStorage.getItem('reduxPersist:settings')||'')||{}}catch(c){b=a}const c=_.merge({},defaults.settings,b);return c.shortcuts=_.assign({},defaults.settings.shortcuts,b.shortcuts),c.shortcuts._editingShortcuts=!1,c.show=!1,c}module.exports=function(a=getInitialState(),b={}){switch(b.type){case actions.SETTINGS_OPEN_IDE_SETTINGS:return Object.assign({},a,{show:!0,currentCategory:b.category||'proxy'});case actions.SETTINGS_CLOSE_IDE_SETTINGS:return Object.assign({},a,{shortcuts:Object.assign({},a.shortcuts,{_editingShortcuts:!1}),show:!1});case actions.SETTINGS_SAVE_IDE_SETTINGS:return _.merge(JSON.parse(JSON.stringify(a)),b.newSettings);case actions.SETTINGS_SYNC_STORE:return _.merge(JSON.parse(JSON.stringify(a)),b.data,{show:a.show,syncTime:b.syncTime});case actions.SETTINGS_PARTIAL_UPDATE_IDE_SETTINGS:return Object.assign({},a,{[b.section]:Object.assign({},a[b.section],{[b.option]:b.value})});case actions.SETTINGS_RESET_SHORTCUTS:return Object.assign({},a,{shortcuts:_.cloneDeep(defaults.settings.shortcuts)});case actions.SETTINGS_SET_GEO:return Object.assign({},a,{geo:Object.assign({},a.geo,b.data)});case actions.SETTINGS_SET_PROXY:return Object.assign({},a,{proxy:Object.assign({},a.proxy,b.data)});case actions.SETTINGS_SET_SECURITY:return Object.assign({},a,{security:Object.assign({},a.security,b.data)});default:return a;}};
;}(require("lazyload"), require);
