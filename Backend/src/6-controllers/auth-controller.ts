import { UserModel } from "../3-models/user-model";
import { authService } from "../5-services/auth-service";
import { StatusCode } from "../3-models/enums";
import { CredentialsModel } from "../3-models/credentials-model";
import express, { NextFunction, Request, Response } from "express";

class AuthController {
  public readonly router = express.Router();

  public constructor() {
    this.registerRoutes();
  }

  private registerRoutes(): void {
    this.router.post("/register", this.register);
    this.router.post("/login", this.login);
  }

  private async register(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const user = new UserModel(request.body);
      const token = await authService.register(user);
      response.status(StatusCode.Created).json(token);
    } catch (err: any) {
      next(err);
    }
  }

  private async login(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const user = new CredentialsModel(request.body);
      const token = await authService.login(user);
      response.json(token);
    } catch (err: any) {
      next(err);
    }
  }
}

const authController = new AuthController();
export const authRouter = authController.router;
