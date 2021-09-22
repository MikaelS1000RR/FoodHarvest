import { Modal, ModalBody, ModalFooter } from "reactstrap";

const BaseModal = (props) => {
  const { isOpen, toggle, title, content, footerContent } = props;

  return (
      <Modal isOpen={isOpen} toggle={toggle}>
        <div className="modal-header">
          <h5 className="modal-title">{title}</h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            onClick={toggle}
          ></button>
        </div>
        <ModalBody>
          {content}
      </ModalBody>
      {footerContent
        ?
        <ModalFooter>
            footerContent
          </ModalFooter>
        :
        null}
      </Modal>
  );
}

export default BaseModal;
