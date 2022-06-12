import { useState, useEffect } from "react";
import Header from "../components/header/header";
import { Outlet } from "react-router-dom";
import "./app.css";
import AuthContext from "../contexts/authcontext";
import { io } from "socket.io-client";
import Notification from "../components/notification/notification";
import ErrorPage from "../components/error/error";

function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [notification, setNotification] = useState(false);
  const [apiError, setApiError] = useState(false);

  useEffect(() => {
    fetch('/api')
    .then(res =>{
      if(!res.ok) {
        throw new Error()
      }
    })
    .catch(error => {
      setApiError(true)
    })
  }, [])

  useEffect(() => {
    if (user) {
      const socket = io("https://jmv1006-chatterapi.herokuapp.com/");
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
      {apiError ? <ErrorPage /> : null}
      <AuthContext.Provider value={{ userInfo: [user, setUser], authToken: [token, setToken], notificationHandler: [notification, setNotification]}}>
        <Outlet />
      </AuthContext.Provider>
    </div>
  );
}

export default App;
