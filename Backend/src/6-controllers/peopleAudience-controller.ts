import express, { NextFunction, Request, Response } from "express";
import { StatusCode } from "../3-models/enums";
import { PeopleAudienceModel } from "../3-models/peopleAudience-model";
import { peopleAudienceService } from "../5-services/peopleAudience-service";

class PeopleAudienceController {
  // Create a router object for listening to HTTP requests:
  public readonly router = express.Router();

  // Register routes once:
  public constructor() {
    this.registerRoutes();
  }

  // Register routes:
  private registerRoutes(): void {
    this.router.get("/audience", this.getAllPeopleAudience);
    // this.router.get("/audience/menu-filter", this.getAllProductsByMenuFilter);
    this.router.get("/audience/:_id([a-f0-9A-F]{24})", this.getOneAudience);
    // this.router.get("/audience/products-by-audience/:_id([a-f0-9A-F]{24})", this.getAllProductsByAudienceId);
    this.router.post("/audience", this.addAudience);
    this.router.put("/audience/:_id([a-f0-9A-F]{24})", this.updateAudience);
    this.router.delete("/audience/:_id([a-f0-9A-F]{24})", this.deleteAudience);
  }

  private async getAllPeopleAudience(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const peopleAudience = await peopleAudienceService.getAllPeopleAudience();
      response.json(peopleAudience);
    } catch (err: any) {
      next(err);
    }
  }


  private async getOneAudience(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const _id = request.params._id;
      const audience = await peopleAudienceService.getOneAudience(_id);
      response.json(audience);
    } catch (err: any) {
      next(err);
    }
  }

  private async addAudience(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const audience = new PeopleAudienceModel(request.body);
      const addedAudience = await peopleAudienceService.addAudience(audience);
      response.status(StatusCode.Created).json(addedAudience);
    } catch (err: any) {
      next(err);
    }
  }

  private async updateAudience(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      request.body._id = request.params._id;
      const audience = new PeopleAudienceModel(request.body);
      const updatedAudience = await peopleAudienceService.updateAudience(
        audience
      );
      response.json(updatedAudience);
    } catch (err: any) {
      next(err);
    }
  }

  private async deleteAudience(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const _id = request.params._id;
      await peopleAudienceService.deleteAudience(_id);
      response.sendStatus(StatusCode.NoContent);
    } catch (err: any) {
      next(err);
    }
  }
}

const peopleAudienceController = new PeopleAudienceController();
export const peopleAudienceRouter = peopleAudienceController.router;
