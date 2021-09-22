import React, { useState } from 'react';
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


        
        <NavbarBrand className="text-white" href="/">FoodHarvest</NavbarBrand>
        <NavbarToggler onClick={toggleHamburgerMenu} />
        <Collapse isOpen={hamburgerMenu} navbar>
          <Nav className="mr-auto" navbar className="text-white">
            <div>!!!Inte inloggad</div>
            {/* not logged in */}
            <NavItem>
              <NavLink href="/catagories/" className="text-white">Kategorier</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/login/" className="text-white">Logga in</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/register/" className="text-white">Registrera dig</NavLink>
            </NavItem>
            {/* Logged in */}
            <div>!!!När inloggad</div>
            <NavItem>
              <NavLink href="/myProductListPage/" className="text-white">Inköpslistor</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/catagories/" className="text-white">Kategorier</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/myProfile/" className="text-white">Mina sidor</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/" className="text-white">Logga ut</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default Example;