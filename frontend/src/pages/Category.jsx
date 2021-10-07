import { useEffect, useState } from "react";
import { Row } from "reactstrap";
import { useProduct } from "../contexts/ProductContext";
import { Container } from "reactstrap";
import { useCategory } from "../contexts/CategoryContext";
import ProductCardList from "../components/productCard/ProductCardList";
import { useProductList } from "../contexts/ProductListContext";
import { useAuth } from "../contexts/AuthContext";

const Category = (props) => {
  const categoryName = props.match.params.name;
  const [category, setCategory] = useState(null)
  const [products, setProducts] = useState([])
  const { fetchProducts } = useProduct();
  const { getCategoryByName } = useCategory();
  // should move to anothe context for favourite
  const { favoriteList, currentProductList, addIsInList } = useProductList();
  
  useEffect(() => {
    const getCategoryProducts = async () => {
      let newCategory = await getCategoryByName(categoryName);
      setCategory(newCategory);
      let newProducts = products;
      if (!products || products.length <= 0) {
        newProducts = await fetchProducts({ category: newCategory });
      }
      newProducts = await addIsInList(newProducts);
      setProducts(newProducts);
    };
    getCategoryProducts();
  }, [categoryName, favoriteList, currentProductList]);

  return (
    <div>
      <h1>{categoryName}</h1>
      <Container>
        <Row>
          <ProductCardList products={products} />
        </Row>
      </Container>
    </div>
  );
}

export default Category;