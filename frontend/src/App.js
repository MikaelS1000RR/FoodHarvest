import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ModalProvider from "./contexts/ModalContext";
import CategoryProvider from "./contexts/CategoryContext";
import AuthProvider from "./contexts/AuthContext";
import ProductListProvider from "./contexts/ProductListContext";
import ProductInfoProvider from './contexts/ProductInfoContext';

import Home from './pages/Home';
import Catagories from './pages/Catagories';
import MyProductLists from './pages/MyProductLists';
import MyProfile from './pages/MyProfile';
import Page404 from './pages/Page404';

import Navbar from './components/Navbar';
import LoginModal from './components/modals/LoginModal';
import RegisterModal from './components/modals/RegisterModal';
import CategoryModal from './components/modals/CategoryModal';
import DetailModal from './components/DetailModal';
import AddListModal from "./components/modals/AddListModal";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <ModalProvider>
          <CategoryProvider>
            <ProductListProvider>
                <ProductInfoProvider>
              <Router>
                <header className="App-header">
                  <Navbar />
                </header>
                <main>
                  <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/catagories/:name" component={Catagories} />
                    <Route
                      exact
                      path="/myProductLists/"
                      component={MyProductLists}
                    />
                    <Route exact path="/myProfile/" component={MyProfile} />
                    <Route path="*" component={Page404} />
                  </Switch>
                  <DetailModal />
                  <LoginModal />
                  <RegisterModal />
                  <CategoryModal />
                  <AddListModal />
                </main>
                <footer></footer>
              </Router>
                     </ProductInfoProvider>
            </ProductListProvider>
          </CategoryProvider>
        </ModalProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
