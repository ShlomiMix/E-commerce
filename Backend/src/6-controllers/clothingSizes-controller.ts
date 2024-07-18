import express, { NextFunction, Request, Response } from "express";
import { ClothSizeModel } from "../3-models/clothSize-model";
import { StatusCode } from "../3-models/enums";
import { clothesSizesService } from "../5-services/clothingSizes-service";


class ClothingSizesController {
  // Create a router object for listening to HTTP requests:
  public readonly router = express.Router();

  // Register routes once:
  public constructor() {
    this.registerRoutes();
  }

  // Register routes:
  private registerRoutes(): void {
    this.router.get("/clothing-sizes", this.getAllSizes);
    this.router.get("/clothing-sizes/:_id([a-f0-9A-F]{24})", this.getOneSize);
    this.router.post("/clothing-sizes", this.addCategory);
    this.router.put("/clothing-sizes/:_id([a-f0-9A-F]{24})", this.updateCategory);
    this.router.delete("/clothing-sizes/:_id([a-f0-9A-F]{24})", this.deleteCategory);
  }

  private async getAllSizes(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const sizes = await clothesSizesService.getAllSizes();
      response.json(sizes);
    } catch (err: any) {
      next(err);
    }
  }

  private async getOneSize(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const _id = request.params._id;
      const size = await clothesSizesService.getOneSize(_id);
      response.json(size);
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
      const size = new ClothSizeModel(request.body);
      const addedSize = await clothesSizesService.addSize(size);
      response.status(StatusCode.Created).json(addedSize);
    } catch (err: any) {
      next(err);
    }
  }

  private async updateCategory(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      request.body._id = request.params._id;
      const size = new ClothSizeModel(request.body);
      const updatedSize = await clothesSizesService.updateSize(size);
      response.json(updatedSize);
    } catch (err: any) {
      next(err);
    }
  }

  private async deleteCategory(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const _id = request.params._id;
      await clothesSizesService.deleteSize(_id);
      response.sendStatus(StatusCode.NoContent);
    } catch (err: any) {
      next(err);
    }
  }
}

const clothingSizesController = new ClothingSizesController();
export const clothingSizesRouter = clothingSizesController.router;
