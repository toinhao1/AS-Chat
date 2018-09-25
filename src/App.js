import React, { Component } from 'react';
import './App.css';
import  RoomList  from './components/RoomList';
import  MessageList  from './components/MessageList';
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
      currentMesages: 0
    };
  }

  setActiveRoom(room, message) {
    this.setState({currentRoom: room, currentMesages: message});
  }

  render() {
    return (
      <section className="App">
        <header className="App-header">
          <h1>AS Chat</h1>
        </header>
        <div className="roomlist">
          <RoomList
          firebase={firebase}
          currentRoom={this.state.currentRoom}
          setActiveRoom={this.setActiveRoom.bind(this)}/>
        </div>
        <div className="messagelist">
          <MessageList
          firebase={firebase}
          currentRoom={this.state.currentRoom}
          currentMesages={this.state.currentMesages}
          setActiveRoom={(room, message) => this.setActiveRoom(room, message)}/>
        </div>
      </section>
    );
  }
}

export default App;
