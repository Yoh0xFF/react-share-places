import React, { createContext } from 'react';

export interface AuthContextState {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextState>({
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});
