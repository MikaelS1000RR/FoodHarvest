import { useEffect, useState } from "react";
import { useProductList } from "../../contexts/ProductListContext";
import { useAuth } from "../../contexts/AuthContext";

const FooterPriceContainer = (props) => {
  const { currentProductList } = useProductList();
  const { favoriteList } = useProductList();
  const { currentUser } = useAuth();

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
              ? "loading..."
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
        <p>2 kr</p>
      </div>
      <div className="hemkop" style={styles.storeSection}>
        <img
          src="https://sesol.se/wp-content/uploads/2019/05/hemkop.png"
          alt=""
          className="hemkopImg"
          style={styles.hemkopImg}
        />
        <p className="pHemkop" style={styles.pHemkop}>
          2 kr
        </p>
      </div>
      <div className="mathem" style={styles.storeSection}>
        <img
          src="https://dynassets1.gavekortet.dk/2/products/presentation_nxt/main_100899.jpg"
          alt=""
          className="mathemImg"
          style={styles.storeImg}
        />
        <p>2 kr</p>
      </div>
    </div>
  );
};

export default FooterPriceContainer;

const styles = {
  container: {
    position: "relative",
    width: "10%",
    border: "solid",
    display: "table",
    borderColor: "#dee2e6",
    gridTemplateColumns: "repeat(4, 1fr)",
    margin: "0px 0px 610px 60px",
    padding: "0",
    background:"white",
    transform: "ranslateY(-50%)",
   
  
    
  },
  cartSection: {
    display: "flex",
    flexDirection: "row",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "bold",
    borderBottom: "solid",
    borderColor: "#bfcad4",
  },

  amountOfProducts: {
    marginBottom: "5vh",
  },

  cart: {
    width: "12vw",
  },

  storeSection: {
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "bold",
    borderBottom: "solid",
    borderColor: "#bfcad4",
  },
  storeImg: {
    width: "100%",
  },
  hemkopImg: {
    width: "90%",
  },
  pHemkop: {
    marginBottom: "1.5vh",
    paddingTop: "1.5vh",
  },
  hide: {
    display: "none",
  },
  show: {
    display: "inline",
  },
};
