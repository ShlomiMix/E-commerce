import { useForm } from "react-hook-form";
import { CompanyModel } from "../../../Models/CompanyModel";
import { GenericForm } from "../../FormArea/GenericForm/GenericForm";
import "./CompanyForm.css";
import { ImageInput } from "../../FormArea/FormInputs/ImageInput/ImageInput";
import { useImageChange } from "../../hooks/formUtils";
import { ChangeEvent, useEffect } from "react";
import { StringInput } from "../../FormArea/FormInputs/StringInput/StringInput";
import { companiesService } from "../../../Services/CompaniesService";
import { useParams } from "react-router-dom";
import { notify } from "../../../Utils/Notify";

interface CompanyFormProps {
  header: string;
  buttonName: string;
  submit: (company: CompanyModel) => Promise<void>;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  required: boolean;
  imageUrl: string;
  imageFile: FileList;
}

export function CompanyForm({
  buttonName,
  header,
  submit,
  onChange,
  imageUrl,
  required,
}: CompanyFormProps): JSX.Element {
  const { handleSubmit, register, setValue } = useForm<CompanyModel>();
  const { _id } = useParams();
   



  useEffect(() => {
    const fetchCompany = async (): Promise<void> => {
      try {
        if (_id) {
          const company = await companiesService.getOne(_id);
          if (company) {
            setValue("name", company?.name);
          }
        }
      } catch (err: any) {
        notify.error(err)
      }
    };
    fetchCompany()
  }, [setValue]);

  return (
    <div className="CompanyForm">
      <GenericForm
        buttonName={buttonName}
        header={header}
        submit={handleSubmit(submit)}
        inputs={[
          <StringInput<CompanyModel>
            label="Name"
            name="name"
            type="string"
            registerName="name"
            register={register}
            minLength={2}
            maxLength={20}
          />,

          <ImageInput
            imagesUrl={imageUrl}
            required={required}
            onChange={onChange}
          />,
        ]}
      />
    </div>
  );
}
