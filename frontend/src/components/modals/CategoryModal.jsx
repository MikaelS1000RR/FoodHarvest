import { Button } from "reactstrap";
import BaseModal from "../base/BaseModal";
import { useCategory } from "../../contexts/CategoryContext";
import { useModal } from "../../contexts/ModalContext";
import { useParams } from "react-router-dom";

const CategoryModal = () => {
  const title = "Kategorier";
  const { categories } = useCategory();
  const { showCategoryModal, toggleCategoryModal } = useModal();
  const { name } = useParams();

  const categoryButtonList = (
    <div className="container" style={styles.container}>
      {categories.length > 0
        ? categories.map((c) => (
            <Button className="m-1" color="primary">
              {c.name}
            </Button>
          ))
        : null}
    </div>
  );

  return (
    <BaseModal isOpen={showCategoryModal} toggle={toggleCategoryModal} content={categoryButtonList} title={title} />
   );
}
 
export default CategoryModal;

const styles = {

}