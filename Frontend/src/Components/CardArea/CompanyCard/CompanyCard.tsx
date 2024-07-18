import { useNavigate } from "react-router-dom";
import { CompanyModel } from "../../../Models/CompanyModel";
import "./CompanyCard.css";
import { notify } from "../../../Utils/Notify";
import { companiesService } from "../../../Services/CompaniesService";


// import { companiesService } from "../../../Services/CompaniesService";

interface CompanyCardProps {
  company: CompanyModel;
}

export function CompanyCard({ company }: CompanyCardProps): JSX.Element {
  const navigate = useNavigate();

  const handleNavigate = (companyId: string): void => {
    navigate(`/edit-company/${companyId}`);
  };

  const handleEditClick = (): void => {
    handleNavigate(company?._id);
  };

  const handleDelete = async (_id: string): Promise<void> => {
    try {
      const sure = window.confirm("Are you sure?");
      if (!sure) {
        return;
      }
      await companiesService.deleteOne(_id);
    } catch (err: any) {
      notify.error(err);
    }
  };

  const handleDeleteClick = async (): Promise<void> => {
    await handleDelete(company?._id);
  };

  return (
    <div className="block border-double  w-72 border-8 border-black rounded-xl bg-white shadow-secondary-1 dark:bg-surface-dark">
      <div className="p-6 text-surface dark:text-white flex flex-col justify-end h-32 flex-wrap">
        <h5 className="mb-2 text-xl font-medium leading-tight">
          {company?.name}
        </h5>
        <div className="flex gap-x-10">
          <button
            type="button"
            className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
            data-twe-ripple-init
            data-twe-ripple-color="light"
            onClick={handleEditClick}
          >
            Edit
          </button>
          <button
            type="button"
            className="inline-block rounded bg-yellow-400 text-slate-950 transition-opacity opacity-80 hover:text-slate-50 hover:opacity-100 hover:bg-red-600 hover:scale-110 px-6 pb-2 pt-2.5 text-xs font-medium  leading-normal  shadow-primary-3 duration-1000 ease-linear hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
            data-twe-ripple-init
            data-twe-ripple-color="light"
            onClick={handleDeleteClick}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
