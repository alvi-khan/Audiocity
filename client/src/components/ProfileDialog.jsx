import React, { Component } from "react";
import axios from "axios";
import ReactModal from "react-modal";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../stylesheets/ProfileDialog.css";

class ProfileDialog extends React.Component {
  state = {
    userEmail: "",
    userPassword: "",
    showLogIn: true,
    submitButtonText: "Log In",
    dialogSwitchPromptText: "Don't have an account?",
    dialogSwitchButtonText: "Sign up",
  };

  handleClose = () => {
    this.props.onHide();
  };

  handleDialogSwitch() {
    if (this.state.showLogIn == false) {
      this.setState({
        showLogIn: true,
        submitButtonText: "Log In",
        dialogSwitchPromptText: "Don't have an account?",
        dialogSwitchButtonText: "Sign up",
      });
    } else {
      this.setState({
        showLogIn: false,
        submitButtonText: "Sign up",
        dialogSwitchPromptText: "Have an account?",
        dialogSwitchButtonText: "Log in",
      });
    }
  }

  getUserEmail = (event) => {
    this.setState({ userEmail: event.target.value });
  };

  getUserPassword = (event) => {
    this.setState({ userEmail: event.target.value });
  };

  handleLogin = (event) => {
    event.preventDefault();
    console.log("called");
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
          <form onSubmit={(event) => this.handleLogin(event)}>
            <div>
              <label class="profileFormLabel">
                Email
                <input
                  class="inputProfileInfo"
                  name="email"
                  type="text"
                  required
                  onChange={(event) => this.getUserEmail(event)}
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
                onChange={(event) => this.getUserPassword(event)}
              />
            </label>
            <input
              type="submit"
              onSubmit={(event) => this.handleLogin(event)}
              id="profileFormSubmit"
              hidden
            />
          </form>
          <label class="submitButton" for="profileFormSubmit">
            {this.state.submitButtonText}
          </label>
          <div class="dialogSwitchButtonContainer">
            <h5 class="promptText">{this.state.dialogSwitchPromptText}</h5>
            <button
              class="dialogSwitchButton"
              onClick={() => {
                this.handleDialogSwitch();
              }}
            >
              {this.state.dialogSwitchButtonText}
            </button>
          </div>
        </div>
      </ReactModal>
    );
  }
}

export default ProfileDialog;
