import React from "react";
import "../stylesheets/VolumeControl.css";
import "bootstrap-icons/font/bootstrap-icons.css";

class VolumeControl extends React.Component {
  state = {
    muted: false,
    volume: 100,
  };

  toggleMute = () => {
    const muted = this.state.muted;
    if (muted) this.setState({ volume: this.props.volume });
    else this.setState({ volume: 0 });
    this.setState({ muted: !muted });
    this.props.onMuteToggle();
  };

  setVolume(volume) {
    this.setState({ volume: volume });
    this.props.onVolumeChange(volume);
    if (this.state.muted) {
      this.setState({ muted: false });
      this.props.onMuteToggle();
    }
  }

  getMuteIcon() {
    var className = "icon bi bi-volume-";
    className += this.state.muted ? "mute" : "up";
    return className;
  }

  render() {
    return (
      <div class="volumeSlider">
        <button onClick={() => this.toggleMute()} class="muteButton">
          <i class={this.getMuteIcon()}></i>
        </button>
        <input
          type="range"
          value={this.state.volume}
          onChange={(e) => this.setVolume(e.target.value)}
          class="slider"
        />
      </div>
    );
  }
}

export default VolumeControl;
