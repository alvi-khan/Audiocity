import React, { Component } from "react";
import axios from "axios";
import ReactModal from "react-modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../stylesheets/UploadDialog.css";
import "bootstrap-icons/font/bootstrap-icons.css";

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
    overlay: "hidden",
  };

  toast = {
    position: "top-right",
    delay: 1000,
    closeButton: false,
    autoClose: 2000,
    hideProgressBar: true,
    progress: undefined,
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
    this.props.onHide();
    var toastId = null;
    event.preventDefault();
    var data = new FormData();
    data.append("image", this.state.image);
    data.append("song", this.state.song);
    data.append("title", this.state.title);
    data.append("artist", this.state.artist);
    data.append("album", this.state.album);
    data.append("uploader", this.state.uploader);
    axios
      .post("http://localhost:3001/api/upload", data, {
        onUploadProgress: (ProgressEvent) => {
          var progress = ProgressEvent.loaded / ProgressEvent.total;
          if (progress === 1) progress = 0.99;
          if (toastId === null) {
            toastId = toast(
              "Uploading...",
              {
                progress: progress,
                type: toast.TYPE.DEFAULT,
                closeButton: false,
              },
              this.toast
            );
          } else {
            toast.update(toastId, {
              progress: progress,
            });
          }
        },
      })
      .then(() => {
        toast.update(toastId, {
          render: "Uploaded!",
          type: toast.TYPE.SUCCESS,
        });
        setTimeout(() => {
          toast.dismiss(toastId);
        }, 2000);
        var searchTerm = this.props.searchTerm;
        this.props.onSearch("");
        setTimeout(() => {
          this.props.onSearch(searchTerm);
        }, 500);
      })
      .catch((err) => {
        toast.update(toastId, {
          render: err,
          type: toast.TYPE.ERROR,
        });
      })
      .finally(() => {
        this.reset();
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

  saveFile(file) {
    if (file.type.startsWith("image/"))
      this.setState({ imageUrl: URL.createObjectURL(file), image: file });
    else if (file.type.startsWith("audio/"))
      this.setState({ filename: file.name, song: file });
  }

  fileUpload = (event) => {
    if (event.target.files && event.target.files[0]) {
      var uploadSite = event.target.name;
      var fileType = event.target.files[0].type;
      if (fileType.startsWith(uploadSite)) this.saveFile(event.target.files[0]);
    }
  };

  handleDrop = (event) => {
    this.setState({ overlay: "hidden" });
    event.stopPropagation();
    event.preventDefault();
    if (event.dataTransfer.files && event.dataTransfer.files[0])
      this.saveFile(event.dataTransfer.files[0]);
  };

  handleDragOver = (event) => {
    if (this.state.overlay === "hidden") this.setState({ overlay: "visible" });
    event.stopPropagation();
    event.preventDefault();
  };

  handleDragEnter = (event) => {
    this.setState({ overlay: "visible" });
    event.stopPropagation();
    event.preventDefault();
  };

  handleDragExit = (event) => {
    this.setState({ overlay: "hidden" });
    event.stopPropagation();
    event.preventDefault();
  };

  getDraggableClass() {
    if (this.state.overlay === "visible") return " mouseHide";
    else return "";
  }

  getImageContent() {
    if (this.state.imageUrl != "") {
      return <img src={this.state.imageUrl} />;
    } else {
      return (
        <React.Fragment>
          <div>
            <i class="icon bi bi-image"></i>
          </div>
          <header>{"Drag & Drop"}</header>
          <header>{"to Upload Image"}</header>
          <header>{"or"}</header>
          <div class="button">Browser Files</div>
        </React.Fragment>
      );
    }
  }

  render() {
    return (
      <React.Fragment>
        <ToastContainer class="toast" />
        <ReactModal
          isOpen={this.props.show}
          onRequestClose={this.handleClose}
          className="Modal upload"
          overlayClassName="Overlay"
        >
          <div
            onDragOver={(event) => this.handleDragOver(event)}
            onDragEnter={(event) => this.handleDragEnter(event)}
            onDragLeave={(event) => this.handleDragExit(event)}
            onDrop={(event) => this.handleDrop(event)}
            class="uploadContainer"
          >
            <div class="overlay" style={{ visibility: this.state.overlay }}>
              <i class="icon bi bi-cloud-upload"></i>
              <header>{"Release to upload"}</header>
            </div>
            <div class={"upload" + this.getDraggableClass()}>
              <label class="image">
                <input
                  name="image"
                  type="file"
                  accept=".png, .jpg"
                  onChange={this.fileUpload}
                />
                {this.getImageContent()}
              </label>
              <form class="form">
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
                <label
                  class="button"
                  filename={this.state.filename || "Nothing Selected!"}
                >
                  <input
                    name="audio"
                    type="file"
                    accept=".mp3, .flac"
                    onChange={this.fileUpload}
                    required
                  />
                </label>
              </form>
              <div class="buttons">
                <button onClick={this.handleSubmit}>Upload</button>
                <button onClick={this.handleClose}>Cancel</button>
              </div>
            </div>
          </div>
        </ReactModal>
      </React.Fragment>
    );
  }
}

export default UploadDialog;
