import { useContext } from "react";
import { Button, Row } from "reactstrap";
import { useProduct } from "../contexts/ProductContext";
import ProductCard from "../components/home/ProductCard";
import { Container } from "reactstrap";


const Catagories = (props) => {
  // console.log(props)
  const title = "Produkter";
  const { products } = useProduct();
  console.log(products, "products");
  return (
    <div>
      Catagories + {props.match.params.name}
      <Container>
        <Row>
          {products.length > 0
            ? products.map((p) => (
              <ProductCard key={p.id} product={p} classNames={"col-6 col-sm-4 col-md-3 col-lg-2"} buttonText="Lägg till"/>
            ))
            : null}
        </Row>
      </Container>
    </div>
  );
}

export default Catagories;

const styles = {
  catagoryItems: {

  }
}