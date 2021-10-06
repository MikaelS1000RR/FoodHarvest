import ProductCard from "./ProductCard";

const ProductCardList = (props) => {
  const { products } = props;

  return (
    <>
      {products && products.length > 0
        ? products.map((product) => (
          <ProductCard key={product.id} product={product} classNames={"col-6 col-sm-4 col-md-3 col-lg-2"} />
        ))
        : null}
    </>
  )
}
 
export default ProductCardList;