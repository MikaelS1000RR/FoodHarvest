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
  NavbarText
} from 'reactstrap';

const Example = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);


  // const toggle = () => setIsOpen(!isOpen);
  // const toggle2 = () => setIsOpen2(!isOpen2);


  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarToggler onClick={() => setIsOpen(!isOpen)} />
        <NavbarBrand href="/">FoodHarvest</NavbarBrand>
        <NavbarToggler onClick={() => setIsOpen2(!isOpen2)} />

        {/* First dropdown */}

        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="/catagories/">Kategorier</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/login/">Logga in</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/register/">Registrera dig</NavLink>
            </NavItem>
            {/* Add more links */}
            
          </Nav>
          
        </Collapse>

        {/* second dropdown */}

        <Collapse isOpen={isOpen2} navbar>
          <div>test</div>
          <div>test</div>
          <div>test</div>
          <div>test</div>
        </Collapse>


      </Navbar>
    </div>
  );
}

export default Example;