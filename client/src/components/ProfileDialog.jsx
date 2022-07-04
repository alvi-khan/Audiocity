import React from "react";
import axios from "axios";
import ReactModal from "react-modal";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../stylesheets/ProfileDialog.css";
import md5 from "md5";

class ProfileDialog extends React.Component {
  state = {
    userEmail: "",
    userPassword: "",
    showLogIn: true,
    submitButtonText: "Log In",
    dialogSwitchPromptText: "Don't have an account?",
    dialogSwitchButtonText: "Sign up",
    loggedInUser: "",
    emailError: "",
    passwordError: "",
  };

  handleClose = () => {
    this.props.onHide();
  };

  createFavoritesPlaylist() {
    axios.post("http://localhost:3001/api/createplaylist", {
      params: { username: this.state.loggedInUser, playlist: "Favorites" },
    });
  }

  handleDialogSwitch() {
    this.setState({ emailError: "", passwordError: "" });
    if (this.state.showLogIn === false) {
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
    this.setState({ userEmail: event.target.value, emailError: "" });
  };

  getUserPassword = (event) => {
    var password = md5(event.target.value);
    this.setState({ userPassword: password, passwordError: "" });
  };

  register() {
    axios
      .get("http://localhost:3001/api/checkuser", {
        params: { userEmail: this.state.userEmail },
      })
      .then((response) => {
        if (response.data.rows.length === 0) {
          axios
            .post("http://localhost:3001/api/register", {
              params: {
                userEmail: this.state.userEmail,
                userPassword: this.state.userPassword,
              },
            })
            .then((response, error) => {
              this.setState({ loggedInUser: this.state.userEmail });
              localStorage.setItem("user", this.state.loggedInUser);
              this.props.updateUser(this.state.loggedInUser);
              this.createFavoritesPlaylist();
              this.handleClose();
            });
        } else {
          this.setState({ emailError: "Username already in use." });
        }
      });
  }

  login() {
    axios
      .get("http://localhost:3001/api/checkuser", {
        params: { userEmail: this.state.userEmail },
      })
      .then((response) => {
        if (response.data.rows.length !== 0) {
          axios
            .get("http://localhost:3001/api/validateuser", {
              params: {
                userEmail: this.state.userEmail,
                userPassword: this.state.userPassword,
              },
            })
            .then((response) => {
              if (response.data.rows.length !== 0) {
                this.setState({ loggedInUser: this.state.userEmail });
                this.handleClose();
                localStorage.setItem("user", this.state.loggedInUser);
                this.props.updateUser(this.state.loggedInUser);
              } else {
                this.setState({ passwordError: "Invalid password." });
              }
            });
        } else {
          this.setState({ emailError: "Invalid username." });
        }
      });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    if (this.state.userEmail === "") {
      this.setState({ emailError: "Please enter a username." });
      return;
    }
    if (this.state.userPassword === "") {
      this.setState({ passwordError: "Please enter a password." });
      return;
    }

    if (this.state.showLogIn) this.login();
    else this.register();
  };

  componentDidMount() {
    this.setState({ loggedInUser: this.props.loggedInUser });
  }

  render() {
    return (
      <ReactModal
        isOpen={this.props.show}
        onRequestClose={this.handleClose}
        className="profileModal"
        overlayClassName="profileOverlay"
      >
        <div class="profileDialogContainer">
          <h1 class="appTitle">Audiocity</h1>
          <form onSubmit={(event) => this.handleSubmit(event)}>
            <div>
              <label class="profileFormLabel">
                Username
                <input
                  class="inputProfileInfo"
                  name="email"
                  type="text"
                  onChange={(event) => this.getUserEmail(event)}
                />
                <p class="error">{this.state.emailError}</p>
              </label>
            </div>
            <label class="profileFormLabel">
              Password
              <input
                class="inputProfileInfo"
                name="password"
                type="password"
                autoComplete="off"
                onChange={(event) => this.getUserPassword(event)}
              />
              <p class="error">{this.state.passwordError}</p>
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
