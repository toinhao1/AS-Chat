import React, { Component } from 'react';



class MessgeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      showingMessages: []
    }
    this.messageRef = this.props.firebase.database().ref('messages');
  }
  componentDidMount() {
    this.messageRef.on('child_added', snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState({ messages: this.state.messages.concat( message ) }, () => {
        this.displayMessages(this.props.currentRoom)
      });
    });
  }
  receiveProps(nextProps){
    this.displayMessages( nextProps.currentRoom)
  }
  displayMessages(currentRoom) {
    this.setState({ showingMessages: this.state.messages.filter( message => message.roomId === currentRoom.key )});
  }

  render() {
    return(
      <section>
        <h2 className="current-room-name">{this.props.currentRoom ? this.props.currentRoom.name : ''}</h2>
        <div className="messagelist">
          <ul>
          {
            this.state.showingMessages.map( (message) =>
              <li key={message.key}>
                <div>{message.content}</div>
                <div>{message.username}</div>
                <div>{message.sentAt}</div>
              </li>
            )
          }
          </ul>
        </div>
      </section>
    )
  }
}
export default MessgeList;
