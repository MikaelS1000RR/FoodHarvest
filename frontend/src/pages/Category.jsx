import { useEffect, useState } from "react";
import { Row } from "reactstrap";
import { useProduct } from "../contexts/ProductContext";
import { Container } from "reactstrap";
import { useCategory } from "../contexts/CategoryContext";
import ProductCardList from "../components/home/ProductCardList";
import { useProductList } from "../contexts/ProductListContext";
import { useAuth } from "../contexts/AuthContext";

const Category = (props) => {
  // console.log(props, "In categories")
  const categoryName = props.match.params.name;
  const [category, setCategory] = useState(null)
  const [products, setProducts] = useState([])
  const { fetchProducts } = useProduct();
  const { getCategoryByName } = useCategory();
  // should move to anothe context for favourite
  const { favoriteList } = useProductList();
  const { currentUser } = useAuth()
  
  useEffect(() => {
    const getCategoryProducts = async () => {
      let category = await getCategoryByName(categoryName);
      setCategory(category)
      let docs = await fetchProducts({ category, favoriteList });
      setProducts(docs);
    }
    getCategoryProducts();
  }, [categoryName])

  useEffect(() => {
    const getCategoryProducts = async () => {
      if (currentUser && currentUser.uid === favoriteList.uid) {
        let docs = await fetchProducts({ category, favoriteList });
        setProducts(docs);
      }
    }
    getCategoryProducts();
    
  }, [favoriteList])

  return (
    <div>
      <h1>{categoryName}</h1>
      <Container>
        <Row>
          <ProductCardList products={products} setProducts={setProducts} />
        </Row>
      </Container>
    </div>
  );
}

export default Category;