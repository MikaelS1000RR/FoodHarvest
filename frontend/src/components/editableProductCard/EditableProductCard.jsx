const EditableProductCard = (props) => {
  const { product, classNames} = props;

  return (
    <div className={"card mb-3 " + classNames} style={styles.container}>
      <div className="row g-0" style={styles.spread}>
        <div className="col-2" style={styles.spread}>
          <img
            src={product.imageUrl}
            className="img-fluid rounded-start"
            alt={product.imageUrl}
            style={styles.image}
          />
        </div>
        <div className="col-6">
          <div className="card-body">
            <h5 className="card-title">{product.productName}</h5>
            <p className="card-text">{product.brand}</p>
            <h3 className="card-text">{product.price} kr</h3>
          </div>
        </div>
        <div className="col-2">
          <div className="card-body">hej</div>
        </div>
        <div className="col-2">
          <div className="card-body">
            <span className="material-icons">delete</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditableProductCard;

const styles = {
  container: {
    height: "200px",
    width: "100%",
  },
  spread: {
    height: "100%"
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
    margin: "0 auto",
  },
};