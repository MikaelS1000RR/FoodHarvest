import ProductCard from "../components/home/ProductCard";
import data from '../testData.js' // will be removed when real data is fetched
import React from "react";
import SearchBar from "../components/SearchBar";

const Home = () => {

  return (
    <div className="container" style={styles.container}>
      <SearchBar/>
      <div className="row gy-3">
        {data.products.map((p) => (
          <ProductCard
            product={p}
            classNames={"col-6 col-sm-4 col-md-3 col-lg-2"}
            buttonText="Lägg till"
          />
        ))}
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
