import { LOGOUT_MUTATION } from "@/graphql/logout.mutation";
import { useAuth } from "@/utils/contexts/auth-context";
import { useMutation } from "@apollo/client";
import Link from "next/link";
import { useRouter } from "next/router";
import { destroyCookie } from "nookies";
import React from "react";

interface NavSettingsProps {
  setIsOpen: (value: boolean) => void;
}

export default function NavAcountMobile({ setIsOpen }: NavSettingsProps) {
  const { user, setUser, setAccessToken, setRefreshToken } = useAuth();
  const [logoutMutation] = useMutation(LOGOUT_MUTATION);
  const router = useRouter();

  const handleCloseModal = () => {
    console.log("je passe ici");
    setIsOpen(false);
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
    <div id="navSettings">
      {user ? (
        <>
          <Link
            className="clearButton left"
            href={"/acount"}
            onClick={handleCloseModal}
          >
            Compte
          </Link>
          <button className="clearButton" onClick={handleLogout}>
            Déconnexion
          </button>
        </>
      ) : (
        <>
          <Link
            className="clearButton left"
            href={"/connexion"}
            onClick={handleCloseModal}
          >
            Se connecter
          </Link>
          <Link
            className="clearButton"
            href={"/inscription"}
            onClick={handleCloseModal}
          >
            S’inscrire
          </Link>
        </>
      )}
    </div>
  );
}
