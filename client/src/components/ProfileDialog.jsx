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
    loggedInUser: "",
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
    this.setState({ userPassword: event.target.value });
  };

  register() {
    axios
      .get("http://localhost:3001/api/checkuser", {
        params: { userEmail: this.state.userEmail },
      })
      .then((response) => {
        if (response.data.length === 0) {
          axios
            .post("http://localhost:3001/api/register", {
              params: {
                userEmail: this.state.userEmail,
                userPassword: this.state.userPassword,
              },
            })
            .then((response, error) => {
              this.setState({ loggedInUser: this.state.userEmail });
              console.log("done");
            });
        } else {
          console.log("user exists");
        }
      });
  }

  login() {}

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.showLogIn) this.login();
    else this.register();
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
          <form onSubmit={(event) => this.handleSubmit(event)}>
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
              onSubmit={(event) => this.handleSubmit(event)}
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
