import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { useFetch } from '../../../hooks/useFetch';
import { ClothSizeModel } from '../../../../Models/ClothSizeModel';
import { ColorModel } from '../../../../Models/ColorModel';
import { ShoeSizeModel } from '../../../../Models/ShoeSizeModel';
import { AccessorySizeModel } from '../../../../Models/AccessorySizeModel';
import './SelectMultipleInput.css';

interface SelectMultipleInputProps<K extends ColorModel | ShoeSizeModel | ClothSizeModel | AccessorySizeModel> {
  fnQuery?: (_id?: string) => Promise<K[]>;
  disabledOption?: string;
  name: string;
  handleChangeValue: (values: K[]) => void;
  value?: K[] | null | undefined;
  disabled?: boolean;
  label: string;
  defaultValue?: string[];
}

export function SelectMultipleInput<K extends ColorModel | ShoeSizeModel | ClothSizeModel | AccessorySizeModel>({
  fnQuery,
  handleChangeValue,
  name,
  disabled,
  value = [],
  label,
  defaultValue = [],
}: SelectMultipleInputProps<K>): JSX.Element {
  const { result: data, isLoading } = useFetch(fnQuery);

  const [selectedValue, setSelectedValue] = useState<string[]>(
 []
  );

  useEffect(() => {
    if (value && value?.length > 0) {
      setSelectedValue(value?.map((v) => v._id));
    } else if(defaultValue && defaultValue.length > 0) {
        setSelectedValue(defaultValue)
    }
  }, [value, defaultValue]);

  const handleChangeValues = (selectedOptions: any) => {
    const selectedIds = selectedOptions.map((option: any) => option.value);
    setSelectedValue(selectedIds);
    const selectedObjects = data?.filter((item) => selectedIds.includes(item._id));
    handleChangeValue(selectedObjects || []);
  };

  const selectOptions = data?.map((item) => ({
    value: item._id,
    label: item.name,
  })) || [];

  return (
    <div className="z-100">
      <label>{label}</label>
      <Select
        isMulti
        name={name}
        options={selectOptions}
        value={selectOptions?.filter((option) => selectedValue.includes(option.value))}
        onChange={handleChangeValues}
        isDisabled={disabled || isLoading}
        className="basic-multi-select"
        classNamePrefix="select"
      />
    </div>
  );
}
