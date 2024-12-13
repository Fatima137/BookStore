import { createContext, useContext, useState } from 'react';
import { useRouter } from 'next/router';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // User state
  const router = useRouter();

  const login = (email, token) => {
    setUser({ email, token });
    localStorage.setItem('token', token); // Optional: Persist session
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token'); // Clear session
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
