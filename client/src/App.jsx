import { useState } from "react";
import io from "socket.io-client";
import "./App.css";
import Chat from "./components/Chat";

const socket = io.connect("http://localhost:3001");

function App() {
  const [username, setUserName] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [error, setError] = useState({});

  const joinRoom = () => {
    const newError = {};
    if (username === "") {
      newError.username = "Please Enter Username";
    }
    if (room === "") {
      newError.room = "Please Enter Room";
    }
    setError(newError);
    if (Object.keys(newError).length == 0) {
      if (username !== "" && room !== "") {
        socket.emit("join_room", room);
        setShowChat(true);
      }
    }
  };

  return (
    <div className="App">
      {!showChat ? (
        <div className="join-chat-container">
          <h2>Join Chat</h2>
          <input
            type="text"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Username..."
          />
          {error.username && <p className="error">{error.username}</p>}

          <input
            type="text"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
            placeholder="Room.."
          />
          {error.room && <p className="error">{error.room}</p>}

          <button onClick={joinRoom}>Join A Room</button>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </div>
  );
}

export default App;
