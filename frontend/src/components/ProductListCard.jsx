import { Button } from "reactstrap"
import { useEffect, useState } from "react";
import { useProductList } from "../contexts/ProductListContext";
const ProductListCard = (props) => {

  return (
    <>
      <div className="productCardContainer" style={styles.productCard}>
        <p>{props.props}</p>
       
      </div>
    </>
  );
}

export default ProductListCard;


const styles = {
  productCard: {
    minHeight: "15vh",
  
    display: "grid",
    alignContent: "center",
    borderRadius: "20px",
    fontSize: "1.25rem",
    fontWeight: "bold",
    borderStyle: "double",
    cursor: "pointer"
  },
};
