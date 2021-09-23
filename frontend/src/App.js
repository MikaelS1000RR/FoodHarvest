import Navbar from './components/Navbar';
import FirebaseTest from './test/test-FS-render-data';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Navbar />
      </header>
      <main>
        <FirebaseTest/>

      </main>
      <footer>

      </footer>
    </div>
  );
}

export default App;
