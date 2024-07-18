import {
    ResourceNotFoundError,
    ValidationError,
} from "../3-models/client-errors";
import { IOrderModel, OrderModel } from "../3-models/order-model";
import {
    AccessoryModel,
    ClothModel,
    IAccessoryModel,
    IClothModel,
    IShoeModel,
    ProductModel,
    ShoeModel,
} from "../3-models/product-model";

interface IOrderItem {
    productId: string;
    name: string;
    color: string;
    size: string;
    quantity: number;
    price: number;
    stockId: string;
  }

class OrdersService {
  public async getAllOrders(): Promise<IOrderModel[]> {
    const orders = await OrderModel.find().exec();
    return orders;
  }

  public async getAllOrdersByUserId(userId:string): Promise<IOrderModel[]> {
    const orders = await OrderModel.find({"customer.userId": userId}).exec();
    return orders;
  }

  public async getOneOrder(_id: string): Promise<IOrderModel> {
    const order = await OrderModel.findById(_id).exec();
    return order;
  }

  public async addOrder(order: IOrderModel): Promise<IOrderModel> {
    const errors = order.validateSync();
    if (errors) {
      throw new ValidationError(errors.message);
    }

    await this.updateProductStock(order,"decrease")

    return order.save();
  }

  public async updateOrder(order: IOrderModel): Promise<IOrderModel> {
    const errors = order.validateSync();
    if (errors) {
      throw new ValidationError(errors.message);
    }

    const updateOrder = await OrderModel.findByIdAndUpdate(order._id, order, {
      new: true,
    });
    if (!updateOrder) {
      throw new ResourceNotFoundError(updateOrder._id);
    }

    return updateOrder;
  }

  public async deleteOrder(_id: string): Promise<void> {
    const orderTOdelete = await OrderModel.findById(_id).exec();
    if (!orderTOdelete) {
      throw new ResourceNotFoundError(orderTOdelete._id);
    }

    await OrderModel.findByIdAndDelete(_id).exec();
  }

  private async updateStockQuantity(
    product: IClothModel | IShoeModel | IAccessoryModel,
    item: IOrderItem,
    action: "increase" | "decrease"
  ): Promise<void> {
    const stockItem = product.stock.find((stock)=> stock._id.toString() === item.stockId)
 
    if (!stockItem) {
      throw new ResourceNotFoundError(`Stock item with _id ${item.stockId} not exist`);
    }
    if (action === "decrease") {
      stockItem.quantity -= item.quantity;
    } else {
      stockItem.quantity += item.quantity;
    }

    await product.save();
  }

  private async updateProductStock(
    order: IOrderModel,
    action: "increase" | "decrease"
  ): Promise<void> {
    for (const item of order.items as IOrderItem[]) {
      const product = await ProductModel.findById(item.productId).exec();
      if (!product) {
        throw new ResourceNotFoundError(item.productId);
      }

      let productModel:
        | typeof ClothModel
        | typeof ShoeModel
        | typeof AccessoryModel;

      if (await ClothModel.exists({ _id: item.productId })) {
        productModel = ClothModel;
      } else if (await ShoeModel.exists({ _id: item.productId })) {
        productModel = ShoeModel;
      } else if (await AccessoryModel.exists({ _id: item.productId })) {
        productModel = AccessoryModel;
      } else {
        throw new ResourceNotFoundError(item.productId);
      }

      const specificProduct = await productModel
        .findById(item.productId)
        .exec();

      if (!specificProduct) {
        throw new ResourceNotFoundError(item.productId);
      }

      await this.updateStockQuantity(specificProduct, item, action)
    }
  }
}

export const ordersService = new OrdersService();
