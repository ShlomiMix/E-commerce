import { Document, Schema, model } from "mongoose";
import { appConfig } from "../2-utils/app-config";
import { ISubCategoryModel, SubCategoryModel } from "./subCategory-model";

export interface ICategoryModel extends Document {
  name: string;
  subCategories: ISubCategoryModel[];
  imageName: string;
}

export const CategorySchema = new Schema<ICategoryModel>(
  {
    name: {
      type: String,
      required: [true, "Missing name"],
      minlength: [1, "Name must be longer then 1 characters"],
      maxlength: [50, "Name can't be longer then 50 characters"],
      trim: true,
    },
    subCategories: [
      {
        type: Schema.Types.ObjectId,
        ref: SubCategoryModel,
        required: [true, "Sub category is missing"],
      },
    ],
    imageName: {
      type: String,
    },
  },
  {
    versionKey: false,
    toJSON: { virtuals: true },
    id: false,
  }
);

CategorySchema.virtual("imageUrl").get(function (this: ICategoryModel) {
  const baseImageUrl = appConfig.baseCategoryImageUrl;
  return baseImageUrl + this.imageName;
});

export const CategoryModel = model<ICategoryModel>(
  "CategoryModel",
  CategorySchema,
  "categories"
);
