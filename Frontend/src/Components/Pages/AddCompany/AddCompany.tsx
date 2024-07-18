import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { CompanyModel } from "../../../Models/CompanyModel";
// import { companiesService } from "../../../Services/CompaniesService";
import { notify } from "../../../Utils/Notify";
import { CompanyForm } from "../../Forms/CompanyForm/CompanyForm";
import { useImageChange } from "../../hooks/formUtils";
import "./AddCompany.css";
import { companiesService } from "../../../Services/CompaniesService";

export function AddCompany(): JSX.Element {
  const navigate = useNavigate();

  const { register, setValue } = useForm<CompanyModel>();

  const { handleFileChange, imageFile, imageUrl, setImageUrl } =
    useImageChange();

  const addCompany = async (company: CompanyModel): Promise<void> => {
    try {
      if (imageFile && imageFile[0]) {
        company.image = imageFile[0];
      }
      await companiesService.addOne(company);
      notify.success("Company has been added");
      navigate("/companies");
    } catch (err: any) {
      notify.error(err);
    }
  };

  return (
    <div className="AddCompany">
      <CompanyForm
        buttonName="Add"
        header="Add company"
        submit={addCompany}
        imageUrl={imageUrl}
        imageFile={imageFile}
        onChange={handleFileChange}
        required
      />
    </div>
  );
}
