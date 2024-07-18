import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCompanies } from "../../../Redux/GenericSlice";
import { AppDispatch, useAppSelector } from "../../../Redux/Store";

import { notify } from "../../../Utils/Notify";
import { CompanyCard } from "../../CardArea/CompanyCard/CompanyCard";
import "./Companies.css";
import { companiesService } from "../../../Services/CompaniesService";

export function Companies(): JSX.Element {
  const dispatch: AppDispatch = useDispatch();
  const companies = useAppSelector((state) => state?.companies?.entities);

  useEffect(() => {
    const fetchCompanies = async (): Promise<void> => {
      try {
        await companiesService.getAll();
        // dispatch(setCompanies(companies));
      } catch (err: any) {
        notify.error(err);
      }
    };
    fetchCompanies();
  }, []);

  return (
    <div className="flex flex-wrap gap-x-4 gap-y-4 justify-center">
      {companies?.map((company) => (
        <CompanyCard company={company} key={company?._id} />
      ))}
    </div>
  );
}
