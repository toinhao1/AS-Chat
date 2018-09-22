import React, { Component } from 'react';


class RoomList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms:[],
      newName: ''
    };
    this.roomsRef = this.props.firebase.database().ref('rooms');
  }
  componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat( room ) });
      if (this.state.rooms.length === 1) {this.props.setActiveRoom(room)}
    });
  }

  handleChange(e) {
    this.setState({ newName: e.target.value });
  }
  createRoom(newName) {
    this.roomsRef.push({
      name: newName,
      createdAt: Date.now(),
      });
      this.setState({ newName: ' '});
    }
  handleSubmit(e) {
    e.preventDefault();
    this.createRoom(this.state.newName);
  }

  render() {
    return (
      <section>
        <ul className="room-list">
          {this.state.rooms.map( ( room ) =>
            <li key={room.key} onClick={() => this.props.setActiveRoom(room)}>{room.name}</li>
            )
          }
        </ul>
        <form className="newChatRoom" onSubmit={(e) => {this.handleSubmit(e)}}>
          <label>
            Create A New Chat Room :
            <input type="text" value={this.state.newName} onChange={this.handleChange.bind(this)} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </section>
    )
  }
}
export default RoomList;
