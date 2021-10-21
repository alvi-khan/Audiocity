import './App.css';
import Table from './components/Table';
import Header from './components/Header';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import React, { useState, useEffect } from 'react';

function App() {

  const [searchTerm, setSearchTerm] = useState("");

  return (
  <div className="App">
    <div className="topContent">
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="mainContent">
        <div className="header">
          <Header onSearch={(text) => setSearchTerm(text)}/>
        </div>
        <div className="table">
          <Table searchTerm={searchTerm}/>
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
