import { appendFileSync, copySync, existsSync, writeFileSync } from "fs-extra";
import path from "path";
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
  serverSourcePath,
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

    debugger;
    Logger.Line("Installing root dependencies...", () => {
      if (existsSync(rootSourcePath)) {
        runScript(`npm install`, rootSourcePath, (err) => {
          Logger.Error(err, true);
        });
      }
    });

    /**
     * Server building
     */
    const destination = path.join(app_root, "build");
    const sourceFiles = ["package.json", "package-lock.json", ".npmrc"];

    Logger.Line("Installing server dependencies...", () => {
      if (existsSync(serverSourcePath)) {
        runScript(`npm install`, serverSourcePath, (err) => {
          Logger.Error(err, true);
        });
      }
    });

    Logger.Line("Transpiling the application code...", () => {
      if (existsSync(serverSourcePath)) {
        runScript(`npx tsc`, serverSourcePath, (err) => {
          Logger.Error(err, true);
        });
      }
    });

    Logger.Line("Building options.env file...", () => {
      const ENV_FILENAME = `${destination}/.env`;
      writeFileSync(
        ENV_FILENAME,
        `NODE_ENV=${AgvCommand.EnvCmdOption.value} \n`
      );
      appendFileSync(ENV_FILENAME, `PORT=${AgvCommand.PortCmdOption.value} \n`);
      appendFileSync(ENV_FILENAME, `MODULES=${["agv"]} \n`);
      appendFileSync(
        ENV_FILENAME,
        `APP_WEB_ROOT=${AgvCommand.RootCmdOption.value} \n`
      );
      appendFileSync(
        ENV_FILENAME,
        `SETTINGS_PATH=${[AgvCommand.SettingCmdOption.value]} \n`
      );
    });

    // Logger.Line("Updating build settings & dependencies...", () => {
    //   sourceFiles.forEach((file) => {
    //     copySync(file, `${destination}/${file}`);
    //   });
    //   moduleFiles.forEach((file) => {
    //     copySync(`./src/modules/${app_name}/${file}`, `${destination}/${file}`);
    //   });
    //   copySync("./build", `${destination}`);
    // });

    /**
     * Client building
     */
    // Compilar el client

    /**
     * Deploy En la carpeta root del proyecto
     */
  };
}
