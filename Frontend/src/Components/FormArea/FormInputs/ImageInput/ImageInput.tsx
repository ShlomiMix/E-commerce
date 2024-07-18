import { ChangeEventHandler } from "react";
import { useForm } from "react-hook-form";
import { ProductModel } from "../../../../Models/ProductModel";
import "./ImageInput.css";

interface ImageInputProps {
  register?: ReturnType<typeof useForm<ProductModel>>["register"];
  imagesUrl: string;
  required: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

export function ImageInput({
  imagesUrl,
  register,
  required,
  onChange,


}: ImageInputProps): JSX.Element {

  return (
    <div
      className="w-auto overflow-auto h-auto mt-2 relative border-2 border-slate-50 border-dashed rounded-lg p-6"
      id="dropzone"

    >
      <input
        required={required}
        type="file"
        className="absolute inset-0 w-full h-full opacity-0 z-50"
        onChange={onChange}
      />
      <div className="text-center">
        <img
          className="mx-auto h-12 w-12"
          src="https://www.svgrepo.com/show/357902/image-upload.svg"
          alt="Upload Icon"
        />
        <h3 className="mt-2 text-sm font-medium text-gray-900">
          <label htmlFor="file-upload" className="relative cursor-pointer">
            <span>Drag and drop</span>
            <span className="text-indigo-600"> or browse</span>
            <span> to upload</span>
            <input
              id="file-upload"
              name="file-upload"
              type="file"
              className="sr-only"
              onChange={onChange}

            />
          </label>
        </h3>
        <p className="mt-1 text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
      </div>
      <div className="mt-4 max-h-40 flex flex-wrap" id="preview">
       {imagesUrl && (
           
           <img
             src={imagesUrl}
             className="h-15 w-15 mb-2 m-2 xs:h-10 xs:w-10 xxs:"
             
           />
       )}
     
      </div>
    </div>
  );
}
