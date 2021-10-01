import { useEffect, useState } from "react";
import { Row } from "reactstrap";
import { useProduct } from "../contexts/ProductContext";
import ProductCard from "../components/home/ProductCard";
import { Container } from "reactstrap";
import { useCategory } from "../contexts/CategoryContext";
import ProductCardList from "../components/home/ProductCardList";
import { useProductList } from "../contexts/ProductListContext";

const Category = (props) => {
  // console.log(props, "In categories")
  const categoryName = props.match.params.name;
  const [products, setProducts] = useState([])
  const { fetchProductsByCategory } = useProduct();
  const { getCategoryByName } = useCategory();
  // should move to anothe context for favourite
  const { addIsFavorite, favoriteList } = useProductList();
  
  useEffect(() => {
    const getCategory = async () => {
      console.log("getting categorie");
      let category = await getCategoryByName(categoryName);
      let docs = await fetchProductsByCategory(category);
      docs = await addIsFavorite(docs);
      setProducts(docs);
    }
    getCategory();
  }, [categoryName, favoriteList])

  return (
    <div>
      Catagories + {categoryName}
      <Container>
        <Row>
          <ProductCardList products={products} setProducts={setProducts} />
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