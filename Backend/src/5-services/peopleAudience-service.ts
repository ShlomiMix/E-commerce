import {
    ResourceNotFoundError,
    ValidationError,
} from "../3-models/client-errors";
import {
    IPeopleAudienceModel,
    PeopleAudienceModel,
} from "../3-models/peopleAudience-model";
import {
    IClothModel,
    IShoeModel
} from "../3-models/product-model";



interface Products {
  page?: number;
}

interface ProductCollections {
  clothes: IClothModel[];
  shoes: IShoeModel[];
  sumTotalRows:number
}

class PeopleAudienceService {
  private populateFields(): string[] {
    return [
      "category",
      "company",
      "sizes",
      "audience",
      "colorIds",
      "subCategory",
    ];
  }
  public async getAllPeopleAudience(): Promise<IPeopleAudienceModel[]> {
    const audience = await PeopleAudienceModel.find().exec();
    return audience;
  }


  public getOneAudience(_id: string): Promise<IPeopleAudienceModel> {
    return PeopleAudienceModel.findById(_id).exec();
  }

  public async addAudience(
    audience: IPeopleAudienceModel
  ): Promise<IPeopleAudienceModel> {
    const errors = audience.validateSync();
    if (errors) {
      throw new ValidationError(errors.message);
    }

    return audience.save();
  }

  public async updateAudience(
    audience: IPeopleAudienceModel
  ): Promise<IPeopleAudienceModel> {
    const errors = audience.validateSync();
    if (errors) {
      throw new ValidationError(errors.message);
    }
    const updatedAudience = PeopleAudienceModel.findByIdAndUpdate(
      audience._id,
      audience,
      { new: true }
    );
    if (!updatedAudience) {
      throw new ResourceNotFoundError(audience._id);
    }
    return updatedAudience;
  }

  public async deleteAudience(_id: string): Promise<void> {
    const audienceToDelete = await PeopleAudienceModel.findById(_id);
    if (!audienceToDelete) {
      throw new ResourceNotFoundError(_id);
    }
    await PeopleAudienceModel.findByIdAndDelete(_id).exec();
  }
}

export const peopleAudienceService = new PeopleAudienceService();
