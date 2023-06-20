import { useState } from "react";
import socket from "./socket";
import useEffectOnce from "./hooks/useEffectOnce";

function App() {
  const [username, setUsername] = useState("");
  const [connected, setConnected] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);

  const handleUsername = (e) => {
    e.preventDefault();
    // console.log(username);
    socket.emit("username", username);
    setConnected(true);
  };

  const handleMessage = (e) => {
    e.preventDefault();
    socket.emit("message", ` ${username}- ${message}`);
    setMessage("");
  };

  useEffectOnce(() => {
    socket.on("user joined", (data) => {
      console.log(data);
    });

    socket.on("message", (message) => {
      // console.log("message", message);
      setMessages((previousMessages) => [...previousMessages, message]);
    });

    return () => {
      socket.off("user joined");
      socket.off("message");
    };
  }, []);

  useEffectOnce(() => {
    socket.on("users", (users) => {
      console.log("users", users);
      setUsers(users);
    });

    return () => {
      socket.off("users");
    };
  }, [socket]);

  return (
    <div className="container text-center">
      <div className="row">
        {connected ? (
          <form onSubmit={handleMessage} className="text-center pt-3">
            <div className="row g-3">
              <div className="col-10">
                <input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  type="text"
                  placeholder="Type your message (public)"
                  className="form-control"
                />
              </div>

              <div className="col-2">
                <button className="btn btn-secondary" type="submit">
                  Send
                </button>
              </div>
            </div>
          </form>
        ) : (
          <form onSubmit={handleUsername} className="text-center pt-3">
            <div className="row g-3">
              <div className="col-md-8">
                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  type="text"
                  placeholder="Enter your name"
                  className="form-control"
                />
              </div>

              <div className="col-md-4">
                <button className="btn btn-secondary" type="submit">
                  Join
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
      <div className="row">
        <div className="col-md-8">
          <pre>
            {messages.map((m, i) => (
              <div key={i} className="alert alert-secondary">
                {m}
              </div>
            ))}
          </pre>
        </div>
        <div className="col-md-4">
          <pre>
            {users.map((u, i) => (
              <div key={i} className="alert alert-primary">
                {u}
              </div>
            ))}
          </pre>
        </div>
      </div>
    </div>
  );
}

export default App;
