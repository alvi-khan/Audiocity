import React, { Component } from "react";
import "../stylesheets/ProfileBar.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import ProfileDialog from "./ProfileDialog";
import { Dropdown } from "react-bootstrap";

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
        <Dropdown className="profileOptions">
          <Dropdown.Toggle className="dropdown">
            <button class="profileBar">
              <i class="icon bi bi-person-circle"></i>
              {this.props.user}
            </button>
          </Dropdown.Toggle>

          <Dropdown.Menu className="dropdown-menu">
            <Dropdown.Item
              className="dropdown-item"
              onClick={() => {
                this.logout();
              }}
            >
              <i class="icon bi bi-box-arrow-left"></i>
              Log out
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      );
    } else {
      button = (
        <button
          class="profileBar"
          onClick={() => {
            this.setState({ profileDialogShow: true });
          }}
        >
          <i class="icon bi bi-person-circle"></i>
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
