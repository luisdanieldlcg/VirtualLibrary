import React, { createContext, useContext, useState } from "react";

interface User {
  idUser: string;
  fullName: string;
  userName: string;
  email: string;
  avatarUrl: string;
}

interface AuthContext {
  user: User | null;
  setUser: (user: User | null) => void;
}
const AuthContext = createContext<AuthContext>({
  user: null,
  setUser: () => {},
});

interface Props {
  children: React.ReactNode;
}
export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
