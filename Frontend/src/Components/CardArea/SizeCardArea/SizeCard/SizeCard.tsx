import { IdNameAble } from "../../../../Models/IdNameAble";
import { accessorySizesService } from "../../../../Services/AccessorySizesService";
import { clothesSizesService } from "../../../../Services/ClothSizesService";
import { shoesSizesService } from "../../../../Services/ShoesSizesService";
import { DeleteButton } from "../DeleteButton/DeleteButton";
import { EditButton } from "../EditButton/EditButton";
import "./SizeCard.css";

interface SizeCardProps {
  size: IdNameAble;
  sizeType: string;
}

export function SizeCard({ size, sizeType }: SizeCardProps): JSX.Element {
  const deleteBySizeType = async (): Promise<void> => {
    switch (sizeType.toLocaleLowerCase()) {
      case "clothing":
        clothesSizesService.deleteOne(size._id);
        break;
      case "footwear":
        shoesSizesService.deleteOne(size._id);
        break;
      case "accessories":
        accessorySizesService.deleteOne(size._id);
        break;

      default:
        break;
    }
  };

  return (
    <div className="block border-double  w-72 border-8 border-black rounded-xl bg-white shadow-secondary-1 dark:bg-surface-dark">
      <div className="p-6 text-surface dark:text-white flex flex-col justify-end h-32 flex-wrap">
        <h5 className="mb-2 text-xl font-medium leading-tight">{size?.name}</h5>
        <div className="flex gap-x-10">
          <EditButton sizeType={sizeType} _id={size._id} />
          <DeleteButton
            _id={size._id}
            name={size.name}
            key={size._id}
            fnQuery={deleteBySizeType}
            className="inline-block rounded bg-yellow-400 text-slate-950 transition-opacity opacity-80 hover:text-slate-50 hover:opacity-100 hover:bg-red-600 hover:scale-110 px-6 pb-2 pt-2.5 text-xs font-medium  leading-normal  shadow-primary-3 duration-1000 ease-linear hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
          />
        </div>
      </div>
    </div>
  );
}
