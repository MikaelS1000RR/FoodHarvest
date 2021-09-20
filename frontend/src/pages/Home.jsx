import ProductCard from "../components/ProductCard";

const Home = () => {

  // only for test to display the cards, Shall be removed when real data is fetched
  const products = [
    {
      displayName: "Potatis",
      imageUrl:
        "https://www.hejsamtalonline.se/wp-content/uploads/2020/06/Hej-logo-favicon.png",
      price: 10
    },
    {
      displayName: "Potatis3",
      imageUrl:
        "https://www.coca-cola.se/content/dam/one/se/sv/products/coca-cola-lemon-px1500.jpg",
    },
    {
      displayName: "Potatis2",
      imageUrl:
        "https://www.hejsamtalonline.se/wp-content/uploads/2020/06/Hej-logo-favicon.png",
    },
    {
      displayName: "Potatis32",
      imageUrl:
        "https://www.hb.se/globalassets/global/akademi-3/blockbilder-761/bildblockhej-bara-grafik.jpg?quality=95&mode=min&v=259891",
    },
  ];

  return (
    <div className="container" style={styles.container}>
      <div className="row">
        {products.map(p =>
          <ProductCard
            product={p}
            classNames={"col-6 col-sm-4 col-md-3 col-lg-2"}
            buttonText="Lägg till" />)
        }
      </div>
    </div>
   );
}
 
export default Home;

const styles = {
  container: {
    minWidth: "100vw",
    background: "pink"
  },
};