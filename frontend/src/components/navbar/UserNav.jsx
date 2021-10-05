import { Link } from "react-router-dom";
import { NavItem, Button } from "reactstrap";
import { useModal } from "../../contexts/ModalContext";
import { useAuth } from "../../contexts/AuthContext";

const UserNav = (props) => {
  const { styles } = props;
  const { toggleCategoryModal } = useModal()
  const { logout } = useAuth();
  return (
    <>
      <Button
        className="text-white bg-transparent btn-outline-primary"
        >
        <Link to="/myListsPage/" className="text-white" style={styles.link}>
          Inköpslistor
        </Link>
      </Button>
      <NavItem style={styles.link}>
        <Button
          className="text-white bg-transparent btn-outline-primary"
          onClick={toggleCategoryModal}
        >
          Kategorier
        </Button>
      </NavItem>
      <Button className="text-white bg-transparent btn-outline-primary">
        <Link to="/myProfile/" className="text-white" style={styles.link}>
          Mina sidor
        </Link>
      </Button>
      <NavItem>
        <Link to="/" className="text-white" style={styles.link}>
          <Button
            className="text-white bg-transparent btn-outline-primary"
            onClick={logout}
          >
            Logga ut
          </Button>
        </Link>
      </NavItem>
    </>
  );
};

export default UserNav;
