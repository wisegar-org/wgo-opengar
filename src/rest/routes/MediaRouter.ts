import {
  RouterApp,
  registerRouterController,
  Response,
  Request,
} from "./router";
import { MediaController } from "../controllers/MediaController";
import Container from "typedi";

const mediaController = Container.get(MediaController);

RouterApp.get("/", (req: Request, res: Response) => res.send("Media Paths"));

RouterApp.post("/saveImage", (req: Request, res: Response) =>
  mediaController.saveImage(req, res)
);

registerRouterController("/media", RouterApp);
