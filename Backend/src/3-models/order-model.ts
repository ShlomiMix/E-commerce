import mongoose, { Document, Schema, model } from "mongoose";
import { UserModel } from "./user-model";

export type Customer = {
  userId?: mongoose.Types.ObjectId;
  email: string;
  firstName: string;
  lastName: string;
};

export type ShippingDetails = {
  address: string;
  apartment: number;
  city: string;
  country: string;
  state: string;
  postalCode: string;
  phone: string;
};

export type OrderDetails = {
  shippingMethod: string;
  orderStatus: string;
  orderDate: string;
  expectedDeliveryDate: string;
};

export type CustomerCard = {
  paymentMethod: string;
  cardNumber: string;
  nameOnCard: string;
  expirationDate: string;
  cvv: string;
};
export type Items = {
  productId: string;
  name: string;
  color: string;
  size: string;
  quantity: number;
  price: number;
  stockId: string;
};

export type TransactionDetails = {
  subTotal: number;
  taxes: number;
  total: number;
};

export interface IOrderModel extends Document {
  customer: Customer;
  shippingDetails: ShippingDetails;
  orderDetails: OrderDetails;
  customerCard: CustomerCard;
  items: Items[];
  transactionDetails: TransactionDetails;
}

export const OrderSchema = new Schema<IOrderModel>({
  customer: {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: UserModel,
    },
    email: {
      type: String,
      required: [true, "Missing email"],
      minlength: [7, "Email has been a minimum 7 characters"],
    },
    firstName: {
      type: String,
      required: [true, "Missing first name"],
      minlength: [2, "First name has been a minimum 2 characters"],
    },
    lastName: {
      type: String,
      required: [true, "Missing last name"],
      minlength: [2, "Last name has been a minimum 2 characters"],
    },
  },

  shippingDetails: {
    address: {
      type: String,
      required: [true, "Missing address"],
    },
    apartment: {
      type: Number,
      required: [true, "Missing apartment"],
    },
    city: {
      type: String,
      required: [true, "Missing city"],
    },
    country: {
      type: String,
      required: [true, "Missing country"],
    },
    state: {
      type: String,
    },
    postalCode: {
      type: String,
      required: [true, "Missing postal code"],
    },
    phone: {
      type: String,
      required: [true, "Missing phone"],
      minlength: [8, "Phone number has been a minimum 8 characters"],
    },
  },

  orderDetails: {
    shippingMethod: {
      type: String,
      required: [true, "Missing shipping method"],
    },
    orderStatus: {
      type: String,
      default: "Order placed",
    },
    orderDate: {
      type: String,
      default: Date.now(),
    },
    expectedDeliveryDate: {
      type: String,
    },
  },

  customerCard: {
    paymentMethod: {
      type: String,
      required: [true, "Missing payment method"],
    },
    cardNumber: {
      type: String,
      required: [true, "Missing card number"],
      minlength: [12, "Card number has been minimum a 12 characters"],
      maxlength: [20, "Card number has been maximum a 20 characters"],
    },
    nameOnCard: {
      type: String,
      required: [true, "Missing name on card"],
    },
    expirationDate: {
      type: String,
      required: [true, "Missing expiration date"],
    },
    cvv: {
      type: String,
      required: [true, "Missing cvv"],
      minlength: [3, "CVV has been minimum 3 characters"],
      maxlength: [3, "CVV has been maximum 3 characters"],
    },
  },

  items: [
    {
      productId: {
        type: String,
        required: [true, "Missing product id"],
      },
      name: {
        type: String,
      },
      color: {
        type: String,
      },
      size: {
        type: String,
      },
      quantity: {
        type: Number,
      },
      price: {
        type: Number,
      },
      stockId: {
        type: String,
      },
    },
  ],

  transactionDetails: {
    subTotal: {
      type: Number,
    },
    taxes: {
      type: Number,
    },
    total: {
      type: Number,
    },
  },
});

export const OrderModel = model<IOrderModel>(
  "OrderModel",
  OrderSchema,
  "orders"
);
