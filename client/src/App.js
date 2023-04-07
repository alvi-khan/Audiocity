import './App.css';
import Table from './components/Table';
import Header from './components/Header';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import Home from './components/Home';
import React, {useEffect, useState} from 'react';
import {HashRouter as Router, Switch, Route} from "react-router-dom";
import Playlists from './components/Playlists';

function App() {

  const [searchTerm, setSearchTerm] = useState("");
  const [songID, setSongID] = useState(0);
  const [user, setUser] = useState(localStorage.getItem("user"));
  const [queue, setQueue] = useState([]);

  function getSearchTerm() {
    var url = window.location.href;
    var searchTerm = url.substring(`${process.env.REACT_APP_BASE_URL}/search?`.length);
    setSearchTerm(decodeURI(searchTerm));
  }

  useEffect(() => {
    getSearchTerm();
  }, [])

  return (
  <Router>
    <div className="App">
      <div className="sidebar">
        <Sidebar onSearch={(text) => setSearchTerm(text)} searchTerm={searchTerm} user={user}/>
      </div>
      <div className="header">
        <Header onSearch={(text) => setSearchTerm(text)} searchTerm={searchTerm} updateUser={(newUser) => setUser(newUser)} user={user}/>
      </div>
      <div className="body">
        <Switch>
          <Route path="/search"
                 render={() => <Table onSearch={(text) => setSearchTerm(text)} songID={songID} searchTerm={searchTerm} onPlay={(songID) => setSongID(songID)} onQueueChange={(queue) => setQueue(queue)} user={user}/>}
          />
          <Route path="/playlist"
                 render={() => <Playlists onSearch={(text) => setSearchTerm(text)} onPlay={(songID) => setSongID(songID)} user={user} onQueueChange={(queue) => setQueue(queue)}/>}
          />
          <Route path="/"
                 render={() => <Home onArtistSelect={(artist) => setSearchTerm(artist)}/>}
          />
        </Switch>
      </div>
      <div className="footer">
        <Footer setSong={(songID) => setSongID(songID)} songID={songID} user={user} queue={queue}/>
      </div>
    </div>
  </Router>
  )
}

export default App;
