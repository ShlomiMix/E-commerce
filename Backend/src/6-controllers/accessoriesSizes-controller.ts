import express, { NextFunction, Request, Response } from "express";
import { ClothSizeModel } from "../3-models/clothSize-model";
import { StatusCode } from "../3-models/enums";
import { accessoriesSizesService } from "../5-services/accessoriesSizes-service";
import { AccessorySizeModel } from "../3-models/accessorySize-model";

class AccessoriesSizesController {
  // Create a router object for listening to HTTP requests:
  public readonly router = express.Router();

  // Register routes once:
  public constructor() {
    this.registerRoutes();
  }

  // Register routes:
  private registerRoutes(): void {
    this.router.get("/accessories-sizes", this.getAllSizes);
    this.router.get(
      "/accessories-sizes/:_id([a-f0-9A-F]{24})",
      this.getOneSize
    );
    this.router.post("/accessories-sizes", this.addCategory);
    this.router.put(
      "/accessories-sizes/:_id([a-f0-9A-F]{24})",
      this.updateCategory
    );
    this.router.delete(
      "/accessories-sizes/:_id([a-f0-9A-F]{24})",
      this.deleteCategory
    );
  }

  private async getAllSizes(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const sizes = await accessoriesSizesService.getAllSizes();
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
      const size = await accessoriesSizesService.getOneSize(_id);
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
      const size = new AccessorySizeModel(request.body);
      const addedSize = await accessoriesSizesService.addSize(size);
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
      const size = new AccessorySizeModel(request.body);
      const updatedSize = await accessoriesSizesService.updateSize(size);
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
      await accessoriesSizesService.deleteSize(_id);
      response.sendStatus(StatusCode.NoContent);
    } catch (err: any) {
      next(err);
    }
  }
}

const accessoriesSizesController = new AccessoriesSizesController();
export const accessoriesSizesRouter = accessoriesSizesController.router;
