import React, { Component } from 'react';


class RoomList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms:[],
      name: ''
    };
    this.roomsRef = this.props.firebase.database().ref('rooms');
  }
  componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat( room ) });
    });
  }
  handleChange(e) {
    this.setState({ name: e.target.value});
  }
  createRoom(e) {
    e.preventDefault();
    const newRoom = this.state.name;

    if (newRoom.length >= 1) {
      this.roomsRef.push({
        name: newRoom
      });
    }
    this.name.value = '';
    this.setState({ name: ' '}, () => this.updateRooms(this.props.currentRoom));
  }
  updateRooms(currentRoom) {
    this.setState({ rooms: this.state.rooms, name: ''});
  }

  render() {
    return (
      <section>
        <ul className="room-list">
          {this.state.rooms.map( ( room ) =>
            <li key={room.key}>{room.name}</li>
            )
          }
        </ul>
        <form className="newChatRoom" onSubmit={this.createRoom.bind(this)}>
          <label>
            Create A New Chat Room :
            <input type="text" ref={newRoom => this.name = newRoom} onChange={this.handleChange.bind(this)} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </section>
    )
  }
}
export default RoomList;
