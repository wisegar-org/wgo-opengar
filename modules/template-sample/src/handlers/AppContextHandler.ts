import { IContextOptions } from "@wisegar-org/wgo-server";

export const AppContextHandler = async (options: IContextOptions) => {
  if (!options) {
    throw new Error("Invalid params");
  }
  const { tokenPayload, requestHeaders } = options;
  const ctx: any = {};
  if (!tokenPayload) return ctx;
  // TODO: Add context definition here
  return ctx;
};
