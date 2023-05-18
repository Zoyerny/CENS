import { createContext, useContext, useEffect, useState } from "react";
import { setCookie, parseCookies, destroyCookie } from "nookies";

export enum Role {
  USER = 'USER',
  FORMATION = 'FORMATION',
  PRATICIEN = 'PRATICIEN',
  ADMIN = 'ADMIN',
};

export interface UserType {
  id: string;
  role: Role;
  username: string;
  lastName: string;
  email: string;
  phone: string;
  newsLetter: boolean;
  scribe: boolean;
}

export interface AuthContextType {
  user: UserType | null;
  loading: boolean;
  accessToken: string | null;
  refreshToken: string | null;

  setUser: (user: UserType | null) => void;
  setLoading: (loading: boolean) => void;
  setAccessToken: (token: string | null) => void;
  setRefreshToken: (token: string | null) => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: false,
  accessToken: null,
  refreshToken: null,

  setUser: () => {},
  setLoading: () => {},
  setAccessToken: () => {},
  setRefreshToken: () => {},
});

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);

  const { cookieAccessToken, cookieRefreshToken, cookieUser } = parseCookies();

  useEffect(() => {
    if (cookieAccessToken) {
      setAccessToken(cookieAccessToken);
    }

    if (cookieRefreshToken) {
      setRefreshToken(cookieRefreshToken);
    }

    if (cookieUser) {
      setUser(JSON.parse(cookieUser));
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (cookieUser) {
      setUser(JSON.parse(cookieUser));
    }
    setLoading(false);
  }, []);

  useEffect(() => {
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

    if (accessToken) {
      setCookie(null, "cookieAccessToken", accessToken, {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
      });
    } else {
      if (!loading) {
        destroyCookie(undefined, "cookieAccessToken");
      }
    }

    if (refreshToken) {
      setCookie(null, "cookieRefreshToken", refreshToken, {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
      });
    } else {
      if (!loading) {
        destroyCookie(undefined, "cookieRefreshToken");
      }
    }
  }, [user, accessToken, refreshToken, loading]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        accessToken,
        refreshToken,

        setUser,
        setLoading,
        setAccessToken,
        setRefreshToken,
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
