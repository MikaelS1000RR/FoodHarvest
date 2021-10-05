import { useEffect } from "react";
import ProductCard from "./ProductCard";
import { useProductList } from "../../contexts/ProductListContext";


const ProductCardList = (props) => {
  const { products } = props;
  console.log("productChange");
  console.log(products);

  return (
    <>
      {products.length > 0
        ? products.map((product) => (
          <ProductCard key={product.id} product={product} classNames={"col-6 col-sm-4 col-md-3 col-lg-2"} />
        ))
        : null}
    </>
  )
}
 
export default ProductCardList;