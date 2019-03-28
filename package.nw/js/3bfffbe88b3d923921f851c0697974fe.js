'use strict';var _extends=Object.assign||function(a){for(var b,c=1;c<arguments.length;c++)for(var d in b=arguments[c],b)Object.prototype.hasOwnProperty.call(b,d)&&(a[d]=b[d]);return a};!function(require,directRequire){function a(){const a=k.getState();return a.project.current}function b(){const b=a(),c=b&&(b.runtimeAttr||b.attr)||{};return c.setting||(c.setting=_extends({},l.setting)),c.network||(c.network={RequestDomain:[],DownloadDomain:[],WsRequestDomain:[],UploadDomain:[]}),c}function c(){const a=k.getState();return a.project.list}function d(){a();return`http://127.0.0.1:${global.proxyPort}/__pageframe__/`}function e(b=null,c=!0){let d;return d=b?b:a(),d?c&&d.attr&&d.attr.platform&&d.runtimeAttr&&d.runtimeAttr.isExtAppId?d.runtimeAttr.appid:d.appid:void 0}const f=require('querystring'),g=require('path'),h=require('url'),i=require('./84858de8a097c9cf84ff2c2e3d86e2a9.js'),j=require('./92320c1386e6db6a6f2556736a9bc280.js'),k=require('./bc78839ccca8df9e5ceeb7fae11b7be2.js'),l=require('./6242f55dbdfe53c2f07b7a51568311f2.js'),m=require('./efd8b4323f89b2a759d044d894e3a4f0.js'),n=require('./162bf2ee28b76d3b3d95b685cede4146.js'),o=require('./1dea83a77e99a7c94f6b6f01f5c175b0.js'),p=require('./1bd2563d13db26950ae47494b2c34454.js'),q=require('./15ba1827c7f6564a45df6bd44da3a977.js'),r=require('./f171257bbcaef547a3cf27266ccb0db2.js'),s=require('./df6d0ff021a69fb541c733de4dbba0fe.js'),t=require('./0634ee2ebd3e560d9d4804ecc960160f.js'),u=require('./d28a711224425b00101635efe1034c99.js'),v=require('./72653d4b93cdd7443296229431a7aa9a.js'),w=require('./56c390e04c10e91a4aa2a2c19d9a885d.js'),{whiteFileExtName:x,gameWhiteFileExtName:y}=require('./6242f55dbdfe53c2f07b7a51568311f2.js'),{default_weapp_header:z}=require('./5498e660c05c574f739a28bd5d202cfa.js'),A=function(){let a=!0,b=!1,c=!1;return function(d,e){if(b)return a;if(c)return!0;const f=d().project.current;return f&&f.attr?(c=!0,q({url:r.getTGitUrl,method:'get',needToken:1,needAppID:1}).then(()=>{console.log('check tgit success, hastgit = true'),c=!1,a=!0,b=!0}).catch((f)=>{c=!1,b=!0,f&&f.errcode==s.DEV_CLOUD_NO_TGIT_PROJECT||f.errcode==s.DEV_CLOUD_NO_CLOUD_ACCOUNT?(console.log('check tgit success, hastgit = false'),a=!1):(console.log('check tgit success, hastgit = true'),a=!0);const g=d(),h=g.project.current;h&&h.attr&&e({type:t.PROJECT_UPDATE_ATTR,data:{hasTGit:a}})}),!0):!0}}(),B=(a=[],b={})=>new Promise(async(c,d)=>{function e(a){return{version:a.custom_version,innerVersion:a.inner_version,updateTime:a.update_time,desc:a.version_desc,pkgSize:a.pkg_size}}try{const{withHistory:f}=b,g=[];for(const b of a)g.push({plugin_id:b.appid,custom_version:b.version});if(0===g.length)return c();try{const{resp:a,body:b}=await q({url:r.batchGetPluginInfo,method:'POST',needToken:1,needAppID:1,body:JSON.stringify({need_history:f?1:0,plugin_list:g})});if(b&&b.plugin_list){const a=b.plugin_list.map((a)=>{let b,c,d;return a.req_version&&(b=e(a.req_version)),a.latest_version&&(c=e(a.latest_version)),a.version_list&&a.version_list.length&&(d=a.version_list.map(e)),{appid:a.plugin_id,name:a.nickname,brandIconURL:a.brandiconurl,headImgURL:a.headimgurl,onlineVersion:a.online_custom_version,current:b,latest:c,history:d}});c(a)}else if(!b){const b=`get plugin info response error: empty response body. status: ${a.statusCode}`;v.error(b),d(b)}else{const b=`get plugin info response error: empty plugin list. status: ${a.statusCode}`;v.error(b),d(b)}}catch(a){d(a)}}catch(a){d(a)}}),C=async(a,b,c)=>{if(!a||a===w.TOURIST_APPID)return{};let d=b?r.getWeappAttrURL:`${r.getWeappAttrURL}?appid=${a}`;const{body:f}=await q({url:d,body:JSON.stringify({appid_list:[a]}),method:'post',needToken:1,needAppID:b?1:-1,project:c}),e=f.attr_list[0],g=e.jsapi_list||[],h={};for(const d of g)h[d.name]=d;const i=!!e.is_platform,j={appid:e.appid,appName:e.appname,appImageUrl:e.appicon_url?`${e.appicon_url}/0`:z,gameApp:!!e.game_app,isSandbox:e.is_sandbox,hasTGit:A(k.getState,k.dispatch),authQY:!!e.auth_qy,searchWidget:!!e.open_search_widget,platform:i,platformNickname:e.platform_nickname||'',permission:h,permissionBitset:e.jsapi_permission_list,setting:_extends({},l.setting,e.Setting),network:e.Network,share_info:e.share_info,released:e.released,minPublicLibVersion:e.min_pub_version,userbanded:!0,appType:e.app_type||0,qbaseInfo:e.qbase_info||{},tcbCDNDomain:e.tcb_cdn_domain};if(e.qcloud_attr_json){const a=JSON.parse(e.qcloud_attr_json);j.qcloud=a}let m={};if(f.GlobalConfigJson){try{m=JSON.parse(f.GlobalConfigJson)}catch(a){v.error(`parse GlobalConfigJson "${f.GlobalConfigJson}" catch error: ${a}`)}j.setting=_extends({},j.setting,m)}return j},D=(b=null)=>{return b=b||a(),!!b&&b.attr&&b.attr.gameApp};module.exports={getCurrent:a,getCurrentConfig:function(){const b=a(),c=b&&b.attr||{};return c.setting||(c.setting=_extends({},l.setting)),c.network||(c.network={RequestDomain:[],DownloadDomain:[],WsRequestDomain:[],UploadDomain:[]}),c},getCurrentRuntimeConfig:b,getProjectByHash:function(a){const b=k.getState();if(b.project.current.hash==a)return b.project.current;const c=b.project.list;for(const b in c)if(c[b].hash===a)return c[b]},getCurrentRuntimeShareInfo:function(){const a=b();return a.share_info||[]},getProjectList:c,formatAppIDQuery:function(b){const c=b||a()||{},d=c.runtimeAttr||{},e=c.attr||{},g={appid:c.appid,platform:e.platform?1:0,ext_appid:''};return e.platform&&d.isExtAppId&&(g.ext_appid=d.appid||''),f.stringify(g)},getBaseURL:d,getProjectAppID:e,getShowName:function(){const b=a();return b.attr&&b.attr.appName||b.projectname},getResourceUrl:function(a=''){const b=h.parse(a);return'http:'==b.protocol||'https:'==b.protocol?a:'wxfile:'==b.protocol?a.replace('wxfile://','http://wxfile.open.weixin.qq.com/'):d()+a},getCompileCondiction:function(){const b=a();let c;try{const a=b.condiction[b.compileType]||{};c=a.list[a.current]}catch(a){c=void 0}return c},getWeappCodeSize:async function(b){b=b||a();let c,d=0;try{let a;a=D(b)?await p(b):await o(b),a.subPackages&&(c=a.subPackages.map((a)=>{const b=a.root.startsWith('/')?'':'/',c=a.root.endsWith('/')?'':'/';return b+a.root+c}).reduce((a,b)=>{return a[b]=0,a},{}))}catch(a){}const e=await n(b),f=e.getAllFileInfo();let h=0;const i=D(b)?y:x;for(const a in f){const b=g.extname(a);if(i[b]){if(c){const b=a.startsWith('/')?a:'/'+a;for(const e in c)if(b.startsWith(e)){c[e]+=f[a].size,d+=f[a].size;break}}h+=f[a].size}}if(c&&(c.__APP__=h-d),h=parseInt(h/1024)+1,c)for(const a in c)c[a]=(c[a]/1024).toFixed(1);return{total:h,subPackages:c}},isQcloudProject:function(a){const b=a.runtimeAttr||{};return b.qcloud&&b.qcloud.qcloud_status&&1===b.qcloud.qcloud_status.open_qc_account},getCurrentRuntimeDomains:function(){const c=a(),d=b();let e=!1;const f=d.qcloud||{};let g={};if(f.qcloud_status&&1===f.qcloud_status.open_develop_env&&f.qcloud_dev_info&&f.qcloud_dev_info.networking)for(const a in e=!0,g=f.qcloud_dev_info.networking,g)g[a]=g[a].map((b)=>{return b=b.toLowerCase(),'ws_request_domain'==a?/wss?\:\/\//.test(b)?b:`wss://${b}`:/https?\:\/\//.test(b)?b:`https://${b}`});const h=d.network||{},i=h.RequestDomain||[],j=h.WsRequestDomain||[],k=h.DownloadDomain||[],l=h.UploadDomain||[];let m=d.tcbCDNDomain||[];return Array.isArray(m)||(m=[]),-1===m.indexOf('https://tcb-api.tencentcloudapi.com')&&m.push('https://tcb-api.tencentcloudapi.com'),{request:e?i.concat(g.request_domain).concat(m):i.concat(m),socket:e?j.concat(g.ws_request_domain).concat(m):j.concat(m),download:e?k.concat(g.download_domain).concat(m):k.concat(m),upload:e?l.concat(g.upload_domain).concat(m):l.concat(m)}},getLibVersionNumber:function(b){let d;if(!b)d=a();else{const a=c();d=a[b]}try{let a=d.libVersion.split('.').reduce(function(a,b,c,d){return a+b*Math.pow(1e3,d.length-c-1)},0);return isNaN(a)&&(a=999999999),a}catch(a){return 999999999}},getAttrByAppid:C,getLatestProjectAttr:async(b,c=!0)=>{const d=b||a();if(d&&!d.isTourist){const a=e(d,c);return C(a,c,d)}},projectConfigDefault:(a)=>{const b=u.getVendorConfig();return{projectid:`${a.appid}_${a.projectName}`,condiction:{weapp:{current:-1,list:[]},search:{current:-1,list:[]},conversation:{current:-1,list:[]},game:{currentL:-1,list:[]}},setting:{urlCheck:!0,es6:!0,postcss:!0,minified:!0,newFeature:!0,autoAudits:!1},compileType:'weapp',simulatorType:m.wechat,simulatorPluginLibVersion:{},libVersion:b.currentLibVersion,createTime:+new Date,accessTime:+new Date,packOptions:{ignore:[]},debugOptions:{hidedInDevtools:[]}}},getLatestPluginInfo:(b,c={})=>new Promise(async(d,e)=>{try{b=b||a(),b&&b.isTourist&&d();const{withHistory:f,withDependencies:g,includeSelf:h}=c,i=[];if(h&&'plugin'===b.compileType&&i.push({appid:b.appid}),!1!==g){const a=await o(b);if(a.plugins)for(const b in a.plugins)a.plugins[b]&&a.plugins[b].provider&&'dev'!=a.plugins[b].version&&i.push({appid:a.plugins[b].provider,version:a.plugins[b].version})}if(0===i.length)return d();try{const a=await B(i,c);d(a)}catch(a){e(a)}}catch(a){e(a)}}),getTargetPluginInfo:B,getCurrentTcbInfo:()=>{const b=a();return b&&b.tcb||{}},isGameApp:D}}(require('lazyload'),require);