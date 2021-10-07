import { useState } from "react";

const EditQuantityButton = (props) => {
  const { product } = props;
  const [quantity, setQuantity] = useState(product.productQuantity || 1);
  const increment = () => {
    setQuantity(quantity + 1)
  }
  const decrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }
  return (
    <div style={styles.container}>
      <button
        className="btn btn-secondary"
        style={styles.button}
        onClick={increment}
      >
        <span className="material-icons">add</span>
      </button>
      <input type="number" className="form-control" value={quantity} />
      <button
        className="btn btn-secondary"
        style={styles.button}
        onClick={decrease}
      >
        <span className="material-icons">remove</span>
      </button>
    </div>
  );
}
 
export default EditQuantityButton;

const styles = {
  container: {
    display: "grid",
    gridTemplateColumns: "1fr 2fr 1fr",
    background: "grey",
    borderRadius: "500px",
  },
  button: {
    width: "100%",
    padding: 0,
    background: "transparent",
    border: "none"
  },
};