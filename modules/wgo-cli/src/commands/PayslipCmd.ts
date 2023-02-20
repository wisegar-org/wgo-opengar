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
  AppTypeOption,
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
import { runScript } from "../utils/ExecScript";
import {
  getGitClientRepoPath,
  getGitServerRepoPath,
  getWorkspacePath,
} from "../utils/PayslipBuildPaths";

export class PayslipCommand extends Command {
  public static CMD = "payslip";

  public static Description =
    "Compile & build service & client Payslip application";
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
  public static AppTypeOption = AppTypeOption;
  public static ClientModeOption = ClientModeOption;

  public static Execute = () => {
    ValidateOption(PayslipCommand.EnvCmdOption);
    ValidateOption(PayslipCommand.PortCmdOption);
    ValidateOption(PayslipCommand.RootCmdOption);
    ValidateOption(PayslipCommand.UrlCmdOption);
    ValidateOption(PayslipCommand.GraphUrlCmdOption);
    ValidateOption(PayslipCommand.BranchOption);
    ValidateOption(PayslipCommand.SettingCmdOption);
    ValidateOption(PayslipCommand.AppTypeOption);
    ValidateOptionalOption(PayslipCommand.WSCmdOption);
    ValidateOptionalOption(PayslipCommand.GitUserOption);
    ValidateOptionalOption(PayslipCommand.GitPswOption);
    ValidateOptionalOption(PayslipCommand.ClientModeOption);
    if (
      !PayslipCommand.EnvCmdOption.exist ||
      !PayslipCommand.RootCmdOption.exist ||
      !PayslipCommand.UrlCmdOption.exist ||
      !PayslipCommand.SettingCmdOption.exist ||
      !PayslipCommand.AppTypeOption.exist
    ) {
      process.exit(1);
    }

    Logger.Line("Validating wgo payslip app type [server or client]...", () => {
      if (
        PayslipCommand.AppTypeOption.value !== "client" &&
        PayslipCommand.AppTypeOption.value !== "server"
      ) {
        Logger.Error(
          `App type ${PayslipCommand.AppTypeOption.value} don't exist`,
          true
        );
      }
    });

    const wgoTmpUserPath = getWorkspacePath(PayslipCommand.WSCmdOption);
    const wgoTmpBuildPath = join(wgoTmpUserPath, "build");
    const wgoRootSourcePath = join(
      wgoTmpUserPath,
      `wgo-payslip-${PayslipCommand.AppTypeOption.value}`
    );
    const app_name = `wgo-${PayslipCommand.CMD}-${PayslipCommand.AppTypeOption.value}-${PayslipCommand.EnvCmdOption.value}-${PayslipCommand.PortCmdOption.value}`;
    const app_root = join(
      PayslipCommand.RootCmdOption.value
        ? PayslipCommand.RootCmdOption.value
        : "",
      app_name
    );
    const destination = app_root;
    const buildPath = join(wgoRootSourcePath, "build");
    Logger.Line("Cleaning workspace...", () => {
      if (existsSync(wgoRootSourcePath)) {
        runScript(`npx rimraf ${wgoRootSourcePath}`, wgoTmpUserPath, (err) => {
          Logger.Error(err, true);
        });
      }
    });

    Logger.Line("Downloading last app version...", () => {
      const repositoryBranch = PayslipCommand.BranchOption.exist
        ? PayslipCommand.BranchOption.value
        : "production";
      const getRepoFunc =
        PayslipCommand.AppTypeOption.value === "client"
          ? getGitClientRepoPath
          : getGitServerRepoPath;
      const gitRepoPath = getRepoFunc(
        PayslipCommand.GitUserOption,
        PayslipCommand.GitPswOption
      );
      runScript(
        `git clone ${gitRepoPath} --branch ${repositoryBranch}`,
        wgoTmpUserPath,
        (err) => {
          Logger.Error(err, true);
        }
      );
    });

    /**
     * Server building
     */
    if (PayslipCommand.AppTypeOption.value === "server") {
      PayslipCommand.ExecuteServer({
        app_root: app_root,
        wgoRootSourcePath: wgoRootSourcePath,
      });
    }

    /**
     * Client building
     */
    if (PayslipCommand.AppTypeOption.value === "client") {
      let clientName = "client";
      PayslipCommand.ExecuteClient({
        clientName,
        wgoClientSourcePath: wgoRootSourcePath,
        clientModeOption: PayslipCommand.ClientModeOption.value,
      });
    }

    /**
     * Deploy En la carpeta root del proyecto
     */
    Logger.Line("Cleaning destination ..", () => {
      emptyDirSync(destination);
    });

    Logger.Line("Copy files to build destination ..", () => {
      if (existsSync(wgoTmpBuildPath) && existsSync(buildPath)) {
        copySync(buildPath, wgoTmpBuildPath);
      }
    });

    Logger.Line("Copy files to destination ..", () => {
      if (existsSync(destination) && existsSync(buildPath)) {
        copySync(buildPath, destination);
      }
    });

    Logger.Line("Installing final dependencies...", () => {
      if (existsSync(destination)) {
        runScript(`npm install`, destination, (err) => {
          Logger.Error(err, true);
        });
      }
    });
  };

