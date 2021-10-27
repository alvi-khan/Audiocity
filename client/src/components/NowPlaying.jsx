import React, { Component } from "react";
import Axios from "axios";
import "../stylesheets/NowPlaying.css";

class NowPlaying extends React.Component {
  state = {
    songName: "",
    artistName: "",
    albumArt: "",
  };

  retrieveData(songID) {
    Axios.get("http://localhost:3001/api/metadata", {
      params: { songID: songID },
    }).then((response) => {
      this.setState({
        songName: response.data[0].title,
        artistName: response.data[0].artist,
      });
    });
  }

  getAlbumArt(songID) {
    Axios.get("http://localhost:3001/api/albumart", {
      params: { songID: songID },
    }).then((response) => {
      var coverpath = response.data[0].coverpath;
      if (coverpath === "") coverpath = "default.jpg";
      else coverpath = "http://localhost:3001/" + coverpath;
      this.setState({
        albumArt: coverpath,
      });
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.songID != 0) {
      this.retrieveData(nextProps.songID);
      this.getAlbumArt(nextProps.songID);
    }
  }

  render() {
    return (
      <div class="nowPlaying">
        <div class="image">
          <img src={this.state.albumArt} />
        </div>
        <div class="details">
          <text class="songName">{this.state.songName}</text>
          <text class="artistName">{this.state.artistName}</text>
        </div>
      </div>
    );
  }
}

export default NowPlaying;
