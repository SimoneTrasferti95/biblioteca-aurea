import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { meRequest, logoutRequest } from "../api/auth";

type User = {
  id: number;
  fullName: string;
  email: string;
  role: "ADMIN" | "USER";
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  refreshUser: () => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = async () => {
    try {
      const data = await meRequest();
      setUser(data);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await logoutRequest();
    } finally {
      setUser(null);
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);

  const value = useMemo(
    () => ({
      user,
      loading,
      isAuthenticated: !!user,
      refreshUser,
      logout,
    }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth deve essere usato dentro AuthProvider");
  }

  return context;
}