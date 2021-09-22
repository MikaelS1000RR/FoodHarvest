import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
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


        <Link to="/">
          <NavbarBrand className="text-white">FoodHarvest</NavbarBrand>
        </Link>
        <NavbarToggler onClick={toggleHamburgerMenu} />
        <Collapse isOpen={hamburgerMenu} navbar>
          <Nav className="mr-auto" navbar className="text-white">
            <div>!!!Inte inloggad</div>
            {/* not logged in */}
            <NavItem>
              <Link to="/catagories/" className="text-white">Kategorier</Link>
            </NavItem>
            {/* Logged in */}
            <div>!!!När inloggad</div>
            <NavItem>
              <Link to="/myProductLists/" className="text-white">Inköpslistor</Link>
            </NavItem>
            <NavItem>
              <Link to="/catagories/" className="text-white">Kategorier</Link>
            </NavItem>
            <NavItem>
              <Link to="/myProfile/" className="text-white">Mina sidor</Link>
            </NavItem>
            <NavItem>
              <Link to="/" className="text-white">Logga ut</Link>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default Example;