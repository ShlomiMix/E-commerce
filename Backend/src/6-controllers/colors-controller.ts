import express, { NextFunction, Request, Response } from "express";
import { ColorModel } from "../3-models/color-model";
import { StatusCode } from "../3-models/enums";
import { colorsService } from "../5-services/colors-service";

class ColorsController {
  // Create a router object for listening to HTTP requests:
  public readonly router = express.Router();

  // Register routes once:
  public constructor() {
    this.registerRoutes();
  }

  // Register routes:
  private registerRoutes(): void {
    this.router.get("/colors", this.getAllColors);
    this.router.get("/colors/:_id([a-f0-9A-F]{24})", this.getOneColor);
    this.router.post("/colors", this.addCategory);
    this.router.put("/colors/:_id([a-f0-9A-F]{24})", this.updateColor);
    this.router.delete("/colors/:_id([a-f0-9A-F]{24})", this.deleteColor);
  }

  private async getAllColors(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const colors = await colorsService.getAllColors();
      response.json(colors);
    } catch (err: any) {
      next(err);
    }
  }

  private async getOneColor(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const _id = request.params._id;
      const color = await colorsService.getOneColor(_id);
      response.json(color);
    } catch (err: any) {
      next(err);
    }
  }

  private async addCategory(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const color = new ColorModel(request.body);
      const addedColor = await colorsService.addColor(color);
      response.status(StatusCode.Created).json(addedColor);
    } catch (err: any) {
      next(err);
    }
  }

  private async updateColor(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      request.body._id = request.params._id;
      const color = new ColorModel(request.body);
      const updatedColor = await colorsService.updateColor(color);
      response.json(updatedColor);
    } catch (err: any) {
      next(err);
    }
  }

  private async deleteColor(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const _id = request.params._id;
      await colorsService.deleteColor(_id);
      response.sendStatus(StatusCode.NoContent);
    } catch (err: any) {
      next(err);
    }
  }
}

const colorsController = new ColorsController();
export const colorsRouter = colorsController.router;
