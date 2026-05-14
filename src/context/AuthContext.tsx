import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

interface User {
  id: string;
  username: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  register: (email: string, username: string, password: string) => Promise<boolean>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // Carregar usuário do localStorage ao iniciar
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    // Simula uma chamada de API
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const foundUser = users.find(
      (u: any) => u.username === username && u.password === password
    );

    if (foundUser) {
      const userData = {
        id: foundUser.id,
        username: foundUser.username,
        email: foundUser.email,
      };
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      return true;
    }
    return false;
  };

  const register = async (email: string, username: string, password: string): Promise<boolean> => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Verificar se usuário já existe
    if (users.some((u: any) => u.username === username || u.email === email)) {
      return false;
    }

    const newUser = {
      id: Date.now().toString(),
      username,
      email,
      password,
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    // Auto-login após registro
    const userData = {
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
    };
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const forgotPassword = async (email: string): Promise<boolean> => {
    // Simula envio de email
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userExists = users.some((u: any) => u.email === email);
    
    if (userExists) {
      console.log('Email de recuperação enviado para:', email);
      return true;
    }
    return false;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        forgotPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}