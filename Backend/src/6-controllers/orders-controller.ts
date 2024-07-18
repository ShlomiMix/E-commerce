import express, { NextFunction, Request, Response } from "express";
import { StatusCode } from "../3-models/enums";
import { OrderModel } from "../3-models/order-model";
import { ordersService } from "../5-services/orders-service";

class OrdersController {
  public readonly router = express.Router();

  public constructor() {
    this.registerRoutes();
  }

  private registerRoutes(): void {
    this.router.get("/orders", this.getAllOrders);
    this.router.get("/orders/:userId", this.getAllOrdersByUserId);
    this.router.get("/orders/:_id([a-f0-9A-F]{24})", this.getOneOrder);
    this.router.post("/orders", this.addOrder);
    this.router.put("/orders/:_id([a-f0-9A-F]{24})", this.updateOrder);
    this.router.delete("/orders/:_id([a-f0-9A-F]{24})", this.deleteOrder);
  }

  private async getAllOrders(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const orders = await ordersService.getAllOrders();
      response.json(orders);
    } catch (err: any) {
      next(err);
    }
  }

  private async getAllOrdersByUserId(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { userId } = request.params;
      const orders = await ordersService.getAllOrdersByUserId(userId);
      response.json(orders);
    } catch (err: any) {
      next(err);
    }
  }

  private async getOneOrder(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { _id } = request.params;
      const order = await ordersService.getOneOrder(_id);
      response.json(order);
    } catch (err: any) {
      next(err);
    }
  }

  private async addOrder(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const order = new OrderModel(request.body);
      const addedOrder = await ordersService.addOrder(order);
      response.status(StatusCode.Created).json(addedOrder);
    } catch (err: any) {
      next(err);
    }
  }

  private async updateOrder(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { _id } = request.params;
      request.body._id = _id;
      const order = new OrderModel(request.body);
      const updatedOrder = await ordersService.updateOrder(order);
      response.json(updatedOrder);
    } catch (err: any) {
      next(err);
    }
  }

  private async deleteOrder(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { _id } = request.params;
      await ordersService.deleteOrder(_id);
      response.sendStatus(StatusCode.NoContent);
    } catch (err: any) {
      next(err);
    }
  }
}

const ordersController = new OrdersController();
export const orderRouter = ordersController.router;
