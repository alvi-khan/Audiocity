import React, { Component } from "react";
import "../stylesheets/Sidebar.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import UploadDialog from "./UploadDialog";
import { Link } from "react-router-dom";

class Sidebar extends React.Component {
  state = {
    uploadDialogShown: false,
  };

  optionalDivStyle = () => {
    if (this.props.user === "" || this.props.user === null) return "hidden";
    else return "";
  };

  render() {
    return (
      <div class="sidebarButtons">
        <div>
          <h3>Audiocity</h3>
        </div>
        <Link class="link" to="/">
          <button>
            <i class="icon bi bi-house"></i>Home
          </button>
        </Link>

        <Link class="link" to="/search?">
          <button onClick={() => this.props.onSearch("")}>
            <i class="icon bi bi-search"></i>Search
          </button>
        </Link>
        <div class={"optional " + this.optionalDivStyle()}>
          <Link class="link" to="/playlist">
            <button>
              <i class="icon bi bi-music-note-list"></i>Playlists
            </button>
          </Link>
          <button
            onClick={() => {
              this.setState({ uploadDialogShown: true });
            }}
          >
            <i class="icon bi bi-cloud-upload"></i>
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
