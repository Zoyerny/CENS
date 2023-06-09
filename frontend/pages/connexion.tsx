import { useState, FormEvent, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_MUTATION } from "../graphql/auth/login.mutation";
import { useAuth } from "@/utils/contexts/auth-context";
import Image from "next/image";
import { useRouter } from "next/router";

export default function Connexion() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser, setAccessToken, setRefreshToken } = useAuth();

  const router = useRouter();

  const [loginMutation, { error }] = useMutation(LOGIN_MUTATION);

  useEffect(() => {
    if (user) {
      router.push("/acount");
    }
  }, [user]);

  const handleLogin = (event: FormEvent) => {
    event.preventDefault();
    loginMutation({
      variables: {
        input: {
          email,
          password,
        },
      },
    })
      .then((result) => {
        if (result.data) {
          setUser(result.data.signin.user);
          setAccessToken(result.data.signin.accessToken);
          setRefreshToken(result.data.signin.refreshToken);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div id="login">
      <form
        id="loginForm"
        autoComplete="off"
        onSubmit={(event) => handleLogin(event)}
      >
        <h1>Se connecter</h1>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          autoFocus
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && (
          <div>
            {error.graphQLErrors.map(({ message }, i) => (
              <span className="red" key={i}>{message}</span>
            ))}
          </div>
        )}
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
