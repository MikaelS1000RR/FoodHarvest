import { useContext } from "react";
import { ModalContext } from "../contexts/ModalContextProvider";
import { Button, NavItem } from "reactstrap";
import { Link } from "react-router-dom";

const GuestNav = (props) => {
  const { styles } = props;
  const { toggleLoginModal, toggleRegisterModal } = useContext(ModalContext);
  return (
    <>
      <NavItem>
        <Button
          className="text-white bg-transparent btn-outline-primary"
          onClick={toggleLoginModal}
        >
          Logga in
        </Button>
      </NavItem>
      <NavItem>
        <Button
          className="text-white bg-transparent btn-outline-primary"
          onClick={toggleRegisterModal}
        >
          Registrera dig
        </Button>
      </NavItem>
      <NavItem>
        <Link to="/catagories/" className="text-white" style={styles.link}>
          Kategorier
        </Link>
      </NavItem>
    </>
  );
};

export default GuestNav;
