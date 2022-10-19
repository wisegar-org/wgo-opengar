import {
  BranchOption,
  EnvCmdOption,
  GraphUrlCmdOption,
  ModuleOption,
  PortCmdOption,
  RootCmdOption,
  SettingCmdOption,
  UrlCmdOption,
} from "../options/ICmdOptions";
import { ValidateOption } from "../utils/CmdOptionsParser";
import { Command } from "./Command";
import { join } from "path";
import { Logger } from "../utils/Logger";
import {
  appendFileSync,
  copySync,
  createSymlinkSync,
  emptyDirSync,
  existsSync,
  mkdirSync,
  readJsonSync,
  writeFileSync,
  writeJsonSync,
} from "fs-extra";
import { wgoGitRepoPath, wgoTmpUserPath } from "../utils/WgoBuildPaths";
import { runScript } from "../utils/ExecScript";

export class WgoCommand extends Command {
  public static CMD = "wgo";

  public static Description =
    "Compile & build service & client wgo applications";
  public static EnvCmdOption = EnvCmdOption;
  public static PortCmdOption = PortCmdOption;
  public static RootCmdOption = RootCmdOption;
  public static UrlCmdOption = UrlCmdOption;
  public static GraphUrlCmdOption = GraphUrlCmdOption;
  public static SettingCmdOption = SettingCmdOption;
  public static BranchOption = BranchOption;
  public static ModuleOption = ModuleOption;

  public static Execute = () => {
    ValidateOption(WgoCommand.EnvCmdOption);
    ValidateOption(WgoCommand.PortCmdOption);
    ValidateOption(WgoCommand.RootCmdOption);
    ValidateOption(WgoCommand.UrlCmdOption);
    ValidateOption(WgoCommand.GraphUrlCmdOption);
    ValidateOption(WgoCommand.BranchOption);
    ValidateOption(WgoCommand.SettingCmdOption);
    ValidateOption(WgoCommand.ModuleOption);
    if (
      !WgoCommand.EnvCmdOption.exist ||
      !WgoCommand.RootCmdOption.exist ||
      !WgoCommand.UrlCmdOption.exist ||
      !WgoCommand.ModuleOption.exist ||
      !WgoCommand.SettingCmdOption.exist
    ) {
      process.exit(1);
    }

    const wgoRootSourcePath = join(wgoTmpUserPath, "wgo-opengar");
    const app_name = `${WgoCommand.ModuleOption.value}-${WgoCommand.EnvCmdOption.value}-${WgoCommand.PortCmdOption.value}`;
    const app_root = join(
      WgoCommand.RootCmdOption.value ? WgoCommand.RootCmdOption.value : "",
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
      const repositoryBranch = WgoCommand.BranchOption.exist
        ? WgoCommand.BranchOption.value
        : "production";

      runScript(
        `git clone ${wgoGitRepoPath} --branch ${repositoryBranch}`,
        wgoTmpUserPath,
        (err) => {
          Logger.Error(err, true);
        }
      );
    });

    const wgoServerSourcePath = join(
      wgoRootSourcePath,
      "modules",
      WgoCommand.ModuleOption.value
    );
    Logger.Line("Validating wgo module name...", () => {
      if (!existsSync(wgoServerSourcePath)) {
        Logger.Error(
          `Module ${WgoCommand.ModuleOption.value} don't exist`,
          true
        );
      }
    });

    const wgoBaseSourcePath = join(wgoRootSourcePath, "modules", "wgo-base");
    const wgoBuildSourcePath = join(wgoRootSourcePath, "build");
    const sourceFiles = ["package.json", "package-lock.json", ".npmrc"];

    /**
     * Base building
     */
    Logger.Line("Installing base dependencies...", () => {
      if (existsSync(wgoBaseSourcePath)) {
        runScript(`npm install`, wgoBaseSourcePath, (err) => {
          Logger.Error(err, true);
        });
      }
    });

    /**
     * Server building
     */
    const destination = app_root;
    const buildServerPath = join(wgoServerSourcePath, "build");

    Logger.Line("Installing base dependencies on server...", () => {
      if (existsSync(wgoBaseSourcePath) && existsSync(wgoServerSourcePath)) {
        createSymlinkSync(
          wgoBaseSourcePath,
          join(wgoServerSourcePath, "src"),
          "junction"
        );
      }
    });

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
          `NODE_ENV=${WgoCommand.EnvCmdOption.value} \n`
        );
        appendFileSync(
          ENV_FILENAME,
          `PORT=${WgoCommand.PortCmdOption.value} \n`
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
          `SETTINGS_PATH=${[WgoCommand.SettingCmdOption.value]} \n`
        );
        appendFileSync(
          ENV_FILENAME,
          `APP_WEB_HOST=${[WgoCommand.UrlCmdOption.value]} \n`
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
    WgoCommand.ExecuteClient({
      clientName,
      buildServerPath,
      wgoBaseSourcePath,
      wgoServerSourcePath,
      wgoBuildClientSourcePath: join(buildServerPath, clientName),
      wgoClientSourcePath: join(wgoServerSourcePath, clientName),
    });

    /**
     * Mobile building
     */
    clientName = "mobile";
    WgoCommand.ExecuteClient({
      clientName,
      buildServerPath,
      wgoBaseSourcePath,
      wgoServerSourcePath,
      wgoBuildClientSourcePath: join(buildServerPath, clientName),
      wgoClientSourcePath: join(wgoServerSourcePath, clientName),
    });

    /**
     * Deploy En la carpeta root del proyecto
     */

    Logger.Line("Cleaning destination ..", () => {
      emptyDirSync(destination);
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
    wgoBaseSourcePath: string;
    wgoBuildClientSourcePath: string;
  }) => {
    const sourceFilesClient = ["package.json", "package-lock.json", ".npmrc"];
    const buildClientPath = join(config.wgoClientSourcePath, "dist", "spa");

    Logger.Line(
      `Installing base dependencies on ${config.clientName}...`,
      () => {
        if (
          existsSync(config.wgoBaseSourcePath) &&
          existsSync(config.wgoClientSourcePath)
        ) {
          createSymlinkSync(
            config.wgoBaseSourcePath,
            join(config.wgoClientSourcePath, "src"),
            "junction"
          );
        }
      }
    );

    Logger.Line(`Building options.env ${config.clientName} file...`, () => {
      if (existsSync(config.wgoClientSourcePath)) {
        const ENV_FILENAME = join(config.wgoClientSourcePath, ".env");
        writeFileSync(
          ENV_FILENAME,
          `NODE_ENV=${WgoCommand.EnvCmdOption.value} \n`
        );
        appendFileSync(
          ENV_FILENAME,
          `PORT=${WgoCommand.PortCmdOption.value} \n`
        );
        appendFileSync(
          ENV_FILENAME,
          `APP_WEB_HOST=${[WgoCommand.UrlCmdOption.value]} \n`
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
          runScript(`npx quasar build`, config.wgoClientSourcePath, (err) => {
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
