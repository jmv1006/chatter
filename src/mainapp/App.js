import { useState, useEffect } from "react";
import Header from "../components/header/header";
import { Outlet } from "react-router-dom";
import "./app.css";
import AuthContext from "../contexts/authcontext";
import { io } from "socket.io-client";
import Notification from "../components/notification/notification";

function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [notification, setNotification] = useState(false);

  useEffect(() => {
    if (user) {
      const socket = io("http://localhost:4000/");
      socket.emit("notificationlink", "Linking for notifications");
      socket.on("notification", (object) => {
        setNotification(object);
      });
    }
  }, [user]);

  return (
    <div className="appContainer">
      <Header />
      {notification ? (<Notification info={notification} setNotification={setNotification} user={user}/>) : null}
      <AuthContext.Provider value={{ userInfo: [user, setUser], authToken: [token, setToken] }}>
        <Outlet />
      </AuthContext.Provider>
    </div>
  );
}

export default App;
