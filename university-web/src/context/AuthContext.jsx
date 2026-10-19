import React, { createContext, useState } from "react";
import axios from "axios";

// Create Context
export const AuthContext = createContext();

// The token lives in localStorage, but axios headers are reset on every page
// reload. Attach it at module load time (synchronously) so child components
// that fetch on mount already send the Authorization header.
const storedToken = localStorage.getItem("userToken");
if (storedToken) {
  axios.defaults.headers.common["Authorization"] = `Token ${storedToken}`;
}

// Create Provider
export const AuthProvider = ({ children }) => {

  // Restore the user after a page refresh.
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem("userToken");
    if (!token) return null;
    return { username: localStorage.getItem("username") || "User" };
  });

  // login function
  const login = (userData) => {
    setUser(userData);

    if (userData && userData.username) {
      localStorage.setItem("username", userData.username);
    }
  };

  // logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("userToken");
    localStorage.removeItem("username");
    delete axios.defaults.headers.common["Authorization"];
  };

  return (
    //Pass values to the Provider
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
