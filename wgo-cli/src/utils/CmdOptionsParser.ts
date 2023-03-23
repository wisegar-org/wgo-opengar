import { ICmdOptions } from "../options/ICmdOptions";
import { Logger } from "./Logger";

export const InvalidOption = (message: string) => {
  Logger.Line(message);
  return process.exit(0);
};
export const ValidateOptionalOption = (option: ICmdOptions) => {
  if (option.exist) {
    Logger.Line(
      `${option.option} => ${
        option.value && option.value.length > 0 ? option.value : "ok"
      }`
    );
  } else {
    Logger.Line(`possible ${option.option} => ${option.description}`);
  }
};
export const ValidateOption = (option: ICmdOptions) => {
  if (option.exist) {
    `${option.option} => ${
      option.value && option.value.length > 0 ? option.value : "ok"
    }`;
  } else {
    Logger.Error(`missing ${option.option} => ${option.description}`);
  }
};
