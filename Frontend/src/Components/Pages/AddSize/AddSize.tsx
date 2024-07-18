import { useNavigate, useParams } from "react-router-dom";
import { IdNameAble } from "../../../Models/IdNameAble";
import { notify } from "../../../Utils/Notify";
import { SizeForm } from "../../Forms/SizeForm/SizeForm";
import "./AddSize.css";
import { clothesSizesService } from "../../../Services/ClothSizesService";
import { shoesSizesService } from "../../../Services/ShoesSizesService";
import { accessorySizesService } from "../../../Services/AccessorySizesService";

export function AddSize(): JSX.Element {
  const { sizeType } = useParams();

  const navigate = useNavigate();

  const addSize = async (size: IdNameAble): Promise<void> => {
    console.log(sizeType);

    try {
      switch (sizeType) {
        case "clothing":
          await clothesSizesService.addOne(size);
          break;
        case "footwear":
          await shoesSizesService.addOne(size);
          break;
        case "accessories":
          await accessorySizesService.addOne(size);
          break;

        default:
          break;
      }
      notify.success("Size has been added");
      navigate("/sizes");
    } catch (err: any) {
      notify.error(err);
    }
  };
  return (
    <div className="AddSize">
      <SizeForm buttonName="Add" header="Add Size" submit={addSize} />
    </div>
  );
}
