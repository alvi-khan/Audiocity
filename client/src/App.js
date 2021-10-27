import './App.css';
import Table from './components/Table';
import Header from './components/Header';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import React, { useState, useEffect } from 'react';

function App() {

  const [searchTerm, setSearchTerm] = useState("");
  const [songID, setSongID] = useState(0);

  return (
  <div className="App">
    <div className="topContent">
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="mainContent">
        <div className="header">
          <Header onSearch={(text) => setSearchTerm(text)} searchTerm={searchTerm}/>
        </div>
        <div>
          <Table onSearch={(text) => setSearchTerm(text)} songID={songID} searchTerm={searchTerm} onPlay={(songID) => setSongID(songID)}/>
        </div>
      </div>

    </div>
    <div className="footer">
      <Footer setSong={(songID) => setSongID(songID)} songID={songID}/>
    </div>
  </div>
  )
}

export default App;
