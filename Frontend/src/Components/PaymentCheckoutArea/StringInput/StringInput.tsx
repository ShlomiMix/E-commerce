import { RegisterOptions, useFormContext } from "react-hook-form";
import "./StringInput.css";

export interface StringInputProp {
  name: string;
  label: string;
  type: string;
  registerOptions: RegisterOptions;
}

export function StringInput({
  label,
  name,
  registerOptions = {},
  type,
}: StringInputProp): JSX.Element {
  const { register, setValue } = useFormContext();
  return (
    <div className="xxs:flex flex-col p-2 justify-center">
      <label htmlFor={name} className="xxs:ml-2">
        {label}
      </label>
      <input
        className="bg-black-200 xxs:w-11/12 ml-4 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
        type={type}
        {...register(name, registerOptions)}
        onChange={(e) => setValue && setValue(name, e.target.value)}
      />
    </div>
  );
}
