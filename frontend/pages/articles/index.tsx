import { useQuery } from "@apollo/client";
import Image from "next/image";
import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { ArticleData } from "../acount";
import { GET_ARTICLES_QUERY } from "@/graphql/articles/getArticles.query";
import { useRouter } from "next/router";

export default function Articles() {
  const [articles, setArticles] = useState<ArticleData[]>([]);
  const [articleLoaded, setArticleLoaded] = useState<number>(8);
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

  const router = useRouter();

  useEffect(() => {
    if (articlesData) {
      setArticles(articlesData.getArticles.articles);
    }
  }, [articlesData]);

  useEffect(() => {
    if (articlesError) {
      console.error(articlesError);
    }
  }, [articlesError]);

  useEffect(() => {
    if (articleLoaded) {
      articlesRefetch();
      console.log(articleLoaded);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [articleLoaded]);

  useEffect(() => {
    if (articles) {
    }
  }, [articles]);
  const mostLikedArticle = articles.reduce((maxLikedArticle, article) => {
    if (article.like > maxLikedArticle.like && article.validate) {
      return article;
    }
    return maxLikedArticle;
  }, articles[0]);

  return (
    <div id="articles">
      <header>
        <h1>Rechecher un article</h1>
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
      </section>

      <section id="allArticle">
        {/* Les 5 articles les plus likés et les plus récents durant le mois */}
        <div id="tendanceArticle" className="containerArticles">
          <h2>Tendance</h2>
          <div className="containerArticlesTendance ">
            {[...articles]
              .filter((article) => article.validate)
              .sort((a, b) => b.like - a.like) // Trie les articles par ordre décroissant du nombre de likes
              .sort(
                (a, b) =>
                  new Date(b.updatedAt).getTime() -
                  new Date(a.updatedAt).getTime()
              ) // Trie les articles par ordre décroissant de la date de mise à jour
              .slice(0, 5)
              .map((article, index) => (
                <Link
                  href={`/articles/${article.id}`}
                  key={article.id}
                  className={`articleCard${
                    index === 0 ? " afficheArticleContent" : ""
                  }${index === 1 ? " div1" : ""}${index === 2 ? " div2" : ""}${
                    index === 3 ? " div3" : ""
                  }${index === 4 ? " div4" : ""}`}
                >
                  <Image
                    className="imgPresentation"
                    width={200}
                    height={200}
                    src={article.image}
                    alt="articleCard"
                  />
                  <Image
                    className="logo"
                    width={50}
                    height={50}
                    src={article.image}
                    alt="articleCard"
                  />
                  <div className="articleCardContent">
                    <div className="articleMention">
                      <h3>{article.name}</h3>
                      <h4>{article.user.username}</h4>
                    </div>
                    <div className="articleDescription">
                      <span>{article.description}</span>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
        {/* tous les autres article avec un button en dessous pour en afficher + */}
        <div id="afficheArticle" className="containerArticles">
          <h2>A l’affiche</h2>
          <Link
            href={`/articles/${mostLikedArticle ? mostLikedArticle.id : "#"}`}
            className="articleCard"
          >
            <Image
              className="imgPresentation"
              width={200}
              height={200}
              src={mostLikedArticle ? mostLikedArticle.image : "/"}
              alt="articleCard"
            />
            <Image
              className="logo"
              width={50}
              height={50}
              src={mostLikedArticle ? mostLikedArticle.image : "/"}
              alt="articleCard"
            />
            <div className="articleCardContent">
              <div className="articleMention">
                <h3>{mostLikedArticle ? mostLikedArticle.name : "Jhon"}</h3>
                <h4>
                  {mostLikedArticle ? mostLikedArticle.user.username : "Doe"}
                </h4>
              </div>
              <div className="articleDescription">
                <span>
                  {mostLikedArticle ? mostLikedArticle.description : "Doe"}
                </span>
              </div>
            </div>
          </Link>
        </div>
        {/* tous les autres article avec un button en dessous pour en afficher + */}
        <div id="allArticlePublished" className="containerArticles">
          <h2>Nos autres articles</h2>
          <div className="containerArticlesTendance">
            {[...articles]
              .filter((article) => article.validate)
              .sort(
                (a, b) =>
                  new Date(b.updatedAt).getTime() -
                  new Date(a.updatedAt).getTime()
              ) // Trie les articles par ordre décroissant de la date de mise à jour
              .slice(0, articleLoaded) // Sélectionne les 5 premiers articles après le tri
              .map((article) => (
                <Link
                  key={article.id}
                  className="articleCard"
                  href={`/articles/${article.id}`}
                >
                  <Image
                    className="imgPresentation"
                    width={200}
                    height={200}
                    src={article.image}
                    alt="articleCard"
                  />
                  <Image
                    className="logo"
                    width={50}
                    height={50}
                    src={article.image}
                    alt="articleCard"
                  />
                  <div className="articleCardContent">
                    <div className="articleMention">
                      <h3>{article.name}</h3>
                      <h4>{article.user.username}</h4>
                    </div>
                    <div className="articleDescription">
                      <span>{article.description}</span>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
        <button onClick={() => setArticleLoaded(articleLoaded + 16)}>
          Charger plus de contenu
        </button>
      </section>
    </div>
  );
}
