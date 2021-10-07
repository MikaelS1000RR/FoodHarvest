import { useState } from "react";
import { Button, Input } from "reactstrap";

const EditQuantityButton = (props) => {
  const { product } = props;
  const [quantity, setQuantity] = useState(1);
  return (
    <div style={styles.container}>
      <button className="btn btn-secondary" style={styles.button}>
        <span className="material-icons">add</span>
      </button>
      <input type="number" className="form-control" value={quantity} />
      <button className="btn btn-secondary" style={styles.button}>
        <span className="material-icons">remove</span>
      </button>
    </div>
  );
}
 
export default EditQuantityButton;

const styles = {
  container: {
    display: "grid",
    gridTemplateColumns: "30px 1fr 30px",
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