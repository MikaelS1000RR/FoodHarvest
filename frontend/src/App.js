import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';


function App() {
  return (
    <div className="App">
      <Router>
        <header className="App-header">
          <Navbar />
        </header>
        <main>
          <Switch>
            <Route exact path="/" component={Home} />
          </Switch>
        </main>
        <footer></footer>
      </Router>
    </div>
  );
}

export default App;
