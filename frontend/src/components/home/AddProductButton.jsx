import { useState } from "react";
import { Button } from "reactstrap";
import { useAuth } from "../../contexts/AuthContext";
import { useModal } from "../../contexts/ModalContext";
import { useProductList } from "../../contexts/ProductListContext";

const AddProductButton = (props) => {
  const { buttonText, product } = props;
  const [ isInProductList, setIsInProductList] = useState(false)
  const { currentProductList, addProductToCurrentList } = useProductList();
  const { toggleAddListModal, toggleLoginModal } = useModal();
  const { currentUser } = useAuth();

  const addProduct = () => {
    if (!currentUser) {
      toggleLoginModal();
      return
    }
    else if (!currentProductList) {
      toggleAddListModal();
      return
    }

    let isSucceed = addProductToCurrentList(product);
    if (isSucceed) {
      setIsInProductList(!isInProductList)
    }
  }

  return (
      <Button style={styles.button} onClick={addProduct} disabled={isInProductList}>
        {buttonText}
      </Button>
  );
}
 
export default AddProductButton;

const styles = {
  button: {
    borderRadius: "100px",
    width: "100%",
  },
};