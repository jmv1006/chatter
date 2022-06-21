import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import AuthContext from "../../contexts/authcontext";
import "./chatlist.css";

const ChatBanner = (props) => {
  const { notificationHandler } = useContext(AuthContext);

  const [notification] = notificationHandler;

  const navigate = useNavigate();

  const [recipientName, setRecipientName] = useState("");
  const [recentMessage, setRecentMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (props.chat.Member1 === props.user.id) {
      handleRecentMessageFetch();
      handleUsernameFetch(props.chat.Member2);
      setIsLoading(true);
      return;
    }
    handleUsernameFetch(props.chat.Member1);
    handleRecentMessageFetch();
    setIsLoading(true);
  }, []);

  useEffect(() => {
    if (notification) {
      handleRecentMessageFetch();
    }
  }, [notification]);

  const handleUsernameFetch = async (id) => {
    const res = await fetch(`/auth/users/${id}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      }
    });

    if(!res.ok) {
      //error
      return
    }

    const resJSON = await res.json();
    setRecipientName(resJSON.DisplayName);
    setIsLoading(false);
  };

  const handleRecentMessageFetch = async () => {
    const res = await fetch(`/chatroom/${props.chat.Id}/messages`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    if(!res.ok) {
      //error fetching
      return
    };

    const resJSON = await res.json();

    const index = resJSON.length - 1;

    if(index <= 0) {
      return
    };
    
    setRecentMessage(resJSON[index].Text);
  };

  const handleText = () => {
    if (recentMessage.length > 30) {
      const reducedMsg = recentMessage.substring(0, 30);
      return reducedMsg + "....";
    }
    return recentMessage;
  };

  const navigateToChat = () => {
    navigate("/chat/" + props.chat.Id);
  };

  return (
    <div className="chatBanner" onClick={navigateToChat}>
      {isLoading && <ClipLoader />}
      <div className="chatBannerName">{recipientName}</div>
      <div className="recentMsg">{handleText()}</div>
    </div>
  );
};
export default ChatBanner;
