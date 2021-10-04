import { Button } from "reactstrap"
import { useEffect, useState } from "react";
import { useProductList } from "../contexts/ProductListContext";
import { Link } from "react-router-dom";

const ProductListCard = (props) => {

  return (
    <>
      <div>
        <Link to={`/myProductList/${props.props.id}`}>
          <div className="productCardContainer" style={styles.productCard}>
            <p>{props.props.name}</p>
          </div>
        </Link>
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
