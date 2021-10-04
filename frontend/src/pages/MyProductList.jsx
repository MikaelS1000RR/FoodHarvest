import ProductListCard from "../components/ProductListCard";
import { useEffect, useState } from "react";
import { useProductList } from "../contexts/ProductListContext.jsx";
import ProductCard from "../components/home/ProductCard";
import firestore from "../database_config/firestore";
import { useParams } from "react-router";

const MyProductList = () => {
  let { id } = useParams();
  const { fetchListById } = useProductList();
  const [products, setproducts] = useState(null);

  useEffect(() => {
    const getProducts = async () => {
      let list = await fetchListById(id);
      let products = list.products;
      setproducts(products);
    };
    getProducts();
  }, []);

  if (!products) {
    return <div>Loading...</div>;
  } else if (!products.length) {
    return <div>There's no products yet...</div>;
  } else {
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
};

export default MyProductList;
