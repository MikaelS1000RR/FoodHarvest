import { useState } from "react";
import { useProductList } from "../../contexts/ProductListContext";

const FavoriteButton = (props) => {
  const { styles, product, isFavorite } = props
  const [isToggle, setIsToggle] = useState(isFavorite || false);
  const { addProductToFavorite, removeProductFromFavorite, fetchAllLists } = useProductList();

  const toggle = async () => {
    let isSucceed = false
    if (!isToggle) {
      isSucceed = await addProductToFavorite(product);
    }
    else {
      isSucceed = await removeProductFromFavorite(product);
    }
    if (isSucceed) {
      setIsToggle(!isToggle);
      fetchAllLists();
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