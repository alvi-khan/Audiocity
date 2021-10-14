import React, { useState, useEffect, Component } from "react";
import DataTable from "react-data-table-component";
import Axios from "axios";
import "bootstrap/dist/css/bootstrap.css";

let columns = [
  { name: "Title", selector: (row) => row.title },
  { name: "Artist", selector: (row) => row.artist },
  { name: "Album", selector: (row) => row.album },
  { name: "Uploader", selector: (row) => row.uploader },
];

class Table extends React.Component {
  state = {
    loaded: false,
    data: [],
  };

  getData() {
    Axios.get("http://localhost:3001/api/query")
      .then((response) => {
        this.setState({ data: response.data });
      })
      .finally(this.setState({ loaded: true }));
  }

  componentDidMount() {
    this.getData();
  }

  render() {
    if (this.state.loaded) {
      return (
        <DataTable theme="dark" columns={columns} data={this.state.data} />
      );
    }
    return <DataTable columns={columns} data={[]} />;
  }
}

export default Table;
