import "./ProductCard.css";
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Typography,
} from "@material-tailwind/react";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { NavLink } from "react-router-dom";
import { ProductModel } from "../../../Models/ProductModel";
import { useProductCard } from "../../hooks/ProductCardHooks/useProductCard";
import { EditButton } from "../CardButtons/EditButton/EditButton";

interface ProductProps {
  product: ProductModel;
}

export function ProductCard({ product }: ProductProps): JSX.Element {
  const { getAllColorsWithSet, getAllSizesWithSet } = useProductCard({
    product,
  });

  return (
    <Card
      placeholder={""}
      className="h-6/6 flex h-full w-96 shadow-lg relative md:w-96 xxs:w-72"
    >
      <NavLink to={`/edit-product/${product._id}`}>
        <EditButton />
      </NavLink>
      <CardHeader
        placeholder={""}
        floated={false}
        className="xs:h-72 sm:h-72 md:h-72 lg:h-72 xxs:h-72"
        color="orange"
      >
        <Carousel>
          {product.imagesUrl.map((imageUrl, index) => {
            return (
              <img
                key={index}
                src={imageUrl}
                alt={`image ${index}`}
                className="h-full w-full object-cover bg-center md:h-72 lg:h-72 md:w-full xxs:h-72 xs:h-72 lg:w-full xl:w-full"
              />
            );
          })}
        </Carousel>

        {/* <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60 " /> */}
      </CardHeader>
      <CardBody placeholder={""} className="h-56 flex flex-col">
        <div className="xs:size-6 md:size-6 lg:size-6 h-10 w-full flex flex-row flex-wrap">
          <Typography
            as={"div"}
            placeholder={""}
            variant="paragraph"
            color="blue-gray"
            className="font-medium flex xs:text-xs xxs:text-xs md:text-lg"
          >
            {product?.audience?.name} <DoubleArrowIcon />{" "}
            {product?.category?.name} <DoubleArrowIcon />{" "}
            {product?.subCategory?.name} <DoubleArrowIcon />{" "}
            {product?.company?.name}
          </Typography>
        </div>
        <div className="mt-10  justify-start">
          <Typography
            className="flex justify-start xxs:flex-col "
            placeholder={""}
            color="gray"
          >
            {product?.name}
          </Typography>

          <div className="flex flex-row justify-start">
            <Typography placeholder={""} color="gray">
              Sizes: &nbsp;
            </Typography>
            {getAllSizesWithSet().map((size, index) => (
              <Typography
                key={index} // Using index as the key since it's within a nested map
                as={"span"}
                placeholder={""}
                color="black"
              >
                {size?.size?.name}, &nbsp;
              </Typography>
            ))}
          </div>

          <div className="flex flex-row">
            <Typography placeholder={""} color="gray">
              Colors: &nbsp;
            </Typography>
            {getAllColorsWithSet().map((color, index) => (
              <Typography
                key={index} // Using index as the key since it's within a nested map
                as={"span"}
                placeholder={""}
                color="black"
              >
                <div
                  style={{
                    backgroundColor: color?.color?.hexCode,
                    color: color?.color?.hexCode,
                    height: "20px",
                    width: "20px",
                    borderRadius: "50%",
                    border: "1px solid black",
                    display: "inline-block",
                    lineHeight: 20,
                  }}
                ></div>{" "}
                &nbsp;
              </Typography>
            ))}
          </div>
        </div>
      </CardBody>
      <CardFooter placeholder={""} className="pt-3">
        <NavLink to={`/products/product-details/${product._id}`}>
          <Button
            type="button"
            placeholder={""}
            className="bg-gray-500"
            size="lg"
            fullWidth={true}
          >
            Details
          </Button>
        </NavLink>
      </CardFooter>
    </Card>
  );
}
