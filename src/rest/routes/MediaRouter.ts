import {
  Express,
  Response,
  Request,
} from "express";
import { MediaController } from "../controllers/MediaController";
import Container from "typedi";


export function InitializeMediaRouter(App: Express) {
  const mediaController = Container.get(MediaController);
  App.get("/media", (req: Request, res: Response) => res.send("Media Paths"));

  App.post("/media/saveImage", (req: Request, res: Response) =>
    mediaController.saveImage(req, res)
  );
}



