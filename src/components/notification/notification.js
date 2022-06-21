import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./notification.css";

const Notification = ({ info, user, setNotification}) => {
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    handleText();
    //filter notifications
    if (info.user.id == user.id) {
      setNotification(false);
      return;
    }
    if (params.chatId && info.chatInfo.Id == params.chatId) {
      setNotification(false);
      return;
    }

    setTimeout(() => {
      closeNotification();
    }, 6000);
  }, []);

  const closeNotification = () => {
    setNotification(false);
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
