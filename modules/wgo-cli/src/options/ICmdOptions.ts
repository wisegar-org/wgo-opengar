import { ParseOption } from "../utils/CmdOptionParser";

export const EmptyVersion: string = "0.0.0-build.0";

export interface ICmdOptions {
  readonly option: string;
  readonly description: string;
  exist: boolean;
  value: string;
  parse: (args: string[]) => void;
}

export const HelpCmdOption: ICmdOptions = {
  option: "--help",
  exist: false,
  value: "",
  description: "Show command help",
  parse(args) {
    ParseOption(args, HelpCmdOption);
  },
};

export const EnvCmdOption: ICmdOptions = {
  option: "--env",
  exist: false,
  value: "",
  description: "Build environment",
  parse(args) {
    ParseOption(args, EnvCmdOption);
  },
};

export const PortCmdOption: ICmdOptions = {
  option: "--port",
  exist: false,
  value: "",
  description: "Web Application server port",
  parse(args) {
    ParseOption(args, PortCmdOption);
  },
};

export const RootCmdOption: ICmdOptions = {
  option: "--root",
  exist: false,
  value: "",
  description: "Deployment root folder",
  parse(args) {
    ParseOption(args, RootCmdOption);
  },
};

export const GraphUrlCmdOption: ICmdOptions = {
  option: "--graph",
  exist: false,
  value: "",
  description: "Web application graph url",
  parse() {},
};

export const UrlCmdOption: ICmdOptions = {
  option: "--url",
  exist: false,
  value: "",
  description: "Web application base url",
  parse(args) {
    ParseOption(args, UrlCmdOption);
    GraphUrlCmdOption.exist = UrlCmdOption.exist;
    if (GraphUrlCmdOption.exist)
      GraphUrlCmdOption.value = `${UrlCmdOption.value}/graphql`;
  },
};

export const SettingCmdOption: ICmdOptions = {
  option: "--settings-root",
  exist: false,
  value: "",
  description: "Application settings folder",
  parse(args) {
    ParseOption(args, SettingCmdOption);
  },
};

export const ClientRootCmdOption: ICmdOptions = {
  option: "--client-root",
  exist: false,
  value: "",
  description: "Client Application statics file root folder",
  parse(args) {
    ParseOption(args, ClientRootCmdOption);
  },
};

export const BranchOption: ICmdOptions = {
  option: "--branch",
  exist: false,
  value: "",
  description: "Repository branch. Default is the production branch",
  parse(args) {
    ParseOption(args, BranchOption);
  },
};

export const ModuleOption: ICmdOptions = {
  option: "--module-name",
  exist: false,
  value: "",
  description: "Repository module name",
  parse(args) {
    ParseOption(args, ModuleOption);
  },
};
