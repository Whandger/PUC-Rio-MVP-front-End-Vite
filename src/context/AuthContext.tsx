import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

interface User {
  id: string;
  username: string;
  email: string;
  photoUrl?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  register: (email: string, username: string, password: string) => Promise<boolean>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<boolean>;
  updateProfile: (data: Partial<User>) => void;
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
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const foundUser = users.find(
      (u: any) => u.username === username && u.password === password
    );

    if (foundUser) {
      const userData = {
        id: foundUser.id,
        username: foundUser.username,
        email: foundUser.email,
        photoUrl: foundUser.photoUrl, // carrega a foto salva
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

  const updateProfile = (data: Partial<User>) => {
    setUser(prev => {
      if (!prev) return null;
      const updated = { ...prev, ...data };
      localStorage.setItem('user', JSON.stringify(updated));

      // Atualiza também no array de usuários (para persistir entre sessões)
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const index = users.findIndex((u: any) => u.id === prev.id);
      if (index !== -1) {
        users[index] = { ...users[index], ...data };
        localStorage.setItem('users', JSON.stringify(users));
      }

      return updated;
    });
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
        updateProfile,
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