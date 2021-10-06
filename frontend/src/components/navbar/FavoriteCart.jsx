import { useProductList } from "../../contexts/ProductListContext";

const FavoriteCart = () => {
  const { favoriteList } = useProductList();

  const toFavorites = async () => {
    console.log("Clicked favorite icon");
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
