import React from "react";
import axios from "axios";
import ReactModal from "react-modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../stylesheets/UploadDialog.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import * as musicMetadata from "music-metadata-browser";

class UploadDialog extends React.Component {
  state = {
    title: "",
    artist: "",
    album: "-",
    image: null,
    imageUrl: "",
    song: null,
    filename: "",
    overlay: "hidden",
    titleError: "",
    artistError: "",
    fileError: "",
    imageError: "",
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

  checkErrors() {
    if (this.state.title === "") {
      this.setState({ titleError: "Please enter song title." });
      return false;
    } else this.setState({ titleError: "" });
    if (this.state.artist === "") {
      this.setState({ artistError: "Please enter artist name." });
      return false;
    } else this.setState({ artistError: "" });
    if (this.state.song == null) {
      this.setState({ fileError: "Please select a .mp3/.flac file." });
      return false;
    } else this.setState({ fileError: "" });
    return true;
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if (!this.checkErrors()) return;
    this.props.onHide();
    var toastId = null;
    var data = new FormData();
    data.append("image", this.state.image);
    data.append("song", this.state.song);
    data.append("title", this.state.title);
    data.append("artist", this.state.artist);
    data.append("album", this.state.album);
    data.append("uploader", this.props.user);
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
                bodyClassName: "toasttext",
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

  // extracts image from audio file metadata
  extractImage = (image) => {
    let blob = new Blob([image.data.buffer], { type: image.format });
    this.setState({
      imageUrl: URL.createObjectURL(blob),
      image: blob,
      imageError: "",
    });
  }

  readAudio(file) {
    musicMetadata.parseBlob(file).then((metadata) => {
      var data = metadata.common;
      if (data.artist) this.setState({ artist: data.artist });
      if (data.album) this.setState({ album: data.album });
      if (data.title) this.setState({ title: data.title });
      if (data.picture[0])  this.extractImage(data.picture[0])
    });
  }

  saveFile(file) {
    if (file.type.startsWith("image/"))
      this.setState({
        imageUrl: URL.createObjectURL(file),
        image: file,
        imageError: "",
      });
    else if (file.type.startsWith("audio/")) {
      this.setState({ filename: file.name, song: file, fileError: "" });
      this.readAudio(file);
    }
  }

  fileUpload = (event) => {
    if (event.target.files && event.target.files[0]) {
      var uploadSite = event.target.name;
      var fileType = event.target.files[0].type;
      if (fileType.startsWith(uploadSite)) this.saveFile(event.target.files[0]);
      else {
        if (uploadSite === "image")
          this.setState({ imageError: "Please select a .jpg/.png file." });
        else if (uploadSite === "audio")
          this.setState({ fileError: "Please select a .mp3/.flac file." });
      }
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
    if (this.state.imageUrl !== "") {
      return <img alt="" src={this.state.imageUrl} />;
    } else {
      return (
        <React.Fragment>
          <div class="iconContainerUpload">
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
              <div class="imageContainer">
                <label class="image">
                  <input
                    name="image"
                    type="file"
                    accept=".png, .jpg"
                    onChange={this.fileUpload}
                  />
                  {this.getImageContent()}
                </label>
                <p class="error">{this.state.imageError}</p>
              </div>
              <form onSubmit={this.handleSubmit} class="form">
                <label class="text">
                  Title:
                  <input
                    name="title"
                    onChange={this.textChanged}
                    type="text"
                    value={this.state.title}
                    autocomplete="off"
                  />
                  <p class="error">{this.state.titleError}</p>
                </label>
                <label class="text">
                  Artist:
                  <input
                    name="artist"
                    onChange={this.textChanged}
                    type="text"
                    value={this.state.artist}
                    autocomplete="off"
                  />
                  <p class="error">{this.state.artistError}</p>
                </label>
                <label class="text">
                  Album:
                  <input
                    name="album"
                    onChange={this.textChanged}
                    type="text"
                    value={this.state.album}
                    autocomplete="off"
                  />
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
                  />
                </label>
                <p class="error">{this.state.fileError}</p>
                <input
                  type="submit"
                  onSubmit={this.handleSubmit}
                  id="formSubmit"
                  hidden
                />
              </form>
              <div class="buttons">
                <label class="button" for="formSubmit">
                  Upload
                </label>
                <label class="button" onClick={this.handleClose}>
                  Cancel
                </label>
              </div>
            </div>
          </div>
        </ReactModal>
      </React.Fragment>
    );
  }
}

export default UploadDialog;
