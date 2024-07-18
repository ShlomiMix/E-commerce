import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { IdNameAble } from "../../../Models/IdNameAble";
import { ExtractSizeType } from "../../../Utils/ExtractSizeType";
import { StringInput } from "../../FormArea/FormInputs/StringInput/StringInput";
import { GenericForm } from "../../FormArea/GenericForm/GenericForm";
import "./SizeForm.css";

interface SizeFormProps {
  buttonName: string;
  header: string;
  sizeType?: string;
  submit: (size: IdNameAble) => Promise<void>;
  _id?: string;
}

export function SizeForm({
  buttonName,
  header,
  submit,
}: SizeFormProps): JSX.Element {
  const { register, handleSubmit, setValue } = useForm<IdNameAble>();

  const { _id, sizeType } = useParams();

  const sizeTypeLower = sizeType.toLocaleLowerCase();
  const fetchSize = async (): Promise<void> => {
    if (_id) {
      const sizeType = await ExtractSizeType(sizeTypeLower, _id);
      setValue("name", sizeType);
    }
  };

  useEffect(() => {
    fetchSize();
  }, [sizeType, _id, setValue]);
  return (
    <div className="SizeForm">
      <GenericForm<IdNameAble>
        buttonName={buttonName}
        header={header}
        submit={handleSubmit(submit)}
        inputs={[
          <StringInput
            label="Name"
            name="name"
            register={register}
            registerName="name"
            type="string"
            minLength={1}
            maxLength={10}
          />,
        ]}
      />
    </div>
  );
}
