import { useNavigate, useParams } from "react-router-dom";
import { IdNameAble } from "../../../Models/IdNameAble";
import { accessorySizesService } from "../../../Services/AccessorySizesService";
import { clothesSizesService } from "../../../Services/ClothSizesService";
import { shoesSizesService } from "../../../Services/ShoesSizesService";
import { notify } from "../../../Utils/Notify";
import { SizeForm } from "../../Forms/SizeForm/SizeForm";
import "./EditSize.css";

export function EditSize(): JSX.Element {
  const { _id, sizeType } = useParams();

  const navigate = useNavigate();

  const editSize = async (size: IdNameAble): Promise<void> => {
    try {
      switch (sizeType.toLocaleLowerCase()) {
        case "clothing":
          size._id = _id;
          await clothesSizesService.updateOne(size);
          break;
        case "footwear":
          size._id = _id;
          await shoesSizesService.updateOne(size);
          break;
        case "accessories":
          size._id = _id;
          await accessorySizesService.updateOne(size);
          break;

        default:
          break;
      }
      notify.success("Size has been updated");
      navigate("/sizes");
    } catch (err: any) {
      notify.error(err);
    }
  };

  return (
    <div className="EditSize">
      <SizeForm buttonName="Save" header="Edit Size" submit={editSize} />
    </div>
  );
}
