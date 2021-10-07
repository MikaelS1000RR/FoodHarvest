// import { Row } from "reactstrap";
import ProductListCard from "../components/ProductListCard";
import { useModal } from "../contexts/ModalContext";
import { useProductList } from "../contexts/ProductListContext";

const MyListsPage = () => {
  const { favoriteList, productLists } = useProductList();
  const { toggleAddListModal } = useModal();

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
          <div onClick={toggleAddListModal}>
          <img
            
            className="plusImg"
            style={styles.plusImg}
            src="https://cdn-icons-png.flaticon.com/512/1828/1828817.png"
            alt="https://cdn-icons-png.flaticon.com/512/1828/1828817.png"
            />
            </div>
        </div>

        <div
          onClick={refreshPage}
          className="productLists"
          style={styles.productLists}
        >
          <ProductListCard props={favoriteList} key={favoriteList.id} />
          {productLists && productLists.length > 0
            ? productLists.map((list) => (
                <ProductListCard props={list} key={list.id} />
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
