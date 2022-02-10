import { createContext } from 'react';

export interface AuthContextState {
  isLoggedIn: boolean;
  userId?: string;
  login: (userId: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextState>({
  isLoggedIn: false,
  login: (userId: string) => {},
  logout: () => {},
});
