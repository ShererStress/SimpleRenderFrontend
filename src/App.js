import React, {Component} from 'react';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      someData: "THE PAGE IS FUNCTIONAL",
      loggedUseData: {
        username: null,
        mostrecentver: null,
      },
      formData: {
        username: "",
        password: "",
      },
    };
  };


  //Add a random text file to download via a link
  //Connect to backend with create/login/logout
  //Check for current version

  render() {
    return (
      <div>
        <h1> {this.state.someData} </h1>
        <h2> Some text here </h2>
        <a href="./downloads/testReadme.txt" download>Download File</a>

        <form>
          Username: <input type="text"></input> <br/>
          Password: <input type="password"></input> <br/>
          <button> LogIn </button>
        </form>


      </div>
    );
  }

}

export default App;
