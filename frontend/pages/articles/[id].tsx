import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { ArticleData } from "../acount";
import { GET_ONEARTICLE_QUERY } from "@/graphql/articles/getOneArticle.query";
import { ChangeEvent, FormEvent, useState, useEffect } from "react";
import Image from "next/image";

export default function ArticleView() {
  const [article, setArticle] = useState<ArticleData | null>(null);
  const [articleImg, setArticleImg] = useState<string>("");
  const [articleContent, setArticleContent] = useState<string>("");
  const router = useRouter();
  const {
    data: articleData,
    error: articleError,
    refetch: articlesRefetch,
  } = useQuery<{
    getOneArticle: { article: ArticleData };
  }>(GET_ONEARTICLE_QUERY, {
    variables: { id: router.query.id },
  });

  const handleReloadDataArticles = () => {
    articlesRefetch();
  };

  useEffect(() => {
    if (articleError) {
      console.error(articleError);
    }
  }, [articleError]);

  useEffect(() => {
    if (articleData) {
      const articleres = articleData.getOneArticle?.article || null;
      setArticle(articleres);
      setArticleImg(articleres.image);
      console.log(articleres.content);

      setArticleContent(articleres.content);
    }
  }, [articleData]);
  return (
    <div id="articlesView">
      <header>
        <h1>{article?.name}</h1>

        <Image src={articleImg} alt="backArticle" width={50} height={50} />
      </header>

      <section>
        <div className="likes">
          <div className="presentationUser">
            <h3>{`${article?.user.username} - ${article?.user.lastName}`}</h3>
            <h4>{`${article?.name}`}</h4>
          </div>
          <div className="displayLikes">
            <button>
              <h4>Like : {article?.like}</h4>
            </button>
            <button>
              <h4>dislike : {article?.dislike}</h4>
            </button>
          </div>
        </div>
        <div className="contenertest">
          <div className="contenue text-container">{article?.content}</div>
        </div>

        <div className="signature">
          <h3>{`${article?.user.username} - ${article?.user.lastName}`}</h3>
          <h4>{`${article?.name}`}</h4>
        </div>
      </section>
    </div>
  );
}
