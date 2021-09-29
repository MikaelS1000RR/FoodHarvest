import { useState } from "react";
import { useProductList } from "../../contexts/ProductListContext";

const FavoriteCart = () => {
  const { favoriteList } = useProductList()
  return (
    <div>
      <div className="btn btn-light bg-transparent">
          <span className="material-icons">favorite</span>
          {favoriteList.length}
      </div>
    </div>
  );
}
 
export default FavoriteCart;