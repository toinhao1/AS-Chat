import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import  RoomList  from './components/RoomList';
import MessageList from './components/MessgeList';
import * as firebase from 'firebase';

// Initialize Firebase
  var config = {
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
      currentRoom: 0,
      activeRoom: ''
    };
  }

  setActiveRoom() {
    this.setState({})
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>AS Chat</h1>
        </header>
        <div className="roomlist">
            <RoomList firebase={firebase} currentRoom={this.state.currentRoom}/>
        </div>
        <div classname="messagelist">
          <MessageList firebase={firebase} currentRoom{this.state.currentRoom}/>
        </div>
      </div>
    );
  }
}

export default App;
