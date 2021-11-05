import React, { Component } from "react";
import "../stylesheets/Sidebar.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import UploadDialog from "./UploadDialog";
import { Link } from "react-router-dom";

class Sidebar extends React.Component {
  state = {
    uploadDialogShown: false,
    selectedButton: "Home",
  };

  constructor() {
    super();
    this.state.selectedButton = window.location.href
      .replace(window.location.origin, "")
      .split("/")[1];
  }

  optionalDivStyle = () => {
    if (this.props.user === "" || this.props.user === null) return "hidden";
    else return "";
  };

  checkSelected(button) {
    if (button.toUpperCase() === this.state.selectedButton.toUpperCase())
      return "selected";
  }

  render() {
    return (
      <div class="sidebarButtons">
        <div>
          <h3>Audiocity</h3>
        </div>
        <Link class="link" to="/">
          <button
            onClick={() => {
              this.setState({ selectedButton: "Home" });
            }}
            class={this.checkSelected("Home")}
          >
            <i class="icon bi bi-house"></i>Home
          </button>
        </Link>

        <Link class="link" to="/search?">
          <button
            class={this.checkSelected("Search")}
            onClick={() => {
              this.props.onSearch("");
              this.setState({ selectedButton: "Search" });
            }}
          >
            <i class="icon bi bi-search"></i>Search
          </button>
        </Link>
        <div class={"optional " + this.optionalDivStyle()}>
          <Link class="link" to="/playlist">
            <button
              class={this.checkSelected("Playlist")}
              onClick={() => {
                this.setState({ selectedButton: "Playlist" });
              }}
            >
              <i class="icon bi bi-music-note-list"></i>Playlists
            </button>
          </Link>
          <button
            onClick={() => {
              this.setState({ uploadDialogShown: true });
            }}
          >
            <i class="icon bi bi-cloud-arrow-up"></i>
            Upload
          </button>
          <UploadDialog
            onSearch={this.props.onSearch}
            searchTerm={this.props.searchTerm}
            show={this.state.uploadDialogShown}
            user={this.props.user}
            onHide={() => {
              this.setState({ uploadDialogShown: false });
            }}
          />
        </div>
      </div>
    );
  }
}

export default Sidebar;
