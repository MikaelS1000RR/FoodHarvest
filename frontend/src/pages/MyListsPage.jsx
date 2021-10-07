// import { Row } from "reactstrap";
import ProductListCard from "../components/ProductListCard";
import { useProductList } from "../contexts/ProductListContext";
import { useAuth } from "../contexts/AuthContext";

const MyListsPage = () => {
  const { favoriteList, productLists } = useProductList();
  const { currentUser } = useAuth();

  const refreshPage = ()=>{
    window.location.reload();
 }
  
  return (
    <div className="container" style={styles.container}>
      <div className="listsContainer" style={styles.listsContainer}>
        <div className="plusAndP" style={styles.plusAndP}>
          <p className="sparadeListor" style={styles.sparadeListor}>
            Sparade listor
          </p>
          <img
            className="plusImg"
            style={styles.plusImg}
            src="https://cdn-icons-png.flaticon.com/512/1828/1828817.png"
            alt="https://cdn-icons-png.flaticon.com/512/1828/1828817.png"
          />
        </div>

        <div onClick={refreshPage} className="productLists" style={styles.productLists}>
          
            {productLists && productLists.length > 0
              ? productLists.map((list, index) => (
               <ProductListCard props={list} key={index} />
                ))
              : null}

          
        </div>
      </div>
    </div>
  );
};


export default MyListsPage;

const styles = {
  container: {
    height: "70vh",

    marginTop: "8vh",
  },
  listsContainer: {
    height: "100%",
    display: "flex",
    flexDirection: "Column",
    textAlign: "center",
    itemsAlign: "center",
    gridGap: "5vh"
  },

  sparadeListor: {
    fontSize: "1.25rem",
    fontWeight: "bold",
  },

  plusImg: {
    height: "4vh",
    marginLeft: "8vw",
    cursor: "pointer",
  },

  plusAndP: {
    display: "flex",
    flexDirection: "Row",
    margin: "0",
    padding: "0",
    justifyContent: "center",
  },

  productLists: {
    display: "flex",
    flexDirection: "Column",
    gridGap: "10vw",
  },
};
