import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { ColorModel } from "../../../Models/ColorModel";
import { colorsService } from "../../../Services/ColorsService";
import { notify } from "../../../Utils/Notify";
import { ColorForm } from "../../Forms/ColorForm/ColorForm";
import "./EditColor.css";

export function EditColor(): JSX.Element {
  const { setValue } = useForm<ColorModel>();
  const navigate = useNavigate();
  const { _id } = useParams();

  const fetchColor = async (): Promise<void> => {
    if (_id) {
      const color = await colorsService.getOne(_id);

      if (color) {
        setValue("name", color?.name);
        setValue("hexCode", color?.hexCode);
      }
    }
  };

  useEffect(() => {
    fetchColor();
  }, [_id, setValue]);

  const updateColor = async (color: ColorModel): Promise<void> => {
    try {
      color._id = _id;
      await colorsService.updateOne(color);
      notify.success("Color has been updated");
      navigate("/colors");
    } catch (err: any) {
      notify.error(err);
    }
  };

  return (
    <div className="EditColor">
      <ColorForm buttonName="Save" header="Edit color" submit={updateColor} />
    </div>
  );
}
