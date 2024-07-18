import { useCallback, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import { ProductModel } from "../../../Models/ProductModel";
import { setProducts } from "../../../Redux/ProductsSlice";
import { AppDispatch, useAppSelector } from "../../../Redux/Store";
import { productsService } from "../../../Services/ProductsService";
import { notify } from "../../../Utils/Notify";
import { ProductCard } from "../../CardArea/ProductCard/ProductCard";
import { Loader } from "../../Loader/Loader";
import { SideBar } from "../../SideBarArea/SideBar/SideBar";
import "./Products.css";


export function Products(): JSX.Element {
  const [totalRows, setTotalRows] = useState<number>(0);
  //   const [loading, setIsLoading] = useState<boolean>(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 700);
  const handleResize = () => {
    setIsMobile(window.innerWidth <= 700);
  };

  const valueText = (value: number): string => {
    return `${value}$`;
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const productsState = useAppSelector((state) => state.products);
  const dispatch: AppDispatch = useDispatch();

  const methods = useForm<ProductModel>();

  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const name = searchParams.get("name");
  const audienceId = searchParams.get("audienceId");
  const categoryId = searchParams.get("categoryId");
  const subCategoryId = searchParams.get("subCategoryId");
  const companyId = searchParams.get("companyId");

  const [colors, setColors] = useState<string[]>(() =>
    searchParams.getAll("color")
  );
  const [sizes, setSizes] = useState<string[]>(() =>
    searchParams.getAll("size")
  );
  const [priceRange, setPriceRange] = useState<number[]>([1, 1000]);

  useEffect(() => {
    setColors(searchParams.getAll("color"));
    setSizes(searchParams.getAll("size"));
  }, [searchParams]);

  const updateColorsSearchParams = useCallback(
    (newColors: string[]) => {
      const params = new URLSearchParams(searchParams);
      params.delete("color");
      newColors.forEach((color) => params.append("color", color));
      setSearchParams(params);
      navigate(`?${params.toString()}`, { replace: true });
    },
    [searchParams, setSearchParams, navigate]
  );

  const updateSizesSearchParams = useCallback(
    (newSizes: string[]) => {
      const params = new URLSearchParams(searchParams);
      params.delete("size");
      newSizes.forEach((size) => params.append("size", size));
      setSearchParams(params);
      navigate(`?${params.toString()}`, { replace: true });
    },
    [searchParams, setSearchParams, navigate]
  );

  const handlePriceChange = useCallback((priceRange: number[]) => {
    setPriceRange(priceRange);
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await productsService.getAllProductsByQueryFilter({
          name: name,
          audienceId: audienceId || undefined,
          categoryId: categoryId || undefined,
          subCategoryId: subCategoryId || undefined,
          companyId: companyId || undefined,
          colors: colors.length > 0 ? colors : undefined,
          sizes: sizes.length > 0 ? sizes : undefined,
          price: priceRange,
        });
      } catch (err: any) {
        notify.error(err);
      }
    };

    fetchProducts();
  }, [name, audienceId, categoryId, subCategoryId, colors, sizes, priceRange]);

  if (productsState.loading) {
    return (
      <div className="flex h-96 justify-center items-center">
        <Loader />
      </div>
    );
  }

  console.log("products", productsState);
  return (
    <div className="product-filter-container relative">
      <div className="fixed">
        <nav className="nav-container bg-none absolute top-28 w-0">
          <FormProvider {...methods}>
            <SideBar
              valueText={valueText}
              onColorsChange={updateColorsSearchParams}
              onPriceChange={handlePriceChange}
              onSizesChange={updateSizesSearchParams}
            />
          </FormProvider>
        </nav>
      </div>

      <main className="main-container">
        {productsState.totalRows === 0 && (
          <div className="flex justify-center xs:h-4/6 xxs:h-4/6 md:h-96 lg:justify-center md:justify-end md:mr-6">
            <div className=" border-4 border-dashed  bg-slate-950 bg-opacity-20  gap-y-3 border-slate-950  rounded-xl xs:h-52 xs:w-52 xxs:h-52 xxs:w-52 md:h-60 md:w-96 flex flex-col items-center justify-center">
              <p className="text-black text-lg">No results...</p>
              <button className="bg-amber-400 p-2 rounded-xl border-2 transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110  duration-300  border-rose-50 hover:bg-purple-400 text-slate-50">
                <NavLink to={"/products"}>Go to products</NavLink>
              </button>
            </div>
          </div>
        )}
        <div
          className={`product-list mt-5  ${
            isMobile
              ? "flex flex-col mb-80 items-end xxs:gap-y-10  xxs:mr-1 xs:ml-3 xs:mr-3"
              : "flex  flex-col lgg:flex-row justify-start lggg:gap-x-10 lggg:justify-start lgg:gap-x-18 lgg:mb-4 md:mb-4 lgg:flex-wrap lgg:gap-x-5 gap-y-10 items-center ml-52"
          } `}
        >
          {Object?.values(productsState?.products).flatMap((productArray) =>
            productArray?.map((product) => (
              <ProductCard product={product} key={product._id} />
            ))
          )}
        </div>
      </main>
    </div>
  );
}
