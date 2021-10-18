import React, { Component } from "react";
import "../stylesheets/Sidebar.css";
import "bootstrap-icons/font/bootstrap-icons.css";

class Sidebar extends React.Component {
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
      </div>
    );
  }
}

export default Sidebar;
