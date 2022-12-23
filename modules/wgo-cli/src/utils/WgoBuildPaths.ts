import { tmpdir } from "os";
import { ICmdOptions } from "../options/ICmdOptions";

const wgoGitRepoPath = "github.com/wisegar-org/wgo-opengar.git";

export const getWgoGitRepoPath = (
  GitUserOption: ICmdOptions,
  GitPswOption: ICmdOptions
) => {
  if (GitUserOption.exist && GitPswOption.exist)
    return `https://${GitUserOption.value}:${GitPswOption.value}@${wgoGitRepoPath}`;
  if (GitUserOption.exist)
    return `https://${GitUserOption.value}@${wgoGitRepoPath}`;
  return `https://${wgoGitRepoPath}`;
};

export const wgoTmpUserPath = tmpdir();
