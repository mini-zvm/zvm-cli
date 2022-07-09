import path from "path";
import fs from "fs-extra";
import chalk from "chalk";
import inquirer from "inquirer";
import util from "util";
import downloadGitRepo from "download-git-repo";
import { loading } from "./util.js";

async function gitDownload(url, dest) {
  const down = util.promisify(downloadGitRepo);
  await down(url, dest);
}

export default async function (projectName, cmd) {
  const cwd = process.cwd();
  const targetDir = path.join(cwd, projectName);
  if (fs.existsSync(targetDir)) {
    if (cmd.force) {
      fs.removeSync(targetDir);
    } else {
      console.log(chalk.red.bold(`${targetDir} already exists`));
      const { overwrite } = await inquirer.prompt([
        {
          name: "overwrite",
          type: "list",
          message: "Target directory exists, overwrite?",
          choices: [
            { name: "yes", value: true },
            { name: "no", value: false },
          ],
        },
      ]);
      if (overwrite) {
        fs.removeSync(targetDir);
      } else {
        process.exit(1);
      }
    }
  }
  await loading(
    "downloading, please wait...",
    async () => await gitDownload("kakachake/mini_mvvm_example_sfc", targetDir)
  );
  // 模板使用提示
  console.log(`\r\nSuccessfully created project ${chalk.cyan(projectName)}`);
  console.log(`\r\n  cd ${chalk.cyan(projectName)}`);
  console.log("  npm install");
  console.log("  npm run dev\r\n");
}
