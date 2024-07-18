import { useEffect, useState } from "react";

export const useMenu = () => {
  const [desktopMode, setDesktopMode] = useState(window.innerWidth >= 1100);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const resizeListener = () => {
      setDesktopMode(window.innerWidth >= 1100);
    };

    window.addEventListener("resize", resizeListener);

    return () => {
      window.removeEventListener("resize", resizeListener);
    };
  }, [desktopMode]);

  return {
    desktopMode,
    mobileOpen,
    setMobileOpen,
  };
};
