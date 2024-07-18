import { Path, useForm } from "react-hook-form";
import "./StringInput.css";

interface StringInputProp<T> {
  register?: ReturnType<typeof useForm<T>>["register"];
  registerName: keyof T;
  minLength?: number;
  maxLength?: number;
  type: string;
  label: string;
  name: string;
}

export function StringInput<T>({
  label,
  maxLength,
  minLength,
  name,
  type,
  register,
  registerName,
 
}: StringInputProp<T>): JSX.Element {
  return (
    <div className="md:w-3/3 relative">
      <label className="name-label">{label}</label>
      <input
        required
        type={type}
        minLength={minLength}
        maxLength={maxLength}
        name={name}
        className="bg-black-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
        {...register(registerName as unknown as Path<T>)}
      />
    </div>
  );
}
