import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginModalContextProvider from './contexts/LoginModalContextProvider';
import Home from './pages/Home';
import LoginModal from './components/LoginModal';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App">
      <LoginModalContextProvider>
        <Router>
          <header className="App-header">
            <Navbar />
          </header>
          <main>
            <Switch>
              <Route exact path="/" component={Home} />
            </Switch>

            <LoginModal />
          </main>
          <footer>

          </footer>
        </Router>
      </LoginModalContextProvider>
    </div>
  );
}

export default App;