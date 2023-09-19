import { getAGVControllers } from "../../modules";
import { AppController } from "./AppController";

export const getControllers = () => {
  return Array.apply([AppController], getAGVControllers());
};
