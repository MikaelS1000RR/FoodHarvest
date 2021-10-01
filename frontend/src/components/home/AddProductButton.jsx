import { useProductList } from "../../contexts/ProductListContext";

const AddProductButton = (props) => {
  const { buttonText, product } = props;
  const { addProductToCurrentList } = useProductList();

  const addProduct = () => {
    let isSucceed = addProductToCurrentList(product);
    if (isSucceed) {
      
    }
  }

  return (
      <div className="btn btn-primary" style={styles.button} onClick={addProduct}>
        {buttonText}
      </div>
  );
}
 
export default AddProductButton;

const styles = {
  button: {
    borderRadius: "100px",
    width: "100%",
  },
};