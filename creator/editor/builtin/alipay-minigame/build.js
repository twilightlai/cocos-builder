let e,i=require("fire-path"),t=require("fire-fs");module.exports={name:Editor.T("alipay-minigame.platform_name"),platform:"alipay",extends:"mini-game",messages:{"script-build-finished":async function(a,r){let n=Editor.Profile.load("profile://project/alipay-minigame.json");e=n.data,await async function(a,r){try{(function(e){let i=e.dest;Editor.log("Copy Alipay project files"),t.copySync(Editor.url("packages://alipay-adapter/alipaygame"),i)})(r),function(a){let r=a.dest,n=i.join(r,"game.json"),l=JSON.parse(t.readFileSync(n,"utf8"));l.screenOrientation=e.deviceOrientation,t.writeFileSync(n,JSON.stringify(l,null,4),"utf8")}(r),function(a){if(!e.remoteUrl)return;let r=i.join(a.dest,"game.js"),n=t.readFileSync(r,"utf8");if(!n)return;let l='myDownloader.REMOTE_SERVER_ROOT = "'+e.remoteUrl+'"';n=n.replace(/myDownloader.REMOTE_SERVER_ROOT = ""/g,l),t.writeFileSync(r,n,"utf8")}(r),Editor.Metrics.trackEvent("Project","BetaPlatforms","alipay-minigame",{orientation:e.deviceOrientation}),a.reply()}catch(e){a.reply(e)}}(a,r)}},settings:Editor.url("packages://alipay-minigame/build-ui.js")};