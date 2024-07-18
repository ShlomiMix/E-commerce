import {
  ResourceNotFoundError,
  ValidationError,
} from "../3-models/client-errors";
import { ClothSizeModel, IClothSizeModel } from "../3-models/clothSize-model";

class ClothesSizesService {
  public async getAllSizes(): Promise<IClothSizeModel[]> {
    const sizes = await ClothSizeModel.find().exec();
    return sizes;
  }

  
  public getOneSize(_id: string): Promise<IClothSizeModel> {
    return ClothSizeModel.findById(_id).exec();
  }

  public async addSize(size: IClothSizeModel): Promise<IClothSizeModel> {
    const errors = size.validateSync();
    if (errors) {
      throw new ValidationError(errors.message);
    }
    return size.save();
  }

  public async updateSize(size: IClothSizeModel): Promise<IClothSizeModel> {
    const errors = size.validateSync();
    if (errors) {
      throw new ValidationError(errors.message);
    }
    const updatedSize = ClothSizeModel.findByIdAndUpdate(size._id, size, {
      new: true,
    });
    if (!updatedSize) {
      throw new ResourceNotFoundError(size._id);
    }
    return updatedSize;
  }

  public async deleteSize(_id: string): Promise<void> {
    const sizeToDelete = await ClothSizeModel.findById(_id);
    if (!sizeToDelete) {
        throw new ResourceNotFoundError(_id);
      }
    await ClothSizeModel.findByIdAndDelete(_id).exec();
  }
}

export const clothesSizesService = new ClothesSizesService();
