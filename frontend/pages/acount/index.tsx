import { useAuth } from "@/utils/contexts/auth-context";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Role } from "@/utils/contexts/auth-context";
import Link from "next/link";

export interface UserData {
  id: string;
  role: Role;
  username: string;
  lastName: string;
  email: string;
  phone: string;
  newsLetter: boolean;
  scribe: boolean;
}

export interface ArticleData {
  id: string;
  name: string;
  image: string;
  description: string;
  content: string;
  tag: string[];
  like: number;
  dislike: number;
  validate: boolean;
  user: UserData;
  createdAt: string;
  updatedAt: string;
}

export default function Acount() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/connexion");
    } else if (user && user.role !== Role.FORMATION) {
      router.push("/acount/compte");
    }
  }, [user]);

  return (
    <div id="acountLink">
      <h1>Compte</h1>
      <div id="goToCompte">
        <div className="containButton">
          <Link className="clearButton" href={"/acount/compte"}>
            Acceder à votre Compte
          </Link>
        </div>
      </div>
      <div id="goToIntra">
        <div className="containButton">
          <Link className="clearButton" href={"https://cens-intranet.com/"}>
            Acceder à votre espace personnel
          </Link>
        </div>
      </div>
    </div>
  );
}
