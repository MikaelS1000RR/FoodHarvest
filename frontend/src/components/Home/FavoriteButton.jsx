import { useState } from "react";
import { useProductList } from "../../contexts/ProductListContext";
import { useAuth } from "../../contexts/AuthContext"

const FavoriteButton = (props) => {
  const { styles, product, isFavorite } = props
  const [isToggle, setIsToggle] = useState(isFavorite || false);
  const { updateProductToFavorite } = useProductList();
  const { currentUser } = useAuth();

  const toggle = async () => {
    let toAdd = !isToggle
    let isSucceed = await updateProductToFavorite(product, toAdd);
    if (isSucceed) {
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