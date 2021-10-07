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
        <div className="col-10">
          <div className="card-body">
            <h5 className="card-title">Card title</h5>
            <p className="card-text">
              This is a wider card with supporting text below as a natural
              lead-in to additional content. This content is a little bit
              longer.
            </p>
            <p className="card-text">
              <small className="text-muted">Last updated 3 mins ago</small>
            </p>
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