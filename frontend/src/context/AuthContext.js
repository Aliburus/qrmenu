import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // LocalStorage'dan admin bilgilerini al
    const adminInfo = localStorage.getItem("adminInfo");
    if (adminInfo) {
      setAdmin(JSON.parse(adminInfo));
    }
    setLoading(false);
  }, []);

  const login = (adminData) => {
    setAdmin(adminData);
  };

  const logout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminInfo");
    setAdmin(null);
  };

  return (
    <AuthContext.Provider value={{ admin, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
