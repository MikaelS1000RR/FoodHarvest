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
  }, [categories.length]);

  const fetchCategories = () => {
    firestore.collection('categories').onSnapshot(
      (snapshot) => {
        const docs = [];
        snapshot.forEach((doc) => docs.push({ id: doc.id, ...doc.data() }))
        setCategories(docs)
      }
    )
  };

  const getCategoryByName = async (categoryName) => {
    let docs = await firestore
      .collection("categories")
      .where("name", "==", categoryName)
      .get();
    let toReturn = "";
    docs.forEach((doc) => {
      if (doc) {
        toReturn = {id: doc.id, ...doc.data()}};
        return;
      }
    );
    return toReturn;
  };
  
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
