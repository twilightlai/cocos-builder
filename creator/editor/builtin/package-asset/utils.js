const e=require("fire-fs"),t=require("fire-path"),o=require("async"),r=require("electron").remote.dialog;exports.ASSET_TYPE="&asset&type&.json",exports.init=function(e){this.localProfiles=e.local},exports.getDataByKey=function(e){return this.localProfiles.data[e]||""},exports.save=function(e,t){this.localProfiles.data[e]=t,this.localProfiles.save()},exports.showErrorMessageBox=function(e,t){r.showErrorBox(e,t)},exports.showImportConflictMessageBox=function(e,t,o){r.showMessageBox({type:"info",title:e,message:t,buttons:[Editor.T("MESSAGE.yes"),Editor.T("MESSAGE.no")]},e=>{o&&o(null,0===e)})},exports.showImportMessageBox=function(e,t,o){r.showMessageBox({type:"info",title:e,message:t,buttons:[Editor.T("MESSAGE.yes"),Editor.T("MESSAGE.no")],defaultId:0,cancelId:1},e=>{o&&o(null,0===e)})},exports.showImportZipDialog=function(e){r.showOpenDialog({defaultPath:this.localProfiles.data["import-folder-path"]||Editor.Project.path,properties:["openFile"],filters:[{name:"zip",extensions:["zip".toLowerCase()]}]},t=>{if(!e||!t)return;let o=t[0];e(null,o),this.save("import-folder-path",o)})},exports.showImportOutPathDialog=function(e){r.showOpenDialog({defaultPath:this.localProfiles.data["out-path"]||t.join(Editor.Project.path,"assets"),properties:["openDirectory"]},o=>{if(!e||!o)return;let r=t.join(o[0],"/");e(null,r),this.save("out-path",r)})},exports.showExportResDialog=function(e){r.showOpenDialog({defaultPath:this.localProfiles.data["current-resource"]||Editor.Project.path,properties:["openFile"],filters:[{name:"resource",extensions:["fire","prefab"]}]},t=>{if(!e||!t)return;let o=t[0],r=Editor.assetdb.remote.loadMetaByPath(o);e(null,{path:o,uuid:r.uuid}),this.save("current-resource",o)})},exports.showExportOutPathDialog=function(e){let t=this.localProfiles.data["export-resource-path"]||Editor.Project.path,o=r.showSaveDialog({title:Editor.T("EXPORT_ASSET.title"),defaultPath:t,filters:[{name:"Package",extensions:["zip"]}]});o&&(e(null,o),this.save("export-resource-path",o))},exports.isDirectory=function(t){return e.existsSync(t)},exports.createFolder=function(t){e.existsSync(t)||e.mkdirSync(t)},exports.copyFile=function(t,o){let r=e.createReadStream(t),i=e.createWriteStream(o);e.statSync(t),r.on("data",function(e){!1===i.write(e)&&r.pause()}),r.on("end",function(){i.end()}),i.on("drain",function(){r.resume()})},exports.copy=function(r,i,s,a){let n=e.readdirSync(r);if(0===n.length)return a(),void 0;o.each(n,(o,a)=>{if(!s[o])return a(),void 0;let n=t.join(r,o),l=t.join(i,o);e.statSync(n).isDirectory()?(this.createFolder(l),this.copy(n,l,s,a)):(this.copyFile(n,l),a())},a)},exports.getIcon=function(e){let t=Editor.assetdb.remote.loadMetaByUuid(e),o=t.assetType();return"texture"===o?`thumbnail://${e}?32`:"sprite-frame"===o?`thumbnail://${t.rawTextureUuid}?32`:("dragonbones"===o&&(o="spine"),"unpack://static/icon/assets/"+o+".png")};