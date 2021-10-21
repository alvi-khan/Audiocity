import React, { Component } from "react";
import Player from "./Player";
import "../stylesheets/Footer.css";
import NowPlaying from "./NowPlaying";
import VolumeControl from "./VolumeControl";

class Footer extends React.Component {
  render() {
    return (
      <div class="footer">
        <div class="nowPlayingContainer">
          <NowPlaying />
        </div>
        <div class="player">
          <Player songID={this.props.songID} />
        </div>
        <div class="volumeContainer">
          <VolumeControl />
        </div>
      </div>
    );
  }
}

export default Footer;
