import React, { Component } from "react";
import "../stylesheets/Player.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";

class Player extends React.Component {
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
