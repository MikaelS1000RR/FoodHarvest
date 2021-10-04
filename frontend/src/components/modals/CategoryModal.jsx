import { Button } from "reactstrap";
import BaseModal from "../base/BaseModal";
import { useCategory } from "../../contexts/CategoryContext";
import { useModal } from "../../contexts/ModalContext";
import { Link } from "react-router-dom";

const CategoryModal = () => {
  const title = "Kategorier";
  const { categories } = useCategory();
  const { showCategoryModal, toggleCategoryModal } = useModal();
  const categoryButtonList = (
    <div className="container" style={styles.container}>
      {categories.length > 0
        ? categories.map((c) => (
            <Link to={`/category/${c.name}`} key={c.id}>
              <Button
                className="m-1"
                color="primary"
                key={c.id}
                id={c.id}
                onClick={toggleCategoryModal}
              >
                {c.name}
              </Button>
            </Link>
          ))
        : null}
    </div>
  );

  return (
    <BaseModal
      isOpen={showCategoryModal}
      toggle={toggleCategoryModal}
      content={categoryButtonList}
      title={title}
    />
  );
};

export default CategoryModal;

const styles = {};
