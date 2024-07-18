import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { CompanyModel } from "../../../Models/CompanyModel";

import { notify } from "../../../Utils/Notify";
import { CompanyForm } from "../../Forms/CompanyForm/CompanyForm";
import { useImageChange } from "../../hooks/formUtils";
import "./EditCompany.css";
import { companiesService } from "../../../Services/CompaniesService";

export function EditCompany(): JSX.Element {
  const navigate = useNavigate();

  const { _id } = useParams();
  const { setValue } = useForm<CompanyModel>();

  const { handleFileChange, imageFile, imageUrl, setImageUrl } =
    useImageChange();

  useEffect(() => {
    const fetchCompany = async (): Promise<void> => {
      try {
        if (_id) {
          const company = await companiesService.getOne(_id);
          if (company) {
            setImageUrl(company?.imageUrl);
          }
        }
      } catch (err: any) {
        notify.error(err);
      }
    };
    fetchCompany();
  }, [setValue]);

  const updateCompany = async (company: CompanyModel): Promise<void> => {
    try {
      company._id = _id;
      if (imageFile && imageFile[0]) {
        company.image = imageFile[0];
      }
      await companiesService.updateOne(company);
      notify.success("Company has been updated");
      navigate("/companies");
    } catch (err: any) {
      notify.error(err);
    }
  };

  return (
    <div className="EditCompany">
      <CompanyForm
        buttonName="Save"
        header="Edit company"
        submit={updateCompany}
        imageUrl={imageUrl}
        imageFile={imageFile}
        onChange={handleFileChange}
        required={false}
      />
    </div>
  );
}
