import { createContext, useContext, useEffect, useState } from "react";
import { setCookie, parseCookies, destroyCookie } from "nookies";

export interface UserType {
  id: string;
  username: string;
  email: string;
}

export interface AuthContextType {
  user: UserType | null;
  loading: boolean;

  setUser: (user: UserType | null) => void;
  setLoading: (loading: boolean) => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: false,

  setUser: () => {},
  setLoading: () => {},
});

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const { cookieUser } = parseCookies();

  useEffect(() => {
    if (cookieUser) {
      setUser(JSON.parse(cookieUser));
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    console.log(
      "updateCookie",
      "user, accessToken, refreshToken",
      user,
    );

    if (user) {
      setCookie(null, "cookieUser", JSON.stringify(user), {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
      });
    } else {
      if (!loading) {
        destroyCookie(undefined, "cookieUser");
      }
    }

  }, [user]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,

        setUser,
        setLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useUser must be used within an AuthProvider");
  }

  return context;
};
