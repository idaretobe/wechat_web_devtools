'use strict';var _extends=Object.assign||function(a){for(var b,c=1;c<arguments.length;c++)for(var d in b=arguments[c],b)Object.prototype.hasOwnProperty.call(b,d)&&(a[d]=b[d]);return a};!function(require,directRequire){function a(a){const b=[];for(const c in a)'version'!=c&&b.push({name:a[c],value:c});return b}const b=require('lodash'),{REHYDRATE:c}=require('redux-persist/lib/constants'),d=require('./0634ee2ebd3e560d9d4804ecc960160f.js'),e=require('./fb65fe0edb2920692c36e675e79d61c1.js'),f=()=>({sceneMap:e.sceneMap,sceneList:a(e.sceneMap),searchQuery:{serviceList:[]},bbsConfig:[]});module.exports=function(g=f(),h){switch(h.type){case d.CONFIG_SYNC_STORE:return _extends({},g,h.data);case d.CONFIG_UPDATE_SCENE_INFO:{let b=g.sceneMap;return h.data.version>g.sceneMap.version&&(b=h.data),_extends({},g,{sceneMap:b,sceneList:a(b)})}case d.CONFIG_UPDATE_SEARCH_QUERY:return _extends({},g,{searchQuery:_extends({},g.searchQuery,{serviceList:h.data||[]})});case d.CONFIG_UPDATE_BBS_CONFIG:return _extends({},g,{bbsConfig:h.data||[]});case d.CONFIG_CHANGE_LOCALE:return _extends({},g,{sceneMap:e.sceneMap,sceneList:a(e.sceneMap)});case c:return b.merge(b.cloneDeep(g),h.payload.config||{});default:return g;}}}(require('lazyload'),require);