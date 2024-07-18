import { Document, ObjectId, Schema, model } from "mongoose";

export interface IStockModel extends Document {
  color: ObjectId
  size: ObjectId;
  quantity: number
}

export const StockSchema = new Schema<IStockModel>(
  {
    color: {
      type: Schema.Types.ObjectId,
      required: [true, "Missing Color"],
      minlength: [3, "Color must be longer than 3 character"],
      maxlength: [20, "Color Size can't be longer than 20 characters"],
      trim: true
    },
    size: {
        type: Schema.Types.ObjectId,
        required: [true, "Missing Color"],
        minlength: [3, "Color must be longer than 3 character"],
        maxlength: [20, "Color Size can't be longer than 20 characters"],
        trim: true
      },
      quantity: {
        type:Number,
        min: [0, "Minimum quantity must be equal or greater than 0"],
        trim: true
      }

  },
  { versionKey: false }
);

export const StockModel = model<IStockModel>("StockModel",StockSchema);