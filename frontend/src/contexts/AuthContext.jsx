import { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../database_config/firestore";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
}

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  const signup = (email, password) => {
    return auth.createUserWithEmailAndPassword(email, password);
  };
  const login = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password);
  };
  const logout = () => {
    return auth.signOut();
  }

  useEffect(() => {
    const unsubsribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
    })
    return unsubsribe;
  }, [])

  auth.onAuthStateChanged(user => {
    setCurrentUser(user);
  })

  const value = {
    currentUser,
    login,
    logout,
    signup
  }
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;