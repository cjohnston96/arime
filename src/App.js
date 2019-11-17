import React from 'react';
import Stock from './components/Stock';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import List from './components/List';
// import Home from './components/Home';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stock: null
    };
    this.setStock = this.setStock.bind(this);
  }

  setStock(name) {
    this.setState({ name: name });
  }

  render() {
    return (
      <Router>
        <div className="Body">
          <nav>
            <Link to="/" fontWeight="600">
              <h1>ARIMe</h1>
            </Link>
            <Link to="/stocks" className="stocksLink">Stocks</Link>
          </nav>
          <div className="Main">
            <Route path="/" 
              // exact component={Home}
            />
            <Route path="/stocks"
                  exact component={List}
            />

            <Route path="/stocks/:name" render={routerProps => (
              <Stock
                setName={this.setName}
                {...routerProps}
                {...this.state}/>)}                 
              />
              
          </div>
        </div>
      </Router>
    );
  }
}
