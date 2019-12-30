"use strict";var program=require("commander"),chalk=require("chalk"),command=require("../commands");program.version("1.0.0").usage("<command> [options]"),program.command("cocos [env]").option("-d, --pub_dir [pubDir]","指定release文件夹，默认为./build/web-mobile文件夹").option("--small-pack","是否小包模式").description("build cocos project to quickgame").action(function(o,e){process.env.NODE_ENV="release"!=o?"development":"production",command.cocos_v2(e.pub_dir,"release"!=o,e.smallPack)}),program.command("cocoscreator [env]").option("--small-pack","是否小包模式").description("build cocos project to quickgame").action(function(o,e){process.env.NODE_ENV="release"!=o?"development":"production",command.cocoscreator("release"!=o,e.smallPack)}),program.command("subpack [env]").option("--no-build-js","是否构建JS文件").description("build normal project to quickgame with dev enviroment").action(function(o,e){process.env.NODE_ENV="release"!=o?"development":"production",command.normal(e.buildJs,"release"!=o)}),program.on("--help",function(){console.log(),console.log("Run "+chalk.cyan("quickgame <command> --help")+" for detailed usage of given command."),console.log()}),require("fs-extra"),setTimeout(function(){program.parse(process.argv),process.argv.slice(2).length||program.outputHelp()},0);