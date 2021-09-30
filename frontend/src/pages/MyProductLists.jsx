import ProductListCard from "../components/ProductListCard"

const MyProductLists = () => {
  return (
    <div className="container" style={styles.container}>
      <div className="listsContainer" style={styles.listsContainer}>
        <ProductListCard />
      </div>
    </div>
  );
}
 
export default MyProductLists;

const styles = {
  container: {
   height:"70vh",
    background: "pink",
    marginTop:"8vh",
  },
  listsContainer: {
    /* minWidth: "100vw",

    height: "60vh", */
  },
};