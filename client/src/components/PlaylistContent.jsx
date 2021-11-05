import React, { useState, useEffect, Component } from "react";
import Axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import "../stylesheets/PlaylistContent.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Link } from "react-router-dom";

class Content extends React.Component {
  state = {
    data: [],
  };

  getData() {
    this.setState({ data: [] });
    Axios.get("http://localhost:3001/api/playlistcontent", {
      params: { playlistID: this.props.id },
    }).then((response) => {
      this.setState({ data: response.data });
    });
  }

  componentDidMount() {
    this.getData();
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

  remove = (songID) => {
    Axios.post("http://localhost:3001/api/removefromplaylist", {
      params: { songID: songID, playlistID: this.props.id },
    }).then(() => {
      this.getData();
    });
  };

  render() {
    var items = this.state.data;
    if (items.length === 0) {
      return <p class="emptymessage">Playlist empty.</p>;
    } else {
      return (
        <div className="playlistContent" hidden={this.props.visibility}>
          <table>
            <thead>
              <tr>
                <th style={{ width: 43 + "px" }}></th>
                <th style={{ width: 70 + "px" }}></th>
                <th style={{ width: 250 + "px" }}>Title</th>
                <th style={{ width: 250 + "px" }}>Artist</th>
                <th style={{ width: 250 + "px" }}>Album</th>
                <th style={{ width: 100 + "px" }}>Uploader</th>
                <th style={{ width: 60 + "px" }}></th>
              </tr>
            </thead>
            <tbody overflow>
              {items.map((item) => {
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
                    <td style={{ width: 250 + "px" }}>
                      <Link
                        onClick={(event) =>
                          this.props.onSearch(event.target.textContent)
                        }
                        class="link"
                        to={"/search?" + item.artist}
                      >
                        {item.artist}
                      </Link>
                    </td>
                    <td style={{ width: 250 + "px" }}>
                      <Link
                        onClick={(event) =>
                          this.props.onSearch(event.target.textContent)
                        }
                        class="link"
                        to={"/search?" + item.album}
                      >
                        {item.album}
                      </Link>
                    </td>
                    <td style={{ width: 100 + "px" }}>
                      <Link
                        onClick={(event) =>
                          this.props.onSearch(event.target.textContent)
                        }
                        class="link"
                        to={"/search?" + item.uploader}
                      >
                        {item.uploader}
                      </Link>
                    </td>
                    <td style={{ width: 60 + "px" }}>
                      <i
                        onClick={(e) => {
                          this.remove(item.ID);
                        }}
                        class="icon bi bi-x"
                      ></i>
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

export default Content;
