import { useProductList } from "../../contexts/ProductListContext";
import { useAuth } from "../../contexts/AuthContext";
import { useProduct } from "../../contexts/ProductContext";
import { createContext, useContext, useState, useEffect } from "react";

const FooterPriceContainer = (props) => {
  const { currentProductList } = useProductList();
  const { favoriteList } = useProductList();
  const { currentUser } = useAuth();
  const {
    hemkopTotalPrice,
    willysTotalPrice,
    getTotalPriceOfProducts,
    mathemTotalPrice,
    productsNotFound,
  } = useProductList();


  

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
      
   
 }, );
  
  
 
   

  return (
    <div className="container fixed-bottom" style={styles.container}>
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
          {willysTotalPrice}
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
          {hemkopTotalPrice}
        </p>
        <p className="productNotFound" style={styles.productNotFound}></p>
      </div>

      <div className="mathem" style={styles.storeSection}>
        <img
          src="https://dynassets1.gavekortet.dk/2/products/presentation_nxt/main_100899.jpg"
          alt=""
          className="mathemImg"
          style={styles.storeImg}
        />
        <p>{currentProductList === null ? "0 kr" : mathemTotalPrice + " kr"}</p>
        <p style={currentUser ? styles.hide : styles.show}>
          {mathemTotalPrice}
        </p>

        <p className="productNotFound" style={styles.productNotFound}></p>
      </div>
    </div>
  );
};

export default FooterPriceContainer;

const styles = {
  container: {
    width: "100%",
    height: "15vh",
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
  },
  hemkopImg: {
    width: "90%",
  },
  pHemkop: {
   
    paddingTop: "1.5vh",
  },
  hide: {
    display: "none",
  },
  show: {
    display: "inline",
  },
};
