import { useEffect, useState } from "react";
import { MdOutlineCancel } from "react-icons/md";
import { CategoryModel } from "../../../Models/CategoryModel";
import { IdNameAble } from "../../../Models/IdNameAble";
import { useFetch } from "../../hooks/useFetch";

interface SelectInputProps<T, K> {
  fnQuery: () => Promise<K[]>;
  onValueChange: (value: K) => void;
  label: string;
  registerName?: keyof T & string;
  defaultValue?: string;
  disabledOption?: string;
  valueId?: string;
  disabled?: boolean;
  reset?: () => void;
}

export function SelectInputFilter<T, K extends IdNameAble | CategoryModel>({
  fnQuery,
  onValueChange,
  label,
  registerName,
  defaultValue,
  disabledOption,
  valueId,
  disabled,
  reset,
}: SelectInputProps<T, K>): JSX.Element {
    const { result: data = [], isLoading } = useFetch<K[]>(fnQuery as () => Promise<K[]>);
  const [selectedValue, setSelectedValue] = useState<string | null>(
    defaultValue ?? ""
  );

  console.log(data);
  

  useEffect(() => {
    if (defaultValue) {
      setSelectedValue(defaultValue ?? "");
    }
  }, [defaultValue]);

  const handleChangeValue = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setSelectedValue(selectedValue);
    const selectedData = data?.find((d) => d._id === selectedValue) || null;
    if (selectedData) {
      onValueChange(selectedData);
    }
  };

  const handleReset = () => {
    setSelectedValue("");
    if (reset) {
      reset();
    }
  };

  return (
    <div className="select-input relative">
      <label className="label-name">{label}</label>
      <select
        disabled={disabled}
        value={selectedValue || ""}
        onChange={handleChangeValue}
        className="py-2 px-0 pe-9 block w-full relative border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
      >
        <option value="" disabled hidden>
          {disabledOption || `Choose a ${label.toLowerCase()}`}
        </option>
        {isLoading ? (
          <option value="" disabled>
            Loading {label.toLowerCase()}...
          </option>
        ) : (
          data?.map((item) => (
            <option key={item._id} value={item._id}>
              {item.name}
            </option>
          ))
        )}
      </select>
      <div className="flex justify-end">
        <button
          type="button"
          onClick={handleReset}
          className="bg-blue-500 absolute top-6 right-5 text-white mt-2 px-1 rounded-lg"
        >
          <MdOutlineCancel color="black" size={18} />
        </button>
      </div>
    </div>
  );
}
