import { useState, useEffect } from "react";
import { Outlet, useParams } from "react-router-dom";
import { io } from "socket.io-client";
import AuthContext from "../contexts/authcontext";
import Header from "../components/header/header";
import Notification from "../components/notification/notification";
import DropDown from "../components/dropdown/dropdown";
import Footer from "../components/footer/footer";
import "./app.css";

function App() {
  const params = useParams();

  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState(false);
  const [dropDown, setDropDown] = useState(false);

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
    fetch("/auth/log-out").then((res) => {
      window.location.reload();
    });
  };

  const toggleDropDown = () => {
    if (dropDown) {
      setDropDown(false);
      return;
    }
    setDropDown(true);
  };

  return (
    <div className="appContainer">
      <Header user={user} toggleDropDown={toggleDropDown} />
      {dropDown && (
        <DropDown toggleDropDown={toggleDropDown} user={user} logout={logout} />
      )}
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
      {!params.chatId && <Footer />}
    </div>
  );
}

export default App;
