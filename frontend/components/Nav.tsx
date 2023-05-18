import { useEffect, useState } from "react";
import NavDesktop from "./nav/NavDesktop";
import NavMobile from "./nav/NavMobile";

export default function Nav() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(document.documentElement.clientWidth < 992);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {isMobile ? (
        <nav>
          <NavMobile />
        </nav>
      ) : (
        <nav>
          <NavDesktop />
        </nav>
      )}
    </>
  );
}
