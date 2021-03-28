import { Request, Response, Express } from 'express'
import { AuthController } from "../controllers/AuthController";
import Container from "typedi";

export async function InitializeAuthRouter(App: Express) {
  const authController = Container.get(AuthController);
  App.get("/auth", (req: Request, res: Response) => res.send("Auth Paths"));

  App.post("/auth/login", (req: Request, res: Response) =>
    authController.loginUser(req, res)
  );

  App.post("/auth/registerCustomer", (req: Request, res: Response) =>
    authController.registerCustomer(req, res)
  );

  App.post("/auth/updateCustomer", (req: Request, res: Response) =>
    authController.updateCustomerProfile(req, res)
  );

  App.post("/auth/checkPasswordStrength", (req: Request, res: Response) =>
    authController.checkPasswordStrength(req, res)
  );

  App.post("/auth/checkEmailConfirmation", (req: Request, res: Response) =>
    authController.checkEmailConfirmation(req, res)
  );

  App.post("/auth/resendEmailConfirmation", (req: Request, res: Response) =>
    authController.resendEmailConfirmation(req, res)
  );
}
