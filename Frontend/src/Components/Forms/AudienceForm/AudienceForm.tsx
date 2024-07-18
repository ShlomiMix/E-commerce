import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { PeopleAudienceModel } from "../../../Models/PeopleAudienceModel";
import { peopleAudiencesService } from "../../../Services/PeopleAudiencesService";
import { StringInput } from "../../FormArea/FormInputs/StringInput/StringInput";
import { GenericForm } from "../../FormArea/GenericForm/GenericForm";
import "./AudienceForm.css";

interface AudienceFormProps {
  sendAudience: (audience: PeopleAudienceModel) => Promise<void>;
  buttonName: string;
  header: string;
}

export function AudienceForm({
  sendAudience,
  buttonName,
  header,
}: AudienceFormProps): JSX.Element {
  const { register, handleSubmit, setValue } = useForm<PeopleAudienceModel>();
  const { _id } = useParams();
  const navigate = useNavigate();

  const fetchAudienceById = async (): Promise<void> => {
    if (_id) {
      const audience = await peopleAudiencesService.getOne(_id);
      console.log(audience);

      if (audience) {
        setValue("name", audience?.name);
      }
    }
  };

  useEffect(() => {
    fetchAudienceById();
  }, [_id, setValue]);

  return (
    <div className="AudienceForm">
      <GenericForm
        buttonName={buttonName}
        header={header}
        submit={handleSubmit(sendAudience)}
        inputs={[
          <StringInput<PeopleAudienceModel>
            label="Name"
            minLength={2}
            maxLength={20}
            name="name"
            register={register}
            registerName="name"
            type="string"
          />,
        ]}
      />
    </div>
  );
}
