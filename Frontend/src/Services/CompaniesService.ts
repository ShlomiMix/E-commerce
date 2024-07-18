import { CompanyModel } from "../Models/CompanyModel";
import {
  addCompany,
  deleteCompany,
  setCompanies,
  updateCompany,
} from "../Redux/GenericSlice";
import { appConfig } from "../Utils/AppConfig";
import { GenericService } from "./GenericService";

class CompaniesService extends GenericService<CompanyModel> {
  public constructor() {
    super(
      new CompanyModel(),
      appConfig.companiesUrl,
      "_id",
      setCompanies,
      addCompany,
      updateCompany,
      deleteCompany,
      undefined,
      "companies"
    );
  }
}

export const companiesService = new CompaniesService();
