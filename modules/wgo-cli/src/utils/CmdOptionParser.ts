import { ICmdOptions } from "../options/ICmdOptions";

export const IsOption = (arg: string) => {
  if (!arg) return false;
  if (arg === "") return false;
  if (arg.trim().startsWith("--")) return true;
  return false;
};

export const ParseOption = (build_args: string[], cmdOption: ICmdOptions) => {
  cmdOption.exist = false;
  if (!build_args || build_args.length === 0) return cmdOption;
  if (!cmdOption) return cmdOption;

  const index = build_args.indexOf(cmdOption.option);
  if (index === -1) return cmdOption;
  if (index >= 0) cmdOption.exist = !cmdOption.exist;

  if (build_args.length > index + 1) {
    const isOption = IsOption(build_args[index + 1]);
    if (isOption) return cmdOption;
    cmdOption.value = build_args[index + 1];
  }
  return cmdOption;
};
