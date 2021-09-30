import React from 'react';
import FavoriteButton from "../home/FavoriteButton";
import DetailModal from "../DetailModal";
import { useModal } from "../../contexts/ModalContext";
import { useProductInfo } from "../../contexts/ProductInfoContext";


const SearchResult = ({searchResult}, props) => {

  const {classNames, buttonText, isFavorite, index } = props;

  const { toggleDetailModal } = useModal()
  const { setCurrentProduct } = useProductInfo();

    return (
      <div className={classNames} index={index}>
      <div className={"card text-center"} style={styles.container}>
        <FavoriteButton
          styles={styles.favorite}
          productId={searchResult.id}
          isFavorite={isFavorite}
        />
        <div className="openModal" onClick={() => {
          setCurrentProduct(searchResult) 
          toggleDetailModal()
        }}>
          <div className="card-img-top" style={styles.image}>
            <img
              className=""
              style={styles.image.content}
              src={searchResult.imageUrl}
              alt={searchResult.imageUrl}
            />
          </div>
          <div className="card-body">
            <div>
              <h5 className="card-title">{searchResult.foodType}</h5>
              <p className="card-title">{searchResult.brand}</p>
            </div>
            <h3>{searchResult.price}kr</h3>
          </div>
        </div>
        <div className="btn btn-primary" style={styles.button}>
          {buttonText}
        </div>
      </div>
      <DetailModal product={searchResult} index={index} />
    </div>
      );
};

export default SearchResult;

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