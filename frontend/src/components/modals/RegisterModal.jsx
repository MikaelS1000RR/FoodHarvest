import { useContext, useState } from "react";
import { Form, Button } from "reactstrap";
import BaseModal from "../base/BaseModal";
import { ModalContext } from "../../contexts/ModalContextProvider";
import { useAuth } from "../../contexts/AuthContext";

const RegisterModal = () => {
  
  const { showRegisterModal, toggleRegisterModal } = useContext(ModalContext)
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { signup } = useAuth();

  const register = (event) => {
    event.preventDefault();
    // send request to backend here
  };

  const form = (
    <Form onSubmit={register}>
      <div class="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Namn"
          onChange={(data) => {
            setName(data.target.value);
          }}
          required
        />
      </div>
      <div class="mb-3">
        <input
          type="email"
          className="form-control"
          aria-describedby="emailHelp"
          placeholder="E-mail"
          onChange={(data) => {
            setEmail(data.target.value);
          }}
          required
        />
      </div>
      <div class="mb-3">
        <input
          type="password"
          className="form-control"
          placeholder="Lösenord"
          onChange={(data) => {
            setPassword(data.target.value);
          }}
          required
        />
      </div>
      <div class="mb-3">
        <input
          type="password"
          className="form-control"
          placeholder="Bekräfta lösenord"
          onChange={(data) => {
            setConfirmPassword(data.target.value);
          }}
          required
        />
      </div>
      <Button color="primary" type="submit">
        Registrera
      </Button>
    </Form>
  );

  return (
    <BaseModal
      isOpen={showRegisterModal}
      toggle={toggleRegisterModal}
      content={form}
      title="Register"
    />
  );
};

export default RegisterModal;
