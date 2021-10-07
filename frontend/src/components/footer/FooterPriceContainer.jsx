import { useProductList } from "../../contexts/ProductListContext";
import { useAuth } from "../../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";

const FooterPriceContainer = (props) => {
  const history = useHistory();
  const { currentUser } = useAuth();
  const {
    hemkopTotalPrice,
    willysTotalPrice,
    getTotalPriceOfProducts,
    mathemTotalPrice,
    productsNotFound,
    currentProductList,
    favoriteList
  } = useProductList();
  
  const toggleCurrentList = (e) => {
    console.log("toggleCurrentList: ",currentProductList)
    if(!currentProductList){
    history.push(`/myProductList/${favoriteList.id}`)
    return;
    }
    history.push(`/myProductList/${currentProductList.id}`)
  }



  const checkIfProductsAreNotFound = (storeName) => {
    if (productsNotFound.includes(storeName)) {
      return "Vissa produkter kunde inte hittas"
    }
  }



  useEffect(() => {
    
      const getPrice = async () => {

        if (currentProductList && currentUser)
        {
         
          await getTotalPriceOfProducts(currentProductList);
        
        }
        //If currentProduct list inte finns med currentUser finns => get price of favoriteList
        if (!currentUser) {
       
          await getTotalPriceOfProducts(favoriteList);
        }
      
       
          
      }
    
      getPrice();
      
   
 }, [currentProductList, currentUser, favoriteList, getTotalPriceOfProducts]);
  
  
 
   

  return (
    <div className="container fixed-bottom" style={styles.container} onClick={toggleCurrentList}>
      <div className="cart" style={styles.cartSection}>
        <img
          src="https://cdn-icons-png.flaticon.com/512/879/879815.png"
          alt=""
          className="cart"
          style={styles.cart}
        />
        <div className="amountOfProducts" style={styles.amountOfProducts}>
          <p style={currentUser ? styles.show : styles.hide}>
            {currentProductList === null
              ? "0"
              : currentProductList.products.length}
          </p>

          <p style={currentUser ? styles.hide : styles.show}>
            {favoriteList.products.length}
          </p>
        </div>
      </div>
      <div className="willys" style={styles.storeSection}>
        <img
          src="https://www.orkla.se/app/uploads/sites/6/2019/09/Willys_logo.png"
          alt=""
          className="willysImg"
          style={styles.storeImg}
        />
        <p className="pWillys" style={currentUser ? styles.show : styles.hide}>
          {currentProductList === null ? "0 kr " : willysTotalPrice + " kr"}
        </p>

        <p style={currentUser ? styles.hide : styles.show}>
          {willysTotalPrice + " kr"}
        </p>

        <p className="productNotFound" style={styles.productNotFound}>
          {checkIfProductsAreNotFound("willys")}
        </p>
      </div>

      <div className="hemkop" style={styles.storeSection}>
        <img
          src="https://sesol.se/wp-content/uploads/2019/05/hemkop.png"
          alt=""
          className="hemkopImg"
          style={styles.hemkopImg}
        />
        <p className="pHemkop" style={currentUser ? styles.show : styles.hide}>
          {currentProductList === null ? "0 kr" : hemkopTotalPrice + " kr"}
        </p>
        <p style={currentUser ? styles.hide : styles.show}>
          {hemkopTotalPrice + " kr"}
        </p>
        <p className="productNotFound" style={styles.productNotFound}>
          {checkIfProductsAreNotFound("hemkop")}
        </p>
      </div>

      <div className="mathem" style={styles.storeSection}>
        <img
          src="https://dynassets1.gavekortet.dk/2/products/presentation_nxt/main_100899.jpg"
          alt=""
          className="mathemImg"
          style={styles.mathemImg}
        />
        <p style={currentUser ? styles.show : styles.hide}>
          {currentProductList === null ? "0 kr" : mathemTotalPrice + " kr"}
        </p>

        <p style={currentUser ? styles.hide : styles.show}>
          {mathemTotalPrice + " kr"}
        </p>

        <p className="productNotFound" style={styles.productNotFound}>
          {checkIfProductsAreNotFound("mathem")}
        </p>
      </div>
    </div>
  );
};

export default FooterPriceContainer;

const styles = {
  container: {
    width: "100%",
    height: "18vh",
    border: "solid",
    display: "grid",
    borderColor: "#dee2e6",
    gridTemplateColumns: "repeat(4, 1fr)",
    margin: "0",
    padding: "0",
    background: "white",
    //paddingBottom:"20vh"
  },
  cartSection: {
    display: "flex",
    flexDirection: "row",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "bold",
    borderRight: "solid",
    borderColor: "#dee2e6",
  },
  amountOfProducts: {
    marginBottom: "5vh",
  },

  cart: {
    width: "12vw",
  },

  productNotFound: {
    fontSize: "10px",
    paddingBottom:"40px"
  },

  storeSection: {
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "bold",
    borderRight: "solid",
    borderColor: "#dee2e6",
  
  },
  storeImg: {
    width: "100%",
    height:"5vh"
  },
  hemkopImg: {
    width: "90%",
  },
  pHemkop: {
   
    paddingTop: "1.5vh",
  },
  mathemImg: {
    height:"6vh",
  },
  hide: {
    display: "none",
  },
  show: {
    display: "inline",
  },
};
