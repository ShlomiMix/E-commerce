import { Document, Schema, model } from "mongoose";

export interface IPeopleAudienceModel extends Document {
  name: string;
}

export const PeopleAudienceSchema = new Schema<IPeopleAudienceModel>(
  {
    name: {
      type: String,
      required: [true, "Missing PeopleCategory"],
      minlength: [2, "PeopleCategory name must be longer then 2 characters"],
      maxlength: [50, "PeopleCategory name can't be longer then 50 characters"],
      trim: true,
    },
  },
  { versionKey: false }
);

export const PeopleAudienceModel = model<IPeopleAudienceModel>(
  "PeopleCategoryModel",
  PeopleAudienceSchema,
  "peopleAudience"
);
