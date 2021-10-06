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
  let [key, setKey] = useState(1288);
  const productCodes = [];

  useEffect(() => {
    console.log("UseEffect")
    if (products === null) {
      getList();
    }
    }, []);

  const getList = async () => {
    let list = await fetchListById(id);
    setList(list);
      for (let product of list.products) {
        productCodes.push(product.productCode);
      }
      await getProducts(productCodes).then(setKey(key + 1));
  };

  const getProducts = async (productCodes) => {
    let products = await fetchProductsByCode(productCodes);
      setproducts(products);
    console.log(products);
  };
  

  if (!list || !products) {
    return <div>Loading...</div>;
  } else {
      return (
        <div className="container">
          <h1>{list.name}</h1>
          <div className="row gy-3" key={key}>
            {products &&
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
