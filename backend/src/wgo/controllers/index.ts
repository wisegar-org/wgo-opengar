import { AppController } from "./AppController";

export const getControllers = (controllers?: Array<any>) => {
  if (controllers && controllers.length > 0) {
    return Array.apply([AppController], controllers);
  }

  return Array.apply([AppController]);
};
