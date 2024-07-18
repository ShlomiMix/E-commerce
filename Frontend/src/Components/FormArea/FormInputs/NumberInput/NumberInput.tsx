import { Grid, TextField } from "@mui/material";
import { Path, useForm } from "react-hook-form";
import "./NumberInput.css";

interface NumberInputProp<T> {
  register?: ReturnType<typeof useForm<T>>["register"];
  registerName?: keyof T;
  min: number;
  max?: number;
  label: string;
  name: string;
  step?: string;
  type:string
}

export function NumberInput<T>({
  label,
  max,
  min,
  name,
  step,
  register,
  registerName,
  type
}: NumberInputProp<T>): JSX.Element {
  return (
    <div className="md:w-3/3">
      <label>{label}</label>
      <input
        type={type}
        min={min}
        max={max}
        step={step}
        name={name}
        {...register(registerName as unknown as Path<T>)}
        className="bg-white-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
      />
    </div>
  );
}
