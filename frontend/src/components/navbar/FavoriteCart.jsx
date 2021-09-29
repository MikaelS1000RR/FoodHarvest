import { useState } from "react";
import { useProductList } from "../../contexts/ProductListContext";

const FavoriteCart = () => {
  const { favoriteList } = useProductList()

  const toFavorites = async () => {
    let message = await fetch("api/", {
      headers: {
        "Content-Type": "application/json",
        'Accept': "application/json",
      },
    });
    console.log("before");
    message = await message.json();
    console.log("after");
    console.log(message);
  }

  return (
    <div>
      <div className="btn btn-light bg-transparent" onClick={toFavorites}>
          <span className="material-icons">favorite</span>
          {favoriteList.length}
      </div>
    </div>
  );
}
 
export default FavoriteCart;