import Link from "next/link";
import Image from "next/image";
import NavAcountPc from "./NavAcountPc";
import { useRouter } from "next/router";

export interface User {
  id: string;
  username: string;
}

export default function NavDesktop() {
  const router = useRouter();

  return (
    <div id="NavDesktop">
      <Link className="logo" href={"/"}>
        <Image src="/images/Logo.png" width={40} height={40} alt="/images/Logo.png" />
      </Link>
      <ul className="linkPc">
        <li>
          <Link
            className={`navText ${router.pathname === "/" ? "active" : ""}`}
            href={"/"}
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
          >
            Search
          </Link>
        </li>
        <li>
          <Link
            className={`navText ${
              router.pathname.startsWith("/articles/") ? "active" : ""
            }`}
            href={"/articles"}
          >
            Articles
          </Link>
        </li>
      </ul>
      <NavAcountPc />
    </div>
  );
}
