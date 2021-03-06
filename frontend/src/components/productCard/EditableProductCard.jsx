import FavoriteButton from "./FavoriteButton";
import { useProductInfo } from "../../contexts/ProductInfoContext";
import { useModal } from "../../contexts/ModalContext";

const EditableProductCard = (props) => {
  const { product, classNames, index } = props;

  const { toggleDetailModal } = useModal();
  const { setCurrentProduct } = useProductInfo();

  return (
    <div className={classNames} index={index}>
      <div className={"card text-center"} style={styles.container}>
        <FavoriteButton styles={styles.favorite} product={product} />
        <div
          className="openModal"
          onClick={() => {
            setCurrentProduct(product);
            toggleDetailModal();
          }}
        >
          <div className="card-img-top" style={styles.image}>
            <img
              style={styles.image.content}
              src={product.imageUrl}
              alt={product.imageUrl}
            />
          </div>
          <div className="card-body">
            <h3>{ product.brand }</h3>
            <div>
              <h5 className="card-title">{product.productName}</h5>
              <p className="card-title">{product.brand}</p>
            </div>
            <h3>{product.price}kr</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditableProductCard;

const styles = {
  container: {
    cursor: "pointer",
    background: "white",
    width: "100%",
    minHeight: "400px",
    display: "flex",
    flexFlow: "row wrap",
    justifyContent: "flex-start",
  },
  button: {
    margin: "0 auto",
    width: "80%",
  },
  image: {
    width: "100%",
    height: "150px",
    verticalAlign: "middle",
    display: "flex",
    content: {
      objectFit: "contain",
      maxWidth: "100%",
      maxHeight: "100%",
      margin: "0 auto",
    },
  },
  favorite: {
    container: {
      hover: "pointer",
    },
    icon: {
      position: "absolute",
      top: 0,
      left: 0,
    },
  },
};
