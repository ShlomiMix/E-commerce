import * as chroma from "chroma.ts";
import { useNavigate } from "react-router-dom";
import { ColorModel } from "../../../Models/ColorModel";
import { colorsService } from "../../../Services/ColorsService";
import { notify } from "../../../Utils/Notify";
import { ColorForm } from "../../Forms/ColorForm/ColorForm";
import "./AddColor.css";


export function AddColor(): JSX.Element {
  const navigate = useNavigate();

  const convertColorValueToHex = (colorValue: string): string => {
    return chroma.color(colorValue).hex();
  };
  const addColor = async (color: ColorModel): Promise<void> => {
    try {
      convertColorValueToHex(color?.hexCode);
      await colorsService.addOne(color);
      notify.success("Color has been added");
      navigate("/colors");
    } catch (err: any) {
      notify.error(err);
    }
  };

  return (
    <div className="AddColor">
      <ColorForm buttonName="Add" header="Add color" submit={addColor} />
    </div>
  );
}
