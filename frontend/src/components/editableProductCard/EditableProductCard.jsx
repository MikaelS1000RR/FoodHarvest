import { Button } from "reactstrap";
import EditQuantityButton from "./EditQuantityButton";

const EditableProductCard = (props) => {
  const { product, classNames} = props;

  return (
    <div className={"card mb-3 " + classNames} style={styles.container}>
      <div className="row" style={styles.spread}>
        <div className="col-2" style={styles.spread}>
          <img
            src={product.imageUrl}
            className="img-fluid rounded-start"
            alt={product.imageUrl}
            style={styles.image}
          />
        </div>
        <div className="col-4 col-md-5 col-lg-6">
          <h5 className="card-title">{product.productName}</h5>
          <p className="card-text">{product.brand}</p>
          <h3 className="card-text">{product.price} kr</h3>
        </div>
        <div className="col-4 col-md-3 col-lg-2">
          <EditQuantityButton product={product} />
        </div>
        <div className="col-2">
          <button className="btn btn-secondary" style={styles.delete}>
            <span className="material-icons">delete</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditableProductCard;

const styles = {
  container: {
    height: "200px",
    width: "100%",
  },
  spread: {
    height: "100%"
  },
  delete: {
    width: "100%",
    height: "100%",
    textAlign: "center",
    padding: "0"
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
    margin: "0 auto",
  },
};