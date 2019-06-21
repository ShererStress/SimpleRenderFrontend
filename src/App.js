import React, {Component} from 'react';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);

    this.handleFormUpdate = this.handleFormUpdate.bind(this);
    this.handleCreateUser = this.handleCreateUser.bind(this);
    this.handleLogIn = this.handleLogIn.bind(this);
    this.clearForm = this.clearForm.bind(this);
    this.handleLogOut = this.handleLogOut.bind(this);
    this.handleDownload = this.handleDownload.bind(this);

    this.state = {
      currentVer: 0.01,
      someData: "THE PAGE IS FUNCTIONAL",
      loggedUserData: {
        username: null,
        mostrecentver: null,
        userDatabaseID: null,
      },
      formData: {
        username: "",
        password: "",
      },
    };
  };

  handleFormUpdate(eventIn) {
    let whichInput = eventIn.target.name;
    let newValue = eventIn.target.value;

    this.setState( (prevState) => {
      return {
        formData: Object.assign(
          {},
          prevState.formData,
          {[whichInput]: newValue}
        )
      }
    })
  };

  handleCreateUser(eventIn) {
    eventIn.preventDefault();
    let userData = {
      username: this.state.formData.username,
      password: this.state.formData.password,
    }

    fetch(`http://localhost:3000/users`, {
      body: JSON.stringify(userData),
      method: "POST",
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    })
    .then(data => {
      console.log("New user created");
      this.handleLogIn();
    })
  };

  handleLogIn(eventIn = null) {
    if(eventIn != null) {
      eventIn.preventDefault();
    }

    let userData = {
      username: this.state.formData.username,
      password: this.state.formData.password,
    }

    fetch(`http://localhost:3000/users/logIn`, {
      body: JSON.stringify(userData),
      method: "POST",
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    })
    .then(data => {
      return data.json();
    }).then(jData => {
      if(jData !== null) {
        let usersVersion = parseFloat(jData.mostrecentver)
        this.setState( (prevState) => {
          return {
            loggedUserData: {
              username: jData.username,
              mostrecentver: usersVersion,
              userDatabaseID: jData.id,
            }
          }
        })
        console.log("LOGGED IN");

      } else {
        console.log("INVALID CREDENTIALS");
      }
      console.log("Clear the form");
      this.clearForm();
    })

  };

  clearForm() {
    this.setState( (prevState) => {
      return {
        formData: {
          username: "",
          password: "",
        }
      }
    })
  }

  handleLogOut() {
    this.setState( (prevState) => {
      return {
        loggedUserData: {
          username: null,
          mostrecentver: null,
          userDatabaseID: null,
        }
      }
    })
  };

  handleDownload() {
    let userData = {currentVersion: this.state.currentVer,};
    fetch(`http://localhost:3000/users/${this.state.loggedUserData.userDatabaseID}`, {
      body: JSON.stringify(userData),
      method: "PUT",
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    }).then(data => {

      this.setState( (prevState) => {
        return {
          loggedUserData: Object.assign(
            {},
            prevState.loggedUserData,
            {mostrecentver: prevState.currentVer}
          )
        }
      })

      return data.json();
    });
  };


  //Add a random text file to download via a link
  //Connect to backend with create/login/logout
  //Check for current version

  render() {
    return (
      <div>
        <h1> {this.state.someData} </h1>


        { this.state.loggedUserData.username === null ?
          <form>
            Username: <input onChange={this.handleFormUpdate} type="text" name="username" value={this.state.formData.username}></input> <br/>
            Password: <input onChange={this.handleFormUpdate} type="password" name="password" value={this.state.formData.password}></input> <br/>
            <button onClick={this.handleCreateUser}> Create New Account </button>
            <button onClick={this.handleLogIn}> Log In </button>
          </form>
        :
          <div>
            <h2> Welcome, {this.state.loggedUserData.username} <button onClick={this.handleLogOut}> Log Out</button></h2>
            <h3> Your most recently downloaded version was: {this.state.loggedUserData.mostrecentver} </h3>
            {this.state.loggedUserData.mostrecentver >= this.state.currentVer ?
              <h3> You have the up-to-date version! </h3>
              :
              <h3> A new version is available ({this.state.loggedUserData.mostrecentver}  -> {this.state.currentVer}) </h3>
            }
            </div>
        }
        <br/>
        <h2> Click to begin download: </h2>
        <a href="./downloads/testReadme.txt" onClick={this.handleDownload} download>Download SimpleRender</a> (Ver {this.state.currentVer})

      </div>
    );
  }

}

export default App;
