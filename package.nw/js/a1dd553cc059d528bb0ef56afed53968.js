;!function(require, directRequire){;'use strict';const tools=require('./84b183688a46c9e2626d3e6f83365e13.js'),C=require('./56c390e04c10e91a4aa2a2c19d9a885d.js'),BaseMessager=directRequire('./214c25062f31e2cad941b3ec069db1fe.js'),hookMethodsCache=require('./c44dddb4ccd769f104fce4a777049908.js'),appserviceMessager=new BaseMessager('APPSERVICE');appserviceMessager.ready=!0,appserviceMessager.publish=function(a){const b=a.data.webviewIds||[];0===b.length?this.broadcast('WEBVIEW',a):'array'===tools.getType(b)&&b.forEach((b)=>{this.transfer(`WEBVIEW_${b}`,a)})},appserviceMessager.triggerOnEvent=function({eventName:a,data:b,webviewID:c}){const d=C.SIMULATOR_PLUGIN_HOOK_METHODS.APPSERVICE,e=(b)=>{hookMethodsCache.has({command:d.onAfterTriggerEvent,api:a})&&appserviceMessager.simulatorPluginMessager&&appserviceMessager.simulatorPluginMessager.simulatorHookMethodCallback(d.onAfterTriggerEvent,hookMethodsCache.get({command:d.onAfterTriggerEvent,api:a}),b||{},a)};hookMethodsCache.has({command:d.onBeforeTriggerEvent,api:a})?appserviceMessager.simulatorPluginMessager&&appserviceMessager.simulatorPluginMessager.simulatorHookMethodCallback(d.onBeforeTriggerEvent,hookMethodsCache.get({command:d.onBeforeTriggerEvent,api:a}),b,a).then((b)=>{if(b.preventDefault){const a=b.eventName;return void this.send({command:'APPSERVICE_ON_EVENT',data:{eventName:a,data:b.data},webviewID:c})}this.send({command:'APPSERVICE_ON_EVENT',data:{eventName:a,data:b.data},webviewID:c}),e(b.data)}):(this.send({command:'APPSERVICE_ON_EVENT',data:{eventName:a,data:b},webviewID:c}),e(b))},appserviceMessager.invokeCallback=function(a,b){this.send({command:'APPSERVICE_INVOKE_CALLBACK',data:{callbackID:a,res:b}})},module.exports=appserviceMessager;
;}(require("lazyload"), require);
