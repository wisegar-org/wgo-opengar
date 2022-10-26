import {
  appendFileSync,
  copySync,
  existsSync,
  writeFileSync,
  readJsonSync,
  emptyDirSync,
} from "fs-extra";
import path from "path";
import {
  BranchOption,
  EnvCmdOption,
  GitPswOption,
  GitUserOption,
  GraphUrlCmdOption,
  PortCmdOption,
  RootCmdOption,
  SettingCmdOption,
  UrlCmdOption,
  WSCmdOption,
} from "../options/ICmdOptions";
import {
  getRootSourcePath,
  getBuildSourcePath,
  getServerSourcePath,
  buildClientSourcePath,
  getClientSourcePath,
  getGitRepoPath,
  getWorkspacePath,
} from "../utils/AgvBuildPaths";
import {
  ValidateOption,
  ValidateOptionalOption,
} from "../utils/CmdOptionsParser";
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
  public static GitUserOption = GitUserOption;
  public static GitPswOption = GitPswOption;
  public static WSCmdOption = WSCmdOption;

  public static Execute = () => {
    ValidateOption(AgvCommand.EnvCmdOption);
    ValidateOption(AgvCommand.PortCmdOption);
    ValidateOption(AgvCommand.RootCmdOption);
    ValidateOption(AgvCommand.UrlCmdOption);
    ValidateOption(AgvCommand.SettingCmdOption);
    ValidateOptionalOption(AgvCommand.WSCmdOption);
    ValidateOptionalOption(AgvCommand.GraphUrlCmdOption);
    ValidateOptionalOption(AgvCommand.BranchOption);
    ValidateOptionalOption(AgvCommand.GitUserOption);
    ValidateOptionalOption(AgvCommand.GitPswOption);
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
      if (existsSync(getRootSourcePath(AgvCommand.WSCmdOption))) {
        runScript(
          `npx rimraf ${getRootSourcePath(AgvCommand.WSCmdOption)}`,
          getWorkspacePath(AgvCommand.WSCmdOption),
          (err) => {
            Logger.Error(err, true);
          }
        );
      }
    });
    debugger;
    Logger.Line("Downloading last app version...", () => {
      const repositoryBranch = AgvCommand.BranchOption.exist
        ? AgvCommand.BranchOption.value
        : "production";
      const gitRepoPath = getGitRepoPath(
        AgvCommand.GitUserOption,
        AgvCommand.GitPswOption
      );
      runScript(
        `git clone ${gitRepoPath} --branch ${repositoryBranch}`,
        getWorkspacePath(AgvCommand.WSCmdOption),
        (err) => {
          Logger.Error(err, true);
        }
      );
    });

    /**
     * Server building
     */
    const destination = app_root;
    const sourceFiles = ["package.json", "package-lock.json", ".npmrc"];
    const buildServerPath = path.join(
      getServerSourcePath(AgvCommand.WSCmdOption),
      "build"
    );

    Logger.Line("Installing server dependencies...", () => {
      if (existsSync(getServerSourcePath(AgvCommand.WSCmdOption))) {
        runScript(
          `npm install`,
          getServerSourcePath(AgvCommand.WSCmdOption),
          (err) => {
            Logger.Error(err, true);
          }
        );
      }
    });

    Logger.Line("Transpiling the application code...", () => {
      if (existsSync(getServerSourcePath(AgvCommand.WSCmdOption))) {
        runScript(
          `npx tsc`,
          getServerSourcePath(AgvCommand.WSCmdOption),
          (err) => {
            Logger.Error(err, true);
          }
        );
      }
    });

    Logger.Line("Building options.env file...", () => {
      if (existsSync(buildServerPath)) {
        const ENV_FILENAME = path.join(buildServerPath, ".env");
        writeFileSync(
          ENV_FILENAME,
          `NODE_ENV=${AgvCommand.EnvCmdOption.value} \n`
        );
        appendFileSync(
          ENV_FILENAME,
          `PORT=${AgvCommand.PortCmdOption.value} \n`
        );
        appendFileSync(ENV_FILENAME, `MODULES=${["agv"]} \n`);
        appendFileSync(ENV_FILENAME, `APP_WEB_ROOT=${app_root} \n`);
        appendFileSync(
          ENV_FILENAME,
          `SETTINGS_PATH=${[AgvCommand.SettingCmdOption.value]} \n`
        );
      }
    });

    Logger.Line("Updating build settings & dependencies...", () => {
      if (
        existsSync(getServerSourcePath(AgvCommand.WSCmdOption)) &&
        existsSync(buildServerPath)
      ) {
        sourceFiles.forEach((file) => {
          copySync(
            path.join(getServerSourcePath(AgvCommand.WSCmdOption), file),
            path.join(buildServerPath, file)
          );
        });
        copySync(buildServerPath, getBuildSourcePath(AgvCommand.WSCmdOption));
      }
    });

    /**
     * Client building
     */
    const sourceFilesClient = [
      "package.json",
      "package-lock.json",
      ".npmrc",
      "settings.build.json",
    ];
    const buildClientPath = path.join(
      getClientSourcePath(AgvCommand.WSCmdOption),
      "dist",
      "ssr"
    );

    Logger.Line("Installing client dependencies...", () => {
      if (existsSync(getClientSourcePath(AgvCommand.WSCmdOption))) {
        runScript(
          `npm install`,
          getClientSourcePath(AgvCommand.WSCmdOption),
          (err) => {
            Logger.Error(err, true);
          }
        );
      }
    });

    Logger.Line("Building client settings...", () => {
      const buildSettings = path.join(
        getClientSourcePath(AgvCommand.WSCmdOption),
        "settings.build.json"
      );
      const packageSettings = path.join(
        getClientSourcePath(AgvCommand.WSCmdOption),
        "package.json"
      );
      if (existsSync(getClientSourcePath(AgvCommand.WSCmdOption))) {
        try {
          const packageJson = readJsonSync(packageSettings, { throws: false });
          writeFileSync(
            buildSettings,
            JSON.stringify({
              API_BASE: AgvCommand.UrlCmdOption.value,
              VERSION: packageJson.version || "unknown",
              MODULES: "agv",
            })
          );
          appendFileSync(buildSettings, "");
        } catch (err: any) {
          Logger.Error(err.message, true);
        }
      }
    });

    Logger.Line("Transpiling the client application code...", () => {
      if (existsSync(getClientSourcePath(AgvCommand.WSCmdOption))) {
        runScript(
          `npx quasar build -m ssr`,
          getClientSourcePath(AgvCommand.WSCmdOption),
          (err) => {
            Logger.Error(err, true);
          }
        );
      }
    });

    Logger.Line("Updating client build settings & dependencies...", () => {
      if (
        existsSync(getServerSourcePath(AgvCommand.WSCmdOption)) &&
        existsSync(buildServerPath)
      ) {
        sourceFilesClient.forEach((file) => {
          copySync(
            path.join(getClientSourcePath(AgvCommand.WSCmdOption), file),
            path.join(buildClientPath, file)
          );
        });

        copySync(
          buildClientPath,
          buildClientSourcePath(AgvCommand.WSCmdOption)
        );
      }
    });

    /**
     * Deploy En la carpeta root del proyecto
     */

    Logger.Line("Cleaning destination path...", () => {
      emptyDirSync(destination);
    });

    Logger.Line("Copy files to destination path...", () => {
      if (
        existsSync(getBuildSourcePath(AgvCommand.WSCmdOption)) &&
        existsSync(buildServerPath)
      ) {
        copySync(getBuildSourcePath(AgvCommand.WSCmdOption), destination);
      }
    });

    Logger.Line("Installing final dependencies...", () => {
      if (existsSync(destination)) {
        runScript(`npm install`, destination, (err) => {
          Logger.Error(err, true);
        });
      }
      const destinationClient = path.join(destination, "clientApp");
      if (existsSync(destinationClient)) {
        runScript(`npm install`, destinationClient, (err) => {
          Logger.Error(err, true);
        });
      }
    });
  };
}
