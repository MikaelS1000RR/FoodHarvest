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
  const { favoriteList, addIsFavorite } = useProductList();
  const { currentUser } = useAuth()
  
  useEffect(() => {
    const getCategoryProducts = async () => {
      console.log("fetch prod by cat");
      let newCategory = await getCategoryByName(categoryName);
      setCategory(newCategory)
      let newProducts = await fetchProducts({ category: newCategory, favoriteList });
      newProducts = addIsFavorite(newProducts);
      console.log(newProducts);
      setProducts(newProducts);
    }
    getCategoryProducts();
  }, [categoryName])

  useEffect(() => {
    const getCategoryProducts = async () => {
      if (currentUser && currentUser.uid === favoriteList.uid) {
        let newProducts = await fetchProducts({ category, favoriteList });
        newProducts = addIsFavorite(newProducts);
        console.log(newProducts);
        setProducts(newProducts);
      }
    }
    getCategoryProducts();
  }, [favoriteList])

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