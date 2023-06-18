import React, { createContext, useState, useEffect, useContext } from "react";

import * as loginAPI from "../services/login";

interface AuthContextData {
  signed: boolean;
  user: object | null;
  Login(user: object): Promise<void>;
  Logout(): void;
}

type Props = {
  children: any;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<object | null>(null);

  useEffect(() => {
    const storagedUser = sessionStorage.getItem("@App:user");
    const storagedToken = sessionStorage.getItem("@App:token");

    if (storagedToken && storagedUser) {
      setUser(JSON.parse(storagedUser));
      // api.defaults.headers.Authorization = `Bearer ${storagedToken}`;
    }
  }, []);

  async function Login(userData: object) {
    try {
      const { user, token } = await loginAPI.loginAPI(userData);

      setUser({ user, token });
      sessionStorage.setItem("@App:user", JSON.stringify(user));
      sessionStorage.setItem("@App:token", token);
    } catch (error) {}
  }

  function Logout() {
    setUser(null);
    sessionStorage.removeItem("@App:user");
    sessionStorage.removeItem("@App:token");
    window.location.assign("/");
  }

  return (
    <AuthContext.Provider
      value={{ signed: Boolean(user), user, Login, Logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}
