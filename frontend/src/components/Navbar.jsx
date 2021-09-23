import React, { useState } from 'react';
import { useModal } from "../contexts/ModalContext";
import { Link } from 'react-router-dom';
import {
  Button,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  DropdownToggle,
  DropdownMenu,
  Dropdown
} from 'reactstrap';

const Navigationbar = (props) => {
  const { toggleLoginModal, toggleRegisterModal, toggleCategoryModal } = useModal()

  const [hamburgerMenu, setHamburgerMenu] = useState(false);
  const toggleHamburgerMenu = () => setHamburgerMenu(!hamburgerMenu);

  const [chooseListDropDown, setChooseListDropDown] = useState(false);
  const toggleChooseListDropDown = () => {
    setHamburgerMenu(false);
    setChooseListDropDown(!chooseListDropDown);
  }
  return (
    <div>
      <Navbar color="primary" light expand="md">
        <Nav className="mr-auto" navbar>
          <Dropdown
            isOpen={chooseListDropDown}
            toggle={toggleChooseListDropDown}
          >
            <DropdownToggle color="warning" caret>
              ❤️ Välj lista
            </DropdownToggle>
            <DropdownMenu>
              <div>Grönsaker</div>
              <div>test</div>
              <div>test</div>
              <div>Lägg till en lista +</div>
            </DropdownMenu>
          </Dropdown>
        </Nav>

        <Link to="/" style={styles.link}>
          <NavbarBrand className="text-white">FoodHarvest</NavbarBrand>
        </Link>
        <NavbarToggler onClick={toggleHamburgerMenu} />
        <Collapse isOpen={hamburgerMenu} navbar>
          <Nav className="mr-auto" navbar style={styles.nav}>
            <div>!!!Inte inloggad</div>
            {/* not logged in */}
            <NavItem style={styles.link}>
              <Button
                className="text-white bg-transparent btn-outline-primary"
                onClick={toggleLoginModal}
              >
                Logga in
              </Button>
            </NavItem>
            <NavItem style={styles.link}>
              <Button
                className="text-white bg-transparent btn-outline-primary"
                onClick={toggleRegisterModal}
              >
                Registrera dig
              </Button>
            </NavItem>
            <NavItem style={styles.link}>
              <Button
                className="text-white bg-transparent btn-outline-primary"
                onClick={toggleCategoryModal}
              >
                Kategorier
              </Button>
            </NavItem>

            {/* Logged in */}
            <div>!!!När inloggad</div>
            <NavItem style={styles.link}>
              <Link
                to="/myProductLists/"
                className="text-white btn"
                style={styles.link}
              >
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
              <Link
                to="/myProfile/"
                className="text-white btn"
                style={styles.link}
              >
                Mina sidor
              </Link>
            </NavItem>
            <NavItem>
              <Link to="/" className="text-white btn" style={styles.link}>
                Logga ut
              </Link>
            </NavItem>
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