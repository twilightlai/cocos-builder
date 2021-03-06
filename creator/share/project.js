"use strict";
const e = require("fire-path"),
  r = require("fire-fs"),
  o = require("lodash"),
  i = require("semver");
let n = {};
(module.exports = n),
  (n.create = function(o, i, n) {
    let t = Editor.dev
      ? Editor.url("app://")
      : e.join(Editor.url("app://"), "..", "..");
    if ((Editor.log("install path: " + t), e.contains(t, o)))
      return (
        n && n(new Error(Editor.T("DASHBOARD.error_project_in_install"))),
        void 0
      );
    if (r.existsSync(o))
      return n && n(new Error("The path " + o + " already exists.")), void 0;
    let s = function(i) {
      r.copy(
        Editor.url("unpack://utils/api/creator.d.ts"),
        e.join(o, "creator.d.ts"),
        n => {
          n && Editor.log(n),
            r.copy(
              Editor.url("unpack://utils/vscode-extension/jsconfig.json"),
              e.join(o, "jsconfig.json"),
              e => {
                e && Editor.log(e), i(e);
              }
            );
        }
      );
    };
    if (i)
      (process.env.checkedVersion = !0),
        r.copy(i, o, e => {
          e && console.log(e), s(n);
        });
    else {
      r.mkdirsSync(o),
        r.mkdirSync(e.join(o, "settings")),
        r.mkdirSync(e.join(o, "local")),
        r.mkdirSync(e.join(o, "packages")),
        r.mkdirSync(e.join(o, "assets")),
        r.mkdirSync(e.join(o, "library"));
      const i = require("node-uuid");
      let t = {
        engine: "cocos-creator-js",
        packages: "packages",
        version: Editor.versions.CocosCreator,
        id: i.v4()
      };
      r.writeFileSync(e.join(o, "project.json"), JSON.stringify(t, null, 2)),
        r.copySync(
          Editor.url("unpack://templates/hello-world/.gitignore"),
          e.join(o, ".gitignore")
        ),
        s(n);
    }
  }),
  (n.add = function(e) {
    let r = Editor.App._profile.data,
      o = r["recently-opened"].indexOf(e);
    -1 !== o && r["recently-opened"].splice(o, 1),
      r["recently-opened"].unshift(e),
      Editor.App._profile.save();
  }),
  (n.remove = function(e) {
    let r = Editor.App._profile.data;
    o.remove(r["recently-opened"], function(r) {
      return r === e;
    }),
      Editor.App._profile.save();
  }),
  (n.check = function(o, t) {
    if (!1 === r.existsSync(o))
      return t && t(new Error("Project not exists!")), void 0;
    let s = Editor.dev
      ? Editor.url("app://")
      : e.join(Editor.url("app://"), "..", "..");
    // if (e.contains(s, o))
    //   return (
    //     t && t(new Error(Editor.T("DASHBOARD.error_project_in_install_open"))),
    //     void 0
    //   );
    n.getInfo(o, function(n) {
      if (!n) return t && t(new Error("Can not find project.json")), void 0;
      if (n.error) return t && t(new Error(n.error)), void 0;
      let s = n.project;
      if (
        s &&
        (!process.env.checkedVersion || "false" === process.env.checkedVersion)
      ) {
        let e = s.version,
          r = !e,
          c =
            r ||
            i.satisfies(e, "<" + Editor.versions.CocosCreator, {
              includePrerelease: !0
            }),
          d =
            e &&
            i.satisfies(e, ">" + Editor.versions.CocosCreator, {
              includePrerelease: !0
            });
        if (c || d) {
          let i = "MESSAGE.check_project_version.degrade";
          if (
            (c &&
              (i = r
                ? "MESSAGE.check_project_version.upgrade_before_v2_1_2"
                : "MESSAGE.check_project_version.upgrade"),
            1 ===
              Editor.Dialog.messageBox({
                type: "question",
                buttons: [Editor.T("MESSAGE.confirm"), Editor.T("SHARED.exit")],
                message: Editor.T(i, {
                  projectVer: e,
                  editorVer: Editor.versions.CocosCreator,
                  projectPath: o
                }),
                defaultId: 1,
                cancelId: 1,
                noLink: !0
              }))
          )
            return (n.abort = !0), t && t(null, n), void 0;
        }
      }
      process.env.checkedVersion = !0;
      let c = e.join(o, "settings");
      r.existsSync(c) || r.mkdirSync(c),
        (c = e.join(o, "local")),
        r.existsSync(c) || r.mkdirSync(c),
        (c = e.join(o, "packages")),
        r.existsSync(c) || r.mkdirSync(c),
        (c = e.join(o, "assets")),
        r.existsSync(c) || r.mkdirSync(c),
        (c = e.join(o, "library")),
        r.existsSync(c) || r.mkdirSync(c),
        t && t(null, n);
    });
  }),
  (n.getInfo = function(o, i) {
    let n,
      t = e.join(o, "project.json");
    if (!1 === r.existsSync(t)) return i && i(), void 0;
    try {
      n = JSON.parse(r.readFileSync(t));
    } catch (r) {
      return (
        i &&
          i({
            path: o,
            name: e.basename(o),
            engine: "unknown",
            project: n,
            error: "project.json broken: " + r.message,
            abort: !1
          }),
        void 0
      );
    }
    i && i({ path: o, name: e.basename(o), project: n, abort: !1 });
  });
