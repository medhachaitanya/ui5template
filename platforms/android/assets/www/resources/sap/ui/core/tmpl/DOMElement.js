/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2016 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/core/Control','sap/ui/core/library'],function(q,C,l){"use strict";var D=C.extend("sap.ui.core.tmpl.DOMElement",{metadata:{library:"sap.ui.core",properties:{text:{type:"string",group:"Appearance",defaultValue:null},tag:{type:"string",group:"Behavior",defaultValue:'span'}},aggregations:{attributes:{type:"sap.ui.core.tmpl.DOMAttribute",multiple:true,singularName:"attribute"},elements:{type:"sap.ui.core.tmpl.DOMElement",multiple:true,singularName:"element"}}}});D.prototype.applySettings=function(s){C.prototype.applySettings.apply(this,arguments);var t=this,m=this.getMetadata(),j=m.getJSONKeys();q.each(s,function(k,v){if(k!=="id"&&k!=="text"&&!j[k]&&typeof v==="string"){t.attr(k,v);}});};D.prototype.exit=D.prototype.onBeforeRendering=function(){var t=this.getTag().toLowerCase();if(t==="input"||t==="textarea"||t==="select"){this.$().off("change");}};D.prototype.onAfterRendering=function(){var t=this.getTag().toLowerCase();if(t==="input"||t==="textarea"||t==="select"){this.$().on("change",q.proxy(this.oninputchange,this));}};D.prototype.oninputchange=function(e){var t=this.getTag().toLowerCase();if(t==="input"){var v=this.$().val();q.each(this.getAttributes(),function(i,a){if(a.getName().toLowerCase()==="value"){a.setValue(v);}});}else if(t==="textarea"){var T=this.$().val();this.setText(T);}else if(t==="select"){var T="";this.$().find("select option:selected").each(function(){T+=q(this).text()+" ";});this.setText(T);}};D.prototype.attr=function(k,v){var a=this.getAttributes(),A;q.each(a,function(i,V){var n=V.getName();if(n.toLowerCase()===k){A=V;return false;}});if(v===undefined){return A&&A.getValue();}else{if(A){if(v===null){this.removeAttribute(A);}else{A.setValue(v);}}else{if(v!==null){this.addAttribute(new sap.ui.core.tmpl.DOMAttribute({name:k,value:v}));}}return this;}};D.prototype.removeAttr=function(k){this.attr(k,null);return this;};D.prototype.setText=function(t){this.setProperty("text",t,true);var $=this.$();if($.length>0){var T=this.getTag().toLowerCase();if(T==="textarea"){$.val(this.getProperty("text"));}else{$.text(this.getProperty("text"));}}};return D;});