import {
  ResourceNotFoundError,
  ValidationError,
} from "../3-models/client-errors";
import { IShoeSizeModel, ShoeSizeModel } from "../3-models/shoeSize-model";

class ShoesSizesService {
  public async getAllSizes(): Promise<IShoeSizeModel[]> {
    const sizes = await ShoeSizeModel.find().exec();
    return sizes;
  }

  public getOneSize(_id: string): Promise<IShoeSizeModel> {
    return ShoeSizeModel.findById(_id).exec();
  }

  public async addSize(size: IShoeSizeModel): Promise<IShoeSizeModel> {
    const errors = size.validateSync();
    if (errors) {
      throw new ValidationError(errors.message);
    }
    return size.save();
  }

  public async updateSize(size: IShoeSizeModel): Promise<IShoeSizeModel> {
    const errors = size.validateSync();
    if (errors) {
      throw new ValidationError(errors.message);
    }
    const updatedSize = await ShoeSizeModel.findByIdAndUpdate(size._id, size, {
      new: true,
    });
    if (!updatedSize) {
      throw new ResourceNotFoundError(size._id);
    }
    return updatedSize;
  }

  public async deleteSize(_id: string): Promise<void> {
    const sizeToDelete = await ShoeSizeModel.findById(_id);
    if (!sizeToDelete) {
      throw new ResourceNotFoundError(_id);
    }
    await ShoeSizeModel.findByIdAndDelete(_id).exec();
  }
}

export const shoesSizesService = new ShoesSizesService();
