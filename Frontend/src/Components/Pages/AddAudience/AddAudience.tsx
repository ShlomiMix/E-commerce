import { FormProvider, useFormContext } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { PeopleAudienceModel } from "../../../Models/PeopleAudienceModel";
import { peopleAudiencesService } from "../../../Services/PeopleAudiencesService";
import { notify } from "../../../Utils/Notify";
import { AudienceForm } from "../../Forms/AudienceForm/AudienceForm";
import "./AddAudience.css";

export function AddAudience(): JSX.Element {
  const methods = useFormContext<PeopleAudienceModel>();

  const navigate = useNavigate();
  const addAudience = async (audience: PeopleAudienceModel): Promise<void> => {
    try {
      await peopleAudiencesService.addOne(audience);
      notify.success("Audience has been added");
      navigate("/audiences")
    } catch (err: any) {
      notify.error(err);
    }
  };

  return (
    <div className="AddAudience">
      <FormProvider {...methods}>
        <AudienceForm buttonName="Add" header="Add audience"  sendAudience={addAudience} />
      </FormProvider>
    </div>
  );
}
