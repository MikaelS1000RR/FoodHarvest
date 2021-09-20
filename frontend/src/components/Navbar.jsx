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
              <NavLink href="/components/">Components</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Options
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  Option 1
                </DropdownItem>
                <DropdownItem>
                  Option 2
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
                  Reset
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
          <NavbarText>Simple Text</NavbarText>
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