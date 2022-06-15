import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./chatlist.css";
import AuthContext from "../../contexts/authcontext";

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
      setIsLoading(true)
      return;
    }
    handleUsernameFetch(props.chat.Member1);
    handleRecentMessageFetch();
    setIsLoading(true)
  }, []);

  useEffect(() => {
    if(notification) {
      handleRecentMessageFetch()
    }
  }, [notification])

  const handleUsernameFetch = (id) => {
    fetch(`/auth/users/${id}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error();
        }
        return res.json();
      })
      .then((res) => {
        setRecipientName(res[0].DisplayName);
        setIsLoading(false)
      })
      .catch((error) => {
        //error fetching info
      });
  };

  const handleRecentMessageFetch = () => {
    fetch(`/chatroom/${props.chat.Id}/messages`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error();
        }
        return res.json();
      })
      .then((res) => {
        const index = res.length - 1;
        setRecentMessage(res[index].Text);
      })
      .catch((error) => {
        //error getting info
      });
  };

  const handleText = () => {
    if(recentMessage.length > 30) {
      const reducedMsg = recentMessage.substring(0, 30)
      return reducedMsg + "...."
    }
    return recentMessage;
  }

  const navigateToChat = () => {
    navigate("/chat/" + props.chat.Id);
  };

  return (
    <div className="chatBanner" onClick={navigateToChat}>
      {isLoading ? "Loading..." : null}
      <div className="chatBannerName">{recipientName}</div>
      <div className="recentMsg">{handleText()}</div>
    </div>
  );
};
export default ChatBanner;
