import { ChevronDownIcon } from "@heroicons/react/24/outline";
import {
  Collapse,
  ListItem,
  Menu,
  MenuHandler,
  MenuList,
  Typography,
} from "@material-tailwind/react";
import { FaUserCircle } from "react-icons/fa";
import { RenderUserOptions } from "./RenderUserOptions";

interface UserMenuProps {
  isUserMenuOpen: boolean;
  setIsUserMenuOpen: (isUserMenuOpen: boolean) => void;
  desktopMode: boolean;
  firstName: string;
  lastName: string;
  userId: string;
  handleSignIn: () => void;
  handleSignOut: () => void;
}

export function UserMenu({
  isUserMenuOpen,
  setIsUserMenuOpen,
  handleSignIn,
  handleSignOut,
  desktopMode,
  firstName,
  lastName,
  userId,
}: UserMenuProps): JSX.Element {
  return (
    <>
      <Menu offset={{ mainAxis: 20 }} placement="top-start">
        <MenuHandler style={{ zIndex: 40 }}>
          <Typography
            placeholder={""}
            as="div"
            variant="small"
            className="font-medium z-50"
          >
            <ListItem
              placeholder={""}
              className="flex items-center gap-2 py-2 pr-4 font-medium text-black z-50"
              selected={isUserMenuOpen}
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)} // Toggle the user menu open or closed
            >
              <FaUserCircle fontSize={"large"} />
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`h-3 w-3 transition-transform z-50 ${
                  isUserMenuOpen ? "rotate-180" : ""
                }`}
              />
            </ListItem>
          </Typography>
        </MenuHandler>
        {desktopMode && (
          <MenuList
            placeholder={""}
            className="max-w-screen-xl rounded-xl lg:block"
          >
            <ul className="grid grid-cols-1 gap-y-2 outline-none outline-0 z-50">
              <RenderUserOptions
                firstName={firstName}
                lastName={lastName}
                userId={!!userId}
                handleSignIn={handleSignIn}
                handleSignOut={handleSignOut}
              />
            </ul>
          </MenuList>
        )}
        {!desktopMode && (
          <div className="block lgg:hidden overflow-auto max-h-52 z-50">
            <Collapse open={isUserMenuOpen}>
              <RenderUserOptions
                firstName={firstName}
                lastName={lastName}
                userId={!!userId}
                handleSignIn={handleSignIn}
                handleSignOut={handleSignOut}
              />
            </Collapse>
          </div>
        )}
      </Menu>
    </>
  );
}
