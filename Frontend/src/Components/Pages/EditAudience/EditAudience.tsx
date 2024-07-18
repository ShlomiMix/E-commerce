import { FormProvider, useFormContext } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { PeopleAudienceModel } from "../../../Models/PeopleAudienceModel";
import { peopleAudiencesService } from "../../../Services/PeopleAudiencesService";
import { notify } from "../../../Utils/Notify";
import { AudienceForm } from "../../Forms/AudienceForm/AudienceForm";
import "./EditAudience.css";

export function EditAudience(): JSX.Element {
  const navigate = useNavigate();
  const methods = useFormContext<PeopleAudienceModel>();

  const { _id } = useParams();

  const editAudience = async (audience: PeopleAudienceModel): Promise<void> => {
    try {
      audience._id = _id;
      await peopleAudiencesService.updateOne(audience);
      notify.success("Audience has been updated");
      navigate("/audiences");
    } catch (err: any) {
      notify.error(err);
    }
  };

  return (
    <div className="EditAudience">
      <FormProvider {...methods}>
        <AudienceForm
          buttonName="Save"
          header="Edit audience"
          sendAudience={editAudience}
        />
      </FormProvider>
    </div>
  );
}
