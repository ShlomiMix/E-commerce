import { UploadedFile } from "express-fileupload";
import {
  ResourceNotFoundError,
  ValidationError,
} from "../3-models/client-errors";
import { CompanyModel, ICompanyModel } from "../3-models/company-model";
import { imagesHandler } from "../2-utils/imagesHandler";
import { imageHandler } from "../2-utils/imageHandler";

interface Company {
  company: ICompanyModel;
  image?: UploadedFile;
}
class CompaniesService {
  public async getAllCompanies(): Promise<ICompanyModel[]> {
    const colors = await CompanyModel.find().exec();
    return colors;
  }

  public getOneCompany(_id: string): Promise<ICompanyModel> {
    return CompanyModel.findById(_id).exec();
  }

  public async addCompany({ company, image }: Company): Promise<ICompanyModel> {
    const errors = company.validateSync();
    if (errors) {
      throw new ValidationError(errors.message);
    }
    if (image) {
      imagesHandler.configureFileSaver("1-assets", "company-images");
      const imageName = await imageHandler.convertImageToImageName(image);
      company.imageName = imageName;
      console.log("Image saved with name:", imageName);
    } else {
      console.log("No image provided");
    }
    return company.save();
  }

  public async updateCompany({
    company,
    image,
  }: Company): Promise<ICompanyModel> {
    const errors = company.validateSync();
    if (errors) {
      throw new ValidationError(errors.message);
    }
    imagesHandler.configureFileSaver("1-assets", "company-images");
    const newImageName = await imageHandler.updateImageName(
      CompanyModel,
      company._id,
      image
    );
    company.imageName = newImageName;
    const updatedCompany = await CompanyModel.findByIdAndUpdate(
      company._id,
      company,
      { new: true }
    );
    if (!updatedCompany) {
      throw new ResourceNotFoundError(company._id);
    }
    return updatedCompany;
  }

  public async deleteCompany(_id: string): Promise<void> {
    const company = await CompanyModel.findById(_id);
    if (!company) {
      throw new ResourceNotFoundError(_id);
    }

    await CompanyModel.findByIdAndDelete(_id).exec();
  }
}

export const companiesService = new CompaniesService();
