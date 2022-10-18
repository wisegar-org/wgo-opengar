import { tmpdir } from "node:os";
import { join } from "node:path";

export const gitRepoPath = "https://github.com/wisegar-org/wgo-agv.git";
export const tmpUserPath = tmpdir();
export const rootSourcePath = join(tmpUserPath, "wgo-agv");

export const clientSourcePath = join(rootSourcePath, "client");
export const serverSourcePath = join(rootSourcePath, "server");
