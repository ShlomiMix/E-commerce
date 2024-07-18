import express, { NextFunction, Request, Response } from "express";
import { UploadedFile } from "express-fileupload";
import { imagesHandler } from "../2-utils/imagesHandler";
import { CategoryModel } from "../3-models/category-model";
import { StatusCode } from "../3-models/enums";
import { categoriesService } from "../5-services/categories-service";
import { subCategoriesService } from "../5-services/subCategories-service";

class CategoriesController {
  // Create a router object for listening to HTTP requests:
  public readonly router = express.Router();

  // Register routes once:
  public constructor() {
    this.registerRoutes();
  }

  // Register routes:
  private registerRoutes(): void {
    this.router.get("/categories", this.getAllCategories);
    this.router.get("/categories/:_id([a-f0-9A-F]{24})", this.getOneCategory);
    this.router.get(
      "/categories/sub-categories-by-category/:_id([a-f0-9A-F]{24})",
      this.getSubCategoriesByCategory
    );
    // this.router.get("/categories/products-by-category/:audienceId([a-f0-9A-F]{24})/:categoryId([a-f0-9A-F]{24})", this.getProductsByAudienceAndCategory);
    this.router.post("/categories", this.addCategory);
    this.router.put("/categories/:_id([a-f0-9A-F]{24})", this.updateCategory);
    this.router.delete(
      "/categories/:_id([a-f0-9A-F]{24})",
      this.deleteCategory
    );
    this.router.get(
      "/brands/images/:folderPath/:imageName",
      imagesHandler.getImageFile
    );
  }

  private async getAllCategories(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const categories = await categoriesService.getAllCategories();
      response.json(categories);
    } catch (err: any) {
      next(err);
    }
  }

  private async getOneCategory(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const _id = request.params._id;
      const category = await categoriesService.getOneCategory(_id);
      response.json(category);
    } catch (err: any) {
      next(err);
    }
  }

  private async getSubCategoriesByCategory(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const _id = request.params._id;
      const subCategoriesByCategory =
        await categoriesService.getSubCategoriesByCategory(_id);
      response.json(subCategoriesByCategory);
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
      const category = new CategoryModel(request.body);

      const subCategories = [];

      for (const subCategory of category.subCategories) {
        subCategories.push(subCategory);
      }

      category.subCategories = subCategories;

      const addedCategory = await categoriesService.addCategory({
        category,
        image: request.files?.image as UploadedFile,
      });
      response.status(StatusCode.Created).json(addedCategory);
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
    const category = new CategoryModel(request.body);

    const subCategories = await subCategoriesService.updateSubCategoriesArr(category.subCategories)

    category.subCategories = subCategories

    const updatedCategory = await categoriesService.updateCategory({
      category,
      image: request.files?.image as UploadedFile,
    });
    response.json(updatedCategory);
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
      await categoriesService.deleteCategory(_id);
      response.sendStatus(StatusCode.NoContent);
    } catch (err: any) {
      next(err);
    }
  }
}

const categoriesController = new CategoriesController();
export const categoriesRouter = categoriesController.router;
