import React, { createContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);

  const login = (token, mentorId) => {
    setAuth({ token, mentorId });
    localStorage.setItem("auth", JSON.stringify({ token, mentorId }));
  };

  const logout = () => {
    setAuth(null);
    localStorage.removeItem("auth");
  };

  const restoreAuth = () => {
    const savedAuth = localStorage.getItem("auth");
    if (savedAuth) setAuth(JSON.parse(savedAuth));
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout, restoreAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
