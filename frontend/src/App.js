import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Catagories from './pages/Catagories';
import MyProductLists from './pages/MyProductLists';
import MyProfile from './pages/MyProfile';
import Page404 from './pages/Page404';


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
            <Route exact path="/catagories/" component={Catagories} />
            <Route exact path="/myProductLists/" component={MyProductLists} />
            <Route exact path="/myProfile/" component={MyProfile} />
            <Route path="*" component={Page404} />

          </Switch>

        </main>
        <footer>

        </footer>
      </Router>
    </div>
  );
}

export default App;