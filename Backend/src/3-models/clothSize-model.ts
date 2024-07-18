import {Document, Schema, model} from "mongoose";

export interface IClothSizeModel extends Document {
   name: string
}

export const ClothSizeSchema = new Schema<IClothSizeModel>({
   name: {
       type: String,
       required: [true, "Missing cloth size"],
       minlength: [1, "Cloth Size must be longer then 1 characters"],
       maxlength:[50, "Cloth Size can't be longer then 50 characters"],
       trim: true
   }
},{versionKey:false})

export const ClothSizeModel = model<IClothSizeModel>("ClothSizeModel", ClothSizeSchema, "clothesSizes")