import { existsSync, mkdirSync } from "fs-extra";
import { tmpdir } from "os";
import { join, normalize } from "path";
import { ICmdOptions } from "../options/ICmdOptions";

export const getGitRepoPath = (
  GitUserOption: ICmdOptions,
  GitPswOption: ICmdOptions
) => {
  if (GitUserOption.exist && GitPswOption.exist)
    return `https://${GitUserOption.value}:${GitPswOption.value}@github.com/wisegar-org/wgo-agv.git`;
  if (GitUserOption.exist)
    return `https://${GitUserOption.value}@github.com/wisegar-org/wgo-agv.git`;
  return "https://github.com/wisegar-org/wgo-agv.git";
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
