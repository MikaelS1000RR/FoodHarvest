import { Row } from "reactstrap";
import ProductListCard from "../components/ProductListCard";
import { useEffect, useState } from "react";
import { useProductList } from "../contexts/ProductListContext";

const MyListsPage = () => {
  const listName = "list Name";
  const { fetchProductLists } = useProductList();
  const { productLists } = useProductList();
  const [lists, setLists] = useState([]);
  useEffect(() => {
    const getList = async () => {
      let list = await fetchProductLists("z7fNsrT4HdfDYHLZHs3MdMxOulw2");
      console.log("lists in pages are ", list);
      setLists(list);
    };
    getList();
  }, [listName]);

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
          />
        </div>

        <div className="productLists" style={styles.productLists}>
          <ProductListCard />

          <ProductListCard />

          <p></p>
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
    //background: "pink",
    height: "100%",
    display: "flex",
    flexDirection: "Column",
    textAlign: "center",
    itemsAlign: "center",
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
    gridGap: "4vw",
  },
};
