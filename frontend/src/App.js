import Navbar from './components/Navbar';
import GetDataFromCollectionTest from './testCommunicateWithDb/getDataFirestore';
import SaveDataToCollectionTest from './testCommunicateWithDb/addDataFirestore';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Navbar />
      </header>
      <main>
        <GetDataFromCollectionTest/>
        <SaveDataToCollectionTest/>
      </main>
      <footer>

      </footer>
    </div>
  );
}

export default App;
