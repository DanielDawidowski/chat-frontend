import { io } from "socket.io-client";
import "./App.css";

const URL = "http://localhost:8000";

const socket = io(URL, {
  path: "/socket.io",
  reconnection: false,
});

function App() {
  return (
    <div className="App">
      {console.log(socket)}
      <h1>siema</h1>
    </div>
  );
}

export default App;
