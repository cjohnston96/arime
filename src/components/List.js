import React, { Component } from "react";
import { Link } from "react-router-dom";
import stockList from "./stockList.json"

export default class List extends Component {
  render() {
    let list = stockList.map(item => {
      return (
        <div className="stockLink" key={item.name}>
          <p>
            <Link to={"/stocks/" + item.name}>{item.name}</Link>
          </p>
        </div>
      );
    });
    return <div>{list}</div>;
  }
}