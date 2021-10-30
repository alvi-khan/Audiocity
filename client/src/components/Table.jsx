import React, { useState, useEffect, Component } from "react";
import Axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import "../stylesheets/Table.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Link } from "react-router-dom";

class Table extends React.Component {
  state = {
    data: [],
  };

  getSearchTerm() {
    var url = window.location.href;
    var searchTerm = url.substring("http://localhost:3000/search?".length);
    return decodeURI(searchTerm);
  }

  getData(searchTerm) {
    this.setState({ data: [] });
    Axios.get("http://localhost:3001/api/query", {
      params: { searchTerm: searchTerm },
    }).then((response) => {
      this.setState({ data: response.data });
    });
  }

  componentDidMount() {
    this.getData(this.getSearchTerm());
  }

  componentWillReceiveProps(nextProps) {
    this.getData(nextProps.searchTerm);
  }

  getImage(item) {
    var image = item.coverpath;
    if (image === "") image = "default.jpg";
    else image = "http://localhost:3001/" + image;
    return image;
  }

  play = (songID) => {
    if (this.props.songID === songID) this.props.onPlay(0);
    else this.props.onPlay(songID);
  };

  render() {
    return (
      <div className="table">
        <table>
          <thead>
            <tr>
              <th style={{ width: 40 + "px" }}></th>
              <th style={{ width: 70 + "px" }}></th>
              <th style={{ width: 250 + "px" }}>Title</th>
              <th style={{ width: 250 + "px" }}>Artist</th>
              <th style={{ width: 250 + "px" }}>Album</th>
              <th style={{ width: 100 + "px" }}>Uploader</th>
            </tr>
          </thead>
          <tbody overflow>
            {this.state.data.map((item) => {
              return (
                <tr key={item.title}>
                  <td style={{ width: 40 + "px" }}>
                    <i
                      data-id={item.ID}
                      onClick={(e) =>
                        this.play(e.target.getAttribute("data-id"))
                      }
                      class="icon bi bi-play-fill"
                    ></i>
                  </td>
                  <td style={{ width: 70 + "px" }} class="img">
                    <img src={this.getImage(item)} />
                  </td>
                  <td style={{ width: 250 + "px" }} class="title">
                    {item.title}
                  </td>
                  <td
                    onClick={(event) =>
                      this.props.onSearch(event.target.textContent)
                    }
                    style={{ width: 250 + "px" }}
                  >
                    <Link class="link" to={"/search?" + item.artist}>
                      {item.artist}
                    </Link>
                  </td>
                  <td
                    onClick={(event) =>
                      this.props.onSearch(event.target.textContent)
                    }
                    style={{ width: 250 + "px" }}
                  >
                    <Link class="link" to={"/search?" + item.album}>
                      {item.album}
                    </Link>
                  </td>
                  <td
                    onClick={(event) =>
                      this.props.onSearch(event.target.textContent)
                    }
                    style={{ width: 150 + "px" }}
                  >
                    <Link class="link" to={"/search?" + item.uploader}>
                      {item.uploader}
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Table;
