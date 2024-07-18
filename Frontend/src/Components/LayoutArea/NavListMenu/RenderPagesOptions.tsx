import { MenuItem, Typography } from "@material-tailwind/react";
import { NavLink } from "react-router-dom";

export function RenderPagesOptions(): JSX.Element {
  const renderPagesOptionsArr = [
    { navTo: "/add-product", label: "Add product" },
    { navTo: "/audiences", label: "Audiences" },
    { navTo: "/add-audience", label: "Add audience" },
    { navTo: "/companies", label: "Companies" },
    { navTo: "/add-company", label: "Add company" },
    { navTo: "/categories", label: "Categories" },
    { navTo: "/add-category", label: "Add category" },
    { navTo: "/colors", label: "Colors" },
    { navTo: "/add-color", label: "Add color" },
    { navTo: "/sizes", label: "Sizes" },
  ];

  return (
    <>
      <div>
        <MenuItem
          className="flex flex-wrap w-28 items-start gap-3 rounded-lg z-49"
          placeholder={undefined}
        >
          {renderPagesOptionsArr.map((option, index) => (
            <div key={index}>
              <Typography
                variant="h6"
                color="black"
                className="flex items-center text-sm font-bold z-49"
                placeholder={undefined}
              >
                <NavLink to={option?.navTo}>{option?.label}</NavLink>
              </Typography>
            </div>
          ))}
        </MenuItem>
      </div>
    </>
  );
}
