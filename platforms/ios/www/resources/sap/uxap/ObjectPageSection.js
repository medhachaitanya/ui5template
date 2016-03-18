/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2016 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","sap/ui/core/InvisibleText","./ObjectPageSectionBase","sap/ui/Device","sap/m/Button","./library"],function(q,I,O,D,B,l){"use strict";var a=O.extend("sap.uxap.ObjectPageSection",{metadata:{library:"sap.uxap",properties:{showTitle:{type:"boolean",group:"Appearance",defaultValue:true},titleUppercase:{type:"boolean",group:"Appearance",defaultValue:true}},defaultAggregation:"subSections",aggregations:{subSections:{type:"sap.uxap.ObjectPageSubSection",multiple:true,singularName:"subSection"},ariaLabelledBy:{type:"sap.ui.core.InvisibleText",multiple:false,visibility:"hidden"},_showHideAllButton:{type:"sap.m.Button",multiple:false,visibility:"hidden"},_showHideButton:{type:"sap.m.Button",multiple:false,visibility:"hidden"}},associations:{selectedSubSection:{type:"sap.uxap.ObjectPageSubSection",multiple:false}}}});a.MEDIA_RANGE=D.media.RANGESETS.SAP_STANDARD;a.prototype._expandSection=function(){O.prototype._expandSection.call(this)._updateShowHideAllButton(!this._thereAreHiddenSubSections());};a.prototype.init=function(){O.prototype.init.call(this);this._sContainerSelector=".sapUxAPObjectPageSectionContainer";D.media.attachHandler(this._updateImportance,this,a.MEDIA_RANGE);};a.prototype.exit=function(){D.media.detachHandler(this._updateImportance,this,a.MEDIA_RANGE);};a.prototype.onkeyup=function(e){var b=sap.ui.getCore().byId(q(e.target).attr("id"));if(e.keyCode===q.sap.KeyCodes.TAB&&b instanceof sap.uxap.ObjectPageSection&&this._getObjectPageLayout()._isFirstSection(this)){this._getObjectPageLayout().$("opwrapper").scrollTop(0);}};a.prototype._updateImportance=function(c){var o=this._getObjectPageLayout(),m=c||D.media.getCurrentRange(a.MEDIA_RANGE),s=o&&o.getShowOnlyHighImportance(),i=this._determineTheLowestLevelOfImportanceToShow(m.name,s);this.getSubSections().forEach(function(S){S._applyImportanceRules(i);});this._applyImportanceRules(i);this._updateShowHideAllButton(false);if(o){o._adjustLayout();}};a.prototype._determineTheLowestLevelOfImportanceToShow=function(m,s){if(s||m==="Phone"){return l.Importance.High;}if(m==="Tablet"){return l.Importance.Medium;}return l.Importance.Low;};a.prototype.connectToModels=function(){this.getSubSections().forEach(function(s){s.connectToModels();});};a.prototype.onBeforeRendering=function(){var A="ariaLabelledBy";if(!this.getAggregation(A)){this.setAggregation(A,this._getAriaLabelledBy());}};a.prototype.onAfterRendering=function(){this._updateImportance();};a.prototype._getAriaLabelledBy=function(){return new I({text:this._getInternalTitle()||this.getTitle()}).toStatic();};a.prototype._setSubSectionsFocusValues=function(){var s=this.getSubSections()||[],L=this.getSelectedSubSection(),p;if(s.length===0){return this;}s.forEach(function(S){if(L===S.sId){S._setToFocusable(true);p=true;}else{S._setToFocusable(false);}});if(!p){s[0]._setToFocusable(true);}return this;};a.prototype._disableSubSectionsFocus=function(){var s=this.getSubSections()||[];s.forEach(function(S){S._setToFocusable(false);});return this;};a.prototype._thereAreHiddenSubSections=function(){return this.getSubSections().some(function(s){return s._getIsHidden();});};a.prototype._updateShowHideSubSections=function(h){this.getSubSections().forEach(function(s){if(h&&s._shouldBeHidden()){s._updateShowHideState(true);}else if(!h){s._updateShowHideState(false);}});};a.prototype._getShouldDisplayShowHideAllButton=function(){return this.getSubSections().some(function(s){return s._shouldBeHidden();});};a.prototype._showHideContentAllContent=function(){var s=this._thereAreHiddenSubSections();if(this._getIsHidden()&&s){this._updateShowHideState(false);}this._updateShowHideSubSections(!s);this._updateShowHideAllButton(s);};a.prototype._updateShowHideState=function(h){this._updateShowHideButton(h);this._getShowHideAllButton().setVisible(this._getShouldDisplayShowHideAllButton());return O.prototype._updateShowHideState.call(this,h);};a.prototype._updateShowHideAllButton=function(h){this._getShowHideAllButton().setVisible(this._getShouldDisplayShowHideAllButton()).setText(this._getShowHideAllButtonText(h));};a.prototype._getShowHideAllButton=function(){if(!this.getAggregation("_showHideAllButton")){this.setAggregation("_showHideAllButton",new B({text:this._getShowHideAllButtonText(!this._thereAreHiddenSubSections()),press:this._showHideContentAllContent.bind(this),type:sap.m.ButtonType.Transparent}).addStyleClass("sapUxAPSectionShowHideButton"));}return this.getAggregation("_showHideAllButton");};a.prototype._getShowHideButtonText=function(h){return l.i18nModel.getResourceBundle().getText(h?"HIDE":"SHOW");};a.prototype._getShowHideAllButtonText=function(h){return l.i18nModel.getResourceBundle().getText(h?"HIDE_ALL":"SHOW_ALL");};a.prototype._updateShowHideButton=function(h){this._getShowHideButton().setVisible(this._shouldBeHidden()).setText(this._getShowHideButtonText(!h));};a.prototype._getShowHideButton=function(){if(!this.getAggregation("_showHideButton")){this.setAggregation("_showHideButton",new B({text:this._getShowHideButtonText(!this._getIsHidden()),press:this._showHideContent.bind(this),type:sap.m.ButtonType.Transparent}).addStyleClass("sapUxAPSectionShowHideButton"));}return this.getAggregation("_showHideButton");};return a;});