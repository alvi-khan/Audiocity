import React, { Component } from "react";
import SearchBar from "./SearchBar";
import ProfileBar from "./ProfileBar";
import "../stylesheets/Header.css";

class Header extends React.Component {
  render() {
    return (
      <div class="profileDiv">
        <ProfileBar />
      </div>
    );
  }
}

export default Header;