  public static ExecuteServer = (config: {
    app_root: string;
    wgoRootSourcePath: string;
  }) => {
    const wgoServerSourcePath = config.wgoRootSourcePath;

    const sourceFiles = ["package.json", "package-lock.json", ".npmrc"];
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
          `NODE_ENV=${PayslipCommand.EnvCmdOption.value} \n`
        );
        appendFileSync(
          ENV_FILENAME,
          `PORT=${PayslipCommand.PortCmdOption.value} \n`
        );
        appendFileSync(ENV_FILENAME, `APP_WEB_ROOT=${config.app_root} \n`);
        appendFileSync(
          ENV_FILENAME,
          `SETTINGS_PATH=${[PayslipCommand.SettingCmdOption.value]} \n`
        );
        appendFileSync(
          ENV_FILENAME,
          `APP_WEB_HOST=${[PayslipCommand.UrlCmdOption.value]} \n`
        );
        appendFileSync(
          ENV_FILENAME,
          `HOST_BASE=${[PayslipCommand.UrlCmdOption.value]} \n`
        );
        if (existsSync(wgoServerSourcePath)) {
          copySync(ENV_FILENAME, join(wgoServerSourcePath, ".env"));
        }
      }
    });

    Logger.Line("Updating build settings & dependencies...", () => {
      if (existsSync(wgoServerSourcePath) && existsSync(buildServerPath)) {
        sourceFiles.forEach((file) => {
          const filePath = join(wgoServerSourcePath, file);
          if (existsSync(filePath)) {
            copySync(
              join(wgoServerSourcePath, file),
              join(buildServerPath, file)
            );
          }
        });
      }
    });
  };

  public static ExecuteClient = (config: {
    clientName: string;
    wgoClientSourcePath: string;
    clientModeOption: string;
  }) => {
    const isSSR = config.clientModeOption === "ssr";
    const sourceFilesClient = ["package.json", "package-lock.json", ".npmrc"];
    const buildClientPath = join(
      config.wgoClientSourcePath,
      "dist",
      isSSR ? "ssr" : "spa"
    );
    const wgoBuildClientSourcePath = join(config.wgoClientSourcePath, "build");

    Logger.Line(`Building options.env ${config.clientName} file...`, () => {
      if (existsSync(config.wgoClientSourcePath)) {
        const ENV_FILENAME = join(config.wgoClientSourcePath, ".env");
        writeFileSync(
          ENV_FILENAME,
          `NODE_ENV=${PayslipCommand.EnvCmdOption.value} \n`
        );
        appendFileSync(
          ENV_FILENAME,
          `PORT=${PayslipCommand.PortCmdOption.value} \n`
        );
        appendFileSync(
          ENV_FILENAME,
          `APP_WEB_HOST=${[PayslipCommand.UrlCmdOption.value]}${
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
        mkdirSync(wgoBuildClientSourcePath);
        if (
          existsSync(config.wgoClientSourcePath) &&
          existsSync(wgoBuildClientSourcePath)
        ) {
          sourceFilesClient.forEach((file) => {
            const filePath = join(config.wgoClientSourcePath, file);
            if (existsSync(filePath)) {
              copySync(filePath, join(buildClientPath, file));
            }
          });

          copySync(buildClientPath, wgoBuildClientSourcePath);
        }
      }
    );
  };
}
