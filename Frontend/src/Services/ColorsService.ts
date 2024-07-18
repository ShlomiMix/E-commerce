import axios from "axios";
import { CategoryModel } from "../Models/CategoryModel";
import { ColorModel } from "../Models/ColorModel";
import { appConfig } from "../Utils/AppConfig";
import { GenericService } from "./GenericService";
import {
  addColor,
  deleteColor,
  setColors,
  updateColor,
} from "../Redux/GenericSlice";

class ColorsService extends GenericService<ColorModel> {
  public constructor() {
    super(
      new ColorModel(),
      appConfig.colorsUrl,
      "_id",
      setColors,
      addColor,
      updateColor,
      deleteColor,
      undefined,
      "colors"
    );
  }
}

export const colorsService = new ColorsService();
