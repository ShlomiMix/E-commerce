import { PeopleAudienceModel } from "../Models/PeopleAudienceModel";
import {
  addAudience,
  deleteAudience,
  setAudiences,
  updateAudience,
} from "../Redux/GenericSlice";
import { appConfig } from "../Utils/AppConfig";
import { GenericService } from "./GenericService";

class PeopleAudiencesService extends GenericService<PeopleAudienceModel> {
  public constructor() {
    super(
      new PeopleAudienceModel(),
      appConfig.audiencesUrl,
      "_id",
      setAudiences,
      addAudience,
      updateAudience,
      deleteAudience
    );
  }
}

export const peopleAudiencesService = new PeopleAudiencesService();
