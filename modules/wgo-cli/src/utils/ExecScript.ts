import { execSync } from "child_process";
import { Logger } from "./Logger";

export const runScript = (
  cmd: string,
  cwd: string,
  onError?: (err: any) => void
) => {
  try {
    execSync(cmd, {
      cwd: cwd,
      stdio: ["inherit"],
    });
  } catch (err: any) {
    const { stderr, stdout, status, message } = err;
    if (stderr) {
      Logger.Error((stderr as Buffer).toString("utf8"));
    }
    if (stdout) {
      Logger.Error((stdout as Buffer).toString("utf8"));
    }
    if (onError) onError(err);
  }
};

export const runRawScript = (
  cmd: string,
  cwd: string,
  onError?: (err: any) => void
) => {
  try {
    execSync(cmd, {
      cwd: cwd,
      stdio: "inherit",
    });
  } catch (err: any) {
    const { stderr, stdout, status, message } = err;
    if (stderr) {
      Logger.Error((stderr as Buffer).toString("utf8"));
    }
    if (stdout) {
      Logger.Error((stdout as Buffer).toString("utf8"));
    }
    if (onError) onError(err);
  }
};
