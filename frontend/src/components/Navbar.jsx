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

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">reactstrap</NavbarBrand>
        <NavbarToggler onClick={toggle} />
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
      </Navbar>
    </div>
  );
}

export default Example;


// import React, { useState } from 'react';

// import {
//   Collapse,
//   Navbar,
//   NavbarToggler,
//   NavbarBrand,
//   Nav,
//   NavItem,
//   NavLink,
//   UncontrolledDropdown,
//   DropdownToggle,
//   DropdownMenu,
//   DropdownItem,
//   Dropdown,
//   NavbarText
// } from 'reactstrap';

// const Example = (props) => {
//   // const [isOpen, setIsOpen] = useState(false);

//   // const toggle = () => setIsOpen(!isOpen);

//   // -----------------------------------------

//   const [navDropdownOpen, setDropdownOpen] = useState(false);
//   const toggleNavDropdown = () => {
//     setDropdownOpen(!navDropdownOpen);
//   }

//   const [chooseListDropDown, setChooseListDropDown] = useState(false);
//   const toggleChooseListDropDown = () => {
//     setChooseListDropDown(!chooseListDropDown);
//   }


//   return (
//     <div>
//       <Navbar color="primary" light expand="md">
//         {/* <NavbarToggler onClick={toggle} /> */}
//         {/* <Collapse isOpen={isOpen} navbar> */}
//         <Nav className="mr-auto" navbar>
//           <Dropdown isOpen={navDropdownOpen} toggle={toggleNavDropdown}>
//             <DropdownToggle caret>
//               ≡
//             </DropdownToggle>
//             <DropdownMenu>
//               <div>Inte inloggad</div>
//               {/* not logged in */}
//               <NavItem>
//                 <NavLink href="/catagories/">Kategorier</NavLink>
//               </NavItem>
//               <NavItem>
//                 <NavLink href="/login/">Logga in</NavLink>
//               </NavItem>
//               <NavItem>
//                 <NavLink href="/register/">Registrera dig</NavLink>
//               </NavItem>
//               {/* Logged in */}
//               <div>När inloggad</div>
//               <NavItem>
//                 <NavLink href="/myProductListPage/">Inköpslistor</NavLink>
//               </NavItem>
//               <NavItem>
//                 <NavLink href="/catagories/">Kategorier</NavLink>
//               </NavItem>
//               <NavItem>
//                 <NavLink href="/myProfile/">Mina sidor</NavLink>
//               </NavItem>
//               <NavItem>
//                 <NavLink href="/">Logga ut</NavLink>
//               </NavItem>
//             </DropdownMenu>
//           </Dropdown>
//         </Nav>
//         {/* </Collapse> */}
//         <NavbarBrand href="/">FoodHarvest</NavbarBrand>
//         {/* Second dropdown */}
//         <Nav className="mr-auto" navbar>
//           <Dropdown isOpen={chooseListDropDown} toggle={toggleChooseListDropDown}>
//             <DropdownToggle caret>
//               ❤️ Välj lista
//             </DropdownToggle>
//             <DropdownMenu>
//               <div>test</div>
//               <div>test</div>
//               <div>test</div>
//               <div>Lägg till en lista +</div>
//             </DropdownMenu>
//           </Dropdown>
//         </Nav>
//       </Navbar>
//     </div>
//   );
// }

// export default Example;




// old code


// import React, { useState } from 'react';
// import {
//   Collapse,
//   Navbar,
//   NavbarToggler,
//   NavbarBrand,
//   Nav,
//   NavItem,
//   NavLink,
//   UncontrolledDropdown,
//   DropdownToggle,
//   DropdownMenu,
//   DropdownItem,
//   NavbarText
// } from 'reactstrap';

// const Example = (props) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isOpen2, setIsOpen2] = useState(false);

//   const open1 = () => {
//     setIsOpen(!isOpen);
//     setIsOpen2(false);
//   }
//   const open2 = () => {
//     setIsOpen2(!isOpen2);
//     setIsOpen(false);
//   }

//   return (
//     <div>
//       <Navbar color="primary" light expand="md">
//         <NavbarToggler onClick={open1} />
//         <NavbarBrand href="/">FoodHarvest</NavbarBrand>
//         <NavbarToggler onClick={open2} />

//         {/* First dropdown */}
//         {/* Collapse är det som syns i mobilversionen */}
//         <Collapse isOpen={isOpen} navbar>
//           <Nav className="mr-auto text-center" navbar>
//             <div>Inte inloggad</div>
//             {/* not logged in */}
//             <NavItem>
//               <NavLink href="/catagories/">Kategorier</NavLink>
//             </NavItem>
//             <NavItem>
//               <NavLink href="/login/">Logga in</NavLink>
//             </NavItem>
//             <NavItem>
//               <NavLink href="/register/">Registrera dig</NavLink>
//             </NavItem>
//             {/* Logged in */}
//             <div>När inloggad</div>
//             <NavItem>
//               <NavLink href="myProductListPage">Inköpslistor</NavLink>
//             </NavItem>
//             <NavItem>
//               <NavLink href="/catagories/">Kategorier</NavLink>
//             </NavItem>
//             <NavItem>
//               <NavLink href="myProfile">Mina sidor</NavLink>
//             </NavItem>
//             <NavItem>
//               <NavLink href="/">Logga ut</NavLink>
//             </NavItem>

//           </Nav>

//         </Collapse>

//         {/* second dropdown */}

//         <Collapse isOpen={isOpen2} navbar>
//           {/* text-center works but not text-right  */}
//           <Nav className="mr-auto text-center text-md-right" navbar>

//           <div>test</div>
//           <div>test</div>
//           <div>test</div>
//           <div>Lägg till en lista +</div>
//           </Nav>
//         </Collapse>


//       </Navbar>
//     </div>
//   );
// }

// export default Example;