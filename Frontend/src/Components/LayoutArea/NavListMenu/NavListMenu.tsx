import { useAppSelector } from "../../../Redux/Store";
import { useNavListMenu } from "../../hooks/NavListMenuHooks/useNavListMenu";
import { AdminPagesMenu } from "./AdminPagesMenu";
import { AudiencesMenu } from "./AudiencesMenu";
import { UserMenu } from "./UserMenu";

interface Props {
  desktopMode: boolean;
}

export function NavListMenu({ desktopMode }: Props): JSX.Element {
  const {
    audiences,
    categories,
    firstName,
    isMenuOpen,
    isMobileMenuOpen,
    isPagesOptionsOpen,
    isUserMenuOpen,
    lastName,
    userId,
    setIsMenuOpen,
    setIsMobileMenuOpen,
    setIsPagesOptionsOpen,
    setIsUserMenuOpen,
    handleSignIn,
    handleSignOut,
    getProductByCategoryId,
    getProductsBySubCategory,
  } = useNavListMenu();

  const admin = useAppSelector((state) => state?.auth?.roleId === 1);

  return (
    <>
      
      <AudiencesMenu
        audiences={audiences}
        categories={categories}
        desktopMode={desktopMode}
        getProductByCategoryId={getProductByCategoryId}
        getProductsBySubCategory={getProductsBySubCategory}
        isMenuOpen={isMenuOpen}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      <UserMenu
        desktopMode={desktopMode}
        firstName={firstName}
        handleSignIn={handleSignIn}
        handleSignOut={handleSignOut}
        isUserMenuOpen={isUserMenuOpen}
        lastName={lastName}
        setIsUserMenuOpen={setIsUserMenuOpen}
        userId={userId}
      />
      {admin && (
        <AdminPagesMenu
          desktopMode={desktopMode}
          isPagesOptionsOpen={isPagesOptionsOpen}
          setIsPagesOptionsOpen={setIsPagesOptionsOpen}
        />
      )}
    </>
  );
}
