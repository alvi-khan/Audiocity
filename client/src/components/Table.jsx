import React, { useState, useEffect, Component } from "react";
import Axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import "../stylesheets/Table.css";
import "bootstrap-icons/font/bootstrap-icons.css";

class Table extends React.Component {
  state = {
    loaded: false,
    data: [],
  };

  getData(searchTerm) {
    Axios.get("http://localhost:3001/api/query", {
      params: { searchTerm: searchTerm },
    })
      .then((response) => {
        this.setState({ data: response.data });
      })
      .finally(this.setState({ loaded: true }));
  }

  componentDidMount() {
    this.getData();
  }

  componentWillReceiveProps(nextProps) {
    this.getData(nextProps.searchTerm);
  }

  render() {
    return (
      <div className="table">
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Title</th>
              <th>Artist</th>
              <th>Album</th>
              <th>Uploader</th>
            </tr>
          </thead>
          <tbody overflow>
            {this.state.data.map((item) => {
              return (
                <tr key={item.title}>
                  <td>
                    <i
                      data-id={item.ID}
                      onClick={(e) =>
                        this.props.onPlay(e.target.getAttribute("data-id"))
                      }
                      class="icon bi bi-play-fill"
                    ></i>
                  </td>
                  <td class="title">{item.title}</td>
                  <td>{item.artist}</td>
                  <td>{item.album}</td>
                  <td>{item.uploader}</td>
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
