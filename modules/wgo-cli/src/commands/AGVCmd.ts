import { fstat } from "fs";
import {
  appendFileSync,
  copySync,
  existsSync,
  writeFileSync,
  readJsonSync,
  writeJsonSync,
  emptyDirSync,
} from "fs-extra";
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
  buildSourcePath,
  serverSourcePath,
  buildClientSourcePath,
  clientSourcePath,
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
    ValidateOption(AgvCommand.BranchOption);
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

    /**
     * Server building
     */
    const destination = app_root;
    const sourceFiles = ["package.json", "package-lock.json", ".npmrc"];
    const buildServerPath = path.join(serverSourcePath, "build");

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
      if (existsSync(serverSourcePath) && existsSync(buildServerPath)) {
        sourceFiles.forEach((file) => {
          copySync(
            path.join(serverSourcePath, file),
            path.join(buildServerPath, file)
          );
        });
        copySync(buildServerPath, buildSourcePath);
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
    const buildClientPath = path.join(clientSourcePath, "dist", "ssr");

    Logger.Line("Installing client dependencies...", () => {
      if (existsSync(clientSourcePath)) {
        runScript(`npm install`, clientSourcePath, (err) => {
          Logger.Error(err, true);
        });
      }
    });

    Logger.Line("Building client settings...", () => {
      const buildSettings = path.join(clientSourcePath, "settings.build.json");
      if (existsSync(clientSourcePath)) {
        const packageJson = readJsonSync("package.json", { throws: false });
        writeJsonSync(buildSettings, {
          API_BASE: AgvCommand.UrlCmdOption.value,
          VERSION: packageJson.version || "unknown",
          MODULES: "agv",
        });
      }
    });

    Logger.Line("Transpiling the client application code...", () => {
      if (existsSync(clientSourcePath)) {
        runScript(`npx quasar build -m ssr`, clientSourcePath, (err) => {
          Logger.Error(err, true);
        });
      }
    });

    Logger.Line("Updating client build settings & dependencies...", () => {
      if (existsSync(serverSourcePath) && existsSync(buildServerPath)) {
        sourceFilesClient.forEach((file) => {
          copySync(
            path.join(clientSourcePath, file),
            path.join(buildClientPath, file)
          );
        });

        copySync(buildClientPath, buildClientSourcePath);
      }
    });

    /**
     * Deploy En la carpeta root del proyecto
     */

    Logger.Line("Cleaning destination path...", () => {
      emptyDirSync(destination);
    });

    Logger.Line("Copy files to destination path...", () => {
      if (existsSync(buildSourcePath) && existsSync(buildServerPath)) {
        copySync(buildSourcePath, destination);
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
