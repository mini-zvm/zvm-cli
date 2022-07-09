import ora from "ora";

export async function loading(message, fn) {
  const spinner = ora(message);
  spinner.start(); // 开启加载
  try {
    let executeRes = await fn();
    spinner.succeed();
    return executeRes;
  } catch (error) {
    console.log(error);
    spinner.fail("request fail");
    process.exit(1);
    // await sleep(1000);
    // return loading(message, fn, ...args);
  }
}
