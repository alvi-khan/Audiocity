import React, { Component } from "react";
import Axios from "axios";
import "../stylesheets/Home.css";
import { Link } from "react-router-dom";

class Home extends React.Component {
  state = {
    artists: [],
    covers: [],
  };

  retrieveArtists() {
    Axios.get("http://localhost:3001/api/artists").then((response) => {
      var artists = [];
      var covers = [];
      response.data.map((element) => {
        artists.push(element.artist);
        covers.push("http://localhost:3001/" + element.coverpath);
      });
      this.setState({ artists: artists, covers: covers });
    });
  }

  componentDidMount() {
    this.retrieveArtists();
  }

  render() {
    return (
      <div class="home">
        {this.state.artists.map((artist, index) => {
          return (
            <Link class="link" to={"/search?" + artist}>
              <div
                style={{
                  backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 1), rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.1)), url(${this.state.covers[index]})`,
                }}
                class="artist"
              >
                {artist}
              </div>
            </Link>
          );
        })}
      </div>
    );
  }
}

export default Home;
