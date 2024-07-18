import Slider from "@mui/material/Slider";
import Stack from "@mui/material/Stack";
import { useCallback, useState } from "react";
import { debounce } from "ts-debounce";
import "./PriceSliderFilter.css";
import { usePriceSliderFilter } from "../../hooks/SideBarHooks/PriceSliderFilterHooks/usePriceSliderFilter";

interface PriceSliderFilterProp {
  onPriceChange?: (priceRange: number[]) => void;
  marks: {value:number, label:string}[]
  valueText: (value:number) => string
}


export function PriceSliderFilter({
  onPriceChange,
  valueText,
   marks
}: PriceSliderFilterProp): JSX.Element {

    const {handlePriceChange,priceRange} = usePriceSliderFilter({onPriceChange, valueText, marks})

  return (
    <div className=" mt-3 ">
      <label>Price</label>
      <Stack sx={{ height: 100 }} spacing={1} direction={"row"}>
        <Slider
          className="flex justify-between"
          getAriaLabel={() => "Price range"}
          value={priceRange}
          onChange={handlePriceChange}
          valueLabelDisplay="auto"
          getAriaValueText={valueText}
          defaultValue={[1, 1000]}
          min={1}
          max={1000}
          marks={marks}
        />
      </Stack>
    </div>
  );
}
