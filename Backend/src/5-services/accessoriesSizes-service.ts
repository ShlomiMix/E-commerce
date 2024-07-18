import { AccessorySizeModel, IAccessorySizeModel } from "../3-models/accessorySize-model";
import {
    ResourceNotFoundError,
    ValidationError,
} from "../3-models/client-errors";

class AccessoriesSizesService {
  public async getAllSizes(): Promise<IAccessorySizeModel[]> {
    const sizes = await AccessorySizeModel.find().exec();
    return sizes;
  }

  
  public getOneSize(_id: string): Promise<IAccessorySizeModel> {
    return AccessorySizeModel.findById(_id).exec();
  }

  public async addSize(size: IAccessorySizeModel): Promise<IAccessorySizeModel> {
    const errors = size.validateSync();
    if (errors) {
      throw new ValidationError(errors.message);
    }
    return size.save();
  }

  public async updateSize(size: IAccessorySizeModel): Promise<IAccessorySizeModel> {
    const errors = size.validateSync();
    if (errors) {
      throw new ValidationError(errors.message);
    }
    const updatedSize = AccessorySizeModel.findByIdAndUpdate(size._id, size, {
      new: true,
    });
    if (!updatedSize) {
      throw new ResourceNotFoundError(size._id);
    }
    return updatedSize;
  }

  public async deleteSize(_id: string): Promise<void> {
    const sizeToDelete = await AccessorySizeModel.findById(_id);
    if (!sizeToDelete) {
        throw new ResourceNotFoundError(_id);
      }
    await AccessorySizeModel.findByIdAndDelete(_id).exec();
  }
}

export const accessoriesSizesService = new AccessoriesSizesService();
