import React, { Component } from "react";
import "../stylesheets/NowPlaying.css";

class NowPlaying extends React.Component {
  render() {
    return (
      <div class="nowPlaying">
        <div class="image">
          <img src="https://www.glyric.com/modules/custom/glyrics_custom/images/player_default_cover.png" />
        </div>
        <div class="details">
          <text class="songName">Song Name</text>
          <text class="artistName">Artist Name</text>
        </div>
      </div>
    );
  }
}

export default NowPlaying;
