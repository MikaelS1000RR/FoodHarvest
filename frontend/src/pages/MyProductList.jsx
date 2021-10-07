import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { useProductList } from "../contexts/ProductListContext.jsx";
import { useProduct } from "../contexts/ProductContext.jsx";
import EditableProductCard from "../components/editableProductCard/EditableProductCard.jsx";

const MyProductList = () => {
  let { id } = useParams();
  const { fetchListById } = useProductList();
  const { fetchProductsByCode } = useProduct();
  const [products, setproducts] = useState();
  const [list, setList] = useState();
  

  useEffect(() => {
      getList();
      console.log("UseEffect");
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
    console.log(products);
  };
  

  if (list == null || products == null) {
    return <div>Loading...</div>;
  } else {
      return (
        <div className="container">
          <h1>{list.name}</h1>
          <div className="row gy-3">
            {products &&
            products.map((p, index) => (
              <EditableProductCard
                key={p.productCode + index}
                product={p}
              />
            ))}
          </div>
        </div>
      );
  }
};

export default MyProductList;
