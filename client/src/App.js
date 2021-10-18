import './App.css';
import Table from './components/Table';
import Header from './components/Header';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';

function App() {
  return (
  <div className="App">
    <div className="topContent">
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="mainContent">
        <div className="header">
          <Header />
        </div>
        <div className="table">
          <Table />
        </div>
      </div>

    </div>
    <div className="footer">
      <Footer />
    </div>
  </div>
  )
}

export default App;
