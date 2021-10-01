import { useEffect } from "react";
import ProductCard from "./ProductCard";
import { useProductList } from "../../contexts/ProductListContext";


const ProductCardList = (props) => {
  const { products, setProducts } = props;

  return (
    <>
      {products.length > 0
        ? products.map((p) => (
          <ProductCard key={p.id} product={p} classNames={"col-6 col-sm-4 col-md-3 col-lg-2"} />
        ))
        : null}
    </>
  )
}
 
export default ProductCardList;