"use strict";var t=require("fire-fs"),i=require("fire-path"),s=require("./custom-asset"),e=require("./scene");module.exports=class extends s{constructor(t){super(t),this.optimizationPolicy="AUTO",this.asyncLoadAssets=!1,this.readonly=!1}async importJSON(t,s){var a=Editor.serialize.findRootObject(s,"cc.Prefab");a?(this._assetdb.isSubAssetByPath(t)||(s=await e.verify(t,s),s=await e.migrate(t,s,this.uuid)),a.optimizationPolicy=cc.Prefab.OptimizationPolicy[this.optimizationPolicy],a.asyncLoadAssets=this.asyncLoadAssets,a.readonly=this.readonly):Editor.warn(`Can not find prefab assset in the prefab file "${t}", it maybe corrupted!`),Editor.serialize.setName(s,i.basenameNoExt(t)),this._assetdb.saveAssetToLibrary(this.uuid,s)}import(i,s){if(this._assetdb.isSubAssetByPath(i))return s();t.readJson(i,async(t,e)=>{if(t)return s&&s(t),void 0;e&&await this.importJSON(i,e),s&&s(t)})}static version(){return"1.2.1"}static defaultType(){return"prefab"}};