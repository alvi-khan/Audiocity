import React from "react";
import Axios from "axios";
import "../stylesheets/Playlists.css";
import PlaylistContent from "./PlaylistContent";
import { Route, Link } from "react-router-dom";

class Playlist extends React.Component {
  state = {
    shown: true,
    playlists: [],
    currentLocation: "",
  };

  getPlaylists() {
    Axios.get("http://localhost:3001/api/playlists", {
      params: { owner: this.props.user },
    }).then((response) => {
      this.setState({ playlists: response.data.rows });
    });
  }

  componentDidMount() {
    this.getPlaylists();
    this.setState({ currentLocation: "/playlist" });
  }

  updateLocation = (playlistID) => {
    var location = window.location;
    var currentPath = location.href.replace(
      location.protocol + "//" + location.host,
      ""
    );
    this.setState({ currentLocation: currentPath });
  };

  getPlaylistLink(playlistID) {
    if (this.state.currentLocation.endsWith(playlistID)) return "/playlist/";
    return "/playlist/" + playlistID;
  }

  deletePlaylist(event, playlistID) {
    event.preventDefault();
    event.stopPropagation();
    Axios.post("http://localhost:3001/api/deleteplaylist", {
      params: { playlistID: playlistID },
    }).then(() => {
      this.getPlaylists();
    });
  }

  getTrashIcon(playlist) {
    if (playlist.name !== "Favorites")
      return (
        <i
          onClick={(e) => {
            this.deletePlaylist(e, playlist.id);
          }}
          class="icon bi bi-trash-fill trashIcon"
        ></i>
      );
  }

  render() {
    return (
      <div class="playlists">
        {this.state.playlists.map((playlist) => {
          return (
            <button
              onClick={() => this.updateLocation(playlist.id)}
              class="button"
            >
              <Link class="link" to={this.getPlaylistLink(playlist.id)}>
                <i class="icon bi bi-caret-down-fill"></i>
                <h2>{playlist.name}</h2>
                {this.getTrashIcon(playlist)}
              </Link>
              <Route path={"/playlist/" + playlist.id} exact={true}>
                <PlaylistContent
                  onSearch={(text) => this.props.onSearch(text)}
                  onPlay={(songID) => this.props.onPlay(songID)}
                  id={playlist.id}
                  onQueueChange={(queue) => this.props.onQueueChange(queue)}
                />
              </Route>
            </button>
          );
        })}
      </div>
    );
  }
}

export default Playlist;
