import React, { Component } from "react";
import "../stylesheets/ProfileBar.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import ProfileDialog from "./ProfileDialog";

class Profile extends React.Component {
  state = {
    profileDialogShow: false,
  };

  render() {
    return (
      <div>
        <button
          class="profileBar"
          onClick={() => {
            this.setState({ profileDialogShow: true });
          }}
        >
          <i class="icon bi bi-person"></i>
          Profile
        </button>
        <ProfileDialog
          show={this.state.profileDialogShow}
          onHide={() => {
            this.setState({ profileDialogShow: false });
          }}
        />
      </div>
    );
  }
}

export default Profile;
