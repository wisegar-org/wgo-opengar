import {
  BranchOption,
  EnvCmdOption,
  GraphUrlCmdOption,
  PortCmdOption,
  RootCmdOption,
  SettingCmdOption,
  UrlCmdOption,
  GitUserOption,
  GitPswOption,
  WSCmdOption,
  ClientModeOption,
} from "../options/ICmdOptions";
import {
  ValidateOption,
  ValidateOptionalOption,
} from "../utils/CmdOptionsParser";
import { Command } from "./Command";
import { join } from "path";
import { Logger } from "../utils/Logger";
import {
  appendFileSync,
  copySync,
  emptyDirSync,
  existsSync,
  mkdirSync,
  writeFileSync,
} from "fs-extra";
import { getWgoGitRepoPath } from "../utils/WgoBuildPaths";
import { runScript } from "../utils/ExecScript";
import { getWorkspacePath } from "../utils/AgvBuildPaths";

export class AgvCommand extends Command {
  public static CMD = "agv";

  public static Description =
    "Compile & build service & client agv application";
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
  public static ClientModeOption = ClientModeOption;

  public static Execute = () => {
    ValidateOption(AgvCommand.EnvCmdOption);
    ValidateOption(AgvCommand.PortCmdOption);
    ValidateOption(AgvCommand.RootCmdOption);
    ValidateOption(AgvCommand.UrlCmdOption);
    ValidateOption(AgvCommand.GraphUrlCmdOption);
    ValidateOption(AgvCommand.BranchOption);
    ValidateOption(AgvCommand.SettingCmdOption);
    ValidateOptionalOption(AgvCommand.WSCmdOption);
    ValidateOptionalOption(AgvCommand.GitUserOption);
    ValidateOptionalOption(AgvCommand.GitPswOption);
    ValidateOptionalOption(AgvCommand.ClientModeOption);
    if (
      !AgvCommand.EnvCmdOption.exist ||
      !AgvCommand.RootCmdOption.exist ||
      !AgvCommand.UrlCmdOption.exist ||
      !AgvCommand.SettingCmdOption.exist
    ) {
      process.exit(1);
    }

    const wgoTmpUserPath = getWorkspacePath(AgvCommand.WSCmdOption);
    const wgoTmpBuildPath = join(wgoTmpUserPath, "build");
    const wgoRootSourcePath = join(wgoTmpUserPath, "wgo-opengar");
    const app_name = `${AgvCommand.CMD}-${AgvCommand.EnvCmdOption.value}-${AgvCommand.PortCmdOption.value}`;
    const app_root = join(
      AgvCommand.RootCmdOption.value ? AgvCommand.RootCmdOption.value : "",
      app_name
    );

    Logger.Line("Cleaning workspace...", () => {
      if (existsSync(wgoRootSourcePath)) {
        runScript(`npx rimraf ${wgoRootSourcePath}`, wgoTmpUserPath, (err) => {
          Logger.Error(err, true);
        });
      }
    });

    Logger.Line("Downloading last app version...", () => {
      const repositoryBranch = AgvCommand.BranchOption.exist
        ? AgvCommand.BranchOption.value
        : "production";
      const gitRepoPath = getWgoGitRepoPath(
        AgvCommand.GitUserOption,
        AgvCommand.GitPswOption
      );
      runScript(
        `git clone ${gitRepoPath} --branch ${repositoryBranch}`,
        wgoTmpUserPath,
        (err) => {
          Logger.Error(err, true);
        }
      );
    });

    const wgoServerSourcePath = wgoRootSourcePath;
    Logger.Line("Validating wgo module name...", () => {
      if (!existsSync(wgoServerSourcePath)) {
        Logger.Error(`Module ${AgvCommand.CMD} don't exist`, true);
      }
    });

    const sourceFiles = ["package.json", "package-lock.json", ".npmrc"];

    /**
     * Server building
     */
    const destination = app_root;
    const buildServerPath = join(wgoServerSourcePath, "build");

    Logger.Line("Installing server dependencies...", () => {
      if (existsSync(wgoServerSourcePath)) {
        runScript(`npm install`, wgoServerSourcePath, (err) => {
          Logger.Error(err, true);
        });
      }
    });

    Logger.Line("Transpiling the application code...", () => {
      if (existsSync(wgoServerSourcePath)) {
        runScript(`npm run build`, wgoServerSourcePath, (err) => {
          Logger.Error(err, true);
        });
      }
    });

    Logger.Line("Building options.env file...", () => {
      if (existsSync(buildServerPath)) {
        const ENV_FILENAME = join(buildServerPath, ".env");
        writeFileSync(
          ENV_FILENAME,
          `NODE_ENV=${AgvCommand.EnvCmdOption.value} \n`
        );
        appendFileSync(
          ENV_FILENAME,
          `PORT=${AgvCommand.PortCmdOption.value} \n`
        );
        appendFileSync(ENV_FILENAME, `APP_WEB_ROOT=${app_root} \n`);
        appendFileSync(
          ENV_FILENAME,
          `CLIENT_WEB_ROOT=${join(app_root, "client")} \n`
        );
        appendFileSync(
          ENV_FILENAME,
          `MOBILE_WEB_ROOT=${join(app_root, "mobile")} \n`
        );
        appendFileSync(
          ENV_FILENAME,
          `SETTINGS_PATH=${[AgvCommand.SettingCmdOption.value]} \n`
        );
        appendFileSync(
          ENV_FILENAME,
          `APP_WEB_HOST=${[AgvCommand.UrlCmdOption.value]} \n`
        );
        appendFileSync(
          ENV_FILENAME,
          `HOST_BASE=${[AgvCommand.UrlCmdOption.value]} \n`
        );
        if (existsSync(wgoServerSourcePath)) {
          copySync(ENV_FILENAME, join(wgoServerSourcePath, ".env"));
        }
      }
    });

    Logger.Line("Updating build settings & dependencies...", () => {
      if (existsSync(wgoServerSourcePath) && existsSync(buildServerPath)) {
        sourceFiles.forEach((file) => {
          copySync(
            join(wgoServerSourcePath, file),
            join(buildServerPath, file)
          );
        });
      }
    });

    /**
     * Client building
     */
    let clientName = "client";
    AgvCommand.ExecuteClient({
      clientName,
      buildServerPath,
      wgoServerSourcePath,
      wgoBuildClientSourcePath: join(buildServerPath, clientName),
      wgoClientSourcePath: join(wgoServerSourcePath, clientName),
      clientModeOption: AgvCommand.ClientModeOption.value,
    });

    /**
     * Mobile building
     */
    clientName = "mobile";
    AgvCommand.ExecuteClient({
      clientName,
      buildServerPath,
      wgoServerSourcePath,
      wgoBuildClientSourcePath: join(buildServerPath, clientName),
      wgoClientSourcePath: join(wgoServerSourcePath, clientName),
      clientModeOption: AgvCommand.ClientModeOption.value,
    });

    /**
     * Deploy En la carpeta root del proyecto
     */

    Logger.Line("Cleaning destination ..", () => {
      emptyDirSync(wgoTmpBuildPath);
      emptyDirSync(destination);
    });

    Logger.Line("Copy files to build destination ..", () => {
      if (existsSync(wgoTmpBuildPath) && existsSync(buildServerPath)) {
        copySync(buildServerPath, wgoTmpBuildPath);
      }
    });

    Logger.Line("Copy files to destination ..", () => {
      if (existsSync(destination) && existsSync(buildServerPath)) {
        copySync(buildServerPath, destination);
      }
    });

    Logger.Line("Installing final dependencies...", () => {
      if (existsSync(destination)) {
        Logger.Line("Installin server dependencies...");
        runScript(`npm install`, destination, (err) => {
          Logger.Error(err, true);
        });
      }
      const destinationClient = join(destination, "client");
      if (existsSync(destinationClient)) {
        Logger.Line("Installin client dependencies...");
        runScript(`npm install`, destinationClient, (err) => {
          Logger.Error(err, true);
        });
      }
      const destinationMobile = join(destination, "mobile");
      if (existsSync(destinationMobile)) {
        Logger.Line("Installin mobile dependencies...");
        runScript(`npm install`, destinationMobile, (err) => {
          Logger.Error(err, true);
        });
      }
    });
  };

