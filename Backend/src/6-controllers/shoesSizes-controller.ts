import express, { NextFunction, Request, Response } from "express";
import { StatusCode } from "../3-models/enums";
import { ShoeSizeModel } from "../3-models/shoeSize-model";
import { shoesSizesService } from "../5-services/shoeSizes-service";

class ShoesSizesController {
  // Create a router object for listening to HTTP requests:
  public readonly router = express.Router();

  // Register routes once:
  public constructor() {
    this.registerRoutes();
  }

  // Register routes:
  private registerRoutes(): void {
    this.router.get("/shoes-sizes", this.getAllSizes);
    this.router.get("/shoes-sizes/:_id([a-f0-9A-F]{24})", this.getOneSize);
    this.router.post("/shoes-sizes", this.addSize);
    this.router.put("/shoes-sizes/:_id([a-f0-9A-F]{24})", this.updateSize);
    this.router.delete("/shoes-sizes/:_id([a-f0-9A-F]{24})", this.deleteSize);
  }

  private async getAllSizes(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const sizes = await shoesSizesService.getAllSizes();
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
      const size = await shoesSizesService.getOneSize(_id);
      response.json(size);
    } catch (err: any) {
      next(err);
    }
  }

  private async addSize(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const size = new ShoeSizeModel(request.body);
      const addedSize = await shoesSizesService.addSize(size);
      response.status(StatusCode.Created).json(addedSize);
    } catch (err: any) {
      next(err);
    }
  }

  private async updateSize(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      request.body._id = request.params._id;
      const size = new ShoeSizeModel(request.body);
      const updatedSize = await shoesSizesService.updateSize(size);
      response.json(updatedSize);
    } catch (err: any) {
      next(err);
    }
  }

  private async deleteSize(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const _id = request.params._id;
      await shoesSizesService.deleteSize(_id);
      response.sendStatus(StatusCode.NoContent);
    } catch (err: any) {
      next(err);
    }
  }
}

const shoesSizesController = new ShoesSizesController();
export const shoesSizesRouter = shoesSizesController.router;
