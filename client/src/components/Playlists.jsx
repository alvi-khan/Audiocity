import React, { Component } from "react";
import Axios from "axios";
import "../stylesheets/Playlists.css";
import PlaylistContent from "./PlaylistContent";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class Playlist extends React.Component {
  state = {
    shown: true,
    playlists: [],
  };

  getPlaylists() {
    Axios.get("http://localhost:3001/api/playlists", {
      params: { owner: this.props.user },
    }).then((response) => {
      this.setState({ playlists: response.data });
    });
  }

  componentDidMount() {
    this.getPlaylists();
  }

  Playlist(name, id) {
    return (
      <button class="button">
        <Link class="link" to={"/playlist/" + id}>
          <h2>{name}</h2>
        </Link>
        <Route path={"/playlist/" + id} exact={true}>
          <PlaylistContent
            onSearch={(text) => this.props.onSearch(text)}
            onPlay={(songID) => this.props.onPlay(songID)}
          />
        </Route>
      </button>
    );
  }

  render() {
    return (
      <Router>
        <div class="playlists">
          {this.state.playlists.map((playlist) => {
            return (
              <button class="button">
                <Link class="link" to={"/playlist/" + playlist.ID}>
                  <h2>{playlist.name}</h2>
                </Link>
                <Route path={"/playlist/" + playlist.ID} exact={true}>
                  <PlaylistContent
                    onSearch={(text) => this.props.onSearch(text)}
                    onPlay={(songID) => this.props.onPlay(songID)}
                    id={playlist.ID}
                    onQueueChange={(queue) => this.props.onQueueChange(queue)}
                  />
                </Route>
              </button>
            );
          })}
        </div>
      </Router>
    );
  }
}

export default Playlist;
