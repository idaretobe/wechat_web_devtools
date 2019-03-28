;!function(require, directRequire){;'use strict';const React=require('react'),PropTypes=require('prop-types'),URL=require('url'),_=require('lodash'),HtmlWebview=require('./41c99b908d0cb118c2a6fcf3c306663c.js'),webviewMessager=require('./a15851ca252a104aad8b3fd3fc114574.js'),idepluginMessager=require('./e9e3fd38aeedddd6db73d1d015ff6952.js'),log=require('./72653d4b93cdd7443296229431a7aa9a.js'),appserviceMessager=require('./a1dd553cc059d528bb0ef56afed53968.js'),consoleHandler=require('./919ad605b043ca39c480b04f2062eb9a.js'),projectManager=require('./3bfffbe88b3d923921f851c0697974fe.js'),C=require('./56c390e04c10e91a4aa2a2c19d9a885d.js'),SIMULATOR_TYPE=require('./efd8b4323f89b2a759d044d894e3a4f0.js'),consoleDisplay=require('./2dfc6a3df6d6fc51266b293c8420e88b.js'),locales=require('./common/locales/index.js'),webviewPool=require('./a78e6d6a87de1708226375ca4c320d76.js'),tools=require('./d3976cc01aeebc5b09e11c4135b6bd8d.js'),getSubPackage=require('./d2baddafb02abd034d543c2a31ef97a0.js'),fileSystem=require('./f6cbcecf6ed9f533f6a506310d8f07b6.js'),appErrCode=require('./949d8235c744ced2a80121e4dba34c28.js'),runTask=require('./41168dca39589e852da6631126d0f94d.js'),interfaceCallback=require('./a7261ee5e1a26dddf8d07b048ad1c94d.js'),grabberWebviewManager=require('./87822abadd12d18b00ea00716f2410f6.js'),messageCenter=require('./ff946754202ecf377034d29daac7c8d9.js'),topTools=require('./84b183688a46c9e2626d3e6f83365e13.js'),{errorPrefix}=require('./6242f55dbdfe53c2f07b7a51568311f2.js'),{weappStoreFileReqular,weappTmpFileReqular,weappUsrFileReqular,weappOpendataFileRegular,weappStoreFilePathPrefix,weappTmpFilePathPrefix,weappUsrFilePathPrefix}=require('./6242f55dbdfe53c2f07b7a51568311f2.js'),{validType,tokenManager}=require('./dc244a5ba483ad6e0acd267d3b91b282.js'),hookMethodsCache=require('./c44dddb4ccd769f104fce4a777049908.js');let lastWxmlMsg={};class Webview extends React.Component{constructor(a){super(a),this.updateIdepluginMessager=(a)=>{const b=a.project.simulatorType;this.simulatorType!==b&&(this.simulatorType=b,b!==SIMULATOR_TYPE.wechat&&(this.simulatorPluginMessager=idepluginMessager.get(b),webviewMessager.registerSimulatorPluginMessager(this.simulatorPluginMessager)))},this.consolemessage=(a)=>{const b=a.message;return 0===b.indexOf(errorPrefix.WXS_RUNTIME_ERROR)?void consoleHandler(a):void(this.consoleMsgQueue[b]||(this.consoleMsgQueue[b]=!0,consoleHandler(a)))},this.onWebviewMessage=(a)=>{let b={};try{b=JSON.parse(a)}catch(b){return void log.error(`onWebviewMessage parse ${a} error ${b}`)}if('WEBVIEW_PUBLISH'===b.command)webviewMessager.publish(a);else if('WEBVIEW_INVOKE'===b.command){const a=b.data.api,c=(c)=>{if(c){const e=b.data.callbackID;hookMethodsCache.has({command:d.onAfterInvoke,api:a})?this.simulatorPluginMessager.simulatorHookMethodCallback(d.onAfterInvoke,hookMethodsCache.get({command:d.onAfterInvoke,api:a}),c||{}).then((a)=>{webviewMessager.invokeCallback(this.webviewID,e,a)}):c&&webviewMessager.invokeCallback(this.webviewID,e,c)}},d=C.SIMULATOR_PLUGIN_HOOK_METHODS.WEBVIEW;if(hookMethodsCache.has({command:d.onBeforeInvoke,api:a}))this.simulatorPluginMessager.simulatorHookMethodCallback(d.onBeforeInvoke,hookMethodsCache.get({command:d.onBeforeInvoke,api:a}),Object.assign({},b.data.args,{webviewID:this.webviewID})).then((d)=>{if(d.preventDefault){const a=b.data.callbackID;return void(d.result&&webviewMessager.invokeCallback(this.webviewID,a,d.result))}'initReady'===a&&this.initReady();const e=d.args,f=_.cloneDeep(b);f.data.args=e,this.props.jssdkActions.exec(f.data,this.webviewID).then((a)=>{c(a)})});else{if('initReady'===a)this.initReady();else if('traceEvent'===a)return void this.traceMessage.triggerOnEvent('TRACE_EVENT',{args:b.data.args,webviewID:this.webviewID});this.props.jssdkActions.exec(b.data,this.webviewID).then((a)=>{c(a)})}}else'PULLDOWN_REFRESH'===b.command&&appserviceMessager.triggerOnEvent({eventName:'onPullDownRefresh',data:{},webviewID:this.webviewID})},this.state={zIndex:'standby'===a.type?-1:this.getShowZIndex(),initReady:!1},this.consoleMsgQueue={}}componentDidMount(){const a=this.props,b=this.container,c=this.webviewID=a.info.id;this.context.isPopup&&this.adjustWindowSize();const d=this.webview=webviewPool.get('simulator',{id:c,width:a.width,height:a.height,dpr:a.dpr});d.needDebugger=1,this.props.muted&&d.setAudioMuted(!0),this.setWebviewHeight(),this.setUserAgentOverride(),'tip'===a.type?d.src=`html/weappabout.html?${c}`:(this.initEvent(),this.initDebuggeeEvent(),d.src=`http://127.0.0.1:${global.proxyPort}/aboutblank?${c}`),d.attach(b),webviewMessager.register(c,this.onWebviewMessage),this.wxmlMessager=idepluginMessager.get('wxml_miniprogram'),this.traceMessage=idepluginMessager.get('trace_miniprogram'),global.online&&grabberWebviewManager.manager.addWebview(c,d._webview),this.props.project&&(this.simulatorType=this.props.project.simulatorType,this.simulatorType!==SIMULATOR_TYPE.wechat&&(this.simulatorPluginMessager=idepluginMessager.get(this.simulatorType),webviewMessager.registerSimulatorPluginMessager(this.simulatorPluginMessager)))}componentWillReceiveProps(a){if(a.jssdkCallbackInfo!==this.props.jssdkCallbackInfo){const{callbackID:b,res:c,webviewID:d}=a.jssdkCallbackInfo;d===a.info.id&&webviewMessager.invokeCallback(d,b,c)}if(a.interfaceCallbackInfo!==this.props.interfaceCallbackInfo){const{data:b}=a.interfaceCallbackInfo;b&&b.webviewID===a.info.id&&this.handleInterfaceInvocation(a.interfaceCallbackInfo)}if(a.captureScreen!==this.props.captureScreen&&a.captureScreen.webviewID===this.webviewID&&setTimeout(()=>{this.captureScreen()}),(a.info.pathName!==this.props.info.pathName||a.info.forceLoad!==this.props.info.forceLoad&&a.info.pathName)&&setTimeout(()=>{this.loadPage()}),a.wxmlInspected!==this.props.wxmlInspected&&this.webview&&this.webview.setEmulationTouch(!a.wxmlInspected),(a.muted&&!this.props.muted||!a.muted&&this.props.muted)&&this.webview&&this.webview.setAudioMuted(a.muted),a.show!==this.props.show&&a.show&&(this.setState({zIndex:this.getShowZIndex(a)}),this.props.info.ready)){const a=-1!==this.props.info.tabbarIndex;a&&setTimeout(()=>{this.props.simulatorActions.setAppRoute({status:'done'})},200)}a.height!==this.props.height&&(clearTimeout(this._setWebviewHeightTimer),this._setWebviewHeightTimer=setTimeout(()=>{this.context.isPopup&&this.adjustWindowSize(),this.setWebviewHeight()})),a.shareInfoShow!==this.props.shareInfoShow&&a.shareInfoShow&&a.show&&!a.info.htmlwebviewInfo&&this.webview.executeScript({code:'alert(\'GET_WEBVIEW_SCROLL_Y\' + window.scrollY);window.scrollTo(0,0);'},()=>{this.webview.captureVisibleRegion({format:'png'},(a)=>{this.props.simulatorActions.setShareDataURI(this.webviewID,a),this.webview.executeScript({code:`window.scrollTo(0,${this.webviewScrollY})`},()=>{this.webviewScrollY=void 0})})}),a.info.exitType!==this.props.info.exitType&&'back'===a.info.exitType&&this.animateWebviewTransition('exit').then(()=>{this.props.simulatorActions.setAppRoute({status:'done'}),this.props.simulatorActions.cleanExitingWebview()}),this.updateIdepluginMessager(a)}componentWillUnmount(){this.webview&&this.webview.detach(),global.online&&grabberWebviewManager.manager.removeWebview(this.props.info.id),this.props.simulatorActions.setDebuggee(void 0,this.webviewID,!1),webviewMessager.unRegister(this.webviewID,this.onWebviewMessage)}adjustWindowSize(){}handleInterfaceInvocation(a){function b(a){interfaceCallback.invokeCallback({callbackID:c,data:a})}const{callbackID:c,method:d,data:e}=a;switch(d){case'getWebviewHTML':{this.documentReady?this.webview.executeScript({code:'document.body.innerHTML'},(a)=>{a&&a[0]?b(a[0]):b('')}):b('');break}case'getScreenShot':{this.webview.captureVisibleRegion({format:'png'},(a)=>{b(a)});break}}}getShowZIndex(a){return a=a||this.props,a.info&&'undefined'!=typeof a.info.zIndex?a.info.zIndex:1}captureScreen(){this.webview.captureVisibleRegion({format:'png'},(a)=>{const b=Buffer.from(a.replace('data:image/png;base64,',''),'base64'),c=fileSystem.copyFileDataToTemp(this.props.project,b,'.png'),{webviewID:d,callbackID:e}=this.props.captureScreen;this.props.simulatorActions.assdkCallback({callbackID:e,res:{errMsg:'captureScreen:ok',tempFilePath:c},api:'captureScreen'})})}setWebviewHeight(){let a=this.props.width/this.props.deviceScale,b=this.props.height/this.props.deviceScale;this.props.popup&&(b=this.props.height,a=this.props.width),this.webview.setAttribute('style',`position:absolute;height:${b}px;width:${a}px;`);try{this.webview.setOffset({height:this.props.height,width:this.props.width,dpr:this.props.dpr})}catch(a){}}reload(){this.documentReady=!1,this.alreadyInit=!1;const a=this.webview;this.setUserAgentOverride(),a.src=`http://127.0.0.1:${global.proxyPort}/__pageframe__/pageframe.html`}setUserAgentOverride(){const a=tokenManager.getSessionToken(validType.UA_TOKEN);let b=this.props.ua.replace('{{webviewID}}',this.webviewID);b+=` miniprogram port/${global.messageCenterPort} token/${a}`,this.webview.setUserAgentOverride(b)}async animateWebviewTransition(a){return new Promise((b)=>{if(!this.container)return;let{top:c,height:d,width:e}=this.container.getBoundingClientRect();if(d/=this.props.deviceScale,e/=this.props.deviceScale,c=this.props.top,'enter'===a){const a=this.container.style.cssText,f=`z-index: ${this.getShowZIndex()};`,g=`position:fixed; width:${e}px; height:${d}px; top:${c}px; left:${e}px;`,h=()=>{this.container.removeEventListener('transitionend',h),this.container.style.cssText=a,this.container.style.zIndex=this.getShowZIndex(),b()};this.container.addEventListener('transitionend',h),this.container.style.cssText=f+g;const i=this.context.window||global.Win;i.window.requestAnimationFrame(()=>{this.container&&(this.container.style.transition='all linear 0.2s',this.container.style.transform=`translate(-${e}px,0)`)}),console.log(this.container.offsetHeight)}else if('exit'===a){const a=this.container.style.cssText,f=`z-index: ${this.getShowZIndex()};`,g=`position:fixed; width:${e}px; height:${d}px; top:${c}px; left:0px;`,h=()=>{this.container.removeEventListener('transitionend',h),this.container.style.cssText=a,this.container.style.zIndex=this.getShowZIndex(),b()};this.container.addEventListener('transitionend',h),this.container.style.cssText=f+g;const i=this.context.window||global.Win;i.window.requestAnimationFrame(()=>{this.container&&(this.container.style.transition='all linear 0.2s',this.container.style.transform=`translate(${e}px,0)`)}),console.log(this.container.offsetHeight)}})}async loadPage(){const a=this.webview;if(!this.webview||!this.props.info||!this.props.info.pathName||!this.documentReady)return;const b=this.props.info;if(b.pageNotFound&&!b.forceLoad)return void appserviceMessager.triggerOnEvent({eventName:'onPageNotFound',data:{path:b.pathName,query:b.query,isEntryPage:b.isEntryPage},webviewID:this.webviewID});this.setWebviewHeight();const c=b.pathName;a.setAttribute('route',c);const d=URL.parse(a.src);d.pathname=`__pageframe__/${c}`;const e=URL.format(d);let f='';try{f=await getSubPackage(this.props.project,c)}catch(a){return void consoleDisplay.display({command:C.DISPLAY_ERROR,data:{error:a}})}const g=topTools.escapeQuot(topTools.escapeQuot(e,'\''),'`');f=`var script = document.createElement('script')
      script.text = \`
        history.pushState('','', '${g}')
        ${topTools.escapeQuot(f,'`')};
      \`
      document.head.appendChild(script)`,a.executeScript({code:f},()=>{this.props.simulatorActions.setWebviewReady(this.webviewID,!0),this.onWebviewReady(),this.initReadyTimer=setTimeout(()=>{this.initReady()},500)}),this.traceMessage.triggerOnEvent('TRACE_EVENT',{metadata:{webviewID:this.webviewID,pathName:c}})}onWebviewReady(){this.props.muted&&setTimeout(()=>{this.webview.setAudioMuted(this.props.muted)},100)}initReady(){if(clearTimeout(this.initReadyTimer),this.alreadyInit)return;this.alreadyInit=!0;const a=-1===this.props.info.tabbarIndex,b=async()=>{this.setState({initReady:!0}),a&&(await this.animateWebviewTransition('enter')),this.props.simulatorActions.setAppRoute({status:'done'}),this.props.simulatorActions.cleanExitingWebview(),this.props.toolbarActions.setDeviceRotatedBeforeRoute(!1),setTimeout(()=>{this.tryCaptureScreenForBackground()},5e3)};setTimeout(()=>{b()},20)}tryCaptureScreenForBackground(){if(!global.online){this._captureTryCount||(this._captureTryCount=0),this._captureTryCount++;try{this.props.appConfig.entryPagePath.match(/^(.+)\.html$/)[1]===this.props.info.pathName&&this.webview.captureVisibleRegion({format:'png'},async(a)=>{try{const b=await runTask({taskName:'isSameColorImage',config:{type:'dataURI',format:'png'},dataStr:a,maxTimeout:60000,useBackup:!1,downgrade:!0});if(b.error)throw new Error(b.error);if(b.same){if(3<this._captureTryCount)return;setTimeout(this.tryCaptureScreenForBackground.bind(this),5e3)}else this.props.projectActions.updateProjectCover({image:a})}catch(a){log.info('process capture screen failure with err: '+a.toString())}})}catch(a){log.info('chrome capture screen failure with err: '+a.toString())}}}initDebuggeeEvent(){global.useChromeRemoteDebugProtocal&&(this.webview.onDebuggeeEvent=(a,b,c={})=>{if('DOM.inlineStyleInvalidated'!==b&&'DOM.characterDataModified'!==b&&('Overlay.nodeHighlightRequested'!==b||'Overlay.nodeHighlightRequested'!==lastWxmlMsg.method||c.nodeId!==lastWxmlMsg.nodeId)){lastWxmlMsg='Overlay.nodeHighlightRequested'===b?{method:b,nodeId:c.nodeId}:{};({"DOM.documentUpdated":!0,"DOM.childNodeCountUpdated":!0,"DOM.setChildNodes":!0,"DOM.childNodeRemoved":!0,"DOM.childNodeInserted":!0,"DOM.attributeRemoved":!0,"DOM.attributeModified":!0,"Overlay.inspectNodeRequested":!0,"DOM.nodeHighlightRequested":!0,"Overlay.nodeHighlightRequested":!0})[b]&&this.wxmlMessager.triggerOnEvent('ON_EVENT',{debuggee:a,method:b,params:c})}}),this.webview.onDebuggeeDetach=(a)=>{this.props.simulatorActions.setDebuggee(a,this.webviewID,!1)},this.webview.onDebuggeeAttach=(a)=>{this.props.simulatorActions.setDebuggee(a,this.webviewID,!0),this.reload()}}initEvent(){const a=this.webview;a.on('consolemessage',this.consolemessage),a.on('dialog',(a)=>{a.preventDefault();const b=a.messageType||'',c=a.messageText,d=a.dialog;return'alert'===b?(d.ok(''),void('DOCUMENT_READY'===c?(this.documentReady=!0,this.loadPage()):0===c.indexOf('GET_WEBVIEW_SCROLL_Y')?this.webviewScrollY=c.replace('GET_WEBVIEW_SCROLL_Y',''):0===c.indexOf('\u8FDB\u5165\u5BA2\u670D\u4F1A\u8BDD')&&this.props.simulatorActions.setConfirm({show:!0,content:c,showCancel:!1,confirmText:locales.config.RETURN}))):'confirm'===b?void d.ok(''):'prompt'===b?void(c===C.GET_MESSAGE_TOKEN?d.ok(messageCenter.getToken(['WEBVIEW','DEVTOOLS'])):d.ok('')):void 0}),a.on('mouseleave',()=>{a.setEmulationTouch(!1)}),a.on('mouseenter',()=>{this.props.wxmlInspected||a.setEmulationTouch(!0)}),this.initRequestListener(a)}initRequestListener(a){a.request;this.webview.onRequestErrorOccurred=(a)=>{const{type:b}=a;'script'===b||'main_frame'===b||'net::ERR_ABORTED'===a.error||'image'===a.type&&`http://127.0.0.1:${global.proxyPort}/__pageframe__/${this.props.info.pathName}`===a.url||consoleDisplay.display({command:C.DISPLAY_ERROR,data:{error:{code:appErrCode.WEBVIEW_NETWORK_ERROR,details:a}}})},this.webview.onBeforeRequest=(a)=>{const b=a.url;if(0===b.indexOf(`http://127.0.0.1:${global.proxyPort}/`)){const a=URL.parse(b),c=a.pathname.replace(/^\//,'');if('aboutblank'!==c&&'favicon.ico'!==c&&!/^__pageframe__\//.test(c)&&0!==c.indexOf(weappStoreFilePathPrefix)&&0!==c.indexOf(weappTmpFilePathPrefix)&&0!==c.indexOf(weappUsrFilePathPrefix)&&0!==c.indexOf('experience'))return{redirectUrl:`http://127.0.0.1:${global.proxyPort}/__pageframe__/${c}`}}return weappStoreFileReqular.test(b)||weappTmpFileReqular.test(b)||weappUsrFileReqular.test(b)||weappOpendataFileRegular.test(b)?{redirectUrl:b.replace(/^https?:\/\//,`$&127.0.0.1:${global.proxyPort}/`)}:/^https?:\/\//i.test(b)?'main_frame'===a.type&&/^chrome-extension:\/\//.test(b)?{cancel:!0}:{}:{cancel:!0}},this.webview.onRequestBeforeSendHeaders=(a)=>{const b=a.url;if(0!==b.indexOf(`http://127.0.0.1:${global.proxyPort}/`)&&!/favicon\.ico$/.test(b)&&'none'===this.props.networkType)return consoleDisplay.display({command:C.DISPLAY_ERROR,data:{title:locales.config.NO_NETWORK_TIPS_TITLE,error:{message:locales.config.NO_NETWORK_TIPS_CONTENT.format(b)}}}),{cancel:!0};if(0===b.indexOf(`http://127.0.0.1:${global.proxyPort}/__pageframe__`)){const a=URL.parse(b),c=a.pathname.replace(/^\/__pageframe__\//,''),d=tools.checkIsInSubPackage(this.props.appConfig,c),e=tools.checkIsInSubPackage(this.props.appConfig,this.props.info.pathName);if(d&&d!==e)return consoleDisplay.display({command:C.DISPLAY_ERROR,data:{title:locales.config.RESOURCE_RELATIVE_TIPS_TITLE,error:{message:locales.config.RESOURCE_RELATIVE_TIPS_CONTENT.format(c)}}}),{cancel:!0}}const c=a.requestHeaders||[],d=c.findIndex((a)=>'cookie'===a.name.toLowerCase());c.splice(d,1);for(const b of c)if('Referer'===b.name){const a=projectManager.getProjectAppID();b.value=`https://servicewechat.com/${a}/devtools/page-frame.html`}return{requestHeaders:a.requestHeaders}},this.webview.onRequestCompleted=(a)=>{const{type:b,statusCode:c}=a;if('script'!==b&&'main_frame'!==b&&400<=c){if('image'===a.type&&`http://127.0.0.1:${global.proxyPort}/__pageframe__/${this.props.info.pathName}`===a.url)return;consoleDisplay.display({command:C.DISPLAY_ERROR,data:{error:{code:appErrCode.WEBVIEW_NETWORK_ERROR,details:a}}})}}}handleH5WebviewEvent(a,b){a&&b&&webviewMessager.triggerOnEvent({eventName:a,data:b,webviewID:this.webviewID})}render(){const a=this.props,b={position:'absolute',width:a.width,height:a.height,top:a.top,zIndex:this.state.initReady?this.state.zIndex:-1},c=a.info.htmlwebviewInfo,d=this.handleH5WebviewEvent;return React.createElement('div',{className:'webview',ref:(a)=>this.container=a,style:b},c?React.createElement(HtmlWebview,{webviewID:a.info.id,htmlId:c.htmlId,url:c.src||'',originUrl:c.originUrl||'',cangoback:c.cangoback,width:c.position&&c.position.width||a.width,height:c.position&&c.position.height||a.height,left:c.position&&c.position.left||0,top:c.position&&c.position.top||0,handleH5WebviewEvent:d}):null)}}Webview.contextTypes={isPopup:PropTypes.bool,window:PropTypes.object},module.exports=Webview;
;}(require("lazyload"), require);
