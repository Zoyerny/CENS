import { CREATE_ARTICLE_MUTATION } from "@/graphql/articles/createArticle.mutation";
import { useMutation, useQuery } from "@apollo/client";
import Image from "next/image";
import { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { useAuth } from "@/utils/contexts/auth-context";
import axios from "axios";
import Link from "next/link";
import { ArticleData, UserData } from "..";
import { GET_MULTIPLE_ARTICLE_QUERY } from "@/graphql/articles/getMultipleArticle.query";
import { useRouter } from "next/router";
import { DELETE_ARTICLE_MUTATION } from "@/graphql/articles/deleteArticle.mutation";

export default function Write() {
  const [nav, setNav] = useState<Number>(0);
  const [articleName, setArticleName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [tag, setTag] = useState<string>("");
  const [uploading, setUploading] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [articles, setArticles] = useState<ArticleData[]>([]);
  const [allArticles, setAllArticles] = useState<boolean>(false);
  const [modalArticles, setModalArticles] = useState<string | null>(null);

  const { user } = useAuth();
  const router = useRouter();
  const [createArticle, { error }] = useMutation(CREATE_ARTICLE_MUTATION);
  const [DeleteArticle] = useMutation(DELETE_ARTICLE_MUTATION);

  const {
    data: articlesData,
    error: articlesError,
    refetch: articlesRefetch,
  } = useQuery<{
    getMultipleArticle: { articles: ArticleData[] };
  }>(GET_MULTIPLE_ARTICLE_QUERY, {
    variables: { id: user?.id },
  });

  const handleReloadDataArticles = () => {
    articlesRefetch();
  };

  const handleUserDeleteArticles = (id: string) => {
    DeleteArticle({ variables: { id: id } })
      .then((result) => {
        if (result.data) {
          console.log("Deleted Article :", result.data.deleteArticle.changed);
          handleReloadDataArticles();
        }
      })
      .catch((error) => {
        console.error("Error during delete:", error);
      });
    setModalArticles(null);
  };

  const handleChangeModalArticles = (str: string) => {
    if (modalArticles === str) {
      setModalArticles(null);
    } else {
      setModalArticles(str);
    }
  };

  const handleCreateArticles = async (event: FormEvent) => {
    event.preventDefault();
    if (selectedFile) {
      setUploading(true);
      try {
        if (!selectedFile) return;
        const formData = new FormData();
        formData.append("articleTitle", "selectedFile");
        formData.append("myImage", selectedFile);
        const { data } = await axios.post("/api/upload", formData);
        const image: string = `http://${data.host}/uploads/${data.file.newFilename}`;
        const tags = tag.split(",").map((tag) => tag.trim());
        createArticle({
          variables: {
            input: {
              userId: user?.id,
              articleName: articleName,
              description: description,
              content: content,
              tags: tags,
              image: image,
            },
          },
        })
          .then((result) => {
            if (result.data) {
              console.log(result.data.createArticle.changed);
            }
          })
          .catch((error) => {
            console.error(error);
          });
      } catch (error) {
        console.log(error);
      }
      setUploading(false);
    }
  };

  useEffect(() => {
    if (articlesData) {
      const articles = articlesData.getMultipleArticle?.articles || [];
      console.log(articles);
      setArticles(articles);
    }
  }, [articlesData]);

  useEffect(() => {
    if (articlesError) {
      console.error(articlesError);
    }
  }, [articlesError]);

  useEffect(() => {
    handleReloadDataArticles();
  }, [nav]);

  return (
    <div id="write">
      <h2>Ecrire un Article</h2>
      <ul id="NavWrite">
        <li>
          <button
            className={`navTextPc ${nav === 0 ? "active" : ""}`}
            onClick={() => setNav(0)}
          >
            Ecrire
          </button>
        </li>
        <li>
          <button
            className={`navTextPc ${nav === 1 ? "active" : ""}`}
            onClick={() => setNav(1)}
          >
            Mes articles
          </button>
        </li>
      </ul>
      <div id="contentWrite">
        {nav === 0 && (
          <form
            id="WriteForm"
            autoComplete="off"
            onSubmit={(event) => handleCreateArticles(event)}
          >
            <div className="wrap">
              <div className="group">
                <div className="content">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    autoFocus
                    required
                    onChange={(e) => setArticleName(e.target.value)}
                  />
                </div>
                <div className="content">
                  <label htmlFor="description">Description</label>
                  <textarea
                    rows={3}
                    cols={33}
                    name="description"
                    id="description"
                    maxLength={90}
                    required
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
              </div>

              <div className="content">
                <label htmlFor="content">Content</label>
                <textarea
                  className="contentText"
                  rows={5}
                  cols={33}
                  name="content"
                  id="content"
                  required
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>
              <div className="content">
                <label htmlFor="tag">tag s’éparer par une ’ , ’</label>
                <textarea
                  rows={2}
                  cols={33}
                  name="tag"
                  id="tag"
                  required
                  onChange={(e) => setTag(e.target.value)}
                />
              </div>
              <div className="content">
                <label>
                  <input
                    type="file"
                    hidden
                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                      const file = event.target.files?.[0];

                      if (file) {
                        const allowedTypes = [
                          "image/jpeg",
                          "image/png",
                          "image/gif",
                        ];
                        if (!allowedTypes.includes(file.type)) {
                          // Gérer le cas où le fichier n'est pas une image
                          console.log(
                            "Le fichier sélectionné n'est pas une image"
                          );
                          setSelectedImage("");
                          setSelectedFile(null);
                          return;
                        } else {
                          setSelectedImage(URL.createObjectURL(file));
                          setSelectedFile(file);
                        }
                      }
                    }}
                  />
                  <div>
                    {selectedImage ? (
                      <Image
                        src={selectedImage}
                        width={100}
                        height={100}
                        alt=""
                      />
                    ) : (
                      <span>Select Image</span>
                    )}
                  </div>
                </label>
              </div>
            </div>
            <button type="submit">Send</button>
            {error && (
              <div>
                {error.graphQLErrors.map(({ message }, i) => (
                  <span className="red" key={i}>
                    {message}
                  </span>
                ))}
              </div>
            )}
          </form>
        )}
        {nav === 1 && (
          <>
            <div className="content">
              <label htmlFor="allArticle">Show all</label>
              <input
                type="checkbox"
                name="allArticle"
                id="allArticle"
                defaultChecked={allArticles}
                onChange={(e) => {
                  setAllArticles(e.target.checked);
                  console.log(allArticles);
                }}
              />
            </div>
            {[...articles]
              .filter((article) => allArticles || !article.validate)
              .map((article) => (
                <div className="card" key={article.id}>
                  <div className="userInfo">
                    <div className="section">
                      <p className="medium">Name</p>
                      <p>{article.name}</p>
                    </div>
                    <div className="section">
                      <p className="medium">Author</p>
                      <p>
                        {article.user.username} - {article.user.lastName}
                      </p>
                    </div>
                    <div className="section">
                      <p className="medium">Validate</p>
                      <p>{article.validate.toString().toUpperCase()}</p>
                    </div>
                    <div className="section">
                      <p className="medium">Lien</p>
                      <Link href={"/articles/" + article.id}>{article.id}</Link>
                    </div>
                  </div>
                  <div className="buttonsCard">
                    <button
                      onClick={() => handleChangeModalArticles(article.id)}
                    >
                      <Image
                        src="/svg/dashBordAcount/option.svg"
                        width={35}
                        height={35}
                        alt="Logo"
                      />
                    </button>
                    {modalArticles === article.id && (
                      <ul className="optionsModal">
                        <li>
                          <button
                            className={`navTextPc`}
                            onClick={() =>
                              router.push("/acount/write/" + article.id)
                            }
                          >
                            <span className="red">Modifié</span>
                          </button>
                        </li>
                        <li>
                          <button
                            className={`navTextPc red`}
                            onClick={() => handleUserDeleteArticles(article.id)}
                          >
                            Delete Articles
                          </button>
                        </li>
                      </ul>
                    )}
                  </div>
                </div>
              ))}
          </>
        )}
      </div>
    </div>
  );
}
