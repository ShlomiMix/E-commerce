import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "../../../Redux/Store";

import { peopleAudiencesService } from "../../../Services/PeopleAudiencesService";
import { notify } from "../../../Utils/Notify";
import { AudienceCard } from "../../CardArea/AudienceCard/AudienceCard";
import "./Audiences.css";

export function Audiences(): JSX.Element {
  //   const [audiences, setAudiences] = useState<PeopleAudienceModel[]>([]);

  const dispatch: AppDispatch = useDispatch();

  const audiences = useAppSelector((state) => state?.audiences?.entities);

  useEffect(() => {
    const fetchAudiences = async (): Promise<void> => {
      try {
        await peopleAudiencesService.getAll();
      } catch (err: any) {
        notify.error(err);
      }
    };
    fetchAudiences();
  }, []);
  return (
    <div className="ml-2 flex gap-3 flex-wrap justify-center items-center">
      {audiences?.map((audience) => (
        <AudienceCard audience={audience} key={audience._id} />
      ))}
    </div>
  );
}
