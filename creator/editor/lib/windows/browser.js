"use strict";const e=require("fire-fs");let i=require("path").join(Editor.Project.path,"local","layout.windows.json");if(e.existsSync(i)){let r;try{r=JSON.parse(e.readFileSync(i,"utf8"))}catch(e){r=null}finally{r&&r.version||(Editor.warn("Invalid layout profile, remove old profile and init a new one at: "+i),e.removeSync(i))}}