import React from "react";
import Axios from "axios";
import "../stylesheets/Home.css";
import { Link } from "react-router-dom";
import { average } from "color.js";

class Home extends React.Component {
  state = {
    artists: [],
    covers: [],
    backgrounds: [],
  };

  retrieveArtists() {
    Axios.get("http://localhost:3001/api/artists").then((response) => {
      var artists = [];
      var covers = [];
      response.data.forEach((element, index) => {
        artists.push(element.artist);
        covers.push("http://localhost:3001/" + element.coverpath);
        this.getBackgroundImage(covers[index], index);
      });
      this.setState({
        artists: artists,
        covers: covers,
      });
    });
  }

  componentDidMount() {
    this.retrieveArtists();
  }

  getBackgroundImage(image, index) {
    average(image, { amount: 1, sample: 50, group: 30 }).then((color) => {
      this.updateBackground(image, index, color[0], color[1], color[2]);
    });
  }

  updateBackground(image, index, r, g, b) {
    var style = `linear-gradient(to right, rgba(${r}, ${g}, ${b}, 1), rgba(${r}, ${g}, ${b}, 1), rgba(${r}, ${g}, ${b}, 1), rgba(${r}, ${g}, ${b}, 0.5), rgba(${r}, ${g}, ${b}, 0.3)), url(${image})`;
    var backgrounds = [...this.state.backgrounds];
    var background = { ...backgrounds[index] };
    background = style;
    backgrounds[index] = background;
    this.setState({ backgrounds });
  }

  render() {
    return (
      <div class="home">
        {this.state.artists.map((artist, index) => {
          return (
            <Link class="link" to={"/search?" + artist}>
              <div
                onClick={() => this.props.onArtistSelect(artist)}
                style={{
                  backgroundImage: this.state.backgrounds[index],
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
