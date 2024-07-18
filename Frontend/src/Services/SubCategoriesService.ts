import axios from "axios";
import { SubCategoryModel } from "../Models/SubCategoryModel";
import { appConfig } from "../Utils/AppConfig";

class SubCategoriesService {
  public async getAllSubCategories(): Promise<SubCategoryModel[]> {
    const response = await axios.get<SubCategoryModel[]>(
      appConfig.subCategoriesUrl
    );
    const subCategories = response.data;
    return subCategories;
  }

  public async addMultipleSubCategories(
    subCategories: SubCategoryModel[]
  ): Promise<SubCategoryModel[]> {
    try {
      subCategories?.forEach((subCategory) => {
        if (!subCategory.name) {
          throw new Error("Missing name in one of the subcategories");
        }
      });

      const response = await axios.post<SubCategoryModel[]>(
        `${appConfig.subCategoriesUrl}batch`,
        subCategories
      );
      const addedSubCategories = response.data;
      return addedSubCategories;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Failed to add subcategories"
      );
    }
  }

  public async updateMultipleSubCategories(
    subCategories: SubCategoryModel[]
  ): Promise<SubCategoryModel[]> {
  
    const response = await axios.put<SubCategoryModel[]>(
      `${appConfig.subCategoriesUrl}update-batch`,
      subCategories
    );

    const updatedSubCategories = response.data;

    return updatedSubCategories;
  }

  public async getOneCategory(_id: string): Promise<SubCategoryModel> {
    const response = await axios.get<SubCategoryModel>(
      appConfig.subCategoriesUrl + _id
    );
    const subCategory = response.data;
    return subCategory;
  }

  public async addOneCategory(
    subCategory: SubCategoryModel
  ): Promise<SubCategoryModel> {
    const formData = this.formData(subCategory);
    const response = await axios.post<SubCategoryModel>(
      appConfig.subCategoriesUrl,
      formData
    );
    const addedSubCategory = response.data;
    console.log(addedSubCategory);
    return response?.data;
  }

  public async updateOneCategory(subCategory: SubCategoryModel): Promise<void> {
    const formData = this.formData(subCategory);
    const response = await axios.put<SubCategoryModel>(
      appConfig.subCategoriesUrl + subCategory._id,
      formData
    );
    const updatedSubCategory = response.data;
    console.log(updatedSubCategory);
  }

  public async deleteOneCategory(_id: string): Promise<void> {
    await axios.delete<SubCategoryModel>(appConfig.subCategoriesUrl + _id);
  }

  private formData(subCategory: SubCategoryModel): FormData {
    const formData = new FormData();
    formData.append("name", subCategory?.name);
    return formData;
  }
}

export const subCategoriesService = new SubCategoriesService();
