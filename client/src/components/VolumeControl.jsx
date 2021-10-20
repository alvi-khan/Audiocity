import React, { Component } from "react";
import "../stylesheets/VolumeControl.css";
import "bootstrap-icons/font/bootstrap-icons.css";

class VolumeControl extends React.Component {
  render() {
    return (
      <div class="volumeSlider">
        <i class="icon bi bi-volume-up"></i>
        <input type="range" class="slider" />
      </div>
    );
  }
}

export default VolumeControl;
