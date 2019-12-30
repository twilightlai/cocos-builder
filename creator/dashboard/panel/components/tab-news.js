"use strict";const e=require("fs"),t=require("path"),r=require("url"),n=require("electron"),s=require("../utils");exports.template=e.readFileSync(t.join(__dirname,"../template/tab-news.html"),"utf-8"),exports.props=["hasreadnews","shouldreadnews","news_category_url","news_msg_time"],exports.data=function(){return{src:"",loading:!0}},exports.methods={t:e=>Editor.T(e),getPids(){const e=[];return this.shouldreadnews.forEach(t=>{-1!==this.hasreadnews.indexOf(t.pid)&&e.push(t.pid)}),e},handleUrl(e){let t=!0;return-1!==e.indexOf("?")&&(t=!1),e+=(t?"?":"&")+`ver=${Editor.remote.versions.CocosCreator.replace(/-.+$/,"")}`,e+=`&pids=${this.getPids().join(",")}`,e+=`&lang=${Editor.lang}`},newWindow(e){e.stopPropagation(),e.preventDefault(),n.shell.openExternal(e.url);const t=r.parse(e.url).pathname.split(/(\/|\\)/);let o=t[t.length-1];if(void 0===o)return console.warn("Failed to get the page id"),void 0;o-=0,isNaN(o)||(s.event.emit("record-news-id",o),console.log(`Open the news: ${o}`))},startLoading(e){this.loading=!0},stopLoading(e){if(this.loading=!1,!e.target||!e.target.src)return console.warn("Could not get a link to the wall page"),void 0;const t=r.parse(e.target.src).pathname.split(/(\/|\\)/);let n=t[t.length-1];if(void 0===n)return console.warn("Failed to get the page id"),void 0;n-=0,isNaN(n)||(s.event.emit("record-news-id",n),console.log(`Open the news: ${n}`))}},exports.ready=async function(){Date.now()-this.news_msg_time>3e4&&await this.$root.updateNewsMsg();let e="",t=this.getPids();for(let r of this.shouldreadnews)if(-1===t.indexOf(r.pid)){if(2==r.msg_type){e=r.url,s.event.emit("record-news-id",r.pid);break}e||"announcement"!==r.category&&"news"!==r.category||(e=this.news_category_url.replace("{{language}}",Editor.lang).replace("{{category}}",r.category))}e=(e=e||this.news_category_url.replace("{{language}}",Editor.lang).replace("{{category}}","announcement")).replace("/zh",""),this.src=this.handleUrl(e)},exports.beforeDestroy=async function(){await this.$root.updateNewsMsg()};