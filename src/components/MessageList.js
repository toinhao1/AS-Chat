import React, { Component } from 'react';



class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      showMessages: [],
      newMessage: ''
    }
    this.messageRef = this.props.firebase.database().ref('messages');
  }
  componentDidMount() {
    this.messageRef.on('child_added' , (snapshot) => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState({ messages: this.state.messages.concat(message)}, () => {
        this.displayMessages(this.props.currentRoom)
      });
    })
  }
  componentWillReceiveProps(nextProps) {
    this.displayMessages(nextProps.currentRoom);
  }

  displayMessages(currentRoom) {
    this.setState({showMessages: this.state.messages.filter(message => message.roomId === currentRoom.key)});
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({ newMessage: e.target.value});
  }

  createMessage(newMessage) {
    this.messageRef.push({
      username: this.props.user,
      content: newMessage,
      sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
      roomId: this.props.currentRoom.key
    });
    this.setState({ newMessage: ' '});
  }

  render() {
    return(
      <section>
        <h2 className="current-room-name">{this.props.currentRoom ? this.props.currentRoom.name : ''}</h2>
        <div className="messagelist">
          <ul>
          {
            this.state.showMessages.map( message  =>
              <li key={message.key}>
                <div>{message.username}</div>
                <div>{message.content}</div>
                <div>{message.sentAt}</div>
              </li>
            )
          }
          </ul>
          <form className="sending-messages" onSubmit={(e) => { e.preventDefault(); this.createMessage(this.state.newMessage)}}>
            <label>
              <input type="text" placeholder="Write your message" value={this.state.newMessage} onChange={this.handleChange.bind(this)}/>
            </label>
            <input type="submit" value="Send"/>
          </form>
        </div>
      </section>
    )
  }
}
export default MessageList;
