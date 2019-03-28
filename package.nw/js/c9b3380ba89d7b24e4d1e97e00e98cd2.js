;!function(require, directRequire){;'use strict';const dgram=require('dgram'),tools=require('./84b183688a46c9e2626d3e6f83365e13.js'),getMessager=require('./dfd9a72b9ff6078018aa4a64eed949a5.js'),UDPSockets=new Map;async function createUDPSocket(a,b){const c=b.args.socketId;if(UDPSockets.has(c))return{errMsg:`${b.api}:fail UDPSocket(socketId = ${c}) is already created`};const d=dgram.createSocket('udp4');return UDPSockets.set(c,d),{socketId:c,errMsg:`${b.api}:ok`}}async function bindUDPSocket(a,b){const c=b.args.socketId,d=getMessager();if(!UDPSockets.has(c))return{errMsg:`${b.api}:fail UDPSocket(socketId = ${c}) does not exist`};try{const a=await tools.getAvailablePort(),e=UDPSockets.get(c);return e.bind(a),e.on('error',(a)=>{d.triggerOnEvent({eventName:'onUDPSocketError',data:{socketId:c,errMsg:a.toString()}})}),e.on('message',(a,b)=>{d.triggerOnEvent({eventName:'onUDPSocketMessage',data:{socketId:c,message:a,remoteInfo:b}})}),e.on('listening',()=>{d.triggerOnEvent({eventName:'onUDPSocketListening',data:{socketId:c}})}),e.on('close',()=>{d.triggerOnEvent({eventName:'onUDPSocketClose',data:{socketId:c}})}),{port:a,errMsg:`${b.api}:ok`}}catch(a){return{errMsg:`${b.api}:fail ${a.toString()}`}}}async function sendUDPSocketMessage(a,b){const{socketId:c,address:d,port:e,message:f,offset:g,length:h}=b.args,i=getMessager();if(!UDPSockets.has(c))return i.triggerOnEvent({eventName:'onUDPSocketError',data:{socketId:c,errMsg:`UDPSocket(socketId = ${c}) does not exist`}}),{errMsg:`${b.api}:fail UDPSocket(socketId = ${c}) does not exist`};const j=UDPSockets.get(c);let k;return k=g&&h?[f,g,h,e,d]:[f,e,d],j.send(...k),{errMsg:`${b.api}:ok`}}async function closeUDPSocket(a,b){const c=b.args.socketId;if(!UDPSockets.has(c))return{errMsg:`${b.api}:fail UDPSocket(socketId = ${c}) does not exist`};const d=UDPSockets.get(c);return d.close(),UDPSockets.delete(c),{errMsg:`${b.api}:ok`}}module.exports={createUDPSocket,bindUDPSocket,sendUDPSocketMessage,closeUDPSocket};
;}(require("lazyload"), require);
