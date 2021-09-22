import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ModalContextProvider from './contexts/ModalContextProvider';
import Home from './pages/Home';
import LoginModal from './components/modals/LoginModal';
import RegisterModal from './components/modals/RegisterModal';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App">
      <ModalContextProvider>
        <Router>
          <header className="App-header">
            <Navbar />
          </header>
          <main>
            <Switch>
              <Route exact path="/" component={Home} />
            </Switch>

            <LoginModal />
            <RegisterModal />
          </main>
          <footer>

          </footer>
        </Router>
      </ModalContextProvider>
    </div>
  );
}

export default App;