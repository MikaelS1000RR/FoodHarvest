import LoginModal from './components/LoginModal';
import Navbar from './components/Navbar';
import LoginModalContextProvider from './contexts/LoginModalContextProvider';

function App() {
  return (
    <div className="App">
      <LoginModalContextProvider>
        <header className="App-header">
          <Navbar />
        </header>
        <main>
          <LoginModal />
        </main>
        <footer>

        </footer>
      </LoginModalContextProvider>
    </div>
  );
}

export default App;
