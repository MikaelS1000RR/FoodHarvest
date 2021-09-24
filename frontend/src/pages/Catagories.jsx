import { useContext } from "react";
import { Button } from "reactstrap";
import { useProduct } from "../contexts/ProductContext";
import ProductCard from "../components/home/ProductCard";


const Catagories = (props) => {
  // console.log(props)
  const title = "Produkter";
  const { products } = useProduct();
  console.log(products);
  console.log("I AM HERE")
  return (
    <div>
      Catagories + {props.match.params.name}

      {products.length > 0
        ? products.map((p) => (
          <ProductCard key={p.id} product={p}/>
        ))
        : null}
    </div>
    
   );
}
 
export default Catagories;