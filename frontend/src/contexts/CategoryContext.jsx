import { createContext, useState, useContext, useEffect } from "react";
import firestore from '../database_config/firestore'

const CategoryContext = createContext();

export const useCategory = () => {
  return useContext(CategoryContext);
};

const CategoryProvider = (props) => {
  const [categories, setCategories] = useState([]);
  
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    firestore.collection('categories').onSnapshot(
      (snapshot) => {
        const docs = [];
        snapshot.forEach((doc) => docs.push({ id: doc.id, ...doc.data() }))
        setCategories(docs)
      }
    )
  };
  
  const values = {
    categories,
    fetchCategories
  };

  return (
    <CategoryContext.Provider value={values}>
      {props.children}
    </CategoryContext.Provider>
  );
};

export default CategoryProvider;
