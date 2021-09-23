import { createContext, useState, useContext } from "react";

export const ModalContext = createContext();

export const useModal = () => {
  return useContext(ModalContext);
}

const ModalProvider = (props) => {
  // for login modal
  const [showLoginModal, setShowLoginModal] = useState(false);
  const toggleLoginModal = () => {
    setShowLoginModal(!showLoginModal);
  };
  // for register modal
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const toggleRegisterModal = () => {
    setShowRegisterModal(!showRegisterModal);
  };
  // for categories modal
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const toggleCategoryModal = () => {
    setShowCategoryModal(!showCategoryModal);
  };

  const values = {
    showLoginModal,
    setShowLoginModal,
    toggleLoginModal,
    showRegisterModal,
    setShowRegisterModal,
    toggleRegisterModal,
    showCategoryModal,
    setShowCategoryModal,
    toggleCategoryModal,
  };

  return (
    <ModalContext.Provider value={values}>
      {props.children}
    </ModalContext.Provider>
  );
}

export default ModalProvider;
