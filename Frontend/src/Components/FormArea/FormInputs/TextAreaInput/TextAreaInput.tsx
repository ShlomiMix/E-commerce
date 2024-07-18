import { Path, useForm } from "react-hook-form";
import "./TextAreaInput.css";

interface TextAreaInputProps<T> {
  register: ReturnType<typeof useForm<T>>["register"];
  registerName: keyof T;
  minLength: number;
  label: string;
  name:string
}

export function TextAreaInput<T>({
  register,
  registerName,
  label,
  minLength,
  name
}: TextAreaInputProps<T>): JSX.Element {
  return (
    <>
        <label>{label}</label>
        <textarea
          className="peer h-14 min-h-[100px] resize-none rounded-[7px] border border-blue-gray-200 border-t-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
          placeholder=" "
          minLength={minLength}
          name={name}
          {...register(registerName as unknown as Path<T>)}
        ></textarea>
    </>
  );
}
