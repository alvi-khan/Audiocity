import React, { Component } from "react";
import "../stylesheets/ProfileBar.css";
import "bootstrap-icons/font/bootstrap-icons.css";

class Profile extends React.Component {
  render() {
    return (
      <button class="profileBar">
        <i class="icon bi bi-person"></i>
        Profile
      </button>
    );
  }
}

export default Profile;
