import BaseModal from "../base/BaseModal";
import { useProductInfo } from "../../contexts/ProductInfoContext";
import { useModal } from "../../contexts/ModalContext";

const DetailModal = () => {
  const { toggleDetailModal, showDetailModal } = useModal();
  const { currentProduct } = useProductInfo();

  let info = <div></div>;

  if (currentProduct === null || currentProduct === undefined) {
    info = <div> Loading </div>;
  } else {
    info = (
      <div key={currentProduct.id}>
        <div>
          <img
            src={currentProduct.imageUrl}
            alt={currentProduct.imageUrl}
            style={styles.image}
          />
        </div>
        <div>
          <h4>{currentProduct.productName}</h4>
          <div>
            <p>{currentProduct.brand}</p>
          </div>
        </div>
      </div>
    );
  }

  const footer = (
    <div>
      <footer></footer>
    </div>
  );

  return (
    <BaseModal
      isOpen={showDetailModal}
      toggle={toggleDetailModal}
      content={info}
      footerContent={footer}
    />
  );
};

export default DetailModal;

const styles = {
  image: {
    objectFit: "contain",
    maxWidth: "50%",
    maxHeight: "50%",
    marginLeft: "7.5rem",
    paddingBottom: "2rem"
  },
}

