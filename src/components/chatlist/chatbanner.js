import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./chatlist.css";

const ChatBanner = (props) => {
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

  const handleUsernameFetch = (id) => {
    fetch(`/auth/users/${id}`, {
      headers: {
        Authorization: "Bearer " + props.token,
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
      .catch((error) => console.log(error));
  };

  const handleRecentMessageFetch = () => {
    fetch(`/chatroom/${props.chat.Id}/messages`, {
      headers: {
        Authorization: "Bearer " + props.token,
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
      .catch((error) => console.log(error));
  };

  const navigateToChat = () => {
    navigate("/chat/" + props.chat.Id);
  };

  return (
    <div className="chatBanner" onClick={navigateToChat}>
      {isLoading ? "Loading..." : null}
      <div className="chatBannerName">{recipientName}</div>
      <div className="recentMsg">{recentMessage}</div>
    </div>
  );
};
export default ChatBanner;
