import { AgvCommand } from "./commands/AGVCmd";
import { IndocsCommand } from "./commands/IndocsCmd";
import { PayslipCommand } from "./commands/PayslipCmd";
import { WgoCommand } from "./commands/WGOCmd";
import { EmptyVersion } from "./options/ICmdOptions";
import { Logger } from "./utils/Logger";

export const wgoCli = () => {
  const current_version: string = "0.0.3-11";

  const processVersion = process.env.npm_package_version
    ? process.env.npm_package_version
    : EmptyVersion;

  if (processVersion !== EmptyVersion && processVersion !== current_version)
    throw Error("Error on current version!");

  Logger.TitleVerLine(`WISEGAR CLI`, `v${current_version}`);

  const module = process.argv.slice(2, 3)[0];
  const build_args = process.argv.slice(3);

  switch (module) {
    case AgvCommand.CMD:
      AgvCommand.EnvCmdOption.parse(build_args);
      AgvCommand.UrlCmdOption.parse(build_args);
      AgvCommand.PortCmdOption.parse(build_args);
      AgvCommand.RootCmdOption.parse(build_args);
      AgvCommand.SettingCmdOption.parse(build_args);
      AgvCommand.BranchOption.parse(build_args);
      AgvCommand.GraphUrlCmdOption.parse(build_args);
      AgvCommand.WSCmdOption.parse(build_args);
      AgvCommand.GitUserOption.parse(build_args);
      AgvCommand.GitPswOption.parse(build_args);
      AgvCommand.ClientModeOption.parse(build_args);
      AgvCommand.Execute();
      break;
    case IndocsCommand.CMD:
      IndocsCommand.EnvCmdOption.parse(build_args);
      IndocsCommand.UrlCmdOption.parse(build_args);
      IndocsCommand.PortCmdOption.parse(build_args);
      IndocsCommand.RootCmdOption.parse(build_args);
      IndocsCommand.SettingCmdOption.parse(build_args);
      IndocsCommand.BranchOption.parse(build_args);
      IndocsCommand.GraphUrlCmdOption.parse(build_args);
      IndocsCommand.WSCmdOption.parse(build_args);
      IndocsCommand.GitUserOption.parse(build_args);
      IndocsCommand.GitPswOption.parse(build_args);
      IndocsCommand.ClientModeOption.parse(build_args);
      IndocsCommand.Execute();
      break;
    case PayslipCommand.CMD:
      PayslipCommand.EnvCmdOption.parse(build_args);
      PayslipCommand.UrlCmdOption.parse(build_args);
      PayslipCommand.PortCmdOption.parse(build_args);
      PayslipCommand.RootCmdOption.parse(build_args);
      PayslipCommand.SettingCmdOption.parse(build_args);
      PayslipCommand.BranchOption.parse(build_args);
      PayslipCommand.GraphUrlCmdOption.parse(build_args);
      PayslipCommand.WSCmdOption.parse(build_args);
      PayslipCommand.GitUserOption.parse(build_args);
      PayslipCommand.GitPswOption.parse(build_args);
      PayslipCommand.ClientModeOption.parse(build_args);
      PayslipCommand.AppTypeOption.parse(build_args);
      PayslipCommand.Execute();
      break;
    case WgoCommand.CMD:
      WgoCommand.EnvCmdOption.parse(build_args);
      WgoCommand.UrlCmdOption.parse(build_args);
      WgoCommand.PortCmdOption.parse(build_args);
      WgoCommand.RootCmdOption.parse(build_args);
      WgoCommand.SettingCmdOption.parse(build_args);
      WgoCommand.BranchOption.parse(build_args);
      WgoCommand.GraphUrlCmdOption.parse(build_args);
      WgoCommand.ModuleOption.parse(build_args);
      WgoCommand.WSCmdOption.parse(build_args);
      WgoCommand.GitUserOption.parse(build_args);
      WgoCommand.GitPswOption.parse(build_args);
      WgoCommand.ClientModeOption.parse(build_args);
      WgoCommand.Execute();
      break;

    default:
      Logger.CmdLine(`Please use one of the available commands:`, () => {
        Logger.Line(`${AgvCommand.CMD} => ${AgvCommand.Description}`);
        Logger.Line(`${IndocsCommand.CMD} => ${IndocsCommand.Description}`);
        Logger.Line(`${PayslipCommand.CMD} => ${PayslipCommand.Description}`);
        Logger.Line(`${WgoCommand.CMD} => ${WgoCommand.Description}`);
      });
  }
  Logger.SimpleLine("\n\nThanks for using wisegar cli!");
  Logger.SimpleLine(
    `\u00A9 Wisegar Development Group ${new Date().getFullYear()}`
  );
  process.exit(0);
};
wgoCli();
