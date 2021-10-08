import { Link } from "react-router-dom";

const ProductListCard = (props) => {
  return (
    <>
      <div>
        <Link
          to={`/myProductList/${props.props.id}`}
          style={{ textDecoration: "none" }}
        >
          <div className="productCardContainer" style={styles.productCard}>
            <div style={styles.circle}></div>
            <p className="listName" style={styles.listName}>
              {props.props.name}
            </p>
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

    alignContent: "center",
    borderRadius: "20px",
    fontSize: "1.25rem",
    fontWeight: "bold",
    cursor: "pointer",
    display: "flex",
    textAlign: "center",
    marginLeft: "14vw",
  },
  circle: {
    borderRadius: "100%",
    height: "5vh",
    width: "9vw",
    marginRight: "15vw",
    background: "blue",
  },
  listName: {
    textDecoration: "none !important",
    color: "black",
  },
};
