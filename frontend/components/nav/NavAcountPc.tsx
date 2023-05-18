import { LOGOUT_MUTATION } from "@/graphql/logout.mutation";
import { useAuth } from "@/utils/contexts/auth-context";
import { useMutation } from "@apollo/client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { destroyCookie } from "nookies";
import { useEffect, useState } from "react";

export default function ConnexionMobile() {
  const { user, setUser, setAccessToken, setRefreshToken } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [logoutMutation] = useMutation(LOGOUT_MUTATION);


  const router = useRouter();

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };
  const handleLogout = () => {
    if (!user) return;

    logoutMutation({ variables: { id: user.id } })
      .then((result) => {
        if (result.data) {
          console.log("logged out :", result.data.logout.loggedOut);
          setUser(null);
          setAccessToken(null);
          setRefreshToken(null);
          destroyCookie(undefined, "cookieUser");
          destroyCookie(undefined, "cookieAccessToken");
          destroyCookie(undefined, "cookieRefreshToken");
          setIsOpen(false);
          router.push("/");
        }
      })
      .catch((error) => {
        console.error("Error during logout:", error);
      });
  };
  return (
    <div id="navSettingsPc">
      {user ? (
        <div className="navSettingsPcOptions">
          <button onClick={handleToggle}>
            {router.pathname === "/acount" ? (
              <Image
                src="/svg/acountActive.svg"
                width={25}
                height={25}
                alt="AcountActive"
              />
            ) : (
              <Image
                src="/svg/acount.svg"
                width={25}
                height={25}
                alt="AcountNormal"
              />
            )}
          </button>

          {isOpen && (
            <ul className="options">
              <li>
                <Link
                  className="clearButton border"
                  href={"/acount"}
                  onClick={handleToggle}
                >
                  Compte
                </Link>
              </li>
              <li>
                <button className="clearButton" onClick={handleLogout}>
                  Déconnexion
                </button>
              </li>
            </ul>
          )}
        </div>
      ) : (
        <>
          <Link
            className={`navText ${
              router.pathname === "/connexion" ? "active" : ""
            }`}
            href={"/connexion"}
          >
            Se connecter
          </Link>
          <Link
            className={`navText ${
              router.pathname === "/inscription" ? "active" : ""
            }`}
            href={"/inscription"}
          >
            S’inscrire
          </Link>
        </>
      )}
    </div>
  );
}
