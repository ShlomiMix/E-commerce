import { Document, Schema, model } from "mongoose";
import { IUserModel } from "./user-model";

export type ICredentialsModel = Document &
  Pick<IUserModel, "email" | "password">;

export const CredentialsSchema = new Schema<ICredentialsModel>(
  {
    email: {
      type: String,
      required: [true, "Missing email"],
      minlength: [7, "Email must be longer than 7 characters"],
      maxlength: [50, "Email should be shorter than 50 characters"],
    },
    password: {
      type: String,
      required: [true, "Missing password"],
      minlength: [6, "Password must be longer than 6 characters"],
      maxlength: [50, "Password should be shorter than 50 characters"],
    },
  },
  { autoCreate: false }
);

export const CredentialsModel = model<ICredentialsModel>(
  "CredentialsModel",
  CredentialsSchema
);
