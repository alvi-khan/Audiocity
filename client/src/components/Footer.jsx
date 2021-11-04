import React, { Component } from "react";
import Player from "./Player";
import "../stylesheets/Footer.css";
import NowPlaying from "./NowPlaying";
import VolumeControl from "./VolumeControl";

class Footer extends React.Component {
  state = {
    volume: 100,
    muted: false,
  };

  toggleMute = () => {
    const muted = this.state.muted;
    this.setState({ muted: !muted });
  };

  render() {
    return (
      <React.Fragment>
        <div class="nowPlayingContainer">
          <NowPlaying songID={this.props.songID} user={this.props.user} />
        </div>
        <div class="volumeContainer">
          <VolumeControl
            onVolumeChange={(volume) => this.setState({ volume: volume })}
            volume={this.state.volume}
            onMuteToggle={() => {
              this.toggleMute();
            }}
          />
        </div>
        <div class="player">
          <Player
            setSong={this.props.setSong}
            songID={this.props.songID}
            volume={this.state.volume}
            muted={this.state.muted}
            queue={this.props.queue}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default Footer;
