import { useEffect, useState } from "react";
import { Path, useForm } from "react-hook-form";
import "./SelectInput.css";
import { ProductModel } from "../../../../Models/ProductModel";
import { CategoryModel } from "../../../../Models/CategoryModel";
import { SubCategoryModel } from "../../../../Models/SubCategoryModel";
import { PeopleAudienceModel } from "../../../../Models/PeopleAudienceModel";
import { CompanyModel } from "../../../../Models/CompanyModel";
import { useFetch } from "../../../hooks/useFetch";

interface SelectProps<
  T extends ProductModel,
  K extends
    | CategoryModel
    | SubCategoryModel
    | PeopleAudienceModel
    | CompanyModel
> {
  register?: ReturnType<typeof useForm<T>>["register"];
  fnQuery: (_id?: string) => Promise<K[]>;
  registerName?: keyof T & string;
  disabledOption?: string;
  name: string;
  onValueChange: (value: K) => void;
  value?: string;
  disabled?: boolean;
  defaultValue?: string;
}



export function SelectInput<
  T extends ProductModel,
  K extends
    | CategoryModel
    | SubCategoryModel
    | PeopleAudienceModel
    | CompanyModel
>({
  fnQuery,
  disabledOption,
  register,
  name,
  onValueChange,
  registerName,
  disabled,
  defaultValue,
}: SelectProps<T, K>): JSX.Element {
  const { result: data = [] } = useFetch(fnQuery);
  console.log({ data, name });

  const [selectedValue, setSelectedValue] = useState<string | null>(
    defaultValue || null
  );

  useEffect(() => {
    if (defaultValue) {
      setSelectedValue(defaultValue);
    }
  }, [defaultValue]);

  const handleChangeValue = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setSelectedValue(selectedValue);
    const selectedData = data?.find((d) => d._id === selectedValue);
    onValueChange(selectedData);
  };

  return (
    <>
      <label className="label-name">{name}</label>
      <select
        value={selectedValue || ""}
        {...register(registerName as unknown as Path<T>)}
        disabled={disabled}
        onChange={handleChangeValue}
        className="py-2 px-0 pe-9 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
      >
        <option value="" disabled hidden>
          {disabledOption}
        </option>
        {data?.map((item, index) => (
          <option key={index} value={item._id}>
            {item.name}
          </option>
        ))}
      </select>
    </>
  );
}
