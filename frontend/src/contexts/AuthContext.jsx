import { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../database_config/firestore";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
}

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();

  const signup = (email, password) => {
    return auth.createUserWithEmailAndPassword(email, password);
  };
  const login = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password);
  };
  const logout =

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
    signup
  }
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;