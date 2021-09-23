import { useContext, useState } from "react";
import { Form, Button } from "reactstrap";
import { ModalContext } from "../../contexts/ModalContextProvider";
import BaseModal from "../base/BaseModal";
import { useAuth } from "../../contexts/AuthContext";

const LoginModal = () => {
  const { toggleLoginModal, showLoginModal } = useContext(ModalContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  
  const handleSubmit = async (e) => {
    e.preventDefault();

      try {
        const user = await login(email, password);
        console.log(user);
      } catch {
      }
  }

  const form = (
    <Form onSubmit={handleSubmit}>
      <div class="mb-3">
        <input
          type="email"
          className="form-control"
          id="inputEmail"
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
          id="inputPassword"
          placeholder="Lösenord"
          onChange={(data) => {
            setPassword(data.target.value);
          }}
          required
        />
      </div>
      <Button color="primary" type="submit">
        Logga in
      </Button>
    </Form>
  );

  return (
      <BaseModal isOpen={showLoginModal} toggle={toggleLoginModal} content={form} title="Login" />
   );
}
 
export default LoginModal;