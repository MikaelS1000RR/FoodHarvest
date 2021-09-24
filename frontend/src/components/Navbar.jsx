import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  DropdownToggle,
  DropdownMenu,
  Dropdown
} from 'reactstrap';
import GuestNav from './GuestNav';
import UserNav from './UserNav';

const Navigationbar = (props) => {
  const { currentUser } = useAuth();
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
            {currentUser
              ? <UserNav styles={styles} />
              : <GuestNav styles={styles} />
            }
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