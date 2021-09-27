import { useState } from "react";
import { useProductList } from "../contexts/ProductListContext";
import { useModal } from "../contexts/ModalContext";
import { useAuth } from "../contexts/AuthContext";
import {
  DropdownToggle,
  DropdownMenu,
  Dropdown,
  DropdownItem,
} from "reactstrap";

const ProductListDropdown = (props) => {
  const { currentUser } = useAuth();
  const { currentProductList, setCurrentProductList, productLists } = useProductList();
  const { toggleAddListModal, toggleLoginModal } = useModal();
  const { setMenu } = props;
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    if (currentUser) {
      setMenu(false);
      setIsOpen(!isOpen);
    }
    else {
      toggleLoginModal();
    }
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
        <DropdownItem onClick={toggleAddListModal}>
          <span className="material-icons">add</span>
          Lägg till lista
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default ProductListDropdown;