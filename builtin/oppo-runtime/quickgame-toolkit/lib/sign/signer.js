"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(exports,"__esModule",{value:!0}),exports.sign=void 0;var _fsExtra=require("fs-extra"),_fsExtra2=_interopRequireDefault(_fsExtra),_path=require("path"),_path2=_interopRequireDefault(_path),_jszip=require("jszip"),_jszip2=_interopRequireDefault(_jszip),_bundle=require("./bundle"),_bundle2=_interopRequireDefault(_bundle),_config=require("../config/config"),COMPRESS_OPTS={type:"nodebuffer",compression:"DEFLATE",compressionOptions:{level:9}},sign=exports.sign=function(e,t,i){var a=_fsExtra2.default.readFileSync(e.signFiles.privatekey),r=_fsExtra2.default.readFileSync(e.signFiles.certificate),n=new _jszip2.default,s=[],u=_path2.default.join(e.output,e.rpkName+".zip"),f=_path2.default.join(e.output,e.rpkName);t||"production"!=process.env.NODE_ENV?f+=".rpk":f+=".signed.rpk",parse(e.input,".",function(e,t){"dist/"!==e.substr(0,5)&&"sign/"!==e.substr(0,5)&&-1===_config.EXCLUDES.indexOf(e)&&(console.log("name include",e),s.push({name:Buffer.from(e),file:t,hash:_bundle2.default.hashFile(t,_fsExtra2.default)}),n.file(e,_fsExtra2.default.createReadStream(t)))},_fsExtra2.default),_fsExtra2.default.ensureDirSync(e.output),n.generateNodeStream(COMPRESS_OPTS).pipe(_fsExtra2.default.createWriteStream(u)).on("finish",function(){_bundle2.default.signZip({zip:u,files:s},a,r,f),_fsExtra2.default.existsSync(u)&&_fsExtra2.default.unlinkSync(u),i&&i(f)})},parse=function e(t,i,a,r){i=i||".";var n=_path2.default.posix.join(t,i),s=void 0;r.readdirSync(n).forEach(function(u){var f=_path2.default.posix.join(n,u),p=r.statSync(f);if(p.isFile()){var o=i.split(_path2.default.sep).join(_path2.default.posix.sep);s=_path2.default.posix.join(o,_path2.default.basename(u)),a(s,f)}else if(p.isDirectory()){var l=_path2.default.posix.join(i,u);e(t,l,a,r)}})};