import { useEffect, useState } from "react";
import { useProductList } from "../../contexts/ProductListContext";

const FooterPriceContainer = (props) => {
  const currentList=''
  const { currentProductList } = useProductList();

  useEffect(() => {
    const getCurrentList = async () => {
      console.log('currentList is ', currentProductList)
    };
    getCurrentList();
  }, [currentList]);

  return (
    <div className="container" style={styles.container}>
      <div className="cart" style={styles.cartSection}>
        <img
          src="https://cdn-icons-png.flaticon.com/512/879/879815.png"
          alt=""
          className="cart"
          style={styles.cart}
        />
        <div className="amountOfProducts" style={styles.amountOfProducts}>
          <p>2</p>
        </div>
      </div>
{// work here}
      <div className="willys" style={styles.storeSection}>
        <img
          src="https://www.orkla.se/app/uploads/sites/6/2019/09/Willys_logo.png"
          alt=""
          className="willysImg"
          style={styles.storeImg}
        />
        <p>2 kr</p> {/* change this */}
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
    width: "100%",
    height: "15vh",
    border: "solid",
    display: "grid",
    borderColor: "#dee2e6",
    gridTemplateColumns: "repeat(4, 1fr)",
    margin: "0",
    padding: "0",
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
    marginBottom: "1.5vh",
    paddingTop: "1.5vh",
  },
};
