import { useState, useEffect } from "react";
import { Outlet, useParams } from "react-router-dom";
import { io } from "socket.io-client";
import { UserInterface } from "../shared/interfaces/interfaces";
import AuthContext from "../contexts/authcontext";
import Header from "../components/header/header";
import Notification from "../components/notification/notification";
import DropDown from "../components/dropdown/dropdown";
import Footer from "../components/footer/footer";
import "./app.css";

interface IChatInfo {
  Id: string, 
  Member1: string, 
  Member1Name: string,
  Member2: string,
  Member2Name: string
};

interface INotification {
  message: string,
  user: UserInterface,
  chatInfo: IChatInfo
};

function App() {
  const params = useParams();

  const [user, setUser] = useState<UserInterface | null>(null);
  const [notification, setNotification] = useState<INotification | null>(null);
  const [dropDown, setDropDown] = useState<boolean >(false);

  useEffect(() => {
    const checkForSession = async () => {
      const response = await fetch("/auth/session");
      if (!response.ok) {
        //User is unauthorized because cookie is expired or does not exist
        return;
      }
      const responseObj = await response.json();
      const userResponse = responseObj.user;
      setUser(userResponse);
    };

    checkForSession();
  }, []);

  useEffect(() => {
    if (user) {
      const socket = io("https://jmv1006-chatterapi.herokuapp.com/");
      socket.emit("notificationlink", "Linking for notifications");
      
      socket.on("notification", (notification) => {
        setNotification(notification);
      });
    }
  }, [user]);

  const logout = async () => {
    const response = await fetch("/auth/log-out");

    if (!response.ok) {
      //Error logging out
      return;
    }

    window.location.reload();
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
        <Header toggleDropDown={toggleDropDown} />
        {dropDown && (
          <DropDown toggleDropDown={toggleDropDown} user={user} logout={logout} />
        )}
        {notification ? (
          <Notification info={notification} setNotification={setNotification} user={user}/>
        ) : null}
        <AuthContext.Provider value={{userInfo: [user, setUser], notificationHandler: [notification, setNotification]}}>
          <Outlet />
        </AuthContext.Provider>
        {!params.chatId && <Footer />}
      </div>
  );
}

export default App;
