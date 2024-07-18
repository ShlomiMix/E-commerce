// Colors.tsx
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "../../../Redux/Store";
import { colorsService } from "../../../Services/ColorsService";
import { notify } from "../../../Utils/Notify";
import { ColorCard } from "../../CardArea/ColorCard/ColorCard";
import "./Colors.css";


export function Colors(): JSX.Element {
    const dispatch: AppDispatch = useDispatch();
  const colors = useAppSelector((state) => state.colors.entities);

  useEffect(() => {
    const fetchColors = async ():Promise<void> => {
      try {
       await colorsService.getAll();
        // console.log("Fetched colors:", fetchedColors);
        // dispatch(setColors(fetchedColors));
      } catch (err:any) {
        notify.error(err);
      }
    };

    fetchColors();
  }, []);

  return (
    <div className="flex gap-x-4 gap-y-4 flex-wrap">
      {colors?.map((color) => (
        <ColorCard key={color._id} color={color} />
      ))}
    </div>
  );
}
