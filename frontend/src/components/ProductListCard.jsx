import { Button } from "reactstrap"
import { useEffect, useState } from "react";
import { useProductList } from "../contexts/ProductListContext";
const ProductListCard = (props) => {
  
 



  return (
    <>
      <div className="productCardContainer" style={styles.productCard}>
        <p></p>
      </div>
    </>
  );
}

export default ProductListCard;


const styles = {
  productCard: {
    minHeight: "20vh",
    background: "pink",
    display:"grid",
    alignContent:"center"
  },

  
};
