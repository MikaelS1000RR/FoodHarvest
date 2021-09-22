import ProductCard from "../components/Home/ProductCard";
import data from '../testData.js' // will be removed when real data is fetched
import DetailModal from "../components/DetailModal";
import React, { useState } from "react";

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="container" style={styles.container}>
      <div className="row gy-3">
        {data.products.map((p) => (
          <ProductCard
            product={p}
            classNames={"col-6 col-sm-4 col-md-3 col-lg-2"}
            buttonText="Lägg till"
          />
        ))}
      </div>
      <button className="openModal" onClick={()=> setIsOpen(true)}>Show modal</button>
      {isOpen && <DetailModal closeModal={setIsOpen} />}
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
