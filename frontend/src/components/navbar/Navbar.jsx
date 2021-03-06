import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
} from 'reactstrap';
import GuestNav from './GuestNav';
import UserNav from './UserNav';
import ProductListDropdown from './ProductListDropdown';
import FavoriteCart from './FavoriteCart'
import { useAuth } from '../../contexts/AuthContext';

const Navigationbar = (props) => {
  const { currentUser } = useAuth();
  const [hamburgerMenu, setHamburgerMenu] = useState(false);
  const toggleHamburgerMenu = () => setHamburgerMenu(!hamburgerMenu);

  return (
    <div>
      <Navbar color="primary" light expand="md">
        <Nav className="mr-auto" navbar>
          <ProductListDropdown setMenu={setHamburgerMenu} />
        </Nav>
        <Nav className="mr-auto" navbar>
          <FavoriteCart setMenu={setHamburgerMenu} />
        </Nav>

        <Link to="/" style={styles.link}>
          <NavbarBrand className="text-white">FoodHarvest</NavbarBrand>
        </Link>

        <NavbarToggler onClick={toggleHamburgerMenu} />

        <Collapse isOpen={hamburgerMenu} navbar>
          <Nav className="mr-auto" navbar style={styles.nav}>
            {currentUser ? (
              <UserNav styles={styles} />
            ) : (
              <GuestNav styles={styles} />
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default Navigationbar;

const styles = {
  link: {
    textDecoration: 'none',
    height: "100",
    display: "flex",
    justifyContent: "right"

  },
  nav: {
    display: "flex",
    justifyContent: "right",
    flex: "1"
  }
}