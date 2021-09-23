import { createContext, useState, useContext } from "react";

export const CategoryContext = createContext();

export const useCategory = () => {
  return useContext(CategoryContext);
};

const CategoryContextProvider = (props) => {
  const [categories, setCategories] = useState([
    { name: "hello" },
    { name: "hello2" },
    { name: "hello22" },
    { name: "hello222" },
  ]);
  const fetchCategories = () => {
    //get the categories from db
    setCategories([{ name: "hello" }, { name: "hello2" },{name: "hello22"},{name: "hello222"}]);
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

export default CategoryContextProvider;
