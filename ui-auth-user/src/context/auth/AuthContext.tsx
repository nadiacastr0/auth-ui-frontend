import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import * as authApi from "../../api/auth/auth";

interface AuthContextData {
  email: string | null;
  token: string | null;
  profiles: string[];
  login: (email: string, password: string) => Promise<string[]>;  // <-- aqui
  logout: () => void;
  register: (
    name: string,
    email: string,
    password: string,
    cpf: string,
    profiles: string[]
  ) => Promise<void>;
  changePassword: (
    email: string,
    currentPassword: string,
    newPassword: string
  ) => Promise<void>;
  error: string | null;
  clearError: () => void;
}


const AuthContext = createContext<AuthContextData | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [email, setEmail] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [profiles, setProfiles] = useState<string[]>([]);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedEmail = localStorage.getItem("email");
    const storedProfiles = localStorage.getItem("profiles");
    if (storedToken && storedEmail && storedProfiles) {
      setToken(storedToken);
      setEmail(storedEmail);
      setProfiles(JSON.parse(storedProfiles));
    }
  }, []);

  const login = async (email: string, password: string): Promise<string[]> => {
    try {
      setError(null);
      const response = await authApi.login({ email, password });
      setToken(response.token);
      setEmail(response.email);
      setProfiles(response.profiles || []);
      localStorage.setItem("token", response.token);
      localStorage.setItem("email", response.email);
      localStorage.setItem("profiles", JSON.stringify(response.profiles || []));
      return response.profiles || [];
    } catch (error) {
      setError("Invalid credentials");
      setToken(null);
      setEmail(null);
      setProfiles([]);
      localStorage.removeItem("token");
      localStorage.removeItem("email");
      localStorage.removeItem("profiles");
      throw error;
    }
    
  };

  const logout = () => {
    setToken(null);
    setEmail(null);
    setProfiles([]);
    setError(null);
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("profiles");
  };

  const register = async (
    name: string,
    email: string,
    password: string,
    cpf: string,
    profiles: string[]
  ) => {
    try {
      setError(null);
      await authApi.register({ name, email, password, cpf, profiles });
    } catch (error) {
      setError("Registration failed");
      throw error;
    }
  };

  const changePassword = async (
    email: string,
    currentPassword: string,
    newPassword: string
  ) => {
    try {
      setError(null);
      await authApi.changePassword({ email, currentPassword, newPassword });
    } catch (error) {
      setError("Password change failed");
      throw error;
    }
  };

  const clearError = () => {
    setError(null);
  };

  return (
    <AuthContext.Provider
      value={{
        email,
        token,
        profiles,
        login,
        logout,
        register,
        changePassword,
        error,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
