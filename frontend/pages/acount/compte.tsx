import { UPDATE_MUTATION } from "@/graphql/update.mutation";
import { UPDATEPASSWORD_MUTATION } from "@/graphql/updatePassword.mutation";
import { useAuth } from "@/utils/contexts/auth-context";
import { useMutation } from "@apollo/client";
import Image from "next/image";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";

export default function Profile() {
  const [username, setUsername] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [newsLetter, setnewsLetter] = useState(true);
  const [errorPassword, seterrorPassword] = useState(false);
  const { user, setUser, setAccessToken, setRefreshToken } = useAuth();

  const router = useRouter();

  const [UpdateMutation, { error }] = useMutation(UPDATE_MUTATION);
  const [UpdatePasswordMutation] = useMutation(UPDATEPASSWORD_MUTATION);

  useEffect(() => {
    if (user) {
      setUsername(user.username);
      setlastName(user.lastName);
      setEmail(user.email);
      setPhone(user.phone);
      setnewsLetter(user.newsLetter);
      setPassword("");
      setPasswordConfirm("");
    }
  }, []);

  useEffect(() => {
    if (!user) {
      router.push("/connexion");
    }
  }, [user]);

  useEffect(() => {
    if (password === passwordConfirm) {
      seterrorPassword(false);
    } else {
      seterrorPassword(true);
    }
  }, [password, passwordConfirm]);

  const handleUpdate = (event: FormEvent) => {
    event.preventDefault();
    UpdateMutation({
      variables: {
        input: {
          username,
          lastName,
          email,
          phone,
          newsLetter,
        },
      },
    })
      .then((result) => {
        if (result.data) {
          setUser(result.data.updateAuth.user);
          setAccessToken(result.data.updateAuth.accessToken);
          setRefreshToken(result.data.updateAuth.refreshToken);
        }
      })
      .catch((error) => {
        console.error(error);
      });

    if (password.length > 0) {
      if (!errorPassword) {
        UpdatePasswordMutation({
          variables: {
            input: {
              password,
            },
          },
        })
          .then((result) => {
            if (result.data) {
              console.log(result.data.updatePassword.changed);
            }
          })
          .catch((error) => {
            console.error(error);
          });
      }
    }
  };
  return (
    <div id="compte">
      <div id="updateAcount">
        <h2>Compte</h2>
        <form
          id="UpdateForm"
          autoComplete="off"
          onSubmit={(event) =>
            !errorPassword ? handleUpdate(event) : event.preventDefault()
          }
        >
          <div className="wrap">
            <div className="content">
              <label htmlFor="name">Prénom</label>
              <input
                type="text"
                name="name"
                id="name"
                value={username}
                autoFocus
                required
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="content">
              <label htmlFor="lastname">Nom</label>
              <input
                type="text"
                name="lastname"
                id="lastname"
                value={lastName}
                required
                onChange={(e) => setlastName(e.target.value)}
              />
            </div>
            <div className="content">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="content">
              <label htmlFor="phone">phone</label>
              <input
                type="tel"
                name="phone"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="content">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="content">
              <label htmlFor="confirmPassword">Confirmation</label>
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
              />
              {errorPassword && (
                <div style={{ color: "red" }}>
                  <span>Les mots de passes ne sont pas identique !</span>
                </div>
              )}
            </div>
            <div className="checkbox">
              <div className="content">
                <label htmlFor="newletter">
                  Je souhaite recevoir la NewsLetter
                </label>
                <input
                  type="checkbox"
                  name="newletter"
                  id="newletter"
                  defaultChecked={newsLetter}
                  onChange={(e) => setnewsLetter(e.target.checked)}
                />
              </div>
            </div>
          </div>
          {error && (
            <div style={{ color: "red" }}>
              {error.graphQLErrors.map(({ message }, i) => (
                <span key={i}>{message}</span>
              ))}
            </div>
          )}
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
}
