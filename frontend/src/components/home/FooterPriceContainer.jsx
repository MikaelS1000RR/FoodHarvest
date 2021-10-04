import React, { useState } from "react";

const FooterPriceContainer = (props) => {


  return (
    <div className="container" style={styles.container}>
      <div className="amountOfProducts" style={styles.storeSection}>
        <img
          src="https://cdn-icons-png.flaticon.com/512/879/879815.png"
          alt=""
          className="cart"
          style={styles.cart}
        />
        <p>2</p>
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
        <p className="pHemkop" style={styles.pHemkop}>2 kr</p>
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
}

export default FooterPriceContainer

const styles = {
  container: {
    width: "100%",
    height: "15vh",
    border: "double",
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    margin: "0",
    padding: "0",
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
    borderRight: "double",
  },
  storeImg: {
    width: "100%",
  },
  hemkopImg: {
    width: "90%",
  },
  pHemkop: {
    marginBottom: "1.5vh",
    paddingTop:"1.5vh"
  }
};