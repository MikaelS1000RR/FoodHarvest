import { useState } from "react";
import { Button } from "reactstrap";
import { useAuth } from "../../contexts/AuthContext";
import { useModal } from "../../contexts/ModalContext";
import { useProductList } from "../../contexts/ProductListContext";

const AddProductButton = (props) => {
  const { product } = props;
  const [ isInProductList, setIsInProductList] = useState(false)
  const { currentProductList, updateProductToList } = useProductList();
  const { toggleAddListModal, toggleLoginModal } = useModal();
  const { currentUser } = useAuth();

  const updateProduct = async (toAdd) => {
    if (!currentUser) {
      toggleLoginModal();
      return;
    } else if (!currentProductList) {
      toggleAddListModal();
      return;
    }

    let isSucceed = await updateProductToList(
      currentProductList,
      product,
      toAdd,
      currentUser
    );
    if (isSucceed) {
      setIsInProductList(!isInProductList);
    }
  };

  return (
    <>
      {!isInProductList ? (
        <Button color="primary" style={styles.button} onClick={() => updateProduct(true)}>
          Lägg till
          console.log('c');
        </Button>
      ) : (
        <Button color="secondary" style={styles.button} onClick={() => updateProduct(false)}>
          Ta bort
        </Button>
      )}
    </>
  );
}
 
export default AddProductButton;

const styles = {
  button: {
    borderRadius: "100px",
    width: "100%",
  },
};