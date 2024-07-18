import { notify } from "../../../../Utils/Notify";
import "./DeleteButton.css";

interface DeleteButtonProps {
  fnQuery: (_id: string) => Promise<void>;
  name: string;
  className: string;
  _id:string
}

export function DeleteButton({
  fnQuery,
  name,
  className,
  _id
}: DeleteButtonProps): JSX.Element {
  const deleteMe = async (_id: string): Promise<void> => {
    try {
      const sure = window.confirm("Are you sure?");
      if (!sure) {
        return;
      }
      await fnQuery(_id);
      notify.success(`${name} has been deleted`);
    } catch (err: any) {
      notify.error(err);
    }
  };
  return (
    <button onClick={() => deleteMe(_id)} className={className}>
      Delete
    </button>
  );
}
