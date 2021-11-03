import React, { Component } from "react";
import axios from "axios";
import ReactModal from "react-modal";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../stylesheets/ProfileDialog.css";

class ProfileDialog extends React.Component {
  state = {
    userEmail: "",
    userPassword: "",
  };

  handleClose = () => {
    this.props.onHide();
  };

  render() {
    return (
      <ReactModal
        isOpen={this.props.show}
        onRequestClose={this.handleClose}
        className="profileModal"
        overlayClassName="profileOverlay"
      >
        <div class="profileDialogContainer">
          <h1 class="appTitle">Music Player</h1>
          <form>
            <div>
              <label class="profileFormLabel">
                Email
                <input
                  class="inputProfileInfo"
                  name="email"
                  type="text"
                  required
                />
              </label>
            </div>
            <label class="profileFormLabel">
              Password
              <input
                class="inputProfileInfo"
                name="password"
                type="password"
                required
                autoComplete="off"
              />
            </label>
          </form>
          <button class="loginButton">Log In</button>
          <div class="signupButtonContainer">
            <h5 class="promptText">Don't have an account?</h5>
            <button class="signupButton">Sign up</button>
          </div>
        </div>
      </ReactModal>
    );
  }
}

export default ProfileDialog;
