import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import {
  Collapse,
  IconButton,
  Navbar,
  Typography,
} from "@material-tailwind/react";
import { useMenu } from "../../hooks/MenuHooks/useMenu";
import { NavList } from "../NavList/NavList";
import "./Menu.css";

export function Menu() {
  const { desktopMode, mobileOpen, setMobileOpen } = useMenu();

  return (
    <Navbar
      placeholder={""}
      className="mx-auto  max-w-screen-xl px-4 py-2 border-none z-49"
    >
      <div className="flex items-center justify-between text-black z-49">
        <Typography
          placeholder={""}
          variant="h6"
          className="mr-4 cursor-pointer py-1.5 lg:ml-2 text-black z-49"
        >
          S & C Brands
        </Typography>
        {desktopMode ? (
          <div className="hidden lg:block z-49">
            <NavList desktopMode={desktopMode} />
          </div>
        ) : (
          <IconButton
            placeholder={""}
            variant="text"
            color="black"
            className="lgg:hidden z-49"
            onClick={() => setMobileOpen((open) => !open)}
          >
            {mobileOpen ? (
              <XMarkIcon className="h-6 w-6" strokeWidth={2} />
            ) : (
              <Bars3Icon className="h-6 w-6" strokeWidth={2} />
            )}
          </IconButton>
        )}
      </div>

      {/* Adjusted Collapse logic */}
      {!desktopMode && (
        <Collapse className="z-48" open={mobileOpen}>
          <NavList desktopMode={desktopMode} />
        </Collapse>
      )}
    </Navbar>
  );
}
