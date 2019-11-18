import React, { Component } from "react";
import { Link } from "react-router-dom";
import stockList from "./stockList.json";
import 'bootstrap/dist/css/bootstrap.min.css';

export default class List extends Component {

  render() {
    let list = stockList.map(item => {
      return (
        <nav key={item.name}>
          <p margin= "20px 0">
            <Link to={"/stocks/" + item.name}>{item.name}</Link>
          </p>
        </nav>
      );
    });
    return <div>{list}</div>;
  }
}