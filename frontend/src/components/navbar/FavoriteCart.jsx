import { useProductList } from "../../contexts/ProductListContext";
import { useHistory } from "react-router-dom";


const FavoriteCart = () => {
  const { favoriteList } = useProductList();
  const history = useHistory();

  const toFavorites = async () => {
    history.push(`/myProductList/${favoriteList.id}`)
  };

  return (
    <div>
      <div className="btn btn-light bg-transparent" onClick={toFavorites}>
        <span className="material-icons">favorite</span>
        {favoriteList.products ? favoriteList.products.length : null}
      </div>
    </div>
  );
};

export default FavoriteCart;
