import { Role, useAuth } from "@/utils/contexts/auth-context";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function NavDashBord() {
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      scrollContainer!.scrollLeft += e.deltaY;
    };

    const handleMousedown = (e: MouseEvent) => {
      isDown = true;
      scrollContainer!.classList.add("active");
      startX = e.pageX - scrollContainer!.offsetLeft;
      scrollLeft = scrollContainer!.scrollLeft;
    };

    const handleMouseleave = () => {
      isDown = false;
      scrollContainer!.classList.remove("active");
    };

    const handleMouseup = () => {
      isDown = false;
      scrollContainer!.classList.remove("active");
    };
    const handleMousemove = (e: MouseEvent) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - scrollContainer!.offsetLeft;
      const walk = (x - startX) * 3; //scroll-fast
      scrollContainer!.scrollLeft = scrollLeft - walk;
    };

    const scrollContainer = document.getElementById("NavDashBord");

    let isDown: boolean = false;
    let startX: any;
    let scrollLeft: any;

    scrollContainer!.addEventListener("wheel", handleWheel);
    scrollContainer!.addEventListener("mousedown", handleMousedown);
    scrollContainer!.addEventListener("mouseleave", handleMouseleave);
    scrollContainer!.addEventListener("mouseup", handleMouseup);
    scrollContainer!.addEventListener("mousemove", handleMousemove);

    return () => {
      scrollContainer!.removeEventListener("wheel", handleWheel);
      scrollContainer!.removeEventListener("mousedown", handleMousedown);
      scrollContainer!.removeEventListener("mouseleave", handleMouseleave);
      scrollContainer!.removeEventListener("mouseup", handleMouseup);
      scrollContainer!.removeEventListener("mousemove", handleMousemove);
    };
  }, []);


  return (
    <ul id="NavDashBord" className="disableSelection">
      <li>
        <Link
          href={"/acount/compte"}
          className={`navDashBord ${
            router.pathname === "/acount/compte" ? "active" : ""
          }`}
        >
          <Image
            src="/svg/dashBordAcount/compte.svg"
            width={35}
            height={35}
            alt="Logo"
          />
          <p>Compte</p>
        </Link>
      </li>
      {user?.role === Role.ADMIN && (
        <li>
          <Link
            href={"/acount/admin"}
            className={`navDashBord ${
              router.pathname === "/acount/admin" ? "active" : ""
            }`}
          >
            <Image
              src="/svg/dashBordAcount/support.svg"
              width={35}
              height={35}
              alt="Logo"
            />
            <p>Admin</p>
          </Link>
        </li>
      )}
      {(user?.scribe || user?.role === Role.ADMIN) && (
        <li>
          <Link
            href={"/acount/write"}
            className={`navDashBord ${
              router.pathname === "/acount/write" ? "active" : ""
            }`}
          >
            <Image
              src="/svg/dashBordAcount/support.svg"
              width={35}
              height={35}
              alt="Logo"
            />
            <p>Ecrire un articles</p>
          </Link>
        </li>
      )}
      {user?.role !== Role.ADMIN && user?.role === Role.FORMATION && (
        <li>
          <Link
            href={"/acount/formation"}
            className={`navDashBord ${
              router.pathname === "/acount/formation" ? "active" : ""
            }`}
          >
            <Image
              src="/svg/dashBordAcount/support.svg"
              width={35}
              height={35}
              alt="Logo"
            />
            <p>Formations</p>
          </Link>
        </li>
      )}
      <li>
        <Link
          href={"/acount/wishlist"}
          className={`navDashBord ${
            router.pathname === "/acount/wishlist" ? "active" : ""
          }`}
        >
          <Image
            src="/svg/dashBordAcount/saved.svg"
            width={35}
            height={35}
            alt="Logo"
          />
          <p>Enregistrer</p>
        </Link>
      </li>
      <li>
        <Link
          href={"/acount/support"}
          className={`navDashBord ${
            router.pathname === "/acount/support" ? "active" : ""
          }`}
        >
          <Image
            src="/svg/dashBordAcount/support.svg"
            width={35}
            height={35}
            alt="Logo"
          />
          <p>support</p>
        </Link>
      </li>
    </ul>
  );
}
