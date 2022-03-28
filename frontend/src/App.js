import './App.css';
import io from 'socket.io-client';
import {useEffect} from "react";
import {useState} from "react";
import Messages from "./components/Messages";

function App() {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io(`http://localhost:3000`);
    setSocket(newSocket);
    return () => newSocket.close();
  }, [setSocket]);

  return (
    <div className="App">
      { socket ? (
          <div className="polls-container">
            <p>Socket is connected</p>
            <Messages socket={socket}/>
          </div>
      ) : (
          <div>Not Connected</div>
      )}
    </div>
  );
}

export default App;
