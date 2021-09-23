import { Link } from "react-router-dom";
import { NavItem, Button } from "reactstrap";
import { useModal } from "../contexts/ModalContext";

const UserNav = (props) => {
  const { styles } = props;
  const { toggleCategoryModal } = useModal()

  return (
    <>
      <NavItem>
        <Link to="/myProductLists/" className="text-white" style={styles.link}>
          Inköpslistor
        </Link>
      </NavItem>
      <NavItem style={styles.link}>
        <Button
          className="text-white bg-transparent btn-outline-primary"
          onClick={toggleCategoryModal}
        >
          Kategorier
        </Button>
      </NavItem>
      <NavItem>
        <Link to="/myProfile/" className="text-white" style={styles.link}>
          Mina sidor
        </Link>
      </NavItem>
      <NavItem>
        <Link to="/" className="text-white" style={styles.link}>
          Logga ut
        </Link>
      </NavItem>
    </>
  );
};

export default UserNav;
