import { useProductList } from "../../contexts/ProductListContext";

const FavoriteCart = () => {
  const { favoriteList } = useProductList();

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
