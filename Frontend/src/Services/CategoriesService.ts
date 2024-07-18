import axios from "axios";
import { CategoryModel } from "../Models/CategoryModel";
import { SubCategoryModel } from "../Models/SubCategoryModel";
import {
  addCategory,
  deleteCategory,
  setCategories,
  updateCategory,
} from "../Redux/GenericSlice";
import { appConfig } from "../Utils/AppConfig";
import { GenericService } from "./GenericService";

class CategoriesService extends GenericService<CategoryModel> {
  public constructor() {
    super(
      new CategoryModel(),
      appConfig.categoriesUrl,
      "_id",
      setCategories,
      addCategory,
      updateCategory,
      deleteCategory,
      getSubCategoriesByCategoryId,
      "categories"
    );

    async function getSubCategoriesByCategoryId(
      _id: string
    ): Promise<SubCategoryModel[]> {
      const response = await axios.get<SubCategoryModel[]>(
        `${appConfig?.categoriesUrl}sub-categories-by-category/${_id}`
      );
      const subCategories = response.data;
      return subCategories;
    }
  }
}

export const categoriesService = new CategoriesService();
