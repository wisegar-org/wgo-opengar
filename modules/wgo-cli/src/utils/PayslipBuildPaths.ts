import { existsSync, mkdirSync } from "fs-extra";
import { tmpdir } from "os";
import { join, normalize } from "path";
import { ICmdOptions } from "../options/ICmdOptions";

export const getGitClientRepoPath = (
  GitUserOption: ICmdOptions,
  GitPswOption: ICmdOptions
) => {
  if (GitPswOption.exist)
    return `https://${GitPswOption.value}@dev.azure.com/wisegar/wgo-payslip/_git/wgo-payslip-client`;
};

export const getGitServerRepoPath = (
  GitUserOption: ICmdOptions,
  GitPswOption: ICmdOptions
) => {
  if (GitPswOption.exist)
    return `https://${GitPswOption.value}@dev.azure.com/wisegar/wgo-payslip/_git/wgo-payslip-server`;
};

export const getWorkspacePath = (WSCmdOption: ICmdOptions) => {
  if (WSCmdOption.exist) {
    const wspath = normalize(WSCmdOption.value);
    if (!existsSync(wspath)) mkdirSync(wspath);
    return wspath;
  }
  return tmpdir();
};
