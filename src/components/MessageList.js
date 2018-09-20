import React, { Component } from 'react';



class MessgeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: []
    }
    this.messageRef = this.props.firebase.database().ref('messages');
  }
  componentDidMount() {
    this.messageRef.on('child_added', snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState({ messages: this.state.messages.concat( message ) });
    })
  }


  render() {
    return(


    )
  }
}

export default MessageList;
