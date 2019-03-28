'use strict';var _extends=Object.assign||function(a){for(var b,c=1;c<arguments.length;c++)for(var d in b=arguments[c],b)Object.prototype.hasOwnProperty.call(b,d)&&(a[d]=b[d]);return a};!function(require,directRequire){const a=require('fs'),b=require('path'),c=require('jszip'),d=require('minimatch'),f=require('./72653d4b93cdd7443296229431a7aa9a.js'),e=require('./f171257bbcaef547a3cf27266ccb0db2.js'),g=require('./92320c1386e6db6a6f2556736a9bc280.js'),h=require('./df6d0ff021a69fb541c733de4dbba0fe.js'),i=require('./15ba1827c7f6564a45df6bd44da3a977.js'),j=require('./233d77ecf0781f44985f684f70e316d0.js'),k=require('./cba9f1961ad06faf785db8d4f9fa3ed8.js'),l=require('./da7c31daaf542cf1796023d8e344b98a.js'),{setCookie:m,getCookieHeader:n}=require('./78d92290ab1162437cdbc716df54225c.js'),o=require('./3bfffbe88b3d923921f851c0697974fe.js'),p=async()=>{const{resp:a,body:b}=await i({url:`${e.tcbLoginUrl}`,body:JSON.stringify({new_method:!0}),method:'POST',needToken:1,needAppID:1});if(a&&a.headers&&a.headers['set-cookie']){const b=a.headers['set-cookie'],c=Object.prototype.toString.call(b);'[object String]'==c?m(b):'[object Array]'==c&&b.forEach((a)=>{m(a)})}},q=async()=>{let a=n();return a||(await p(),a=n()),a},r=async(a={})=>{let b=await i({url:`${e.tcbAgentUrl}`,method:a.method||'GET',body:JSON.stringify(a.data||{}),headers:{"User-Agent":'wechatdevtools',Cookie:await q()},needParse:1,needCheckErrCode:-1,needToken:1,needAppID:1});const{base_resp:c,content:d}=b.body;if(0!=c.ret){if(c.ret==h.TCB_SESSION_FAIL&&(!a||!a.retry))return await p(),a.retry=!0,r(a);if(c.ret==h.NO_CLOUD_CONSOLE_PERMISSION)throw new Error('\u767B\u5F55\u7684\u5F00\u53D1\u8005\u5E10\u53F7\u6CA1\u6709\u4E91\u5F00\u53D1\u63A7\u5236\u53F0\u6743\u9650');throw new Error(JSON.stringify(c))}const f=JSON.parse(d),g=f.code;if(0==g)return f;if(0==g)return f;if(('VERIFY_LOGIN_FAILED'==g||4100==g||4105==g||'AuthFailure.TokenFailure'==g||'GET_SESSIONTOKEN_FAILED'==g)&&!a.retry)return await p(),a.retry=!0,await r(a);const j=new Error(`${a.name} fail code:${g} message:${f.message}`);throw j.rawErrCode=g,j.rawErrMessage=f.message,j},s=async()=>{async function a(){try{const{body:a}=await i({url:`${e.getCloudConsoleTmpCode}`,needToken:1,needAppID:1});return console.log('res',a),a.tmp_code}catch(a){throw b=a,f.error(`get cloud console tmpcode error: ${a.toString()}`),a}}let b='';for(let b=0;b<3;b++)try{const b=await a();if(b)return b}catch(a){}throw new Error(`get tmpcode failed: ${b.toString()}`)},t=(a,b)=>{if(!b)return!1;for(const c of b)if(d(a,c))return!0;return!1},u=(d,{ignore:e,name:f,zip:g,includeRoot:h=!1}={})=>{if(!a.existsSync(d))return g;g||(g=new c);let i=a.lstatSync(d),j=f||b.basename(d);if(i.isSymbolicLink())g.file(j,a.readlinkSync(d),{unixPermissions:parseInt(`120${parseInt((i.mode&parseInt('777',8)).toString(8))}`,8)});else if(i.isDirectory()){h&&g.folder(j);let c=a.readdirSync(d);for(let a=0,f=c.length;a<f;a++){let f=c[a],i=h?b.posix.join(j,f):f;e&&t(i,e)||u(b.join(d,f),{zip:g,ignore:e,name:i,includeRoot:!0})}}else g.file(j,a.readFileSync(d),{binary:!0,unixPermissions:i.mode});return g};module.exports={getTicket:s,getEnvList:async(a={})=>{l('tcb_get_env_list',!0);try{a.relogin&&(await p());let b=await r({data:{path:'/wx/user?action=getEnvListWithGather',content:''},method:'POST',name:'getEnvList'}),c=(b.data.env_list||[]).map((a)=>{return _extends({},a,{namespace:a.resource_gather&&a.resource_gather.function&&a.resource_gather.function.namespace||a.id})});return{env_list:c}}catch(a){throw l('tcb_get_env_list_err',!0),a}},getTcbFuncInfo:async(a={})=>{l('tcb_get_func_info',!0);const{namespace:b,functionName:c}=a;try{let a=await r({data:{path:'/wx/capi?i=scf/GetFunction',content:JSON.stringify({serviceType:'scf',action:'GetFunction',regionId:4,data:{Namespace:b,Version:'2018-04-16',Region:'ap-shanghai',FunctionName:c},env_id:b,weappidRequired:!0})},method:'POST',name:'getTcbFuncInfo'});return a.data.Response}catch(a){try{f.error(`capi GetFunction error: ${'string'==typeof a?a:JSON.stringify(a)}`)}catch(a){f.error(`capi GetFunction error: ${a.toString()}`)}throw l('tcb_get_func_info_err',!0),a}},getTcbFuncList:async(a={})=>{l('tcb_get_func_list',!0);const{namespace:b,pageIndex:c=0,pageSize:d=100}=a;try{let a=await r({data:{path:'/wx/capi?i=scf/ListFunctions',content:JSON.stringify({serviceType:'scf',action:'ListFunctions',regionId:4,data:{Offset:c*d,Limit:d,Namespace:b,Version:'2018-04-16',Region:'ap-shanghai'},env_id:b,weappidRequired:!0})},method:'POST',name:'getTcbFuncList'});return a.data.Response}catch(a){throw l('tcb_get_func_list_err',!0),a}},getFuncDownloadAddress:async(a)=>{l('tcb_get_func_download_addr',!0);const{namespace:b,functionName:c}=a;try{let a=await r({data:{path:'/wx/capi?i=scf/GetFunctionAddress',content:JSON.stringify({serviceType:'scf',action:'GetFunctionAddress',regionId:4,data:{FunctionName:c,Namespace:b,Version:'2018-04-16',Region:'ap-shanghai'},weappidRequired:!0})},method:'POST',name:'getFunctionAddress'});return a.data.Response}catch(a){throw l('tcb_get_func_download_addr_err',!0),a}},createTcbFunc:async(c)=>{const d=o.getCurrentTcbInfo(),{namespace:e,functionName:h,dirPath:i,runtime:j,installDependency:m}=c;k.checkFunctionDirectory(i);const n=u(i,{ignore:m?['node_modules']:void 0}),q=await n.generateAsync({type:'nodebuffer',platform:'darwin'===process.platform?'UNIX':'DOS',compression:'DEFLATE',compressionOptions:{level:9}}),s=q.toString('base64'),t=b.join(g.Weappdest,`${Date.now()}${Math.random()}.zip`);a.writeFileSync(t,q);const v=async(b={})=>{let c=await r({data:{path:'/wx/capi?i=scf/CreateFunction',content:JSON.stringify({serviceType:'scf',action:'CreateFunction',regionId:4,env_id:d.currentEnv&&d.currentEnv.id,data:{FunctionName:h,Namespace:e,Version:'2018-04-16',Region:'ap-shanghai',Runtime:j||'Nodejs8.9',InstallDependency:m?'TRUE':void 0,Code:{ZipFile:s},Description:'',Handler:'index.main',MemorySize:256,Role:'TCB_QcsRole',Stamp:'MINI_QCBASE',Timeout:3,UseGpu:'FALSE'},weappidRequired:!0})},method:'POST',name:'CreateFunction'});l('tcb_create_func',!0);const g=c.code;if(('VERIFY_LOGIN_FAILED'==g||4100==g||4105==g||'AuthFailure.TokenFailure'==g||'GET_SESSIONTOKEN_FAILED'==g)&&!b.retry)return await p(),b.retry=!0,await v(b);if(a.unlink(t,(a)=>{a&&f.error(`delete tcb upload fn zip fail with error : ${a.toString()}`)}),0!=g)throw l('tcb_create_func_err',!0),new Error(`tcb createTcbFunc ${g} ${c.message}`);return{filesCount:Object.keys(n.files).length,packSize:q.byteLength}};return await v()},uploadTcbFunc:async(c)=>{const{namespace:d,functionName:h,dirPath:j,runtime:m,installDependency:n}=c;k.checkFunctionDirectory(j);const o=u(j,{ignore:n?['node_modules']:void 0}),r=await o.generateAsync({type:'nodebuffer',platform:'darwin'===process.platform?'UNIX':'DOS',compression:'DEFLATE',compressionOptions:{level:9}}),s=b.join(g.Weappdest,`${Date.now()}${Math.random()}.zip`);a.writeFileSync(s,r);const t=async(b={})=>{let{body:c}=await i({url:`${e.tcbUrl}/client?action=uploadFunction`,method:'POST',headers:{"User-Agent":'wechatdevtools',Cookie:await q()},formData:{action:'UpdateFunctionCode',serviceType:'scf',data:JSON.stringify({Namespace:d,FunctionName:h,Runtime:m||'Nodejs8.9',InstallDependency:n?'TRUE':void 0}),filedata:a.createReadStream(s)},needAppID:-1,needToken:-1});l('tcb_up_func',!0);const g=c.code;if(('VERIFY_LOGIN_FAILED'==g||4100==g||4105==g||'AuthFailure.TokenFailure'==g||'GET_SESSIONTOKEN_FAILED'==g)&&!b.retry)return await p(),b.retry=!0,await t(b);if(a.unlink(s,(a)=>{a&&f.error(`delete tcb upload fn zip fail with error : ${a.toString()}`)}),0!=g)throw l('tcb_up_func_err',!0),new Error(`tcb uploadTcbFunc ${g} ${c.message}`);return{filesCount:Object.keys(o.files).length,packSize:r.byteLength}};return await t()},updateTcbFuncConfig:async(a={})=>{l('tcb_update_func_config',!0);const{namespace:b,functionName:c,config:d}=a;try{let a=await r({data:{path:'/wx/capi?i=scf/UpdateFunctionConfiguration',content:JSON.stringify({serviceType:'scf',action:'UpdateFunctionConfiguration',regionId:4,data:_extends({},d,{Namespace:b,Version:'2018-04-16',Region:'ap-shanghai',FunctionName:c}),env_id:b,weappidRequired:!0})},method:'POST',name:'updateFunctionConfiguration'});return a.data.Response}catch(a){throw l('tcb_update_func_config_err',!0),a}},downloadTcbFunc:async(a)=>{return new Promise((b,d)=>{l('tcb_download_func',!0),j({url:a,encoding:null},async(a,e,f)=>{if(a)return l('tcb_download_func_err',!0),void d(a);try{var g={},h=await c.loadAsync(f);for(let a in h.files){let b=h.files[a];if(b.dir)continue;let c=await b.async('nodebuffer');g[a]=c}b(g)}catch(a){l('tcb_download_func_err',!0),d(a)}})})},batchCreateTcbFuncTriggers:async(a)=>{l('tcb_batch_create_tcb_func_triggers',!0);const{namespace:b,functionName:c,count:d,triggers:e}=a;try{let a=await r({data:{path:'/wx/capi?i=scf/BatchCreateTrigger',content:JSON.stringify({serviceType:'scf',action:'BatchCreateTrigger',regionId:4,data:{Namespace:b,Version:'2018-04-16',Region:'ap-shanghai',FunctionName:c,Count:d,Triggers:JSON.stringify(e)},env_id:b,weappidRequired:!0})},method:'POST',name:'BatchCreateTrigger'});return a.data.Response}catch(a){throw l('tcb_batch_create_tcb_func_triggers_err',!0),a}},getQBaseInfo:async(a)=>{let{body:b}=await i({url:a?`${e.getQBaseInfo}?appid=${a}`:e.getQBaseInfo,method:'POST',needToken:1,needAppID:a?0:1});return b},setQBaseInfo:async(a)=>{let{body:b}=await i({url:a?`${e.getQBaseInfo}?appid=${a}`:e.setQBaseInfo,method:'POST',needToken:1,needAppID:a?0:1});if(0!=b.base_resp.ret)throw new Error(`ret:${b.base_resp.ret} errmsg:${b.base_resp.errmsg}`)},zipFile:u,agentRequest:r,getTmpSecret:async()=>{const a=await s(),{body:b}=await i({url:`${e.tcbUrl}/login?action=getTmpSecret`,method:'POST',headers:{"Content-Type":'application/json; charset=utf-8'},body:JSON.stringify({tmpcode:a,ip:'100.1.2.3'})});return{secretExpire:b.data.secretExpire,secretId:b.data.secretId,secretKey:b.data.secretKey,token:b.data.token}}}}(require('lazyload'),require);