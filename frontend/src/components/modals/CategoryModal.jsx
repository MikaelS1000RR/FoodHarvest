import { Button } from "reactstrap";
import BaseModal from "../base/BaseModal";
import { useCategory } from "../../contexts/CategoryContext";
import { useModal } from "../../contexts/ModalContextProvider";

const CategoryModal = () => {
  const title = "Kategorier";
  const { categories } = useCategory();
  const { showCategoryModal, toggleCategoryModal } = useModal();

  const categoryButtonList = (
    <div className="container" style={styles.container}>
      {categories.length > 0
        ? categories.map(c => categoryButton(c.name))
        : null
      }
    </div>
  );

  return (
    <BaseModal isOpen={showCategoryModal} toggle={toggleCategoryModal} content={categoryButtonList} title={title} />
   );
}
 
export default CategoryModal;

// mini component
const categoryButton = (content) => {
  return (
      <Button className="m-1" color="primary">{content}</Button>
  );
}

const styles = {

}