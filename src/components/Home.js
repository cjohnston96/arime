import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Home extends Component {
  render() {
    return(
        <div>
            <h1>
                Welcome to ARIMe
            </h1>
            <Link to={"/"}>ARIMe</Link>
        </div>
    );
  }
}