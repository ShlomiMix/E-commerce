import { List, ListItem } from "@material-tailwind/react";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { NavLink } from "react-router-dom";
import { Cart } from "../../CartArea/Cart/Cart";
import { useNavList } from "../../hooks/NavListHooks/useNavList";
import { NavListMenu } from "../NavListMenu/NavListMenu";

interface Props {
  desktopMode: boolean;
}

export function NavList({ desktopMode }: Props) {
  const { isCartOpen, toggleCart, totalItemsInCart, setIsCartOpen } =
    useNavList();
  return (
    <>
      <List
        className="mt-4 mb-6 p-0 lg:mt-0 lg:mb-0 lgg:flex-row lg-1000:flex-col lg:p-1 z-49"
        placeholder={""}
      >
        <NavLink to={"/home"}>
          <ListItem
            className="flex items-center gap-2 py-2 pr-4 z-49 text-slate-950"
            placeholder={undefined}
          >
            Home
          </ListItem>
        </NavLink>
        <NavListMenu desktopMode={desktopMode} />
        <NavLink to={"contact-us"}>
          <ListItem
            className="flex items-center gap-2 py-2 w-32 pr-4 z-49 text-slate-950"
            placeholder={undefined}
          >
            Contact us
          </ListItem>
        </NavLink>
        <ListItem
          className="flex items-start relative justify-center gap-2 py-2 pr-4 z-49 text-slate-950 xs:justify-start xxs:justify-start"
          placeholder={undefined}
          onClick={toggleCart}
        >
          <HiOutlineShoppingBag size={"25px"} color="disabled" />
          <span className="absolute right-0 xxs:left-8 xs:justify-start flex justify-start  items-center h-6 w-6 text-xs p-2 px-2 -top-0 text-slate-200 border-2 rounded-full z-49 bg-red-600">
            {totalItemsInCart > 9 ? "9+" : totalItemsInCart}
          </span>
        </ListItem>
      </List>
      <Cart open={isCartOpen} setOpen={() => setIsCartOpen(!isCartOpen)} />
    </>
  );
}
