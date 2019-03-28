;!function(require, directRequire){;"use strict";const React=require("react"),Animation=require('./875171e7b864aa58d026d4fa0999fbd1.js');class Modal extends React.Component{constructor(a){super(a),this.handleCancelClick=()=>{this.props.hideModal({callbackID:this.props.callbackID,res:{errMsg:"showModal:ok",cancel:1,confirm:0},api:"showModal"})},this.handleConfirmClick=()=>{this.props.hideModal({callbackID:this.props.callbackID,res:{errMsg:"showModal:ok",cancel:0,confirm:1},api:"showModal"})};const b=this.canModalShow(a);this.state={lazyLoaded:b,show:b}}componentWillReceiveProps(a){if(this.canModalShow(a)!==this.canModalShow(this.props)){const b={show:this.canModalShow(a)};b.show&&(b.lazyLoaded=!0),this.setState(b)}}canModalShow(a){return a.currentWebviewID+""==a.showOnWebviewID+""&&a.show}shouldComponentUpdate(a){return this.canModalShow(a)!==this.canModalShow(this.props)||this.canModalShow(this.props)}onAnimationOut(){}render(){if(!this.state.lazyLoaded)return null;const a=this.props;return React.createElement(Animation,{style:{position:"absolute",left:0,top:0,width:"100%",height:"100%",zIndex:5},show:this.state.show,inClassName:"ui-animate-fadeIn",outClassName:"ui-animate-fadeOut",onAnimationOut:this.onAnimationOut.bind(this)},React.createElement("div",{className:"weui-mask"}),React.createElement("div",{className:"portrait"===this.props.orientation?"weui-dialog":"weui-dialog weui-dialog-orientation"},React.createElement("div",{className:"weui-dialog__hd"},React.createElement("strong",{className:"weui-dialog__title",id:"wx.showModal.title"},a.title)),React.createElement("div",{className:"weui-dialog__bd",id:"wx.showModal.content"},a.content),React.createElement("div",{className:"weui-dialog__ft"},React.createElement("a",{className:"weui-dialog__btn weui-dialog__btn_default auto_test_btn_default","data-type":"modal",style:{color:a.cancelColor,display:a.showCancel?"":"none"},onClick:this.handleCancelClick,id:"wx.showModal.cancel"},a.cancelText),React.createElement("a",{className:"weui-dialog__btn weui-dialog__btn_primary auto_test_btn_primary","data-type":"modal",style:{color:a.confirmColor},onClick:this.handleConfirmClick,id:"wx.showModal.confirm"},a.confirmText))))}}module.exports=Modal;
;}(require("lazyload"), require);
