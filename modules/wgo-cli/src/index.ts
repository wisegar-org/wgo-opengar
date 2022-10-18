import { AgvCommand } from "./commands/AGVCmd";
import { EmptyVersion } from "./options/ICmdOptions";
import { Logger } from "./utils/Logger";

export const wgoCli = () => {
  const current_version: string = "0.0.2-7";

  const processVersion = process.env.npm_package_version
    ? process.env.npm_package_version
    : EmptyVersion;

  if (processVersion !== EmptyVersion && processVersion !== current_version)
    throw Error("Error on current version!");

  const module = process.argv.slice(2, 3)[0];
  const build_args = process.argv.slice(3);

  switch (module) {
    case AgvCommand.CMD:
      AgvCommand.EnvCmdOption.parse(build_args);
      AgvCommand.UrlCmdOption.parse(build_args);
      AgvCommand.PortCmdOption.parse(build_args);
      AgvCommand.RootCmdOption.parse(build_args);
      AgvCommand.SettingCmdOption.parse(build_args);
      AgvCommand.Execute();
      break;

    default:
      Logger.CmdLine(`Please use one of the available commands:`, () => {
        Logger.Line(`${AgvCommand.CMD} => ${AgvCommand.Description}`);
      });
  }
  Logger.SimpleLine("\n\nThanks for using wisegar cli!");
  Logger.SimpleLine(
    `\u00A9 Wisegar Development Group ${new Date().getFullYear()}`
  );
  process.exit(0);
};
wgoCli();
