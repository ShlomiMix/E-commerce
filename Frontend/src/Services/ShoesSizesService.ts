import axios from "axios";
import { ShoeSizeModel } from "../Models/ShoeSizeModel";
import { appConfig } from "../Utils/AppConfig";
import { appStore } from "../Redux/Store";
import {
  addShoeSize,
  deleteShoeSize,
  setShoeSizes,
  updateShoeSize,
} from "../Redux/GenericSlice";
import { GenericService } from "./GenericService";

class ShoesSizesService extends GenericService<ShoeSizeModel> {
  public constructor() {
    super(
      new ShoeSizeModel(),
      appConfig.shoesSizesUrl,
      "_id",
      setShoeSizes,
      addShoeSize,
      updateShoeSize,
      deleteShoeSize,
      undefined,
      "shoeSizes"
    );
  }
}

export const shoesSizesService = new ShoesSizesService();
