import React, { useState, useEffect, Component } from "react";
import Axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import "../stylesheets/Table.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Link } from "react-router-dom";
import { Dropdown } from "react-bootstrap";

class Table extends React.Component {
  state = {
    data: [],
    playlists: [],
    favoritePlaylistID: 0,
    hideNewPlaylistInput: true,
    previousSearchTerm: "",
  };

  getPlaylists() {
    Axios.get("http://localhost:3001/api/playlists", {
      params: { owner: this.props.user },
    }).then((response) => {
      this.setState({ playlists: response.data });
      this.state.playlists.forEach((playlist) => {
        if (playlist.name === "Favorites")
          this.setState({ favoritePlaylistID: playlist.ID });
      });
    });
  }

  getSearchTerm() {
    var url = window.location.href;
    var searchTerm = url.substring("http://localhost:3000/search?".length);
    return decodeURI(searchTerm);
  }

  getData(searchTerm) {
    this.setState({ data: [], previousSearchTerm: searchTerm });
    Axios.get("http://localhost:3001/api/query", {
      params: { searchTerm: searchTerm },
    }).then((response) => {
      this.setState({ data: response.data });
    });
  }

  componentDidMount() {
    this.getData(this.getSearchTerm());
    this.getPlaylists();
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.previousSearchTerm != nextProps.searchTerm)
      this.getData(nextProps.searchTerm);
  }

  getImage(item) {
    var image = item.coverpath;
    if (image === "") image = "default.jpg";
    else image = "http://localhost:3001/" + image;
    return image;
  }

  play = (songID) => {
    var queue = [];
    this.state.data.map((item) => {
      queue.push(item.ID);
    });
    this.props.onQueueChange(queue);
    if (this.props.songID === songID) this.props.onPlay(0);
    else this.props.onPlay(songID);
  };

  addToPlaylist = (songID, playlistID) => {
    Axios.post("http://localhost:3001/api/addtoplaylist", {
      params: { songID: songID, playlistID: playlistID },
    });
  };

  revealPlaylistInput = (event) => {
    event.preventDefault();
    event.stopPropagation();
    this.setState({ hideNewPlaylistInput: false });
  };

  createNewPlaylist = (inputField) => {
    this.setState({ hideNewPlaylistInput: true });
    Axios.post("http://localhost:3001/api/createplaylist", {
      params: { username: this.props.user, playlist: inputField.value },
    }).then(() => {
      this.getPlaylists();
    });
  };

  playlistInput() {
    if (!this.state.hideNewPlaylistInput)
      return (
        <input
          type="text"
          placeholder="New Playlist"
          autoFocus="autofocus"
          onKeyPress={(event) => {
            event.key === "Enter" && this.createNewPlaylist(event.target);
          }}
          onBlur={() =>
            this.setState({
              hideNewPlaylistInput: true,
            })
          }
        ></input>
      );
  }

  render() {
    if (this.state.data.length === 0) {
      return <p class="emptymessage">No results found!</p>;
    } else {
      var playlists = [...this.state.playlists];
      return (
        <div className="table">
          <table>
            <thead>
              <tr>
                <th style={{ width: 40 + "px" }}></th>
                <th style={{ width: 70 + "px" }}></th>
                <th style={{ width: 250 + "px" }}>TITLE</th>
                <th style={{ width: 250 + "px" }}>ARTIST</th>
                <th style={{ width: 250 + "px" }}>ALBUM</th>
                <th style={{ width: 100 + "px" }}>UPLOADER</th>
                <th style={{ width: 40 + "px" }}></th>
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
                      style={{ width: 120 + "px" }}
                    >
                      <Link class="link" to={"/search?" + item.uploader}>
                        {item.uploader}
                      </Link>
                    </td>
                    <td style={{ width: 40 + "px" }}>
                      <Dropdown>
                        <Dropdown.Toggle className="dropdown">
                          <i class="icon bi bi-three-dots"></i>
                        </Dropdown.Toggle>

                        <Dropdown.Menu className="dropdown-menu">
                          <Dropdown.Item
                            className="dropdown-item"
                            onClick={() =>
                              this.addToPlaylist(
                                item.ID,
                                this.state.favoritePlaylistID
                              )
                            }
                          >
                            <i class="icon bi bi-heart"></i>
                            Add to Favorites
                          </Dropdown.Item>
                          <Dropdown.Divider className="dropdown-divider" />
                          <Dropdown.Item
                            className="dropdown-item"
                            onClick={(event) => this.revealPlaylistInput(event)}
                          >
                            <i class="icon bi bi-plus-circle"></i>
                            Create Playlist
                          </Dropdown.Item>
                          {this.playlistInput()}
                          {playlists.reverse().map((playlist) => {
                            if (playlist.ID != this.state.favoritePlaylistID)
                              return (
                                <Dropdown.Item
                                  className="dropdown-item playlist"
                                  onClick={() =>
                                    this.addToPlaylist(item.ID, playlist.ID)
                                  }
                                >
                                  {"Add to " + playlist.name}
                                </Dropdown.Item>
                              );
                          })}
                        </Dropdown.Menu>
                      </Dropdown>
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
}

export default Table;
