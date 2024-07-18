import {
  ResourceNotFoundError,
  ValidationError,
} from "../3-models/client-errors";
import {
  ISubCategoryModel,
  SubCategoryModel,
} from "../3-models/subCategory-model";

class SubCategoriesService {
  public async getAllSubCategories(): Promise<ISubCategoryModel[]> {
    const categories = await SubCategoryModel.find().exec();
    return categories;
  }

  public getOneSubCategory(_id: string): Promise<ISubCategoryModel> {
    return SubCategoryModel.findById(_id).exec();
  }

  public async addSubCategoriesArr(
    subCategories: ISubCategoryModel[]
  ): Promise<ISubCategoryModel[]> {
    const createdSubCategories = await SubCategoryModel.insertMany(
      subCategories
    );
    return createdSubCategories;
  }

  public async updateSubCategoriesArr(
    subCategories: ISubCategoryModel[]
  ): Promise<ISubCategoryModel[]> {
    const updatedSubCategories = await Promise.all(
      subCategories.map(async (subCategory) => {
        try {
          if (subCategory._id) {
            // Check if _id exists, then update existing subcategory
            const existingSubCategory =
              await SubCategoryModel.findByIdAndUpdate(
                subCategory._id,
                subCategory,
                { new: true }
              );
            if (!existingSubCategory) {
              throw new ResourceNotFoundError(subCategory._id);
            }
            return existingSubCategory;
          } else {
            // If _id does not exist, create a new subcategory
            const newSubCategory = new SubCategoryModel(subCategory);
            const savedSubCategory = await newSubCategory.save();
            return savedSubCategory;
          }
        } catch (err) {
          throw new Error(
            `Failed to update subcategory ${subCategory._id}: ${err.message}`
          );
        }
      })
    );
    return updatedSubCategories;
  }

  public async addSubCategory(
    category: ISubCategoryModel
  ): Promise<ISubCategoryModel> {
    const errors = category.validateSync();
    if (errors) {
      throw new ValidationError(errors.message);
    }
    return category.save();
  }

  public async updateSubCategory(
    category: ISubCategoryModel
  ): Promise<ISubCategoryModel> {
    const errors = category.validateSync();
    if (errors) {
      throw new ValidationError(errors.message);
    }
    const updatedCategory = SubCategoryModel.findByIdAndUpdate(
      category._id,
      category,
      { new: true }
    );
    if (!updatedCategory) {
      throw new ResourceNotFoundError(category._id);
    }
    return updatedCategory;
  }

  public async deleteSubCategory(_id: string): Promise<void> {
    const subCategoryToDelete = await SubCategoryModel.findById(_id);
    if (!subCategoryToDelete) {
      throw new ResourceNotFoundError(_id);
    }
    await SubCategoryModel.findByIdAndDelete(_id).exec();
  }
}

export const subCategoriesService = new SubCategoriesService();
