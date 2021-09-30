import { useState } from "react";
import { useProductList } from "../../contexts/ProductListContext";

const FavoriteButton = (props) => {
  const { styles, product, isFavorite } = props
  const [isToggle, setIsToggle] = useState(isFavorite || false);
  const { addProductToFavorite, removeProductFromFavorite } = useProductList();

  const toggle = () => {
    let res = false;
    if (!isToggle) {
      res = addProductToFavorite(product);
    }
    else {
      // removeProductFromFavorite(product);
    }
    if (res) {
      setIsToggle(!isToggle);
    }
  }



  return (
    <div className="favorite-button" style={styles.container}>
      <div className="btn btn-light" style={styles.icon} onClick={() => toggle()}>
        <span className="material-icons">
          {isToggle ? 'favorite' : 'favorite_border'}
        </span>
      </div>
    </div>
  );
}
 
export default FavoriteButton;