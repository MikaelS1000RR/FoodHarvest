import FavoriteButton from "./FavoriteButton";
import AddProductButton from "./AddProductButton"
import { useProductInfo } from "../../contexts/ProductInfoContext";
import { useModal } from "../../contexts/ModalContext";

const ProductCard = (props) => {
  const { product, classNames} = props;
  const { toggleDetailModal } = useModal()
  const { setCurrentProduct } = useProductInfo();

  return (
    <div className={classNames} >
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
              className=""
              style={styles.image.content}
              src={product.imageUrl}
              alt={product.imageUrl}
            />
          </div>
          <div className="card-body">
            <div>
              <h6 className="card-title">{product.productName}</h6>
              <p className="card-title">{product.brand}</p>
            </div>
          </div>
        </div>
        <div className="p-3 mt-auto">
            <h4>{product.price}kr</h4>
          <AddProductButton product={product} />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

const styles = {
  container: {
    cursor: "pointer",
    background: "white",
    width: "100%",
    minHeight: "400px",
    display: "flex",
    justifyContent: "flex-start",
    boxShadow:
      "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
    margin:"4px"
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
      marginTop: "2rem",
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
