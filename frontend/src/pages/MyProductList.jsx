import { useEffect, useState } from "react";
import { useProductList } from "../contexts/ProductListContext.jsx";
import { useProduct } from "../contexts/ProductContext.jsx";
import EditableProductCard from "../components/productCard/EditableProductCard";
import { useParams } from "react-router";

const MyProductList = () => {
  let { id } = useParams();
  const { fetchListById } = useProductList();
  const { fetchProductsByCode } = useProduct();
  const [products, setproducts] = useState();
  const [list, setList] = useState();
  

  useEffect(() => {
      getList();
    }, []);

  const getList = async () => {
    const productCodes = [];
    let list = await fetchListById(id);
    setList(list);
      for (let product of list.products) {
        productCodes.push(product.productCode);
      }
      await getProducts(productCodes);
  };

  const getProducts = async (productCodes) => {
    let newProducts = await fetchProductsByCode(productCodes);
      setproducts(newProducts);
  };
  

  if (list == null || products == null) {
    return <div>Loading...</div>;
  } else {
      return (
        <div className="container">
          <h1>{list.name}</h1>
          <div className="row gy-3">
            { (products.length !== 0) &&
              products.map((p, index) => (
                <EditableProductCard
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
