import { createContext, useState } from "react";

export const LoginModalContext = createContext();

const LoginModalContextProvider = (props) => {
  const [showLoginModal, setShowLoginModal] = useState(false);

  const toggleLoginModal = () => {
    setShowLoginModal(!showLoginModal);
  };

  const values = {
    showLoginModal,
    setShowLoginModal,
    toggleLoginModal,
  };

  return (
    <LoginModalContext.Provider value={values}>
      {props.children}
    </LoginModalContext.Provider>
  );
}

export default LoginModalContextProvider;
