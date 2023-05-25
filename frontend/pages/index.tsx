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
        <h1>Le Cercle des Energies Nouvelles de Soin</h1>
        <form className="searchBack" onSubmit={(event) => handleSearch(event)}>
          <div className="inputContain">
            <Image src="/svg/search.svg" width={20} height={23} alt="article" />
            <input
              type="text"
              name="what"
              id="what"
              placeholder="Que recherchez vous ? "
            />
          </div>
          <div className="sepH" />
          <div className="sepV" />
          <div className="inputContain">
            <Image
              src="/svg/location.svg"
              width={20}
              height={23}
              alt="article"
            />
            <input
              type="text"
              name="where"
              id="where"
              placeholder="Saissisez une ville ou une region"
            />
          </div>
          <div className="sepH" />
          <button className="submit" type="submit">
            <p className="medium">
              RECHERCHER
            </p>
            <Image
                src="/svg/send.svg"
                width={20}
                height={23}
                alt="article"
              />
          </button>
        </form>
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
            width={100}
            height={100}
            alt="article"
          />
          <Image
            src="/images/article/article2.png"
            width={250}
            height={250}
            alt="article"
          />
          <Image
            src="/images/article/article3.jpg"
            width={150}
            height={150}
            alt="article"
          />
        </article>
      </section>
    </div>
  );
}
