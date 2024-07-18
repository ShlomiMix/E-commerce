import { UploadedFile } from "express-fileupload";
import { imageHandler } from "../2-utils/imageHandler";
import { imagesHandler } from "../2-utils/imagesHandler";
import { CategoryModel, ICategoryModel } from "../3-models/category-model";
import {
    ResourceNotFoundError,
    ValidationError,
} from "../3-models/client-errors";
import {
    ISubCategoryModel
} from "../3-models/subCategory-model";

interface Category {
  category: ICategoryModel;
  image?: UploadedFile;
}

class CategoriesService {
  public async getAllCategories(): Promise<ICategoryModel[]> {
    const categories = await CategoryModel.find()
      .populate("subCategories")
      .exec();
    return categories;
  }

  public async getOneCategory(_id: string): Promise<ICategoryModel> {
    return await CategoryModel.findById(_id).populate("subCategories").exec();
  }

  public async getSubCategoriesByCategory(
    _id: string
  ): Promise<ISubCategoryModel[]> {
    const subCategoriesByCategory = await CategoryModel.findById(_id)
      .populate("subCategories")
      .exec();
    return subCategoriesByCategory.subCategories;
  }

  public async addCategory({
    category,
    image,
  }: Category): Promise<ICategoryModel> {
    const errors = category.validateSync();
    if (errors) {
      throw new ValidationError(errors.message);
    }

    if (image) {
      imagesHandler.configureFileSaver("1-assets", "category-images");
      const imageName = await imageHandler.convertImageToImageName(image);
      category.imageName = imageName;
    }

    const newCategory = await category.save();
    return this.getOneCategory(newCategory._id);
  }

  public async updateCategory({
    category,
    image,
  }: Category): Promise<ICategoryModel> {
    const errors = category.validateSync();
    if (errors) {
      throw new ValidationError(errors.message);
    }
    if (image) {
      imagesHandler.configureFileSaver("1-assets", "category-images");
      const newImageName = await imageHandler.updateImageName(
        CategoryModel,
        category._id,
        image
      );

      category.imageName = newImageName;
    }
    const updatedCategory = await CategoryModel.findByIdAndUpdate(
      category._id,
      category,
      { new: true }
    );
    if (!updatedCategory) {
      throw new ResourceNotFoundError(category._id);
    }
    return this.getOneCategory(updatedCategory._id);
  }

  public async deleteCategory(_id: string): Promise<void> {
    const categoryToDelete = await CategoryModel.findById(_id);
    if (!categoryToDelete) {
      throw new ResourceNotFoundError(_id);
    }
    await CategoryModel.findByIdAndDelete(_id).exec();
    await imageHandler.deleteImageName(categoryToDelete.imageName);
  }
}

export const categoriesService = new CategoriesService();
