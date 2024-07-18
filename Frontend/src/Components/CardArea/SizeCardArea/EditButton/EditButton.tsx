import { useNavigate } from "react-router-dom";
import "./EditButton.css";

interface EditButtonProps {
  sizeType: string;
  _id:string
}

export function EditButton({sizeType,_id}:EditButtonProps): JSX.Element {
  const navigate = useNavigate();
   
  const navigateToEdit = ():void=> {
    navigate(`/${sizeType}/${_id}`)
  }

  const handleEditClick = ():void=> {
    navigateToEdit()
  }

  return (
    <div className="EditButton">
      <button onClick={handleEditClick} className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong">
        Edit
      </button>
    </div>
  );
}
