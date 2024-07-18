import { Document, Schema, model } from "mongoose";
import { appConfig } from "../2-utils/app-config";

export interface ICompanyModel extends Document {
  name: string;
  imageName: string;
}

export const CompanySchema = new Schema<ICompanyModel>(
  {
    name: {
      type: String,
      required: [true, "Missing company"],
      minlength: [1, "Company name must be longer then 1 characters"],
      maxlength: [50, "Company name can't be longer then 50 characters"],
      trim: true,
    },
    imageName: {
      type: String,
    },
  },
  {
    versionKey: false,
    toJSON: {
      virtuals: true,
    },
  }
);

CompanySchema.virtual("imageUrl").get(function (this: ICompanyModel) {
  const baseImageUrl = appConfig.baseCompanyImageUrl;
  return baseImageUrl + this.imageName;
});

export const CompanyModel = model<ICompanyModel>(
  "CompanyModel",
  CompanySchema,
  "companies"
);
