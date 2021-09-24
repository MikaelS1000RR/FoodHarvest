import { useState } from "react";

import {
  DropdownToggle,
  DropdownMenu,
  Dropdown,
  DropdownItem,
} from "reactstrap";

const ProductListDropdown = (props) => {
  const { setMenu } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [currentList, setCurrentList] = useState(null)
  const toggle = () => {
    setMenu(false);
    setIsOpen(!isOpen);
  }

  const selectList = (e) => {
    console.log(e.target.value);
    setCurrentList(e.target.value);
  }

  return (
    <Dropdown isOpen={isOpen} toggle={toggle}>
      <DropdownToggle color="warning" caret>
        { currentList ? currentList : "❤️ Välj lista" }
      </DropdownToggle>
      <DropdownMenu>
        { currentList ? <DropdownItem header>Välj lista</DropdownItem> : null }
        <DropdownItem>Välj lista</DropdownItem>
        <DropdownItem value="click moi!" onClick={selectList}>Click me</DropdownItem>
        <DropdownItem divider></DropdownItem>
        <DropdownItem><span className="material-icons">add</span> Lägg till lista</DropdownItem>

      </DropdownMenu>
    </Dropdown>
  );
};

export default ProductListDropdown;
