import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch, useAppSelector } from "../../../Redux/Store";
import { authService } from "../../../Services/AuthService";
import { categoriesService } from "../../../Services/CategoriesService";

import { peopleAudiencesService } from "../../../Services/PeopleAudiencesService";
import { notify } from "../../../Utils/Notify";

export const useNavListMenu = () => {
  const dispatch: AppDispatch = useDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState<string | null | boolean>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<
    string | null | boolean
  >(null);
  //   const [audiences, setAudiences] = useState<PeopleAudienceModel[]>([]);
  //   const [categories, setCategories] = useState<CategoryModel[]>([]);
  const [isPagesOptionsOpen, setIsPagesOptionsOpen] = useState<boolean>(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState<boolean>(false);
  const userId = useAppSelector((state) => state?.auth?._id);
  const firstName = useAppSelector((state) => state?.auth?.firstName);
  const lastName = useAppSelector((state) => state?.auth?.lastName);
  const audiences = useAppSelector((state) => state.audiences.entities);
  const categories = useAppSelector((state) => state.categories.entities);

  const navigate = useNavigate();

  async function getProductByCategoryId(
    audienceId: string,
    categoryId: string
  ): Promise<void> {
    try {
      console.log("CategoryId", categoryId);

      if (!audienceId || !categoryId) {
        return;
      }
      navigate(`/products?audienceId=${audienceId}&categoryId=${categoryId}`);
    } catch (err: any) {
      notify.error(err);
    }
  }

  async function getProductsBySubCategory(
    audienceId: string,
    categoryId: string,
    subCategoryId?: string
  ): Promise<void> {
    try {
      let url = `/products?audienceId=${audienceId}&categoryId=${categoryId}`;
      if (subCategoryId) {
        url += `&subCategoryId=${subCategoryId}`;
      }
      navigate(url);
    } catch (err: any) {
      notify.error(err);
    }
  }
  useEffect(() => {
    const fetchAudiences = async () => {
      try {
        await peopleAudiencesService.getAll();
      } catch (err: any) {
        notify.error(err.message);
      }
    };

    fetchAudiences();
  }, []);

  useEffect(() => {
    const fetchCategories = async (): Promise<void> => {
      try {
        await categoriesService.getAll();
      } catch (err: any) {
        notify.error(err);
      }
    };
    fetchCategories();
  }, []);

  const handleSignIn = () => {
    navigate("/login");
  };

  const handleSignOut = (): void => {
    authService.logOut();
    notify.success("Signed out successfully");
    navigate("/home");
  };

  return {
    isMenuOpen,
    isMobileMenuOpen,
    isPagesOptionsOpen,
    isUserMenuOpen,
    audiences,
    categories,
    firstName,
    lastName,
    userId,
    setIsMenuOpen,
    setIsMobileMenuOpen,
    setIsPagesOptionsOpen,
    setIsUserMenuOpen,
    getProductByCategoryId,
    getProductsBySubCategory,
    handleSignIn,
    handleSignOut,
  };
};
