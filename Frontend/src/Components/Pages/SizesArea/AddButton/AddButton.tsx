import { useNavigate } from "react-router-dom";
import "./AddButton.css";

interface AddButtonProps {
  buttonName: string;
  sizeType: string;
}

export function AddButton({
  buttonName,
  sizeType,
}: AddButtonProps): JSX.Element {
  const navigate = useNavigate();

  const handleNavigateToAdd = (): void => {
    navigate(`/${sizeType}/add-size`);
  };

  const handleAddButton = ():void => {
    handleNavigateToAdd();
  };
  return (
    <button
      className="ml-20 border-2 border-black text-slate-100 bg-gray-400 p-1 rounded-xl"
      onClick={handleAddButton}
    >
      Add {buttonName}
    </button>
  );
}
