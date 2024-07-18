 import {Document, Schema, model} from "mongoose";

 export interface IColorModel extends Document {
    name: string
    hexCode:string
 }

 export const ColorSchema = new Schema<IColorModel>({
    name: {
        type: String,
        required: [true, "Missing color"],
        minlength: [2, "Color name must be longer then 1 characters"],
        maxlength:[20, "Color name can't be longer then 20 characters"],
        trim: true
    }, 
    hexCode: {
        type:String,
        required: [true, "Missing color hex code"]
    }
 },{versionKey:false})

 export const ColorModel = model<IColorModel>("ColorModel", ColorSchema, "colors")