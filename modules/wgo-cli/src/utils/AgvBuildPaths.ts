import { existsSync, mkdirSync } from "fs-extra";
import { tmpdir } from "os";
import { join, normalize } from "path";
import { ICmdOptions } from "../options/ICmdOptions";

export const getGitRepoPath = (
  GitUserOption: ICmdOptions,
  GitPswOption: ICmdOptions
) => {
  if (GitPswOption.exist)
    return `https://${GitPswOption.value}@dev.azure.com/wisegar/wgo-agv/_git/wgo-agv`;
};

export const getWorkspacePath = (WSCmdOption: ICmdOptions) => {
  if (WSCmdOption.exist) {
    const wspath = normalize(WSCmdOption.value);
    if (!existsSync(wspath)) mkdirSync(wspath);
    return wspath;
  }
  return tmpdir();
};

export const getRootSourcePath = (WSCmdOption: ICmdOptions) => {
  return normalize(join(getWorkspacePath(WSCmdOption), "wgo-agv"));
};

export const getClientSourcePath = (WSCmdOption: ICmdOptions) => {
  return normalize(join(getRootSourcePath(WSCmdOption), "client"));
};
export const getServerSourcePath = (WSCmdOption: ICmdOptions) => {
  return normalize(join(getRootSourcePath(WSCmdOption), "server"));
};
export const getBuildSourcePath = (WSCmdOption: ICmdOptions) => {
  return normalize(join(getRootSourcePath(WSCmdOption), "build"));
};
export const buildClientSourcePath = (WSCmdOption: ICmdOptions) => {
  return normalize(join(getBuildSourcePath(WSCmdOption), "clientApp"));
};
