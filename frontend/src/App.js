import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ModalContextProvider from './contexts/ModalContextProvider';
import Home from './pages/Home';
import LoginModal from './components/modals/LoginModal';
import RegisterModal from './components/modals/RegisterModal';
import Navbar from './components/Navbar';
import FirebaseTest from './test/test-FS-render-data';
import Catagories from './pages/Catagories';
import MyProductLists from './pages/MyProductLists';
import MyProfile from './pages/MyProfile';
import Page404 from './pages/Page404';
import AuthProvider from './contexts/AuthContext';


function App() {
  return (
    <div className="App">
      <ModalContextProvider>
        <AuthProvider>
        <Router>
          <header className="App-header">
            <Navbar />
          </header>
          <main>
            <FirebaseTest />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/catagories/" component={Catagories} />
              <Route exact path="/myProductLists/" component={MyProductLists} />
              <Route exact path="/myProfile/" component={MyProfile} />
              <Route path="*" component={Page404} />
            </Switch>

            <LoginModal />
            <RegisterModal />
          </main>
          <footer></footer>
        </Router>
        </AuthProvider>
      </ModalContextProvider>
    </div>
  );
}

export default App;