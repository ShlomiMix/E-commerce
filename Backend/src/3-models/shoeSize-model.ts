import {Document, Schema, model} from "mongoose";

export interface IShoeSizeModel extends Document {
   name: string
}

export const ShoeSizeSchema = new Schema<IShoeSizeModel>({
    name: {
       type: String,
       required: [true, "Missing shoe size"],
       minlength: [1, "Shoe size must be longer then 1 characters"],
       maxlength:[6, "Shoe size can't be longer then 50 characters"],
       trim: true
   }
},{versionKey:false})

export const ShoeSizeModel = model<IShoeSizeModel>("ShoeSizeModel", ShoeSizeSchema, "shoesSize")