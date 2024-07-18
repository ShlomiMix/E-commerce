import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { ColorModel } from "../../../Models/ColorModel";
import { colorsService } from "../../../Services/ColorsService";
import { StringInput } from "../../FormArea/FormInputs/StringInput/StringInput";
import { GenericForm } from "../../FormArea/GenericForm/GenericForm";
import "./ColorForm.css";

interface ColorFormProps {
  submit: (color: ColorModel) => Promise<void>;
  header: string;
  buttonName: string;
}

export function ColorForm({
  buttonName,
  header,
  submit,
}: ColorFormProps): JSX.Element {
  const { register, handleSubmit, setValue } = useForm<ColorModel>();
  const { _id } = useParams();

  const fetchColor = async (): Promise<void> => {
    if (_id) {
      const color = await colorsService.getOne(_id);

      if (color) {
        setValue("name", color?.name);
        setValue("hexCode", color?.hexCode);
      }
    }
  };

  useEffect(() => {
    fetchColor();
  }, [_id, setValue]);
  return (
    <div className="ColorForm">
      <GenericForm<ColorModel>
        buttonName={buttonName}
        header={header}
        submit={handleSubmit(submit)}
        inputs={[
          <StringInput
            label="Name"
            minLength={3}
            maxLength={10}
            name="name"
            register={register}
            registerName="name"
            type="string"
          />,
          <StringInput
            label="Hex code"
            name="hexCode"
            register={register}
            registerName="hexCode"
            type="color"
            
            
          />,
        ]}
      />
    </div>
  );
}
