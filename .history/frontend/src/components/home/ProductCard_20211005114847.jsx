import FavoriteButton from "./FavoriteButton";
import DetailModal from "../modals/DetailModal";
import { useProductInfo } from "../../contexts/ProductInfoContext";
import { useModal } from "../../contexts/ModalContext";
import AddProductButton from "./AddProductButton";

const ProductCard = (props) => {
  const { product, classNames, index } = props;

  const { toggleDetailModal } = useModal()
  const { setCurrentProduct } = useProductInfo();

const clickedHere = () => {
  console.log('Clicked on "Lägg till" button.');
}

const fetchStoreAndProduct = async (products) => {
  const productCodes = [];
  const price = 0;
  for(let product of products) {
    let pCode = product.productCode.substring(0,12)
    console.log('Here is the product code ', );
  }
} 

  return (
    <div className={classNames} index={index}>
      <div className={"card text-center"} style={styles.container}>
        <FavoriteButton styles={styles.favorite} product={product} 
        />
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
            <div>
              <h5 className="card-title">{product.productName}</h5>
              <p className="card-title">{product.brand}</p>
            </div>
            <h3>{product.price}kr</h3>
          </div>
        </div>
        <div style={styles.button} onClick={clickedHere}> {/* Add onClick. Create a function that adds prices.*/}
          
          <AddProductButton product={product}/>
          
         
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
