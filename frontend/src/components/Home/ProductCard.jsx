import React, { useState } from "react";
import FavoriteButton from "./FavoriteButton";
import DetailModal from "../DetailModal";

const ProductCard = (props) => {
  const { product, classNames, buttonText, isFavorite } = props;

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={classNames}>
      <div className={"card text-center"} style={styles.container}>
        <FavoriteButton
          styles={styles.favorite}
          productId={product.id}
          isFavorite={isFavorite}
        />
        <div className="card-img-top" style={styles.image}>
          <div className="openModal" onClick={() => setIsOpen(true)}>
            {isOpen && <DetailModal closeModal={setIsOpen} />}
            <img
              className=""
              style={styles.image.content}
              src={product.imageUrl}
              alt={product.imageUrl}
            />
          </div>
        </div>
          <div className="card-body">
            <div>
              <h5 className="card-title">{product.productName}</h5>
              <p className="card-title">
                {product.brand + " " + product.quantity + product.quantityUnit}
              </p>
            </div>
            <h3>{product.price}kr</h3>
            <div className="btn btn-primary" style={styles.button}>
              {buttonText}
            </div>
          </div>
      </div>
    </div>
  );
};

export default ProductCard;

const styles = {
  container: {
    background: "white",
    width: "100%",
    minHeight: "400px",
    display: "flex",
    flexFlow: "row wrap",
    justifyContent: "flex-start"
  },
  button: {
    width: "80%",
    minWidth: "100%",
    borderRadius: "100px",
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
      margin: "0 auto"
    },
  },
  favorite: {
    container: {
      hover: "pointer"
    },
    icon: {
      position: "absolute",
      top: 0,
      left: 0
    }
  }
};
