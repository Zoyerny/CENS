import Image from "next/image";
import { useState } from "react";
import NavAcountMobile from "./NavAcountMobile";
import Link from "next/link";
import { useRouter } from "next/router";

export default function NavMobile() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <div id="navMobile">
        <Link href={"/"}>
          <Image src="/images/logo.png" width={40} height={40} alt="Logo" />
        </Link>
        <button id="ButtonMobile" onClick={handleToggle}>
          {isOpen ? (
            <Image
              src="/svg/CloseNav.svg"
              width={50}
              height={50}
              alt="Close Nav"
            />
          ) : (
            <Image
              src="/svg/OpenNav.svg"
              width={50}
              height={50}
              alt="Open Nav"
            />
          )}
        </button>
      </div>

      {isOpen && (
        <div id="navModal">
          <ul className="link">
            <li>
              <Link
                className={`navText ${router.pathname === "/" ? "active" : ""}`}
                href={"/"}
                onClick={() => setIsOpen(false)}
              >
                Acceuil
              </Link>
            </li>
            <li>
              <Link
                className={`navText ${
                  router.pathname === "/search" ? "active" : ""
                }`}
                href={"/search"}
                onClick={() => setIsOpen(false)}
              >
                Search
              </Link>
            </li>
            <li>
              <Link
                className={`navText ${
                  router.pathname === "/articles" ? "active" : ""
                }`}
                href={"/articles"}
                onClick={() => setIsOpen(false)}
              >
                Articles
              </Link>
            </li>
          </ul>
          <NavAcountMobile setIsOpen={setIsOpen} />
        </div>
      )}
    </>
  );
}
