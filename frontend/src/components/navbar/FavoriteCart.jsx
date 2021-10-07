import { useProductList } from "../../contexts/ProductListContext";
import {useHistory} from "react-router-dom"

const FavoriteCart = () => {
  const { favoriteList } = useProductList();
  const history = useHistory();

  const redirectToFavorites = () => {
    history.push(`/myProductList/${favoriteList.id}`)
    window.location.reload();
  };

  return (
    <div>
      <div className="btn btn-light bg-transparent" onClick={redirectToFavorites}>
        <span className="material-icons">favorite</span>
        {favoriteList.products ? favoriteList.products.length : null}
      </div>
    </div>
  );
};

export default FavoriteCart;
