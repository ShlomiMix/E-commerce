import { Document, Schema, model } from "mongoose";

export interface ISubCategoryModel extends Document {
  name: string;
}

export const SubCategorySchema = new Schema<ISubCategoryModel>(
  {
    name: {
      type: String,
      required: [true, "Missing name"],
      minlength: [1, "Name must be longer then 1 characters"],
      maxlength: [50, "Name can't be longer then 50 characters"],
      trim: true,
    },
  },
  { versionKey: false
  }
);

export const SubCategoryModel = model<ISubCategoryModel>(
  "SubCategoryModel",
  SubCategorySchema,
  "subCategories"
);
