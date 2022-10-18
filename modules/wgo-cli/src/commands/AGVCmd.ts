import { existsSync } from "fs-extra";
import path from "node:path";
import {
  BranchOption,
  EnvCmdOption,
  GraphUrlCmdOption,
  PortCmdOption,
  RootCmdOption,
  SettingCmdOption,
  UrlCmdOption,
} from "../options/ICmdOptions";
import {
  gitRepoPath,
  rootSourcePath,
  tmpUserPath,
} from "../utils/AgvBuildPaths";
import { ValidateOption } from "../utils/CmdOptionsParser";
import { runScript } from "../utils/ExecScript";
import { Logger } from "../utils/Logger";
import { Command } from "./Command";

export class AgvCommand extends Command {
  public static CMD = "agv";
  public static Description = "Compile & build service & client applications";
  public static EnvCmdOption = EnvCmdOption;
  public static PortCmdOption = PortCmdOption;
  public static RootCmdOption = RootCmdOption;
  public static UrlCmdOption = UrlCmdOption;
  public static GraphUrlCmdOption = GraphUrlCmdOption;
  public static SettingCmdOption = SettingCmdOption;
  public static BranchOption = BranchOption;

  public static Execute = () => {
    debugger;
    ValidateOption(AgvCommand.EnvCmdOption);
    ValidateOption(AgvCommand.PortCmdOption);
    ValidateOption(AgvCommand.RootCmdOption);
    ValidateOption(AgvCommand.UrlCmdOption);
    ValidateOption(AgvCommand.GraphUrlCmdOption);
    ValidateOption(AgvCommand.SettingCmdOption);
    if (
      !AgvCommand.EnvCmdOption.exist ||
      !AgvCommand.RootCmdOption.exist ||
      !AgvCommand.UrlCmdOption.exist ||
      !AgvCommand.SettingCmdOption.exist
    ) {
      process.exit(1);
    }

    const app_name = `wgo-agv-${AgvCommand.EnvCmdOption.value}-${AgvCommand.PortCmdOption.value}`;
    const app_root = path.join(
      AgvCommand.RootCmdOption.value ? AgvCommand.RootCmdOption.value : "",
      app_name
    );

    Logger.Line("Cleaning workspace...", () => {
      if (existsSync(rootSourcePath)) {
        runScript(`npx rimraf ${rootSourcePath}`, tmpUserPath, (err) => {
          Logger.Error(err, true);
        });
      }
    });

    Logger.Line("Downloading last app version...", () => {
      const repositoryBranch = AgvCommand.BranchOption.exist
        ? AgvCommand.BranchOption.value
        : "production";

      runScript(
        `git clone ${gitRepoPath} --branch ${repositoryBranch}`,
        tmpUserPath,
        (err) => {
          Logger.Error(err, true);
        }
      );
    });

    Logger.Line("Build agv application", () => {
      if (existsSync(rootSourcePath)) {
        runScript(
          `node ./scripts/solution-build.js ${AgvCommand.EnvCmdOption.value} ${AgvCommand.PortCmdOption.value} ${AgvCommand.RootCmdOption.value} ${AgvCommand.UrlCmdOption.value} ${AgvCommand.SettingCmdOption.value}`,
          rootSourcePath,
          (err) => {
            Logger.Error(err, true);
          }
        );
      }
    });
  };
}
