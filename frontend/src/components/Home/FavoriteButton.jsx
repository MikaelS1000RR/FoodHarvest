const FavoriteButton = (props) => {

  const { styles, productId } = props

  return (
    <div className="favorite-button" style={styles.container}>
      <div className="btn btn-light" style={styles.icon}>
        <span className="material-icons">
          favorite_border
        </span>
      </div>
    </div>
  );
}
 
export default FavoriteButton;