import { useContext, useState } from "react";
import { Form, Button } from "reactstrap";
import { LoginModalContext } from "../contexts/LoginModalContextProvider";
import BaseModal from "./BaseModal";

const LoginModal = () => {
  const { toggleLoginModal, showLoginModal } = useContext(LoginModalContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const login = (event) => {
    event.preventDefault();
    // send request to backend here
  }

  const form = (
    <Form onSubmit={login}>
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