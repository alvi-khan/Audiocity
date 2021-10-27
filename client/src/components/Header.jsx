import React, { Component } from "react";
import SearchBar from "./SearchBar";
import ProfileBar from "./ProfileBar";
import "../stylesheets/Header.css";

class Header extends React.Component {
  render() {
    return (
      <div class="headerContent">
        <div class="searchBar">
          <SearchBar
            onSearch={this.props.onSearch}
            searchTerm={this.props.searchTerm}
          />
        </div>
        <div class="profileDiv">
          <ProfileBar />
        </div>
      </div>
    );
  }
}

export default Header;
