import { useState, useEffect } from "react";
import Header from "../components/header/header";
import { Outlet } from "react-router-dom";
import "./app.css";
import AuthContext from "../contexts/authcontext";
import { io } from "socket.io-client";
import Notification from "../components/notification/notification";

function App() {
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState(false);

  useEffect(() => {
    fetch("/auth/session")
      .then((res) => {
        if (!res.ok) {
          throw new Error();
        }
        return res.json();
      })
      .then((res) => {
        setUser(res.user);
      })
      .catch((err) => {
        //refresh token does not exist
      });
  }, []);

  useEffect(() => {
    if (user) {
      const socket = io("https://jmv1006-chatterapi.herokuapp.com/");
      socket.emit("notificationlink", "Linking for notifications");
      socket.on("notification", (object) => {
        setNotification(object);
      });
    }
  }, [user]);

  const logout = () => {
    fetch("/auth/log-out")
      .then((res) => {
        res.json();
      })
      .then((res) => {
        window.location.reload();
      });
  };

  return (
    <div className="appContainer">
      <Header />
      {user && <button onClick={logout}>Log Out</button>}
      {notification ? (
        <Notification
          info={notification}
          setNotification={setNotification}
          user={user}
        />
      ) : null}
      <AuthContext.Provider
        value={{
          userInfo: [user, setUser],
          notificationHandler: [notification, setNotification],
        }}
      >
        <Outlet />
      </AuthContext.Provider>
    </div>
  );
}

export default App;
