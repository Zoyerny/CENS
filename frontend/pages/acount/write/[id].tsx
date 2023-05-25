import { UPDATE_ARTICLE_MUTATION } from "@/graphql/articles/updateArticle.mutation";
import { useAuth } from "@/utils/contexts/auth-context";
import { useMutation, useQuery } from "@apollo/client";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { ArticleData } from "..";
import { GET_ONEARTICLE_QUERY } from "@/graphql/articles/getOneArticle.query";
export default function ModifyWrite() {
  const [nav, setNav] = useState<Number>(0);
  const [articleName, setArticleName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [tag, setTag] = useState<string>("");
  const [uploading, setUploading] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [article, setArticle] = useState<ArticleData | null>(null);
  const { user } = useAuth();
  const router = useRouter();

  const [updateArticle, { error }] = useMutation(UPDATE_ARTICLE_MUTATION);

  const {
    data: articleData,
    error: articleError,
    refetch: articlesRefetch,
  } = useQuery<{
    getOneArticle: { article: ArticleData };
  }>(GET_ONEARTICLE_QUERY, {
    variables: { id: router.query.id },
  });
  const handleUpdateArticle = async (event: FormEvent) => {
    event.preventDefault();
    let responseData: any;
    if (selectedFile) {
      setUploading(true);
      try {
        if (!selectedFile) return;
        const formData = new FormData();
        formData.append("articleTitle", "selectedFile");
        formData.append("myImage", selectedFile);
        const { data } = await axios.post("/api/upload", formData);
        responseData = data;
      } catch (error) {
        console.log(error);
      }
      const image: string = responseData.filepath;
      const tags = tag.split(",").map((tag) => tag.trim());
      updateArticle({
        variables: {
          input: {
            articleId: router.query.id,
            articleName: articleName,
            description: description,
            content: content,
            tag: tags,
            image: image,
          },
        },
      })
        .then((result) => {
          if (result.data) {
            console.log(result.data.updateArticle.changed);
          }
        })
        .catch((error) => {
          console.error(error);
        });
      setUploading(false);
    }
  };
  const handleReloadDataArticles = () => {
    articlesRefetch();
  };

  useEffect(() => {
    if (articleData) {
      const articleres = articleData.getOneArticle?.article || null;
      setArticle(articleres);
      setArticleName(articleres.name);
      setDescription(articleres.description);
      setContent(articleres.content);
      setTag(articleres.tag.toString());
      setSelectedImage(`/uploads/b5fe7cd1-6dc8-4272-9504-bad19886c6f6`);

    }
  }, [articleData]);

  useEffect(() => {
    if (articleError) {
      console.error(articleError);
    }
  }, [articleError]);

  useEffect(() => {
    handleReloadDataArticles();
  }, [nav]);
  return (
    <div id="write">
      <h2>Ecrire un Article</h2>
      <div id="contentWrite">
        <button
          onClick={() => router.push("/acount/write")}
          className="red medium"
        >
          Leave
        </button>
        {nav === 0 && (
          <form
            id="WriteForm"
            autoComplete="off"
            onSubmit={(event) => handleUpdateArticle(event)}
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
                    value={articleName}
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
                    value={description}
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
                  value={content}
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
                  value={tag}
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
      </div>
    </div>
  );
}
