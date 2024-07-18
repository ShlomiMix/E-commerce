import express, { NextFunction, Request, Response } from "express";
import { CompanyModel } from "../3-models/company-model";
import { StatusCode } from "../3-models/enums";
import { companiesService } from "../5-services/companies-service";
import { UploadedFile } from "express-fileupload";
import { imagesHandler } from "../2-utils/imagesHandler";

class CompaniesController {
  // Create a router object for listening to HTTP requests:
  public readonly router = express.Router();

  // Register routes once:
  public constructor() {
    this.registerRoutes();
  }

  // Register routes:
  private registerRoutes(): void {
    this.router.get("/companies", this.getAllCompanies);
    this.router.get("/companies/:_id([a-f0-9A-F]{24})", this.getOneCompany);
    this.router.post("/companies", this.addCompany);
    this.router.put("/companies/:_id([a-f0-9A-F]{24})", this.updateCompany);
    this.router.delete("/companies/:_id([a-f0-9A-F]{24})", this.deleteCompany);
    this.router.get(
      "/brands/images/:folderPath/:imageName",
      imagesHandler.getImageFile
    );
  }

  private async getAllCompanies(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const companies = await companiesService.getAllCompanies();
      response.json(companies);
    } catch (err: any) {
      next(err);
    }
  }

  private async getOneCompany(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const _id = request.params._id;
      const company = await companiesService.getOneCompany(_id);
      response.json(company);
    } catch (err: any) {
      next(err);
    }
  }

  private async addCompany(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const image = request.files?.image as UploadedFile;
      const company = new CompanyModel(request.body);
      const addedCompany = await companiesService.addCompany({
        company,
        image,
      });
      response.status(StatusCode.Created).json(addedCompany);
    } catch (err: any) {
      next(err);
    }
  }

  private async updateCompany(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const image = request.files?.image as UploadedFile;
      request.body._id = request.params._id;
      const company = new CompanyModel(request.body);
      const updatedCompany = await companiesService.updateCompany({
        company,
        image,
      });
      response.json(updatedCompany);
    } catch (err: any) {
      next(err);
    }
  }

  private async deleteCompany(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const _id = request.params._id;
      await companiesService.deleteCompany(_id);
      response.sendStatus(StatusCode.NoContent);
    } catch (err: any) {
      next(err);
    }
  }
}

const companiesController = new CompaniesController();
export const companiesRouter = companiesController.router;
