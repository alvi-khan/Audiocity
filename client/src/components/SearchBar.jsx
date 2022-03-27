import React from "react";
import "../stylesheets/SearchBar.css";
import { withRouter } from "react-router-dom";

class SearchBar extends React.Component {
  state = {
    searchTerm: "",
  };

  search = () => {
    this.props.onSearch(this.state.searchTerm);
    this.props.history.push("/search?" + this.state.searchTerm);
  };

  inputChange = (text) => {
    this.setState({ searchTerm: text });
  };

  componentDidMount() {
    this.setState({ searchTerm: this.props.searchTerm });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ searchTerm: nextProps.searchTerm });
  }

  render() {
    return (
      <input
        onKeyUp={(e) => {
          if (e.key === "Enter") {
            this.search();
          }
        }}
        value={this.state.searchTerm}
        onChange={(e) => this.inputChange(e.target.value)}
        placeholder="Search songs, artists, or albums"
      />
    );
  }
}

export default withRouter(SearchBar);
