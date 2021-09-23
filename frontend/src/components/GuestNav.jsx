import { Button, NavItem } from "reactstrap";
import { useModal } from "../contexts/ModalContext";

const GuestNav = (props) => {
  const { styles } = props;
  const { toggleLoginModal, toggleRegisterModal, toggleCategoryModal } = useModal()
  return (
    <>
      <NavItem style={styles.link}>
        <Button
          className="text-white bg-transparent btn-outline-primary"
          onClick={toggleCategoryModal}
        >
          Kategorier
        </Button>
      </NavItem>
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
    </>
  );
};

export default GuestNav;