  public static ExecuteClient = (config: {
    clientName: string;
    buildServerPath: string;
    wgoServerSourcePath: string;
    wgoClientSourcePath: string;
    wgoBuildClientSourcePath: string;
    clientModeOption: string;
  }) => {
    const isSSR = config.clientModeOption === "ssr";
    const sourceFilesClient = ["package.json", "package-lock.json", ".npmrc"];
    const buildClientPath = join(
      config.wgoClientSourcePath,
      "dist",
      isSSR ? "ssr" : "spa"
    );

    Logger.Line(`Building options.env ${config.clientName} file...`, () => {
      if (existsSync(config.wgoClientSourcePath)) {
        const ENV_FILENAME = join(config.wgoClientSourcePath, ".env");
        writeFileSync(
          ENV_FILENAME,
          `NODE_ENV=${AgvCommand.EnvCmdOption.value} \n`
        );
        appendFileSync(
          ENV_FILENAME,
          `PORT=${AgvCommand.PortCmdOption.value} \n`
        );
        appendFileSync(
          ENV_FILENAME,
          `APP_WEB_HOST=${[AgvCommand.UrlCmdOption.value]}${
            isSSR ? "/api" : ""
          } \n`
        );
      }
    });

    Logger.Line(`Installing ${config.clientName} dependencies...`, () => {
      if (existsSync(config.wgoClientSourcePath)) {
        runScript(`npm install`, config.wgoClientSourcePath, (err) => {
          Logger.Error(err, true);
        });
      }
    });

    Logger.Line(
      `Transpiling the ${config.clientName} application code...`,
      () => {
        if (existsSync(config.wgoClientSourcePath)) {
          const command = `npx quasar build ${isSSR ? "-m ssr" : ""}`;
          runScript(command, config.wgoClientSourcePath, (err) => {
            Logger.Error(err, true);
          });
        }
      }
    );

    Logger.Line(
      `Updating ${config.clientName} build settings & dependencies...`,
      () => {
        mkdirSync(config.wgoBuildClientSourcePath);
        if (
          existsSync(config.wgoClientSourcePath) &&
          existsSync(config.wgoBuildClientSourcePath)
        ) {
          sourceFilesClient.forEach((file) => {
            copySync(
              join(config.wgoClientSourcePath, file),
              join(buildClientPath, file)
            );
          });

          copySync(buildClientPath, config.wgoBuildClientSourcePath);
        }
      }
    );
  };
}
