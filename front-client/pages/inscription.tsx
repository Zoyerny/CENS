import { useState, FormEvent, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { REGISTER_MUTATION } from "@/graphql/register.mutation";
import { useAuth } from "@/utils/contexts/auth-context";
import Image from "next/image";
import { useRouter } from "next/router";

export default function Inscription() {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [newsLetter, setnewsLetter] = useState(true);
  const [errorPassword, seterrorPassword] = useState(false);
  const { user, setUser } = useAuth();

  const router = useRouter();

  const [registerMutation, { error }] = useMutation(REGISTER_MUTATION);

  useEffect(() => {
    if (user) {
      router.push("/acount");
    }
  }, [user]);

  useEffect(() => {
    if (password === passwordConfirm) {
      seterrorPassword(false);
    } else {
      seterrorPassword(true);
    }
  }, [password, passwordConfirm]);

  const handleRegister = (event: FormEvent) => {
    event.preventDefault();
    registerMutation({
      variables: {
        input: {
          username,
          name,
          email,
          phone,
          password,
          newsLetter,
        },
      },
    })
      .then((result) => {
        if (result.data) {
          console.log(result.data);
          setUser(result.data.signup.user);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div id="register">
      <form
        id="registerForm"
        autoComplete="off"
        onSubmit={(event) =>
          !errorPassword ? handleRegister(event) : event.preventDefault()
        }
      >
        <h1>S’enregistrer</h1>
        <div className="wrap">
          <div className="content">
            <label htmlFor="name">Prénom</label>
            <input
              type="text"
              name="name"
              id="name"
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
              required
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="content">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
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
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="content">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="content">
            <label htmlFor="confirmPassword">Confirmation</label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              required
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
                checked
                onChange={(e) => setnewsLetter(e.target.checked)}
              />
            </div>

            <div className="content">
              <label htmlFor="cgu">ok pour les cgu </label>
              <input type="checkbox" name="cgu" id="cgu" required />
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
        <button type="submit">
          <Image src="/svg/Send.svg" width={26.13} height={24} alt="Send" />
        </button>
      </form>
      <div className="rejoindre">
        <h1>Pourquoi nous rejoindre</h1>
        <p className="big">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum a
          elit dui. Curabitur gravida eu orci vel vulputate. Sed ut ipsum eros.
          Morbi felis massa, viverra quis enim eget, elementum lacinia dui.
          Praesent non ligula a sem accumsan condimentum ut non neque. Donec
          pretium porta sodales. Etiam justo urna, dapibus sit amet lorem at,
          ullamcorper cursus ex.
        </p>
      </div>
    </div>
  );
}
