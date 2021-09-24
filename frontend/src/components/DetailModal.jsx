import React from "react";
import { useContext } from "react";
import { ModalContext } from "../contexts/ModalContextProvider";
import BaseModal from "./base/BaseModal";
import { useProductInfo } from "../contexts/ProductInfoContext";


const DetailModal = () => {
  const { toggleDetailModal, showDetailModal } = useContext(ModalContext);
  const { currentProduct } = useProductInfo();

  let info = (<div></div>)
  
  if (currentProduct === null || currentProduct === undefined) {
    info = (<div> Loading </div>)
  }
  else {
        info = (
          <div key={currentProduct.id}>
            <div>
              <img src={currentProduct.image} alt={currentProduct.image} />
            </div>
            <div>
              <h4>
                {currentProduct.foodType} {currentProduct.brand}
              </h4>
              <div>
                <p>{currentProduct.brand}</p>
              </div>
            </div>
          </div>
        );
  }

  
  const footer = (
              <div>
            <footer>footer</footer>
          </div>
  )
  
    return (
      <BaseModal isOpen={showDetailModal} toggle={toggleDetailModal} content={info} footerContent={footer }/>
   );
}

export default DetailModal;

// const styles = {
//   secondContainer: {
//     width: "50rem",
//     height: "50rem",
//     borderRadius: "12px",
//     background: "white",
//     boxShadow: "0 0 30px 0 rgba(0, 0, 0, 0.25)",
//     padding: "25px",
//     maxWidth: "calc(100vw - 2rem)",
//     maxHeight: "calc(100vh - 2rem)",
//     overflowY: "auto",
//     position: "relative",
//   }
// };
