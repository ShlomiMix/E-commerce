import { useCallback, useState } from "react";
import { debounce } from "ts-debounce";

interface usePriceSliderFilterProp {
    onPriceChange:(priceRange:number[]) => void
    valueText: (value:number)=> string
    marks: {value:number, label:string}[]
    //  marks: [
    //     {
    //       value: 1,
    //       label: "1$",
    //     },
    //     {
    //       value: 250,
    //       label: "250$",
    //     },
    //     {
    //       value: 500,
    //       label: "500$",
    //     },
    //     {
    //       value: 750,
    //       label: "750$",
    //     },
    //     {
    //       value: 1000,
    //       label: "1000$",
    //     },
    //   ];
}


export const usePriceSliderFilter = ({onPriceChange, marks,valueText}:usePriceSliderFilterProp)=> {
    const [priceRange, setPriceRange] = useState<number[]>([1, 1000]);

    // function valueText(value: number) {
    //     return `${value}$`;
    //   }

  const debouncedHandlePriceChange = useCallback(
    debounce((newPriceRange: number[]) => {
      onPriceChange?.(newPriceRange);
    }, 300), // Adjust debounce delay as needed (e.g., 300 milliseconds)
    [onPriceChange]
  );

  // Handle price change with debounce
  const handlePriceChange = (event: Event, newValue: number | number[]) => {
    if (Array.isArray(newValue)) {
      setPriceRange(newValue);
      debouncedHandlePriceChange(newValue); // Call debounced handler
    }
  };

  return {
    priceRange,
    handlePriceChange,
  }

} 