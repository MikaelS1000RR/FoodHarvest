import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ModalProvider from './contexts/ModalContext';
import CategoryProvider from './contexts/CategoryContext';
import AuthProvider from './contexts/AuthContext';
import ProductProvider from './contexts/ProductContext';

import Home from './pages/Home';
import Navbar from './components/Navbar';

import Catagories from './pages/Catagories';
import MyProductLists from './pages/MyProductLists';
import MyProfile from './pages/MyProfile';
import Page404 from './pages/Page404';

import LoginModal from './components/modals/LoginModal';
import RegisterModal from './components/modals/RegisterModal';
import CategoryModal from './components/modals/CategoryModal';


function App() {
  return (
    <div className="App">
      <ModalProvider>
        <CategoryProvider>
          <ProductProvider>
          <AuthProvider>
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

                <LoginModal />
                <RegisterModal />
                <CategoryModal />
              </main>
              <footer></footer>
            </Router>
          </AuthProvider>
          </ProductProvider>
        </CategoryProvider>
      </ModalProvider>
    </div>
  );
}

export default App;