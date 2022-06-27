import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UserInterface } from "../../shared/interfaces/interfaces";
import "./notification.css";

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

type NotificationPropTypes = {
  info: INotification,
  user: UserInterface | null,
  setNotification: (arg: null | INotification) => void;
};

const Notification = ({ info, user, setNotification} : NotificationPropTypes) => {
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    handleText();
    //filter notifications
    if(user) {
      if (info.user.id == user.id) {
        setNotification(null);
        return;
      }
      if (params.chatId) {
        setNotification(null);
        return;
      }
      
      setTimeout(() => {
        closeNotification();
      }, 6000);
    }
  }, []);

  const closeNotification = () => {
    setNotification(null);
  };

  const handleText = () => {
    if (info.message.length > 25) {
      const reducedMsg = info.message.substr(0, 25);
      return reducedMsg + "...";
    }
    return info.message;
  };

  const navigateToChat = () => {
    navigate(`/chat/${info.chatInfo.Id}`);
    closeNotification();
  };

  return (
    <div className="notificationBanner">
      <div onClick={navigateToChat} className="notificationLink">
        {info.user.displayname}: {handleText()}
      </div>
      <button onClick={closeNotification} className="notificationBtn">
        X
      </button>
    </div>
  );
};

export default Notification;