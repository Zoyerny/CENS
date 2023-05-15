import Link from "next/link";
import { FormEvent } from "react";
import Image from "next/image";

export default function Footer() {
  const handleNewLetter = (event: FormEvent) => {
    event.preventDefault();
  };
  return (
    <footer>
      <div id="newsLetter">
        <div className="newsLetterText">
          <h2>S’inscrire à notre Newsletter</h2>
          <p className="medium">
            Soyez informé(e) de nos nouveaux produits, bons plans et concours
          </p>
        </div>

        <form onSubmit={(event) => handleNewLetter(event)}>
          <input
            type="email"
            name="newsLetter"
            id="newsLetterinput"
            placeholder="exemple@gmail.com"
          />
          <button type="submit">S’inscrire</button>
        </form>
      </div>
      <div id="rights">
        <div className="pages">
          <div className="content">
            <p className="big">Pages</p>
            <Link href={"/"}>Acceuil</Link>
            <Link href={"/search"}>Rechercher</Link>
            <Link href={"/articles"}>Articles</Link>
            <Link href={"/dispensaire"}>Dispensaire</Link>
            <Link href={"/dispensaire"}>connexion</Link>
            <Link href={"/dispensaire"}>inscription</Link>
            <Link href={"/acount"}>Compte</Link>
          </div>
          <div className="content">
            <p className="big">Support</p>
            <Link href={"/support"}>FAQ</Link>
            <Link href={"/support/cgv"}>Conditions générales de vente</Link>
            <Link href={"/support/confidentialite"}>
              Confidentialité des données
            </Link>
            <Link href={"/support/informations"}>Informations légales</Link>
            <Link href={"/support/contact"}>Contactez-nous</Link>
            <Link href={"/support/nous"}>À propos de nous</Link>
          </div>
        </div>
        <div className="sepH" />
        <div className="reseaux">
          <h2>Suivez-nous sur les réseaux sociaux !</h2>
          <div className="icon">
            <Image
              src="/svg/reseaux/instagram.svg"
              width={45}
              height={45}
              alt="Logo"
            />
            <Image
              src="/svg/reseaux/facebook.svg"
              width={45}
              height={45}
              alt="Logo"
            />
            <Image
              src="/svg/reseaux/tiktok.svg"
              width={45}
              height={45}
              alt="Logo"
            />
          </div>
        </div>
      </div>
      <p className="Copyright">
          Copyright © 2023 C.E.N.S All rights reserved.
      </p>
    </footer>
  );
}
