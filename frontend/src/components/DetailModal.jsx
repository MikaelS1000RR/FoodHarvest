import React from "react";
import { useContext } from "react";
import { ModalContext } from "../contexts/ModalContextProvider";
import BaseModal from "./base/BaseModal";


const DetailModal = (props) => {
  const { product, index } = props;
  const { toggleDetailModal, showDetailModal } = useContext(ModalContext);

  const info = (
    <div key={ index }>
              <div>
            <img
              src={product.image}
              alt={product.image}
            />
        </div>
        <div>
        <h4>{product.foodType} { product.brand }</h4>
          <div>
          <p>{ product.brand }</p>
        </div>
        </div>
    </div>
  )
  
  const footer = (
              <div>
            <footer>footer</footer>
          </div>
  )
  
    return (
      <BaseModal isOpen={showDetailModal} toggle={toggleDetailModal} content={info} footerContent={footer } title={product.foodType} />
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
