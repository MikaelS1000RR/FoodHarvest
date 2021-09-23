import { Button } from "reactstrap";
import BaseModal from "../base/BaseModal";
import { useCategory } from "../../contexts/CategoryContextProvider";
import { useModal } from "../../contexts/ModalContextProvider";

const CategoryModal = () => {
  const title = "Kategorier";
  const { categories } = useCategory();
  const { showCategoryModal, toggleCategoryModal } = useModal();

  const categoryButtonList = (
    <>
      {categories.map(c => categoryButton(c.name))}
    </>
  );
  console.log("kategorier", categories);

  return (
    <BaseModal isOpen={showCategoryModal} toggle={toggleCategoryModal} content={categoryButtonList} title={title} />
   );
}
 
export default CategoryModal;

// mini component
const categoryButton = (content) => { return <Button>{content}</Button> };