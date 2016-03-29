/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2016 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/base/ManagedObject'],function(q,M){'use strict';var T=M.extend("sap.ui.core.support.controls.TimelineOverview",{});T.prototype.setInteractions=function(i){this.interactions=(JSON.parse(JSON.stringify(i)));if(!i||!i.length){return;}this.actualStartTime=i[0].start;this.actualEndTime=i[i.length-1].end;this.timeRange=this.actualEndTime-this.actualStartTime;this.maxDuration=0;this.stepCount=60;var t=this;this.interactions.forEach(function(a){a.start=parseFloat((a.start-t.actualStartTime).toFixed(2));a.end=parseFloat((a.end-t.actualStartTime).toFixed(2));a.calculatedDuration=a.end-a.start;if(a.calculatedDuration>t.maxDuration){t.maxDuration=a.calculatedDuration;}});};T.prototype.render=function(r){r.write('<div id="sapUiInteractionTimelineOverview"><ol id="'+this.getId()+'"');r.addClass("InteractionTimeline");r.writeClasses();r.write(">");var a,b=this.interactions;if(!b||!b.length){return;}var s=this._getTimelineOverviewData(b);var t=this;s.forEach(function(c){if(c.totalDuration>t.maxDuration){t.maxDuration=c.totalDuration;}});for(var i=0;i<s.length;i++){a=s[i];this.renderInteractionStep(r,a,i);}r.write("</ol></div>");};T.prototype.renderInteractionStep=function(r,s,i){var a=69,b=Math.ceil((s.totalDuration/this.maxDuration)*a);var c='height: '+b+'%;';if(b>0){c+=' min-height: 1px;';}r.write('<li>');r.write('<div class="bars-wrapper" title="Duration: '+s.totalDuration+'ms">');r.write('<div class="duration" style="'+c+'">');var I=s.interactions,d=100;I.forEach(function(f,i){d=(s.totalDuration===0)?100:Math.ceil((f.calculatedDuration/s.totalDuration)*100);r.write('<div class="requestType" style="height: '+d+'%; min-height: 1px;"></div>');if(i!==(I.length-1)){r.write('<div style="min-height: 1px;"></div>');}});r.write('</div>');r.write('</div>');var e=i+1;var C=(e%10===0)?"sapUiInteractionTimelineStepRightBold":"sapUiInteractionTimelineStepRight";if(e%2===0){r.write('<div class="'+C+'"></div>');}if(e%10===0&&e!==this.stepCount){r.write('<div class="sapUiInteractionTimelineTimeLbl">'+Math.round((i*this.timeRange/this.stepCount)/10)/100+'s</div>');}r.write('</li>');};T.prototype._getTimelineOverviewData=function(c){var s=this.stepCount;var a=this.timeRange/s;var b=[],o={interactions:[]},A=true;for(var i=0;i<s;i++){var d=a*i;var e=d+a;var f=this._filterByTime({start:d,end:e},c);var g={interactions:f,totalDuration:0};f.map(function(h){g.totalDuration+=h.calculatedDuration;});A=f.length>0&&o.interactions.length>0&&f[0].start===o.interactions[0].start;if(A){g.interactions=[];g.totalDuration=0;}b.push(g);o=g;}return b;};T.prototype._filterByTime=function(o,f){return f.filter(function(i){return!(i.end<=o.start||i.start>=o.end);}).map(function(i){var l=Math.max(o.start-i.start,0);var r=Math.max((i.start+i.duration)-o.end,0);i.duration=i.duration-l-r;i.start=Math.max(i.start,o.start);i.end=Math.min(i.end,o.end);return i;});};return T;});
