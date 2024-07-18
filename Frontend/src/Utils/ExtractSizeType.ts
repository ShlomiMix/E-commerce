import { accessorySizesService } from "../Services/AccessorySizesService";
import { clothesSizesService } from "../Services/ClothSizesService";
import { shoesSizesService } from "../Services/ShoesSizesService";

export const ExtractSizeType = async (
  sizeType: string,
  _id: string
): Promise<string> => {
  switch (sizeType.toLocaleLowerCase()) {
    case "clothing":
      const clothSize = await clothesSizesService.getOne(_id);
      sizeType = clothSize?.name;
      break;
    case "footwear":
      const shoeSize = await shoesSizesService.getOne(_id);
      sizeType = shoeSize.name;
      break;
    case "accessories":
      const accessorySize = await accessorySizesService.getOne(_id);
      sizeType = accessorySize?.name;
      break;

    default:
      break;
  }

  return sizeType;
};
