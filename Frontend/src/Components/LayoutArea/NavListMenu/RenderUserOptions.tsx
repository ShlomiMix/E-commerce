import { MenuItem, Typography } from "@material-tailwind/react";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "../../../Redux/Store";

interface RenderUserOptionsProp {
  userId: boolean;
  handleSignIn: () => void;
  handleSignOut: () => void;
  firstName: string;
  lastName: string;
}

export function RenderUserOptions({
  userId,
  handleSignIn,
  handleSignOut,
  firstName,
  lastName,
}: RenderUserOptionsProp): JSX.Element {
  const ordersByUserId = useAppSelector((state) => state?.auth?._id);
  return (
    <>
      <div>
        <MenuItem
          className="flex items-start gap-3 rounded-lg z-49"
          placeholder={undefined}
        >
          <div>
            {userId ? (
              <div>
                <Typography
                  variant="h6"
                  color="black"
                  className="flex items-center text-sm font-bold z-49"
                  placeholder={undefined}
                >
                  {firstName} {lastName}
                </Typography>

                <Typography
                  variant="h6"
                  color="black"
                  className="flex items-center text-sm font-bold z-49"
                  placeholder={undefined}
                >
                  <NavLink to={`orders/${ordersByUserId}`}>Orders</NavLink>
                </Typography>

                <Typography
                  variant="h6"
                  color="black"
                  className="flex items-center text-sm font-bold z-49"
                  placeholder={undefined}
                  onClick={handleSignOut}
                >
                  <div>Sign out</div>
                </Typography>
              </div>
            ) : (
              <Typography
                variant="h6"
                color="black"
                className="flex items-center text-sm font-bold z-49"
                placeholder={undefined}
                onClick={handleSignIn}
              >
                Sign in
              </Typography>
            )}
          </div>
        </MenuItem>
      </div>
    </>
  );
}
