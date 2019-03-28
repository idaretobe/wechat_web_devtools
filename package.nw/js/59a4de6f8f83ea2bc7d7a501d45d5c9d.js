;!function(require, directRequire){;'use strict';const path=require('path'),fs=require('fs'),mkdir=require('mkdir-p'),contentWatcher=require('./162bf2ee28b76d3b3d95b685cede4146.js'),pluginContentWatcher=require('./a63026ab5a5a3c59a61a9749a18aa2ca.js'),compileTypeConfig=require('./9fdd4ac31a05c27355910f0d74accd4c.js'),locales=require('./common/locales/index.js'),checkPageJSON=require('./d260ebf687a29f24aed49f66b233ab7d.js'),checkPluginPageJSON=require('./dedcbe3bc309c536210de2a4e997918e.js'),checkExtJSON=require('./551bb965e1f344281d555a429cd2140c.js'),{bufToUTF8}=require('./efc820e1b92d6e4063535296d4a24213.js'),{FILE_NOT_UTF8}=require('./949d8235c744ced2a80121e4dba34c28.js'),{whiteFileExtName,gameWhiteFileExtName}=require('./6242f55dbdfe53c2f07b7a51568311f2.js'),needUTF8CHECK={".json":!0,".wxml":!0,".wxs":!0},alreadyWrite={".js":!0,".wxss":!0};function compileOther(a,b){const{srcFilePath:c,fileBuffer:d,destFilePath:e}=b,f=path.extname(c);if(needUTF8CHECK[f]){const a=bufToUTF8(d);if(void 0===a){const a=new Error(locales.config.FILE_NOT_UTF8.format(c));throw a.code=FILE_NOT_UTF8,a}}const g=path.dirname(e);mkdir.sync(g),fs.writeFileSync(e,d)}async function compileProjectOther(a,{distPath:b,allPages:c}){const d=a.compileType;let e=await contentWatcher(a),f=e.getAllFile(),g=whiteFileExtName;a.attr&&a.attr.gameApp&&(g=gameWhiteFileExtName);let h=d===compileTypeConfig.plugin?a.miniprogramRoot:'';const i=e.getAllTargetTypeFilesWithOtherTypeFilesOfSameName('json',['wxml','js']),j={};for(const d of f){const c=path.extname(d);if(alreadyWrite[c]||!g[c])continue;if('ext.json'===d){const b=await checkExtJSON(a);if(!b||!b.extEnable)continue}let f=e.getFile(d,null);if('.json'===c&&'app.json'!==d&&'ext.json'!==d&&-1!==i.indexOf(d)){const b=await checkPageJSON(a,d.replace(/\.json$/,''));delete b.__warning__,j[d]=!0,f=new Buffer(JSON.stringify(b),'utf8')}compileOther(a,{fileBuffer:f,srcFilePath:path.join(h,d),destFilePath:path.join(b,h,d)})}for(const d of c){const c=`${d}.json`;if(!j[c]){const e=await checkPageJSON(a,d);delete e.__warning__;const f=new Buffer(JSON.stringify(e),'utf8');compileOther(a,{fileBuffer:f,srcFilePath:path.join(h,c),destFilePath:path.join(b,h,c)})}}if(d===compileTypeConfig.plugin){e=await pluginContentWatcher(a),f=e.getAllFile(),g=whiteFileExtName,h=a.pluginRoot||'',a.attr&&a.attr.gameApp&&(g=gameWhiteFileExtName);for(let c=0,d=f.length;c<d;c++){const d=f[c],i=path.extname(d);if(!alreadyWrite[i]&&g[i]){let c=e.getFile(d,null);if('.json'===i&&'plugin.json'!==d){const b=await checkPluginPageJSON(a,d.replace(/\.json$/,''));c=new Buffer(JSON.stringify(b),'utf8')}compileOther(a,{fileBuffer:c,srcFilePath:path.join(h,d),destFilePath:path.join(b,h,d)})}}fs.writeFileSync(path.join(b,'project.config.json'),JSON.stringify({miniprogramRoot:a.miniprogramRoot,pluginRoot:a.pluginRoot||''}))}fs.existsSync(path.join(b,'project.config.json'))||fs.writeFileSync(path.join(b,'project.config.json'),'{}')}module.exports=compileProjectOther;
;}(require("lazyload"), require);
