// import ProductListCard from "../components/ProductListCard";
import { useEffect, useState } from "react";
import { useProductList } from "../contexts/ProductListContext.jsx";
// import firestore from "../database_config/firestore";
import { useParams } from "react-router";
import { useProduct } from "../contexts/ProductContext.jsx";
import EditableProductCard from "../components/editableProductCard/EditableProductCard.jsx";

const MyProductList = () => {
  let { id } = useParams();
  const { fetchListById } = useProductList();
  const [products, setProducts] = useState(null);
  const [list, setList] = useState(null);
  const { fetchProducts } = useProduct();

  useEffect(() => {
    const getProducts = async () => {
      console.log("fetching");
      // let list = await fetchListById(id);
      // setList(list);
      // let products = list.products;
      // setproducts(products);
      let options = {
        category: {
          id: "IlSvBi8NtSSs8u4Gybxj",
        },
      };

      let newProducts = await fetchProducts(options);
      setProducts(newProducts)
      console.log(newProducts);
    };
    getProducts();
  }, [id]);

  if (!products) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="container">
        {/* <h1>{list.name}</h1> */}
          {products &&
            products.map((p, index) => (
              <EditableProductCard
                index={index}
                key={index}
                product={p}
                classNames={""}
                buttonText="Lägg till"
              />
            ))}
      </div>
    );
  }
};

export default MyProductList;
