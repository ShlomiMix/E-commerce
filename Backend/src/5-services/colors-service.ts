import {
  ResourceNotFoundError,
  ValidationError,
} from "../3-models/client-errors";
import { ColorModel, IColorModel } from "../3-models/color-model";

class ColorsService {
  public async getAllColors(): Promise<IColorModel[]> {
    const colors = await ColorModel.find().exec();
    return colors;
  }

  public getOneColor(_id: string): Promise<IColorModel> {
    return ColorModel.findById(_id).exec();
  }

  public async addColor(color: IColorModel): Promise<IColorModel> {
    const errors = color.validateSync();
    if (errors) {
      throw new ValidationError(errors.message);
    }
    return color.save();
  }

  public async updateColor(color: IColorModel): Promise<IColorModel> {
    const errors = color.validateSync();
    if (errors) {
      throw new ValidationError(errors.message);
    }

    const updatedColor = ColorModel.findByIdAndUpdate(color._id, color, {
      new: true,
    });
    if (!updatedColor) {
      throw new ResourceNotFoundError(color._id);
    }
    return updatedColor;
  }

  public async deleteColor(_id: string): Promise<void> {
    const colorToDelete = await ColorModel.findById(_id);
    if (!colorToDelete) {
      throw new ResourceNotFoundError(_id);
    }
    await ColorModel.findByIdAndDelete(_id).exec();
  }
}

export const colorsService = new ColorsService();
