import { DELETE_USER_MUTATION } from "@/graphql/auth/deleteUser.mutation";
import { GET_ARTICLES_QUERY } from "@/graphql/articles/getArticles.query";
import { GET_USERS_QUERY } from "@/graphql/auth/getUsers.query";
import { UPDATE_ADMIN_MUTATION } from "@/graphql/user/updateAdmin.mutation";
import { UPDATE_PRATICIEN_MUTATION } from "@/graphql/user/updatePraticien.mutation";
import { UPDATE_SCRIBE_MUTATION } from "@/graphql/user/updateScribe.mutation";
import { Role, useAuth } from "@/utils/contexts/auth-context";
import { useMutation, useQuery } from "@apollo/client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ArticleData, UserData } from ".";
import { DELETE_ARTICLE_MUTATION } from "@/graphql/articles/deleteArticle.mutation";
import { UPDATE_ARTICLEVALIDATE_MUTATION } from "@/graphql/articles/updateArticleValidate.mutation";

export default function Admin() {
  const [nav, setNav] = useState<Number>(0);

  const [users, setUsers] = useState<UserData[]>([]);
  const [articles, setArticles] = useState<ArticleData[]>([]);
  const [allArticles, setAllArticles] = useState<boolean>(false);
  const [modalUsers, setModalUsers] = useState<string | null>(null);
  const [modalArticles, setModalArticles] = useState<string | null>(null);
  const { user } = useAuth();
  const router = useRouter();
  const {
    data: usersData,
    error: usersError,
    refetch: usersRefetch,
  } = useQuery<{
    getUsers: { users: UserData[] };
  }>(GET_USERS_QUERY);

  const {
    data: articlesData,
    error: articlesError,
    refetch: articlesRefetch,
  } = useQuery<{
    getArticles: { articles: ArticleData[] };
  }>(GET_ARTICLES_QUERY);

  const [PraticienMutation] = useMutation(UPDATE_PRATICIEN_MUTATION);
  const [AdminMutation] = useMutation(UPDATE_ADMIN_MUTATION);
  const [ScribeMutation] = useMutation(UPDATE_SCRIBE_MUTATION);
  const [DeleteUser] = useMutation(DELETE_USER_MUTATION);

  const [validateMutation] = useMutation(UPDATE_ARTICLEVALIDATE_MUTATION);
  const [DeleteArticle] = useMutation(DELETE_ARTICLE_MUTATION);
  useEffect(() => {
    if (user?.role !== Role.ADMIN) {
      router.push("/acount/compte");
    }
  }, [user]);

  const handleUserToPraticien = (id: string, bool: boolean) => {
    PraticienMutation({
      variables: {
        input: {
          id,
          bool,
        },
      },
    })
      .then((result) => {
        if (result.data) {
          console.log(
            "Change To praticien :",
            result.data.updateUserPraticien.changed
          );
          handleReloadDataUser();
        }
      })
      .catch((error) => {
        console.error("Error during logout:", error);
      });
    setModalUsers(null);
  };

  const handleUserToAdmin = (id: string, bool: boolean) => {
    AdminMutation({
      variables: {
        input: {
          id,
          bool,
        },
      },
    })
      .then((result) => {
        if (result.data) {
          console.log("Change To Admin :", result.data.updateUserAdmin.changed);
          handleReloadDataUser();
        }
      })
      .catch((error) => {
        console.error("Error during logout:", error);
      });
    setModalUsers(null);
  };

  const handleUserToScribe = (id: string, bool: boolean) => {
    ScribeMutation({
      variables: {
        input: {
          id,
          bool,
        },
      },
    })
      .then((result) => {
        if (result.data) {
          console.log(
            "Change To Scribe :",
            result.data.updateUserScribe.changed
          );
          handleReloadDataUser();
        }
      })
      .catch((error) => {
        console.error("Error during logout:", error);
      });
    setModalUsers(null);
  };

  const handleUserDeleteUser = (id: string) => {
    DeleteUser({ variables: { id: id } })
      .then((result) => {
        if (result.data) {
          console.log("Deleted user :", result.data.deleteUser.changed);
          handleReloadDataUser();
        }
      })
      .catch((error) => {
        console.error("Error during logout:", error);
      });
    setModalUsers(null);
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
  const handleArticleValidate = (id: string, bool: boolean) => {
    validateMutation({
      variables: {
        input: {
          id,
          bool,
        },
      },
    })
      .then((result) => {
        if (result.data) {
          console.log(
            "Change To praticien :",
            result.data.updateArticleValidate.changed
          );
          handleReloadDataArticles();
        }
      })
      .catch((error) => {
        console.error("Error during logout:", error);
      });
    setModalArticles(null);
  };

  const handleChangeModalUser = (str: string) => {
    if (modalUsers === str) {
      setModalUsers(null);
    } else {
      setModalUsers(str);
    }
  };
  const handleChangeModalArticles = (str: string) => {
    if (modalArticles === str) {
      setModalArticles(null);
    } else {
      setModalArticles(str);
    }
  };

  const handleReloadDataUser = () => {
    usersRefetch();
  };
  const handleReloadDataArticles = () => {
    articlesRefetch();
  };

  useEffect(() => {
    if (usersData) {
      setUsers(usersData.getUsers.users);
    }
  }, [usersData]);
  useEffect(() => {
    if (articlesData) {
      setArticles(articlesData.getArticles.articles);
    }
  }, [articlesData]);

  useEffect(() => {
    if (usersError) {
      console.error(usersError);
    }
  }, [usersError]);

  useEffect(() => {
    if (articlesError) {
      console.error(articlesError);
    }
  }, [articlesError]);

  useEffect(() => {
    handleReloadDataUser();
    handleReloadDataArticles();
  }, [nav]);

  return (
    <div id="admin">
      <h2>Admin</h2>
      <ul id="NavAdmin">
        <li>
          <button
            className={`navTextPc ${nav === 0 ? "active" : ""}`}
            onClick={() => setNav(0)}
          >
            Articles
          </button>
        </li>
        <li>
          <button
            className={`navTextPc ${nav === 1 ? "active" : ""}`}
            onClick={() => setNav(1)}
          >
            Formation
          </button>
        </li>
        <li>
          <button
            className={`navTextPc ${nav === 2 ? "active" : ""}`}
            onClick={() => setNav(2)}
          >
            utilisateur
          </button>
        </li>
        <li>
          <button
            className={`navTextPc ${nav === 3 ? "active" : ""}`}
            onClick={() => setNav(3)}
          >
            NewsLetter
          </button>
        </li>
      </ul>
      <div id="contentAdmin">
        {nav === 0 && articles.length > 0 && (
          <>
            <div className="content">
              <label htmlFor="allArticle">Show all</label>
              <input
                type="checkbox"
                name="allArticle"
                id="allArticle"
                defaultChecked={allArticles}
                onChange={(e) => setAllArticles(e.target.checked)}
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
                              article.validate
                                ? handleArticleValidate(article.id, false)
                                : handleArticleValidate(article.id, true)
                            }
                          >
                            {article.validate ? (
                              <span className="red">
                                Remove validate Article
                              </span>
                            ) : (
                              <span>Validate Article</span>
                            )}
                          </button>
                        </li>
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
        {nav === 1 && <div>Formation</div>}
        {nav === 2 && users.length > 0 && (
          <>
            {[...users]
              .sort((a, b) => {
                if (a.role === Role.ADMIN && b.role !== Role.ADMIN) {
                  return -1; // a est un administrateur, donc le placer avant b
                } else if (a.role !== Role.ADMIN && b.role === Role.ADMIN) {
                  return 1; // b est un administrateur, donc le placer avant a
                } else if (
                  a.role === Role.PRATICIEN &&
                  b.role !== Role.PRATICIEN
                ) {
                  return -1; // a est un praticien, donc le placer avant b
                } else if (
                  a.role !== Role.PRATICIEN &&
                  b.role === Role.PRATICIEN
                ) {
                  return 1; // b est un praticien, donc le placer avant a
                } else {
                  return a.username.localeCompare(b.username); // trier par ordre alphabétique du nom d'utilisateur
                }
              })
              .map((user) => (
                <div className="card" key={user.id}>
                  <div className="userInfo">
                    <div className="section">
                      <p className="medium">Prenom</p>
                      <p>{user.username}</p>
                    </div>
                    <div className="section">
                      <p className="medium">Nom</p>
                      <p>{user.lastName}</p>
                    </div>
                    <div className="section">
                      <p className="medium">Email</p>
                      <p>{user.email}</p>
                    </div>
                    <div className="section">
                      <p className="medium">Scribe</p>
                      <p>{user.scribe.toString().toUpperCase()}</p>
                    </div>
                    <div className="section">
                      <p className="medium">Role</p>
                      <p>{user.role}</p>
                    </div>
                  </div>
                  <div className="buttonsCard">
                    <button onClick={() => handleChangeModalUser(user.id)}>
                      <Image
                        src="/svg/dashBordAcount/option.svg"
                        width={35}
                        height={35}
                        alt="Logo"
                      />
                    </button>
                    {modalUsers === user.id && (
                      <ul className="optionsModal">
                        <li>
                          <button
                            className={`navTextPc`}
                            onClick={() =>
                              user.role === Role.PRATICIEN
                                ? handleUserToPraticien(user.id, false)
                                : handleUserToPraticien(user.id, true)
                            }
                          >
                            {user.role === Role.PRATICIEN ? (
                              <span className="red">Demote to User</span>
                            ) : (
                              <span>Promote to praticien</span>
                            )}
                          </button>
                        </li>
                        <li>
                          <button
                            className={`navTextPc`}
                            onClick={() =>
                              user.role === Role.ADMIN
                                ? handleUserToAdmin(user.id, false)
                                : handleUserToAdmin(user.id, true)
                            }
                          >
                            {user.role === Role.ADMIN ? (
                              <span className="red">Demote to User</span>
                            ) : (
                              <span>Promote to Admin</span>
                            )}
                          </button>
                        </li>
                        <li>
                          <button
                            className={`navTextPc`}
                            onClick={() =>
                              !user.scribe
                                ? handleUserToScribe(user.id, true)
                                : handleUserToScribe(user.id, false)
                            }
                          >
                            {!user.scribe ? (
                              <span>Promote to Scribe</span>
                            ) : (
                              <span className="red">Remove Scribe</span>
                            )}
                          </button>
                        </li>
                        <li>
                          <button
                            className={`navTextPc red`}
                            onClick={() => handleUserDeleteUser(user.id)}
                          >
                            Delete user
                          </button>
                        </li>
                      </ul>
                    )}
                  </div>
                </div>
              ))}
          </>
        )}
        {nav === 3 && <div>NewsLetter</div>}
      </div>
    </div>
  );
}
