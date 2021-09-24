import { useState } from "react";
import { Form, Input } from "reactstrap";
import { useAuth } from "../../contexts/AuthContext";
import { useModal } from "../../contexts/ModalContext";
import { useProductList } from "../../contexts/ProductListContext";
import BaseModal from "../base/BaseModal";

const AddListModal = () => {
  const title = "Skapa ny lista";
  const { currentUser } = useAuth();
  const { showAddListModal, toggleAddListModal } = useModal();
  const { addProductList, setCurrentProductList } = useProductList();
  const [newListName, setNewListName] = useState('')

  const addNewList = async (e) => {
    e.preventDefault();
    if (newListName.trim().length > 0) {
      const newProductList = {
        uid: currentUser.uid,
        name: newListName
      }
      const result = await addProductList(newProductList);
      if (result) {
        
        toggleAddListModal();
      }
    }
  }

  const content = (
    <Form onSubmit={addNewList}>
      <Input
        type="text"
        name="search"
        id="exampleSearch"
        placeholder="Namnge listan"
        onInput={e => setNewListName(e.target.value)}
      />
      <button className="btn btn-primary" type="submit" >Skapa</button>
    </Form>
  );

  return (
    <BaseModal title={title} content={content} isOpen={showAddListModal} toggle={toggleAddListModal}/>
   );
}
 
export default AddListModal;