import React from 'react';
import Stock from './components/Stock';
import './App.css';

class App extends React.Component {

  state = {
    visible: true
  }


  
  render() {
    return (
      <div className="Main">

        <div className="App">
          <Stock />
        </div>

      </div>
    );
  }
}

export default App;
