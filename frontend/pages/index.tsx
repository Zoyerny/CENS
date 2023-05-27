import { useQuery } from "@apollo/client";
import Image from "next/image";
import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { ArticleData } from "./acount";
import { GET_ARTICLES_QUERY } from "@/graphql/articles/getArticles.query";

export default function Home() {
  const [articles, setArticles] = useState<ArticleData[]>([]);
  const handleSearch = (event: FormEvent) => {
    event.preventDefault();
  };

  const {
    data: articlesData,
    error: articlesError,
    refetch: articlesRefetch,
  } = useQuery<{
    getArticles: { articles: ArticleData[] };
  }>(GET_ARTICLES_QUERY);

  useEffect(() => {
    if (articlesError) {
      console.error(articlesError);
    }
  }, [articlesError]);

  useEffect(() => {
    if (articlesData) {
      setArticles(articlesData.getArticles.articles);
    }
  }, [articlesData]);

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
            <p className="medium">RECHERCHER</p>
            <Image src="/svg/send.svg" width={20} height={23} alt="article" />
          </button>
        </form>
      </header>

      <section id="articleBack">
        <h2>Article Populaire</h2>
        <article>
          {[...articles]
            .filter((article) => article.validate)
            .sort((a, b) => b.like - a.like)
            .slice(0, 4)
            .map((article) => (
              <Link
                href={`/articles/${article.id}`}
                className="article"
                key={article.id}
              >
                <Image
                  src={article.image}
                  width={200}
                  height={200}
                  alt="article"
                />
                <div className="contentArticle">
                  <h3>{article.name}</h3>
                  <p>{article.description}</p>
                </div>
              </Link>
            ))}
        </article>
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
