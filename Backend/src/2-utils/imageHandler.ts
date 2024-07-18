import { UploadedFile } from "express-fileupload";
import { fileSaver } from "uploaded-file-saver";
import { ICategoryModel } from "../3-models/category-model";
import { Model } from "mongoose";
import { ResourceNotFoundError } from "../3-models/client-errors";
import { ICompanyModel } from "../3-models/company-model";

class ImageHandler {
  public async convertImageToImageName(image: UploadedFile): Promise<string> {
    try {
      const imageName = await fileSaver.add(image);
      return imageName;
    } catch (err: any) {
      console.log(err.message);
    }
  }

  public async getImageName<T extends ICategoryModel | ICompanyModel>(
    model: Model<T>,
    _id: string
  ): Promise<string> {
    try {
      const value = await model.findById(_id).select("imageName");
      if (!value) {
        throw new ResourceNotFoundError(_id);
      }
      const imageName = value.imageName || "";
      console.log("Retrieved image name:", imageName);
      return imageName;
    } catch (err: any) {
      console.log("Error getting image name:", err.message);
      console.log(err.message);
    }
  }

  public async updateImageName<T extends ICategoryModel | ICompanyModel>(
    model: Model<T>,
    _id: string,
    image: UploadedFile
  ): Promise<string> {
    const oldImageName = await this.getImageName(model, _id);
    const newImageName = image
      ? await fileSaver.update(oldImageName, image)
      : oldImageName;
    console.log("Image updated from", oldImageName, "to", newImageName);
    return newImageName;
  }

  public async deleteImageName(imageName: string): Promise<void> {
    await fileSaver.delete(imageName);
  }
}

export const imageHandler = new ImageHandler();
