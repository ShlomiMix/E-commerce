import React from "react";
import { UseFormSetValue } from "react-hook-form";
import { ColorModel } from "../../../../Models/ColorModel";
import { IdNameAble } from "../../../../Models/IdNameAble";
import { ProductModel } from "../../../../Models/ProductModel";
import { StockModel } from "../../../../Models/StockModel";
import { colorsService } from "../../../../Services/ColorsService";
import { SelectStockInput } from "../SelectStockInput/SelectStockInput";

interface SelectStockComponentProps {
  sizes: IdNameAble[];
  disabled?: boolean;
  setValue: UseFormSetValue<ProductModel>;
  stocks: StockModel[];
  addStock: () => void;
  onDelete: (index: number) => void;
  handleColorChange?: (color: ColorModel, index: number) => void;
  handleSizeChange?: (size: IdNameAble, index: number) => void;
  handleQuantityChange?: (quantity: number, index: number) => void;
}

export function ParentSelectStockComponent({
  sizes,
  disabled,
  stocks = [],
  setValue,
  addStock,
  onDelete,
  handleColorChange,
  handleQuantityChange,
  handleSizeChange,
}: SelectStockComponentProps) {
  console.log({ stocks });

  
  return (
    <div>
      <div className="mb-4 flex flex-row justify-start mt-4 flex-wrap gap-y-2">
        {stocks.map((stock, index) => (
          <React.Fragment key={index}>
            <SelectStockInput
              key={index}
              sizes={sizes}
              onColorChange={(color) => handleColorChange(color, index)}
              onSizeChange={(size) => handleSizeChange(size, index)}
              onQuantityChange={(quantity) =>
                handleQuantityChange(quantity, index)
              }
              disabled={disabled}
              initialColor={stock.color?._id}
              initialSize={stock.size?._id}
              initialQuantity={stock?.quantity}
              allColors={colorsService.getAll()}
              onDelete={()=> onDelete(index)}
            />
          </React.Fragment>
        ))}
      </div>
      <div className="flex w-full flex-wrap justify-center p-0 gap-8 mb-4">
        <button
          role="form"
          type="button"
          onClick={addStock}
          disabled={disabled}
          className="bg-blue-400 xs:h-13 xxs:h-12  w-[100px] hover:bg-purple-500 text-2xl xs:text-lg xxs:text-base border-4 border-gray-950 text-stone-200 transition-transform hover:scale-95 hover:border-white rounded-3xl"
        >
          Add Stock
        </button>
      </div>
    </div>
  );
}
