import React, { Component } from "react";
import Axios from "axios";
import "../stylesheets/NowPlaying.css";

class NowPlaying extends React.Component {
  state = {
    songName: "Song Name",
    artistName: "Artist Name",
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

  componentWillReceiveProps(nextProps) {
    if (nextProps.songID != 0) this.retrieveData(nextProps.songID);
  }

  render() {
    return (
      <div class="nowPlaying">
        <div class="image">
          <img src="https://www.glyric.com/modules/custom/glyrics_custom/images/player_default_cover.png" />
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
