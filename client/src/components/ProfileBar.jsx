import React, { Component } from "react";
import "../stylesheets/ProfileBar.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import ProfileDialog from "./ProfileDialog";

class Profile extends React.Component {
  state = {
    profileDialogShow: false,
  };

  logout = () => {
    this.props.updateUser("");
    localStorage.setItem("user", "");
  };

  render() {
    var button;
    if (this.props.user != "" && this.props.user != null) {
      button = (
        <button
          class="profileBar"
          onClick={() => {
            this.logout();
          }}
        >
          <i class="icon bi bi-person"></i>
          Log Out
        </button>
      );
    } else {
      button = (
        <button
          class="profileBar"
          onClick={() => {
            this.setState({ profileDialogShow: true });
          }}
        >
          <i class="icon bi bi-person"></i>
          Profile
        </button>
      );
    }
    return (
      <React.Fragment>
        {button}
        <div>
          <ProfileDialog
            show={this.state.profileDialogShow}
            loggedInUser={this.props.user}
            updateUser={(newUser) => this.props.updateUser(newUser)}
            onHide={() => {
              this.setState({ profileDialogShow: false });
            }}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default Profile;
