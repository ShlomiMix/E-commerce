import { useEffect, useState } from "react";
import { ColorModel } from "../../Models/ColorModel";
import { colorsService } from "../../Services/ColorsService";
import { notify } from "../../Utils/Notify";
import { useAppSelector } from "../../Redux/Store";

export function useImagesChange() {
  const [imagesUrl, setImagesUrl] = useState<string[]>([]);
  const [imagesFiles, setImagesFiles] = useState<FileList | null>(null);
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target?.files;
    setImagesFiles(files);
    console.log(files);
    const imagesUrl = Array.from(files).map((file) =>
      URL.createObjectURL(file)
    );
    setImagesUrl(imagesUrl);
  };
  return { imagesUrl, imagesFiles, handleFileChange, setImagesUrl };
}

export function useImageChange() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<FileList | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target?.files;
    setImageFile(file);
    if (file && file.length > 0) {
      const imagesUrl = URL.createObjectURL(file[0]);
      setImageUrl(imagesUrl);
    }
  };
  return { imageUrl, imageFile, handleFileChange, setImageUrl };
}

export const useSelectStockInput = () => {
  //   const [colors, setColors] = useState<ColorModel[]>([]);

  const colors = useAppSelector((state) => state?.colors?.entities);

  useEffect(() => {
    const fetchColors = async (): Promise<void> => {
      try {
        await colorsService.getAll();
      } catch (err: any) {
        notify.error(err);
      }
    };
    fetchColors();
  }, []);

  return {
    colors,
  };
};

// export const useCategoryChange = () => {

//     setSizesByCategory(sizes);
//   }

//   return {
//     category,
//     sizesByCategory,
//     handleCategoryChange
//   }
// };
