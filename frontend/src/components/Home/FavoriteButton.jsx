import { useState } from "react";

const FavoriteButton = (props) => {
  const { styles, productId, isFavorite } = props
  const [isToggle, setIsToggle] = useState(isFavorite || false);

  const toggle = (id) => {
    console.log("id of favorite: ", id)
    setIsToggle(!isToggle);
  }



  return (
    <div className="favorite-button" style={styles.container}>
      <div className="btn btn-light" style={styles.icon} onClick={() => toggle(productId)}>
        <span className="material-icons">
          {isToggle ? 'favorite' : 'favorite_border'}
        </span>
      </div>
    </div>
  );
}
 
export default FavoriteButton;