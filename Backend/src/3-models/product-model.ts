// product-model.ts
import mongoose, { Document, ObjectId, Schema, model } from "mongoose";
import { appConfig } from "../2-utils/app-config";
import { AccessorySizeModel } from "./accessorySize-model"; // Ensure the import is correct
import { CategoryModel } from "./category-model";
import { ClothSizeModel } from "./clothSize-model";
import { ColorModel } from "./color-model";
import { CompanyModel } from "./company-model";
import { PeopleAudienceModel } from "./peopleAudience-model";
import { ShoeSizeModel } from "./shoeSize-model";
import { SubCategoryModel } from "./subCategory-model";

export interface IStock {
  _id: ObjectId;
  color: Schema.Types.ObjectId;
  size: Schema.Types.ObjectId;
  quantity: number;
}

export interface IProductModel extends Document {
  companyId: ObjectId;
  name: string;
  description: string;
  price: number;
  discount: number;
  categoryId: ObjectId;
  subCategoryId: ObjectId;
  audienceId: ObjectId;
  imageNames: string[];
}

export const ProductSchema = new Schema<IProductModel>(
  {
    companyId: {
      type: mongoose.Schema.ObjectId,
      required: [true, "Missing company"],
    },
    name: {
      type: String,
      required: [true, "Missing name"],
      maxlength: [50, "Name too long"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Missing description"],
      minlength: [5, "Description has to be minimum 5 characters"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Missing price"],
      min: [0, "Price can't be negative"],
      max: [2000, "Price can't be higher than 2000"],
    },
    discount: {
      type: Number,
      required: [true, "Missing discount"],
      min: [0, "Discount can't be negative"],
      max: [100, "Discount can't be higher than 100"],
    },
    categoryId: {
      type: mongoose.Schema.ObjectId,
      required: [true, "Missing category"],
      ref: "CategoryModel",
    },
    subCategoryId: {
      type: mongoose.Schema.ObjectId,
      required: [true, "Missing sub category"],
    },
    audienceId: {
      type: mongoose.Schema.ObjectId,
      required: [true, "Missing audience"],
    },

    imageNames: [{ type: String }],
  },
  {
    versionKey: false,
    toJSON: { virtuals: true },
    id: false,
  }
);

ProductSchema.virtual("category", {
  ref: CategoryModel,
  localField: "categoryId",
  foreignField: "_id",
  justOne: true,
});

ProductSchema.virtual("company", {
  ref: CompanyModel,
  localField: "companyId",
  foreignField: "_id",
  justOne: true,
});

ProductSchema.virtual("audience", {
  ref: PeopleAudienceModel,
  localField: "audienceId",
  foreignField: "_id",
  justOne: true,
});

ProductSchema.virtual("subCategory", {
  ref: SubCategoryModel,
  localField: "subCategoryId",
  foreignField: "_id",
  justOne: true,
});

ProductSchema.virtual("imagesUrl").get(function (this: IProductModel) {
  let baseImageUrl: string;

  switch (this.constructor) {
    case ClothModel:
      baseImageUrl = appConfig.baseClothImageUrl;

      break;
    case ShoeModel:
      baseImageUrl = appConfig.baseShoeImageUrl;

      break;

    case AccessoryModel:
      baseImageUrl = appConfig.baseAccessoryImageUrl;

      break;

    default:
      throw new Error("Cant find this path");
  }

  return this.imageNames.map((image) => baseImageUrl + image);
});

export const ProductModel = model<IProductModel>(
  "ProductModel",
  ProductSchema,
  "products"
);

// Define ClothModel

export interface IClothModel extends IProductModel {
  stock: IStock[];
}

const ClothSchema = new Schema<IClothModel>({
  stock: [
    {
      _id: { type: Schema.Types.ObjectId, auto: true },
      color: { type: Schema.Types.ObjectId, ref: ColorModel, required: true },
      size: {
        type: Schema.Types.ObjectId,
        ref: ClothSizeModel,
      },
      quantity: {
        type: Number,
        min: [0, "Quantity can't be negative"],
      },
    },
  ],
});

export const ClothModel = model<IClothModel>(
  "ClothModel",
  ProductSchema,
  "products"
).discriminator<IClothModel>("Cloth", ClothSchema);

// Define ShoeModel

export interface IShoeModel extends IProductModel {
  stock: IStock[];
}

const ShoeSchema = new Schema<IShoeModel>({
  stock: [
    {
      _id: { type: Schema.Types.ObjectId, auto: true },
      color: { type: Schema.Types.ObjectId, ref: ColorModel },
      size: { type: Schema.Types.ObjectId, ref: ShoeSizeModel },
      quantity: {
        type: Number,
        min: [0, "Quantity can't be negative"],
      },
    },
  ],
});

export const ShoeModel = model<IShoeModel>(
  "ShoeModel",
  ProductSchema,
  "products"
).discriminator<IShoeModel>("Shoe", ShoeSchema);

// Define AccessoryModel

export interface IAccessoryModel extends IProductModel {
  stock: IStock[];
}

const AccessorySchema = new Schema<IAccessoryModel>({
  stock: [
    {
      _id: { type: Schema.Types.ObjectId, auto: true },
      color: { type: Schema.Types.ObjectId, ref: ColorModel },
      size: {
        type: Schema.Types.ObjectId,
        ref: AccessorySizeModel,
      },
      quantity: {
        type: Number,
        min: [0, "Quantity can't be negative"],
      },
    },
  ],
});

export const AccessoryModel = model<IAccessoryModel>(
  "AccessoryModel",
  ProductSchema,
  "products"
).discriminator<IAccessoryModel>("Accessory", AccessorySchema);
