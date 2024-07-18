import { Model } from "mongoose";
import { IProductModel } from "../3-models/product-model";
import { Request, Response, NextFunction } from "express";
import { UploadedFile } from "express-fileupload";
import { fileSaver } from "uploaded-file-saver";
import path from "path";

class ImagesHandler {
  public async getImageNames<T extends IProductModel>(
    model: Model<T>,
    _id: string
  ): Promise<string[]> {
    try {
      const product = await model.findById(_id).select("imageNames");

      if (!product) {
        return null;
      }
      const imagesNames = product.imageNames || [];
      return imagesNames;
    } catch (err: any) {
      console.log(err.message);
    }
  }

  public async extractImagesFromRequest(
    request: Request
  ): Promise<UploadedFile[]> {
    try {
      let imagesArr: UploadedFile[] = [];
      const images = request.files?.images;
      Array.isArray(images) ? (imagesArr = images) : imagesArr.push(images);
      return imagesArr;
    } catch (err: any) {
      console.log(err.message);
    }
  }

  public async getImageFile(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { imageName, folderPath } = request.params;
      const fullImagePath = path.resolve(
        __dirname,
        "..",
        "1-assets",
        folderPath,
        imageName
      );
      response.sendFile(fullImagePath);
    } catch (err: any) {
      next(err);
    }
  }

  public configureFileSaver(folder1: string, folder2: string): void {
    const basePath = path.resolve(__dirname, "../"); // Go up one level from the current directory
    console.log({ basePath: basePath });
    const assetPath = path.join(basePath, `${folder1}`, `${folder2}`);
    console.log({ assetPath: assetPath });
    console.log("FileSaver Configured Path:", assetPath);
    fileSaver.config(assetPath);
  }

  public async AddImageNames(images: UploadedFile[]): Promise<string[]> {
    try {
      if (images && images.length > 0) {
        const imagesArr: UploadedFile[] = Array.from(images);
        const imageNames = await Promise.all(
          imagesArr.map(async (image) => await fileSaver.add(image))
        );
        return imageNames;
      }
    } catch (err: any) {
      console.log(err.message);
    }
  }

  public async updateImageNames<T extends IProductModel>(
    model: Model<T>,
    _id: string,
    images: UploadedFile[]
  ): Promise<string[]> {
    try {
      const oldImageNames = await this.getImageNames<T>(model, _id);
      console.log({ oldImageNames: oldImageNames });
      if (images && images.length > 0) {
        const imagesArr: UploadedFile[] = Array.from(images);
        const imageNames = await Promise.all(
          imagesArr.map(async (image, index) => {
            const oldImageName = oldImageNames[index];
            return await fileSaver.update(oldImageName, image);
          })
        );
        return imageNames;
      } else {
        return oldImageNames;
      }
    } catch (err: any) {
      console.log(err.message);
    }
  }

  public async deleteImages(imageNames: string[]) {
    try {
      await Promise.all(
        imageNames.map(async (image) => await fileSaver.delete(image))
      );
    } catch (err: any) {
      console.log(err.message);
    }
  }
}

export const imagesHandler = new ImagesHandler();
