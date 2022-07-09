#!/usr/bin/env node
import { program } from "commander";
import chalk from "chalk";
import figlet from "figlet";
import pkg from "../package.json" assert { type: "json" };

program.name("zvm-cli").usage(`<command> [option]`).version(pkg.version);

program.on("--help", function () {
  console.log(
    "\r\n" +
      figlet.textSync("zvm", {
        font: "3D-ASCII",
        horizontalLayout: "default",
        verticalLayout: "default",
        width: 80,
        whitespaceBreak: true,
      })
  );
  console.log();
  console.log(
    `Run ${chalk.cyan(
      "zvm-cli <command> --help"
    )} for detailed usage of given command.`
  );
  console.log();
});

program
  .command("create <project-name>") // 增加创建指令
  .description("create a new project") // 添加描述信息
  .option("-f, --force", "overwrite target directory if it exists") // 强制覆盖
  .action((projectName, cmd) => {
    // 处理用户输入create 指令附加的参数
    import("../lib/create.js").then(({ default: create }) =>
      create(projectName, cmd)
    );
  });

// 解析用户执行时输入的参数
// process.argv 是 nodejs 提供的属性
// npm run server --port 3000
// 后面的 --port 3000 就是用户输入的参数
program.parse(process.argv);
