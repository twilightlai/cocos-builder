const e=require("path"),n=require("./index.js"),i=require("./plugins/babel"),r=require("./plugins/module"),t=require("./engine-utils/delete-engine-cache");module.exports=(async o=>{if(!o.enginePath)throw new Error("Please specify the engine path");let a=new n;function s(n){return e.join(o.enginePath,n||"")}let l=[s("external/box2d/box2d.js"),s("extensions/dragonbones/lib/dragonBones.js"),s("extensions/spine/lib/spine.js")],u={root:s(),entries:[s("index.js")],out:s("bin/.cache/dev"),plugins:[i({exludesForSourceMap:l}),r({exludesForSourceMap:l,transformPath:(n,i,r)=>e.join("engine-dev",e.relative(r.out,i))}),t(s)],clear:!1,onlyRecordChanged:!0};return o.enableWatch?await a.watch(u):await a.build(u),a});