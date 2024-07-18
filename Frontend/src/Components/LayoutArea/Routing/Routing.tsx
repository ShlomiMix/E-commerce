import { Navigate, Route, Routes } from "react-router-dom";
import { AddCategory } from "../../Pages/AddCategory/AddCategory";
import { AddProduct } from "../../Pages/AddProduct/AddProduct";
import { Categories } from "../../Pages/Categories/Categories";
import { ContactUs } from "../../Pages/ContactUs/ContactUs";
import { EditProduct } from "../../Pages/EditProduct/EditProduct";
import { Home } from "../../Pages/Home/Home";
import { ProductDetails } from "../../Pages/ProductDetails/ProductDetails";
import { Products } from "../../Pages/Products/Products";
import { useAppSelector } from "../../../Redux/Store";
import { AddAudience } from "../../Pages/AddAudience/AddAudience";
import { AddSize } from "../../Pages/AddSize/AddSize";
import { Audiences } from "../../Pages/Audiences/Audiences";
import { EditAudience } from "../../Pages/EditAudience/EditAudience";
import { EditCategory } from "../../Pages/EditCategory/EditCategory";
import { EditSize } from "../../Pages/EditSize/EditSize";
import { Login } from "../../Pages/Login/Login";
import { Orders } from "../../Pages/Orders/Orders";
import { PaymentCheckout } from "../../Pages/PaymentCheckout/PaymentCheckout";
import { Register } from "../../Pages/Register/Register";
import { Sizes } from "../../Pages/SizesArea/Sizes/Sizes";
import Page404 from "../page404/page404";
import "./Routing.css";
import { Colors } from "../../Pages/Colors/Colors";
import { AddColor } from "../../Pages/AddColor/AddColor";
import { EditColor } from "../../Pages/EditColor/EditColor";
import { Companies } from "../../Pages/Companies/Companies";
import { AddCompany } from "../../Pages/AddCompany/AddCompany";
import { EditCompany } from "../../Pages/EditCompany/EditCompany";

function Routing(): JSX.Element {
  const isAdmin = useAppSelector((state) => state?.auth?.roleId === 1);
  const userId = useAppSelector((state) => state?.auth?._id);

  const adminRoutes = [
    { path: "/products", element: <Products /> },
    { path: "/edit-product/:_id", element: <EditProduct /> },
    { path: "/add-product", element: <AddProduct /> },
    { path: "/products/product-details/:_id", element: <ProductDetails /> },
    { path: "/audiences", element: <Audiences /> },
    { path: "/add-audience", element: <AddAudience /> },
    { path: "/edit-audience/:_id", element: <EditAudience /> },

    { path: "/companies", element: <Companies /> },
    { path: "/add-company", element: <AddCompany /> },
    { path: "/edit-company/:_id", element: <EditCompany /> },

    { path: "/categories", element: <Categories /> },
    { path: "/add-category", element: <AddCategory /> },
    { path: "/edit-category/:_id", element: <EditCategory /> },
    { path: "/colors", element: <Colors /> },
    { path: "/add-color", element: <AddColor /> },
    { path: "/edit-color/:_id", element: <EditColor /> },
    { path: "/sizes", element: <Sizes /> },
    { path: "/:sizeType/add-size", element: <AddSize /> },
    { path: "/:sizeType/:_id", element: <EditSize /> },
    userId
      ? { path: "/orders/:userId", element: <Orders /> }
      : { path: "*", element: <Page404 /> },
  ];

  const userRoutes = [
    { path: "/home", element: <Home /> },
    { path: "/", element: <Navigate to={"/home"} /> },
    { path: "*", element: <Page404 /> },
    { path: "/products", element: <Products /> },
    { path: "/products/products-details/:_id", element: <ProductDetails /> },
    userId
      ? { path: "/orders/:userId", element: <Orders /> }
      : { path: "*", element: <Page404 /> },
    { path: "/payment-checkout", element: <PaymentCheckout /> },
    { path: "/contact-us", element: <ContactUs /> },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
  ];

  return (
    <div className="Routing">
      <Routes>
        {userRoutes?.map((route, index) => (
          <Route key={index} path={route?.path} element={route.element} />
        ))}

        {adminRoutes?.map((route, index) => (
          <Route
            key={index}
            path={route?.path}
            element={isAdmin ? route?.element : <Page404 />}
          />
        ))}
      </Routes>
    </div>
  );
}

export default Routing;
