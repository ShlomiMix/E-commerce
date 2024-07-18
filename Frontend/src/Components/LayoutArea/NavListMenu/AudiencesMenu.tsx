import { ChevronDownIcon } from "@heroicons/react/24/outline";
import {
  Collapse,
  ListItem,
  Menu,
  MenuHandler,
  MenuList,
  Typography,
} from "@material-tailwind/react";
import { RenderItems } from "./RenderItems";
import { PeopleAudienceModel } from "../../../Models/PeopleAudienceModel";
import { CategoryModel } from "../../../Models/CategoryModel";

interface AudiencesMenuProps {
  audiences: PeopleAudienceModel[];
  isMenuOpen: boolean | string;
  isMobileMenuOpen: boolean  | string;
  setIsMenuOpen: (isThisMenuOpen: string) => void;
  setIsMobileMenuOpen: (isThisMobileMenuOpen: string) => void;
  desktopMode: boolean;
  categories: CategoryModel[];
  getProductByCategoryId: (audienceId: string, categoryId:string) => void;
  getProductsBySubCategory: (audienceId: string, categoryId:string, subCategoryId:string) => void;
}

export function AudiencesMenu({
  audiences,
  isMenuOpen,
  isMobileMenuOpen,
  getProductByCategoryId,
  getProductsBySubCategory,
  setIsMenuOpen,
  setIsMobileMenuOpen,
  desktopMode,
  categories,
}: AudiencesMenuProps): JSX.Element {
  return (
    <>
      {audiences?.map((audience) => {
        const isThisMenuOpen = isMenuOpen === audience._id; // Determine if this menu should be open
        const isThisMobileMenuOpen = isMobileMenuOpen === audience._id;
        return (
          <Menu
            key={audience._id}
            offset={{ mainAxis: 20 }}
            placement="top-start"
          >
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
                  selected={!!isMenuOpen || isThisMobileMenuOpen}
                  onClick={() => {
                    setIsMenuOpen(isThisMenuOpen ? null : audience._id); // Toggle the specific menu open or closed
                    setIsMobileMenuOpen(
                      isThisMobileMenuOpen ? null : audience._id
                    );
                  }}
                >
                  {audience.name}

                  <ChevronDownIcon
                    strokeWidth={2.5}
                    className={`hidden h-3 w-3 transition-transform lg:block z-50 ${
                      isMenuOpen ? "rotate-180" : ""
                    }`}
                  />
                  <ChevronDownIcon
                    strokeWidth={2.5}
                    className={`block h-3 w-3 transition-transform lg:hidden z-50 
                      ${isMobileMenuOpen ? "rotate-180" : ""}`}
                  />
                </ListItem>
              </Typography>
            </MenuHandler>
            {desktopMode && (
              <MenuList
                placeholder={""}
                className="max-w-screen-xl rounded-xl lg:block"
              >
                <ul className="grid grid-cols-3 gap-y-2 outline-none outline-0  z-50">
                  <RenderItems
                    audienceId={audience._id}
                    categories={categories}
                    getProductByCategoryId={getProductByCategoryId}
                    getProductsBySubCategory={getProductsBySubCategory}
                  />
                </ul>
              </MenuList>
            )}
            {!desktopMode && (
              <div className="block lgg:hidden overflow-auto max-h-52 z-50">
                <Collapse open={isThisMobileMenuOpen}>
                  <RenderItems
                    audienceId={audience._id}
                    categories={categories}
                    getProductByCategoryId={getProductByCategoryId}
                    getProductsBySubCategory={getProductsBySubCategory}
                  />
                </Collapse>
              </div>
            )}
          </Menu>
        );
      })}
    </>
  );
}
