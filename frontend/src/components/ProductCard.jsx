import React from 'react';


import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  PaginationLink,
} from "reactstrap";

const ProductCard = (props) => {
  const { product, classNames, buttonText } = props;



  return (
    <div className={classNames}>
      <div className={"card text-center"} style={styles.container}>
        <div className="card-img-top" style={styles.image}>
          <img
            className=""
            style={styles.image.image}
            src={product.imageUrl}
            alt={product.imageUrl}
          />
        </div>
        <div className="card-body">
          <h5 className="card-title">{product.displayName}</h5>
          <h3>{product.price}</h3>
          <div className="btn btn-primary" style={styles.button}>{buttonText}</div>
        </div>
      </div>

    </div>
  );
};

export default ProductCard;

const styles = {
  container: {
    background: "white",
    width: "100%",
    height: "300px"
  },
  button: {
    width: "80%",
    borderRadius: "100px",
  },
  image: {
    width: "100%",
    height: "50%",
    verticalAlign: "middle",
    display: "flex",
    image: {
      objectFit: "contain",
      maxWidth: "100%",
      maxHeight: "100%",
      margin: "0 auto"
    },
  },
};
