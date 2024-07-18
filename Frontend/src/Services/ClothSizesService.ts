import { ClothSizeModel } from "../Models/ClothSizeModel";
import {
    addClothSize,
    deleteClothSize,
    setClothSizes,
    updateClothSize,
} from "../Redux/GenericSlice";
import { appConfig } from "../Utils/AppConfig";
import { GenericService } from "./GenericService";

class ClothesSizesService extends GenericService<ClothSizeModel> {
  public constructor() {
    super(
      new ClothSizeModel(),
      appConfig.clothesSizesUrl,
      "_id",
      setClothSizes,
      addClothSize,
      updateClothSize,
      deleteClothSize,
      undefined,
      "clothSizes"
    );
  }
}

export const clothesSizesService = new ClothesSizesService();
