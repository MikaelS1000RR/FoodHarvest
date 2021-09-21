const FavoriteButton = (props) => {

  const { styles, productId } = props

  const toggle = (id) => {
  }

  return (
    <div className="favorite-button" style={styles.container}>
      <div className="btn btn-light" style={styles.icon} onClick={() => toggle(productId)}>
        <span className="material-icons">
          favorite_border
        </span>
      </div>
    </div>
  );
}
 
export default FavoriteButton;