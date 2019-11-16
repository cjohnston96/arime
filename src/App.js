import React from 'react';
import Stock from './components/Stock';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
let choice;

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stock: null
    };
    this.setStock = this.setStock.bind(this);
  }

  setStock(name, choice) {
    this.setState({ name: name });
  }

  render() {
    return (
      <Router>
        <nav>
          <Link to="/">
            <h1>ARIMe</h1>
          </Link>
          <Link to="/stocks">Stocks</Link>
        </nav>
      <div className="Main">
        <Route path="/"
              // exact component={Home}
        />
        <Route path="/stocks"
              component={Stock}
        />
        <Route path="/stocks/:name" render={routerProps => (
          <Stock
            setName={this.setName}
            {...routerProps}
            {...this.state}/>)}                 
          />
        {/* <div className="App">
          <Stock />
        </div> */}

      </div>
      </Router>
    );
  }
}
