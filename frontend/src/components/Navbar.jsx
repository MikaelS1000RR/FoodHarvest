import React, { useState, useContext } from 'react';
import { LoginModalContext } from "../contexts/LoginModalContextProvider";
import { Link } from 'react-router-dom';
import {
  Button,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
  Dropdown
} from 'reactstrap';

const Example = (props) => {
  const { toggleLoginModal } = useContext(LoginModalContext)

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
           <Dropdown isOpen={chooseListDropDown} toggle={toggleChooseListDropDown}>
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
            <NavItem>
              <Button
                className="text-white bg-transparent btn-outline-primary"
                onClick={toggleLoginModal}
              >
                Logga in
              </Button>
            </NavItem>
            <NavItem>
              <NavLink href="/register/" className="text-white">
                Registrera dig
              </NavLink>
              <Link to="/catagories/" className="text-white" style={styles.link}>Kategorier</Link>
            </NavItem>
            {/* Logged in */}
            <div>!!!När inloggad</div>
            <NavItem>
              <Link to="/myProductLists/" className="text-white" style={styles.link}>Inköpslistor</Link>
            </NavItem>
            <NavItem>
              <Link to="/catagories/" className="text-white" style={styles.link}>Kategorier</Link>
            </NavItem>
            <NavItem>
              <Link to="/myProfile/" className="text-white" style={styles.link}>Mina sidor</Link>
            </NavItem>
            <NavItem>
              <Link to="/" className="text-white" style={styles.link}>Logga ut</Link>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default Example;

const styles = {
  link: {
    textDecoration: 'none',
    height: "100",
    padding: "10px",
    display: "flex",
    justifyContent: "right"

  },
  nav: {
    display: "flex",
    justifyContent: "right",
    flex: "1"
    
  }
  
}