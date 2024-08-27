import { useState, useEffect } from "react";

export const IsDesktop = () => {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 760);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 760);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return isDesktop;
};

export const IsMobile = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 550);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 550);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return isMobile;
};
