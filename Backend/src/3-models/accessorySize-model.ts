import { Document, Schema, model } from "mongoose";

export interface IAccessorySizeModel extends Document {
  name: string;
}

export const AccessorySizeSchema = new Schema<IAccessorySizeModel>(
  {
    name: {
      type: String,
      required: [true, "Missing Size"],
      minlength: [1, "Accessory Size must be longer than 1 character"],
      maxlength: [50, "Accessory Size can't be longer than 50 characters"],
      trim: true
    },
  },
  { versionKey: false }
);

export const AccessorySizeModel = model<IAccessorySizeModel>(
  "AccessorySizeModel",
  AccessorySizeSchema,
  "accessoriesSizes"
);