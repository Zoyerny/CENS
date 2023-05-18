import { DELETE_USER_MUTATION } from "@/graphql/deleteUser.mutation";
import { GET_USERS_QUERY } from "@/graphql/getUsers.query";
import { UPDATE_ADMIN_MUTATION } from "@/graphql/updateAdmin.mutation";
import { UPDATE_PRATICIEN_MUTATION } from "@/graphql/updatePraticien.mutation";
import { UPDATE_SCRIBE_MUTATION } from "@/graphql/updateScribe.mutation";
import { Role, useAuth } from "@/utils/contexts/auth-context";
import { useMutation, useQuery } from "@apollo/client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface UserData {
  id: string;
  role: Role;
  username: string;
  lastName: string;
  email: string;
  phone: string;
  newsLetter: boolean;
  scribe: boolean;
}

export default function Admin() {
  const [users, setUsers] = useState<UserData[]>([]);
  const [modal, setModal] = useState<string | null>(null);
  const { user } = useAuth();
  const router = useRouter();
  const { data, error, refetch } = useQuery<{
    getUsers: { users: UserData[] };
  }>(GET_USERS_QUERY);

  const [PraticienMutation] = useMutation(UPDATE_PRATICIEN_MUTATION);
  const [AdminMutation] = useMutation(UPDATE_ADMIN_MUTATION);
  const [ScribeMutation] = useMutation(UPDATE_SCRIBE_MUTATION);
  const [DeleteUser] = useMutation(DELETE_USER_MUTATION);

  useEffect(() => {
    if (user?.role !== Role.ADMIN) {
      router.push("/acount/compte");
    }
  }, [user]);

  const handleToPraticien = (id: string, bool: boolean) => {
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
          handleReloadData();
        }
      })
      .catch((error) => {
        console.error("Error during logout:", error);
      });
    setModal(null);
  };
  const handleToAdmin = (id: string, bool: boolean) => {
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
          handleReloadData();
        }
      })
      .catch((error) => {
        console.error("Error during logout:", error);
      });
    setModal(null);
  };

  const handleToScribe = (id: string, bool: boolean) => {
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
          handleReloadData();
        }
      })
      .catch((error) => {
        console.error("Error during logout:", error);
      });
    setModal(null);
  };

  const handleDeleteUser = (id: string) => {
    DeleteUser({ variables: { id: id } })
      .then((result) => {
        if (result.data) {
          console.log("Deleted user :", result.data.deleteUser.changed);
          handleReloadData();
        }
      })
      .catch((error) => {
        console.error("Error during logout:", error);
      });
    setModal(null);
  };

  const handleChange = (str: string) => {
    if (modal === str) {
      setModal(null);
    } else {
      setModal(str);
    }
  };

  const handleReloadData = () => {
    refetch();
  };

  useEffect(() => {
    if (data) {
      setUsers(data.getUsers.users);
      console.log(data.getUsers.users);
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      console.error(error);
    }
  }, [error]);

  return (
    <div id="admin">
      <h2>Admin</h2>
      <ul id="NavAdmin">
        <li>
          <Link className={`navTextPc`} href={"/"}>
            Articles
          </Link>
        </li>
        <li>
          <Link className={`navTextPc `} href={"/"}>
            Formation
          </Link>
        </li>
        <li>
          <Link className={`navTextPc`} href={"/"}>
            utilisateur
          </Link>
        </li>
      </ul>
      <div id="contentAdmin">
        {users.length > 0 && (
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
                    <button onClick={() => handleChange(user.id)}>
                      <Image
                        src="/svg/dashBordAcount/option.svg"
                        width={35}
                        height={35}
                        alt="Logo"
                      />
                    </button>
                    {modal === user.id && (
                      <ul className="optionsModal">
                        <li>
                          <button
                            className={`navTextPc`}
                            onClick={() =>
                              user.role === Role.PRATICIEN
                                ? handleToPraticien(user.id, false)
                                : handleToPraticien(user.id, true)
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
                                ? handleToAdmin(user.id, false)
                                : handleToAdmin(user.id, true)
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
                                ? handleToScribe(user.id, true)
                                : handleToScribe(user.id, false)
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
                            onClick={() => handleDeleteUser(user.id)}
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
      </div>
    </div>
  );
}
