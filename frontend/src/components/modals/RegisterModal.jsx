import { useState } from "react";
import { Form, Button } from "reactstrap";
import BaseModal from "../base/BaseModal";
import { useModal } from "../../contexts/ModalContext";
import { useAuth } from "../../contexts/AuthContext";

const RegisterModal = () => {
  
  const { showRegisterModal, toggleRegisterModal } = useModal()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { signup } = useAuth();
  const [userExists, setUserExist] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password === confirmPassword) {
      try {
        await signup(email, password);
        setUserExist(false);
        toggleRegisterModal();
      } catch {
        setUserExist(true);
      }
    }
  }

  const form = (
    <Form onSubmit={handleSubmit}>
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
      <div className="mb-3">
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
      <div className="mb-3">
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
      {userExists && <h2>The email is already in use</h2>}
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
