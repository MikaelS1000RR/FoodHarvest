import { useState } from "react";
import { useProductList } from "../contexts/ProductListContext";
import {
  DropdownToggle,
  DropdownMenu,
  Dropdown,
  DropdownItem,
} from "reactstrap";

const ProductListDropdown = (props) => {
  const { currentProductList, setCurrentProductList, productLists } = useProductList()
  const { setMenu } = props;
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setMenu(false);
    setIsOpen(!isOpen);
  }

  return (
    <Dropdown isOpen={isOpen} toggle={toggle}>
      <DropdownToggle color="warning" caret>
        {currentProductList ? currentProductList.name : "❤️ Välj lista"}
      </DropdownToggle>
      <DropdownMenu>
        {currentProductList ? (
          <DropdownItem header>Välj lista</DropdownItem>
        ) : null}
        {productLists
          ? productLists.map((list) => (
              <DropdownItem
                key={list.id}
                onClick={() => setCurrentProductList(list)}
              >
                {list.name}
              </DropdownItem>
            ))
          : null}
        <DropdownItem divider></DropdownItem>
        <DropdownItem>
          <span className="material-icons">add</span>
          Lägg till lista
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default ProductListDropdown;
