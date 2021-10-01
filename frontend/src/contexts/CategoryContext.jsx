import { createContext, useState, useContext, useEffect } from "react";
import firestore from '../database_config/firestore'

const CategoryContext = createContext();

export const useCategory = () => {
  return useContext(CategoryContext);
};

const CategoryProvider = (props) => {
  const [categories, setCategories] = useState([]);
  
  useEffect(() => {
    if (categories.length <= 0) {
      fetchCategories();
    }
  }, []);
  
  const fetchCategories = () => {
    firestore.collection("categories").orderBy("name").onSnapshot(
      (snapshot) => {
        const docs = [];
        snapshot.forEach((doc) => docs.push({ id: doc.id, ref: doc.ref, ...doc.data() }))
        setCategories(docs)
      }
    )
  };

  const getCategoryByName = async (categoryName) => {
    let category = {}
    const snapshot = await firestore.collection("categories").where("name", "==", categoryName).get();
    snapshot.forEach(doc => {
      category = { id: doc.id, ref: doc.ref, ...doc.data() }
    })
    return category
  }
  
  const values = {
    categories,
    fetchCategories,
    getCategoryByName,
  };

  return (
    <CategoryContext.Provider value={values}>
      {props.children}
    </CategoryContext.Provider>
  );
};

export default CategoryProvider;
