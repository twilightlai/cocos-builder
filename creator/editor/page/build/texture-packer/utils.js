const e=require("fire-path"),t=require("fire-fs"),r=require("lodash"),i=require("globby"),a=require("del"),s=require("./packer"),n=Editor.require("app://editor/page/build/texture-compress");async function o(i,a,s){let n=e.join(i,"info.json"),o={};t.existsSync(n)&&(o=t.readJSONSync(n));let u={mtimes:{}},l=[a.meta.uuid];return s.forEach(e=>{l.push(e._uuid),l.push(e.getTexture()._uuid)}),l=r.uniq(l),await Promise.all(l.map(async e=>{let t=await new Promise((t,r)=>{Editor.assetdb.queryMetaInfoByUuid(e,(e,i)=>{if(e)return r(e);t({assetMtime:i.assetMtime,metaMtime:i.metaMtime})})});u.mtimes[e]=t})),{storedPacInfoPath:n,newStoredPacInfo:u,storedPacInfo:o}}exports.queryAtlases=async function(a){let s={textureUuids:[],spriteFrames:[],pacInfos:[],texture2pac:{}};return a=Array.isArray(a)?a:[a],await Promise.all(a.map(async a=>{let n=await(new class{async init(a){let s=a.path,n=s+".meta",o=t.readJSONSync(n),u=e.dirname(a.url)+"/**/*",l=await new Promise((e,t)=>{Editor.assetdb.queryAssets(u,["sprite-frame"],(r,i)=>{if(r)return t(r);e(i)})}),m=e.dirname(s),c=[e.join(m,"**/*.pac"),"!"+e.join(m,"*.pac")],d=await new Promise((t,r)=>{i(c,(i,a)=>{if(i)return r(i);t(a.map(t=>e.dirname(t)))})});if(0===(l=l.filter(t=>{for(let r=0;r<d.length;r++)if(e.contains(d[r],t.path))return!1;return!0})).length)return Editor.warn(`No SpriteFrame find in forlder [${e.dirname(a.url)}]. Please check the AutoAtlas [${s}].`),this;let p=await Promise.all(l.map(async e=>new Promise((t,r)=>{cc.AssetLibrary.loadAsset(e.uuid,(e,i)=>{if(e)return r(e);i.pacInfo=this,t(i)})})));p=r.sortBy(p,"_uuid");let f=Editor.url("db://assets");return this.meta=o,this.info=a,this.spriteFrames=p,this.relativePath=e.relative(f,s),this.relativeDir=e.relative(f,e.dirname(s)),this}}).init(a);n.spriteFrames.forEach(e=>{let t=e.getTexture()._uuid;s.textureUuids.push(t),s.texture2pac[t]=n}),s.spriteFrames=s.spriteFrames.concat(n.spriteFrames),s.pacInfos.push(n)})),s.textureUuids=r.uniq(s.textureUuids),s.spriteFrames=r.uniq(s.spriteFrames),s},exports.pack=async function(i){let{pacInfos:u,buildAssets:l,dest:m,needCompress:c,platform:d}=i,p=[];for(let i=0;i<u.length;i++){let f=u[i],h=f.meta,w=cc.js.mixin({name:e.basenameNoExt(f.info.path),width:h.maxWidth,height:h.maxHeight},h),y=f.spriteFrames;if(h.filterUnused&&l){let t=Editor.url("db://assets/resources");e.contains(t,f.info.path)?Editor.warn(`AutoAtlas "${f.info.path}" is in resources dir, so its "Filter Unused Resources" parameter will be ignored.`):f.meta.uuid in l&&Editor.warn(`AutoAtlas "${f.info.path}" has been referenced directly, so its "Filter Unused Resources" parameter will be ignored.`)}let P,g=e.join(m,f.relativePath),{storedPacInfoPath:x,newStoredPacInfo:b,storedPacInfo:E}=await o(g,f,y);!r.isEqual(b.mtimes,E.mtimes)?(a.sync(g,{force:!0}),P=await new Promise((e,t)=>{s(y,w,(r,i)=>{if(r)return t(r);e(i)})}),await Promise.all(P.atlases.map(async r=>{let i=e.join(g,r.name+".png");return t.ensureDirSync(e.dirname(i)),r.imagePath=i,new Promise((e,t)=>{r.sharp.toFile(i,r=>{if(r)return t(r);e()})})})),global.gc&&global.gc(),c&&await Promise.all(P.atlases.map(async r=>{let i=e.join(g,"compressed",r.name+".png");t.ensureDirSync(e.dirname(i));let a=await new Promise((e,t)=>{n({src:r.imagePath,dst:i,platform:d,compressOption:f.meta.platformSettings},(r,i)=>{if(r)return t(r);e(i)})});0===a.length&&(a=[".png"]),r.compressd={suffix:a,imagePathNoExt:e.join(e.dirname(i),e.basenameNoExt(i))}})),b.result=P,t.ensureDirSync(g),t.writeFileSync(x,JSON.stringify(b,null,2))):(P=E.result).atlases.forEach(e=>{e.files.forEach(e=>{e.spriteFrame=y.find(t=>t._uuid===e.uuid)})}),P.pacInfo=f,p.push(P)}return p};