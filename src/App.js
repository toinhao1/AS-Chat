import React, { Component } from 'react';
import './App.css';
import  RoomList  from './components/RoomList';
import  MessageList  from './components/MessageList';
import  User from './components/User';
import * as firebase from 'firebase';

// Initialize Firebase
  const config = {
    apiKey: "AIzaSyAmStVE8sz3e9b7K4dHpDx2nPJVv_C2nRo",
    authDomain: "bloc-chat-6f432.firebaseapp.com",
    databaseURL: "https://bloc-chat-6f432.firebaseio.com",
    projectId: "bloc-chat-6f432",
    storageBucket: "bloc-chat-6f432.appspot.com",
    messagingSenderId: "7632258571"
  };
  firebase.initializeApp(config);

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentRoom: null,
      currentMesages: 0,
      user: null
    };
  }

  setUser(user) {
    if (user) {
      this.setState({ user: user.displayName });
    } else {
      this.setState({user: "Guest"})
    }
   }

  setActiveRoom(room, message) {
    this.setState({currentRoom: room, currentMesages: message});
  }

  render() {
    return (
      <section className="App">
        <header className="App-header">
          <h1>AS Chat</h1>
          <div>
            <User
            firebase={firebase}
            currentUsername={this.state.user}
            setUser={(e) => this.setUser(e)}/>
          </div>
        </header>
      <div>
          <div className="roomlist">
            <RoomList
              firebase={firebase}
              currentRoom={this.state.currentRoom}
              setActiveRoom={this.setActiveRoom.bind(this)}
              user={this.state.user}/>
          </div>
          <div className="messagelist">
            <MessageList
            firebase={firebase}
            currentRoom={this.state.currentRoom}
            currentMesages={this.state.currentMesages}
            setActiveRoom={(room, message) => this.setActiveRoom(room, message)}
            user={this.state.user}/>
          </div>
        </div>
      </section>
    );
  }
}

export default App;
