import React, {Component} from 'react';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      someData: "THE PAGE IS FUNCTIONAL",
    };
  };

  render() {
    return (
      <div>
        <h1> {this.state.someData} </h1>
        <h2> Some text here </h2>
      </div>
    );
  }

}

export default App;
