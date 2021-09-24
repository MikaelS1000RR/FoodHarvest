import { createContext, useState } from "react";

export const ModalContext = createContext();

const ModalContextProvider = (props) => {
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
    // for product detail modal
  const [showDetailModal, setShowDetailModal] = useState(false);
  const toggleDetailModal = () => {
    setShowDetailModal(!showDetailModal);
  };

  const values = {
    showLoginModal,
    setShowLoginModal,
    toggleLoginModal,
    showRegisterModal,
    setShowRegisterModal,
    toggleRegisterModal,
    showDetailModal,
    setShowDetailModal,
    toggleDetailModal
  };

  return (
    <ModalContext.Provider value={values}>
      {props.children}
    </ModalContext.Provider>
  );
}

export default ModalContextProvider;
