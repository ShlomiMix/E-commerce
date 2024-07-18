import { SubCategoryModel } from "./SubCategoryModel";

export class CategoryModel {
  _id?: string;
  name?: string;
  subCategories?: SubCategoryModel[];
  imageUrl?:string
  image?:File
}


