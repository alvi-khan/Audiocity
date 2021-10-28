import React, { Component } from "react";
import SearchBar from "./SearchBar";
import ProfileBar from "./ProfileBar";
import "../stylesheets/Header.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

class Header extends React.Component {
  render() {
    return (
      <Router>
        <div class="headerContent">
          <div class="searchBar">
            <Route path="/search">
              <SearchBar
                onSearch={this.props.onSearch}
                searchTerm={this.props.searchTerm}
              />
            </Route>
          </div>
          <div class="profileDiv">
            <ProfileBar />
          </div>
        </div>
      </Router>
    );
  }
}

export default Header;
