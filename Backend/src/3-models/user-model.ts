import { Document, Schema, model } from "mongoose";

// 1. Interface describing the needed document
// Use this interface to describe the model in function signatures
export interface IUserModel extends Document {
  // we don't declare any id. Any document comes with _id.
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  roleId: number;
}

// 2.  Schema describing the document, validation and more:

export const UserSchema = new Schema<IUserModel>(
  {
    firstName: {
      type: String,
      required: [true, "Missing first name"],
      minlength: [2, "First name has to be minimum 2 characters"],
      maxlength: [50, "First name can't be higher then 50 characters"],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "Missing last name"],
      minlength: [2, "Last name has to be minimum 2 characters"],
      maxlength: [50, "Last name can't be higher then 50 characters"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Missing email"],
      minlength: [7, "Email has to be minimum 7 characters"],
      maxlength: [55, "Email can't be higher then 55 characters"],
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Missing password"],
      minlength: [6, "Password has to be minimum 6 characters"],
      maxlength: [255, "Password can't be higher then 55 characters"],
    },
    roleId: {
      type: Number,
      required: [true, "Missing role id"],
    },
  },
  {
    versionKey: false, // don't create "__v" field in new documents
    toJSON: { virtuals: true }, // Allow to get virtual fields
    id: false, // Don't duplicated _id into id
  }
);

// 3. Model - The actual class we are going to work with
// use this model to perform the actual operations in the database
export const UserModel = model<IUserModel>("UserModel", UserSchema, "users");
