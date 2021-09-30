import { Row } from "reactstrap";
import ProductListCard from "../components/ProductListCard"



const MyProductLists = () => {
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

        <ProductListCard />
      </div>
    </div>
  );
}
 
export default MyProductLists;

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
  },

  sparadeListor: {
    fontSize: "1.25rem",
    fontWeight: "bold",
  },

  plusImg: {
    height:"6vh"
  },
  plusAndP: {
    display: "flex",
    flexDirection: "Row",
    margin: "0",
    padding:"0"
  },
};