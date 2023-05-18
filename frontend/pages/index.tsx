import Image from "next/image";
import Link from "next/link";
import { FormEvent } from "react";

export default function Home() {
  const handleSearch = (event: FormEvent) => {
    event.preventDefault();
  };

  return (
    <div id="home">
      <header>
        <div className="slide">
          <h1>Le Cercle des Energies Nouvelles de Soin</h1>
        </div>

        <div className="searchBack">
          <h2>Rechecher une : formation</h2>
          <div className="search">
            <form onSubmit={(event) => handleSearch(event)}>
              <input
                type="text"
                className="searchBar"
                name="what"
                id="what"
                placeholder="Que recherchez vous ? "
              />
              <input
                type="text"
                className="localisationBar"
                name="where"
                id="where"
                placeholder="Saissisez une ville ou une region"
              />
              <button className="submit" type="submit">
                <p className="medium">RECHERCHER</p>
              </button>
            </form>
          </div>
        </div>
      </header>

      <section id="articleBack">
        <h2>Article Populaire</h2>
        <article>
          <div className="article">
            <Image
              src="/images/article/article1.jpg"
              width={200}
              height={200}
              alt="article"
            />
            <div className="contentArticle">
              <h3>Se révélé a soi</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
                vestibulum aliquet eros vitae
              </p>
            </div>
          </div>
          <div className="article">
            <Image
              src="/images/article/article1.jpg"
              width={200}
              height={200}
              alt="article"
            />
            <div className="contentArticle">
              <h3>Se révélé a soi</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
                vestibulum aliquet eros vitae
              </p>
            </div>
          </div>
          <div className="article">
            <Image
              src="/images/article/article1.jpg"
              width={200}
              height={200}
              alt="article"
            />
            <div className="contentArticle">
              <h3>Se révélé a soi</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
                vestibulum aliquet eros vitae
              </p>
            </div>
          </div>
          <div className="article">
            <Image
              src="/images/article/article1.jpg"
              width={200}
              height={200}
              alt="article"
            />
            <div className="contentArticle">
              <h3>Se révélé a soi</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
                vestibulum aliquet eros vitae
              </p>
            </div>
          </div>
        </article>{" "}
        <Link className="clearButton" href={"/articles"}>
          Voir plus
        </Link>
      </section>

      <section id="presentation">
        <article>
          <h2>Lorem Ipsum</h2>

          <p className="big">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
            a elit dui. Curabitur gravida eu orci vel vulputate. Sed ut ipsum
            eros. Morbi felis massa, viverra quis enim eget, elementum lacinia
            dui. Praesent non ligula a sem accumsan condimentum ut non neque.
            Donec pretium porta sodales. Etiam justo urna, dapibus sit amet
            lorem at, ullamcorper cursus ex.
          </p>
        </article>

        <article className="imgRandom">
          <Image
            src="/images/article/article1.jpg"
            width={175}
            height={175}
            alt="article"
          />
          <Image
            src="/images/article/article1.jpg"
            width={200}
            height={200}
            alt="article"
          />
          <Image
            src="/images/article/article1.jpg"
            width={175}
            height={175}
            alt="article"
          />
        </article>
      </section>
    </div>
  );
}
