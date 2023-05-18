import { GET_USERS_QUERY } from "@/graphql/getUsers.query";
import { Role } from "@/utils/contexts/auth-context";
import { useQuery } from "@apollo/client";
import Image from "next/image";
import Link from "next/link";
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
  const { data, error } = useQuery<{ getUsers: { users: UserData[] } }>(
    GET_USERS_QUERY
  );

  const handleToPraticien = (id: string) => {
    console.log("handleToPraticien", id);
    setModal(null);
  };
  const handleToAdmin = (id: string) => {
    console.log("handleToAdmin", id);
    setModal(null);
  };

  const handleToScribe = (id: string) => {
    console.log("handleToScribe" , id);
    setModal(null);
  };

  const handleDeleteUser = (id: string) => {
    console.log("handleDeleteUser", id);
    setModal(null);
  };

  const handleChange = (str: string) => {
    if (modal === str) {
      setModal(null);
    } else {
      setModal(str);
    }
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
            {users.map((user) => (
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
                          onClick={() => handleToPraticien(user.id)}
                        >
                          Promote to praticien
                        </button>
                      </li>
                      <li>
                        <button
                          className={`navTextPc`}
                          onClick={() => handleToAdmin(user.id)}
                        >
                          Promote to Admin
                        </button>
                      </li>
                      <li>
                        <button
                          className={`navTextPc`}
                          onClick={() => handleToScribe(user.id)}
                        >
                          Promote to Scribe
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
