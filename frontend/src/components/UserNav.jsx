import { Link } from "react-router-dom";
import {
  NavItem
} from "reactstrap";

const UserNav = (props) => {
  const { styles } = props;
  return (
    <>
      <NavItem>
        <Link to="/myProductLists/" className="text-white" style={styles.link}>
          Inköpslistor
        </Link>
      </NavItem>
      <NavItem>
        <Link to="/catagories/" className="text-white" style={styles.link}>
          Kategorier
        </Link>
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
