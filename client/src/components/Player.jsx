import React, { Component } from "react";
import "../stylesheets/Player.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";

class Player extends React.Component {
  state = {
    currentSong: 0,
  };
  audio = new Audio();

  play(songID) {
    if (songID === 0) return;
    const src = "http://localhost:3001/api/song?songID=" + songID;
    this.audio.src = src;
    this.audio.play();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ currentSong: nextProps.songID });
    this.play(nextProps.songID);
  }

  render() {
    return (
      <div class="main">
        <div class="buttons">
          <button class="shuffleButton"></button>
          <button class="prevButton"></button>
          <button class="playButton"></button>
          <button class="nextButton"></button>
          <button class="repeatButton"></button>
        </div>
        <div class="playingSlider">
          <text class="playerText">00:00</text>
          <input type="range" class="slider" />
          <text class="playerText">00:00</text>
        </div>
      </div>
    );
  }
}

export default Player;
