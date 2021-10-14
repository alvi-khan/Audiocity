import React, { Component } from "react";
import SearchBar from "./SearchBar";

class Header extends React.Component {
  render() {
    return (
      <React.Fragment>
        <SearchBar />
      </React.Fragment>
    );
  }
}

export default Header;
