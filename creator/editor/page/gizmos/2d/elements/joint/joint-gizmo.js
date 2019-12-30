const o=require("chroma-js"),e=require("../tools"),t=Editor.require("scene://utils/node");let r={anchor:0,connectedAnchor:1};class c extends Editor.Gizmo{visible(){return!0}rectHitTest(o,e){let r=this._root.tbox(),c=t.getWorldPosition(this.node);return!!e&&o.containsRect(cc.rect(c.x-r.width/2,c.y-r.height/2,r.width,r.height))}onCreateMoveCallbacks(){let o,e;return{start:(t,r)=>{o=t,e=r},update:(t,c,n,s)=>{let i=o+t,h=e+c;if(s===r.anchor){let o=this.screenToNodeLocalPos(cc.v2(i,h),this.node);this.adjustValue(o),this.target.anchor=o}else if(s===r.connectedAnchor){let o=this.screenToNodeLocalPos(cc.v2(i,h),this.target.connectedBody.node);this.adjustValue(o),this.target.connectedAnchor=o}}}}onCreateRoot(){let t=this._root,n=n=>{let s;n===c.ToolType.anchor?s="#4793e2":n===c.ToolType.connectedAnchor&&(s="#cccc00");let i=t.line(0,0,1,1).stroke({width:2,color:s}),h=this.createAnchorGroup();h.style("pointer-events","bounding-box").style("cursor","move").stroke({width:2,color:s}).fill({color:s}),h.on("mouseover",function(){var e=o(s).brighter().hex();h.stroke({color:e}),i.stroke({color:e})}),h.on("mouseout",function(){h.stroke({color:s}),i.stroke({color:s})});let d=h.plot;return h.plot=(o=>{let t,c,s,l;if(d&&d.apply(h,arguments),n===r.anchor)t=o.pos.x,c=o.pos.y,s=o.anchor.x,l=o.anchor.y;else{if(!o.connectedPos)return;t=o.connectedPos.x,c=o.connectedPos.y,s=o.connectedAnchor.x,l=o.connectedAnchor.y}h.move(s,l),this.editing||this.hovering?(i.plot(t,c,s,l),i.style("stroke-dasharray",e.dashLength()),i.show()):i.hide()}),this.registerMoveSvg(h,n),h};t.anchorGroup=n(r.anchor),t.connectedAnchorGroup=n(r.connectedAnchor),this.createToolGroup&&(t.toolGroup=this.createToolGroup())}createArgs(){let o={},e=this.node,t=e.convertToWorldSpaceAR(this.target.anchor);if(o.anchor=this.worldToPixel(t),o.pos=this.worldToPixel(e.convertToWorldSpaceAR(cc.Vec2.ZERO)),this.target.connectedBody){let e=this.target.connectedBody.node,t=e.convertToWorldSpaceAR(this.target.connectedAnchor);o.connectedAnchor=this.worldToPixel(t),o.connectedPos=this.worldToPixel(e.convertToWorldSpaceAR(cc.Vec2.ZERO))}return o}dirty(){let o=this._viewDirty()||this._nodeDirty()||this._dirty;return this.target.connectedBody&&(o=o||this._nodeDirty(this.target.connectedBody.node)),o}onUpdate(){let o=this._root,e=this.createArgs();this.target.connectedBody?o.connectedAnchorGroup.show():o.connectedAnchorGroup.hide(),o.anchorGroup.plot(e),o.connectedAnchorGroup.plot(e),o.toolGroup&&o.toolGroup.plot(e)}}c.ToolType=r,module.exports=c;