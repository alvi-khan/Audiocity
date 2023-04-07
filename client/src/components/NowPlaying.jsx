import React from "react";
import Axios from "axios";
import "../stylesheets/NowPlaying.css";
import "bootstrap-icons/font/bootstrap-icons.css";

class NowPlaying extends React.Component {
  state = {
    songName: "",
    artistName: "",
    albumArt: "",
    favorite: false,
    user: "",
  };

  retrieveData(songID) {
    Axios.get(`${process.env.REACT_APP_BASE_URL}/api/metadata`, {
      params: { songID: songID },
    }).then((response) => {
      this.setState({
        songName: response.data.rows[0].title,
        artistName: response.data.rows[0].artist,
      });
    });
  }

  getAlbumArt(songID) {
    Axios.get(`${process.env.REACT_APP_BASE_URL}/api/albumart`, {
      params: { songID: songID },
    }).then((response) => {
      var coverpath = response.data.rows[0].coverpath;
      if (coverpath === "") coverpath = "default.jpg";
      else coverpath = `${process.env.REACT_APP_BASE_URL}/` + coverpath;
      this.setState({
        albumArt: coverpath,
      });
    });
  }

  getFavoriteStatus(songID, username) {
    Axios.get(`${process.env.REACT_APP_BASE_URL}/api/checkfavorite`, {
      params: { songID: songID, user: username },
    }).then((response) => {
      this.setState({ favorite: response.data });
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.songID !== 0) {
      this.retrieveData(nextProps.songID);
      this.getAlbumArt(nextProps.songID);
      this.getFavoriteStatus(nextProps.songID, nextProps.user);
    }
    this.setState({ user: nextProps.user });
  }

  getFavoriteIcon() {
    var icon = "bi-heart";
    if (this.state.favorite) icon += "-fill";
    return icon;
  }

  unfavorite() {
    Axios.post(`${process.env.REACT_APP_BASE_URL}/api/unfavorite`, {
      params: { songID: this.props.songID, user: this.props.user },
    });
  }

  makeFavorite() {
    Axios.post(`${process.env.REACT_APP_BASE_URL}/api/favorite`, {
      params: { songID: this.props.songID, user: this.props.user },
    });
  }

  toggleFavorite = () => {
    if (!this.state.favorite) this.makeFavorite();
    else this.unfavorite();
    this.setState({ favorite: !this.state.favorite });
  };

  checkVisibility() {
    if (
      this.state.songName === "" ||
      this.state.user === "" ||
      this.state.user === null
    )
      return false;
    else return true;
  }

  render() {
    return (
      <div class="nowPlaying">
        <div class="image">
          <img alt="" src={this.state.albumArt} />
        </div>
        <div class="details">
          <text class="songName">{this.state.songName}</text>
          <text class="artistName">{this.state.artistName}</text>
        </div>
        <div class="actions" hidden={!this.checkVisibility()}>
          <button class="favorite" onClick={() => this.toggleFavorite()}>
            <i class={"icon bi " + this.getFavoriteIcon()}></i>
          </button>
        </div>
      </div>
    );
  }
}

export default NowPlaying;
