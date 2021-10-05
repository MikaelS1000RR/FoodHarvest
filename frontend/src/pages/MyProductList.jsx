import { useEffect, useState } from "react";
import { useProductList } from "../contexts/ProductListContext.jsx";
import { useProduct } from "../contexts/ProductContext.jsx";
import EditableProductCard from "../components/home/EditableProductCard";
import { useParams } from "react-router";

const MyProductList = () => {
  let { id } = useParams();
  const { fetchListById } = useProductList();
  const { fetchProductsByCode } = useProduct();
  const [products, setproducts] = useState(null);
  const [list, setList] = useState(null);

  useEffect(() => {
    let productCodes = [];
    const getList = async () => {
      let list = await fetchListById(id);
      setList(list);
      for (let product of list.products) {
        productCodes.push(product.productCode);
      }
      console.log(productCodes)
    };
    const getProducts = async () => {
      let products = await fetchProductsByCode(productCodes);
      setproducts(products);
      console.log(products);
    }
    getList().then(getProducts());
  }, []);



  if (!list) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="container">
        <h1>{list.name}</h1>
        <div className="row gy-3">
          {products &&
            products.map((p, index) => (
              <EditableProductCard
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
