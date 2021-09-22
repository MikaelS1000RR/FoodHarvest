import { useContext } from "react";
import { Form, Button } from "reactstrap";
import { LoginModalContext } from "../contexts/LoginModalContextProvider";
import BaseModal from "./BaseModal";

const LoginModal = () => {
  const { toggleLoginModal, showLoginModal } = useContext(LoginModalContext);

  const form = (
    <Form>
      <div class="mb-3">
        <input type="email" className="form-control" id="inputEmail" aria-describedby="emailHelp" placeholder="E-mail" />
      </div>
      <div class="mb-3">
        <input type="text" className="form-control" id="inputPassword" placeholder="Lösenord" />
      </div>
    </Form>
  );

  const loginButton = (
    <Button color="primary">Login</Button>
  )

  return (
    <>
      <button onClick={toggleLoginModal}>Toggle</button>
      <BaseModal isOpen={showLoginModal} toggle={toggleLoginModal} content={form} title="Login" footerContent={loginButton}/>
    </>
   );
}
 
export default LoginModal;