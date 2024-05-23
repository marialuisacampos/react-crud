import { createContext, PropsWithChildren, useContext, useState } from "react";
import { User } from "../types";
import api from "../services/usersApi";

interface IAuthContext {
  user: User | null;
  login: (email: string, senha: string) => void;
  logout: () => void;
}

const AuthContext = createContext<IAuthContext | undefined>(undefined);

export default function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, senha: string) => {
    try {
      const response = await api.get<User[]>(`?email=${email}&senha=${senha}`);
      if (response.data) {
        setUser(response.data[0]);
      }
    } catch (error) {}
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
