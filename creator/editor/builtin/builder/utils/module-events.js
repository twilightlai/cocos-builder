const e=require("fire-fs"),{promisify:t}=require("util");require("fire-path");let o=t(Editor.Profile.load.bind(Editor.Profile));exports.trackModuleEvent=async function(){let t=await o("profile://project/project.json");Date.now()-t.data["last-module-event-record-time"]<6048e5||(function(e){e.forEach(e=>{Editor.Ipc.sendToMain("metrics:track-event",{category:"Project",action:"Modules",label:e.name})})}(function(){let t=Editor.url("unpack://engine/modules.json");return e.readJsonSync(t)}().filter(e=>-1===t.data["excluded-modules"].indexOf(e.name))),function(e){e.data["last-module-event-record-time"]=Date.now(),e.save()}(t))};