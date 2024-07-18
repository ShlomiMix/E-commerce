import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { IdNameAble } from "../../../../Models/IdNameAble";
import { AppDispatch, useAppSelector } from "../../../../Redux/Store";
import { accessorySizesService } from "../../../../Services/AccessorySizesService";
import { clothesSizesService } from "../../../../Services/ClothSizesService";
import { shoesSizesService } from "../../../../Services/ShoesSizesService";
import { SizeCard } from "../../../CardArea/SizeCardArea/SizeCard/SizeCard";
import { AddButton } from "../AddButton/AddButton";
import "./Sizes.css";

export function Sizes(): JSX.Element {
  const { sizeType } = useParams();
  const [sizes, setSizes] = useState<IdNameAble[]>([]);
  const dispatch: AppDispatch = useDispatch();
  const clothSizes = useAppSelector((state) => state?.clothSizes?.entities);
  const shoeSizes = useAppSelector((state) => state?.shoeSizes?.entities);
  const accessorySizes = useAppSelector(
    (state) => state?.accessorySizes?.entities
  );

  const [selectedSizeType, setSelectedSizeType] = useState<string>(
    sizeType || "clothing"
  );

  useEffect(() => {
    const fetchSizes = async (type: string): Promise<void> => {
      console.log("Fetching sizes for type:", type);
      let sizesByType: IdNameAble[] = [];

      switch (type.toLocaleLowerCase()) {
        case "clothing":
          if (!clothSizes.length) {
            sizesByType = await clothesSizesService.getAll();
            // dispatch(setClothSizes(sizesByType));
          } else {
            sizesByType = clothSizes;
          }
          break;
        case "footwear":
          if (!shoeSizes.length) {
            sizesByType = await shoesSizesService.getAll();
            // dispatch(setShoeSizes(sizesByType));
          } else {
            sizesByType = shoeSizes;
          }
          break;
        case "accessories":
          if (!accessorySizes.length) {
            sizesByType = await accessorySizesService.getAll();
            // dispatch(setAccessorySizes(sizesByType));
          } else {
            sizesByType = accessorySizes;
          }
          break;
        default:
          throw new Error("Size type not exist");
      }
      setSizes(sizesByType);
      console.log(sizesByType);
    };

    fetchSizes(selectedSizeType);
  }, [selectedSizeType, clothSizes, shoeSizes, accessorySizes]);

  return (
    <div className="Sizes">
      <div className="flex justify-center mb-4 gap-x-3">
        <label className="border-2 rounded-xl p-3">
          <input
            type="radio"
            value="clothing"
            checked={selectedSizeType === "clothing"}
            onChange={() => setSelectedSizeType("clothing")}
          />
          Clothing
        </label>
        <label className="border-2 rounded-xl p-3">
          <input
            type="radio"
            value="footwear"
            className="border-2 rounded-xl p-3"
            checked={selectedSizeType === "footwear"}
            onChange={() => setSelectedSizeType("footwear")}
          />
          Footwear
        </label>
        <label className="border-2 rounded-xl p-3">
          <input
            type="radio"
            value="accessories"
            checked={selectedSizeType === "accessories"}
            onChange={() => setSelectedSizeType("accessories")}
          />
          Accessories
        </label>
        <AddButton
          buttonName={`size to ${selectedSizeType}`}
          sizeType={selectedSizeType}
        />
      </div>
      <div className="flex ml-2 flex-wrap gap-x-4 gap-y-4">
        {sizes?.map((size) => (
          <SizeCard key={size._id} size={size} sizeType={selectedSizeType} />
        ))}
      </div>
    </div>
  );
}
