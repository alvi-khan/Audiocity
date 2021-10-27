import React, { Component } from "react";
import "../stylesheets/Sidebar.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import UploadDialog from "./UploadDialog";

class Sidebar extends React.Component {
  state = {
    uploadDialogShown: false,
  };
  render() {
    return (
      <div class="sidebarButtons">
        <div>
          <h3>Music Player</h3>
        </div>
        <button>
          <i class="icon bi bi-house"></i>Home
        </button>
        <button>
          <i class="icon bi bi-search"></i>Search
        </button>
        <button>
          <i class="icon bi bi-file-earmark-music"></i>Playlists
        </button>
        <button
          onClick={() => {
            this.setState({ uploadDialogShown: true });
          }}
        >
          <i class="icon bi bi-cloud-upload"></i>
          Upload
        </button>
        <UploadDialog
          show={this.state.uploadDialogShown}
          onHide={() => {
            this.setState({ uploadDialogShown: false });
          }}
        />
      </div>
    );
  }
}

export default Sidebar;
