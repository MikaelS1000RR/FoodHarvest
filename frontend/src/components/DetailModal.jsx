import React from "react";
import { useContext } from "react";
import { ModalContext } from "../contexts/ModalContext";
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

