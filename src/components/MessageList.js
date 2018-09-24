import React, { Component } from 'react';



class MessgeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      showMessages: []
    }
    this.messageRef = this.props.firebase.database().ref('messages');
  }
  componentDidMount() {
    this.messageRef.on('child_added' , (snapshot) => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState({ messages: this.state.messages.concat(message)});
    })
  }
  receiveProps(nextProps) {
    this.displayMessages( nextProps.currentRoom, nextProps.currentMesages);
  }

  displayMessages(currentRoom, messages) {
    const updateMessage = this.state.messages.filter(function(e){
      return e.roomId === currentRoom
    })
    this.setState({currentMesages: messages})
  }

  render() {
    return(
      <section>
        <h2 className="current-room-name">{this.props.currentRoom ? this.props.currentRoom.name : ''}</h2>
        <div className="messagelist">
          <ul>
          {
            this.state.messages.map( message  =>
              <li key={message.key} onClick={() => this.props.setActiveRoom(message.roomId, message.key)}>
                <div>{message.username}</div>
                <div>{message.content}</div>
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
