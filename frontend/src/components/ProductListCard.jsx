import { Button } from "reactstrap"
import { useEffect, useState } from "react";
import { useProductList } from "../contexts/ProductListContext";
const ProductListCard = (props) => {
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);
  return (
    <>
      <div className="productCardContainer  " style={styles.productCard} background={randomColor}>
        <div className="circle" style={styles.circle}></div>
        <p>{props.props}</p>
       
      </div>
    </>
  );
}

export default ProductListCard;


const styles = {
  productCard: {
    minHeight: "15vh",
  
  
    alignContent: "center",
    borderRadius: "20px",
    fontSize: "1.25rem",
    fontWeight: "bold",
    cursor: "pointer",
    display: "flex",
    textAlign: "center",
    marginLeft:"14vw"

  },
  circle: {
    borderRadius: "100%",
    background: "pink",
    height: "5vh",
    width: "9vw",
    marginRight:"15vw"
    
  }
};
