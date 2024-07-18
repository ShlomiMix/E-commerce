import { useState } from "react";
import { AccessorySizeModel } from "../../../../Models/AccessorySizeModel";
import { ClothSizeModel } from "../../../../Models/ClothSizeModel";
import { ColorModel } from "../../../../Models/ColorModel";
import { ShoeSizeModel } from "../../../../Models/ShoeSizeModel";
import { useSelectStockInput } from "../../../hooks/formUtils";
import "./SelectStockInput.css";

interface SelectStockInputProps {
  sizes: (ShoeSizeModel | ClothSizeModel | AccessorySizeModel)[];
  onColorChange?: (color: ColorModel) => void;
  onSizeChange?: (
    size: ShoeSizeModel | ClothSizeModel | AccessorySizeModel
  ) => void;
  onQuantityChange?: (quantity: number) => void;
  disabled?: boolean;
  initialColor?: string;
  initialSize?: string;
  initialQuantity?: number;
  allColors?: Promise<ColorModel[]>;
  onDelete: () => void;
}

interface DeleteButtonProp {
  onDelete: () => void;
}

export const DeleteButton = ({ onDelete }: DeleteButtonProp): JSX.Element => {
  return (
    <div className="delete-btn">
      <button type="button" className="delete-button" onClick={onDelete}>
        <svg className="delete-svgIcon" viewBox="0 0 448 512">
          <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path>
        </svg>
      </button>
    </div>
  );
};

export function SelectStockInput({
  sizes,
  onColorChange,
  onSizeChange,
  onQuantityChange,
  disabled,
  initialColor,
  initialSize,
  initialQuantity,
  onDelete,
}: SelectStockInputProps): JSX.Element {
  const { colors } = useSelectStockInput();
  const [selectedColor, setSelectedColor] = useState<string>(
    initialColor || ""
  );
  const [selectedSize, setSelectedSize] = useState<string>(initialSize || "");
  const [selectedQuantity, setSelectedQuantity] = useState<number>(
    initialQuantity || 0
  );

  const handleColorChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = colors.find((color) => color._id === event.target.value);
    if (selected) {
      setSelectedColor(event.target.value);
      onColorChange(selected);
    }
  };

  const handleSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = sizes.find((size) => size._id === event.target.value);
    if (selected) {
      setSelectedSize(event.target.value);
      onSizeChange(selected);
    }
  };

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const qty = parseInt(event.target.value);
    setSelectedQuantity(qty);
    onQuantityChange(qty);
  };

  return (
    <div className="flex flex-wrap gap-2 border-8 border-double border-black rounded-xl p-2 w-full mb-3  m-auto justify-center mt-5 relative">
      <select
        required
        className="w-56"
        value={selectedColor}
        onChange={handleColorChange}
        disabled={disabled}
      >
        <option value="">Select Color</option>
        {colors.map((color) => (
          <option key={color._id} value={color._id}>
            {color.name}
          </option>
        ))}
      </select>
      <select
        required
        className="w-56"
        value={selectedSize}
        onChange={handleSizeChange}
        disabled={disabled}
      >
        <option value="">Select Size</option>
        {sizes.map((size) => (
          <option key={size._id} value={size._id}>
            {size.name}
          </option>
        ))}
      </select>
      <input
        required
        className="w-56 ml-2"
        type="number"
        value={selectedQuantity}
        onChange={handleQuantityChange}
        disabled={disabled}
      />
      <DeleteButton onDelete={onDelete} />
    </div>
  );
}
