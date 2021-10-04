import ProductListCard from "../components/ProductListCard"
import { useEffect, useState } from "react";
import { useProductList } from "../contexts/ProductListContext";
import ProductCard from "../components/home/ProductCard";
import firestore from "../database_config/firestore";




  const MyProductList = () => {

  const [products, setproducts] = useState(null);
  
    useEffect(() => {
    listenForproducts();
    }, []);
  
    const listenForproducts = () => {
    firestore.collection('test-products').onSnapshot(
      (snapshot) => {
        // Loop through the snapshot and collect
        // the necessary info we need. Then push
        // it into our array
        const allproducts = [];
        snapshot.forEach((doc) => allproducts.push({ id: doc.id, ...doc.data() }));

        // Set the collected array as our state
        setproducts(allproducts);
      },
      (error) => console.error(error)
    );
  };

    if (!products) {
    return (<div>Loading...</div>)
  }
  else if (!products.length) {
    return (<div>There's no products yet...</div>)
  }
  else {
    return (
      <div className="container">
        <div className="row gy-3">
          {products.map((p, index) => (
            <ProductCard
              index={index}
              key={index}
              product={p}
              classNames={"col-6 col-sm-4 col-md-3 col-lg-2"}
              buttonText="Lägg till"
              />
          ))}
        </div>
     
      </div>
    );
  }
}
 
export default MyProductList;
