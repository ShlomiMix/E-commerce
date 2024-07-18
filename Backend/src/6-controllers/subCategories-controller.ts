import express, { NextFunction, Request, Response } from "express";
import { StatusCode } from "../3-models/enums";
import {
    ISubCategoryModel,
    SubCategoryModel,
} from "../3-models/subCategory-model";
import { subCategoriesService } from "../5-services/subCategories-service";

class SubCategoriesController {
  // Create a router object for listening to HTTP requests:
  public readonly router = express.Router();

  // Register routes once:
  public constructor() {
    this.registerRoutes();
  }

  // Register routes:
  private registerRoutes(): void {
    this.router.get("/sub-categories", this.getAllSubCategories);
    this.router.get(
      "/sub-categories/:_id([a-f0-9A-F]{24})",
      this.getOneSubCategory
    );
    // this.router.get("/sub-categories/:audienceId([a-f0-9A-F]{24})/:categoryId([a-f0-9A-F]{24})/:subCategory([a-f0-9A-F]{24})",this.getAllProductsByAudienceAndCategoryAndSubCategory);
    this.router.post("/sub-categories/batch", this.addSubCategoriesArr);
    this.router.put("/sub-categories/update-batch", this.updateSubCategoriesArr);
    this.router.post("/sub-categories", this.addSubCategory);
    this.router.put(
      "/sub-categories/:_id([a-f0-9A-F]{24})",
      this.updateSubCategory
    );
    this.router.delete(
      "/sub-categories/:_id([a-f0-9A-F]{24})",
      this.deleteSubCategory
    );
  }

  private async getAllSubCategories(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const categories = await subCategoriesService.getAllSubCategories();
      response.json(categories);
    } catch (err: any) {
      next(err);
    }
  }

  private async getOneSubCategory(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const _id = request.params._id;
      const category = await subCategoriesService.getOneSubCategory(_id);
      response.json(category);
    } catch (err: any) {
      next(err);
    }
  }

  private async addSubCategoriesArr(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const subCategoriesArr: ISubCategoryModel[] = request.body;
      const addedSubCategories = await subCategoriesService.addSubCategoriesArr(
        subCategoriesArr
      );
      response.status(StatusCode.Created).json(addedSubCategories);
    } catch (err: any) {
      next(err);
    }
  }


private async updateSubCategoriesArr(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const subCategoriesArr: ISubCategoryModel[] = request.body;
  
      // Call the service method to update subcategories
      const updatedSubCategoriesArr = await subCategoriesService.updateSubCategoriesArr(subCategoriesArr);
  
      // Respond with updated subcategories
      response.json(updatedSubCategoriesArr);
    } catch (err: any) {
      next(err);
    }
  }
  

  private async addSubCategory(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const category = new SubCategoryModel(request.body);
      const addedCategory = await subCategoriesService.addSubCategory(category);
      response.status(StatusCode.Created).json(addedCategory);
    } catch (err: any) {
      next(err);
    }
  }

  private async updateSubCategory(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      request.body._id = request.params._id;
      const category = new SubCategoryModel(request.body);
      const updatedCategory = await subCategoriesService.updateSubCategory(
        category
      );
      response.json(updatedCategory);
    } catch (err: any) {
      next(err);
    }
  }

  private async deleteSubCategory(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const _id = request.params._id;
      await subCategoriesService.deleteSubCategory(_id);
      response.sendStatus(StatusCode.NoContent);
    } catch (err: any) {
      next(err);
    }
  }
}

const subCategoriesController = new SubCategoriesController();
export const subCategoriesRouter = subCategoriesController.router;
