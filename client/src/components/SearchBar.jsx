import React, { Component } from "react";
import "../stylesheets/SearchBar.css";

class SearchBar extends React.Component {
  state = {
    searchTerm: "",
  };

  search = () => {
    this.props.onSearch(this.state.searchTerm);
  };

  inputChange = (text) => {
    this.setState({ searchTerm: text });
  };

  render() {
    return (
      <input
        onKeyUp={(e) => {
          if (e.key == "Enter") {
            this.search();
          }
        }}
        onChange={(e) => this.inputChange(e.target.value)}
        placeholder="Search..."
      />
    );
  }
}

export default SearchBar;
