import React from "react";
import { UseFormHandleSubmit } from "react-hook-form";



interface FormProps<T> {
  header?: string;
  submit: () => Promise<void>;
  handleSubmit?: UseFormHandleSubmit<T, undefined>;
  inputs: React.ReactNode[];
  buttonName: string;
}

export function GenericForm<T>({
  header,
  inputs,
  submit,
  buttonName,
  handleSubmit,
}: FormProps<T>): JSX.Element {
  return (
    <div className="flex flex-col justify-center items-center mt-7 xxs:m-2">
      <div className="font-bold font-mono text-4xl">{header}</div>
      <form
        onSubmit={submit}
        className=" h-auto bg-neutral-200 rounded-3xl md:w-6/12 lg:w-4/12 xxs:w-full py-10 px-10 mb-10"
      >
        <div className="md:flex md:items-center mb-6">
          <div className="flex flex-col justify-center w-full">
            {inputs.map((input, index) => (
              <React.Fragment key={index}>{input}</React.Fragment>
            ))}
          </div>
        </div>
        <div className="flex w-full justify-center">
          <div className="md:w-3/3 flex gap-x-4">
            <button
              className="text-black-500 bg-green-400 hover:bg-purple-400  shadow focus:shadow-outline focus:outline-none font-bold py-2 px-4 rounded"
              type="submit"
            >
              {buttonName}
            </button>
            <button
              type="reset"
              className="text-black-500 bg-yellow-400  hover:bg-purple-400  shadow focus:shadow-outline focus:outline-none font-bold py-2 px-4 rounded"
            >
              Reset
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
