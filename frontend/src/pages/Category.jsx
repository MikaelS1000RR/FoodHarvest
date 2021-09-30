import { useEffect, useState } from "react";
import { Row } from "reactstrap";
import { useProduct } from "../contexts/ProductContext";
import ProductCard from "../components/home/ProductCard";
import { Container } from "reactstrap";
import { useCategory } from "../contexts/CategoryContext";

const Category = (props) => {
  // console.log(props, "In categories")
  const categoryName = props.match.params.name;
  const [products, setProducts] = useState([])
  const { fetchProductsByCategory } = useProduct();
  const { getCategoryByName } = useCategory();
  
  useEffect(() => {
    const getCategory = async () => {
      let category = await getCategoryByName(categoryName);
      let docs = await fetchProductsByCategory(category);
      setProducts(docs);
    }
    getCategory();
  }, [categoryName])

  return (
    <div>
      Catagories + {categoryName}
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

export default Category;

const styles = {
  catagoryItems: {

  }
}