import { AccessorySizeModel } from "../Models/AccessorySizeModel";
import {
  addAccessorySize,
  deleteAccessorySize,
  setAccessorySizes,
  updateAccessorySize,
} from "../Redux/GenericSlice";
import { appConfig } from "../Utils/AppConfig";
import { GenericService } from "./GenericService";

class AccessorySizeService extends GenericService<AccessorySizeModel> {
  public constructor() {
    super(
      new AccessorySizeModel(),
      appConfig.accessoriesSizesUrl,
      "_id",
      setAccessorySizes,
      addAccessorySize,
      updateAccessorySize,
      deleteAccessorySize,
      undefined,
      "accessorySizes"
    );
  }
}

export const accessorySizesService = new AccessorySizeService();
