import React, { Component } from "react";
import axios from "axios";
import ReactModal from "react-modal";
import "../stylesheets/UploadDialog.css";

class UploadDialog extends React.Component {
  state = {
    title: "",
    artist: "",
    album: "-",
    image: null,
    imageUrl: "",
    song: null,
    filename: "",
    uploader: "Admin",
  };

  reset = () => {
    this.setState({
      title: "",
      artist: "",
      album: "-",
      image: null,
      imageUrl: "",
      song: null,
      filename: "",
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    var data = new FormData();
    data.append("image", this.state.image);
    data.append("song", this.state.song);
    data.append("title", this.state.title);
    data.append("artist", this.state.artist);
    data.append("album", this.state.album);
    data.append("uploader", this.state.uploader);
    axios
      .post("http://localhost:3001/api/upload", data)
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        this.handleClose();
      });
  };

  handleClose = () => {
    this.reset();
    this.props.onHide();
  };

  textChanged = (event) => {
    var field = event.target.name;
    if (event.target.value) this.setState({ [field]: event.target.value });
  };

  fileUpload = (event) => {
    if (event.target.files && event.target.files[0]) {
      var field = event.target.name;
      var file = event.target.files[0];
      if (field === "image") {
        if (!(file.name.endsWith(".png") || file.name.endsWith(".jpg"))) return;
        this.setState({ imageUrl: URL.createObjectURL(file) });
      }
      if (field === "song") {
        if (!(file.name.endsWith(".flac") || file.name.endsWith(".mp3")))
          return;
        this.setState({ filename: file.name });
      }
      this.setState({ [field]: file });
    }
  };

  render() {
    return (
      <ReactModal
        isOpen={this.props.show}
        onRequestClose={this.handleClose}
        className="Modal"
        overlayClassName="Overlay"
      >
        <form>
          <label class="text">
            Title:
            <input
              name="title"
              onChange={this.textChanged}
              type="text"
              required
            />
          </label>
          <label class="text">
            Artist:
            <input
              name="artist"
              onChange={this.textChanged}
              type="text"
              required
            />
          </label>
          <label class="text">
            Album:
            <input name="album" onChange={this.textChanged} type="text" />
          </label>
          <div>
            <label for="song" class="button">
              <input
                id="song"
                name="song"
                type="file"
                accept=".mp3, .flac"
                onChange={this.fileUpload}
                required
              />
              Upload Song
            </label>
            <input
              id="song"
              name="song"
              type="text"
              value={this.state.filename}
              readOnly
            />
          </div>
          <div>
            <label class="button">
              <input
                name="image"
                type="file"
                accept=".png, .jpg"
                onChange={this.fileUpload}
              />
              Upload Cover
            </label>
            <img src={this.state.imageUrl} />
          </div>
          <div>
            <input type="submit" onClick={this.handleSubmit} value="Upload" />
            <button onClick={this.handleClose}>Cancel</button>
          </div>
        </form>
      </ReactModal>
    );
  }
}

export default UploadDialog;
